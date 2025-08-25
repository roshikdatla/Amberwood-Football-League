import asyncio
import json
import sys
import logging
import time
from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple
import httpx
from mcp.server import Server, InitializationOptions
from mcp.server.stdio import stdio_server
from mcp.types import (
    TextContent,
    ImageContent,
    Tool,
    JSONRPCError,
    INVALID_REQUEST,
    METHOD_NOT_FOUND,
    INVALID_PARAMS,
    INTERNAL_ERROR
)

# Import configuration
from config import USERNAME, LEAGUE_ID, CACHE_TTL, LOG_LEVEL

# Define a simple class for notification options
class NotificationOptions:
    def __init__(self, tools_changed=False):
        self.tools_changed = tools_changed

# Set up logging to stderr so it appears in MCP logs
logging.basicConfig(
    level=getattr(logging, LOG_LEVEL),
    format='%(asctime)s - %(levelname)s - %(message)s',
    stream=sys.stderr
)
logger = logging.getLogger(__name__)

class SleeperFantasyFootballServer:
    def __init__(self):
        self.server = Server("sleeper-fantasy-football")
        self.user_id: Optional[str] = None
        self.http_client = httpx.AsyncClient(timeout=30.0)  # Increased timeout
        self.players_cache: Dict[str, Dict] = {}
        self.nfl_state_cache: Optional[Dict] = None
        self.cache_timestamp = 0
        self.cache_ttl = CACHE_TTL  # Cache TTL from config
        
        # Register handlers
        self.setup_handlers()
    
    async def initialize(self):
        """Initialize the server by getting user ID and player data"""
        logger.info(f"Initializing server for username: {USERNAME}, league_id: {LEAGUE_ID}")
        try:
            # Get user ID from username
            user_response = await self.http_client.get(f"https://api.sleeper.app/v1/user/{USERNAME}")
            user_response.raise_for_status()
            user_data = user_response.json()
            
            self.user_id = user_data.get('user_id')
            if not self.user_id:
                raise ValueError("Could not retrieve user_id from username")
                
            logger.info(f"Successfully retrieved user_id: {self.user_id}")
            
            # Initialize player data cache
            await self.refresh_player_cache()
            
            # Get NFL state (for current week info)
            await self.refresh_nfl_state()
            
        except Exception as e:
            logger.error(f"Failed to initialize: {e}")
            raise
    
    async def refresh_player_cache(self):
        """Refresh the player data cache"""
        try:
            logger.info("Refreshing player data cache...")
            players_response = await self.http_client.get("https://api.sleeper.app/v1/players/nfl")
            players_response.raise_for_status()
            self.players_cache = players_response.json()
            self.cache_timestamp = time.time()
            logger.info(f"Player cache refreshed with {len(self.players_cache)} players")
        except Exception as e:
            logger.error(f"Failed to refresh player cache: {e}")
            if not self.players_cache:  # Only raise if we don't have any cached data
                raise
    
    async def refresh_nfl_state(self):
        """Refresh the NFL state cache"""
        try:
            logger.info("Refreshing NFL state cache...")
            nfl_state_response = await self.http_client.get("https://api.sleeper.app/v1/state/nfl")
            nfl_state_response.raise_for_status()
            self.nfl_state_cache = nfl_state_response.json()
            logger.info(f"NFL state cache refreshed: {self.nfl_state_cache}")
        except Exception as e:
            logger.error(f"Failed to refresh NFL state cache: {e}")
            if not self.nfl_state_cache:  # Only raise if we don't have any cached data
                self.nfl_state_cache = {"season_type": "regular", "week": 1}  # Default fallback
    
    async def get_current_week(self) -> int:
        """Get the current NFL week"""
        if self.nfl_state_cache is None or (time.time() - self.cache_timestamp > self.cache_ttl):
            await self.refresh_nfl_state()
        
        return self.nfl_state_cache.get("week", 1)
    
    def get_player_name(self, player_id: str) -> str:
        """Get player name from player ID"""
        if not self.players_cache or player_id not in self.players_cache:
            return player_id  # Return the ID if player not found
        
        player = self.players_cache[player_id]
        full_name = player.get("full_name")
        if full_name:
            return full_name
        
        # Fallback to constructing name from first and last
        first_name = player.get("first_name", "")
        last_name = player.get("last_name", "")
        if first_name or last_name:
            return f"{first_name} {last_name}".strip()
        
        # Last resort
        return player.get("search_full_name", player_id)
    
    def get_player_position(self, player_id: str) -> str:
        """Get player position from player ID"""
        if not self.players_cache or player_id not in self.players_cache:
            return "Unknown"
        
        return self.players_cache[player_id].get("position", "Unknown")
    
    def get_player_team(self, player_id: str) -> str:
        """Get player team from player ID"""
        if not self.players_cache or player_id not in self.players_cache:
            return "Unknown"
        
        return self.players_cache[player_id].get("team", "FA")  # FA = Free Agent
    
    async def find_players_by_name(self, name: str) -> List[Dict]:
        """Find players by name"""
        if not self.players_cache or (time.time() - self.cache_timestamp > self.cache_ttl):
            await self.refresh_player_cache()
        
        name_lower = name.lower()
        matching_players = []
        
        for player_id, player in self.players_cache.items():
            full_name = player.get("full_name", "").lower()
            search_name = player.get("search_full_name", "").lower()
            search_rank = player.get("search_rank", 0)
            
            # Check if name is in full_name or search_full_name
            if (name_lower in full_name or name_lower in search_name) and search_rank > 0:
                matching_players.append({
                    "player_id": player_id,
                    "name": player.get("full_name", ""),
                    "position": player.get("position", ""),
                    "team": player.get("team", "FA"),
                    "search_rank": search_rank
                })
        
        # Sort by search rank (higher is better)
        matching_players.sort(key=lambda x: x["search_rank"], reverse=True)
        return matching_players[:10]  # Return top 10 matches

    def setup_handlers(self):
        """Set up MCP server handlers"""
        
        @self.server.list_tools()
        async def handle_list_tools() -> List[Tool]:
            """List available tools"""
            return [
                Tool(
                    name="get_league_info",
                    description="Get basic information about the fantasy league",
                    inputSchema={
                        "type": "object",
                        "properties": {},
                        "required": []
                    }
                ),
                Tool(
                    name="get_league_rosters",
                    description="Get all team rosters in the league with player names",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "team_name": {
                                "type": "string",
                                "description": "Optional team name to filter results"
                            }
                        },
                        "required": []
                    }
                ),
                Tool(
                    name="get_draft_results",
                    description="Get the draft results for the league",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "limit": {
                                "type": "integer",
                                "description": "Limit the number of draft picks to show (default: 50)"
                            }
                        },
                        "required": []
                    }
                ),
                Tool(
                    name="get_past_draft_results",
                    description="Get draft results from a previous season",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "season": {
                                "type": "string",
                                "description": "Season year (e.g., '2024', '2023')"
                            },
                            "draft_index": {
                                "type": "integer",
                                "description": "Index of the draft if multiple drafts exist for a season (default: 0)"
                            },
                            "limit": {
                                "type": "integer",
                                "description": "Limit the number of draft picks to show (default: 50)"
                            }
                        },
                        "required": ["season"]
                    }
                ),
                Tool(
                    name="search_player",
                    description="Search for a player by name",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "player_name": {
                                "type": "string",
                                "description": "Name of the player to search for"
                            }
                        },
                        "required": ["player_name"]
                    }
                ),
                Tool(
                    name="get_player_owner",
                    description="Find which team owns a specific player",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "player_name": {
                                "type": "string",
                                "description": "Name of the player to search for"
                            }
                        },
                        "required": ["player_name"]
                    }
                ),
                Tool(
                    name="get_matchups",
                    description="Get matchups for a specific week",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "week": {
                                "type": "integer",
                                "description": "Week number (optional, defaults to current week)"
                            }
                        },
                        "required": []
                    }
                ),
                Tool(
                    name="get_past_matchups",
                    description="Get matchups from a previous season",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "season": {
                                "type": "string",
                                "description": "Season year (e.g., '2024', '2023')"
                            },
                            "week": {
                                "type": "integer",
                                "description": "Week number"
                            },
                            "league_index": {
                                "type": "integer",
                                "description": "Index of the league if multiple leagues exist for a season (default: 0)"
                            }
                        },
                        "required": ["season", "week"]
                    }
                ),
                Tool(
                    name="get_standings",
                    description="Get current league standings",
                    inputSchema={
                        "type": "object",
                        "properties": {},
                        "required": []
                    }
                ),
                Tool(
                    name="get_past_standings",
                    description="Get standings from a previous season",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "season": {
                                "type": "string",
                                "description": "Season year (e.g., '2024', '2023')"
                            },
                            "league_index": {
                                "type": "integer",
                                "description": "Index of the league if multiple leagues exist for a season (default: 0)"
                            }
                        },
                        "required": ["season"]
                    }
                ),
                Tool(
                    name="get_transactions",
                    description="Get recent transactions in the league",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "limit": {
                                "type": "integer",
                                "description": "Limit the number of transactions to show (default: 10)"
                            }
                        },
                        "required": []
                    }
                ),
                Tool(
                    name="get_player_stats",
                    description="Get stats for a specific player",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "player_name": {
                                "type": "string",
                                "description": "Name of the player to get stats for"
                            },
                            "week": {
                                "type": "integer",
                                "description": "Week number (optional, defaults to season stats)"
                            }
                        },
                        "required": ["player_name"]
                    }
                )
            ]

        @self.server.call_tool()
        async def handle_call_tool(name: str, arguments: Dict[str, Any]) -> List[TextContent]:
            """Handle tool calls"""
            logger.info(f"Tool called: {name} with args: {arguments}")
            
            try:
                if name == "get_league_info":
                    return await self.get_league_info()
                elif name == "get_league_rosters":
                    team_name = arguments.get("team_name", "")
                    return await self.get_league_rosters(team_name)
                elif name == "get_draft_results":
                    limit = arguments.get("limit", 50)
                    return await self.get_draft_results(limit)
                elif name == "get_past_draft_results":
                    season = arguments.get("season")
                    draft_index = arguments.get("draft_index", 0)
                    limit = arguments.get("limit", 50)
                    return await self.get_past_draft_results(season, draft_index, limit)
                elif name == "search_player":
                    player_name = arguments.get("player_name", "")
                    return await self.search_player(player_name)
                elif name == "get_player_owner":
                    player_name = arguments.get("player_name", "")
                    return await self.get_player_owner(player_name)
                elif name == "get_matchups":
                    week = arguments.get("week")
                    return await self.get_matchups(week)
                elif name == "get_past_matchups":
                    season = arguments.get("season")
                    week = arguments.get("week")
                    league_index = arguments.get("league_index", 0)
                    return await self.get_past_matchups(season, week, league_index)
                elif name == "get_standings":
                    return await self.get_standings()
                elif name == "get_past_standings":
                    season = arguments.get("season")
                    league_index = arguments.get("league_index", 0)
                    return await self.get_past_standings(season, league_index)
                elif name == "get_transactions":
                    limit = arguments.get("limit", 10)
                    return await self.get_transactions(limit)
                elif name == "get_player_stats":
                    player_name = arguments.get("player_name", "")
                    week = arguments.get("week")
                    return await self.get_player_stats(player_name, week)
                else:
                    return [TextContent(
                        type="text",
                        text=f"Unknown tool: {name}"
                    )]
                    
            except Exception as e:
                logger.error(f"Error in tool {name}: {e}")
                return [TextContent(
                    type="text",
                    text=f"Error executing {name}: {str(e)}"
                )]

    async def get_league_info(self) -> List[TextContent]:
        """Get league information"""
        response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}")
        response.raise_for_status()
        league_data = response.json()
        
        # Get current week
        current_week = await self.get_current_week()
        
        # Determine scoring type
        scoring_type = "Standard"
        if league_data.get('scoring_settings', {}).get('rec', 0) > 0:
            scoring_type = "PPR"
        elif league_data.get('scoring_settings', {}).get('rec', 0) > 0:
            scoring_type = "Half PPR"
        
        # Format season start/end dates if available
        season = league_data.get('season', 'Unknown')
        start_date = league_data.get('start_date')
        if start_date:
            start_date = datetime.fromtimestamp(start_date / 1000).strftime('%Y-%m-%d')
        
        info = f"""League Information:
Name: {league_data.get('name', 'Unknown')}
Season: {season}
Current Week: {current_week}
Total Teams: {league_data.get('total_rosters', 'Unknown')}
Scoring Type: {scoring_type}
Draft Type: {league_data.get('draft_type', 'Unknown').capitalize()}
Start Date: {start_date or 'Unknown'}
League ID: {LEAGUE_ID}
Status: {league_data.get('status', 'Unknown')}"""
        
        return [TextContent(type="text", text=info)]

    async def get_league_rosters(self, team_name: str = "") -> List[TextContent]:
        """Get all team rosters with player names"""
        # Get rosters
        rosters_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/rosters")
        rosters_response.raise_for_status()
        rosters = rosters_response.json()
        
        # Get users to map owner names
        users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/users")
        users_response.raise_for_status()
        users = users_response.json()
        
        # Create user ID to name mapping
        user_map = {user['user_id']: user.get('display_name', user.get('username', 'Unknown')) for user in users}
        
        # Make sure player cache is up to date
        if not self.players_cache or (time.time() - self.cache_timestamp > self.cache_ttl):
            await self.refresh_player_cache()
        
        roster_info = "League Rosters:\n\n"
        
        for roster in rosters:
            owner_id = roster.get('owner_id', '')
            owner_name = user_map.get(owner_id, 'Unknown Owner')
            
            # Filter by team name if provided
            if team_name and team_name.lower() not in owner_name.lower():
                continue
                
            wins = roster.get('settings', {}).get('wins', 0)
            losses = roster.get('settings', {}).get('losses', 0)
            ties = roster.get('settings', {}).get('ties', 0)
            points_for = roster.get('settings', {}).get('fpts', 0)
            if isinstance(points_for, int):
                points_for = float(points_for) / 100
            roster_info += f"Team: {owner_name}\n"
            roster_info += f"Record: {wins}-{losses}"
            if ties > 0:
                roster_info += f"-{ties}"
            roster_info += f"\nPoints For: {points_for:.2f}\n"
            
            # Get players and organize by position
            players = roster.get('players', [])
            if players:
                positions = {
                    "QB": [],
                    "RB": [],
                    "WR": [],
                    "TE": [],
                    "K": [],
                    "DEF": [],
                    "Other": []
                }
                
                for player_id in players:
                    name = self.get_player_name(player_id)
                    position = self.get_player_position(player_id)
                    team = self.get_player_team(player_id)
                    
                    if position in positions:
                        positions[position].append(f"{name} ({team})")
                    else:
                        positions["Other"].append(f"{name} ({team}) - {position}")
                
                roster_info += "Players:\n"
                for pos, players_list in positions.items():
                    if players_list:
                        roster_info += f"  {pos}: {', '.join(players_list)}\n"
            
            roster_info += "\n"
            
        if team_name and roster_info == "League Rosters:\n\n":
            roster_info += f"No team found matching '{team_name}'"
            
        return [TextContent(type="text", text=roster_info)]

    async def get_draft_results(self, limit: int = 50) -> List[TextContent]:
        """Get draft results with player names"""
        # Get drafts for the league
        drafts_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/drafts")
        drafts_response.raise_for_status()
        drafts = drafts_response.json()
        
        if not drafts:
            return [TextContent(type="text", text="No draft found for this league.")]
            
        draft_id = drafts[0]['draft_id']
        
        # Get draft picks
        picks_response = await self.http_client.get(f"https://api.sleeper.app/v1/draft/{draft_id}/picks")
        picks_response.raise_for_status()
        picks = picks_response.json()
        
        # Get users to map owner names
        users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/users")
        users_response.raise_for_status()
        users = users_response.json()
        user_map = {user['user_id']: user.get('display_name', user.get('username', 'Unknown')) for user in users}
        
        # Make sure player cache is up to date
        if not self.players_cache or (time.time() - self.cache_timestamp > self.cache_ttl):
            await self.refresh_player_cache()
        
        draft_info = f"Draft Results ({len(picks)} total picks):\n\n"
        
        # Limit the number of picks to show
        display_picks = picks[:min(limit, len(picks))]
        
        for pick in display_picks:
            owner_name = user_map.get(pick.get('picked_by', ''), 'Unknown')
            player_id = pick.get('player_id', '')
            player_name = self.get_player_name(player_id)
            position = self.get_player_position(player_id)
            team = self.get_player_team(player_id)
            round_num = pick.get('round', 0)
            pick_num = pick.get('draft_slot', 0)
            overall = pick.get('pick_no', 0)
            
            draft_info += f"Round {round_num}, Pick {pick_num} (#{overall} overall): {player_name} ({team} - {position}) - {owner_name}\n"
            
        return [TextContent(type="text", text=draft_info)]
        
    async def get_past_draft_results(self, season: str, draft_index: int = 0, limit: int = 50) -> List[TextContent]:
        """Get draft results from a previous season"""
        logger.info(f"Getting past draft results for season {season}, draft index {draft_index}")
        
        try:
            # First, get the user's league history
            user_leagues_response = await self.http_client.get(f"https://api.sleeper.app/v1/user/{self.user_id}/leagues/nfl/{season}")
            user_leagues_response.raise_for_status()
            user_leagues = user_leagues_response.json()
            
            if not user_leagues:
                return [TextContent(type="text", text=f"No leagues found for season {season}.")]
            
            # Find leagues that match the current league name or have the same users
            matching_leagues = []
            current_league_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}")
            current_league_response.raise_for_status()
            current_league = current_league_response.json()
            current_league_name = current_league.get('name', '').lower()
            
            # Get current league users
            current_users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/users")
            current_users_response.raise_for_status()
            current_users = current_users_response.json()
            current_user_ids = {user['user_id'] for user in current_users}
            
            for league in user_leagues:
                league_name = league.get('name', '').lower()
                league_id = league.get('league_id')
                
                # Check if league name matches
                if current_league_name in league_name or league_name in current_league_name:
                    matching_leagues.append(league)
                    continue
                
                # Check if league has similar users
                league_users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{league_id}/users")
                league_users_response.raise_for_status()
                league_users = league_users_response.json()
                league_user_ids = {user['user_id'] for user in league_users}
                
                # If there's significant overlap in users, consider it a match
                common_users = current_user_ids.intersection(league_user_ids)
                if len(common_users) >= min(3, len(current_user_ids) / 2):
                    matching_leagues.append(league)
            
            if not matching_leagues:
                return [TextContent(type="text", text=f"No matching leagues found for season {season}.")]
            
            # Use the most relevant league (first match or user can specify with draft_index)
            if draft_index >= len(matching_leagues):
                return [TextContent(type="text", text=f"Draft index {draft_index} is out of range. Only {len(matching_leagues)} matching leagues found.")]
            
            past_league = matching_leagues[draft_index]
            past_league_id = past_league['league_id']
            past_league_name = past_league.get('name', 'Unknown League')
            
            # Get drafts for the past league
            drafts_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{past_league_id}/drafts")
            drafts_response.raise_for_status()
            drafts = drafts_response.json()
            
            if not drafts:
                return [TextContent(type="text", text=f"No draft found for {past_league_name} in season {season}.")]
                
            draft_id = drafts[0]['draft_id']
            draft_type = drafts[0].get('type', 'Unknown')
            draft_status = drafts[0].get('status', 'Unknown')
            
            # Get draft picks
            picks_response = await self.http_client.get(f"https://api.sleeper.app/v1/draft/{draft_id}/picks")
            picks_response.raise_for_status()
            picks = picks_response.json()
            
            if not picks:
                return [TextContent(type="text", text=f"No draft picks found for {past_league_name} in season {season}.")]
            
            # Get users to map owner names
            users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{past_league_id}/users")
            users_response.raise_for_status()
            users = users_response.json()
            user_map = {user['user_id']: user.get('display_name', user.get('username', 'Unknown')) for user in users}
            
            # Make sure player cache is up to date
            if not self.players_cache or (time.time() - self.cache_timestamp > self.cache_ttl):
                await self.refresh_player_cache()
            
            draft_info = f"Draft Results for {past_league_name} (Season {season}):\n"
            draft_info += f"Draft Type: {draft_type.capitalize()}, Status: {draft_status.capitalize()}\n"
            draft_info += f"Total Picks: {len(picks)}\n\n"
            
            # Limit the number of picks to show
            display_picks = picks[:min(limit, len(picks))]
            
            for pick in display_picks:
                owner_name = user_map.get(pick.get('picked_by', ''), 'Unknown')
                player_id = pick.get('player_id', '')
                player_name = self.get_player_name(player_id)
                position = self.get_player_position(player_id)
                team = self.get_player_team(player_id)
                round_num = pick.get('round', 0)
                pick_num = pick.get('draft_slot', 0)
                overall = pick.get('pick_no', 0)
                
                draft_info += f"Round {round_num}, Pick {pick_num} (#{overall} overall): {player_name} ({team} - {position}) - {owner_name}\n"
                
            return [TextContent(type="text", text=draft_info)]
            
        except Exception as e:
            logger.error(f"Error getting past draft results: {e}")
            return [TextContent(type="text", text=f"Error retrieving past draft results: {str(e)}")]

    async def search_player(self, player_name: str) -> List[TextContent]:
        """Search for players by name"""
        if not player_name:
            return [TextContent(type="text", text="Please provide a player name to search for.")]
        
        matching_players = await self.find_players_by_name(player_name)
        
        if not matching_players:
            return [TextContent(type="text", text=f"No players found matching '{player_name}'.")]
        
        result = f"Players matching '{player_name}':\n\n"
        
        for idx, player in enumerate(matching_players, 1):
            result += f"{idx}. {player['name']} ({player['team']} - {player['position']})\n"
        
        return [TextContent(type="text", text=result)]

    async def get_player_owner(self, player_name: str) -> List[TextContent]:
        """Find which team owns a specific player"""
        if not player_name:
            return [TextContent(type="text", text="Please provide a player name to search for.")]
        
        # Find matching players
        matching_players = await self.find_players_by_name(player_name)
        
        if not matching_players:
            return [TextContent(type="text", text=f"No players found matching '{player_name}'.")]
        
        # Get rosters
        rosters_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/rosters")
        rosters_response.raise_for_status()
        rosters = rosters_response.json()
        
        # Get users to map owner names
        users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/users")
        users_response.raise_for_status()
        users = users_response.json()
        user_map = {user['user_id']: user.get('display_name', user.get('username', 'Unknown')) for user in users}
        
        result = f"Ownership results for '{player_name}':\n\n"
        found_any = False
        
        # Check each matching player
        for player in matching_players[:5]:  # Limit to top 5 matches
            player_id = player["player_id"]
            player_name = player["name"]
            position = player["position"]
            team = player["team"]
            
            owner_found = False
            
            # Check each roster for this player
            for roster in rosters:
                if player_id in roster.get('players', []):
                    owner_id = roster.get('owner_id', '')
                    owner_name = user_map.get(owner_id, 'Unknown Owner')
                    
                    result += f"{player_name} ({team} - {position}) is owned by: {owner_name}\n"
                    owner_found = True
                    found_any = True
                    break
            
            if not owner_found:
                result += f"{player_name} ({team} - {position}) is not owned by any team in this league.\n"
        
        if not found_any:
            result += "None of the matching players are owned in this league."
            
        return [TextContent(type="text", text=result)]

    async def get_matchups(self, week: Optional[int] = None) -> List[TextContent]:
        """Get matchups for a specific week"""
        if week is None:
            week = await self.get_current_week()
            
        matchups_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/matchups/{week}")
        matchups_response.raise_for_status()
        matchups = matchups_response.json()
        
        # Get users to map owner names
        users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/users")
        users_response.raise_for_status()
        users = users_response.json()
        
        # Get rosters to map roster_id to user_id
        rosters_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/rosters")
        rosters_response.raise_for_status()
        rosters = rosters_response.json()
        
        roster_to_user = {roster['roster_id']: roster.get('owner_id') for roster in rosters}
        user_map = {user['user_id']: user.get('display_name', user.get('username', 'Unknown')) for user in users}
        
        matchup_info = f"Week {week} Matchups:\n\n"
        
        # Group matchups by matchup_id
        matchup_groups = {}
        for matchup in matchups:
            matchup_id = matchup.get('matchup_id')
            if matchup_id not in matchup_groups:
                matchup_groups[matchup_id] = []
            matchup_groups[matchup_id].append(matchup)
        
        for matchup_id, teams in matchup_groups.items():
            if len(teams) == 2:
                team1, team2 = teams
                owner1 = user_map.get(roster_to_user.get(team1['roster_id']), 'Unknown')
                owner2 = user_map.get(roster_to_user.get(team2['roster_id']), 'Unknown')
                points1 = team1.get('points', 0)
                points2 = team2.get('points', 0)
                
                # Format points properly
                if isinstance(points1, int):
                    points1 = float(points1) / 100
                if isinstance(points2, int):
                    points2 = float(points2) / 100
                
                matchup_info += f"{owner1} ({points1:.2f} pts) vs {owner2} ({points2:.2f} pts)\n"
                
                # Add projected points if available
                proj1 = team1.get('projected_points', 0)
                proj2 = team2.get('projected_points', 0)
                if proj1 or proj2:
                    if isinstance(proj1, int):
                        proj1 = float(proj1) / 100
                    if isinstance(proj2, int):
                        proj2 = float(proj2) / 100
                    matchup_info += f"Projected: {owner1} ({proj1:.2f} pts) vs {owner2} ({proj2:.2f} pts)\n"
                
                matchup_info += "\n"
        
        if not matchup_groups:
            matchup_info += "No matchups found for this week."
        
        return [TextContent(type="text", text=matchup_info)]
        
    async def get_past_matchups(self, season: str, week: int, league_index: int = 0) -> List[TextContent]:
        """Get matchups from a previous season"""
        logger.info(f"Getting past matchups for season {season}, week {week}, league index {league_index}")
        
        try:
            # First, get the user's league history
            user_leagues_response = await self.http_client.get(f"https://api.sleeper.app/v1/user/{self.user_id}/leagues/nfl/{season}")
            user_leagues_response.raise_for_status()
            user_leagues = user_leagues_response.json()
            
            if not user_leagues:
                return [TextContent(type="text", text=f"No leagues found for season {season}.")]
            
            # Find leagues that match the current league name or have the same users
            matching_leagues = []
            current_league_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}")
            current_league_response.raise_for_status()
            current_league = current_league_response.json()
            current_league_name = current_league.get('name', '').lower()
            
            # Get current league users
            current_users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/users")
            current_users_response.raise_for_status()
            current_users = current_users_response.json()
            current_user_ids = {user['user_id'] for user in current_users}
            
            for league in user_leagues:
                league_name = league.get('name', '').lower()
                league_id = league.get('league_id')
                
                # Check if league name matches
                if current_league_name in league_name or league_name in current_league_name:
                    matching_leagues.append(league)
                    continue
                
                # Check if league has similar users
                league_users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{league_id}/users")
                league_users_response.raise_for_status()
                league_users = league_users_response.json()
                league_user_ids = {user['user_id'] for user in league_users}
                
                # If there's significant overlap in users, consider it a match
                common_users = current_user_ids.intersection(league_user_ids)
                if len(common_users) >= min(3, len(current_user_ids) / 2):
                    matching_leagues.append(league)
            
            if not matching_leagues:
                return [TextContent(type="text", text=f"No matching leagues found for season {season}.")]
            
            # Use the most relevant league (first match or user can specify with league_index)
            if league_index >= len(matching_leagues):
                return [TextContent(type="text", text=f"League index {league_index} is out of range. Only {len(matching_leagues)} matching leagues found.")]
            
            past_league = matching_leagues[league_index]
            past_league_id = past_league['league_id']
            past_league_name = past_league.get('name', 'Unknown League')
            
            # Get matchups for the specified week
            matchups_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{past_league_id}/matchups/{week}")
            matchups_response.raise_for_status()
            matchups = matchups_response.json()
            
            if not matchups:
                return [TextContent(type="text", text=f"No matchups found for week {week} in {past_league_name} (Season {season}).")]
            
            # Get users to map owner names
            users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{past_league_id}/users")
            users_response.raise_for_status()
            users = users_response.json()
            
            # Get rosters to map roster_id to user_id
            rosters_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{past_league_id}/rosters")
            rosters_response.raise_for_status()
            rosters = rosters_response.json()
            
            roster_to_user = {roster['roster_id']: roster.get('owner_id') for roster in rosters}
            user_map = {user['user_id']: user.get('display_name', user.get('username', 'Unknown')) for user in users}
            
            matchup_info = f"Week {week} Matchups for {past_league_name} (Season {season}):\n\n"
            
            # Group matchups by matchup_id
            matchup_groups = {}
            for matchup in matchups:
                matchup_id = matchup.get('matchup_id')
                if matchup_id not in matchup_groups:
                    matchup_groups[matchup_id] = []
                matchup_groups[matchup_id].append(matchup)
            
            for matchup_id, teams in matchup_groups.items():
                if len(teams) == 2:
                    team1, team2 = teams
                    owner1 = user_map.get(roster_to_user.get(team1['roster_id']), 'Unknown')
                    owner2 = user_map.get(roster_to_user.get(team2['roster_id']), 'Unknown')
                    points1 = team1.get('points', 0)
                    points2 = team2.get('points', 0)
                    
                    # Format points properly
                    if isinstance(points1, int):
                        points1 = float(points1) / 100
                    if isinstance(points2, int):
                        points2 = float(points2) / 100
                    
                    # Determine winner
                    result = ""
                    if points1 > points2:
                        result = f"({owner1} won by {points1 - points2:.2f} pts)"
                    elif points2 > points1:
                        result = f"({owner2} won by {points2 - points1:.2f} pts)"
                    else:
                        result = "(Tie)"
                    
                    matchup_info += f"{owner1} ({points1:.2f} pts) vs {owner2} ({points2:.2f} pts) {result}\n"
                    
                    # Add starters if available
                    if 'starters' in team1 and 'starters' in team2 and self.players_cache:
                        matchup_info += "\nStarters:\n"
                        
                        # Team 1 starters
                        matchup_info += f"{owner1}:\n"
                        for player_id in team1.get('starters', []):
                            player_name = self.get_player_name(player_id)
                            position = self.get_player_position(player_id)
                            team = self.get_player_team(player_id)
                            points = team1.get('players_points', {}).get(player_id, 0)
                            if isinstance(points, int):
                                points = float(points) / 100
                            matchup_info += f"  {player_name} ({team} - {position}): {points:.2f} pts\n"
                        
                        # Team 2 starters
                        matchup_info += f"\n{owner2}:\n"
                        for player_id in team2.get('starters', []):
                            player_name = self.get_player_name(player_id)
                            position = self.get_player_position(player_id)
                            team = self.get_player_team(player_id)
                            points = team2.get('players_points', {}).get(player_id, 0)
                            if isinstance(points, int):
                                points = float(points) / 100
                            matchup_info += f"  {player_name} ({team} - {position}): {points:.2f} pts\n"
                    
                    matchup_info += "\n"
            
            if not matchup_groups:
                matchup_info += "No matchups found for this week."
            
            return [TextContent(type="text", text=matchup_info)]
            
        except Exception as e:
            logger.error(f"Error getting past matchups: {e}")
            return [TextContent(type="text", text=f"Error retrieving past matchups: {str(e)}")]

    async def get_standings(self) -> List[TextContent]:
        """Get current league standings"""
        # Get rosters
        rosters_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/rosters")
        rosters_response.raise_for_status()
        rosters = rosters_response.json()
        
        # Get users to map owner names
        users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/users")
        users_response.raise_for_status()
        users = users_response.json()
        
        # Create user ID to name mapping
        user_map = {user['user_id']: user.get('display_name', user.get('username', 'Unknown')) for user in users}
        
        # Build standings data
        standings = []
        for roster in rosters:
            owner_id = roster.get('owner_id', '')
            owner_name = user_map.get(owner_id, 'Unknown Owner')
            settings = roster.get('settings', {})
            
            wins = settings.get('wins', 0)
            losses = settings.get('losses', 0)
            ties = settings.get('ties', 0)
            points_for = settings.get('fpts', 0)
            points_against = settings.get('fpts_against', 0)
            
            # Format points properly
            if isinstance(points_for, int):
                points_for = float(points_for) / 100
            if isinstance(points_against, int):
                points_against = float(points_against) / 100
                
            # Calculate win percentage
            total_games = wins + losses + ties
            win_pct = 0.0
            if total_games > 0:
                win_pct = (wins + (ties * 0.5)) / total_games
                
            standings.append({
                'owner_name': owner_name,
                'wins': wins,
                'losses': losses,
                'ties': ties,
                'win_pct': win_pct,
                'points_for': points_for,
                'points_against': points_against
            })
        
        # Sort by win percentage, then by points for
        standings.sort(key=lambda x: (x['win_pct'], x['points_for']), reverse=True)
        
        # Format standings for display
        standings_info = "Current League Standings:\n\n"
        standings_info += "Rank | Team | Record | Win% | PF | PA\n"
        standings_info += "-" * 50 + "\n"
        
        for i, team in enumerate(standings, 1):
            record = f"{team['wins']}-{team['losses']}"
            if team['ties'] > 0:
                record += f"-{team['ties']}"
                
            standings_info += f"{i}. {team['owner_name']} | {record} | {team['win_pct']:.3f} | {team['points_for']:.2f} | {team['points_against']:.2f}\n"
            
        return [TextContent(type="text", text=standings_info)]
        
    async def get_past_standings(self, season: str, league_index: int = 0) -> List[TextContent]:
        """Get standings from a previous season"""
        logger.info(f"Getting past standings for season {season}, league index {league_index}")
        
        try:
            # First, get the user's league history
            user_leagues_response = await self.http_client.get(f"https://api.sleeper.app/v1/user/{self.user_id}/leagues/nfl/{season}")
            user_leagues_response.raise_for_status()
            user_leagues = user_leagues_response.json()
            
            if not user_leagues:
                return [TextContent(type="text", text=f"No leagues found for season {season}.")]
            
            # Find leagues that match the current league name or have the same users
            matching_leagues = []
            current_league_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}")
            current_league_response.raise_for_status()
            current_league = current_league_response.json()
            current_league_name = current_league.get('name', '').lower()
            
            # Get current league users
            current_users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/users")
            current_users_response.raise_for_status()
            current_users = current_users_response.json()
            current_user_ids = {user['user_id'] for user in current_users}
            
            for league in user_leagues:
                league_name = league.get('name', '').lower()
                league_id = league.get('league_id')
                
                # Check if league name matches
                if current_league_name in league_name or league_name in current_league_name:
                    matching_leagues.append(league)
                    continue
                
                # Check if league has similar users
                league_users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{league_id}/users")
                league_users_response.raise_for_status()
                league_users = league_users_response.json()
                league_user_ids = {user['user_id'] for user in league_users}
                
                # If there's significant overlap in users, consider it a match
                common_users = current_user_ids.intersection(league_user_ids)
                if len(common_users) >= min(3, len(current_user_ids) / 2):
                    matching_leagues.append(league)
            
            if not matching_leagues:
                return [TextContent(type="text", text=f"No matching leagues found for season {season}.")]
            
            # Use the most relevant league (first match or user can specify with league_index)
            if league_index >= len(matching_leagues):
                return [TextContent(type="text", text=f"League index {league_index} is out of range. Only {len(matching_leagues)} matching leagues found.")]
            
            past_league = matching_leagues[league_index]
            past_league_id = past_league['league_id']
            past_league_name = past_league.get('name', 'Unknown League')
            
            # Get rosters
            rosters_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{past_league_id}/rosters")
            rosters_response.raise_for_status()
            rosters = rosters_response.json()
            
            # Get users to map owner names
            users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{past_league_id}/users")
            users_response.raise_for_status()
            users = users_response.json()
            
            # Create user ID to name mapping
            user_map = {user['user_id']: user.get('display_name', user.get('username', 'Unknown')) for user in users}
            
            # Build standings data
            standings = []
            for roster in rosters:
                owner_id = roster.get('owner_id', '')
                owner_name = user_map.get(owner_id, 'Unknown Owner')
                settings = roster.get('settings', {})
                
                wins = settings.get('wins', 0)
                losses = settings.get('losses', 0)
                ties = settings.get('ties', 0)
                points_for = settings.get('fpts', 0)
                points_against = settings.get('fpts_against', 0)
                
                # Format points properly
                if isinstance(points_for, int):
                    points_for = float(points_for) / 100
                if isinstance(points_against, int):
                    points_against = float(points_against) / 100
                    
                # Calculate win percentage
                total_games = wins + losses + ties
                win_pct = 0.0
                if total_games > 0:
                    win_pct = (wins + (ties * 0.5)) / total_games
                    
                standings.append({
                    'owner_name': owner_name,
                    'wins': wins,
                    'losses': losses,
                    'ties': ties,
                    'win_pct': win_pct,
                    'points_for': points_for,
                    'points_against': points_against
                })
            
            # Sort by win percentage, then by points for
            standings.sort(key=lambda x: (x['win_pct'], x['points_for']), reverse=True)
            
            # Format standings for display
            standings_info = f"Standings for {past_league_name} (Season {season}):\n\n"
            standings_info += "Rank | Team | Record | Win% | PF | PA\n"
            standings_info += "-" * 50 + "\n"
            
            for i, team in enumerate(standings, 1):
                record = f"{team['wins']}-{team['losses']}"
                if team['ties'] > 0:
                    record += f"-{team['ties']}"
                    
                standings_info += f"{i}. {team['owner_name']} | {record} | {team['win_pct']:.3f} | {team['points_for']:.2f} | {team['points_against']:.2f}\n"
                
            return [TextContent(type="text", text=standings_info)]
            
        except Exception as e:
            logger.error(f"Error getting past standings: {e}")
            return [TextContent(type="text", text=f"Error retrieving past standings: {str(e)}")]
    
    async def get_transactions(self, limit: int = 10) -> List[TextContent]:
        """Get recent transactions in the league"""
        try:
            # Get transactions
            transactions_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/transactions/{await self.get_current_week()}")
            transactions_response.raise_for_status()
            transactions = transactions_response.json()
            
            # Get users to map owner names
            users_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/users")
            users_response.raise_for_status()
            users = users_response.json()
            user_map = {user['user_id']: user.get('display_name', user.get('username', 'Unknown')) for user in users}
            
            # Make sure player cache is up to date
            if not self.players_cache or (time.time() - self.cache_timestamp > self.cache_ttl):
                await self.refresh_player_cache()
            
            # Sort transactions by date (newest first)
            transactions.sort(key=lambda x: x.get('status_updated', 0), reverse=True)
            
            # Limit the number of transactions to show
            display_transactions = transactions[:min(limit, len(transactions))]
            
            if not display_transactions:
                return [TextContent(type="text", text="No recent transactions found.")]
            
            transaction_info = f"Recent Transactions (Last {min(limit, len(transactions))}):\n\n"
            
            for transaction in display_transactions:
                # Get transaction type and date
                transaction_type = transaction.get('type', 'unknown')
                status_updated = transaction.get('status_updated')
                date_str = "Unknown date"
                if status_updated:
                    date_str = datetime.fromtimestamp(status_updated / 1000).strftime('%Y-%m-%d %H:%M')
                
                # Get teams involved
                roster_ids = transaction.get('roster_ids', [])
                team_names = []
                for roster_id in roster_ids:
                    for user_id, user_name in user_map.items():
                        # Find the roster that belongs to this user
                        for roster in transaction.get('rosters', []):
                            if roster.get('roster_id') == roster_id and roster.get('owner_id') == user_id:
                                team_names.append(user_name)
                                break
                
                transaction_info += f"[{date_str}] "
                
                # Format based on transaction type
                if transaction_type == "trade":
                    transaction_info += "Trade between "
                    transaction_info += " and ".join(team_names) + ":\n"
                    
                    # Show what each team got
                    for i, roster_id in enumerate(roster_ids):
                        if i < len(team_names):
                            transaction_info += f"{team_names[i]} received: "
                            
                            # Get players added
                            adds = []
                            for player_id, destination in transaction.get('adds', {}).items():
                                if destination == roster_id:
                                    player_name = self.get_player_name(player_id)
                                    position = self.get_player_position(player_id)
                                    team = self.get_player_team(player_id)
                                    adds.append(f"{player_name} ({team} - {position})")
                            
                            if adds:
                                transaction_info += ", ".join(adds)
                            else:
                                transaction_info += "No players"
                                
                            # Get draft picks added
                            draft_picks = []
                            for pick in transaction.get('draft_picks', []):
                                if pick.get('owner_id') == roster_id:
                                    season = pick.get('season', '?')
                                    round_num = pick.get('round', '?')
                                    draft_picks.append(f"{season} Round {round_num} pick")
                            
                            if draft_picks:
                                if adds:
                                    transaction_info += " and "
                                transaction_info += ", ".join(draft_picks)
                                
                            transaction_info += "\n"
                    
                elif transaction_type == "waiver":
                    # Waiver claims
                    for player_id, destination in transaction.get('adds', {}).items():
                        for i, roster_id in enumerate(roster_ids):
                            if destination == roster_id and i < len(team_names):
                                player_name = self.get_player_name(player_id)
                                position = self.get_player_position(player_id)
                                team = self.get_player_team(player_id)
                                
                                transaction_info += f"{team_names[i]} claimed {player_name} ({team} - {position})"
                                
                                # Show who was dropped
                                for drop_id, source in transaction.get('drops', {}).items():
                                    if source == roster_id:
                                        drop_name = self.get_player_name(drop_id)
                                        drop_position = self.get_player_position(drop_id)
                                        drop_team = self.get_player_team(drop_id)
                                        transaction_info += f" and dropped {drop_name} ({drop_team} - {drop_position})"
                                        break
                                
                                transaction_info += "\n"
                                break
                
                elif transaction_type == "free_agent":
                    # Free agent pickups
                    for player_id, destination in transaction.get('adds', {}).items():
                        for i, roster_id in enumerate(roster_ids):
                            if destination == roster_id and i < len(team_names):
                                player_name = self.get_player_name(player_id)
                                position = self.get_player_position(player_id)
                                team = self.get_player_team(player_id)
                                
                                transaction_info += f"{team_names[i]} added {player_name} ({team} - {position})"
                                
                                # Show who was dropped
                                for drop_id, source in transaction.get('drops', {}).items():
                                    if source == roster_id:
                                        drop_name = self.get_player_name(drop_id)
                                        drop_position = self.get_player_position(drop_id)
                                        drop_team = self.get_player_team(drop_id)
                                        transaction_info += f" and dropped {drop_name} ({drop_team} - {drop_position})"
                                        break
                                
                                transaction_info += "\n"
                                break
                
                else:
                    # Other transaction types
                    transaction_info += f"{transaction_type.capitalize()} transaction involving {', '.join(team_names)}\n"
                
                transaction_info += "\n"
            
            return [TextContent(type="text", text=transaction_info)]
            
        except Exception as e:
            logger.error(f"Error getting transactions: {e}")
            return [TextContent(type="text", text=f"Error retrieving transactions: {str(e)}")]
    
    async def get_player_stats(self, player_name: str, week: Optional[int] = None) -> List[TextContent]:
        """Get stats for a specific player"""
        if not player_name:
            return [TextContent(type="text", text="Please provide a player name to search for.")]
        
        # Find matching players
        matching_players = await self.find_players_by_name(player_name)
        
        if not matching_players:
            return [TextContent(type="text", text=f"No players found matching '{player_name}'.")]
        
        # Use the best match
        player = matching_players[0]
        player_id = player["player_id"]
        player_name = player["name"]
        position = player["position"]
        team = player["team"]
        
        # Make sure player cache is up to date
        if not self.players_cache or (time.time() - self.cache_timestamp > self.cache_ttl):
            await self.refresh_player_cache()
        
        # Get player details from cache
        player_details = self.players_cache.get(player_id, {})
        
        # Get current week for context
        current_week = await self.get_current_week()
        
        # Get player stats from Sleeper API
        # Note: Sleeper API has limited player stats, so we'll show what's available
        stats_info = f"Stats for {player_name} ({team} - {position}):\n\n"
        
        # Add basic player info
        stats_info += "Player Information:\n"
        stats_info += f"Age: {player_details.get('age', 'Unknown')}\n"
        stats_info += f"Height: {player_details.get('height', 'Unknown')}\n"
        stats_info += f"Weight: {player_details.get('weight', 'Unknown')}\n"
        stats_info += f"Years Pro: {player_details.get('years_exp', 'Unknown')}\n"
        stats_info += f"College: {player_details.get('college', 'Unknown')}\n"
        stats_info += f"Status: {player_details.get('status', 'Unknown')}\n\n"
        
        # Try to get player stats from rosters
        try:
            # Get rosters
            rosters_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/rosters")
            rosters_response.raise_for_status()
            rosters = rosters_response.json()
            
            # If week is specified, get matchups for that week
            if week is not None:
                matchups_response = await self.http_client.get(f"https://api.sleeper.app/v1/league/{LEAGUE_ID}/matchups/{week}")
                matchups_response.raise_for_status()
                matchups = matchups_response.json()
                
                stats_info += f"Week {week} Stats:\n"
                
                # Find the player in matchups
                player_found = False
                for matchup in matchups:
                    if player_id in matchup.get('players_points', {}):
                        points = matchup.get('players_points', {}).get(player_id, 0)
                        if isinstance(points, int):
                            points = float(points) / 100
                        stats_info += f"Fantasy Points: {points:.2f}\n"
                        player_found = True
                        break
                
                if not player_found:
                    stats_info += "No stats available for this week.\n"
            else:
                # Get season stats
                stats_info += "Season Stats:\n"
                
                # Find the player in rosters to get season stats
                player_found = False
                for roster in rosters:
                    if player_id in roster.get('players', []):
                        # Unfortunately, Sleeper API doesn't provide detailed season stats
                        # We can only show if the player is on a roster
                        stats_info += "This player is on a roster in your league.\n"
                        player_found = True
                        break
                
                if not player_found:
                    stats_info += "This player is not on any roster in your league.\n"
                
                # Add projected stats if available
                if 'projected_points' in player_details:
                    proj_points = player_details.get('projected_points', 0)
                    if isinstance(proj_points, int):
                        proj_points = float(proj_points) / 100
                    stats_info += f"Projected Points: {proj_points:.2f}\n"
        
        except Exception as e:
            logger.error(f"Error getting player stats: {e}")
            stats_info += f"Error retrieving stats: {str(e)}\n"
        
        # Add note about limited stats
        stats_info += "\nNote: Sleeper API provides limited player statistics. For detailed stats, you may need to use other fantasy platforms."
        
        return [TextContent(type="text", text=stats_info)]

async def main():
    # Initialize and run the server
    server_instance = SleeperFantasyFootballServer()
    await server_instance.initialize()
    
    # Set up server options using InitializationOptions class
    options = InitializationOptions(
        server_name="sleeper-fantasy-football",
        server_version="1.0.0",
        capabilities={},
        tools_changed_notification=NotificationOptions(tools_changed=True)
    )
    
    # Run the server with stdio
    async with stdio_server() as (read_stream, write_stream):
        # Server is now running, wait until it's closed
        await server_instance.server.run(read_stream, write_stream, options)
        
    # Log that the server is running
    logger.info("Sleeper Fantasy Football MCP server running on stdio")

if __name__ == "__main__":
    asyncio.run(main())
