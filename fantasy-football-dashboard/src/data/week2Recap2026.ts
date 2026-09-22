import snapshot from './week2Recap2026Snapshot.json';
import { week1PowerRankings } from './week1Recap2026';

// Closing-minute publication was explicitly authorized by the commissioner.
// Preserve Sleeper's actual completedWeek flag and disclose the capture caveat in the UI.
export const editionStatus = snapshot.phase as 'in-progress' | 'closing-minute' | 'final';
export const recapSource = snapshot;
const managerNames: Record<number, string> = {
  1: 'Anudeep', 2: 'Abhishek', 3: 'Roshik', 4: 'Ankith', 5: 'Taaha', 6: 'Sahil',
  7: 'Pranav P', 8: 'Sahit', 9: 'Aditya', 10: 'Abhiram', 11: 'Gary & Naveen', 12: 'Pranav J',
};
type ScoredMatchup = { roster_id: number; matchup_id: number; points: number; custom_points: number | null };
export const recapTeams = snapshot.teams.map(team => {
  const current = snapshot.week2.find(row => row.roster_id === team.rosterId)!;
  const results: ScoredMatchup[][] = [snapshot.week1, ...(editionStatus === 'in-progress' ? [] : [snapshot.week2])];
  const record = results.reduce((total, week) => {
    const result = week.find(row => row.roster_id === team.rosterId)!;
    const opponent = week.find(row => row.matchup_id === result.matchup_id && row.roster_id !== team.rosterId)!;
    const score = result.custom_points ?? result.points;
    const against = opponent.custom_points ?? opponent.points;
    if (score > against) total.wins += 1;
    else if (score < against) total.losses += 1;
    else total.ties += 1;
    return total;
  }, { wins: 0, losses: 0, ties: 0 });
  return {
    ...team,
    manager: managerNames[team.rosterId],
    score: current.custom_points ?? current.points,
    // Newsletter record follows the disclosed closing-score snapshot, not stale API standings.
    record: `${record.wins}–${record.losses}${record.ties ? `–${record.ties}` : ''}`,
    matchupId: current.matchup_id,
  };
});
export const getRecapTeam = (id: number) => {
  const team = recapTeams.find(row => row.rosterId === id);
  if (!team) throw new Error(`Unknown Week 2 roster: ${id}`);
  return team;
};
export const formatScore = (value: number) => value.toFixed(2);
export const getStarter = (rosterId: number, playerId: string) => {
  const matchup = snapshot.week2.find(row => row.roster_id === rosterId);
  const index = matchup?.starters.indexOf(playerId) ?? -1;
  if (!matchup || index < 0) throw new Error(`Player ${playerId} did not start for roster ${rosterId}`);
  const player = (snapshot.players as Record<string, { name: string; position: string; team: string }>)[playerId];
  return { ...player, points: matchup.starters_points[index] };
};

type ReportingSource = { label: string; url: string };
const eaglesReport: ReportingSource = {
  label: 'Eagles, September 20: the comeback, Barkley’s stinger and Goedert’s knee injury',
  url: 'https://www.philadelphiaeagles.com/news/eagles-6-takeaways-from-an-incredible-come-from-behind-win-over-the-titans-jalen-hurts-devonta-smith-2026-nfl-week-2',
};
const calebReport: ReportingSource = {
  label: 'Bears, September 21: Williams week-to-week with a hamstring injury',
  url: 'https://www.chicagobears.com/news/caleb-williams-week-to-week-with-hamstring-injury',
};
const dartReport: ReportingSource = {
  label: 'Giants, September 21: Dart ruled out with a knee injury; Nabers returns after a shoulder injury',
  url: 'https://www.giants.com/news/qb-jaxson-dart-knee-questionable-to-return-vs-rams-injury-update',
};
const pukaReport: ReportingSource = {
  label: 'Giants, September 21: Nacua inactive after a hip injury',
  url: 'https://www.giants.com/news/week-2-tracker-latest-news-notes-roster-moves-los-angeles-rams',
};
const mooreReport: ReportingSource = {
  label: 'Bills, September 17: Moore’s shoulder injury',
  url: 'https://www.buffalobills.com/news/bills-issue-injury-update-on-wr-dj-moore',
};
const danielsReport: ReportingSource = {
  label: 'Commanders, September 21: Daniels’ elbow evaluation and quarterback plans',
  url: 'https://www.commanders.com/news/jayden-daniels-dan-quinn-commanders',
};
const pierceReport: ReportingSource = {
  label: 'Colts, September 21: Pierce’s heel evaluation',
  url: 'https://www.colts.com/news/x-rays-on-left-heel-negative-for-wr-alec-pierce',
};
const bowersReport: ReportingSource = {
  label: 'Raiders, September 20: Bowers inactive for Week 2',
  url: 'https://www.raiders.com/news/las-vegas-raiders-week-2-inactives-vs-los-angeles-chargers-092026',
};
const flowersReport: ReportingSource = {
  label: 'Ravens, September 19: Flowers ruled out with a hamstring injury',
  url: 'https://www.baltimoreravens.com/news/zay-flowers-ruled-out-carl-jones-signed-53-man-roster-tj-tampa-injured-reserve-ravens-saints-week-2-2026',
};
const collinsReport: ReportingSource = {
  label: 'Texans, September 18: Collins ruled out with a hamstring injury',
  url: 'https://www.houstontexans.com/news/week-2-injury-report-texans-vs-bengals',
};
const sundayInjuries: ReportingSource = {
  label: 'NFL, September 20: Dowdle and Robinson injury updates',
  url: 'https://www.nfl.com/news/notable-injuries-news-from-sunday-s-week-2-games',
};
const ninersReport: ReportingSource = {
  label: '49ers, September 21: McCaffrey and Kittle’s career milestones',
  url: 'https://www.49ers.com/news/christian-mccaffrey-reaches-100-career-touchdowns-stats-and-facts-from-miavssf',
};

