import snapshot from './week3Recap2026Snapshot.json';
import { week2PowerRankings } from './week2Recap2026';

export const editionStatus = snapshot.phase;
export const recapSource = snapshot;
const managers: Record<number, string> = {
  1: 'Anudeep', 2: 'Abhishek', 3: 'Roshik', 4: 'Ankith', 5: 'Taaha', 6: 'Sahil',
  7: 'Pranav P', 8: 'Sahit', 9: 'Aditya', 10: 'Abhiram', 11: 'Gary & Naveen', 12: 'Pranav J',
};
type Result = { roster_id: number; matchup_id: number; points: number; custom_points: number | null };
const completedWeeks: Result[][] = [snapshot.week1, snapshot.week2, snapshot.week3];
export const recapTeams = snapshot.teams.map(team => {
  const current = snapshot.week3.find(row => row.roster_id === team.rosterId)!;
  const record = completedWeeks.reduce((total, week) => {
    const result = week.find(row => row.roster_id === team.rosterId)!;
    const opponent = week.find(row => row.matchup_id === result.matchup_id && row.roster_id !== team.rosterId)!;
    const delta = (result.custom_points ?? result.points) - (opponent.custom_points ?? opponent.points);
    if (delta > 0) total.wins += 1;
    else if (delta < 0) total.losses += 1;
    else total.ties += 1;
    return total;
  }, { wins: 0, losses: 0, ties: 0 });
  return { ...team, manager: managers[team.rosterId], score: current.custom_points ?? current.points,
    matchupId: current.matchup_id, record: `${record.wins}–${record.losses}${record.ties ? `–${record.ties}` : ''}` };
});
export const getRecapTeam = (id: number) => {
  const team = recapTeams.find(row => row.rosterId === id);
  if (!team) throw new Error(`Unknown Week 3 roster: ${id}`);
  return team;
};
export const formatScore = (points: number) => points.toFixed(2);
export const getStarter = (rosterId: number, playerId: string) => {
  const matchup = snapshot.week3.find(row => row.roster_id === rosterId);
  const index = matchup?.starters.indexOf(playerId) ?? -1;
  if (!matchup || index < 0) throw new Error(`${playerId} did not start for roster ${rosterId} in Week 3`);
  const player = (snapshot.players as Record<string, { name: string; position: string; team: string | null }>)[playerId];
  return { ...player, points: matchup.starters_points[index] };
};

