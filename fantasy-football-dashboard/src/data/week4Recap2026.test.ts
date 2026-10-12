import {
  editionStatus,
  formatScore,
  getRecapTeam,
  getStarter,
  mickeyOfTheWeek,
  recapSource,
  recapTeams,
  week4PowerRankings,
  week4Recaps,
  week5Previews,
} from './week4Recap2026';
import gameflow from './week4Recap2026Gameflow.json';
import { week3PowerRankings } from './week3Recap2026';

type Result = { roster_id: number; matchup_id: number; points: number; custom_points: number | null };
type Player = { name: string; team: string | null; injuryStatus: string | null; injuryBodyPart: string | null };
const players = recapSource.players as Record<string, Player>;
const rosterIds = recapSource.teams.map(team => team.rosterId).sort((a, b) => a - b);
const score = (row: Result) => row.custom_points ?? row.points;
const currentMatchup = (id: number) => recapSource.week4.find(row => row.roster_id === id)!;
const actualWinners = recapSource.week4.filter(row => {
  const opponent = recapSource.week4.find(other => other.matchup_id === row.matchup_id && other.roster_id !== row.roster_id)!;
  return score(row) > score(opponent);
});

test('Week 4 is independently confirmed final with a dated source and Week 5 preview', () => {
  expect(editionStatus).toBe('final');
  expect(recapSource.phase).toBe('final');
  expect(recapSource.league.season).toBe('2026');
  expect(recapSource.league.completedWeek).toBeGreaterThanOrEqual(4);
  expect(Number.isNaN(Date.parse(recapSource.capturedAt))).toBe(false);
  expect(recapSource.editorialContext.recapWeek).toBe(4);
  expect(recapSource.editorialContext.previewWeek).toBe(5);
  expect(recapSource.editorialContext.unplayedTeams).toEqual([]);
  expect(recapSource.sources.week4.endsWith('/matchups/4')).toBe(true);
});

test('all source weeks have twelve unique rosters and six complete schedule pairs', () => {
  const weeks: Result[][] = [recapSource.week1, recapSource.week2, recapSource.week3, recapSource.week4, recapSource.week5];
  expect(rosterIds).toEqual(Array.from({ length: 12 }, (_, index) => index + 1));
  for (const week of weeks) {
    expect(week.map(row => row.roster_id).sort((a, b) => a - b)).toEqual(rosterIds);
    const matchups = Array.from(new Set(week.map(row => row.matchup_id)));
    expect(matchups).toHaveLength(6);
    for (const id of matchups) expect(week.filter(row => row.matchup_id === id)).toHaveLength(2);
  }
});

