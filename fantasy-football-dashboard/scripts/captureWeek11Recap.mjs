// Capture source evidence for this edition; never rewrite a prior issue's snapshot.
// Run from fantasy-football-dashboard. --report-only validates without saving.
import { readFile, writeFile } from 'node:fs/promises';

const config = await readFile('src/config/seasons.ts', 'utf8');
const leagueId = process.env.REACT_APP_ACTIVE_LEAGUE_ID || process.env.REACT_APP_2026_LEAGUE_ID || config.match(/defaultActiveLeagueId = '([^']+)'/)[1];
const recapWeek = 11;
const previewWeek = 12;
const base = 'https://api.sleeper.app/v1';
const paths = {
  league: `/league/${leagueId}`, users: `/league/${leagueId}/users`,
  rosters: `/league/${leagueId}/rosters`, players: '/players/nfl',
  ...Object.fromEntries(Array.from({ length: previewWeek }, (_, i) => [`week${i + 1}`, `/league/${leagueId}/matchups/${i + 1}`])),
};
const data = Object.fromEntries(await Promise.all(Object.entries(paths).map(async ([key, path]) => {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw Error(`${path}: ${response.status}`);
  const value = await response.json();
  if (value == null) throw Error(`${path}: empty response`);
  return [key, value];
})));
if (data.league.season !== '2026' || data.league.settings.last_scored_leg < recapWeek) throw Error('2026 Week 11 is not confirmed complete.');
const score = row => row.custom_points ?? row.points;
const round = number => Math.round(number * 100) / 100;
const completed = Array.from({ length: recapWeek }, (_, i) => data[`week${i + 1}`]);
const ids = new Set([
  ...completed.flatMap(week => week.flatMap(row => [...(row.players || []), ...(row.starters || [])])),
  ...data.rosters.flatMap(row => [...(row.players || []), ...(row.reserve || [])]),
]);
const players = Object.fromEntries([...ids].map(id => {
  const player = data.players[id];
  if (!player && id !== '0') throw Error(`Unknown player ${id}`);
  return [id, {
    name: player?.full_name || [player?.first_name, player?.last_name].filter(Boolean).join(' ') || (id === '0' ? 'Empty slot' : id),
    position: player?.position || (id.length <= 3 ? 'DEF' : 'N/A'),
    team: player?.team || null, injuryStatus: player?.injury_status || null,
    injuryBodyPart: player?.injury_body_part || null, injuryNotes: player?.injury_notes || null,
    injuryStartDate: player?.injury_start_date || null, status: player?.status || null,
  }];
}));
const teams = data.rosters.map(roster => {
  const user = data.users.find(user => user.user_id === roster.owner_id);
  const record = { wins: 0, losses: 0, ties: 0 };
  let pointsFor = 0;
  for (const week of completed) {
    const row = week.find(row => row.roster_id === roster.roster_id);
    const opponent = week.find(other => other.matchup_id === row.matchup_id && other.roster_id !== row.roster_id);
    if (!opponent) throw Error(`Missing opponent for ${roster.roster_id}`);
    record[score(row) > score(opponent) ? 'wins' : score(row) < score(opponent) ? 'losses' : 'ties']++;
    pointsFor += score(row);
  }
  if (data.league.settings.last_scored_leg === recapWeek && ['wins', 'losses', 'ties'].some(key => record[key] !== roster.settings[key])) throw Error(`Standings disagree for ${roster.roster_id}`);
  return {
    rosterId: roster.roster_id, username: user?.display_name || user?.username,
    teamName: user?.metadata?.team_name?.trim() || user?.display_name || `Team ${roster.roster_id}`,
    ...record, recordThroughRecapWeek: record, pointsFor: round(pointsFor),
    rosterPlayerIds: roster.players || [], reservePlayerIds: roster.reserve || [],
  };
});
if (teams.length !== 12) throw Error('Expected twelve teams.');
for (let weekNumber = 1; weekNumber <= previewWeek; weekNumber++) {
  const week = data[`week${weekNumber}`];
  if (week.length !== 12 || new Set(week.map(row => row.roster_id)).size !== 12) throw Error(`Week ${weekNumber}: missing/duplicate roster`);
  for (const row of week) {
    if (!teams.some(team => team.rosterId === row.roster_id) || row.matchup_id == null || week.filter(other => other.matchup_id === row.matchup_id).length !== 2) throw Error(`Week ${weekNumber}: invalid pairing`);
    if (weekNumber > recapWeek) continue;
    if (!Number.isFinite(score(row)) || row.starters.length !== 10 || row.starters_points.length !== 10 || row.starters_points.some(points => !Number.isFinite(points))) throw Error(`Week ${weekNumber}: incomplete starters`);
    if (row.custom_points == null && Math.abs(row.starters_points.reduce((sum, points) => sum + points, 0) - row.points) > 0.011) throw Error(`Week ${weekNumber}: starter sum mismatch for ${row.roster_id}`);
  }
}
const weeklyAllPlay = data.week11.map(row => {
  const others = data.week11.filter(other => other.roster_id !== row.roster_id);
  const opponent = others.find(other => other.matchup_id === row.matchup_id);
  const wins = others.filter(other => score(row) > score(other)).length;
  const losses = others.filter(other => score(row) < score(other)).length;
  return {
    rosterId: row.roster_id, score: score(row), scoreRank: losses + 1,
    opponentId: opponent.roster_id, opponentScore: score(opponent),
    opponentScoreRank: 1 + data.week11.filter(other => score(other) > score(opponent)).length,
    margin: round(score(row) - score(opponent)),
    result: score(row) > score(opponent) ? 'win' : score(row) < score(opponent) ? 'loss' : 'tie',
    allPlayWins: wins, allPlayLosses: losses, allPlayTies: 11 - wins - losses,
  };
});
const orderedScores = data.week11.map(score).sort((a, b) => a - b);
const mickey = weeklyAllPlay.filter(row => row.result === 'win').sort((a, b) => a.score - b.score)[0];
const trimmedWeeks = Object.fromEntries(Array.from({ length: previewWeek }, (_, i) => [`week${i + 1}`, data[`week${i + 1}`].map(row => ({ roster_id: row.roster_id, matchup_id: row.matchup_id, points: row.points, custom_points: row.custom_points ?? null, starters: row.starters, starters_points: row.starters_points, players: row.players, players_points: row.players_points }))]));
const snapshot = {
  capturedAt: new Date().toISOString(), phase: 'final',
  editorialContext: { recapWeek, previewWeek, instruction: 'Final scores do not establish comeback chronology. Current injury tags are not necessarily new injuries.', finalitySource: 'Sleeper settings.last_scored_leg >= 11.' },
  sources: Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, `${base}${path}`])),
  league: { leagueId, name: data.league.name, season: data.league.season, status: data.league.status, completedWeek: data.league.settings.last_scored_leg, rosterPositions: data.league.roster_positions, scoringSettings: data.league.scoring_settings },
  teams, ...trimmedWeeks, players, weeklyAllPlay,
  mickeyOfTheWeek: { ...mickey, leagueMedian: round((orderedScores[5] + orderedScores[6]) / 2) },
};
if (!process.argv.includes('--report-only')) await writeFile('src/data/week11Recap2026Snapshot.json', JSON.stringify(snapshot, null, 2) + '\n');
console.log(JSON.stringify({ capturedAt: snapshot.capturedAt, completedWeek: snapshot.league.completedWeek, teams, weeklyAllPlay, mickeyOfTheWeek: snapshot.mickeyOfTheWeek }, null, 2));
