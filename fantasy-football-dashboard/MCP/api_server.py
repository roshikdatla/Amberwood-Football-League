import asyncio
import json
import logging
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

class ChatRequest(BaseModel):
    message: str

class MCPToolRequest(BaseModel):
    tool: str
    arguments: Dict[str, Any] = {}

class ChatResponse(BaseModel):
    response: str
    timestamp: str

@app.on_event("startup")
async def startup_event():
    """Initialize the MCP server on startup"""
    global mcp_server
    try:
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