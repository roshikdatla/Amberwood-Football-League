const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MCP Server connection
class MCPServerConnection {
  constructor() {
    this.mcpProcess = null;
    this.isConnected = false;
  }

  async startMCPServer() {
    try {
      console.log('Starting MCP server...');
      
      // For now, we'll use mock data instead of a Python MCP server
      // In a real implementation, you would connect to your actual MCP server here
      console.log('Using mock MCP data for development');
      
      this.isConnected = true;
      console.log('MCP server started successfully');
      
    } catch (error) {
      console.error('Failed to start MCP server:', error);
      throw error;
    }
  }

  async callMCPTool(toolName, args = {}) {
    if (!this.isConnected) {
      throw new Error('MCP server not connected');
    }

    // In a real implementation, you'd send JSON-RPC messages to the MCP server
    // For now, we'll simulate the responses based on your MCP server tools
    
    switch (toolName) {
      case 'get_league_info':
        return {
          name: 'Amberwood Fantasy Football League',
          season: '2025',
          total_teams: 12,
          playoff_teams: 6,
          current_week: 14
        };
        
      case 'get_standings':
        return [
          { team: 'Team Alpha', wins: 10, losses: 3, points_for: 1247.5 },
          { team: 'Team Beta', wins: 9, losses: 4, points_for: 1198.2 },
          { team: 'Team Gamma', wins: 9, losses: 4, points_for: 1156.7 }
        ];
        
      case 'get_league_rosters':
        return {
          'Team Alpha': ['Josh Allen', 'Christian McCaffrey', 'Tyreek Hill'],
          'Team Beta': ['Lamar Jackson', 'Saquon Barkley', 'Davante Adams']
        };
        
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  stop() {
    if (this.mcpProcess) {
      this.mcpProcess.kill();
      this.isConnected = false;
    }
  }
}

const mcpConnection = new MCPServerConnection();

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mcpConnected: mcpConnection.isConnected,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Processing chat message:', message);
    
    // Analyze the message to determine what MCP tools to call
    const response = await processLeagueQuestion(message);
    
    res.json({ 
      response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
});

app.post('/api/mcp/:tool', async (req, res) => {
  try {
    const { tool } = req.params;
    const args = req.body;
    
    console.log(`Calling MCP tool: ${tool} with args:`, args);
    
    const result = await mcpConnection.callMCPTool(tool, args);
    
    res.json({
      tool,
      result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('MCP API error:', error);
    res.status(500).json({ 
      error: 'Failed to call MCP tool',
      details: error.message 
    });
  }
});

async function processLeagueQuestion(question) {
  const lowerQuestion = question.toLowerCase();
  
  try {
    if (lowerQuestion.includes('standing') || lowerQuestion.includes('rank')) {
      const standings = await mcpConnection.callMCPTool('get_standings');
      return `Current League Standings:\n\n${standings.map((team, i) => 
        `${i + 1}. ${team.team} - ${team.wins}-${team.losses} (${team.points_for} PF)`
      ).join('\n')}\n\nThe playoff race is heating up!`;
    }
    
    if (lowerQuestion.includes('roster') || lowerQuestion.includes('player')) {
      const rosters = await mcpConnection.callMCPTool('get_league_rosters');
      return `League Rosters:\n\n${Object.entries(rosters).map(([team, players]) => 
        `${team}: ${players.slice(0, 3).join(', ')}...`
      ).join('\n')}\n\nWould you like details on a specific team?`;
    }
    
    if (lowerQuestion.includes('league') || lowerQuestion.includes('info')) {
      const info = await mcpConnection.callMCPTool('get_league_info');
      return `${info.name}\n\nSeason: ${info.season}\nTeams: ${info.total_teams}\nPlayoff Teams: ${info.playoff_teams}\nCurrent Week: ${info.current_week}\n\nWhat would you like to know more about?`;
    }
    
    // Default response
    return `I can help you with information about your league! Try asking about:\n\n• Current standings\n• Team rosters\n• League information\n• Recent trades\n• Weekly matchups\n\nWhat would you like to know?`;
    
  } catch (error) {
    console.error('Error processing question:', error);
    return `Sorry, I encountered an error while fetching league data. Please try again later.`;
  }
}

// Start server
async function startServer() {
  try {
    // Start MCP server first
    await mcpConnection.startMCPServer();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`API Server running on http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  mcpConnection.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down servers...');
  mcpConnection.stop();
  process.exit(0);
});

startServer();