export const week2Overview = {
  headline: 'Adams stole the ending.',
  lead: 'Taaha had the Sunday-night surge. Aditya had Davante Adams—and the last word. A 41.50-point Monday explosion flipped their matchup, while GarVeen’s Thursday avalanche and Pranav J’s Eagles-led charge left their opponents chasing shadows. Kelce nearly staged another rescue, and Ankith ended the week with both quarterbacks hurt. Week 2 did not do quiet.',
};

type MatchupRecap = {
  matchupId: number; teamIds: [number, number]; billing: string; summary: string;
  xFactorRosterId: number; xFactorId: string; xFactor: string; lowlight: string;
  sources?: ReportingSource[];
};

export const week2Recaps: MatchupRecap[] = [
  {
    matchupId: 3, teamIds: [4, 12], billing: 'The Eagles changed the conversation',
    summary: 'Ankith had the opening he wanted: LaPorta delivered 17.20 on Thursday and gave him something to work with. Then Sunday belonged to Pranav J. Hurts and DeVonta Smith put up 45.86 between them, with Smith right in the middle of Philadelphia’s late comeback, and Lamb piled on another 37.30. Chase answered with 26.50, but Ankith was trading individual punches with an entire combination. Pranav J took it 144.66–103.82, a 40.84-point statement in the early fight at the top.',
    xFactorRosterId: 12, xFactorId: '7525',
    xFactor: 'DeVonta Smith’s 29.70 turned the Eagles connection into a real problem for Ankith. Lamb was the biggest scorer, but Smith gave Pranav J a second receiver who could take over; together they delivered 67.00. Try covering both of those fires at once.',
    lowlight: 'Caleb Williams left with a hamstring injury and 6.72 points, while Montgomery and Stevenson combined for only 8.00. Then Monday brought a second quarterback blow: Jaxson Dart injured his knee and was ruled out at halftime. He was on Ankith’s bench, so this did not change the matchup score—but it changed the plan for next week.',
    sources: [eaglesReport, calebReport, dartReport],
  },
  {
    matchupId: 5, teamIds: [10, 1], billing: 'Captain Kelce nearly did it again',
    summary: 'Abhiram looked in control. Then Anudeep handed the captain the ball again, and suddenly nobody was comfortable. Kelce’s 27.10 fueled the Sunday-night chase, dragging Anudeep to 128.28 against Abhiram’s 132.32. Abhiram survived by 4.04. He built the cushion across his lineup; Kelce nearly chewed through the whole thing by himself. The captain almost pulled off the same rescue two weeks running.',
    xFactorRosterId: 10, xFactorId: '5001',
    xFactor: 'Dalton Schultz brought 28.00 out of a flex spot. Pair that with McBride’s 18.10 and Abhiram got 46.10 from two tight ends—enough firepower to keep Kelce’s charge from swallowing the lead. The headline name was McBride; the biggest punch came from Schultz.',
    lowlight: 'London, McLaurin and Javonte Williams combined for 23.90 for Anudeep. Abhiram had his own lineup headache: Wentz managed 5.32 while Shough posted 21.38 on the bench. That 16.06-point difference would have made the Kelce show a lot less stressful.',
  },
  {
    matchupId: 2, teamIds: [3, 2], billing: 'Nobody is framing this box score',
    summary: 'This was not the highlight reel either manager ordered. Roshik’s stars never hit top gear, Abhishek never found a player to blow the doors off, and Roshik slipped through with a 107.90–94.84 win. Olave provided the cleanest burst of offense with 22.60. Abhishek also watched Daniels leave with a dislocated elbow, turning an already frustrating afternoon into a bigger question for the weeks ahead. Roshik gets the win; nobody gets to call this a masterpiece.',
    xFactorRosterId: 3, xFactorId: '8144',
    xFactor: 'Chris Olave was the only starter on either side to clear 20. In a matchup full of modest returns, his 22.60 gave Roshik an actual headliner. Sometimes the difference is not a generational performance; it is one receiver doing more than everybody else.',
    lowlight: 'Kraft and Addison combined for 6.60 in Abhishek’s lineup, while Purdy had 28.48 on the bench. Roshik should not be polishing the offense either: Lamar and Bijan returned 25.90 combined. That duo is built to carry much more of the load.',
    sources: [danielsReport],
  },
  {
    matchupId: 4, teamIds: [9, 5], billing: 'Adams tore up the ending',
    summary: 'Mahomes on one side. Kenneth Walker on the other. Sunday night became a running argument between Aditya’s quarterback and Taaha’s back, with Walker’s late surge helping Taaha carry a 14.38-point lead into Monday. Then Davante Adams blew the whole thing open. His 41.50 overwhelmed Kyren Williams’ 14.70, a 26.80-point swing that dragged Aditya all the way back for a 140.88–128.46 win. Taaha got 46.00 from Smith-Njigba and 25.80 from Walker—and still had to watch somebody else celebrate. That is a brutal way to finish a week.',
    xFactorRosterId: 9, xFactorId: '2133',
    xFactor: 'Davante Adams, and there is no debate. His 41.50 was the Monday-night hammer that finished the comeback, backing up Mahomes’ 28.98 and Cook’s 22.90. JSN and Walker combined for 71.80 on the other side; Adams made even that look like a lead you could chase down.',
    lowlight: 'Lawrence’s 6.16 left Taaha giving away 22.82 at quarterback. Aditya had problems too: Goedert exited with a knee injury after 1.40, while Sutton and Price combined for 10.50. Adams covered those cracks; Taaha’s supporting cast could not do the same.',
    sources: [eaglesReport],
  },
  {
    matchupId: 1, teamIds: [7, 6], billing: 'Pranav P starts answering back',
    summary: 'Here is the response Pranav P needed to put on tape. McCaffrey reached 100 career NFL touchdowns, Kittle passed 600 career catches, and those two brought 40.60 fantasy points to this fight. Add Hampton’s 17.50 and Bateman’s 21.80, and Pranav P banked a 125.48–113.16 win over Sahil. The champion got 29.76 from Dak and 17.70 from Henry, but Jefferson’s 8.50 never gave the offense its usual extra gear. Pranav P’s veterans answered back; the defending champ is staring at 0–2.',
    xFactorRosterId: 7, xFactorId: '7571',
    xFactor: 'Rashod Bateman supplied 21.80 from the flex. With Flowers sidelined by his hamstring, that is a big answer from the receiving depth. The McCaffrey–Hampton foundation did its job; Bateman supplied the extra punch that this lineup was missing in the opener.',
    lowlight: 'Herbert managed just 4.88 for Pranav P, so this was hardly a flawless rebound. On Sahil’s side, Tre Tucker scored 25.40 on the bench while Etienne produced 7.10 in the lineup. There were more points available than the champion managed to collect.',
    sources: [ninersReport, flowersReport],
  },
  {
    matchupId: 6, teamIds: [11, 8], billing: 'GarVeen threw the first hundred',
    summary: 'One hundred points? Try 103.42. That was GarVeen’s Thursday total, not the end-of-week score. Allen, Amon-Ra and Kincaid came flying out of the gates, and Gary and Naveen kept adding to the damage on Sunday through Taylor and Diggs. A 177.62–79.12 win, a 98.50-point margin, and not much suspense along the way. Gary did not come out of retirement for a ceremonial appearance; this partnership is demanding a seat at the big table.',
    xFactorRosterId: 11, xFactorId: '4984',
    xFactor: 'Josh Allen’s 39.82 set the pace, and his connection with Kincaid supplied 62.32. Amon-Ra chipped in 37.20 of his own. GarVeen got the kind of opening salvo that changes how an opponent watches the rest of the weekend.',
    lowlight: 'Waddle’s 23.80 was the bright spot for Sahit, but Maye, Barkley and Loveland combined for just 12.32. Barkley’s stinger limited his workload, adding a health worry to the scoring frustration. GarVeen has a concern too: Moore exited with a shoulder injury.',
    sources: [eaglesReport, mooreReport],
  },
];

