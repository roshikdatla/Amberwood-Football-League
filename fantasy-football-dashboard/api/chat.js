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
  
  console.log('🤖 Calling Claude API with key:', CLAUDE_API_KEY ? 'Present' : 'Missing');
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    console.log('🤖 Claude API Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('🤖 Claude API Error Response:', errorText);
      throw new Error(`Claude API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('🤖 Claude API Success:', data.content[0]?.text?.substring(0, 100) + '...');
    return data.content[0]?.text || 'No response from Claude';
  } catch (error) {
    console.error('🤖 Claude API error:', error);
    
    // Fallback to basic analysis without AI
    return `Based on your team's current record and league position, here are some general recommendations:\n\n• Focus on consistent performers over boom-or-bust players\n• Check matchup difficulty and weather conditions\n• Consider recent target share and snap count trends\n• Monitor injury reports before game time\n\n(Note: Advanced AI analysis temporarily unavailable)`;
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

// Get all players data
async function getPlayersData() {
  try {
    return await getSleeperData('/players/nfl');
  } catch (error) {
    console.error('Players data error:', error);
    return {};
  }
}

// Get team rosters with player names
async function getTeamRosters() {
  try {
    const { users, rosters } = await getLeagueInfo();
    const players = await getPlayersData();
    
    const teamRosters = rosters.map(roster => {
      const user = users.find(u => u.user_id === roster.owner_id);
      const playerNames = (roster.players || []).map(playerId => {
        const player = players[playerId];
        return player ? `${player.first_name} ${player.last_name} (${player.position})` : `Player ${playerId}`;
      }).slice(0, 16); // Limit to starting roster
      
      return {
        teamName: user?.display_name || user?.username || 'Unknown',
        record: `${roster.settings.wins || 0}-${roster.settings.losses || 0}`,
        points: roster.settings.fpts || 0,
        players: playerNames
      };
    });
    
    return teamRosters;
  } catch (error) {
    console.error('Rosters error:', error);
    return [];
  }
}

// Search for specific players
async function searchPlayer(playerName) {
  try {
    const players = await getPlayersData();
    const { users, rosters } = await getLeagueInfo();
    
    const searchTerm = playerName.toLowerCase();
    const foundPlayers = [];
    
    Object.entries(players).forEach(([playerId, player]) => {
      const fullName = `${player.first_name || ''} ${player.last_name || ''}`.toLowerCase();
      if (fullName.includes(searchTerm) || player.last_name?.toLowerCase().includes(searchTerm)) {
        // Check if player is owned
        let owner = null;
        rosters.forEach(roster => {
          if (roster.players?.includes(playerId)) {
            const user = users.find(u => u.user_id === roster.owner_id);
            owner = user?.display_name || user?.username;
          }
        });
        
        foundPlayers.push({
          name: `${player.first_name} ${player.last_name}`,
          position: player.position,
          team: player.team,
          owner: owner || 'Free Agent'
        });
      }
    });
    
    return foundPlayers.slice(0, 10); // Limit results
  } catch (error) {
    console.error('Player search error:', error);
    return [];
  }
}

// Get draft results
async function getDraftResults() {
  try {
    const { league, users } = await getLeagueInfo();
    const drafts = await getSleeperData(`/league/${SLEEPER_LEAGUE_ID}/drafts`);
    
    if (!drafts || drafts.length === 0) {
      return null;
    }
    
    const draftId = drafts[0].draft_id;
    const picks = await getSleeperData(`/draft/${draftId}/picks`);
    const players = await getPlayersData();
    
    const draftResults = picks.map(pick => {
      const user = users.find(u => u.user_id === pick.picked_by);
      const player = players[pick.player_id];
      return {
        round: pick.round,
        pick: pick.draft_slot,
        overall: pick.pick_no,
        player: player ? `${player.first_name} ${player.last_name}` : 'Unknown Player',
        position: player?.position || 'N/A',
        team: player?.team || 'N/A',
        draftedBy: user?.display_name || user?.username || 'Unknown'
      };
    });
    
    return draftResults;
  } catch (error) {
    console.error('Draft results error:', error);
    return null;
  }
}

// Get recent transactions
async function getTransactions() {
  try {
    const { users } = await getLeagueInfo();
    const players = await getPlayersData();
    
    // Get transactions from current week
    const nflState = await getSleeperData('/state/nfl');
    const currentWeek = Math.max(1, nflState.week - 1); // Look at previous week if current hasn't finished
    
    const transactions = await getSleeperData(`/league/${SLEEPER_LEAGUE_ID}/transactions/${currentWeek}`);
    
    const recentTransactions = transactions.slice(0, 20).map(transaction => {
      const user = users.find(u => u.user_id === transaction.creator);
      const type = transaction.type; // 'trade', 'waiver', 'free_agent'
      
      let description = '';
      if (transaction.adds) {
        Object.entries(transaction.adds).forEach(([playerId, rosterId]) => {
          const player = players[playerId];
          const playerName = player ? `${player.first_name} ${player.last_name}` : 'Unknown Player';
          description += `Added: ${playerName} `;
        });
      }
      if (transaction.drops) {
        Object.entries(transaction.drops).forEach(([playerId, rosterId]) => {
          const player = players[playerId];
          const playerName = player ? `${player.first_name} ${player.last_name}` : 'Unknown Player';
          description += `Dropped: ${playerName} `;
        });
      }
      
      return {
        type: type,
        user: user?.display_name || user?.username || 'Unknown',
        description: description.trim(),
        timestamp: new Date(transaction.created).toLocaleDateString()
      };
    });
    
    return recentTransactions;
  } catch (error) {
    console.error('Transactions error:', error);
    return [];
  }
}

async function processLeagueQuestion(question) {
  try {
    console.log('🏈 Processing league question:', question);
    console.log('🏈 League ID:', SLEEPER_LEAGUE_ID);
    console.log('🏈 Username:', SLEEPER_USERNAME);
    
    // Send ALL questions to comprehensive AI analysis
    console.log('🤖 Using comprehensive AI analysis for question:', question);
    
    // Gather comprehensive league data
    const [leagueInfo, standings, allRosters, draftResults, matchups, transactions] = await Promise.all([
      getLeagueInfo().catch(e => ({ error: e.message })),
      getStandings().catch(e => ({ error: e.message })),
      getTeamRosters().catch(e => ({ error: e.message })),
      getDraftResults().catch(e => ({ error: e.message })),
      getCurrentMatchups().catch(e => ({ error: e.message })),
      getTransactions().catch(e => ({ error: e.message }))
    ]);
    
    const comprehensiveData = {
      league: leagueInfo,
      standings: standings,
      rosters: allRosters,
      draft: draftResults,
      matchups: matchups,
      transactions: transactions
    };
    
    // Create a concise summary instead of sending all raw data
    const leagueSummary = `League: ${leagueInfo.league?.name || 'Fantasy League'}
Teams: ${standings?.length || 0}
Top 3 Teams: ${standings?.slice(0, 3).map(t => `${t.team_name} (${t.wins}-${t.losses})`).join(', ') || 'N/A'}
Total Draft Picks: ${draftResults?.length || 0}
Recent Activity: ${transactions?.length || 0} transactions`;

    const aiPrompt = `You are a fantasy football expert. User question: "${question}"

League Summary:
${leagueSummary}

Based on this league context, provide a helpful, specific answer. Be concise but insightful. Focus on actionable fantasy football advice.`;

    const aiResponse = await callClaudeAPI(aiPrompt);
    return aiResponse;
    
  } catch (error) {
    console.error('Comprehensive AI analysis failed:', error);
    return `🏈 I'm having trouble accessing your Sleeper league data or Claude AI right now.\n\n**Error:** ${error.message}\n\n💡 Make sure your league ID (${SLEEPER_LEAGUE_ID}) and Claude API key are correctly configured.`;
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