import {
  editionStatus,
  formatScore,
  getRecapTeam,
  getStarter,
  recapSource,
  recapTeams,
  week2PowerRankings,
  week2Recaps,
  week3Previews,
} from './week2Recap2026';
import { week1PowerRankings } from './week1Recap2026';

const players = recapSource.players as Record<string, {
  name: string;
  team: string | null;
  injuryStatus: string | null;
  injuryBodyPart: string | null;
}>;
const rosterIds = recapSource.teams.map(team => team.rosterId).sort((a, b) => a - b);
const currentMatchup = (rosterId: number) => recapSource.week2.find(row => row.roster_id === rosterId)!;
const pointsFor = (rosterId: number, name: string) => {
  const matchup = currentMatchup(rosterId);
  const id = matchup.players.find(playerId => players[playerId].name === name);
  if (!id) throw new Error(`${name} is not in the Week 2 source for roster ${rosterId}`);
  const points = (matchup.players_points as Record<string, number | undefined>)[id];
  if (points === undefined) throw new Error(`Missing points for ${name}`);
  return points;
};

test('the dated edition preserves the distinction between closing-minute and official final scores', () => {
  expect(['closing-minute', 'final']).toContain(editionStatus);
  expect(editionStatus).toBe(recapSource.phase);
  expect(recapSource.league.season).toBe('2026');
  expect(Number.isNaN(Date.parse(recapSource.capturedAt))).toBe(false);
  expect(recapSource.originalCapturedAt).toBe('2026-09-21T15:30:34.766Z');
  expect(Date.parse(recapSource.capturedAt)).toBeGreaterThan(Date.parse(recapSource.originalCapturedAt));
  if (recapSource.phase === 'closing-minute') {
    expect(recapSource.league.completedWeek).toBe(1);
    expect(recapSource.editorialContext.userAuthorizedClosingAssumption).toBe(true);
    expect(recapSource.editorialContext.finalitySource).toContain('not official finality');
  } else {
    expect(recapSource.league.completedWeek).toBeGreaterThanOrEqual(2);
  }
  expect(recapSource.editorialContext.recapWeek).toBe(2);
  expect(recapSource.editorialContext.previewWeek).toBe(3);
  expect(recapSource.editorialContext.unplayedTeams).toEqual([]);
});

test('all six recaps cover the actual Week 2 pairs and each roster exactly once', () => {
  expect(week2Recaps).toHaveLength(6);
  expect(new Set(week2Recaps.map(row => row.matchupId)).size).toBe(6);
  expect(week2Recaps.flatMap(row => row.teamIds).sort((a, b) => a - b)).toEqual(rosterIds);
  for (const recap of week2Recaps) {
    const sourcePair = recapSource.week2
      .filter(row => row.matchup_id === recap.matchupId)
      .map(row => row.roster_id).sort((a, b) => a - b);
    expect([...recap.teamIds].sort((a, b) => a - b)).toEqual(sourcePair);
    expect(recap.teamIds).toContain(recap.xFactorRosterId);
  }
});

test('each X-factor actually started and scored for the team that won the matchup', () => {
  for (const recap of week2Recaps) {
    const source = currentMatchup(recap.xFactorRosterId);
    expect(source.starters).toContain(recap.xFactorId);
    expect(getRecapTeam(recap.xFactorRosterId).rosterPlayerIds).toContain(recap.xFactorId);
    const player = getStarter(recap.xFactorRosterId, recap.xFactorId);
    expect(player.points).toBeGreaterThan(0);
    expect(recap.xFactor).toContain(formatScore(player.points));
    const opponentId = recap.teamIds.find(id => id !== recap.xFactorRosterId)!;
    expect(getRecapTeam(recap.xFactorRosterId).score).toBeGreaterThan(getRecapTeam(opponentId).score);
  }
});

test('every starter total and displayed score reconciles with the frozen source', () => {
  expect(recapTeams).toHaveLength(12);
  for (const row of recapSource.week2) {
    expect(row.starters).toHaveLength(10);
    expect(row.starters_points).toHaveLength(row.starters.length);
    expect(row.starters_points.reduce((sum, value) => sum + value, 0)).toBeCloseTo(row.points, 2);
    expect(getRecapTeam(row.roster_id).score).toBe(row.custom_points ?? row.points);
    expect(getRecapTeam(row.roster_id).matchupId).toBe(row.matchup_id);
    row.starters.forEach((id, index) => {
      expect(players[id]).toBeDefined();
      expect(row.starters_points[index]).toBe((row.players_points as Record<string, number | undefined>)[id]);
    });
  }
});

