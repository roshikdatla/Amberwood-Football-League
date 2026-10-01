// Capture finalized 2026 Week 3 source data without modifying earlier editions.
// Run from fantasy-football-dashboard. --report-only validates without saving.
import { readFile, writeFile } from 'node:fs/promises';

const leagueId = '1354521952483573760';
const recapWeek = 3;
const base = 'https://api.sleeper.app/v1';
const outputPath = 'src/data/week3Recap2026Snapshot.json';
const reportOnly = process.argv.includes('--report-only');
const paths = {
  league: `/league/${leagueId}`,
  users: `/league/${leagueId}/users`,
  rosters: `/league/${leagueId}/rosters`,
  week1: `/league/${leagueId}/matchups/1`,
  week2: `/league/${leagueId}/matchups/2`,
  week3: `/league/${leagueId}/matchups/3`,
  week4: `/league/${leagueId}/matchups/4`,
  players: '/players/nfl',
};
let originalCapturedAt;
try {
  const previous = JSON.parse(await readFile(outputPath, 'utf8'));
  originalCapturedAt = previous.originalCapturedAt || previous.capturedAt;
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const data = Object.fromEntries(await Promise.all(Object.entries(paths).map(async ([key, path]) => {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  const value = await response.json();
  if (value == null) throw new Error(`${path}: empty response`);
  return [key, value];
})));
if (data.league.season !== '2026' || data.league.settings.last_scored_leg < recapWeek) {
  throw new Error(`2026 Week 3 is not confirmed complete (season=${data.league.season}, last_scored_leg=${data.league.settings.last_scored_leg}).`);
}

const neededIds = new Set([
  ...[...data.week1, ...data.week2, ...data.week3, ...data.week4].flatMap(row => [...(row.players || []), ...(row.starters || [])]),
  ...data.rosters.flatMap(row => [...(row.players || []), ...(row.reserve || [])]),
]);
const players = Object.fromEntries([...neededIds].map(id => {
  const player = data.players[id];
  return [id, {
    name: player?.full_name || [player?.first_name, player?.last_name].filter(Boolean).join(' ') || id,
    position: player?.position || (id.length <= 3 ? 'DEF' : 'N/A'),
    team: player?.team || (id.length <= 3 ? id : null),
    injuryStatus: player?.injury_status || null,
    injuryBodyPart: player?.injury_body_part || null,
    injuryNotes: player?.injury_notes || null,
    injuryStartDate: player?.injury_start_date || null,
    status: player?.status || null,
  }];
}));
const trimMatchups = matchups => matchups.map(row => ({
  roster_id: row.roster_id,
  matchup_id: row.matchup_id,
  points: row.points,
  custom_points: row.custom_points ?? null,
  starters: row.starters,
  starters_points: row.starters_points,
  players: row.players,
  players_points: row.players_points,
}));
const score = row => row.custom_points ?? row.points;
const round = value => Math.round(value * 100) / 100;
const standingsThroughWeek3 = rosterId => [data.week1, data.week2, data.week3].reduce((record, week) => {
  const row = week.find(result => result.roster_id === rosterId);
  const opponent = week.find(result => result.matchup_id === row?.matchup_id && result.roster_id !== rosterId);
  if (!row || !opponent) throw new Error(`Missing completed pairing for roster ${rosterId}.`);
  if (score(row) > score(opponent)) record.wins += 1;
  else if (score(row) < score(opponent)) record.losses += 1;
  else record.ties += 1;
  return record;
}, { wins: 0, losses: 0, ties: 0 });
const teams = data.rosters.map(roster => {
  const user = data.users.find(row => row.user_id === roster.owner_id);
  return {
    rosterId: roster.roster_id,
    username: user?.display_name || user?.username,
    teamName: user?.metadata?.team_name?.trim() || user?.display_name || `Team ${roster.roster_id}`,
    wins: roster.settings.wins,
    losses: roster.settings.losses,
    ties: roster.settings.ties,
    recordThroughWeek3: standingsThroughWeek3(roster.roster_id),
    rosterPlayerIds: roster.players || [],
    reservePlayerIds: roster.reserve || [],
  };
});

const expectedRosters = new Set(teams.map(team => team.rosterId));
for (const [weekNumber, week] of [[1, data.week1], [2, data.week2], [3, data.week3], [4, data.week4]]) {
  if (week.length !== teams.length || new Set(week.map(row => row.roster_id)).size !== teams.length) {
    throw new Error(`Week ${weekNumber} does not have full unique roster coverage.`);
  }
  for (const row of week) {
    if (!expectedRosters.has(row.roster_id) || row.matchup_id == null || week.filter(other => other.matchup_id === row.matchup_id).length !== 2) {
      throw new Error(`Week ${weekNumber} has an invalid pairing for roster ${row.roster_id}.`);
    }
    if (weekNumber <= recapWeek) {
      if (!Number.isFinite(score(row)) || row.starters.length !== row.starters_points.length) {
        throw new Error(`Week ${weekNumber} has incomplete score data for roster ${row.roster_id}.`);
      }
      const starterTotal = row.starters_points.reduce((total, points) => total + points, 0);
      if (row.custom_points == null && Math.abs(starterTotal - row.points) > 0.011) {
        throw new Error(`Week ${weekNumber} starter total ${starterTotal} does not reconcile with ${row.points} for roster ${row.roster_id}.`);
      }
      row.starters.forEach((id, index) => {
        if (!players[id] || !Number.isFinite(row.starters_points[index])) throw new Error(`Invalid starter ${id}.`);
      });
    }
  }
}
if (data.league.settings.last_scored_leg === recapWeek) {
  for (const team of teams) {
    if (['wins', 'losses', 'ties'].some(field => team[field] !== team.recordThroughWeek3[field])) {
      throw new Error(`League standings disagree with scored Week 1–3 results for roster ${team.rosterId}.`);
    }
  }
}

const weeklyAllPlay = data.week3.map(row => {
  const opponents = data.week3.filter(other => other.roster_id !== row.roster_id);
  const opponent = opponents.find(other => other.matchup_id === row.matchup_id);
  const allPlayWins = opponents.filter(other => score(row) > score(other)).length;
  const allPlayLosses = opponents.filter(other => score(row) < score(other)).length;
  const allPlayTies = opponents.length - allPlayWins - allPlayLosses;
  const result = score(row) > score(opponent) ? 'win' : score(row) < score(opponent) ? 'loss' : 'tie';
  const expectedWinShare = (allPlayWins + 0.5 * allPlayTies) / opponents.length;
  return {
    rosterId: row.roster_id,
    score: score(row),
    scoreRank: 1 + allPlayLosses,
    opponentId: opponent.roster_id,
    opponentScore: score(opponent),
    opponentScoreRank: 1 + data.week3.filter(other => score(other) > score(opponent)).length,
    margin: round(score(row) - score(opponent)),
    result,
    allPlayWins,
    allPlayLosses,
    allPlayTies,
    expectedWinShare,
    scheduleLuck: (result === 'win' ? 1 : result === 'tie' ? 0.5 : 0) - expectedWinShare,
  };
});
const mickeyCandidate = [...weeklyAllPlay].filter(row => row.result === 'win')
  .sort((a, b) => a.allPlayWins - b.allPlayWins || a.score - b.score || a.opponentScore - b.opponentScore)[0];
const sortedScores = weeklyAllPlay.map(row => row.score).sort((a, b) => a - b);
const midpoint = Math.floor(sortedScores.length / 2);
const leagueMedian = sortedScores.length % 2 ? sortedScores[midpoint] : (sortedScores[midpoint - 1] + sortedScores[midpoint]) / 2;
const snapshot = {
  capturedAt: new Date().toISOString(),
  ...(originalCapturedAt ? { originalCapturedAt } : {}),
  phase: 'final',
  editorialContext: {
    recapWeek,
    previewWeek: 4,
    unplayedTeams: [],
    instruction: 'Cover finalized Week 3 results and the Week 4 schedule. Do not invent game chronology from final box scores; current injury labels describe capture-time status, not automatically an injury sustained this week.',
    finalitySource: 'Sleeper league settings.last_scored_leg confirms Week 3 is complete.',
    mickeyMethod: 'Lowest-scoring actual winner, equivalent here to the winning team with the fewest all-play wins; all-play compares each score with the other eleven teams, and ties count as half a win in expected win share.',
  },
  sources: Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, `${base}${path}`])),
  league: {
    leagueId,
    name: data.league.name,
    season: data.league.season,
    status: data.league.status,
    completedWeek: data.league.settings.last_scored_leg,
    rosterPositions: data.league.roster_positions,
    scoringSettings: data.league.scoring_settings,
  },
  teams,
  week1: trimMatchups(data.week1),
  week2: trimMatchups(data.week2),
  week3: trimMatchups(data.week3),
  week4: trimMatchups(data.week4),
  players,
  weeklyAllPlay,
  mickeyOfTheWeek: { ...mickeyCandidate, leagueMedian: round(leagueMedian) },
};
if (!reportOnly) await writeFile(outputPath, JSON.stringify(snapshot, null, 2) + '\n');
const playerSummary = (row, id) => ({
  id, name: players[id].name, nflTeam: players[id].team,
  points: row.players_points?.[id] ?? 0,
  injuryStatus: players[id].injuryStatus, injuryBodyPart: players[id].injuryBodyPart,
});
console.log(JSON.stringify({
  capturedAt: snapshot.capturedAt, phase: snapshot.phase, completedWeek: snapshot.league.completedWeek,
  mickeyOfTheWeek: snapshot.mickeyOfTheWeek,
  teams: teams.map(team => {
    const row = snapshot.week3.find(result => result.roster_id === team.rosterId);
    const next = snapshot.week4.find(result => result.roster_id === team.rosterId);
    return {
      rosterId: team.rosterId, teamName: team.teamName, username: team.username,
      record: team.recordThroughWeek3,
      ...weeklyAllPlay.find(result => result.rosterId === team.rosterId),
      starters: row.starters.map((id, index) => ({ ...playerSummary(row, id), slot: snapshot.league.rosterPositions[index] })),
      bench: row.players.filter(id => !row.starters.includes(id)).map(id => playerSummary(row, id)).sort((a, b) => b.points - a.points),
      injuries: team.rosterPlayerIds.filter(id => players[id].injuryStatus).map(id => playerSummary(row, id)),
      week4Opponent: snapshot.week4.find(result => result.matchup_id === next.matchup_id && result.roster_id !== team.rosterId).roster_id,
    };
  }),
}, null, 2));
