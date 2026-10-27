import { recapSource, recapTeams, getRecapTeam, getStarter, formatScore, week7Recaps, week7PowerRankings, week8Previews, mickeyOfTheWeek, playoffPicture } from './week7Recap2026';
import { week6PowerRankings } from './week6Recap2026';
const ids = Array.from({length:12},(_,i)=>i+1);
const score=(r:{points:number;custom_points:number|null})=>r.custom_points??r.points;
const weeks=[recapSource.week1,recapSource.week2,recapSource.week3,recapSource.week4,recapSource.week5,recapSource.week6,recapSource.week7];
test('final Week 7 snapshot has complete reconciled lineups and no unplayed games',()=>{
 expect(recapSource.phase).toBe('final');expect(recapSource.league.completedWeek).toBe(7);expect(recapSource.editorialContext.unplayedTeams).toEqual([]);
 for(const week of [...weeks,recapSource.week8]){expect(week.map(r=>r.roster_id).sort((a,b)=>a-b)).toEqual(ids);for(const row of week)expect(week.filter(r=>r.matchup_id===row.matchup_id)).toHaveLength(2);}
 for(const row of recapSource.week7){expect(row.starters).toHaveLength(10);expect(row.starters_points.reduce((a,b)=>a+b,0)).toBeCloseTo(row.points,2);}
});
test('all records and PF PA rebuilt through seven weeks',()=>{
 for(const team of recapTeams){let wins=0,losses=0,ties=0,pf=0,pa=0;for(const week of weeks){const r=week.find(x=>x.roster_id===team.rosterId)!;const o=week.find(x=>x.matchup_id===r.matchup_id&&x.roster_id!==r.roster_id)!;const d=score(r)-score(o);if(d>0)wins++;else if(d<0)losses++;else ties++;pf+=score(r);pa+=score(o);}expect(team.record).toBe(`${wins}–${losses}${ties?`–${ties}`:''}`);expect(team.pointsFor).toBeCloseTo(pf,2);expect(team.pointsAgainst).toBeCloseTo(pa,2);}
 expect(getRecapTeam(3).record).toBe('7–0');expect(getRecapTeam(8).record).toBe('0–7');
});
test('six historical pairings and winning X-factors match final scores',()=>{
 expect(week7Recaps.flatMap(r=>r.teamIds).sort((a,b)=>a-b)).toEqual(ids);
 for(const r of week7Recaps){expect([...r.teamIds].sort((a,b)=>a-b)).toEqual(recapSource.week7.filter(x=>x.matchup_id===r.matchupId).map(x=>x.roster_id).sort((a,b)=>a-b));const star=getStarter(r.xFactorRosterId,r.xFactorId);expect(r.xFactor).toContain(formatScore(star.points));for(const id of r.teamIds)expect(r.summary).toContain(formatScore(getRecapTeam(id).score));expect(getRecapTeam(r.xFactorRosterId).score).toBeGreaterThan(getRecapTeam(r.teamIds.find(id=>id!==r.xFactorRosterId)!).score);}
});
test('Mickey and weekly scoring ranks reconcile',()=>{
 const rows=recapSource.week7;const winners=rows.filter(r=>score(r)>score(rows.find(x=>x.matchup_id===r.matchup_id&&x.roster_id!==r.roster_id)!)).sort((a,b)=>score(a)-score(b));
 expect(winners[0].roster_id).toBe(1);expect(mickeyOfTheWeek.rosterId).toBe(1);const v=score(winners[0]);expect(mickeyOfTheWeek.allPlayWins).toBe(rows.filter(r=>score(r)<v).length);expect(mickeyOfTheWeek.allPlayLosses).toBe(rows.filter(r=>score(r)>v).length);expect(mickeyOfTheWeek.scoreRank).toBe(8);expect(getRecapTeam(7).score).toBe(177.98);
});
test('preweek top six all won and five-record-plus-points playoff math is exact',()=>{
 const s=recapSource.playoffStandings;const pre=s.through6.slice(0,6).map(r=>r.rosterId).sort((a,b)=>a-b);const winners=recapSource.week7.filter(r=>score(r)>score(recapSource.week7.find(o=>o.matchup_id===r.matchup_id&&o.roster_id!==r.roster_id)!)).map(r=>r.roster_id).sort((a,b)=>a-b);expect(pre).toEqual(winners);
 const sorted=[...recapTeams].sort((a,b)=>b.recordThroughWeek7.wins-a.recordThroughWeek7.wins||b.pointsFor-a.pointsFor);expect(sorted.slice(0,5).map(t=>t.rosterId)).toEqual([3,12,7,1,4]);const outside=sorted.slice(5).sort((a,b)=>b.pointsFor-a.pointsFor);expect(outside[0].rosterId).toBe(5);expect(sorted[5].rosterId).toBe(10);expect(getRecapTeam(4).pointsFor-getRecapTeam(10).pointsFor).toBeCloseTo(8.26,2);expect(getRecapTeam(5).pointsFor-getRecapTeam(6).pointsFor).toBeCloseTo(86.92,2);expect(getRecapTeam(5).pointsFor-getRecapTeam(10).pointsFor).toBeCloseTo(89.30,2);expect(playoffPicture.paragraphs.join(' ')).toContain('not an automatic playoff seat');
});
test('twelve outlooks have correct movements from Week 6 and two sentences',()=>{expect(week7PowerRankings.map(r=>r.rosterId).sort((a,b)=>a-b)).toEqual(ids);for(const r of week7PowerRankings){expect(r.previousRank).toBe(1+week6PowerRankings.findIndex(x=>x.rosterId===r.rosterId));expect(r.outlook.match(/[.!?](?=\s|$)/g)).toHaveLength(2);}});
test('six Week 8 forecasts match actual scheduled pairs',()=>{expect(week8Previews.flatMap(r=>r.teamIds).sort((a,b)=>a-b)).toEqual(ids);for(const p of week8Previews){expect([...p.teamIds].sort((a,b)=>a-b)).toEqual(recapSource.week8.filter(r=>r.matchup_id===p.matchupId).map(r=>r.roster_id).sort((a,b)=>a-b));expect(p.teamIds).toContain(p.pickId);}});
test('gameflow reconciles and Monday changed no matchup winners',()=>{for(const r of recapSource.gameflow){expect(r.beforeMonday+r.mondayPoints).toBeCloseTo(r.final,2);expect(r.final).toBe(getRecapTeam(r.rosterId).score);const o=recapSource.gameflow.find(x=>x.matchupId===r.matchupId&&x.rosterId!==r.rosterId)!;expect(Math.sign(r.beforeMonday-o.beforeMonday)).toBe(Math.sign(r.final-o.final));}});
test('published snapshot is minimized, with no private owner/account identifiers',()=>{expect(JSON.stringify(recapSource)).not.toMatch(/"(?:owner_id|user_id|email|avatar|phone|co_owners)"/);});
