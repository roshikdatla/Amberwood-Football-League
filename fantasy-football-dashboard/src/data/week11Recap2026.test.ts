import snapshot from './week11Recap2026Snapshot.json';
import { week10PowerRankings } from './week10Recap2026';
import {
  recapTeams, getStarter, week11Recaps, week11PowerRankings,
  week12Previews, mickeyOfTheWeek,
} from './week11Recap2026';

test('Week 11 is complete and scores, records and season totals match the captured results', () => {
  expect(snapshot.league.completedWeek).toBeGreaterThanOrEqual(11);
  expect(snapshot.phase).toBe('final');
  expect(recapTeams).toHaveLength(12);
  expect(new Set(recapTeams.map(team => team.rosterId)).size).toBe(12);
  const weeks = Array.from({ length: 11 }, (_, index) =>
    (snapshot as unknown as Record<string, { roster_id: number; matchup_id: number; points: number; custom_points: number | null }[]>)[`week${index + 1}`]);
  recapTeams.forEach(team => {
    const row = snapshot.week11.find(result => result.roster_id === team.rosterId)!;
    expect(team.score).toBe(row.custom_points ?? row.points);
    if (row.custom_points === null) expect(row.starters_points.reduce((sum, points) => sum + points, 0)).toBeCloseTo(team.score, 2);
    const record = { wins: 0, losses: 0, ties: 0 };
    let pointsFor = 0;
    weeks.forEach(week => {
      const result = week.find(item => item.roster_id === team.rosterId)!;
      const opponent = week.find(item => item.matchup_id === result.matchup_id && item.roster_id !== team.rosterId)!;
      const score = result.custom_points ?? result.points;
      const opposingScore = opponent.custom_points ?? opponent.points;
      pointsFor += score;
      if (score > opposingScore) record.wins++;
      else if (score < opposingScore) record.losses++;
      else record.ties++;
    });
    expect(team.record).toBe(`${record.wins}–${record.losses}${record.ties ? `–${record.ties}` : ''}`);
    expect(team.pointsFor).toBeCloseTo(pointsFor, 2);
  });
});

test('all six recaps and previews cover the exact Sleeper schedule once', () => {
  const rounds: { cards: { matchupId: number; teamIds: number[] }[]; rows: { matchup_id: number; roster_id: number }[] }[] = [
    { cards: week11Recaps, rows: snapshot.week11 },
    { cards: week12Previews, rows: snapshot.week12 },
  ];
  rounds.forEach(({ cards, rows }) => {
    expect(cards).toHaveLength(6);
    expect(new Set(cards.flatMap(card => card.teamIds)).size).toBe(12);
    cards.forEach(card => {
      expect([...card.teamIds].sort((a, b) => a - b)).toEqual(rows.filter(row => row.matchup_id === card.matchupId).map(row => row.roster_id).sort((a, b) => a - b));
    });
  });
  week12Previews.forEach(preview => expect(preview.teamIds).toContain(preview.pickId));
});

test('every X-factor was an actual starter for the winning team', () => {
  week11Recaps.forEach(recap => {
    expect(recap.teamIds).toContain(recap.xFactorRosterId);
    const row = snapshot.week11.find(result => result.roster_id === recap.xFactorRosterId)!;
    const opponent = snapshot.week11.find(result => result.matchup_id === recap.matchupId && result.roster_id !== recap.xFactorRosterId)!;
    expect(row.custom_points ?? row.points).toBeGreaterThan(opponent.custom_points ?? opponent.points);
    const index = row.starters.indexOf(recap.xFactorId);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(getStarter(recap.xFactorRosterId, recap.xFactorId).points).toBe(row.starters_points[index]);
  });
});

test('Mickey is the lowest-scoring actual winner with independently calculated all-play numbers', () => {
  const winners = snapshot.week11.filter(row => {
    const opponent = snapshot.week11.find(other => other.matchup_id === row.matchup_id && other.roster_id !== row.roster_id)!;
    return (row.custom_points ?? row.points) > (opponent.custom_points ?? opponent.points);
  }).sort((a, b) => (a.custom_points ?? a.points) - (b.custom_points ?? b.points));
  const winner = winners[0];
  expect(mickeyOfTheWeek.rosterId).toBe(winner.roster_id);
  const score = winner.custom_points ?? winner.points;
  const others = snapshot.week11.filter(row => row.roster_id !== winner.roster_id);
  const losses = others.filter(row => (row.custom_points ?? row.points) > score).length;
  expect(mickeyOfTheWeek.allPlayWins).toBe(others.filter(row => (row.custom_points ?? row.points) < score).length);
  expect(mickeyOfTheWeek.allPlayLosses).toBe(losses);
  expect(mickeyOfTheWeek.scoreRank).toBe(losses + 1);
  const opponent = others.find(row => row.matchup_id === winner.matchup_id)!;
  expect(mickeyOfTheWeek.opponentRank).toBe(1 + snapshot.week11.filter(row => (row.custom_points ?? row.points) > (opponent.custom_points ?? opponent.points)).length);
});

test('rank movement uses the published Week 10 board and each outlook has two sentences', () => {
  expect(week11PowerRankings).toHaveLength(12);
  expect(new Set(week11PowerRankings.map(team => team.rosterId)).size).toBe(12);
  week11PowerRankings.forEach(team => {
    expect(team.previousRank).toBe(week10PowerRankings.findIndex(previous => previous.rosterId === team.rosterId) + 1);
    const sentences = team.outlook.match(/[^.!?]+[.!?](?:\s|$)/g) || [];
    expect(sentences).toHaveLength(2);
  });
});
