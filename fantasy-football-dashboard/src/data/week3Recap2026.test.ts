import {
  editionStatus,
  formatScore,
  getRecapTeam,
  getStarter,
  mickeyOfTheWeek,
  recapSource,
  recapTeams,
  week3Overview,
  week3PowerRankings,
  week3Recaps,
  week4Previews,
} from './week3Recap2026';
import { week2PowerRankings } from './week2Recap2026';

type Result = { roster_id: number; matchup_id: number; points: number; custom_points: number | null };
type Player = { name: string; team: string | null; injuryStatus: string | null; injuryBodyPart: string | null };
const players = recapSource.players as Record<string, Player>;
const rosterIds = recapSource.teams.map(team => team.rosterId).sort((a, b) => a - b);
const score = (row: Result) => row.custom_points ?? row.points;
const currentMatchup = (id: number) => recapSource.week3.find(row => row.roster_id === id)!;
const pointsFor = (rosterId: number, name: string) => {
  const row = currentMatchup(rosterId);
  const id = row.players.find(playerId => players[playerId].name === name);
  if (!id) throw new Error(`${name} is absent from roster ${rosterId}'s Week 3 box score`);
  const points = (row.players_points as Record<string, number | undefined>)[id];
  if (points === undefined) throw new Error(`Missing Week 3 points for ${name}`);
  return points;
};
const actualWinners = recapSource.week3.filter(row => {
  const opponent = recapSource.week3.find(other => other.matchup_id === row.matchup_id && other.roster_id !== row.roster_id)!;
  return score(row) > score(opponent);
});

test('Week 3 is independently confirmed final with a dated source and Week 4 preview', () => {
  expect(editionStatus).toBe('final');
  expect(recapSource.phase).toBe('final');
  expect(recapSource.league.season).toBe('2026');
  expect(recapSource.league.completedWeek).toBeGreaterThanOrEqual(3);
  expect(Number.isNaN(Date.parse(recapSource.capturedAt))).toBe(false);
  expect(recapSource.editorialContext.recapWeek).toBe(3);
  expect(recapSource.editorialContext.previewWeek).toBe(4);
  expect(recapSource.editorialContext.unplayedTeams).toEqual([]);
  expect(recapSource.sources.week3.endsWith('/matchups/3')).toBe(true);
});

test('all source weeks have twelve unique rosters and six complete schedule pairs', () => {
  const weeks: Result[][] = [recapSource.week1, recapSource.week2, recapSource.week3, recapSource.week4];
  expect(rosterIds).toEqual(Array.from({ length: 12 }, (_, index) => index + 1));
  for (const week of weeks) {
    expect(week.map(row => row.roster_id).sort((a, b) => a - b)).toEqual(rosterIds);
    const matchups = Array.from(new Set(week.map(row => row.matchup_id)));
    expect(matchups).toHaveLength(6);
    for (const id of matchups) expect(week.filter(row => row.matchup_id === id)).toHaveLength(2);
  }
});

test('each recap covers the real Week 3 pair and gives its X-factor to a winning historical starter', () => {
  expect(week3Recaps).toHaveLength(6);
  expect(week3Recaps.flatMap(row => row.teamIds).sort((a, b) => a - b)).toEqual(rosterIds);
  expect(new Set(week3Recaps.map(row => row.matchupId)).size).toBe(6);
  for (const recap of week3Recaps) {
    const pair = recapSource.week3.filter(row => row.matchup_id === recap.matchupId).map(row => row.roster_id);
    expect([...recap.teamIds].sort((a, b) => a - b)).toEqual(pair.sort((a, b) => a - b));
    expect(recap.teamIds).toContain(recap.xFactorRosterId);
    const source = currentMatchup(recap.xFactorRosterId);
    expect(source.starters).toContain(recap.xFactorId);
    const player = getStarter(recap.xFactorRosterId, recap.xFactorId);
    expect(player.points).toBeGreaterThan(0);
    expect(recap.xFactor).toContain(formatScore(player.points));
    const opponent = recap.teamIds.find(id => id !== recap.xFactorRosterId)!;
    expect(getRecapTeam(recap.xFactorRosterId).score).toBeGreaterThan(getRecapTeam(opponent).score);
    // Use the historical lineup, not current ownership, after the league's trades.
    for (const id of recap.teamIds) expect(recap.summary).toContain(formatScore(getRecapTeam(id).score));
  }
});

