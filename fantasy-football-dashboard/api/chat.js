// External MCP server URL - replace with your deployed Railway/Render URL
const MCP_SERVER_URL = process.env.MCP_SERVER_URL || 'http://localhost:8000';

// Sleeper API configuration
const SLEEPER_USERNAME = process.env.SLEEPER_USERNAME || 'roshik';
const SLEEPER_LEAGUE_ID = process.env.SLEEPER_LEAGUE_ID || '1240124901977759744';
const SLEEPER_BASE_URL = 'https://api.sleeper.app/v1';
const CLAUDE_API_KEY = process.env.REACT_APP_CLAUDE_API_KEY;

// Helper to get current NFL week
Date.prototype.getWeek = function() {
  const d = new Date(+this);
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() + 4 - (d.getDay()||7));
  return Math.ceil((((d - new Date(d.getFullYear(),0,1)) / 8.64e7) + 1)/7);
};

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

// Helper to find team by name (flexible matching)
function findTeamByName(users, teamName) {
  const lowerTeamName = teamName.toLowerCase();
  return users.find(user => 
    user.display_name?.toLowerCase().includes(lowerTeamName) ||
    user.username?.toLowerCase().includes(lowerTeamName) ||
    lowerTeamName.includes(user.display_name?.toLowerCase()) ||
    lowerTeamName.includes(user.username?.toLowerCase())
  );
}

// Get roster for a specific team
async function getTeamRoster(teamName = null) {
  const { users, rosters } = await getLeagueInfo();
  
  let targetUser;
  if (teamName) {
    targetUser = findTeamByName(users, teamName);
  } else {
    targetUser = users.find(u => u.username === SLEEPER_USERNAME || u.display_name === SLEEPER_USERNAME);
  }
  
  if (!targetUser) return null;
  
  const roster = rosters.find(r => r.owner_id === targetUser.user_id);
  if (!roster) return null;
  
  return {
    user: targetUser,
    roster: roster,
    record: `${roster.settings.wins || 0}-${roster.settings.losses || 0}`,
    pointsFor: roster.settings.fpts || 0,
    pointsAgainst: roster.settings.fpts_against || 0
  };
}

// Claude AI integration for analysis
async function callClaudeAPI(prompt) {
  if (!CLAUDE_API_KEY) {
    throw new Error('Claude API key not configured');
  }
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    
    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.content[0]?.text || 'No response from Claude';
  } catch (error) {
    console.error('Claude API error:', error);
    return `AI analysis unavailable: ${error.message}`;
  }
}

// Get current week matchups
async function getCurrentMatchups() {
  try {
    // Get current NFL week
    const nflState = await getSleeperData('/state/nfl');
    const currentWeek = nflState.week;
    
    const matchups = await getSleeperData(`/league/${SLEEPER_LEAGUE_ID}/matchups/${currentWeek}`);
    const { users, rosters } = await getLeagueInfo();
    
    // Group matchups by matchup_id
    const groupedMatchups = {};
    matchups.forEach(matchup => {
      if (!groupedMatchups[matchup.matchup_id]) {
        groupedMatchups[matchup.matchup_id] = [];
      }
      groupedMatchups[matchup.matchup_id].push(matchup);
    });
    
    // Format matchup data
    const formattedMatchups = Object.values(groupedMatchups).map(matchup => {
      const teams = matchup.map(team => {
        const roster = rosters.find(r => r.roster_id === team.roster_id);
        const user = users.find(u => u.user_id === roster?.owner_id);
        return {
          name: user?.display_name || user?.username || 'Unknown',
          points: team.points || 0,
          projected: team.points || 0
        };
      });
      return teams;
    });
    
    return { matchups: formattedMatchups, week: currentWeek };
  } catch (error) {
    console.error('Matchups error:', error);
    return null;
  }
}