type Source = { label: string; url: string };
const bowersReport: Source = { label: 'Raiders, September 30: Bowers earns AFC Offensive Player of the Week', url: 'https://www.raiders.com/news/brock-bowers-named-afc-offensive-player-of-the-week-nfl-week-3-raiders-vs-saints' };
const flowersReport: Source = { label: 'Ravens, September 28: Flowers returns on a managed workload', url: 'https://www.baltimoreravens.com/news/jovaugh-gwyn-ethan-pocic-suffer-longer-term-injuries-against-dallas-vega-ioane-poised-to-remain-at-center' };
const calebReport: Source = { label: 'Bears, September 30: Week 4 starting quarterback remains undecided', url: 'https://www.chicagobears.com/news/bears-will-wait-to-announce-starting-qb-for-jets-game' };
const pukaReport: Source = { label: 'Rams, September 30: McVay expects Nacua to return against Philadelphia', url: 'https://www.therams.com/news/rams-injury-updates-sean-mcvay-expects-puka-nacua-to-play-against-eagles-in-week-4-2026' };
const eaglesReport: Source = { label: 'Eagles, September 30: Smith and Goedert estimated nonparticipants', url: 'https://www.philadelphiaeagles.com/news/rams-vs-eagles-injury-report-2026-nfl-week-4-devonta-smith-puka-nacua' };
const danielsReport: Source = { label: 'Commanders, September 30: Daniels limited, White absent from practice', url: 'https://www.commanders.com/news/commanders-colts-week-4-injury-report' };
const collinsReport: Source = { label: 'Texans, September 30: Collins limited with a hamstring injury', url: 'https://www.houstontexans.com/news/week-4-injury-report-texans-vs-cowboys' };
const gibbsReport: Source = { label: 'Lions, September 27: Gibbs scores three touchdowns against the Jets', url: 'https://www.detroitlions.com/news/detroit-lions-gibbs-scores-3-tds-in-win-over-new-york-jets-goff-clark' };
const jsnReport: Source = { label: 'Seahawks, September 27: Smith-Njigba’s historic three-game start', url: 'https://www.seahawks.com/news/jaxon-smith-njigba-notches-a-handful-of-historical-milestones-on-sunday' };
const achaneReport: Source = { label: 'NFL: Achane’s season-ending injury', url: 'https://www.nfl.com/news/dolphins-rb-devon-achane-miss-2026-season-acl-tear' };
const lamarReport: Source = { label: 'Ravens, September 30: Jackson limited with a back issue', url: 'https://www.baltimoreravens.com/news/injury-report-lamar-jackson-ravens-practice-ronnie-stanley-zay-flowers' };
const hallReport: Source = { label: 'Jets, September 30: Hall misses practice with a quad injury', url: 'https://www.newyorkjets.com/news/jets-injury-report-week-4-vs-bears-wednesday-09-30-2026' };
const jeffersonReport: Source = { label: 'Vikings, September 30: Jefferson’s ankle keeps him out of practice', url: 'https://www.vikings.com/news/dolphins-injury-report-week-4-2026-nfl-season' };
const etienneReport: Source = { label: 'NFL, September 28: injury updates', url: 'https://www.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-sept-28' };
const evansReport: Source = { label: '49ers, September 29: Evans’ rib injury under evaluation', url: 'https://www.49ers.com/news/shanahan-reviews-week-3-win-shares-new-injury-updates' };
const bucsReport: Source = { label: 'Packers, September 30: opponent report lists Irving limited with a glute injury', url: 'https://www.packers.com/news/packers-buccaneers-injury-report-sept-30-2026' };
const bucsQbReport: Source = { label: 'Buccaneers, September 30: Jalon Daniels to start with Mayfield sidelined', url: 'https://www.buccaneers.com/news/jalon-daniels-baker-mayfield-told-me-to-just-be-myself' };

export const week3Overview = {
  headline: 'The scoreboard has jokes.',
  lead: 'Last week, GarVeen cracked 100 on Thursday. This week, they could not crack 100 at all. Taaha dropped 186.04 on the former top dogs, Anudeep and Roshik both cleared 176, and the defending champ finally found the win column. Meanwhile, Pranav J is 3–0 with a Week 3 score that would have lost to seven other teams. Somebody get that man a tiny trophy and a very large thank-you card for the schedule. The first Mickey of The Week has arrived.',
};

type Recap = { matchupId: number; teamIds: [number, number]; billing: string; summary: string;
  xFactorRosterId: number; xFactorId: string; xFactor: string; lowlight: string; sources?: Source[] };