test('all completed starter totals reconcile and displayed Week 3 scores match the snapshot', () => {
  expect(recapTeams).toHaveLength(12);
  for (const week of [recapSource.week1, recapSource.week2, recapSource.week3]) {
    for (const row of week) {
      expect(row.starters).toHaveLength(10);
      expect(row.starters_points).toHaveLength(row.starters.length);
      expect(row.starters_points.reduce((sum, points) => sum + points, 0)).toBeCloseTo(row.points, 2);
      row.starters.forEach((id, index) => {
        expect(players[id]).toBeDefined();
        expect(row.starters_points[index]).toBe((row.players_points as Record<string, number | undefined>)[id]);
      });
    }
  }
  for (const row of recapSource.week3) {
    expect(getRecapTeam(row.roster_id).score).toBe(score(row));
    expect(getRecapTeam(row.roster_id).matchupId).toBe(row.matchup_id);
  }
});

test('season records are calculated from three finalized weeks and agree with the API standings', () => {
  const weeks: Result[][] = [recapSource.week1, recapSource.week2, recapSource.week3];
  for (const team of recapTeams) {
    const record = { wins: 0, losses: 0, ties: 0 };
    for (const week of weeks) {
      const row = week.find(result => result.roster_id === team.rosterId)!;
      const opponent = week.find(result => result.matchup_id === row.matchup_id && result.roster_id !== team.rosterId)!;
      if (score(row) > score(opponent)) record.wins += 1;
      else if (score(row) < score(opponent)) record.losses += 1;
      else record.ties += 1;
    }
    expect(record).toEqual(team.recordThroughWeek3);
    expect(record.wins + record.losses + record.ties).toBe(3);
    expect(team.record).toBe(`${record.wins}–${record.losses}${record.ties ? `–${record.ties}` : ''}`);
    if (recapSource.league.completedWeek === 3) {
      expect([team.wins, team.losses, team.ties]).toEqual([record.wins, record.losses, record.ties]);
    }
  }
  expect(recapTeams.filter(team => team.record === '3–0').map(team => team.rosterId).sort((a, b) => a - b)).toEqual([3, 12]);
  expect(recapTeams.filter(team => team.record === '0–3').map(team => team.rosterId).sort((a, b) => a - b)).toEqual([2, 8]);
});

test('all-play records, score ranks and opponent softness are independently reproducible', () => {
  expect(recapSource.weeklyAllPlay).toHaveLength(12);
  for (const row of recapSource.week3) {
    const others = recapSource.week3.filter(other => other.roster_id !== row.roster_id);
    const wins = others.filter(other => score(row) > score(other)).length;
    const losses = others.filter(other => score(row) < score(other)).length;
    const ties = others.length - wins - losses;
    const opponent = others.find(other => other.matchup_id === row.matchup_id)!;
    const result = recapSource.weeklyAllPlay.find(other => other.rosterId === row.roster_id)!;
    expect(result.allPlayWins).toBe(wins);
    expect(result.allPlayLosses).toBe(losses);
    expect(result.allPlayTies).toBe(ties);
    expect(wins + losses + ties).toBe(11);
    expect(result.scoreRank).toBe(losses + 1);
    expect(result.opponentId).toBe(opponent.roster_id);
    expect(result.opponentScore).toBe(score(opponent));
    expect(result.opponentScoreRank).toBe(1 + recapSource.week3.filter(other => score(other) > score(opponent)).length);
    expect(result.margin).toBeCloseTo(score(row) - score(opponent), 2);
    expect(result.expectedWinShare).toBeCloseTo((wins + 0.5 * ties) / 11, 8);
  }
  expect(recapSource.weeklyAllPlay.reduce((sum, row) => sum + row.allPlayWins, 0)).toBe(66);
});

test('Mickey is the lowest-scoring actual winner and the only winner below the median', () => {
  const lowestWinner = [...actualWinners].sort((a, b) => score(a) - score(b))[0];
  const sorted = recapSource.week3.map(score).sort((a, b) => a - b);
  const median = (sorted[5] + sorted[6]) / 2;
  expect(actualWinners).toHaveLength(6);
  expect(mickeyOfTheWeek.rosterId).toBe(lowestWinner.roster_id);
  expect(mickeyOfTheWeek.rosterId).toBe(12);
  expect(mickeyOfTheWeek.allPlayWins).toBe(4);
  expect(mickeyOfTheWeek.allPlayLosses).toBe(7);
  expect(mickeyOfTheWeek.scoreRank).toBe(8);
  expect(mickeyOfTheWeek.opponentRank).toBe(11);
  expect(median).toBeCloseTo(118.46, 2);
  expect(recapSource.mickeyOfTheWeek.leagueMedian).toBeCloseTo(median, 2);
  expect(actualWinners.filter(row => score(row) < median).map(row => row.roster_id)).toEqual([12]);
  expect(median - score(lowestWinner)).toBeCloseTo(7.14, 2);
  const rank = recapSource.weeklyAllPlay.find(row => row.rosterId === 12)!;
  expect(rank.scheduleLuck).toBe(Math.max(...recapSource.weeklyAllPlay.map(row => row.scheduleLuck)));
});

