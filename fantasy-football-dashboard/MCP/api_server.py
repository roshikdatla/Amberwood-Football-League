import asyncio
import hashlib
import json
import logging
import os
import re
import sqlite3
from datetime import datetime, timezone
from typing import Dict, Any, List
from fastapi import FastAPI, Header, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import uvicorn
from server import SleeperFantasyFootballServer

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Sleeper Fantasy Football MCP API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global MCP server instance
mcp_server = None

default_vote_database = (
    "/data/amberwood_votes.db"
    if os.path.isdir("/data")
    else os.path.join(os.path.dirname(__file__), "amberwood_votes.db")
)
vote_database_path = os.environ.get("POLL_DATABASE_PATH", default_vote_database)
vote_hash_salt = os.environ.get("POLL_HASH_SALT", "amberwood-anonymous-voter-v1")
voter_id_pattern = re.compile(r"^[A-Za-z0-9-]{20,80}$")

class ChatRequest(BaseModel):
    message: str

class MCPToolRequest(BaseModel):
    tool: str
    arguments: Dict[str, Any] = {}

class ChatResponse(BaseModel):
    response: str
    timestamp: str

class VoteRequest(BaseModel):
    league_id: str
    week: int
    matchup_id: int
    roster_id: int

def open_vote_database():
    os.makedirs(os.path.dirname(vote_database_path) or ".", exist_ok=True)
    connection = sqlite3.connect(vote_database_path, timeout=10)
    connection.row_factory = sqlite3.Row
    return connection

