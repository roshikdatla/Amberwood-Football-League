import snapshot from './week4Recap2026Snapshot.json';
import { week3PowerRankings } from './week3Recap2026';

export const editionStatus = snapshot.phase;
export const recapSource = snapshot;
const managers: Record<number, string> = {
  1: 'Anudeep', 2: 'Abhishek', 3: 'Roshik', 4: 'Ankith', 5: 'Taaha', 6: 'Sahil',
  7: 'Pranav P', 8: 'Sahit', 9: 'Aditya', 10: 'Abhiram', 11: 'Gary & Naveen', 12: 'Pranav J',
};
type Result = { roster_id: number; matchup_id: number; points: number; custom_points: number | null };
const completedWeeks: Result[][] = [snapshot.week1, snapshot.week2, snapshot.week3, snapshot.week4];
export const recapTeams = snapshot.teams.map(team => {
  const current = snapshot.week4.find(row => row.roster_id === team.rosterId)!;
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
  if (!team) throw new Error(`Unknown Week 4 roster: ${id}`);
  return team;
};
export const formatScore = (points: number) => points.toFixed(2);
export const getStarter = (rosterId: number, playerId: string) => {
  const matchup = snapshot.week4.find(row => row.roster_id === rosterId);
  const index = matchup?.starters.indexOf(playerId) ?? -1;
  if (!matchup || index < 0) throw new Error(`${playerId} did not start for roster ${rosterId} in Week 4`);
  const player = (snapshot.players as Record<string, { name: string; position: string; team: string | null }>)[playerId];
  return { ...player, points: matchup.starters_points[index] };
};

type Source = { label: string; url: string };
const week4Schedule: Source = { label: 'NFL Week 4 schedule; checkpoints reconstructed from final starter scores', url: 'https://fantasy-www.nfl.com/news/nfl-how-to-watch-week-4-schedule-london-game-details-and-more' };

const week4Injuries: Source = { label: 'NFL: injuries reported during Week 4', url: 'https://amp.nfl.com/news/notable-injuries-news-sunday-week-4-games' };
const hallReport: Source = { label: 'NFL: Week 4 injury-status report', url: 'https://fantasy-www.nfl.com/news/nfl-week-4-injury-report-player-statuses-for-all-16-games' };
const calebReport: Source = { label: 'October 5: Williams remains sidelined; Bagent to start Week 5', url: 'https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-5' };
const etienneReport: Source = { label: 'October 1: Etienne placed on injured reserve', url: 'https://fantasy-www.nfl.com/news/nfl-news-roundup-latest-league-updates-from-thursday-oct-1' };
const priceReport: Source = { label: 'NFL: Price to IR; Charbonnet practice window', url: 'https://amp.nfl.com/news/seahawks-placing-rb-jadarian-price-chest-on-injured-reserve' };
const brownReport: Source = { label: 'NFL: A.J. Brown high-ankle injury', url: 'https://amp.nfl.com/news/patriots-wr-aj-brown-out-six-weeks-high-ankle-sprain' };
const trades = (week: number): Source => ({ label: `Sleeper league transactions, period ${week}`, url: `https://api.sleeper.app/v1/league/1354521952483573760/transactions/${week}` });

// Checkpoints group final starter points by completed game window. They do not
// claim archived live scores or identify an exact within-game lead change.

export const week4Overview = {
  headline: 'The mouse ears have changed hands.',
  lead: 'Last week, Pranav J won with the eighth-best score and collected the inaugural Mickey. This week, he posted the second-best score and lost. Welcome to Amberwood, where the schedule has a terrible sense of humor. Roshik won the heavyweight fight to stand alone at 4–0, Tetairoa McMillan delivered 46.20 for Ankith, and Taaha kept the scoring machine running. Anudeep and Pranav P banked wins of their own, while Aditya escaped by 1.84 and inherited the souvenir headwear. Four weeks down, one unbeaten team, and two winless managers who would very much like to speak to customer service.',
};

type Recap = { matchupId: number; teamIds: [number, number]; billing: string; summary: string;
  xFactorRosterId: number; xFactorId: string; xFactor: string; lowlight: string; sources?: Source[] };
export const week4Recaps: Recap[] = [
  {
    matchupId: 6, teamIds: [3, 12], billing: 'Olave Garden takes the last undefeated table',
    summary: 'Somebody had to leave the undefeated club, and Pranav J ended Sunday looking like he had reserved his seat. Thursday’s Pittman–Boswell opening act produced just 3.50–2.10, but Lamb’s 43.30 and Puka’s 29.70 helped Pranav J build a 138.52–112.68 lead by Sunday’s end. Roshik needed Bijan and Olave to beat Vele by more than 25.84 on Monday. They delivered 52.80 against Vele’s 17.40, flipping the result to 165.48–155.92 and leaving Roshik alone at 4–0. Pranav J posted the second-highest score and took his first loss. Last week’s mouse ears apparently came with a very aggressive return policy.',
    xFactorRosterId: 3, xFactorId: '8121',
    xFactor: 'Romeo Doubs put 23.80 into the flex, finishing second on Roshik’s team behind Bijan. That extra scoring lane mattered against Lamb and Puka’s combined 73.00: the headliners had company, and Doubs made sure Roshik could keep answering.',
    lowlight: 'Swift and Skattebo combined for 15.00, while Pittman added 3.50 for Pranav J. Monangai’s 30.00 sat on his Week 4 bench; either running-back swap would have covered the 9.56-point gap in hindsight, which means the most productive spectator in this matchup was apparently sitting on Pranav J’s own bench.',
    sources: [week4Schedule],
  },
  {
    matchupId: 5, teamIds: [5, 6], billing: 'The ground crew cancels the champ’s flight',
    summary: 'Sahil actually won the Thursday opening act: Jaylen Warren’s 15.60 beat Fannin’s 11.70. Then Taaha’s running backs took the microphone. Kyren supplied 36.70 in the early Sunday window and Walker 32.90 in the late one, leaving Taaha ahead 141.78–95.30 before Sunday night. Waller’s 6.60 closed Sahil’s week at 101.90; Juwan Johnson added 11.90 on Monday to make the final 153.68–101.90. Taaha has followed 186.04 with another convincing win to reach 2–2, while the defending champ sits at 1–3 after the week’s lowest total. That promising Thursday boarding announcement ended with the flight very much canceled.',
    xFactorRosterId: 5, xFactorId: '8150',
    xFactor: 'Kyren Williams delivered 36.70, the largest score in this matchup. He outscored Henry and Jaylen Warren’s combined 31.50 on his own, and Walker’s 32.90 gave Taaha a second running back who could make exactly the same claim.',
    lowlight: 'Garrett Wilson went from 28.70 in Week 3 to 5.70, while Tucker and Pickens combined for 17.90. Sahil had nobody reach 20; Taaha had two players clear 30, and the championship résumé is now doing more work than the championship lineup. At this rate, the title defense needs its own defense attorney.',
    sources: [week4Schedule],
  },
  {
    matchupId: 3, teamIds: [4, 11], billing: 'McMillan acquires a controlling interest',
    summary: 'GarVeen had the early itinerary working: Metcalf supplied 18.50 on Thursday, then Taylor and Diggs added 31.20 in London. Gary and Naveen still led 73.62–59.70 after the early Sunday games, even with Chase stuck at 5.70 for Ankith. Jeanty’s 18.60 put Ankith ahead by the end of the late window, and Sunday night blew the doors off: Goff plus McMillan delivered 68.68 against 18.50 from Amon-Ra and Detroit’s defense. Ankith was done at 146.98; GarVeen needed Kamara to erase a 54.86-point Monday deficit. His 22.80 made it 146.98–114.92, leaving Ankith 3–1 and the GarVeen apology tour with another date on the calendar.',
    xFactorRosterId: 4, xFactorId: '12526',
    xFactor: 'Tetairoa McMillan’s 46.20 accounted for nearly a third of Ankith’s total and exceeded the entire 32.06-point winning margin. Chase, Downs and Wicks combined for 15.10; McMillan produced more than three times that number and apparently handled the whole department himself.',
    lowlight: 'Kincaid and DJ Moore combined for 4.40 for GarVeen. Add McLaughlin and Detroit’s defense and those four slots still only reach 9.40, less than ten points despite two managers being available to supervise. Gary and Naveen have achieved the rare group project where both people blame the other guy.',
    sources: [week4Schedule],
  },
  {
    matchupId: 1, teamIds: [7, 10], billing: 'The receivers finally collect their extra lives',
    summary: 'Neither lineup had a Thursday starter, so this one saved its arguments for Sunday. Flowers’ 27.80 and Nabers’ 25.20 powered Pranav P’s early push, and McCaffrey plus Kittle helped build a 137.48–98.10 advantage before Sunday night. Hubbard’s 27.90 beat Jameson Williams’ 18.20 in that window, trimming Abhiram’s deficit to 29.68 with Shough and the Saints defense left for Monday. Shough supplied 15.94, but New Orleans gave back 2.00, leaving the final at 155.68–139.94. Both managers are now 2–2; Pranav P gets the receiver breakout and the win, while Abhiram gets a sixth-best weekly score and an especially unhelpful consolation handshake.',
    xFactorRosterId: 7, xFactorId: '9997',
    xFactor: 'Zay Flowers led Pranav P with 27.80, topping his 15.40 from the previous week. Pair that with Nabers’ 25.20 after 7.60 in Week 3, and the two receivers went from a combined 23.00 to 53.00; somebody found the power switch.',
    lowlight: 'Irving, Schultz and the Saints defense combined for 7.00 for Abhiram, including minus-2.00 from New Orleans. Ollie Gordon’s 20.00 stayed on the bench; swapping it for Schultz’s 2.90 would have cleared the 15.74-point deficit in hindsight, while the Saints defense charged him two points for the privilege of watching. Even Buc-ee’s does not make you pay to use the bathroom.',
    sources: [week4Schedule],
  },
  {
    matchupId: 4, teamIds: [1, 2], billing: 'Javonte keeps the lights on in Jahmyrica',
    summary: 'Abhishek led 21.90–7.00 after Thursday thanks to Boston and Cleveland’s defense, then watched Javonte’s 31.30 and Burrow’s 24.72 change the conversation on Sunday. Anudeep held a 94.42–85.12 edge before the night game. LaPorta’s 22.40 beat Gibbs’ 17.70 there, but Abhishek finished at 107.52 with Anudeep still 4.60 ahead and London left to play. London’s 14.60 on Monday padded the final to 126.72–107.52. Anudeep reaches 3–1 without another 176-point performance; Abhishek is 0–4 after the Sadiq–Rice flex pairing supplied 0.00. Zero Dark Purdy is taking the branding much too literally.',
    xFactorRosterId: 1, xFactorId: '7588',
    xFactor: 'Javonte Williams’ 31.30 led the matchup and exceeded the 23.40 Abhishek received from Brown and Montgomery together. Gibbs did not have to repeat his Week 3 explosion because Javonte brought the biggest number this time; the backfield has discovered shift coverage.',
    lowlight: 'Those two empty flex scores hurt more with Evans’ 12.60 and Malik Washington’s 12.00 on Abhishek’s Week 4 bench. Together they would have added 24.60, enough to reverse the result in a hindsight swap; Sadiq’s 25.50 from the previous week evidently did not roll over. Two flex spots, zero points: Abhishek managed to put the bye week in manually.',
    sources: [week4Schedule],
  },
  {
    matchupId: 2, teamIds: [9, 8], billing: 'A 1.84-point escape, mouse ears included',
    summary: 'Judkins gave Aditya a 21.60–11.40 Thursday lead over Concepcion, and Collins’ 32.80 did the heavy lifting on Sunday afternoon. Aditya finished at 120.50 before the night game, with Sahit on 97.20 and only Bryce Young remaining. The assignment was more than 23.30; Young delivered 21.46, leaving a 120.50–118.66 final and no Monday starters to reopen the case. Aditya escapes to 2–2 by the smallest margin of the week, while Sahit stays on the island at 0–4. Eighth in scoring and still collecting the win? Hold that pose, sir; the mouse-ears photographer is on the way.',
    xFactorRosterId: 9, xFactorId: '7569',
    xFactor: 'Nico Collins’ 32.80 was easily the highest score in the matchup and more than a quarter of Aditya’s total. Washington, Adams and Ferguson combined for 13.30, so Collins had quite a bit of the receiving business to run by himself.',
    lowlight: 'Barkley’s 1.00 was the glaring hole, but the quarterback tab adds another sting: Maye scored 24.16 on Sahit’s bench against Young’s 21.46 in the lineup. That 2.70-point difference would have flipped the 1.84-point loss in hindsight; Sahit had the escape boat on the bench and still chose to swim.',
    sources: [week4Schedule],
  },
];

// The actual winner with the fewest all-play wins receives the Mickey.
const mickey = snapshot.mickeyOfTheWeek;
export const mickeyOfTheWeek = {
  rosterId: mickey.rosterId, allPlayWins: mickey.allPlayWins, allPlayLosses: mickey.allPlayLosses,
  scoreRank: mickey.scoreRank, opponentRank: mickey.opponentScoreRank,
  headline: 'Aditya: now cooking with schedule assistance.',
  summary: 'Aditya scored 120.50, ranked eighth out of twelve, and beat Sahit’s 118.66 by 1.84. Seven teams would have beaten him; only four would have lost. Abhiram scored 139.94 and took an L. Pranav J put up 155.92 and took an L. Aditya? Back to .500, holding a receipt that says “opponent: ninth place.” Collins deserves the game ball for 32.80, but the schedule deserves a seat at the celebration dinner. Cookin Sutton Biryani has discovered the secret ingredient: somebody else having a worse Sunday.',
  verdict: 'Pass the ears from Pranav J to Aditya. Last week’s winner just learned how it feels to score second and lose, so perhaps keep the acceptance speech humble. Ankith and his 3–1 record are next; another eighth-place performance is a very ambitious business plan.',
};

type Ranking = { rosterId: number; previousRank: number; tier: string; outlook: string; sources?: Source[] };
const ranking = (rosterId: number, tier: string, outlook: string, sources?: Source[]): Ranking => ({
  rosterId, previousRank: week3PowerRankings.findIndex(row => row.rosterId === rosterId) + 1, tier, outlook, sources,
});
// Editorial cutoff: before Week 5 kickoff, October 8 at 8:15 p.m. ET
// (October 9, 00:15 UTC). Records and scoring remain through Week 4;
// outlooks use verified earlier injuries and completed pre-kickoff trades,
// never capture-time injury labels or later transactions/results.
export const week4PowerRankings: Ranking[] = [
  ranking(3, 'Table for one at the top',
    'Roshik’s 4–0 start has real title weight: Bijan and Bowers anchor the lineup, while the preseason Harvey–Watson acquisition has broadened the scoring options rather than leaving every job to the stars. Lamar’s Week 4 ankle injury makes the quarterback situation the next concern, but a roster that just erased a 25.84-point Monday deficit has earned more confidence than the league’s usual collection of emergency prayer circles.', [week4Injuries, trades(1)]),
  ranking(1, 'The backfield has a second gear',
    'Gibbs, Javonte and Burrow give Anudeep multiple routes toward a title, and the $24-FAAB Tate acquisition added receiving upside behind this 3–1 start. Tate’s 22.50 on the Week 4 bench shows another scoring option, while Kelce’s 3.50 is a reminder that Captain Kelce cannot keep authorizing paid leave during the playoff chase.', [trades(3)]),
  ranking(12, 'Better team, worse receipt',
    'Lamb and Puka’s 73.00 in Week 4 showed why Pranav J’s 3–1 team belongs in the title discussion, while the earlier $8-FAAB Monangai deal supplied a promising running-back option who scored 30.00 on the bench. Monangai’s Week 4 thumb injury complicates the backfield fix, and the season needs steadier running-back production before Lamb starts charging the rest of the lineup rent.', [trades(1), week4Injuries]),
  ranking(5, 'The record is underselling it',
    'Taaha’s league-leading 622.98 through Week 4 makes 2–2 look positively stingy, with Kyren, Walker and JSN giving this roster a credible championship ceiling. Continued help from Burden, Fannin and the other supporting options would turn the scoring into a playoff cushion, because leading the league in points while sitting at .500 is an unnecessarily expensive way to be average.'),
  ranking(4, 'The trade has paid a dividend',
    'The September 28 deal that brought McMillan, Egbuka, Hall and Kraft to Ankith already delivered 62.70 from McMillan and Kraft alone in Week 4, giving this 3–1 team a much more convincing playoff ceiling. Chase’s Week 4 concussion, Hall’s quad issue and Caleb’s continued absence make Goff, Braelon Allen and Stevenson important cover, because McMillan just handled three coworkers’ jobs and should probably speak to payroll.', [trades(3), week4Injuries, hallReport, calebReport]),
  ranking(7, 'The receiving room is awake',
    'Flowers and Nabers joining McCaffrey and Kittle in the Week 4 scoring rush gives Pranav P’s 2–2 roster a stronger playoff case than the early-season supporting cast suggested. The October 7 move sending Odunze and Hunter Henry away for McConkey concentrates that bet on a receiver already dealing with a Week 4 foot issue, so the upside comes with less room for the new acquisition to remain unavailable.', [trades(5), week4Injuries]),
  ranking(11, 'Two managers, one missing floor',
    'GarVeen’s earlier Metcalf trade and $8-FAAB Kamara purchase produced 41.30 together in Week 4, keeping real playoff firepower around Allen and Taylor despite the slide to 2–2. DJ Moore’s Week 4 shoulder injury adds another depth concern, and the 9.40 from four starting slots suggests the two-manager system currently specializes in splitting responsibility for the same bad decision.', [trades(2), trades(4), week4Injuries]),
  ranking(10, 'The roster keeps changing the assignment',
    'Abhiram turned Metcalf into Tate and then Tate into $24 FAAB, leaving Higgins and the tight ends with more of the receiving workload as this 2–2 roster chases a playoff spot. Hockenson’s 26.90 and Hubbard’s 27.90 in Week 4 show there is still enough firepower to compete, but too many quiet supporting slots could turn all that trading into an elaborate way to finish sixth.', [trades(2), trades(3)]),
  ranking(6, 'Championship pedigree, economy seating',
    'Henry and Jaylen Warren remain a credible starting point for Sahil’s playoff recovery, but Etienne’s October 1 move to injured reserve and Charbonnet’s reserve status have reduced the backfield insurance behind a 1–3 start. Allgeier’s cover and steadier receiver production are essential now, because finishing last with 101.90 has the defending champion looking like he renewed the trophy subscription but forgot to renew the team.', [etienneReport, priceReport]),
  ranking(9, 'The win comes with fine print',
    'Collins, Cook and Judkins give Aditya enough scoring muscle to pursue a playoff place at 2–2, even if the Mickey-winning 120.50 says the supporting cast still needs work. Price’s move to injured reserve leaves the running-back room thin behind Cook and Judkins, so finding real depth would be wiser than listing the schedule as the emergency contact again.', [priceReport]),
  ranking(2, 'The rebuild is already on revision two',
    'Abhishek’s Rice–LaPorta–Montgomery–Washington package has now been followed by the October 7 McConkey-for-Odunze-and-Henry deal, adding more options to a roster whose record through Week 4 remains 0–4. Rice’s Week 4 hamstring injury makes that extra receiving depth useful, but the playoff comeback needs points from the flex spots immediately because the trade history is currently much more active than the win column.', [trades(3), trades(5), week4Injuries]),
  ranking(8, 'The island needs more lifeboats',
    'Sahit’s 0–4 rescue mission lost more room for error with Barkley’s Week 4 hamstring injury and AJ Brown’s high-ankle injury, making the earlier $7-FAAB Rodriguez acquisition useful backfield insurance. A first win and any playoff recovery need available support around Waddle, Michael Wilson and the quarterbacks, because four weeks on loveland island without a victory is starting to look less like a getaway and more like a residency.', [week4Injuries, brownReport, trades(2)]),
];

type Preview = { matchupId: number; teamIds: [number, number]; billing: string; story: string; key: string;
  pickId: number; pickReason: string; sources?: Source[] };
export const week5Previews: Preview[] = [
  {
    matchupId: 2, teamIds: [1, 12], billing: 'Three wins each, one very loud grievance',
    story: 'Anudeep won with 126.72; Pranav J lost with 155.92. They both arrive at 3–1, and Pranav J has enough statistical evidence to make the pregame handshake mildly uncomfortable.',
    key: 'Anudeep’s Gibbs–Javonte combination faces the ceiling Lamb and Puka just put on display. The supporting spots matter here: Pranav J needs more from his running backs, while Anudeep cannot assume another opponent will leave two flex slots empty.',
    pickId: 12, pickReason: 'Pranav J, narrowly. The receiving ceiling earns the vote after a strong losing performance; Anudeep’s deeper backfield makes this the sort of pick that should come with a helmet.',
  },
  {
    matchupId: 1, teamIds: [5, 7], billing: 'The .500 records are hiding the fireworks',
    story: 'Taaha and Pranav P are both 2–2 after scoring 153.68 and 155.68. Someone gets a winning record, and someone gets to explain why a team this capable is still below .500.',
    key: 'Kyren and Walker just combined for 69.60, while Flowers and Nabers delivered 53.00 on the other side. Pranav P’s McCaffrey–Kittle foundation can keep this close, but he needs the quarterback spot to offer more than its Week 4 contribution.',
    pickId: 5, pickReason: 'Taaha. Two straight weeks above 150 and the league’s highest four-week scoring total earn the lean, although Pranav P’s newly productive receiving duo makes this a proper fight.',
  },
  {
    matchupId: 3, teamIds: [3, 11], billing: 'The apology tour stops at Olave Garden',
    story: 'Roshik is 4–0 and just beat the second-highest score in the league. GarVeen has lost two straight, so this is a rather unfriendly place to schedule the comeback performance.',
    key: 'GarVeen’s Taylor–Kamara pairing supplied 45.50 last week, giving the underdog a real way to answer Bijan. The harder assignment is matching Roshik’s depth, although Lamar’s Week 4 ankle injury adds a quarterback-availability question to the unbeaten side.',
    pickId: 3, pickReason: 'Roshik. The unbeaten record now comes with consecutive scores above 165; GarVeen needs the tight ends and flex options to help its stars interrupt that run.',
    sources: [week4Injuries],
  },
  {
    matchupId: 6, teamIds: [4, 9], billing: 'The new mouse meets the investment committee',
    story: 'Ankith arrives at 3–1 after McMillan’s 46.20; Aditya arrives at 2–2 after winning by 1.84. One manager would like another offensive explosion, and the other would be perfectly happy with another carefully timed escape.',
    key: 'Collins, Cook and Judkins give Aditya genuine counterpunches against Chase, Jeanty and McMillan. Ankith wants a more balanced receiver contribution this time, while Aditya needs Adams and Ferguson to contribute more than last week’s combined 11.30; Chase’s Week 4 concussion also makes his availability part of Ankith’s equation.',
    pickId: 4, pickReason: 'Ankith. Goff and Kraft offered useful support even with Chase quiet, giving this lineup more ways to get home than another request for the schedule’s generosity.',
    sources: [week4Injuries],
  },
  {
    matchupId: 5, teamIds: [2, 10], billing: 'The first-win search meets the bounce-back queue',
    story: 'Abhishek is 0–4 and needs something more concrete than an encouraging LaPorta score. Abhiram is 2–2 after losing with 139.94, and has his own reasons to be thoroughly finished with moral victories.',
    key: 'Purdy, Brown and LaPorta give Abhishek a workable starting point if the flex spots can contribute. Abhiram can answer with Higgins, Hubbard and McBride, but needs fewer low single digits around his best performers.',
    pickId: 10, pickReason: 'Abhiram. The Week 4 lineup demonstrated more routes to a competitive total; Abhishek can challenge that edge by getting actual points from the spots that just returned zero.',
  },
  {
    matchupId: 4, teamIds: [6, 8], billing: 'The champ and the castaway need a win',
    story: 'Sahil is 1–3, Sahit is 0–4, and neither needs a motivational poster explaining that every week matters. The champ just finished last in scoring; the island resident just lost by less than two points. This is the fantasy football equivalent of two check-engine lights drag racing.',
    key: 'Henry and Jaylen Warren give Sahil a solid place to start, with Wilson needing a rebound from 5.70. Barkley’s Week 4 hamstring injury makes Sahit’s running-back cover a concern, leaving more of the counterpunch to Waddle, Michael Wilson and the quarterback spot.',
    pickId: 6, pickReason: 'Sahil, by a small margin. His running-back production provides the steadier recent base, but Sahit already outscored him in Week 4 and does not need an enormous leap to spoil this pick.',
    sources: [week4Injuries],
  },
];