// These are season projections, not a sort of the weekly points leaderboard.
// Movement always compares against the published Week 1 board, not the draft edition.
type PowerRanking = { rosterId: number; previousRank: number; tier: string; outlook: string; sources?: ReportingSource[] };
const ranking = (rosterId: number, tier: string, outlook: string, sources?: ReportingSource[]): PowerRanking => ({
  rosterId, previousRank: week1PowerRankings.findIndex(row => row.rosterId === rosterId) + 1,
  tier, outlook, sources,
});
export const week2PowerRankings: PowerRanking[] = [
  ranking(11, 'Title contender',
    'Allen, Taylor and Amon-Ra give GarVeen a championship-level core, and Kincaid’s emergence makes this more than a three-man operation. Moore’s shoulder injury makes his Week 3 availability uncertain, so Diggs and Metcalf need to keep the receiving floor from falling away.', [mooreReport]),
  ranking(12, 'The team to catch',
    'Pranav J has the receiving firepower to carry a title run, with Lamb and DeVonta showing he can win big even without Nacua. Getting Puka healthy after his hip-related absence and finding steady backfield production are the next steps toward making the league’s toughest assignment even tougher.', [pukaReport]),
  ranking(1, 'Title contender',
    'Gibbs and Kelce give Anudeep a path through the big matchups, but a deep playoff run needs London and McLaurin contributing before the rescue mission starts. Dowdle returned after a toe injury, and Anudeep will want reliable backfield cover so Gibbs does not have to carry every difficult week.', [sundayInjuries]),
  ranking(6, 'Title contender',
    'The champion still has a title-caliber foundation in Dak, Henry and Jefferson, with Garrett Wilson giving Sahil another receiver who can tilt a matchup. Getting Jefferson back to headline production and turning Tucker’s bench flashes into useful lineup points will matter more for the season than chasing one week’s score.'),
  ranking(3, 'Dangerous challenger',
    'Lamar, Bijan and Olave keep Roshik in the contender conversation, but getting Bowers back into the lineup is central to raising this team’s weekly floor. Pierce’s new heel setback adds another depth concern, so healthy flex options matter more than counting on another narrow escape.', [bowersReport, pierceReport]),
  ranking(4, 'Quarterback plan in crisis',
    'Chase, Rice, Jeanty and LaPorta still give Ankith a playoff-caliber core, but this roster now needs a quarterback contingency plan before it can talk comfortably about a title. Caleb is week-to-week with a hamstring injury and Jaxson Dart left Monday with a knee injury, so a healthy alternative is the immediate priority while both situations are evaluated.', [calebReport, dartReport]),
  ranking(5, 'Dangerous challenger',
    'Walker and Smith-Njigba give Taaha the explosive core of a playoff problem, not just a team hoping to steal the occasional shootout. The next move is stabilizing quarterback and the supporting lineup, because Lawrence’s low floor and Mason’s existing absence leave too much of the season riding on those two stars.'),
  ranking(10, 'Playoff stock rising',
    'McBride, Achane, Irving and Hubbard give Abhiram enough dependable options to make a real playoff push, and Schultz adds flexibility when the matchups suit him. Settling the quarterback spot and finding more consistent receiving production are the next steps toward turning a tough opponent into a title threat.'),
  ranking(7, 'Rebound with upside',
    'McCaffrey, Hampton and Kittle give Pranav P a sturdy route back into the playoff fight, with Bateman showing the receiving depth can contribute. Flowers’ hamstring absence and Nabers’ shoulder scare—even after he returned Monday—make health checks essential, while stronger quarterback production remains the missing piece in a serious title argument.', [flowersReport, dartReport]),
  ranking(9, 'Health on the watchlist',
    'Mahomes, Cook and Adams give Aditya a core that can drag this team into the playoff fight, but one spectacular rescue cannot be the weekly plan. Collins’ hamstring absence and Goedert’s new knee injury put immediate pressure on the alternatives, so protecting the scoring floor is the next step toward becoming a dependable contender.', [collinsReport, eaglesReport]),
  ranking(2, 'Answers needed',
    'Hall, Brown and a young receiving group give Abhishek enough to stay in the playoff race, but the lineup needs a repeatable source of big weeks. Daniels’ elbow dislocation makes Purdy an important safety net now, and getting that quarterback decision right could keep a difficult September from becoming a season-long chase.', [danielsReport]),
  ranking(8, 'Urgent response required',
    'Waddle gives Sahit a starting point for a season turnaround, but it will take dependable quarterback play and real contributions from the rest of the offense. Barkley’s stinger adds another health concern with Brown already on injured reserve, leaving this roster little room for quiet weeks while its biggest names recover.', [eaglesReport]),
];

