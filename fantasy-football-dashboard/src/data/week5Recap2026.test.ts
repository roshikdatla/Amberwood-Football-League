import { recapSource, recapTeams, getRecapTeam, getStarter, formatScore, week5Recaps, week5PowerRankings, week6Previews, mickeyOfTheWeek } from './week5Recap2026';
import { week4PowerRankings } from './week4Recap2026';
type Result = { roster_id: number; matchup_id: number; points: number; custom_points: number | null; starters: string[]; starters_points: number[] };
const ids = Array.from({ length: 12 }, (_, i) => i + 1);
const score = (row: { points: number; custom_points: number | null }) => row.custom_points ?? row.points;

test('finality is independently established while lagged API standings are disclosed', () => {
  expect(recapSource.phase).toBe('final');
  expect(recapSource.league.season).toBe('2026');
  expect(recapSource.league.completedWeek).toBe(5);
  expect(recapSource.editorialContext.unplayedTeams).toEqual([]);
  expect(recapSource.editorialContext.finalitySource).toMatch(/fifteen.*complete/);
  expect(recapSource.editorialContext.finalitySource).toMatch(/standings still lag/);
  expect(Number.isNaN(Date.parse(recapSource.capturedAt))).toBe(false);
});

test('all six weeks have complete pairs and every completed lineup reconciles', () => {
  const weeks: Result[][] = [recapSource.week1, recapSource.week2, recapSource.week3, recapSource.week4, recapSource.week5, recapSource.week6];
  for (const [index, week] of Array.from(weeks.entries())) {
    expect(week.map(row => row.roster_id).sort((a,b) => a-b)).toEqual(ids);
    for (const row of week) {
      expect(week.filter(other => other.matchup_id === row.matchup_id)).toHaveLength(2);
      if (index < 5) {
        expect(row.starters).toHaveLength(10);
        expect(row.starters_points.reduce((a,b) => a+b, 0)).toBeCloseTo(row.points, 2);
      }
    }
  }
});

test('five-week reconstructed records agree with each displayed score and record', () => {
  expect(recapTeams).toHaveLength(12);
  for (const team of recapTeams) {
    const record = {wins:0, losses:0, ties:0};
    const weeks: Result[][] = [recapSource.week1, recapSource.week2, recapSource.week3, recapSource.week4, recapSource.week5];
    for (const week of weeks) {
      const row = week.find(x => x.roster_id === team.rosterId)!;
      const opp = week.find(x => x.matchup_id === row.matchup_id && x.roster_id !== row.roster_id)!;
      if (score(row)>score(opp)) record.wins++; else if (score(row)<score(opp)) record.losses++; else record.ties++;
    }
    expect(record).toEqual(team.recordThroughWeek5);
    expect(team.record).toBe(`${record.wins}–${record.losses}`);
    expect(team.score).toBe(score(recapSource.week5.find(x=>x.roster_id === team.rosterId)!));
  }
  expect(getRecapTeam(3).record).toBe('5–0');
  expect(getRecapTeam(2).record).toBe('1–4');
  expect(getRecapTeam(8).record).toBe('0–5');
});

test('six recaps use historical winning starters and the actual matchup pairs', () => {
  expect(week5Recaps.flatMap(x=>x.teamIds).sort((a,b)=>a-b)).toEqual(ids);
  for (const recap of week5Recaps) {
    expect([...recap.teamIds].sort((a,b)=>a-b)).toEqual(recapSource.week5.filter(x=>x.matchup_id===recap.matchupId).map(x=>x.roster_id).sort((a,b)=>a-b));
    const player = getStarter(recap.xFactorRosterId, recap.xFactorId);
    expect(recap.xFactor).toContain(formatScore(player.points));
    for (const id of recap.teamIds) expect(recap.summary).toContain(formatScore(getRecapTeam(id).score));
    expect(getRecapTeam(recap.xFactorRosterId).score).toBeGreaterThan(getRecapTeam(recap.teamIds.find(x=>x!==recap.xFactorRosterId)!).score);
  }
});

test('Mickey is the lowest-scoring actual winner, not the worst overall score', () => {
  const winners=recapSource.weeklyAllPlay.filter(x=>x.result==='win').sort((a,b)=>a.score-b.score);
  expect(winners[0].rosterId).toBe(mickeyOfTheWeek.rosterId);
  expect(winners[0].scoreRank).toBe(8);
  expect(winners[0].allPlayWins).toBe(4);
  expect(winners[0].allPlayLosses).toBe(7);
  expect(winners[0].opponentScoreRank).toBe(10);
});

test('Monday reconstruction reconciles every team and both comeback deficits', () => {
  for(const flow of recapSource.gameflow){
    expect(flow.beforeMonday+flow.mondayPoints).toBeCloseTo(flow.final,2);
    expect(flow.mondayPlayers.reduce((sum,p)=>sum+p.points,0)).toBeCloseTo(flow.mondayPoints,2);
    expect(flow.final).toBe(getRecapTeam(flow.rosterId).score);
  }
  const flow=(id:number)=>recapSource.gameflow.find(x=>x.rosterId===id)!;
  expect(flow(1).beforeMonday-flow(12).beforeMonday).toBeCloseTo(30.26,2);
  expect(flow(12).mondayPoints).toBe(39.7);
  expect(flow(4).beforeMonday-flow(9).beforeMonday).toBeCloseTo(76.94,2);
  expect(flow(9).mondayPoints).toBe(80.92);
  expect(flow(11).beforeMonday).toBe(51.7);
  expect(flow(11).mondayPlayers.map(x=>x.name)).toEqual(['Josh Allen','Dalton Kincaid']);
});

test('rank movement uses published Week 4 and every outlook is two sentences', () => {
  expect(week5PowerRankings.map(x=>x.rosterId).sort((a,b)=>a-b)).toEqual(ids);
  for(const ranking of week5PowerRankings){
    expect(ranking.previousRank).toBe(1+week4PowerRankings.findIndex(x=>x.rosterId===ranking.rosterId));
    expect(ranking.outlook.match(/[.!?](?=\s|$)/g)).toHaveLength(2);
  }
});

test('Week 6 predictions follow the real schedule and select only participating teams', () => {
  expect(week6Previews.flatMap(x=>x.teamIds).sort((a,b)=>a-b)).toEqual(ids);
  for(const preview of week6Previews){
    expect([...preview.teamIds].sort((a,b)=>a-b)).toEqual(recapSource.week6.filter(x=>x.matchup_id===preview.matchupId).map(x=>x.roster_id).sort((a,b)=>a-b));
    expect(preview.teamIds).toContain(preview.pickId);
  }
});


test('record audit preserves verified historical comparison and full scope', () => {
  expect(recapSource.recordAudit.scoredRowsChecked).toBe(924);
  expect(getRecapTeam(6).score).toBe(recapSource.recordAudit.highestScore);
  expect(recapSource.recordAudit.highestScore-recapSource.recordAudit.previousRecord).toBeCloseTo(7.84,2);
  expect(recapSource.recordAudit.previousRecordWeek).toBe(15);
});
