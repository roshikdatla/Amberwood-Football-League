const CURRENT_LEAGUE_ID = '1354521952483573760';
const BASE_URL = 'https://api.sleeper.app/v1';

const managerNames = {
  '558419700187070464': 'Gary',
  '558676595605159936': 'Sahil',
  '677076343376113664': 'Abhiram',
  '726643509779611648': 'Ankith',
  '729189768704983040': 'Abhishek',
  '734584252666118144': 'Aditya',
  '835976352858501120': 'Anudeep',
  '843230279572254720': 'Sahit',
  '861744954924441600': 'Taaha',
  '861745106527563776': 'Roshik',
  '864022733141487616': 'Pranav J',
  '1054299149400756224': 'Pranav P',
};

const round = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

async function getJson(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${path}`);
  }
  return response.json();
}

async function getOptionalJson(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) return [];
  return response.json();
}

function groupMatchups(entries) {
  const groups = new Map();
  for (const entry of entries) {
    const group = groups.get(entry.matchup_id) || [];
    group.push(entry);
    groups.set(entry.matchup_id, group);
  }
  return [...groups.values()].filter((group) => group.length === 2);
}

function normalizePosition(slot, playerId, players) {
  if (slot === 'DEF' || /^[A-Z]{2,3}$/.test(playerId)) return 'DEF';
  if (slot === 'K') return 'K';
  if (slot !== 'FLEX') return slot;
  const position = players[playerId]?.position;
  return ['RB', 'WR', 'TE'].includes(position) ? position : 'FLEX';
}

function positionalPoints(entry, rosterPositions) {
  const result = { QB: 0, RB: 0, WR: 0, TE: 0, K: 0, DEF: 0, FLEX: 0 };
  (entry.starters || []).forEach((playerId, index) => {
    if (!playerId || playerId === '0') return;
    const position = rosterPositions[index];
    if (!(position in result)) return;
    const points = entry.starters_points?.[index] ?? entry.players_points?.[playerId] ?? 0;
    result[position] = round((result[position] || 0) + points);
  });
  return result;
}

function bestPlayerPerformance(entry, rosterPositions, players) {
  return (entry.starters || []).reduce((best, playerId, index) => {
    if (!playerId || playerId === '0') return best;
    const position = normalizePosition(rosterPositions[index], playerId, players);
    if (!['QB', 'RB', 'WR', 'TE'].includes(position)) return best;
    const points = entry.starters_points?.[index] ?? entry.players_points?.[playerId] ?? 0;
    if (best && best.points >= points) return best;
    const player = players[playerId];
    const name =
      player?.full_name ||
      [player?.first_name, player?.last_name].filter(Boolean).join(' ') ||
      playerId;
    return { name, position, points: round(points) };
  }, null);
}

function summarizeSide(ownerId, games) {
  const scores = games.map((game) => game.scores[ownerId]);
  const positionTotals = { QB: 0, RB: 0, WR: 0, TE: 0, K: 0, DEF: 0, FLEX: 0 };
  for (const game of games) {
    for (const [position, points] of Object.entries(game.positions[ownerId])) {
      positionTotals[position] += points;
    }
  }
  const iconicPerformance = games
    .filter((game) => game.winner === ownerId)
    .map((game) => ({
      ...game.performances[ownerId],
      season: game.season,
      week: game.week,
      teamScore: game.scores[ownerId],
      won: game.winner === ownerId,
      isPlayoff: game.isPlayoff,
    }))
    .filter((performance) => performance.name)
    .sort((a, b) => b.points - a.points)[0];

  return {
    manager: managerNames[ownerId],
    ownerId,
    wins: games.filter((game) => game.winner === ownerId).length,
    losses: games.filter((game) => game.winner && game.winner !== ownerId).length,
    ties: games.filter((game) => !game.winner).length,
    averageScore: round(scores.reduce((sum, score) => sum + score, 0) / games.length),
    highestScore: round(Math.max(...scores)),
    iconicPerformance,
    positionAverages: Object.fromEntries(
      Object.entries(positionTotals).map(([position, total]) => [position, round(total / games.length)]),
    ),
  };
}

const players = await getJson('/players/nfl');

const leagues = [];
let leagueId = CURRENT_LEAGUE_ID;
while (leagueId) {
  const league = await getJson(`/league/${leagueId}`);
  leagues.push(league);
  leagueId = league.previous_league_id || null;
}

const currentLeague = leagues[0];
const [currentUsers, currentRosters, weekOne] = await Promise.all([
  getJson(`/league/${CURRENT_LEAGUE_ID}/users`),
  getJson(`/league/${CURRENT_LEAGUE_ID}/rosters`),
  getJson(`/league/${CURRENT_LEAGUE_ID}/matchups/1`),
]);

const currentUsersById = Object.fromEntries(currentUsers.map((user) => [user.user_id, user]));
const currentRostersById = Object.fromEntries(currentRosters.map((roster) => [roster.roster_id, roster]));

const rivalryPairs = groupMatchups(weekOne)
  .map((pair) => {
    const owners = pair.map((entry) => currentRostersById[entry.roster_id].owner_id);
    return {
      matchupId: pair[0].matchup_id,
      owners,
      key: [...owners].sort().join(':'),
    };
  })
  .sort((a, b) => a.matchupId - b.matchupId);

const rivalryKeys = new Set(rivalryPairs.map((pair) => pair.key));
const history = [];

for (const league of leagues.slice(1)) {
  const [rosters, winnersBracket] = await Promise.all([
    getJson(`/league/${league.league_id}/rosters`),
    getOptionalJson(`/league/${league.league_id}/winners_bracket`),
  ]);
  const rostersById = Object.fromEntries(rosters.map((roster) => [roster.roster_id, roster]));
  const playoffMatchups = new Set(
    winnersBracket
      .filter((matchup) => matchup.t1 && matchup.t2)
      .map((matchup) => {
        const week = league.settings.playoff_week_start + matchup.r - 1;
        return `${week}:${[matchup.t1, matchup.t2].sort((a, b) => a - b).join(':')}`;
      }),
  );
  const lastWeek = league.settings?.last_scored_leg || 18;
  const weeklyEntries = await Promise.all(
    Array.from({ length: lastWeek }, (_, index) =>
      getJson(`/league/${league.league_id}/matchups/${index + 1}`),
    ),
  );

  weeklyEntries.forEach((entries, index) => {
    for (const pair of groupMatchups(entries)) {
      const [first, second] = pair;
      const firstOwner = rostersById[first.roster_id]?.owner_id;
      const secondOwner = rostersById[second.roster_id]?.owner_id;
      if (!firstOwner || !secondOwner) continue;
      const key = [firstOwner, secondOwner].sort().join(':');
      if (!rivalryKeys.has(key)) continue;
      if (first.points === 0 && second.points === 0) continue;

      history.push({
        key,
        season: Number(league.season),
        week: index + 1,
        scores: {
          [firstOwner]: round(first.points),
          [secondOwner]: round(second.points),
        },
        positions: {
          [firstOwner]: positionalPoints(first, league.roster_positions),
          [secondOwner]: positionalPoints(second, league.roster_positions),
        },
        performances: {
          [firstOwner]: bestPlayerPerformance(first, league.roster_positions, players),
          [secondOwner]: bestPlayerPerformance(second, league.roster_positions, players),
        },
        isPlayoff: playoffMatchups.has(
          `${index + 1}:${[first.roster_id, second.roster_id].sort((a, b) => a - b).join(':')}`,
        ),
        winner:
          first.points === second.points
            ? null
            : first.points > second.points
              ? firstOwner
              : secondOwner,
      });
    }
  });
}

const output = rivalryPairs.map((rivalry) => {
  const games = history
    .filter((game) => game.key === rivalry.key)
    .sort((a, b) => a.season - b.season || a.week - b.week);
  const [firstOwner, secondOwner] = rivalry.owners;
  const margins = games.map((game) =>
    Math.abs(game.scores[firstOwner] - game.scores[secondOwner]),
  );
  const closestIndex = margins.indexOf(Math.min(...margins));
  const largestIndex = margins.indexOf(Math.max(...margins));
  const latest = games.at(-1);

  return {
    matchupId: rivalry.matchupId,
    historyStart: Math.min(...games.map((game) => game.season)),
    meetings: games.length,
    averageMargin: round(margins.reduce((sum, margin) => sum + margin, 0) / games.length),
    sideA: {
      ...summarizeSide(firstOwner, games),
      teamName:
        currentUsersById[firstOwner]?.metadata?.team_name?.trim() ||
        currentUsersById[firstOwner]?.display_name,
    },
    sideB: {
      ...summarizeSide(secondOwner, games),
      teamName:
        currentUsersById[secondOwner]?.metadata?.team_name?.trim() ||
        currentUsersById[secondOwner]?.display_name,
    },
    currentStreak: (() => {
      if (!latest?.winner) return { manager: 'Tie', games: 1 };
      let count = 0;
      for (const game of [...games].reverse()) {
        if (game.winner !== latest.winner) break;
        count += 1;
      }
      return { manager: managerNames[latest.winner], games: count };
    })(),
    lastMeeting: {
      season: latest.season,
      week: latest.week,
      managerA: managerNames[firstOwner],
      scoreA: latest.scores[firstOwner],
      managerB: managerNames[secondOwner],
      scoreB: latest.scores[secondOwner],
    },
    closestGame: {
      season: games[closestIndex].season,
      week: games[closestIndex].week,
      margin: round(margins[closestIndex]),
    },
    largestVictory: {
      season: games[largestIndex].season,
      week: games[largestIndex].week,
      margin: round(margins[largestIndex]),
      winner: managerNames[games[largestIndex].winner],
    },
    history: games.slice().reverse().map((game) => ({
      season: game.season,
      week: game.week,
      winner: game.winner ? managerNames[game.winner] : 'Tie',
      scoreA: game.scores[firstOwner],
      scoreB: game.scores[secondOwner],
      isPlayoff: game.isPlayoff,
    })),
  };
});

console.log(JSON.stringify({
  leagueSeasons: leagues.map((league) => Number(league.season)),
  generatedAt: new Date().toISOString(),
  rivalries: output,
}, null, 2));