test('each recap covers the real Week 4 pair and gives its X-factor to a winning historical starter', () => {
  expect(week4Recaps).toHaveLength(6);
  expect(week4Recaps.flatMap(row => row.teamIds).sort((a, b) => a - b)).toEqual(rosterIds);
  expect(new Set(week4Recaps.map(row => row.matchupId)).size).toBe(6);
  for (const recap of week4Recaps) {
    const pair = recapSource.week4.filter(row => row.matchup_id === recap.matchupId).map(row => row.roster_id);
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

test('all completed starter totals reconcile and displayed Week 4 scores match the snapshot', () => {
  expect(recapTeams).toHaveLength(12);
  for (const week of [recapSource.week1, recapSource.week2, recapSource.week3, recapSource.week4]) {
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
  for (const row of recapSource.week4) {
    expect(getRecapTeam(row.roster_id).score).toBe(score(row));
    expect(getRecapTeam(row.roster_id).matchupId).toBe(row.matchup_id);
  }
});

test('season records are calculated from four finalized weeks and agree with the API standings', () => {
  const weeks: Result[][] = [recapSource.week1, recapSource.week2, recapSource.week3, recapSource.week4];
  for (const team of recapTeams) {
    const record = { wins: 0, losses: 0, ties: 0 };
    for (const week of weeks) {
      const row = week.find(result => result.roster_id === team.rosterId)!;
      const opponent = week.find(result => result.matchup_id === row.matchup_id && result.roster_id !== team.rosterId)!;
      if (score(row) > score(opponent)) record.wins += 1;
      else if (score(row) < score(opponent)) record.losses += 1;
      else record.ties += 1;
    }
    expect(record).toEqual(team.recordThroughWeek4);
    expect(record.wins + record.losses + record.ties).toBe(4);
    expect(team.record).toBe(`${record.wins}–${record.losses}${record.ties ? `–${record.ties}` : ''}`);
    if (recapSource.league.completedWeek === 4) {
      expect([team.wins, team.losses, team.ties]).toEqual([record.wins, record.losses, record.ties]);
    }
  }

});

test('all-play records, score ranks and opponent softness are independently reproducible', () => {
  expect(recapSource.weeklyAllPlay).toHaveLength(12);
  for (const row of recapSource.week4) {
    const others = recapSource.week4.filter(other => other.roster_id !== row.roster_id);
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
    expect(result.opponentScoreRank).toBe(1 + recapSource.week4.filter(other => score(other) > score(opponent)).length);
    expect(result.margin).toBeCloseTo(score(row) - score(opponent), 2);
    expect(result.expectedWinShare).toBeCloseTo((wins + 0.5 * ties) / 11, 8);
  }
  expect(recapSource.weeklyAllPlay.reduce((sum, row) => sum + row.allPlayWins, 0)).toBe(66);
});

test('Mickey is independently the lowest-scoring winner, with the correct all-play context', () => {
  const lowestWinner = [...actualWinners].sort((a, b) => score(a) - score(b))[0];
  const sorted = recapSource.week4.map(score).sort((a, b) => a - b);
  const median = (sorted[5] + sorted[6]) / 2;
  expect(actualWinners).toHaveLength(6);
  expect(mickeyOfTheWeek.rosterId).toBe(lowestWinner.roster_id);
  expect(mickeyOfTheWeek.rosterId).toBe(9);
  expect(mickeyOfTheWeek.allPlayWins).toBe(4);
  expect(mickeyOfTheWeek.allPlayLosses).toBe(7);
  expect(mickeyOfTheWeek.scoreRank).toBe(8);
  expect(mickeyOfTheWeek.opponentRank).toBe(9);
  expect(median).toBeCloseTo(133.33, 2);
  expect(recapSource.mickeyOfTheWeek.leagueMedian).toBeCloseTo(median, 2);
  expect(actualWinners.filter(row => score(row) < median).map(row => row.roster_id).sort((a, b) => a - b)).toEqual([1, 9]);
  expect(mickeyOfTheWeek.summary).toContain('120.50');
  expect(mickeyOfTheWeek.summary).toContain('118.66');
});

test('all twelve power rankings have two-sentence outlooks and movement from the current published Week 3 order', () => {
  expect(week3PowerRankings[0].rosterId).toBe(1);
  expect(week3PowerRankings[1].rosterId).toBe(3);
  expect(week4PowerRankings).toHaveLength(12);
  expect(week4PowerRankings.map(row => row.rosterId).sort((a, b) => a - b)).toEqual(rosterIds);
  for (const ranking of week4PowerRankings) {
    expect(ranking.previousRank).toBe(week3PowerRankings.findIndex(row => row.rosterId === ranking.rosterId) + 1);
    expect(ranking.outlook.trim().split(/(?<=[.!?])\s+/)).toHaveLength(2);
    expect(ranking.outlook).toMatch(/[.!?]$/);
  }
});

test('Week 5 previews cover the real schedule once and select a participating roster', () => {
  expect(week5Previews).toHaveLength(6);
  expect(new Set(week5Previews.map(row => row.matchupId)).size).toBe(6);
  expect(week5Previews.flatMap(row => row.teamIds).sort((a, b) => a - b)).toEqual(rosterIds);
  for (const preview of week5Previews) {
    const source = recapSource.week5.filter(row => row.matchup_id === preview.matchupId).map(row => row.roster_id);
    expect([...preview.teamIds].sort((a, b) => a - b)).toEqual(source.sort((a, b) => a - b));
    expect(preview.teamIds).toContain(preview.pickId);
  }
});


test('game-window reconstruction includes each historical starter exactly once and reconciles final totals', () => {
  expect(gameflow.source).toMatch(/^https:\/\/fantasy-www\.nfl\.com\//);
  expect(gameflow.teams.map(team => team.rosterId).sort((a, b) => a - b)).toEqual(rosterIds);
  for (const team of gameflow.teams) {
    const result = currentMatchup(team.rosterId);
    expect(team.matchupId).toBe(result.matchup_id);
    let cumulative = 0;
    const names: string[] = [];
    for (const window of team.windows) {
      expect(window.players.reduce((sum, player) => sum + Number(player[1]), 0)).toBeCloseTo(window.points, 2);
      cumulative += window.points;
      expect(window.cumulative).toBeCloseTo(cumulative, 2);
      for (const player of window.players) {
        const name = String(player[0]);
        names.push(name);
        const playerId = result.starters.find(id => players[id].name === name)!;
        expect(playerId).toBeDefined();
        expect(result.starters_points[result.starters.indexOf(playerId)]).toBe(Number(player[1]));
      }
    }
    expect([...names].sort()).toEqual(result.starters.map(id => players[id].name).sort());
    expect(cumulative).toBeCloseTo(score(result), 2);
  }
});

test('Monday comeback and Sunday-night finish retain the independently verified game-window totals', () => {
  const beforeMonday = (id: number) => gameflow.teams.find(team => team.rosterId === id)!.windows.find(window => window.window === 'SNF')!.cumulative;
  expect(beforeMonday(3)).toBe(112.68);
  expect(beforeMonday(12)).toBe(138.52);
  expect(score(currentMatchup(3)) - beforeMonday(3)).toBeCloseTo(52.80, 2);
  expect(score(currentMatchup(12)) - beforeMonday(12)).toBeCloseTo(17.40, 2);
  expect(gameflow.teams.find(team => team.rosterId === 8)!.windows.find(window => window.window === 'Sun late')!.cumulative).toBe(97.20);
  expect(score(currentMatchup(8))).toBe(118.66);
  expect(score(currentMatchup(9))).toBe(120.50);
});

test('pregame editorial sources exclude known post-kickoff injury reports and capture-time roster claims', () => {
  const sources = [...week4Recaps, ...week4PowerRankings, ...week5Previews].flatMap(item => item.sources || []);
  const labelsAndUrls = sources.map(source => `${source.label} ${source.url}`).join('\n');
  expect(labelsAndUrls).not.toMatch(/October 1[012]|captured October 12|notable-injuries-news-sunday-week-5|all-15-games/i);
  const outlooks = week4PowerRankings.map(item => item.outlook).join('\n');
  expect(outlooks).not.toMatch(/Week 5 concussion|Deebo.{0,60}hamstring|current backup Cousins|Sadiq pickup/i);
});
