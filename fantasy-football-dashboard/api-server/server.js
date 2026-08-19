const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY,
});

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

const lastSeasonArchiveEntries = [
  {
    id: 'season-finale',
    title: 'Season Finale: 2025 Unwrapped',
    date: 'January 2026',
    path: '/last-season/newsletters/finale',
    summary: 'Sahil won the 2025 title, Pranav Jain finished runner-up, Abhiram won the toilet bowl, and Roshik won the consolation bracket with the 2026 first overall pick.',
    tags: ['champion', 'finale', 'sahil', 'pranav', 'abhiram', 'awards'],
    textFile: 'finale.txt'
  },
  {
    id: 'awards',
    title: '2025 Awards and Superlatives',
    date: 'January 2026',
    path: '/last-season/newsletters/finale',
    summary: 'Sahit was GM of the Year, Christian McCaffrey was League MVP, Sahil had the Dak-Pickens stack, Puka Nacua was Keeper of the Year, and Michael Wilson was Waiver Wire Addition of the Year.',
    tags: ['awards', 'gm of year', 'mvp', 'keeper', 'waiver wire'],
    textFile: 'finale.txt'
  },
  {
    id: 'keeper-notes',
    title: '2026 Keeper and Draft Context',
    date: 'January 2026',
    path: '/last-season/newsletters/finale',
    summary: 'Key 2026 keeper context included Puka Nacua, Jaxon Smith-Njigba, Brock Bowers, Malik Nabers, Drake London, Josh Allen, and Roshik holding the first overall pick.',
    tags: ['keepers', '2026 draft', 'puka', 'jsn', 'bowers', 'nabers'],
    textFile: 'finale.txt'
  },
  {
    id: 'week13',
    title: 'Week 13 Edition',
    date: 'December 2025',
    path: '/last-season/newsletters/week13',
    summary: 'The playoff picture took shape with major games for audumula, SahitReddi, swahili28, kulkdaddy47, and pranavj20.',
    tags: ['week 13', 'playoffs', 'seeding', 'points for'],
    textFile: 'week13.txt'
  },
  {
    id: 'week12',
    title: 'Week 12 Edition',
    date: 'November 2025',
    path: '/last-season/newsletters/week12',
    summary: 'The points-for wild card became crucial, with pranav4789 leading the league in scoring despite sitting outside the automatic playoff spots.',
    tags: ['week 12', 'wild card', 'points for', 'playoff race'],
    textFile: 'week12.txt'
  },
  {
    id: 'preseason',
    title: 'Preseason Edition',
    date: 'August 2025',
    path: '/last-season/newsletters/preseason',
    summary: 'Draft coverage, keeper-adjusted values, team-by-team analysis, reaches, values, sleepers, and championship headlines.',
    tags: ['preseason', 'draft', 'keepers', 'team analysis'],
    textFile: 'preseason.txt'
  }
];

const archiveDirectory = path.join(__dirname, '..', 'public', 'archive', '2025');

function readArchiveText(textFile) {
  try {
    return fs.readFileSync(path.join(archiveDirectory, textFile), 'utf8');
  } catch {
    return '';
  }
}

function searchLastSeasonArchive(question) {
  const terms = question.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  const scoredEntries = lastSeasonArchiveEntries
    .map(entry => {
      const archiveText = readArchiveText(entry.textFile);
      const searchText = [
        entry.title,
        entry.date,
        entry.summary,
        entry.tags.join(' '),
        archiveText
      ].join(' ').toLowerCase();
      const score = terms.reduce((total, term) => total + (searchText.includes(term) ? 1 : 0), 0);
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (scoredEntries.length === 0) {
    return `I searched the 2025 archive and did not find a direct match for "${question}". Try names like Sahil, Puka, CMC, Abhiram, Roshik, Week 13, keeper, playoffs, awards, or draft.`;
  }

  return `2025 archive results:\n\n${scoredEntries.map(({ entry }, index) => (
    `${index + 1}. ${entry.title} (${entry.date})\n${entry.summary}\nOpen: ${entry.path}`
  )).join('\n\n')}`;
}

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
    const { message, season = '2026' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`Processing ${season} chat message:`, message);
    
    // Analyze the message to determine what MCP tools to call
    const response = await processLeagueQuestion(message, season);
    
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

// Strength of Schedule AI Analysis
app.post('/api/sos-analysis', async (req, res) => {
  try {
    const { teamName, record, opponents, avgOppWins, playoffContext } = req.body;

    if (!teamName || !record || !opponents) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`Generating SOS analysis for ${teamName}`);

    const prompt = `You are an expert fantasy football analyst. Generate a concise, insightful 1-2 sentence outlook for this team's remaining schedule:

Team: ${teamName}
Current Record: ${record}
Remaining Opponents (Weeks 11-14): ${opponents.join(', ')}
Average Opponent Wins: ${avgOppWins}
Playoff Context: ${playoffContext || 'In playoff contention'}

Focus on:
- Schedule difficulty and key matchups
- Playoff implications
- Must-win games or opportunities
- Any momentum considerations

Keep it under 25 words, punchy, and insightful. No fluff.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const outlook = message.content[0].text.trim();

    res.json({
      teamName,
      outlook,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('SOS Analysis API error:', error);
    res.status(500).json({
      error: 'Failed to generate analysis',
      details: error.message
    });
  }
});

async function processLeagueQuestion(question, season = '2026') {
  const lowerQuestion = question.toLowerCase();
  
  try {
    if (season === '2025') {
      return searchLastSeasonArchive(question);
    }

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
