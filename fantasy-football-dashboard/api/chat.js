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
    
    // Team rosters - "Show me all rosters" or "What players are on [name]'s team?"
    if (lowerQuestion.includes('roster') || lowerQuestion.includes('players')) {
      if (lowerQuestion.includes('all')) {
        // Show all rosters
        const rosters = await getTeamRosters();
        if (rosters.length === 0) {
          return `❌ **Couldn't load team rosters.** There might be an API issue.`;
        }
        
        let response = `🏈 **All Team Rosters:**\n\n`;
        rosters.slice(0, 3).forEach(team => { // Limit to 3 teams to avoid long response
          response += `**${team.teamName}** (${team.record}) - ${team.points.toFixed(1)} PF\n`;
          response += `Top Players: ${team.players.slice(0, 5).join(', ')}\n\n`;
        });
        response += `💡 Ask "What players are on [name]'s team?" for full roster details!`;
        return response;
      } else {
        // Specific team roster
        const teamMatches = lowerQuestion.match(/(?:on|are)\s+([a-zA-Z]+)/);
        let teamName = teamMatches ? teamMatches[1] : null;
        
        if (!teamName) {
          return `❓ **Which team's roster would you like to see?**\n\nTry: "What players are on [name]'s team?"`;
        }
        
        const rosters = await getTeamRosters();
        const team = rosters.find(r => r.teamName.toLowerCase().includes(teamName.toLowerCase()));
        
        if (team) {
          let response = `🏈 **${team.teamName}'s Roster** (${team.record})\n\n`;
          team.players.forEach((player, index) => {
            response += `${index + 1}. ${player}\n`;
          });
          response += `\n📊 **Total Points:** ${team.points.toFixed(1)}`;
          return response;
        } else {
          return `❓ I couldn't find a team for "${teamName}". Try "Who's in the league?" to see all team names.`;
        }
      }
    }
    
    // Player search - "Search for [player]" or "Find [player]" or "Who owns [player]"
    if (lowerQuestion.includes('search') || lowerQuestion.includes('find') || lowerQuestion.includes('owns') || lowerQuestion.includes('who has')) {
      let playerName = '';
      
      // Extract player name from various patterns
      const searchMatch = lowerQuestion.match(/(?:search|find|for)\s+(.+)/);
      const ownsMatch = lowerQuestion.match(/(?:owns|has)\s+(.+)/);
      
      if (searchMatch) playerName = searchMatch[1];
      else if (ownsMatch) playerName = ownsMatch[1];
      
      if (!playerName) {
        return `❓ **Which player would you like to search for?**\n\nTry: "Search for Josh Allen" or "Who owns Travis Kelce?"`;
      }
      
      const players = await searchPlayer(playerName);
      if (players.length === 0) {
        return `❌ **No players found matching "${playerName}".** Try using full names or check spelling.`;
      }
      
      let response = `🔍 **Search Results for "${playerName}":**\n\n`;
      players.forEach((player, index) => {
        response += `${index + 1}. **${player.name}** (${player.position} - ${player.team})\n`;
        response += `   Owner: ${player.owner}\n\n`;
      });
      
      return response;
    }
    
    // Draft results - "Show me the draft" or "Draft results" or "Who was drafted first" or "When was [player] drafted"
    if (lowerQuestion.includes('draft')) {
      const draft = await getDraftResults();
      if (!draft) {
        return `❌ **No draft data available.** The league might not have drafted yet or data is unavailable.`;
      }
      
      // Check for specific player draft lookup - "When was [player] drafted?"
      const whenMatch = lowerQuestion.match(/(?:when was|was)\s+(.+?)\s+drafted/);
      if (whenMatch) {
        const playerSearchName = whenMatch[1].toLowerCase();
        const playerPick = draft.find(pick => 
          pick.player.toLowerCase().includes(playerSearchName) ||
          playerSearchName.includes(pick.player.toLowerCase().split(' ')[1] || '') // Last name match
        );
        
        if (playerPick) {
          return `🎯 **${playerPick.player} Draft Info:**\n\n📍 **Pick:** ${playerPick.overall} overall (Round ${playerPick.round}, Pick ${playerPick.pick})\n👤 **Drafted by:** ${playerPick.draftedBy}\n🏈 **Position:** ${playerPick.position}\n🏟️ **NFL Team:** ${playerPick.team}`;
        } else {
          return `❓ **"${whenMatch[1]}" not found in draft results.** Try using the player's full name or check spelling.\n\n💡 You can also try "Search for ${whenMatch[1]}" to see if they're in the league.`;
        }
      }
      
      if (lowerQuestion.includes('first round') || lowerQuestion.includes('round 1')) {
        const firstRound = draft.filter(pick => pick.round === 1);
        let response = `🥇 **First Round Draft Results:**\n\n`;
        firstRound.forEach(pick => {
          response += `${pick.pick}. **${pick.player}** (${pick.position}) - ${pick.draftedBy}\n`;
        });
        return response;
      } else if (lowerQuestion.includes('top 10')) {
        const topTen = draft.slice(0, 10);
        let response = `🔝 **Top 10 Draft Picks:**\n\n`;
        topTen.forEach(pick => {
          response += `${pick.overall}. **${pick.player}** (${pick.position}) - ${pick.draftedBy}\n`;
        });
        return response;
      } else {
        // Show draft summary
        const totalPicks = draft.length;
        const rounds = Math.max(...draft.map(p => p.round));
        let response = `📋 **Draft Summary:**\n\n`;
        response += `**Total Picks:** ${totalPicks}\n`;
        response += `**Rounds:** ${rounds}\n\n`;
        response += `**First 5 Picks:**\n`;
        draft.slice(0, 5).forEach(pick => {
          response += `${pick.overall}. ${pick.player} (${pick.position}) - ${pick.draftedBy}\n`;
        });
        response += `\n💡 Ask "When was [player] drafted?" or "first round draft" for more details!`;
        return response;
      }
    }
    
    // Transactions - "Show me transactions" or "Recent trades" or "Waiver pickups"
    if (lowerQuestion.includes('transaction') || lowerQuestion.includes('trade') || lowerQuestion.includes('waiver') || lowerQuestion.includes('pickup') || lowerQuestion.includes('added') || lowerQuestion.includes('dropped')) {
      const transactions = await getTransactions();
      if (transactions.length === 0) {
        return `❌ **No recent transactions found.** The league might not be active or data is unavailable.`;
      }
      
      let response = `💼 **Recent League Transactions:**\n\n`;
      transactions.slice(0, 10).forEach((transaction, index) => {
        const typeEmoji = transaction.type === 'trade' ? '🤝' : transaction.type === 'waiver' ? '📋' : '🆓';
        response += `${typeEmoji} **${transaction.user}** - ${transaction.description}\n`;
        response += `   ${transaction.timestamp}\n\n`;
      });
      
      return response;
    }
    
    // Default helpful response
    return `🏈 **Fantasy Football Assistant**\n\nI have access to your Sleeper league data and AI analysis! Try asking:\n\n**📊 League & Standings:**\n• "Show me the standings"\n• "League info" or "Who's in the league?"\n• "This week's matchups"\n\n**👤 Team & Player Info:**\n• "My team" or "Team for [name]"\n• "What players are on [name]'s team?"\n• "Show me all rosters"\n• "Search for [player name]"\n• "Who owns Travis Kelce?"\n\n**🤖 AI-Powered Analysis:**\n• "Who should I start this week?"\n• "Trade suggestions for [name]"\n• "How will [name] do this week?"\n\n**📋 League Activity:**\n• "Show me the draft results"\n• "First round draft picks"\n• "Recent transactions"\n• "Waiver wire pickups"\n\n💡 **Your League:** ${SLEEPER_LEAGUE_ID.slice(0, 8)}... | **AI Powered:** ✅`;
    
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