test('Mickey jokes keep their numeric claims faithful to the actual results', () => {
  expect(mickeyOfTheWeek.summary).toContain('111.32');
  expect(mickeyOfTheWeek.summary).toContain('eighth out of twelve');
  expect(mickeyOfTheWeek.summary).toContain('Seven teams would have beaten him');
  expect(mickeyOfTheWeek.summary).toContain('95.34');
  expect(getRecapTeam(12).record).toBe('3–0');
  for (const loserId of [2, 7]) {
    expect(getRecapTeam(loserId).score).toBeGreaterThan(getRecapTeam(12).score);
    expect(actualWinners.some(row => row.roster_id === loserId)).toBe(false);
  }
  expect(week3Overview.lead).toContain('lost to seven other teams');
  const week4Row = recapSource.week4.find(row => row.roster_id === 12)!;
  expect(recapSource.week4.find(row => row.matchup_id === week4Row.matchup_id && row.roster_id !== 12)!.roster_id).toBe(3);
  expect(mickeyOfTheWeek.verdict).toContain(formatScore(getRecapTeam(3).score));
});

test('combined-score and counterfactual arithmetic in the recaps matches the underlying players', () => {
  const cases: Array<{ matchupId: number; total: number; expected: number }> = [
    { matchupId: 2, total: pointsFor(5, 'Kenneth Walker') + pointsFor(5, 'Kyren Williams'), expected: 43.10 },
    { matchupId: 2, total: pointsFor(5, 'Harold Fannin') + pointsFor(5, 'Juwan Johnson'), expected: 47.40 },
    { matchupId: 2, total: pointsFor(11, 'Jonathan Taylor') + pointsFor(11, 'TreVeyon Henderson') + pointsFor(11, 'Dalton Kincaid'), expected: 16.90 },
    { matchupId: 1, total: pointsFor(7, 'Christian McCaffrey') + pointsFor(7, 'George Kittle'), expected: 47.80 },
    { matchupId: 1, total: pointsFor(7, 'Omarion Hampton') + pointsFor(7, 'Malik Nabers') + pointsFor(7, 'Khalil Shakir'), expected: 14.80 },
    { matchupId: 1, total: pointsFor(1, 'Jalen Coker') + pointsFor(1, 'Trey Smack') + pointsFor(1, 'San Francisco 49ers'), expected: 5.80 },
    { matchupId: 1, total: pointsFor(1, 'Jahmyr Gibbs') + pointsFor(1, 'Drake London'), expected: 71.80 },
    { matchupId: 4, total: pointsFor(3, 'Chris Olave') + pointsFor(3, 'Christian Watson'), expected: 44.30 },
    { matchupId: 4, total: pointsFor(3, 'Brock Bowers') - pointsFor(10, 'Trey McBride'), expected: 13.10 },
    { matchupId: 4, total: pointsFor(10, "De'Von Achane") + pointsFor(10, 'Bucky Irving'), expected: 9.50 },
    { matchupId: 4, total: pointsFor(3, 'Bijan Robinson') + pointsFor(3, 'Aaron Jones'), expected: 51.50 },
    { matchupId: 5, total: pointsFor(6, 'Garrett Wilson') + pointsFor(6, 'Jaylen Warren') + pointsFor(6, 'Derrick Henry'), expected: 73.20 },
    { matchupId: 5, total: pointsFor(9, 'Kyle Pitts') + pointsFor(9, 'Xavier Worthy') + pointsFor(9, 'Jadarian Price'), expected: 6.70 },
    { matchupId: 5, total: pointsFor(6, 'Justin Jefferson') + pointsFor(6, 'Isaiah Likely'), expected: 8.50 },
    { matchupId: 6, total: pointsFor(2, 'Ladd McConkey') + pointsFor(2, 'Tetairoa McMillan'), expected: 14.30 },
    { matchupId: 6, total: pointsFor(2, 'Breece Hall') + pointsFor(2, 'Chase Brown'), expected: 17.40 },
    { matchupId: 6, total: pointsFor(2, 'Kenyon Sadiq') - pointsFor(2, 'Tucker Kraft'), expected: 18.90 },
    { matchupId: 3, total: pointsFor(8, 'KC Concepcion') + pointsFor(8, 'Brian Thomas'), expected: 4.70 },
    { matchupId: 3, total: pointsFor(12, 'Devaughn Vele') + pointsFor(12, "Ka'imi Fairbairn") + pointsFor(12, 'Seattle Seahawks'), expected: 12.90 },
  ];
  for (const example of cases) {
    expect(example.total).toBeCloseTo(example.expected, 2);
    const recap = week3Recaps.find(row => row.matchupId === example.matchupId)!;
    expect([recap.summary, recap.xFactor, recap.lowlight].join(' ')).toContain(formatScore(example.expected));
  }
  expect(Math.max(...recapSource.week3.flatMap(row => row.starters_points))).toBe(pointsFor(1, 'Jahmyr Gibbs'));
  const hypotheticalAbhishek = getRecapTeam(2).score + pointsFor(2, 'Kenyon Sadiq') - pointsFor(2, 'Tucker Kraft');
  expect(hypotheticalAbhishek - getRecapTeam(4).score).toBeCloseTo(2.52, 2);
});

