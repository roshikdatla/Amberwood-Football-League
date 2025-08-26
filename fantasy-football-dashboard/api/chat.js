// External MCP server URL - replace with your deployed Railway/Render URL
const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:8000';

// Sleeper API configuration
const SLEEPER_USERNAME = process.env.SLEEPER_USERNAME || 'roshik';
const SLEEPER_LEAGUE_ID = process.env.SLEEPER_LEAGUE_ID || '1240124901977759744';
const SLEEPER_BASE_URL = 'https://api.sleeper.app/v1';

async function callExternalMCP(endpoint, data = {}) {
  const fullUrl = `${MCP_SERVER_URL}${endpoint}`;
  console.log('🔄 Calling External MCP:');
  console.log('  MCP_SERVER_URL:', MCP_SERVER_URL);
  console.log('  Full URL:', fullUrl);
  console.log('  Endpoint:', endpoint);
  console.log('  Data:', JSON.stringify(data, null, 2));
  
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('📡 MCP Response Status:', response.status);
    console.log('📡 MCP Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ MCP Server Error Response:', errorText);
      throw new Error(`MCP server error: ${response.status} - ${errorText}`);
    }

    const jsonResponse = await response.json();
    console.log('✅ MCP Success Response:', jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error('💥 Error calling external MCP:', error);
    console.error('💥 Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
}

// Sleeper API helper functions
async function getSleeperData(endpoint) {
  try {
    const response = await fetch(`${SLEEPER_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Sleeper API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Sleeper API error:', error);
    throw error;
  }
}

async function getLeagueInfo() {
  const league = await getSleeperData(`/league/${SLEEPER_LEAGUE_ID}`);
  const users = await getSleeperData(`/league/${SLEEPER_LEAGUE_ID}/users`);
  const rosters = await getSleeperData(`/league/${SLEEPER_LEAGUE_ID}/rosters`);
  
  return { league, users, rosters };
}

async function getStandings() {
  const { users, rosters } = await getLeagueInfo();
  
  // Create standings with user names and records
  const standings = rosters.map(roster => {
    const user = users.find(u => u.user_id === roster.owner_id);
    return {
      team_name: user?.display_name || user?.username || 'Unknown',
      wins: roster.settings.wins || 0,
      losses: roster.settings.losses || 0,
      ties: roster.settings.ties || 0,
      points_for: roster.settings.fpts || 0,
      points_against: roster.settings.fpts_against || 0
    };
  }).sort((a, b) => {
    // Sort by wins, then by points for
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.points_for - a.points_for;
  });
  
  return standings;
}

async function processLeagueQuestion(question) {
  try {
    console.log('🏈 Processing league question:', question);
    console.log('🏈 League ID:', SLEEPER_LEAGUE_ID);
    console.log('🏈 Username:', SLEEPER_USERNAME);
    
    const lowerQuestion = question.toLowerCase();
    
    // Handle different types of questions
    if (lowerQuestion.includes('standing') || lowerQuestion.includes('ranking') || lowerQuestion.includes('leaderboard')) {
      const standings = await getStandings();
      let response = '🏆 **Current League Standings:**\n\n';
      
      standings.forEach((team, index) => {
        response += `${index + 1}. **${team.team_name}** (${team.wins}-${team.losses}`;
        if (team.ties > 0) response += `-${team.ties}`;
        response += `) - ${team.points_for.toFixed(1)} PF\n`;
      });
      
      response += '\n📊 Sorted by wins, then points for.';
      return response;
    }
    
    if (lowerQuestion.includes('league') || lowerQuestion.includes('info')) {
      const { league } = await getLeagueInfo();
      return `🏈 **${league.name}**\n\n📋 **League Info:**\n• Season: ${league.season}\n• Teams: ${league.total_rosters}\n• Type: ${league.settings.playoff_teams} teams make playoffs\n• Scoring: ${league.scoring_settings.pass_td || 4} pts/passing TD`;
    }
    
    if (lowerQuestion.includes('my team') || lowerQuestion.includes('my roster')) {
      const { users, rosters } = await getLeagueInfo();
      const myUser = users.find(u => u.username === SLEEPER_USERNAME || u.display_name === SLEEPER_USERNAME);
      
      if (myUser) {
        const myRoster = rosters.find(r => r.owner_id === myUser.user_id);
        if (myRoster) {
          return `👤 **Your Team (${myUser.display_name || myUser.username})**\n\n📊 **Record:** ${myRoster.settings.wins || 0}-${myRoster.settings.losses || 0}\n📈 **Points For:** ${(myRoster.settings.fpts || 0).toFixed(1)}\n📉 **Points Against:** ${(myRoster.settings.fpts_against || 0).toFixed(1)}\n\n💡 Ask me for detailed roster analysis or trade suggestions!`;
        }
      }
      return `I couldn't find your team. Make sure your username "${SLEEPER_USERNAME}" is correct in the league settings.`;
    }
    
    // Default helpful response
    return `🏈 **Fantasy Football Assistant**\n\nI have access to your Sleeper league data! Try asking:\n\n• "Show me the standings"\n• "What's my team record?"\n• "Tell me about our league"\n• "Who's in first place?"\n• "League info"\n\n💡 **Your League:** ${SLEEPER_LEAGUE_ID.slice(0, 8)}...`;
    
  } catch (error) {
    console.error('Error processing question:', error);
    return `🏈 I'm having trouble accessing your Sleeper league data right now.\n\n**Error:** ${error.message}\n\n💡 Make sure your league ID (${SLEEPER_LEAGUE_ID}) and username (${SLEEPER_USERNAME}) are correct in the environment variables.`;
  }
}

export default async function handler(req, res) {
  console.log('🌐 API Chat Handler Called:');
  console.log('  Method:', req.method);
  console.log('  URL:', req.url);
  console.log('  Headers:', req.headers);
  console.log('  Body:', req.body);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('📋 OPTIONS request - returning CORS headers');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      console.log('❌ No message provided in request body');
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('✅ Processing chat message:', message);
    
    const response = await processLeagueQuestion(message);
    
    res.status(200).json({ 
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
}