export const week3Recaps: Recap[] = [
  {
    matchupId: 2, teamIds: [5, 11], billing: 'The retirement party has been interrupted',
    summary: 'Welcome back to earth, GarVeen. Taaha put up a league-high 186.04 against Gary and Naveen’s 93.66, a 92.38-point beatdown that practically came with moving boxes for the number-one spot. JSN went for 37.36, Walker and Kyren combined for 43.10, and Fannin plus Juwan Johnson added another 47.40. Everybody got a plate. GarVeen, meanwhile, went from last week’s Thursday fireworks to the lowest score in the league. Two managers, one lineup, zero starters above 20. That is not a committee; that is a postgame inquiry.',
    xFactorRosterId: 5, xFactorId: '9488',
    xFactor: 'Jaxon Smith-Njigba delivered 37.36 and made last week’s 46.00 look less like a one-off and more like a warning label. His NFL line included 10 catches, 128 receiving yards and two touchdowns; Taaha did not need another two-man rescue act, but JSN was still the loudest person at a very loud party.',
    lowlight: 'Taylor, Henderson and Kincaid combined for 16.90—less than Lawrence’s 19.78 by himself. Taaha drew the week’s softest opponent, sure, but he also would have beaten every other team. This was not schedule luck; this was bringing a bulldozer to a pillow fight.',
    sources: [jsnReport],
  },
  {
    matchupId: 1, teamIds: [1, 7], billing: 'Captain Kelce gets to take a lunch break',
    summary: 'For once, Anudeep did not need Kelce to rappel down from the ceiling and save the building. Gibbs supplied 41.40, London added 30.40, and Anudeep rolled past Pranav P 176.28–124.94. Golden’s 23.00 and Love’s 21.90 turned the supporting cast into actual support—what a concept. Pranav P got 47.80 from McCaffrey and Kittle, but that still left him watching somebody else’s highlight package. Flowers returned to action with a managed workload and produced 15.40; a useful step forward, just not a 51.34-point eraser.',
    xFactorRosterId: 1, xFactorId: '9221',
    xFactor: 'Jahmyr Gibbs’ 41.40 was the biggest individual score among the week’s starting lineups, powered by 164 scrimmage yards and three NFL touchdowns. Anudeep’s team is called Made in Jahmyrica, and this was the tourism board’s entire advertising campaign in one performance.',
    lowlight: 'Hampton, Nabers and Shakir combined for 14.80 for Pranav P. Anudeep had a few empty seats too—Coker, his kicker and his defense totaled 5.80—but when Gibbs and London supply 71.80, you can afford a little lost luggage.',
    sources: [flowersReport, gibbsReport],
  },
  {
    matchupId: 4, teamIds: [3, 10], billing: 'Olave Garden is serving unlimited problems',
    summary: 'Last week, Roshik scraped together a win. This week, he opened the entire menu. Bijan’s 37.30 and Bowers’ 29.60 led a 176.04–110.50 demolition of Abhiram, with Olave and Watson adding 44.30 between them. Bowers’ return included 10 catches, 116 yards and a touchdown for the Raiders—good enough for AFC Offensive Player of the Week. Abhiram’s bigger loss was awful news beyond fantasy: Achane tore his ACL and will miss the rest of the season. Shough’s 23.80 and Higgins’ 21.00 kept the score moving, but this was a bruising week on every level.',
    xFactorRosterId: 3, xFactorId: '11604',
    xFactor: 'Brock Bowers came back with 29.60, outscoring McBride’s 16.50 by 13.10 at tight end. Bijan provided the biggest number, but Bowers made the whole lineup look different: the scary version of this roster has another weapon plugged back in.',
    lowlight: 'Achane and Irving combined for just 9.50 in Abhiram’s two running-back slots. That is a rough way to meet a team getting 51.50 from Bijan and Aaron Jones; McBride and Hubbard could help, but they could not fill a hole that size.',
    sources: [bowersReport, achaneReport],
  },
  {
    matchupId: 5, teamIds: [6, 9], billing: 'The champion has located the win button',
    summary: 'Sahil is finally on the board, and he did not need a vintage Jefferson game to get there. Garrett Wilson’s 28.70, Jaylen Warren’s 22.60 and Henry’s 21.90 drove a 141.74–105.34 win over Aditya. That is 73.20 from three players who apparently read the 0–2 standings and took it personally. Adams still brought 22.70 and Cook delivered 21.40 for Aditya, but last week’s rescue mission did not come with a season pass. The champ gets breathing room; Aditya gets another meeting with the lineup screen.',
    xFactorRosterId: 6, xFactorId: '8146',
    xFactor: 'Garrett Wilson supplied 28.70 from the flex and led Sahil’s entire team. Jefferson’s 5.20 did not sink the offense because Wilson brought the headline production; Warren’s 22.60 made sure it was not a one-man repair job.',
    lowlight: 'Pitts, Worthy and Price combined for 6.70 for Aditya. Three lineup spots, not even seven points: that is less a supporting cast and more three people standing near the stage. Sahil’s Jefferson–Likely pairing managed only 8.50, with Jefferson suffering an ankle injury—winning did not make that health concern disappear.',
    sources: [jeffersonReport],
  },
  {
    matchupId: 6, teamIds: [4, 2], billing: 'Goff clocks in; Chase handles the heavy lifting',
    summary: 'Ankith found a working quarterback and a way back into the win column. Goff’s 19.36 steadied the position while Chase’s 24.80 and Rice’s 15.80 helped finish a 128.36–111.98 win over Abhishek. Purdy actually won the quarterback battle with 31.28, so this was not a loss Abhishek could pin on the guy under center. He needed more from the rest of the room. Ankith moves to 2–1; Zero Dark Purdy is 0–3, and the team name is starting to sound like the lighting in the standings.',
    xFactorRosterId: 4, xFactorId: '7564',
    xFactor: 'Ja’Marr Chase put up 24.80, more than McConkey and McMillan’s combined 14.30 in Abhishek’s two receiver slots. No 40-point explosion required: Chase gave Ankith a dependable lead weapon while the rest of the lineup did enough to hold the 16.38-point margin.',
    lowlight: 'Hall and Chase Brown returned 17.40 combined for Abhishek, and Kraft added 6.60. Kenyon Sadiq’s 25.50 sat on the bench; swapping that score for Kraft’s would have added 18.90, more than the losing margin. That is hindsight, not proof the start was obvious—but it is absolutely the box-score tab nobody wants to reopen.',
  },
  {
    matchupId: 3, teamIds: [12, 8], billing: 'A win is a win; the footage is negotiable',
    summary: 'Pranav J beat Sahit 111.32–95.34 and moved to 3–0. Congratulations; please do not request a style score. Lamb’s 22.20 led a lineup that did enough against the week’s second-lowest total, while Sahit got 25.90 from Michael Wilson and 17.00 from Tuten without enough help elsewhere. Pranav J gets the standings credit, Sahit gets another frustrating loss, and the league gets the perfect opening act for our new Mickey segment. Keep the acceptance speech short—we have receipts.',
    xFactorRosterId: 12, xFactorId: '6786',
    xFactor: 'CeeDee Lamb’s 22.20 was Pranav J’s only starter score above 20 and exceeded the 15.98-point victory margin. In a lineup full of sensible little contributions, Lamb brought the one number with some shoulders on it.',
    lowlight: 'Sahit’s tight-end slot produced 0.00, while Concepcion and Brian Thomas combined for 4.70 in the flex spots. Pranav J was hardly flawless—Vele, Fairbairn and Seattle’s defense totaled 12.90—but this particular opponent did not send an invoice for the mistakes.',
  },
];