test('editorial records include both weeks without rewriting the API completion flag', () => {
  const weeks: Array<Array<{ roster_id: number; matchup_id: number; points: number; custom_points: number | null }>> = [recapSource.week1, recapSource.week2];
  for (const team of recapTeams) {
    let wins = 0;
    let losses = 0;
    let ties = 0;
    for (const week of weeks) {
      const result = week.find(row => row.roster_id === team.rosterId)!;
      const opponent = week.find(row => row.matchup_id === result.matchup_id && row.roster_id !== team.rosterId)!;
      const score = result.custom_points ?? result.points;
      const against = opponent.custom_points ?? opponent.points;
      if (score === against) ties += 1;
      else if (score > against) wins += 1;
      else losses += 1;
    }
    const record = ties ? `${wins}–${losses}–${ties}` : `${wins}–${losses}`;
    expect(team.record).toBe(record);
  }
  expect(getRecapTeam(3).record).toBe('2–0');
  expect(getRecapTeam(7).record).toBe('1–1');
  expect(getRecapTeam(11).record).toBe('2–0');
  expect(getRecapTeam(9).record).toBe('1–1');
  expect(getRecapTeam(5).record).toBe('0–2');
});

test('Monday scoring and the Puka lineup change replace the outdated Sunday-only snapshot', () => {
  expect(pointsFor(9, 'Davante Adams')).toBeGreaterThanOrEqual(41.5);
  expect(pointsFor(5, 'Kyren Williams')).toBeGreaterThanOrEqual(14.7);
  expect(pointsFor(7, 'Malik Nabers')).toBeGreaterThan(0);
  expect(pointsFor(6, 'Isaiah Likely')).toBeGreaterThan(0);
  expect(pointsFor(12, 'Cam Skattebo')).toBeGreaterThan(0);
  expect(currentMatchup(12).starters).toContain('13285');
  expect(currentMatchup(12).starters).not.toContain('9493');
  expect(getStarter(12, '13285').name).toBe('Malachi Fields');
  const comeback = week2Recaps.find(row => row.matchupId === 4)!;
  expect(comeback.xFactorRosterId).toBe(9);
  expect(comeback.xFactorId).toBe('2133');
  expect(comeback.summary).toMatch(/Adams/);
  expect(getRecapTeam(9).score).toBeGreaterThan(getRecapTeam(5).score);
});

test('the combined totals and margins quoted in the recaps are supported by lineup data', () => {
  const cases: Array<{ matchupId: number; total: number; expected: number }> = [
    { matchupId: 3, total: pointsFor(12, 'Jalen Hurts') + pointsFor(12, 'DeVonta Smith'), expected: 45.86 },
    { matchupId: 3, total: pointsFor(12, 'CeeDee Lamb') + pointsFor(12, 'DeVonta Smith'), expected: 67.00 },
    { matchupId: 3, total: pointsFor(4, 'David Montgomery') + pointsFor(4, 'Rhamondre Stevenson'), expected: 8.00 },
    { matchupId: 5, total: getRecapTeam(10).score - getRecapTeam(1).score, expected: 4.04 },
    { matchupId: 5, total: pointsFor(10, 'Dalton Schultz') + pointsFor(10, 'Trey McBride'), expected: 46.10 },
    { matchupId: 5, total: pointsFor(1, 'Drake London') + pointsFor(1, 'Terry McLaurin') + pointsFor(1, 'Javonte Williams'), expected: 23.90 },
    { matchupId: 5, total: pointsFor(10, 'Tyler Shough') - pointsFor(10, 'Carson Wentz'), expected: 16.06 },
    { matchupId: 2, total: pointsFor(2, 'Tucker Kraft') + pointsFor(2, 'Jordan Addison'), expected: 6.60 },
    { matchupId: 2, total: pointsFor(3, 'Lamar Jackson') + pointsFor(3, 'Bijan Robinson'), expected: 25.90 },
    { matchupId: 4, total: pointsFor(5, 'Jaxon Smith-Njigba') + pointsFor(5, 'Kenneth Walker'), expected: 71.80 },
    { matchupId: 4, total: pointsFor(9, 'Patrick Mahomes') - pointsFor(5, 'Trevor Lawrence'), expected: 22.82 },
    { matchupId: 4, total: pointsFor(9, 'Courtland Sutton') + pointsFor(9, 'Jadarian Price'), expected: 10.50 },
    { matchupId: 1, total: pointsFor(7, 'Christian McCaffrey') + pointsFor(7, 'George Kittle'), expected: 40.60 },
    { matchupId: 6, total: pointsFor(11, 'Josh Allen') + pointsFor(11, 'Dalton Kincaid'), expected: 62.32 },
    { matchupId: 6, total: pointsFor(8, 'Drake Maye') + pointsFor(8, 'Saquon Barkley') + pointsFor(8, 'Colston Loveland'), expected: 12.32 },
  ];
  for (const example of cases) {
    expect(example.total).toBeCloseTo(example.expected, 2);
  }
  const thursday = currentMatchup(11).starters
    .filter(id => ['BUF', 'DET'].includes(players[id].team || ''))
    .reduce((sum, id) => sum + getStarter(11, id).points, 0);
  expect(thursday).toBeCloseTo(103.42, 2);
  expect(week2Recaps.find(row => row.matchupId === 6)!.summary).toContain(formatScore(thursday));
});

