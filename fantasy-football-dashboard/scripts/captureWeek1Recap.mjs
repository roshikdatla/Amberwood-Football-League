// Capture a reproducible, trimmed source snapshot for the 2026 Week 1 edition.
// Run from fantasy-football-dashboard; generated JSON is editorial source data.
import { writeFile } from 'node:fs/promises';

const leagueId = '1354521952483573760';
const base = 'https://api.sleeper.app/v1';
const paths = {
  league: `/league/${leagueId}`,
  users: `/league/${leagueId}/users`,
  rosters: `/league/${leagueId}/rosters`,
  week1: `/league/${leagueId}/matchups/1`,
  week2: `/league/${leagueId}/matchups/2`,
  players: '/players/nfl',
};
const entries = await Promise.all(Object.entries(paths).map(async ([key, path]) => {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  return [key, await response.json()];
}));
const data = Object.fromEntries(entries);
if (data.league.season !== '2026' || data.league.settings.last_scored_leg < 1) {
  throw new Error('2026 Week 1 is not final in the league data.');
}
const neededIds = new Set([...data.week1, ...data.week2].flatMap(m => m.players || []));
const players = Object.fromEntries([...neededIds].map(id => {
  const p = data.players[id];
  return [id, { name: p?.full_name || [p?.first_name, p?.last_name].filter(Boolean).join(' ') || id,
    position: p?.position || (id.length <= 3 ? 'DEF' : 'N/A'), team: p?.team || id,
    injuryStatus: p?.injury_status || null }];
}));
const snapshot = {
  capturedAt: new Date().toISOString(),
  sources: Object.fromEntries(Object.entries(paths).filter(([key]) => key !== 'players').map(([key,path]) => [key, `${base}${path}`])),
  league: { leagueId, season: data.league.season, completedWeek: data.league.settings.last_scored_leg, rosterPositions: data.league.roster_positions },
  teams: data.rosters.map(r => {
    const u = data.users.find(u => u.user_id === r.owner_id);
    return { rosterId: r.roster_id, username: u?.display_name || u?.username,
      teamName: u?.metadata?.team_name?.trim() || u?.display_name || `Team ${r.roster_id}`,
      wins: r.settings.wins, losses: r.settings.losses, ties: r.settings.ties };
  }),
  week1: data.week1,
  week2: data.week2,
  players,
};
await writeFile('src/data/week1Recap2026Snapshot.json', JSON.stringify(snapshot, null, 2) + '\n');
const report = snapshot.week1.map(m => ({
  ...snapshot.teams.find(t => t.rosterId === m.roster_id), matchupId: m.matchup_id, score: m.custom_points ?? m.points,
  starters: m.starters.map((id,i) => ({...players[id], id, slot:data.league.roster_positions[i], points:m.starters_points?.[i] ?? m.players_points?.[id] ?? 0})),
  bench: (m.players || []).filter(id => !m.starters.includes(id)).map(id => ({...players[id], id, points:m.players_points?.[id] ?? 0})).sort((a,b)=>b.points-a.points),
  nextOpponent: snapshot.week2.filter(n => n.matchup_id === snapshot.week2.find(n=>n.roster_id===m.roster_id)?.matchup_id && n.roster_id !== m.roster_id).map(n=>snapshot.teams.find(t=>t.rosterId===n.roster_id)),
}));
console.log(JSON.stringify(report, null, 2));