test('all twelve power rankings have two-sentence outlooks and movement from the current published Week 2 order', () => {
  expect(week2PowerRankings[0].rosterId).toBe(11);
  expect(week2PowerRankings[1].rosterId).toBe(12);
  expect(week3PowerRankings).toHaveLength(12);
  expect(week3PowerRankings.map(row => row.rosterId).sort((a, b) => a - b)).toEqual(rosterIds);
  for (const ranking of week3PowerRankings) {
    expect(ranking.previousRank).toBe(week2PowerRankings.findIndex(row => row.rosterId === ranking.rosterId) + 1);
    expect(ranking.outlook.trim().split(/(?<=[.!?])\s+/)).toHaveLength(2);
    expect(ranking.outlook).toMatch(/[.!?]$/);
  }
});

test('forward-looking coverage uses current ownership while recaps preserve the pre-trade lineups', () => {
  const owns = (rosterId: number, playerName: string) => getRecapTeam(rosterId).rosterPlayerIds.some(id => players[id].name === playerName);
  expect(owns(4, 'Breece Hall')).toBe(true);
  expect(owns(2, 'Breece Hall')).toBe(false);
  expect(owns(2, 'Sam LaPorta')).toBe(true);
  expect(owns(2, 'Rashee Rice')).toBe(true);
  expect(owns(4, 'Sam LaPorta')).toBe(false);
  expect(owns(4, 'Rashee Rice')).toBe(false);
  expect(owns(7, 'Jayden Daniels')).toBe(true);
  expect(owns(7, 'Justin Herbert')).toBe(false);
  expect(owns(10, "De'Von Achane")).toBe(false);
  expect(currentMatchup(4).starters).toContain('10859'); // LaPorta was still Ankith's Week 3 starter.
  expect(currentMatchup(2).starters).toContain('8155'); // Hall was still Abhishek's Week 3 starter.
  expect(currentMatchup(10).starters).toContain('9226'); // Achane's injury occurred in Abhiram's Week 3 lineup.
  const outlook = (id: number) => week3PowerRankings.find(row => row.rosterId === id)!.outlook;
  expect(outlook(4)).toMatch(/Hall/);
  expect(outlook(2)).toMatch(/LaPorta/);
  expect(outlook(2)).toMatch(/Rice/);
  expect(outlook(7)).toMatch(/Daniels/);
  expect(outlook(10)).not.toMatch(/with Achane|Achane-led|Achane (?:gives|provides|leads)/i);
});

test('Week 4 previews cover the real schedule once and select a participating roster', () => {
  expect(week4Previews).toHaveLength(6);
  expect(new Set(week4Previews.map(row => row.matchupId)).size).toBe(6);
  expect(week4Previews.flatMap(row => row.teamIds).sort((a, b) => a - b)).toEqual(rosterIds);
  for (const preview of week4Previews) {
    const source = recapSource.week4.filter(row => row.matchup_id === preview.matchupId).map(row => row.roster_id);
    expect([...preview.teamIds].sort((a, b) => a - b)).toEqual(source.sort((a, b) => a - b));
    expect(preview.teamIds).toContain(preview.pickId);
  }
});