async function processLeagueQuestion(question) {
  try {
    console.log('🏈 Processing league question:', question);
    console.log('🏈 League ID:', SLEEPER_LEAGUE_ID);
    console.log('🏈 Username:', SLEEPER_USERNAME);
    
    const lowerQuestion = question.toLowerCase();
    console.log('🏈 Lower case question:', lowerQuestion);
    
    // Handle different types of questions
    if (lowerQuestion.includes('standing') || lowerQuestion.includes('ranking') || lowerQuestion.includes('leaderboard') || lowerQuestion.includes('show me')) {
      console.log('🏈 Detected standings request');
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
    
    // Test response to see if Sleeper API is working
    if (lowerQuestion.includes('test') || lowerQuestion === 'hi') {
      console.log('🏈 Testing Sleeper API connection');
      try {
        const { league } = await getLeagueInfo();
        return `✅ **Sleeper API Test Successful!**\n\nConnected to: **${league.name}**\nSeason: ${league.season}\nTeams: ${league.total_rosters}\n\nTry: "Show me the standings"`;
      } catch (error) {
        return `❌ **Sleeper API Test Failed!**\n\nError: ${error.message}\n\nCheck your environment variables in Railway.`;
      }
    }
    
    if (lowerQuestion.includes('league') || lowerQuestion.includes('info')) {
      const { league } = await getLeagueInfo();
      return `🏈 **${league.name}**\n\n📋 **League Info:**\n• Season: ${league.season}\n• Teams: ${league.total_rosters}\n• Type: ${league.settings.playoff_teams} teams make playoffs\n• Scoring: ${league.scoring_settings.pass_td || 4} pts/passing TD`;
    }
    
    // Team analysis - works for any team
    if (lowerQuestion.includes('my team') || lowerQuestion.includes('my roster') || lowerQuestion.includes('team')) {
      // Extract team name from question if mentioned
      let teamName = null;
      const teamMatches = lowerQuestion.match(/(?:team|roster)\s+(?:for\s+)?([a-zA-Z]+)/);
      if (teamMatches) {
        teamName = teamMatches[1];
      }
      
      const teamData = await getTeamRoster(teamName);
      if (teamData) {
        return `👤 **${teamData.user.display_name || teamData.user.username}'s Team**\n\n📊 **Record:** ${teamData.record}\n📈 **Points For:** ${teamData.pointsFor.toFixed(1)}\n📉 **Points Against:** ${teamData.pointsAgainst.toFixed(1)}\n\n💡 Ask me: "Who should [team name] start this week?" or "Trade suggestions for [team name]"`;
      }
      
      if (teamName) {
        return `❓ I couldn't find a team with the name "${teamName}". Try asking "Who's in the league?" to see all team names.`;
      }
      return `❓ **Which team would you like to analyze?**\n\nTry asking:\n• "My team" (for your default team)\n• "Team for [name]" (for any player)\n• "Who's in the league?" (to see all teams)`;
    }
    
    // Start/sit recommendations with AI
    if (lowerQuestion.includes('start') || lowerQuestion.includes('sit') || lowerQuestion.includes('lineup')) {
      // Extract team name if mentioned
      let teamName = null;
      const teamMatches = lowerQuestion.match(/(?:for|team)\s+([a-zA-Z]+)/);
      if (teamMatches) {
        teamName = teamMatches[1];
      }
      
      const teamData = await getTeamRoster(teamName);
      if (!teamData) {
        return `❓ **Which team needs start/sit advice?**\n\nTry asking:\n• "Who should I start this week?"\n• "Who should [team name] start this week?"\n• "Lineup help for [team name]"`;
      }
      
      const aiPrompt = `You are a fantasy football expert. Provide start/sit advice for ${teamData.user.display_name || teamData.user.username}'s team in week ${new Date().getWeek() || 'current'}. Their record is ${teamData.record} with ${teamData.pointsFor.toFixed(1)} points for. Give specific, actionable advice in 2-3 sentences focusing on this week's matchups and recent player performance.`;
      
      const aiAnalysis = await callClaudeAPI(aiPrompt);
      return `🎯 **Start/Sit Advice for ${teamData.user.display_name || teamData.user.username}**\n\n${aiAnalysis}\n\n📊 **Team Stats:** ${teamData.record} record, ${teamData.pointsFor.toFixed(1)} PF`;
    }
    
    // Trade suggestions with AI
    if (lowerQuestion.includes('trade') || lowerQuestion.includes('swap')) {
      let teamName = null;
      const teamMatches = lowerQuestion.match(/(?:for|team)\s+([a-zA-Z]+)/);
      if (teamMatches) {
        teamName = teamMatches[1];
      }
      
      const teamData = await getTeamRoster(teamName);
      if (!teamData) {
        return `❓ **Which team needs trade suggestions?**\n\nTry asking:\n• "Trade suggestions for me"\n• "Trade help for [team name]"\n• "What trades should [name] make?"`;
      }
      
      const standings = await getStandings();
      const teamRank = standings.findIndex(t => t.team_name === (teamData.user.display_name || teamData.user.username)) + 1;
      
      const aiPrompt = `You are a fantasy football expert. Provide trade suggestions for ${teamData.user.display_name || teamData.user.username}'s team. They are currently ranked #${teamRank} with a ${teamData.record} record and ${teamData.pointsFor.toFixed(1)} points for. Suggest 2-3 realistic trade targets and what positions to focus on. Keep it concise and actionable.`;
      
      const aiAnalysis = await callClaudeAPI(aiPrompt);
      return `🤝 **Trade Suggestions for ${teamData.user.display_name || teamData.user.username}**\n\n${aiAnalysis}\n\n📈 **Current Rank:** #${teamRank} (${teamData.record})`;
    }
    
    // Weekly matchups
    if (lowerQuestion.includes('matchup') || lowerQuestion.includes('this week') || lowerQuestion.includes('opponent')) {
      const matchupData = await getCurrentMatchups();
      if (!matchupData) {
        return `❌ **Couldn't load this week's matchups.** The season might not be active or there was an API error.`;
      }
      
      let response = `⚡ **Week ${matchupData.week} Matchups:**\n\n`;
      matchupData.matchups.forEach((matchup, index) => {
        if (matchup.length === 2) {
          response += `**${matchup[0].name}** vs **${matchup[1].name}**\n`;
          response += `${matchup[0].points.toFixed(1)} - ${matchup[1].points.toFixed(1)}\n\n`;
        }
      });
      
      return response + `💡 Ask for specific matchup predictions: "How will [team name] do this week?"`;
    }
    
    // List all teams
    if (lowerQuestion.includes('who') && (lowerQuestion.includes('league') || lowerQuestion.includes('teams'))) {
      const { users } = await getLeagueInfo();
      let response = `👥 **League Members:**\n\n`;
      users.forEach((user, index) => {
        response += `${index + 1}. **${user.display_name || user.username}**\n`;
      });
      response += `\n💡 Use these names when asking about specific teams!`;
      return response;
    }
    
    // Default helpful response
    return `🏈 **Fantasy Football Assistant**\n\nI have access to your Sleeper league data and AI analysis! Try asking:\n\n**📊 League Info:**\n• "Show me the standings"\n• "League info" or "Who's in the league?"\n• "This week's matchups"\n\n**👤 Team Analysis:**\n• "My team" or "Team for [name]"\n• "Who should I start this week?"\n• "Who should [name] start?"\n\n**🤝 Advanced Features:**\n• "Trade suggestions for [name]"\n• "How will [name] do this week?"\n\n💡 **Your League:** ${SLEEPER_LEAGUE_ID.slice(0, 8)}... | **AI Powered:** ✅`;
    
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