def initialize_vote_database():
    with open_vote_database() as connection:
        connection.execute("PRAGMA journal_mode=WAL")
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS matchup_votes (
                league_id TEXT NOT NULL,
                week INTEGER NOT NULL,
                matchup_id INTEGER NOT NULL,
                roster_id INTEGER NOT NULL,
                voter_hash TEXT NOT NULL,
                created_at TEXT NOT NULL,
                PRIMARY KEY (league_id, week, matchup_id, voter_hash)
            )
            """
        )

def get_voter_hash(voter_id: str):
    if not voter_id or not voter_id_pattern.fullmatch(voter_id):
        raise HTTPException(status_code=400, detail="A valid anonymous voter ID is required")
    return hashlib.sha256(f"{vote_hash_salt}:{voter_id}".encode("utf-8")).hexdigest()

def read_vote_results(league_id: str, week: int, voter_hash: str):
    with open_vote_database() as connection:
        count_rows = connection.execute(
            """
            SELECT matchup_id, roster_id, COUNT(*) AS vote_count
            FROM matchup_votes
            WHERE league_id = ? AND week = ?
            GROUP BY matchup_id, roster_id
            """,
            (league_id, week),
        ).fetchall()
        selection_rows = connection.execute(
            """
            SELECT matchup_id, roster_id
            FROM matchup_votes
            WHERE league_id = ? AND week = ? AND voter_hash = ?
            """,
            (league_id, week, voter_hash),
        ).fetchall()

    matchups = {}
    for row in count_rows:
        matchup_key = str(row["matchup_id"])
        matchups.setdefault(matchup_key, {})[str(row["roster_id"])] = row["vote_count"]

    selections = {
        str(row["matchup_id"]): row["roster_id"]
        for row in selection_rows
    }
    return {"matchups": matchups, "selections": selections}

async def validate_matchup_vote(vote: VoteRequest):
    if not vote.league_id.isdigit() or not 1 <= vote.week <= 18 or vote.matchup_id < 1:
        raise HTTPException(status_code=400, detail="Invalid matchup vote")

    sleeper_url = (
        f"https://api.sleeper.app/v1/league/{vote.league_id}/matchups/{vote.week}"
    )
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            response = await client.get(sleeper_url)
            response.raise_for_status()
            matchup_entries = response.json()
    except (httpx.HTTPError, ValueError) as error:
        logger.error("Unable to validate matchup vote: %s", error)
        raise HTTPException(status_code=503, detail="Matchup validation is temporarily unavailable")

    valid_roster_ids = {
        entry.get("roster_id")
        for entry in matchup_entries
        if entry.get("matchup_id") == vote.matchup_id
    }
    if len(valid_roster_ids) != 2 or vote.roster_id not in valid_roster_ids:
        raise HTTPException(status_code=400, detail="That team is not part of this matchup")

@app.on_event("startup")
async def startup_event():
    """Initialize the MCP server on startup"""
    global mcp_server
    try:
        initialize_vote_database()
        logger.info("Initializing MCP server...")
        mcp_server = SleeperFantasyFootballServer()
        await mcp_server.initialize()
        logger.info("MCP server initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize MCP server: {e}")
        raise

@app.get("/")
async def root():
    return {"message": "Sleeper Fantasy Football MCP API", "status": "running"}

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "mcp_connected": mcp_server is not None,
        "timestamp": "2025-01-01T00:00:00Z"
    }

@app.get("/api/votes")
async def get_matchup_votes(
    league_id: str = Query(...),
    week: int = Query(..., ge=1, le=18),
    x_amberwood_voter: str = Header(...),
):
    voter_hash = get_voter_hash(x_amberwood_voter)
    return read_vote_results(league_id, week, voter_hash)

@app.post("/api/votes")
async def cast_matchup_vote(
    vote: VoteRequest,
    x_amberwood_voter: str = Header(...),
):
    voter_hash = get_voter_hash(x_amberwood_voter)
    await validate_matchup_vote(vote)

    try:
        with open_vote_database() as connection:
            connection.execute(
                """
                INSERT INTO matchup_votes (
                    league_id, week, matchup_id, roster_id, voter_hash, created_at
                ) VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    vote.league_id,
                    vote.week,
                    vote.matchup_id,
                    vote.roster_id,
                    voter_hash,
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
    except sqlite3.IntegrityError:
        results = read_vote_results(vote.league_id, vote.week, voter_hash)
        raise HTTPException(
            status_code=409,
            detail={"message": "You already voted in this matchup", **results},
        )

    return read_vote_results(vote.league_id, vote.week, voter_hash)

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Chat endpoint that processes natural language questions"""
    if not mcp_server:
        raise HTTPException(status_code=503, detail="MCP server not initialized")
    
    try:
        # Process the message to determine which MCP tool to use
        response = await process_league_question(request.message)
        
        return ChatResponse(
            response=response,
            timestamp="2025-01-01T00:00:00Z"
        )
    except Exception as e:
        logger.error(f"Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/mcp/{tool_name}")
async def mcp_tool_endpoint(tool_name: str, request: MCPToolRequest = None):
    """Direct MCP tool endpoint"""
    if not mcp_server:
        raise HTTPException(status_code=503, detail="MCP server not initialized")
    
    try:
        arguments = request.arguments if request else {}
        
        # Call the MCP tool directly
        result = await call_mcp_tool(tool_name, arguments)
        
        return {
            "tool": tool_name,
            "result": result,
            "timestamp": "2025-01-01T00:00:00Z"
        }
    except Exception as e:
        logger.error(f"MCP tool endpoint error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

async def call_mcp_tool(tool_name: str, arguments: Dict[str, Any]):
    """Call MCP tool and return parsed result"""
    global mcp_server
    
    # Map of available tools to their handler methods
    tool_handlers = {
        "get_league_info": mcp_server.get_league_info,
        "get_standings": mcp_server.get_standings,
        "get_league_rosters": lambda: mcp_server.get_league_rosters(arguments.get("team_name", "")),
        "get_draft_results": lambda: mcp_server.get_draft_results(arguments.get("limit", 50)),
        "search_player": lambda: mcp_server.search_player(arguments.get("player_name", "")),
        "get_player_owner": lambda: mcp_server.get_player_owner(arguments.get("player_name", "")),
        "get_matchups": lambda: mcp_server.get_matchups(arguments.get("week")),
        "get_transactions": lambda: mcp_server.get_transactions(arguments.get("limit", 10)),
        "get_player_stats": lambda: mcp_server.get_player_stats(
            arguments.get("player_name", ""), 
            arguments.get("week")
        ),
        "get_past_standings": lambda: mcp_server.get_past_standings(
            arguments.get("season", ""), 
            arguments.get("league_index", 0)
        ),
        "get_past_matchups": lambda: mcp_server.get_past_matchups(
            arguments.get("season", ""), 
            arguments.get("week", 1), 
            arguments.get("league_index", 0)
        ),
        "get_past_draft_results": lambda: mcp_server.get_past_draft_results(
            arguments.get("season", ""), 
            arguments.get("draft_index", 0),
            arguments.get("limit", 50)
        ),
    }
    
    if tool_name not in tool_handlers:
        raise HTTPException(status_code=404, detail=f"Tool '{tool_name}' not found")
    
    # Call the tool handler
    result = await tool_handlers[tool_name]()
    
    # Extract text content from MCP result
    if isinstance(result, list) and len(result) > 0:
        return result[0].text if hasattr(result[0], 'text') else str(result[0])
    
    return str(result)

async def process_league_question(question: str) -> str:
    """Process natural language questions and route to appropriate MCP tools"""
    question_lower = question.lower()
    
    try:
        if any(word in question_lower for word in ['standing', 'rank', 'leaderboard']):
            result = await call_mcp_tool('get_standings', {})
            return result
        
        elif any(word in question_lower for word in ['roster', 'team', 'lineup']):
            # Check if asking about specific team
            team_name = ""
            if "team" in question_lower:
                words = question.split()
                team_idx = next((i for i, word in enumerate(words) if 'team' in word.lower()), -1)
                if team_idx != -1 and team_idx + 1 < len(words):
                    team_name = words[team_idx + 1]
            
            result = await call_mcp_tool('get_league_rosters', {"team_name": team_name})
            return result
        
        elif any(word in question_lower for word in ['draft', 'pick', 'drafted']):
            result = await call_mcp_tool('get_draft_results', {"limit": 20})
            return result
        
        elif any(word in question_lower for word in ['matchup', 'schedule', 'opponent', 'vs']):
            result = await call_mcp_tool('get_matchups', {})
            return result
        
        elif any(word in question_lower for word in ['transaction', 'trade', 'waiver', 'pickup']):
            result = await call_mcp_tool('get_transactions', {"limit": 10})
            return result
        
        elif any(word in question_lower for word in ['league', 'info', 'detail']):
            result = await call_mcp_tool('get_league_info', {})
            return result
        
        elif any(word in question_lower for word in ['player', 'stats', 'performance']):
            # Try to extract player name from question
            words = question.split()
            player_name = ""
            for i, word in enumerate(words):
                if word.lower() in ['player', 'stats', 'performance', 'about']:
                    if i + 1 < len(words):
                        # Get next 1-2 words as potential player name
                        potential_name = " ".join(words[i+1:i+3])
                        player_name = potential_name.strip('?.,!').title()
                        break
            
            if player_name:
                result = await call_mcp_tool('search_player', {"player_name": player_name})
                return result
        
        # Default response
        result = await call_mcp_tool('get_league_info', {})
        return f"I can help you with information about your league! Try asking about:\n\n• Current standings\n• Team rosters\n• Draft results\n• Recent transactions\n• Player information\n• Weekly matchups\n\nHere's your league info:\n\n{result}"
        
    except Exception as e:
        logger.error(f"Error processing question: {e}")
        return f"Sorry, I encountered an error while processing your question: {str(e)}"

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
