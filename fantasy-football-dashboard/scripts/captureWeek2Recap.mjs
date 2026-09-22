// Capture the source data for the 2026 Week 2 newsletter.
// This is deliberately separate from the finalized Week 1 snapshot.
// Run from fantasy-football-dashboard. Add --final only after Week 2 is complete.
import { readFile, writeFile } from 'node:fs/promises';

const leagueId = '1354521952483573760';
const base = 'https://api.sleeper.app/v1';
const finalized = process.argv.includes('--final');
const closing = process.argv.includes('--closing');
const reportOnly = process.argv.includes('--report-only');
const compact = process.argv.includes('--compact');
if (finalized && closing) throw new Error('Choose --final or --closing, not both.');
const outputPath = 'src/data/week2Recap2026Snapshot.json';
let originalCapturedAt;
try {
  const original = JSON.parse(await readFile(outputPath, 'utf8'));
  originalCapturedAt = original.originalCapturedAt || original.capturedAt;
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const paths = {
  league: `/league/${leagueId}`,
  users: `/league/${leagueId}/users`,
  rosters: `/league/${leagueId}/rosters`,
  week1: `/league/${leagueId}/matchups/1`,
  week2: `/league/${leagueId}/matchups/2`,
  week3: `/league/${leagueId}/matchups/3`,
  players: '/players/nfl',
};

const entries = await Promise.all(Object.entries(paths).map(async ([key, path]) => {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${path}: ${response.status}`);
  return [key, await response.json()];
}));
const data = Object.fromEntries(entries);
if (data.league.season !== '2026' || data.league.settings.last_scored_leg < 1) {
  throw new Error('The league is not in the expected 2026 season after Week 1.');
}
if (finalized && data.league.settings.last_scored_leg < 2) {
  throw new Error(`Week 2 is not marked completed (last_scored_leg=${data.league.settings.last_scored_leg}); refusing to label live scores final.`);
}
if (!finalized && !closing && data.league.settings.last_scored_leg >= 2) {
  throw new Error('Week 2 is now marked completed; update the editorial phase before refreshing this in-progress snapshot.');
}
const phase = finalized || (closing && data.league.settings.last_scored_leg >= 2)
  ? 'final' : closing ? 'closing-minute' : 'in-progress';
const weekCompleteForEditorial = phase !== 'in-progress';

const neededIds = new Set([
  ...[...data.week1, ...data.week2, ...data.week3].flatMap(m => m.players || []),
  ...data.rosters.flatMap(r => [...(r.players || []), ...(r.reserve || [])]),
]);
const players = Object.fromEntries([...neededIds].map(id => {
  const p = data.players[id];
  return [id, {
    name: p?.full_name || [p?.first_name, p?.last_name].filter(Boolean).join(' ') || id,
    position: p?.position || (id.length <= 3 ? 'DEF' : 'N/A'),
    team: p?.team || (id.length <= 3 ? id : null),
    injuryStatus: p?.injury_status || null,
    injuryBodyPart: p?.injury_body_part || null,
    injuryNotes: p?.injury_notes || null,
    injuryStartDate: p?.injury_start_date || null,
    status: p?.status || null,
  }];
}));
const trimMatchups = matchups => matchups.map(m => ({
  roster_id: m.roster_id,
  matchup_id: m.matchup_id,
  points: m.points,
  custom_points: m.custom_points ?? null,
  starters: m.starters,
  starters_points: m.starters_points,
  players: m.players,
  players_points: m.players_points,
}));

const snapshot = {
  capturedAt: new Date().toISOString(),
  ...(originalCapturedAt ? { originalCapturedAt } : {}),
  phase,
  editorialContext: {
    recapWeek: 2,
    previewWeek: 3,
    unplayedTeams: weekCompleteForEditorial ? [] : ['LAR', 'NYG'],
    instruction: phase === 'final'
      ? 'All Week 2 games are complete; cover the full week including Monday, using scores and records through Week 2.'
      : closing
        ? 'The user explicitly authorized treating the Week 2 outcomes as settled with one minute and backups remaining; include Monday and derive records through Week 2, but label scores as a closing-minute snapshot subject to the final plays and stat corrections.'
        : 'Draft through the games already played; do not cover the unplayed Rams/Giants game or present Week 2 scores and records as final.',
    finalitySource: phase === 'final'
      ? 'Sleeper league settings.last_scored_leg confirms Week 2 has completed.'
      : closing
        ? 'User-authorized closing-minute assumption; Sleeper still marks only Week 1 completed. This is not official finality.'
        : 'User-provided context on September 21, 2026; the league still has only Week 1 marked completed.',
    userAuthorizedClosingAssumption: closing,
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
  teams: data.rosters.map(r => {
    const u = data.users.find(u => u.user_id === r.owner_id);
    return {
      rosterId: r.roster_id,
      username: u?.display_name || u?.username,
      teamName: u?.metadata?.team_name?.trim() || u?.display_name || `Team ${r.roster_id}`,
      wins: r.settings.wins,
      losses: r.settings.losses,
      ties: r.settings.ties,
      rosterPlayerIds: r.players || [],
      reservePlayerIds: r.reserve || [],
    };
  }),
  week1: trimMatchups(data.week1),
  week2: trimMatchups(data.week2),
  week3: trimMatchups(data.week3),
  players,
};

const unplayedTeams = new Set(snapshot.editorialContext.unplayedTeams);
const report = snapshot.week2.map(m => {
  const starters = m.starters.map((id, i) => ({
    ...players[id], id, slot: data.league.roster_positions[i],
    points: m.starters_points?.[i] ?? m.players_points?.[id] ?? 0,
  }));
  const team = snapshot.teams.find(t => t.rosterId === m.roster_id);
  const next = snapshot.week3.find(n => n.roster_id === m.roster_id);
  return {
    ...team,
    matchupId: m.matchup_id,
    score: m.custom_points ?? m.points,
    starters,
    starterPointsSum: Math.round(starters.reduce((sum, p) => sum + p.points, 0) * 100) / 100,
    remainingStarters: starters.filter(p => unplayedTeams.has(p.team)),
    bench: (m.players || []).filter(id => !m.starters.includes(id)).map(id => ({
      ...players[id], id, points: m.players_points?.[id] ?? 0,
    })).sort((a, b) => b.points - a.points),
    nextOpponent: snapshot.week3.filter(n => n.matchup_id === next?.matchup_id && n.roster_id !== m.roster_id)
      .map(n => snapshot.teams.find(t => t.rosterId === n.roster_id)),
  };
});

if (snapshot.week2.length !== snapshot.teams.length || snapshot.week3.length !== snapshot.teams.length) {
  throw new Error('Incomplete weekly roster data; refusing to save a partial snapshot.');
}
for (const team of report) {
  if (!Number.isFinite(team.score) || team.nextOpponent.length !== 1) {
    throw new Error(`Invalid score or Week 3 pairing for roster ${team.rosterId}.`);
  }
  const current = snapshot.week2.find(m => m.roster_id === team.rosterId);
  if (current.custom_points == null && Math.abs(team.score - team.starterPointsSum) > 0.01) {
    throw new Error(`Starter points do not reconcile for roster ${team.rosterId}.`);
  }
}
if (!reportOnly) await writeFile(outputPath, JSON.stringify(snapshot, null, 2) + '\n');
console.log(JSON.stringify({ capturedAt: snapshot.capturedAt, phase: snapshot.phase, completedWeek: snapshot.league.completedWeek,
  teams: report.map(team => compact ? {
    rosterId: team.rosterId, teamName: team.teamName, matchupId: team.matchupId,
    score: team.score, starterPointsSum: team.starterPointsSum,
    mondayStarters: team.starters.filter(player => ['LAR', 'NYG'].includes(player.team))
      .map(player => ({ id: player.id, name: player.name, points: player.points, injury: player.injuryStatus })),
    injuries: snapshot.teams.find(row => row.rosterId === team.rosterId).rosterPlayerIds
      .filter(id => players[id].injuryStatus).map(id => ({ id, name: players[id].name, injury: players[id].injuryStatus, bodyPart: players[id].injuryBodyPart })),
    nextOpponent: team.nextOpponent.map(opponent => opponent.rosterId),
  } : {
    rosterId: team.rosterId, teamName: team.teamName, matchupId: team.matchupId,
    score: team.score, starterPointsSum: team.starterPointsSum,
    starters: team.starters.map(player => ({ id: player.id, name: player.name, team: player.team, points: player.points,
      injuryStatus: player.injuryStatus, injuryBodyPart: player.injuryBodyPart })),
    remainingStarters: team.remainingStarters.map(player => ({ name: player.name, points: player.points })),
    bench: team.bench.map(player => ({ name: player.name, team: player.team, points: player.points,
      injuryStatus: player.injuryStatus, injuryBodyPart: player.injuryBodyPart })),
    nextOpponent: team.nextOpponent.map(opponent => opponent.rosterId),
  }),
}, null, 2));