// "Luckiest" means the actual winner with the fewest all-play wins: the most
// favorable gap between the real win and a score matched against all 11 rivals.
const mickey = snapshot.mickeyOfTheWeek;
export const mickeyOfTheWeek = {
  rosterId: mickey.rosterId, allPlayWins: mickey.allPlayWins, allPlayLosses: mickey.allPlayLosses,
  scoreRank: mickey.scoreRank, opponentRank: mickey.opponentScoreRank,
  headline: 'Pranav J: undefeated, under investigation.',
  summary: 'Pranav J scored 111.32, finished eighth out of twelve, and still walked out 3–0. Seven teams would have beaten him; the schedule handed him Sahit’s 95.34 instead. This was not a masterclass. This was showing up to the exam, realizing you studied the wrong chapter, and discovering the teacher had printed the answers on the back. Abhishek scored more and lost. Pranav P scored more and lost. Pranav J? Already in the gift shop buying an undefeated T-shirt.',
  verdict: 'Award the mouse ears to the schedule. Lamb can keep the X-factor trophy, but Pranav J’s real MVP was the little number next to “opponent.” Enjoy the parade, champ: Roshik and his 176.04-point lineup are on next week’s itinerary, and that ride has no skip-the-line pass.',
};

type Ranking = { rosterId: number; previousRank: number; tier: string; outlook: string; sources?: Source[] };
const ranking = (rosterId: number, tier: string, outlook: string, sources?: Source[]): Ranking => ({
  rosterId, previousRank: week2PowerRankings.findIndex(row => row.rosterId === rosterId) + 1, tier, outlook, sources,
});
// Outlooks use capture-time rosters; recaps above use the actual Week 3 starters.
export const week3PowerRankings: Ranking[] = [
  ranking(1, 'New clubhouse leader',
    'Gibbs, London, Burrow and Kelce give Anudeep a championship spine, and Golden plus Love are making the supporting cast look less like emergency contacts. Keep getting real production from those younger options and this team can chase a title without asking Captain Kelce to perform CPR every Sunday.'),
  ranking(3, 'Full menu, no mercy',
    'With Bowers back alongside Bijan, Lamar and Olave, Roshik has the kind of lineup that can turn a playoff bracket into a customer-complaints department. Lamar’s limited Wednesday practice with a back issue deserves monitoring, but keeping that core available gives this 3–0 team a much stronger title case than the record alone.', [bowersReport, lamarReport]),
  ranking(11, 'One bad week, not retirement',
    'Allen, Taylor and Amon-Ra still make GarVeen a title contender; one faceplant does not send Gary back to the retirement home. The road to a championship needs steadier help at the second running-back spot and tight end, because three stars cannot keep underwriting every quiet shift.'),
  ranking(12, 'Contender, honorary mouse',
    'Lamb, Hurts and Tyler Warren give Pranav J a genuine title platform, and the 3–0 cushion counts even when this week’s receipt smells like a theme park. McVay expects Puka back for Week 4, but DeVonta’s hamstring made him an estimated Wednesday nonparticipant, so getting both receivers available is the next step toward winning without the souvenir-shop assistance.', [pukaReport, eaglesReport]),
  ranking(5, 'Do not trust the losing record',
    'JSN, Walker and Kyren give Taaha playoff firepower, while Fannin’s emergence offers a route beyond the weekly two-star hostage situation. If Lawrence stays useful and the tight-end production holds up, this 1–2 team has the tools to make the standings look very misleading by November.'),
  ranking(6, 'Champion, carrying an ice pack',
    'Henry, Garrett Wilson and Jaylen Warren give Sahil enough options to stay in the title conversation without treating every Jefferson quiet week like a national emergency. Jefferson is day-to-day with an ankle injury and Etienne will miss time with a hamstring injury, so the next part of the playoff chase needs healthy depth rather than more faith in the names on the jerseys.', [jeffersonReport, etienneReport]),
  ranking(4, 'New parts, same Chase engine',
    'Chase and Jeanty now have Hall, Egbuka and McMillan around them, giving Ankith a reworked lineup with real playoff upside while Goff keeps the quarterback seat occupied. Hall’s missed quad-injury practice, Caleb’s uncertain return and Egbuka’s switch to a rookie quarterback in Tampa all need watching before anybody starts revving this title project’s engine.', [hallReport, calebReport, bucsQbReport]),
  ranking(2, 'The rebuild has better furniture',
    'Purdy with newly rostered Rice and LaPorta gives Abhishek a credible way back into the playoff chase, even if 0–3 is a deeply unpleasant opening statement. Evans’ rib injury still needs checking, and the revamped lineup must turn its stronger passing-game core into actual wins before the standings start charging late fees.', [evansReport]),
  ranking(7, 'Good bones, quarterback questions',
    'McCaffrey and Kittle keep Pranav P’s playoff path open, while Flowers’ return gives the receiving group a pulse beyond wishful thinking. Daniels is now on this roster and returned to limited practice with his elbow injury, but getting dependable quarterback production and a Hampton rebound matters more to the season than collecting another impressive name.', [flowersReport, danielsReport]),
  ranking(10, 'The backfield needs volunteers',
    'McBride, Higgins and Hubbard give Abhiram a route to stay in the playoff scrap, but the current backfield is missing the star power that made its preseason ceiling so tempting. Irving was limited Wednesday with a glute injury, so getting usable weeks from the reshuffled running-back group is now the difference between staying dangerous and making Shough host a weekly rescue telethon.', [bucsReport]),
  ranking(9, 'Adams cannot do every chore',
    'Mahomes, Cook and Adams keep Aditya capable of landing an upset, but a playoff run needs the remaining lineup spots to contribute more than moral support. Collins’ limited hamstring practice offers a little hope while Goedert remains sidelined at practice with his knee issue, making healthier receiving options and consistent tight-end points the next steps out of the middle-to-bottom traffic.', [collinsReport, eaglesReport]),
  ranking(8, 'Please locate the departure gate',
    'Barkley, Waddle and Michael Wilson still give Sahit a route off the island, but an 0–3 start means the playoff comeback needs to begin before it becomes a documentary about next year. Brown remains on injured reserve in the current roster snapshot, so usable quarterback play and fewer empty supporting slots have to carry the turnaround instead of waiting for one missing star.'),
];
type Preview = { matchupId: number; teamIds: [number, number]; billing: string; story: string; key: string;
  pickId: number; pickReason: string; sources?: Source[] };
