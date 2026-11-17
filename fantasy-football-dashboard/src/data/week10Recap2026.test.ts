import snapshot from './week10Recap2026Snapshot.json';
import {recapTeams, week10Recaps, week11Previews, mickeyOfTheWeek, getStarter} from './week10Recap2026';
import {restOfSeasonPreview} from './week10RestOfSeason';
test('scores records and X-factors come from actual final starters',()=>{expect(snapshot.league.completedWeek).toBe(10);for(const t of recapTeams){const row=snapshot.week10.find(r=>r.roster_id===t.rosterId)!;expect(t.score).toBe(row.custom_points??row.points);expect(row.starters_points.reduce((a,b)=>a+b,0)).toBeCloseTo(t.score,2);}for(const recap of week10Recaps){const row=snapshot.week10.find(r=>r.roster_id===recap.xFactorRosterId)!;const i=row.starters.indexOf(recap.xFactorId);expect(i).toBeGreaterThanOrEqual(0);expect(getStarter(row.roster_id,recap.xFactorId).points).toBe(row.starters_points[i]);}});
test('all recap and next-week pairings match source',()=>{for(const [cards,rows] of [[week10Recaps,snapshot.week10],[week11Previews,snapshot.week11]] as const){expect(cards).toHaveLength(6);for(const c of cards){expect(c.teamIds.slice().sort()).toEqual((rows as {matchup_id:number;roster_id:number}[]).filter(r=>r.matchup_id===c.matchupId).map(r=>r.roster_id).sort());}}});
test('Mickey is the actual lowest scoring winner',()=>{expect(mickeyOfTheWeek.rosterId).toBe(snapshot.mickeyOfTheWeek.rosterId);expect(mickeyOfTheWeek.scoreRank).toBe(snapshot.mickeyOfTheWeek.scoreRank);expect(mickeyOfTheWeek.allPlayWins).toBe(snapshot.mickeyOfTheWeek.allPlayWins);});
test('remaining schedules are reciprocal with twelve unique teams',()=>{expect(new Set(restOfSeasonPreview.map(x=>x.rosterId)).size).toBe(12);for(const t of restOfSeasonPreview){expect(t.schedule.map(g=>g.week)).toEqual([11,12,13,14]);for(const g of t.schedule){expect(restOfSeasonPreview.find(x=>x.rosterId===g.opponentId)!.schedule.find(x=>x.week===g.week)!.opponentId).toBe(t.rosterId);}}});

test('each matchup has a brief forecast and an explicit critical-game decision',()=>{
  for(const t of restOfSeasonPreview){for(const g of t.schedule){
    expect(['Favorable','Even','Tough']).toContain(g.difficulty);
    expect(typeof g.critical).toBe('boolean');
    expect(g.preview.split(/\s+/).length).toBeGreaterThan(20);
    expect(g.preview.split(/\s+/).length).toBeLessThanOrEqual(55);
  }expect(t.schedule[1].preview).toMatch(/No byes/i);}
});
test('evening roster moves inform future previews without rewriting historical starters',()=>{
  const ankith=restOfSeasonPreview.find(x=>x.rosterId===4)!;
  expect(ankith.schedule[0].preview).toContain('Loveland');
  expect(ankith.schedule[0].preview).not.toContain('Kraft');
  expect(ankith.schedule[2].preview).toContain('Stevenson');
  const pj=restOfSeasonPreview.find(x=>x.rosterId===12)!;
  expect(pj.schedule[2].preview).toContain('no reserve TE');
  expect(pj.schedule[2].preview).not.toContain('Higbee');
  expect(restOfSeasonPreview.find(x=>x.rosterId===8)!.schedule[0].preview).toContain('Egbuka');
  expect(restOfSeasonPreview.find(x=>x.rosterId===5)!.schedule[0].preview).toContain('no TE');
});
