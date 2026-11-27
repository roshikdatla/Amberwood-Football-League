import snapshot from './week12Recap2026Snapshot.json';

export const issue = snapshot;
export const isFinal = issue.completedWeek >= 12;
export const score = (n: number) => n.toFixed(2);
const managers = ['Anudeep','Abhishek','Roshik','Ankith','Taaha','Sahil','Pranav P','Sahit','Aditya','Abhiram','Gary & Naveen','Pranav J'];
export const teams = issue.teams.map(t => ({ ...t, manager: managers[t.id - 1], record: `${t.wins}–${t.losses}${t.ties ? `–${t.ties}` : ''}` }));
export const team = (id: number) => teams.find(t => t.id === id)!;
export const standings = [...teams].sort((a,b) => b.wins - a.wins || b.ties - a.ties || b.pf - a.pf);
export const wildcard = standings.slice(5).sort((a,b) => b.pf - a.pf);
export const mickey = isFinal ? [...teams].filter(t => t.points > teams.find(o => o.matchupId === t.matchupId && o.id !== t.id)!.points).sort((a,b) => a.points - b.points)[0] : undefined;
export const ranked = [1,12,7,6,4,5,3,9,10,2,11,8];
export const outlooks: Record<number, string> = {
  1: 'Gibbs gives Jahmyrica the biggest single-player ceiling on the board. The bye race runs through Abhiram and Pranav P; Week 14 takes Javonte Williams and Jeremiyah Love out of the lineup pool.',
  12: 'DeVonta Smith and CeeDee Lamb gave the Koopa Troopa a Thanksgiving head start. The Week 13 edge is facing a thin Ankith backfield, but Tyler Warren sits then and Lamb sits in Week 14.',
  7: 'McCaffrey and Kittle can erase a lot of runway. The next two opponents are Sahil and Anudeep, and missing Zay Flowers in Week 13 makes the first game less comfortable.',
  6: 'Dak and company are fighting on the points side of the bracket. Garrett Wilson and Derrick Henry sit in Week 13; Dak and George Pickens then sit in Week 14. Check the depth chart before printing the boarding passes.',
  4: 'The bank has the inside track to a record seed entering Week 12, but both starting RBs are on bye against Pranav J. Colston Loveland’s Thanksgiving knee exit makes tight end another spot to check.',
  5: 'Kyren put up 16.50 before Thanksgiving even started. The points wildcard is the clearest playoff route, and Week 14 against GarVeen might matter every bit as much for consolation seeding.',
  3: 'Bijan and a 7–4 starting record keep the Garden in the race. The Week 13 menu is missing all three rostered tight ends from the Raiders and Jets, plus Adonai Mitchell.',
  9: 'Mahomes and Cook ordinarily give Aditya two strong anchors, but their Thanksgiving lines went in opposite directions. Week 13’s clean bye sheet is helpful; Week 14 brings another wildcard contender in Sahil.',
  10: 'McBride is the linchpin. The path runs through Aditya now, then Anudeep, then a Week 14 Garden matchup without McBride. That is stiff opposition with very little room for a quiet Sunday.',
  2: 'Rome Odunze supplied the early spark. Abhishek has no rostered Week 13 or 14 bye players at the snapshot, a useful edge against Roshik and then Ankith.',
  11: 'Corum and St. Brown gave GarVeen real Thanksgiving points. Losing Taylor for the Week 13 Sahit matchup makes that direct fight more difficult; Week 14 against Taaha offers another chance to escape the bottom two.',
  8: 'Sahit’s path out of the basement runs through other teams in the same fight. Week 13 also takes away Anthony Richardson and Spencer Shrader, so a quarterback and kicker need checking.',
};
export const cards = [
  {title:'DeVonta takes the parade route', x:'DeVonta Smith', lead:'Pranav J opened the Pranav Bowl with Smith’s 49.00, Swift’s 29.20 and Lamb’s 22.40. That trio alone hit triple digits. Pranav P still has McCaffrey, Kittle and most of the lineup to play.', low:'Brandon Aubrey put up 8.90. A perfectly respectable shift for a kicker, a deeply unreasonable assignment for an entire Thanksgiving offense.'},
  {title:'The Garden is still taking orders', x:'Kyren Williams', lead:'Kyren Williams and Christian Watson canceled each other out at 16.50 apiece. Taaha’s early edge came from getting more points elsewhere, with Bijan and JSN both still to come.', low:'The Packers D/ST brought Taaha 3.00. The defense’s contribution to Burden of Proof was mostly a request for an extension.'},
  {title:'Gibbs brought the whole carving knife', x:'Jahmyr Gibbs', lead:'Gibbs went for 53.70 with three rushing touchdowns. Javonte’s 35.30 made it 89.00 from Anudeep’s starting RBs alone. Dak Prescott and Emmett Johnson countered with 45.14 combined for Sahil.', low:'Matthew Golden finished at 4.90. On a board with 53.70 next to Gibbs, the Golden hour was closer to a commercial break.'},
  {title:'Corum and Odunze trade fireworks', x:'Blake Corum', lead:'Blake Corum (30.50) and Amon-Ra St. Brown (23.60) started GarVeen strong. Rome Odunze answered with 27.20 and both late Chicago touchdowns. This one has lower-table consequences and a lot of football left.', low:'Josh Allen’s 3.54 and Rashee Rice’s 3.90 gave both sides something to complain about. The Allen–Rice takeaway: the two combined for less than one ordinary flex shift.'},
  {title:'The trade receipts are on the desk', x:'Caleb Williams', lead:'Caleb Williams posted 24.30, but the live gap is only 2.50. The November trade put Colston Loveland on Ankith’s side and Tucker Kraft across the aisle; Kraft scored 3.40 and Loveland left with a knee injury.', low:'Saquon Barkley’s 0.70 came in an injury-shortened outing. Sleeper has Loveland at −0.50. Neither side got what it ordered from its Thanksgiving marquee names.'},
  {title:'Cook clocks in; the kitchen waits', x:'James Cook III', lead:'James Cook III supplied 21.50 for Aditya. Jameson Williams put up 14.00 for Abhiram, who still has most of his starters pending. Both entered 6–5: the winner gets real breathing room.', low:'Patrick Mahomes scored 5.16 and Dallas Goedert scored 1.90. Cook carried the first serving; the rest of the kitchen owes him a shift.'},
];
export const previews13 = [
  {title:'★ The Jet vs. the scoring heavyweight', note:'Sahil loses Henry and Garrett Wilson; Pranav P loses Flowers. McCaffrey and Kittle give Pranav P the deeper foundation.', pick:7},
  {title:'The Garden’s tight-end checkout', note:'Bowers, Mayer and Mason Taylor all sit for Roshik; Abhishek has no rostered bye players. Bijan and Olave still give the Garden a narrow edge.', pick:3},
  {title:'★ Two backs short against the Koopa Troopa', note:'Hall and Jeanty both sit for Ankith; Tyler Warren sits for Pranav J, who already has Chig Okonkwo. Watch Loveland’s status and the RB waiver wire.', pick:12},
  {title:'★ Points wildcard meets the record bubble', note:'Mark Andrews sits for Taaha. Aditya has no rostered byes, with Mahomes, Cook and Collins providing the cleaner setup.', pick:9},
  {title:'★ A bye contender tests the bubble', note:'Anudeep has no rostered byes. Abhiram’s bye loss is depth QB Fernando Mendoza; McBride is available to anchor the upset bid.', pick:1},
  {title:'★ The Toilet Bowl’s head-to-head swing', note:'GarVeen loses Jonathan Taylor; Sahit loses Richardson and Shrader. Allen and St. Brown are a sturdier starting point if healthy.', pick:11},
];
export const previews14 = [
  {note:'Anudeep loses Javonte and Love; Pranav P loses Aubrey. Gibbs versus McCaffrey is the draw.',critical:true,pick:1},
  {note:'Taaha loses Bam Knight; GarVeen has no rostered byes. This is a direct bottom-two game.',critical:true,pick:5},
  {note:'Sahit loses Michael Wilson; Pranav J loses Lamb. Pranav J still has the deeper scoring core.',critical:false,pick:12},
  {note:'Abhiram loses McBride; Roshik loses Dallas D/ST. Both can still be playing for a record spot.',critical:true,pick:10},
  {note:'Sahil loses Dak, Pickens and Allgeier; Aditya has no rostered byes. Sahil’s pick leans on his remaining scoring ceiling and is the shakiest on the card.',critical:true,pick:6},
  {note:'Neither side has rostered byes. Hall and Jeanty return for Ankith; Abhishek has the depth to make it a fight.',critical:true,pick:4},
];
export const projected = (() => {
  const records = teams.map(t => ({ ...t }));
  const picks = [
    ...(isFinal ? [] : [12,3,1,2,4,10].map((pick, i) => ({ pick, pair: issue.fixtures['12'][i] }))),
    ...previews13.map(({pick},i) => ({ pick, pair: issue.fixtures['13'][i] })),
    ...previews14.map(({pick},i) => ({ pick, pair: issue.fixtures['14'][i] })),
  ];
  picks.forEach(({pick,pair}) => pair.forEach(id => {
    const rec = records.find(r => r.id === id)!;
    if (id === pick) rec.wins++; else rec.losses++;
  }));
  return records.sort((a,b) => b.wins - a.wins || b.ties - a.ties || b.pf - a.pf);
})();