export const week4Previews: Preview[] = [
  {
    matchupId: 6, teamIds: [3, 12], billing: 'The undefeated inspection',
    story: 'Two 3–0 teams, very different Week 3 receipts. Roshik just put up 176.04; Pranav J just won the inaugural Mickey, so this is a terrific time for the latter to demonstrate that the ears are removable.',
    key: 'Bowers gives Roshik a major weapon at tight end, while Pranav J watches Puka’s expected return and DeVonta’s hamstring. Lamar’s limited back practice is another check-before-kickoff item, not permission to assume he is out.',
    pickId: 3, pickReason: 'Roshik, provided Lamar is available. Bijan and Bowers tilt the matchup, although a restored Puka–Lamb receiving room could make this pick look very silly very quickly.',
    sources: [pukaReport, eaglesReport, lamarReport],
  },
  {
    matchupId: 5, teamIds: [5, 6], billing: 'The hot hand meets the defending champ',
    story: 'Both finally grabbed a win; now somebody has to go back to the 1–3 group chat. Taaha brings the week’s biggest score, and Sahil brings the championship résumé that still does not earn bonus points on Sleeper.',
    key: 'JSN and the Walker–Kyren pairing give Taaha several ways to pile up points. Sahil needs Henry, Wilson and Warren to keep pulling their weight while Jefferson’s availability is settled.',
    pickId: 5, pickReason: 'Taaha. The current health picture and improving supporting cast break a close call; the champ still has enough punch to object loudly.',
    sources: [jeffersonReport],
  },
  {
    matchupId: 3, teamIds: [4, 11], billing: 'New roster meets the apology tour',
    story: 'Ankith has reshuffled the furniture, and GarVeen would like everybody to delete last week’s screenshots. Chase and the new receiving pieces face Allen, Taylor and Amon-Ra in a matchup with plenty of ceiling and a few wobbly floorboards.',
    key: 'Hall’s quad makes his status important for Ankith, who now has Kraft rather than LaPorta at tight end. GarVeen needs more from Henderson and the tight ends than the collection of single digits that just helped Taaha throw a parade.',
    pickId: 11, pickReason: 'GarVeen, narrowly. The established core gets one more vote of confidence; another quiet supporting cast and the apology tour will need extra dates.',
    sources: [hallReport],
  },
  {
    matchupId: 4, teamIds: [1, 2], billing: 'The fresh start has a terrible appointment',
    story: 'Abhishek has Rice and LaPorta in the new setup, which is encouraging. The next opponent is Anudeep after a 176.28-point week, which is an extremely rude welcome packet.',
    key: 'Purdy and Rice need to give Abhishek a real counterpunch while the running backs improve on last week’s output. Anudeep wants Golden and Love to remain contributors so Gibbs and London do not have to personally answer every question.',
    pickId: 1, pickReason: 'Anudeep. There are more dependable scoring routes right now, but Abhishek’s updated lineup deserves more respect than a casual glance at 0–3 suggests.',
  },
  {
    matchupId: 1, teamIds: [7, 10], billing: 'Tight ends, please report for overtime',
    story: 'Kittle against McBride is the headline; everything around it is an audition. Pranav P needs the offense to join McCaffrey and Kittle, while Abhiram’s revised backfield has a lot of work to do.',
    key: 'Flowers’ return helps Pranav P, but Daniels’ practice participation is not yet a promise that he will play. Abhiram needs his quarterback choice and Higgins to provide enough support while Irving’s availability is monitored.',
    pickId: 7, pickReason: 'Pranav P, by a small margin. McCaffrey and Kittle provide the steadier base; Abhiram can flip it if the replacement production turns up on time.',
    sources: [flowersReport, danielsReport, bucsReport],
  },
  {
    matchupId: 2, teamIds: [8, 9], billing: 'Somebody’s supporting cast must do a thing',
    story: 'Sahit is 0–3, Aditya is 1–2, and both have seen enough low single digits to last a month. There are real stars here; the issue is getting the rest of the lineup to stop behaving like optional extras.',
    key: 'Cook and Adams give Aditya a solid pair of anchors, with Collins’ status worth watching. Sahit needs Barkley and Waddle to join Michael Wilson rather than leaving the scoring to a one-man island evacuation.',
    pickId: 9, pickReason: 'Aditya. The quarterback options and Cook–Adams pairing offer the clearer path, but another quiet week from the supporting spots would leave the door wide open.',
    sources: [collinsReport],
  },
];
