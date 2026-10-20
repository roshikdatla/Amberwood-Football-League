import { recapSource, recapTeams, getRecapTeam, getStarter, formatScore, week6Recaps, week6PowerRankings, week7Previews, mickeyOfTheWeek } from './week6Recap2026';
import { week5PowerRankings } from './week5Recap2026';
const ids = Array.from({ length: 12 }, (_, i) => i + 1);
const score = (row: {points:number;custom_points:number|null}) => row.custom_points ?? row.points;
type Result = {roster_id:number;matchup_id:number;points:number;custom_points:number|null;starters:string[];starters_points:number[]};
const weeks: Result[][] = [recapSource.week1,recapSource.week2,recapSource.week3,recapSource.week4,recapSource.week5,recapSource.week6];

test('Week 6 is final with complete, reconciled historical lineups',()=>{
 expect(recapSource.phase).toBe('final');
 expect(recapSource.league.season).toBe('2026');
 expect(recapSource.league.completedWeek).toBe(6);
 expect(recapSource.editorialContext.unplayedTeams).toEqual([]);
 expect(Number.isNaN(Date.parse(recapSource.capturedAt))).toBe(false);
 for(const week of [...weeks,recapSource.week7] as Result[][]){
  expect(week.map(r=>r.roster_id).sort((a,b)=>a-b)).toEqual(ids);
  for(const row of week) expect(week.filter(r=>r.matchup_id===row.matchup_id)).toHaveLength(2);
 }
 for(const week of weeks) for(const row of week){
  expect(row.starters).toHaveLength(10);
  expect(row.starters_points.reduce((a,b)=>a+b,0)).toBeCloseTo(row.points,2);
 }
});
test('records, points for and points against are rebuilt through six weeks',()=>{
 for(const team of recapTeams){
  let wins=0,losses=0,ties=0,pf=0,pa=0;
  for(const week of weeks){const row=week.find(r=>r.roster_id===team.rosterId)!;const opp=week.find(r=>r.matchup_id===row.matchup_id&&r.roster_id!==row.roster_id)!;
   const delta=score(row)-score(opp);if(delta>0)wins++;else if(delta<0)losses++;else ties++;pf+=score(row);pa+=score(opp);
  }
  expect(team.record).toBe(`${wins}–${losses}${ties?`–${ties}`:''}`);
  expect(team.pointsFor).toBeCloseTo(pf,2);expect(team.pointsAgainst).toBeCloseTo(pa,2);
 }
 expect(getRecapTeam(3).record).toBe('6–0');expect(getRecapTeam(8).record).toBe('0–6');
});
test('six recaps have real pairings and winning X-factors',()=>{
 expect(week6Recaps.flatMap(r=>r.teamIds).sort((a,b)=>a-b)).toEqual(ids);
 for(const recap of week6Recaps){
  expect([...recap.teamIds].sort((a,b)=>a-b)).toEqual(recapSource.week6.filter(r=>r.matchup_id===recap.matchupId).map(r=>r.roster_id).sort((a,b)=>a-b));
  const star=getStarter(recap.xFactorRosterId,recap.xFactorId);expect(recap.xFactor).toContain(formatScore(star.points));
  for(const id of recap.teamIds) expect(recap.summary).toContain(formatScore(getRecapTeam(id).score));
  expect(getRecapTeam(recap.xFactorRosterId).score).toBeGreaterThan(getRecapTeam(recap.teamIds.find(id=>id!==recap.xFactorRosterId)!).score);
 }
});
test('Mickey is the lowest-scoring actual winner and ranks reconcile',()=>{
 const rows=recapSource.week6;const winners=rows.filter(r=>score(r)>score(rows.find(x=>x.matchup_id===r.matchup_id&&x.roster_id!==r.roster_id)!)).sort((a,b)=>score(a)-score(b));
 expect(winners[0].roster_id).toBe(mickeyOfTheWeek.rosterId);
 const value=score(winners[0]);expect(mickeyOfTheWeek.allPlayWins).toBe(rows.filter(r=>score(r)<value).length);expect(mickeyOfTheWeek.allPlayLosses).toBe(rows.filter(r=>score(r)>value).length);
 expect(mickeyOfTheWeek.scoreRank).toBe(1+mickeyOfTheWeek.allPlayLosses);
 expect(mickeyOfTheWeek.rosterId).toBe(3);
});
test('rankings have twelve two-sentence outlooks and moves from Week 5',()=>{
 expect(week6PowerRankings.map(r=>r.rosterId).sort((a,b)=>a-b)).toEqual(ids);
 for(const ranking of week6PowerRankings){expect(ranking.previousRank).toBe(1+week5PowerRankings.findIndex(r=>r.rosterId===ranking.rosterId));expect(ranking.outlook.match(/[.!?](?=\s|$)/g)).toHaveLength(2);}
});
test('Week 7 previews use actual pairings and picks belong to those matchups',()=>{
 expect(week7Previews.flatMap(r=>r.teamIds).sort((a,b)=>a-b)).toEqual(ids);
 for(const p of week7Previews){expect([...p.teamIds].sort((a,b)=>a-b)).toEqual(recapSource.week7.filter(r=>r.matchup_id===p.matchupId).map(r=>r.roster_id).sort((a,b)=>a-b));expect(p.teamIds).toContain(p.pickId);}
});
test('all reconstructed game windows and three Monday reversals reconcile',()=>{
 for(const row of recapSource.gameflow){expect(row.beforeMonday+row.mondayPoints).toBeCloseTo(row.final,2);expect(row.final).toBe(getRecapTeam(row.rosterId).score);expect((row.mondayPlayers as {points:number}[]).reduce((sum,p)=>sum+p.points,0)).toBeCloseTo(row.mondayPoints,2);}
 const flow=(id:number)=>recapSource.gameflow.find(r=>r.rosterId===id)!;
 expect(flow(11).beforeMonday-flow(7).beforeMonday).toBeCloseTo(47.90,2);expect(flow(7).mondayPoints).toBeCloseTo(69.60,2);
 expect(flow(5).beforeMonday-flow(10).beforeMonday).toBeCloseTo(.38,2);
 expect(flow(6).beforeMonday-flow(2).beforeMonday).toBeCloseTo(14.92,2);
});
