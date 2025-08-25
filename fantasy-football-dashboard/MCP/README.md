# Sleeper Fantasy Football MCP Server

This is a Model Context Protocol (MCP) server that allows you to interact with your Sleeper fantasy football league through Claude Desktop. With this server, you can ask questions about your league, check standings, view rosters, and more.

**Updated to use MCP version 1.9.4**

## Features

- Get league information and standings
- View team rosters with player details
- Check weekly matchups
- See draft results
- Search for players
- Find which team owns a specific player
- View recent transactions
- Get player stats and information

## Installation

### Prerequisites

- Python 3.8 or higher
- Claude Desktop application

### Setup

1. Clone or download this repository to your local machine.

2. Install the required dependencies:

```bash
cd sleeper_fantasy_football_mcp
pip install -r requirements.txt
```

3. Configure your league information:
   - Open `config.py` and update the `USERNAME` and `LEAGUE_ID` variables with your Sleeper username and league ID.
   - You can also adjust other settings like cache TTL and logging level in this file.

## Usage

1. Start the MCP server:

```bash
python server.py
```

2. In Claude Desktop, add this MCP server:
   - Go to Settings > MCP Servers
   - Click "Add Server"
   - Enter the path to the server.py file
   - Click "Connect"

3. Once connected, you can ask Claude questions about your fantasy football league, such as:
   - "Who's on my team?"
   - "What's the current standings in my league?"
   - "Show me this week's matchups"
   - "Who drafted Patrick Mahomes?"
   - "Which team has Travis Kelce?"
   - "What are the recent transactions in my league?"

## Available Tools

The server provides the following tools:

| Tool Name | Description |
|-----------|-------------|
| `get_league_info` | Get basic information about your fantasy league |
| `get_league_rosters` | Get all team rosters in the league with player names |
| `get_draft_results` | Get the draft results for the league |
| `get_past_draft_results` | Get draft results from a previous season |
| `search_player` | Search for a player by name |
| `get_player_owner` | Find which team owns a specific player |
| `get_matchups` | Get matchups for a specific week |
| `get_past_matchups` | Get matchups from a previous season |
| `get_standings` | Get current league standings |
| `get_past_standings` | Get standings from a previous season |
| `get_transactions` | Get recent transactions in the league |
| `get_player_stats` | Get stats for a specific player |

## Configuration

You can modify the following configuration variables in `config.py`:

- `USERNAME`: Your Sleeper username
- `LEAGUE_ID`: Your Sleeper league ID
- `CACHE_TTL`: How long to cache player data (in seconds)
- `LOG_LEVEL`: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)

## Troubleshooting

- If you encounter connection issues, make sure the server is running before trying to connect from Claude Desktop.
- If player data seems outdated, the server automatically refreshes its cache every hour. You can restart the server to force a refresh.
- For any other issues, check the server logs for error messages.

## Limitations

- The Sleeper API has limited player statistics data. For detailed player stats, you may need to use other fantasy platforms.
- The server caches player data to improve performance, which is refreshed hourly.