type MatchupPreview = {
  matchupId: number; teamIds: [number, number]; billing: string; story: string; key: string;
  pickId: number; pickReason: string; sources?: ReportingSource[];
};
export const week3Previews: MatchupPreview[] = [
  {
    matchupId: 1, teamIds: [1, 7], billing: 'The captain meets the counterpunch',
    story: 'Anudeep has already had enough of late heart-rate spikes. Pranav P brings McCaffrey, Hampton and Kittle to a matchup that will ask whether Anudeep can get control without another Kelce rescue.',
    key: 'Gibbs versus the McCaffrey–Hampton pairing sets the tone, but London and McLaurin need to give Anudeep more than background noise. Pranav P needs a stronger quarterback contribution to turn his backfield into a full-lineup advantage.',
    pickId: 1, pickReason: 'Anudeep, narrowly. Gibbs and Kelce get the nod, but Pranav P has enough at running back and tight end to make this uncomfortable.',
  },
  {
    matchupId: 2, teamIds: [5, 11], billing: 'Bring the heavy hitters',
    story: 'Walker and Smith-Njigba against Allen, Taylor and Amon-Ra. This is not the matchup for a quiet afternoon, and Taaha will need more than two stars to match GarVeen’s growing list of weapons.',
    key: 'The quarterback gap is the big question: Taaha cannot keep giving away ground there and asking Walker to win it back. GarVeen’s supporting slots still have to earn their place beside the headliners.',
    pickId: 11, pickReason: 'GarVeen. There are more dependable routes to a big total, although Taaha has exactly the kind of two-player eruption that can wreck a sensible pick.',
  },
  {
    matchupId: 3, teamIds: [8, 12], billing: 'The hardest possible response test',
    story: 'Sahit needs a reset, and the team at the top of our board is waiting. Pranav J can generate offense from too many places for Sahit to survive another afternoon of empty supporting spots.',
    key: 'Barkley’s availability needs checking, and Sahit needs Maye and Loveland to become contributors rather than unresolved questions. On the other side, Lamb and DeVonta can force Sahit into a chase almost immediately.',
    pickId: 12, pickReason: 'Pranav J. Sahit has players who can hit back, but too many things currently need to improve at once.',
  },
  {
    matchupId: 4, teamIds: [3, 10], billing: 'Abhiram is done being overlooked',
    story: 'Abhiram has shown he can make a highly rated opponent sweat. Roshik brings the bigger quarterback name and Bijan’s ceiling, but another muted performance from those stars will invite trouble.',
    key: 'McBride gives Abhiram a clear weapon at tight end while Roshik monitors Bowers’ availability. The quarterback choice is just as important for Abhiram: he cannot assume the rest of the lineup will cover another low return.',
    pickId: 3, pickReason: 'Roshik, with very little comfort. Lamar and Bijan get the ceiling vote; Abhiram has enough depth to punish them if they stay quiet.',
  },
  {
    matchupId: 5, teamIds: [6, 9], billing: 'The champion wants his stars back',
    story: 'Sahil needs Jefferson to join Dak and Henry at the front of the offense. Aditya has Mahomes and Cook to keep this honest, but his receiving options are being tested by injuries.',
    key: 'Watch Collins and Goedert’s availability before trusting Aditya’s best-case lineup. Sahil also has decisions to make after Tucker’s bench performance; the strongest roster on paper still has to be the one that starts.',
    pickId: 6, pickReason: 'Sahil. The deeper collection of proven threats gets the call, with Aditya’s injury picture keeping the upset case conditional.',
  },
  {
    matchupId: 6, teamIds: [2, 4], billing: 'Quarterback plans under repair',
    story: 'Abhishek lost Daniels to an elbow injury; Ankith saw Caleb hurt his hamstring and then watched Dart go down on Monday. Abhishek has Purdy available, while Ankith needs a healthy plan at the position before the rest of his lineup can do its work.',
    key: 'Chase and LaPorta still give Ankith a serious punch, but the quarterback uncertainty changes this matchup. Check both Caleb and Dart’s updates; neither should be assumed available or assigned a return date that has not been confirmed.',
    pickId: 2, pickReason: 'Abhishek, for now. Purdy gives him the clearer quarterback plan; a strong replacement or encouraging injury news for Ankith could flip this pick.',
    sources: [danielsReport, calebReport, dartReport],
  },
];