test('recap scorelines use closing scores and the Adams comeback math reconciles', () => {
  for (const recap of week2Recaps) {
    for (const rosterId of recap.teamIds) {
      expect(recap.summary).toContain(formatScore(getRecapTeam(rosterId).score));
    }
  }
  const adams = pointsFor(9, 'Davante Adams');
  const kyren = pointsFor(5, 'Kyren Williams');
  const taahaBeforeMonday = getRecapTeam(5).score - kyren;
  const adityaBeforeMonday = getRecapTeam(9).score - adams;
  const openingLead = taahaBeforeMonday - adityaBeforeMonday;
  const mondaySwing = adams - kyren;
  expect(openingLead).toBeCloseTo(14.38, 2);
  expect(mondaySwing).toBeCloseTo(26.80, 2);
  expect(mondaySwing - openingLead).toBeCloseTo(getRecapTeam(9).score - getRecapTeam(5).score, 2);
  const comeback = week2Recaps.find(row => row.matchupId === 4)!;
  expect(comeback.summary).toContain(formatScore(openingLead));
  expect(comeback.summary).toContain(formatScore(mondaySwing));
});

test('rankings cover every team once and movement is relative to the published Week 1 order', () => {
  expect(week2PowerRankings).toHaveLength(12);
  expect(week2PowerRankings.map(row => row.rosterId).sort((a, b) => a - b)).toEqual(rosterIds);
  expect(week2PowerRankings.map(row => row.previousRank).sort((a, b) => a - b))
    .toEqual(Array.from({ length: 12 }, (_, index) => index + 1));
  for (const ranking of week2PowerRankings) {
    expect(ranking.previousRank).toBe(week1PowerRankings.findIndex(row => row.rosterId === ranking.rosterId) + 1);
    expect(ranking.outlook.trim().split(/(?<=[.!?])\s+/)).toHaveLength(2);
    expect(ranking.outlook).toMatch(/[.!?]$/);
  }
});

test('season-outlook health concerns belong to current rosters, not dropped Week 2 players', () => {
  const concerns: Array<[number, string, RegExp]> = [
    [11, 'DJ Moore', /Moore/],
    [1, 'Rico Dowdle', /Dowdle/],
    [4, 'Caleb Williams', /Caleb/],
    [4, 'Jaxson Dart', /Dart/],
    [5, 'Jordan Mason', /Mason/],
    [3, 'Brock Bowers', /Bowers/],
    [3, 'Alec Pierce', /Pierce/],
    [7, 'Zay Flowers', /Flowers/],
    [7, 'Malik Nabers', /Nabers/],
    [2, 'Jayden Daniels', /Daniels/],
    [9, 'Nico Collins', /Collins/],
    [9, 'Dallas Goedert', /Goedert/],
    [8, 'Saquon Barkley', /Barkley/],
    [8, 'A.J. Brown', /Brown/],
    [12, 'Puka Nacua', /Puka/],
  ];
  for (const [rosterId, playerName, mention] of concerns) {
    const ownedId = getRecapTeam(rosterId).rosterPlayerIds.find(id => players[id].name === playerName);
    expect(ownedId).toBeDefined();
    expect(players[ownedId!].injuryStatus).not.toBeNull();
    expect(week2PowerRankings.find(row => row.rosterId === rosterId)!.outlook).toMatch(mention);
  }
  expect(week2PowerRankings.find(row => row.rosterId === 4)!.outlook).not.toMatch(/Jayden Reed/);
});

test('all six Week 3 previews follow the upcoming schedule and select a participating team', () => {
  expect(week3Previews).toHaveLength(6);
  expect(new Set(week3Previews.map(row => row.matchupId)).size).toBe(6);
  expect(week3Previews.flatMap(row => row.teamIds).sort((a, b) => a - b)).toEqual(rosterIds);
  for (const preview of week3Previews) {
    const sourcePair = recapSource.week3
      .filter(row => row.matchup_id === preview.matchupId)
      .map(row => row.roster_id).sort((a, b) => a - b);
    expect([...preview.teamIds].sort((a, b) => a - b)).toEqual(sourcePair);
    expect(preview.teamIds).toContain(preview.pickId);
  }
});
