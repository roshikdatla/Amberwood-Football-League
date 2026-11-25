import snapshot from './week11Recap2026Snapshot.json';
import { week10PowerRankings } from './week10Recap2026';

type Source = { label: string; url: string };
const managers: Record<number, string> = {
  1: 'Anudeep', 2: 'Abhishek', 3: 'Roshik', 4: 'Ankith', 5: 'Taaha', 6: 'Sahil',
  7: 'Pranav P', 8: 'Sahit', 9: 'Aditya', 10: 'Abhiram', 11: 'Gary & Naveen', 12: 'Pranav J',
};
export const recapTeams = snapshot.teams.map(team => {
  const result = snapshot.week11.find(row => row.roster_id === team.rosterId)!;
  const record = team.recordThroughRecapWeek;
  return {
    rosterId: team.rosterId, manager: managers[team.rosterId], teamName: team.teamName,
    score: result.custom_points ?? result.points,
    record: `${record.wins}–${record.losses}${record.ties ? `–${record.ties}` : ''}`,
    pointsFor: team.pointsFor,
  };
});
export const getRecapTeam = (rosterId: number) => {
  const team = recapTeams.find(team => team.rosterId === rosterId);
  if (!team) throw Error(`Unknown Week 11 team ${rosterId}`);
  return team;
};
export const formatScore = (score: number) => score.toFixed(2);
export const getStarter = (rosterId: number, playerId: string) => {
  const row = snapshot.week11.find(row => row.roster_id === rosterId);
  const index = row?.starters.indexOf(playerId) ?? -1;
  if (!row || index < 0) throw Error(`${playerId} did not start for roster ${rosterId} in Week 11`);
  const player = (snapshot.players as Record<string, { name: string }>)[playerId];
  return { name: player.name, points: row.starters_points[index] };
};
export const recapSource = {
  capturedAt: snapshot.capturedAt,
  sources: {
    ...snapshot.sources,
    espn11: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=11&seasontype=2&dates=2026',
  },
};
const lineupSource: Source[] = [{ label: 'Sleeper: finalized Week 11 scores and starting lineups', url: snapshot.sources.week11 }];
const nflSources = {
  hubbard: { label: 'Panthers, Nov 22: Hubbard’s 120 yards and two touchdowns', url: 'https://www.panthers.com/news/chuba-hubbard-does-it-again-and-gets-a-little-help-trevor-etienne' },
  cowboys: { label: 'Cowboys, Nov 22: Prescott accounts for five touchdowns', url: 'https://www.dallascowboys.com/news/game-recap-offense-dominates-in-51-30-win' },
  lions: { label: 'Lions, Nov 22: Gibbs’ late touchdowns and Jameson’s 57-yard score', url: 'https://www.detroitlions.com/news/recap-lions-vs-buccaneers-goff-gibbs-williams' },
  coleman: { label: 'Broncos, Nov 22: Coleman’s 111-yard, three-touchdown game', url: 'https://www.denverbroncos.com/news/the-way-he-played-today-was-special-rb-jonah-coleman-posts-historic-111-yard-3-touchdown-rushing-performance-vs-raiders' },
  jacobs: { label: 'Packers, Nov 24: Jacobs questionable for Week 12', url: 'https://www.packers.com/news/packers-list-eight-questionable-vs-rams-week-12-injury-report' },
  laporta: { label: 'Lions, Nov 24: LaPorta estimated full participant with ankle issue', url: 'https://www.detroitlions.com/news/lions-vs-bears-practice-report-nov-24' },
  updates: { label: 'NFL, Nov 24: Walker limited; Dobbins suspended for Week 12', url: 'https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-tuesday-nov-24' },
  herbert: { label: 'NFL, Nov 22: Week 11 injuries and news, including Herbert and Metcalf', url: 'https://amp.nfl.com/news/notable-injuries-news-sunday-week-11-games-2026' },
};
const availabilitySources: Source[] = [
  { label: 'Sleeper: current NFL player availability, captured November 25', url: snapshot.sources.players },
  { label: 'Sleeper: current Amberwood rosters, captured November 25', url: snapshot.sources.rosters },
];

export const week11Overview = {
  headline: 'THE JET SHAKES THE THRONE. NOW RUN IT BACK.',
  lead: 'Sahil just knocked off the league leader and stole the points-wildcard lead in the same trip. Anudeep survived Ankith by 6.96 to join Pranav J at 9–2, Pranav P dropped the week’s biggest score on a Garden that has now lost four straight, and Abhiram collected a win with the mouse ears still attached. Three weeks remain. Next up: all six opening-week matchups return, and absolutely nobody has misplaced the receipts.',
};
export const playoffPicture = {
  headline: 'TWO AT 9–2. JUST 5.98 BETWEEN THE WILDCARD CHASERS.',
  paragraphs: [
    'Pranav J still leads the record standings on points, but Anudeep is now level at 9–2 and only 3.04 behind in season scoring. Pranav P and Roshik share 7–4; Pranav P owns the points advantage. At 6–5, Ankith holds the fifth record berth ahead of Abhiram and Aditya on points. That three-team queue is about to get extremely impolite.',
    'The points wildcard has changed pilots: Sahil’s 1,489.64 puts him 5.98 ahead of Taaha. Abhiram is 68.68 behind Sahil, and any team that falls out of the record top five joins that same scoring race. Weeks 12–14 are all that remain before the Week 15 playoffs; these are the current positions, not the final seating chart.',
  ],
  topFive: 'Pranav J 9–2 (1,606.36 PF); Anudeep 9–2 (1,603.32); Pranav P 7–4 (1,557.66); Roshik 7–4 (1,392.64); Ankith 6–5 (1,470.12).',
  wildcard: 'Sahil 1,489.64 PF; Taaha 1,483.66; Abhiram 1,420.96 lead the scoring race among teams currently outside the five record berths.',
};

interface Recap {
  matchupId: number; teamIds: number[]; billing: string; summary: string;
  xFactorRosterId: number; xFactorId: string; xFactor: string; lowlight: string; sources?: Source[];
}
export const week11Recaps: Recap[] = [
  {
    matchupId: 1, teamIds: [3, 7], billing: 'HUBBARD ORDERS THE WHOLE MENU. THE GARDEN HAS NO ANSWER.',
    summary: 'Pranav P 166.16, Roshik 73.70. Somebody stop serving breadsticks and check the scoreboard. Chuba Hubbard ran for 120 yards and two touchdowns in Carolina’s win over Baltimore, delivering 28.00 here. Ladd McConkey 19.70, Malik Nabers 18.50 and George Kittle 18.40; eight of Pranav P’s ten starters reached double figures. Christian McCaffrey could contribute a perfectly ordinary 14.20 and still watch the league’s highest-scoring lineup win by 92.46. Chris Olave’s 21.20 gave Roshik something to put on the specials board, but the supporting cast never filled the tables. Both teams are 7–4 now. One has won two straight; the other has turned 7–0 into a four-game losing streak. The Garden’s unlimited offering is currently concern.',
    xFactorRosterId: 7, xFactorId: '7594',
    xFactor: 'Hubbard’s 28.00 led a lineup that kept finding another contributor. His total alone exceeded the combined 17.30 from Roshik’s quarterback, two tight ends, Adonai Mitchell and Dobbins. Pranav P did not need a 50-point superhero this time; Chuba led an entire competent staff.',
    lowlight: 'Dobbins finished at 0.00, Cousins at 6.40, Mason Taylor at 4.50 and Mayer at 1.40. Taylor and Mayer delivered 5.90 from two starting slots while Kittle alone supplied 18.40 on the other side. Olave brought dinner; several teammates brought an empty container to take leftovers home.',
    sources: [...lineupSource, nflSources.hubbard],
  },
  {
    matchupId: 2, teamIds: [6, 12], billing: 'THE JET LANDS A PUNCH ON FIRST PLACE.',
    summary: 'Follow up 219.32 by beating the 9–1 leader? Sahil, we have your attention. Dak threw four touchdowns and ran for another in Dallas’ 51–30 win, turning the Cowboys’ fireworks into 35.90 for Sahil. Emmett Johnson’s 26.30 and George Pickens’ 25.80 drove a 150.70–143.56 upset, and this was no free ride. Jonah Coleman’s 111 rushing yards and three touchdowns in Denver produced 36.90 and CeeDee Lamb piled on 32.20 for Pranav J, who posted the fifth-best score and still lost by 7.14. Sahil reaches 4–7 with two straight wins and the points-wildcard lead. Pranav J slips to 9–2 and suddenly has Anudeep right beside him. The Jet Plane has gone from checking baggage to rearranging the playoff departure board.',
    xFactorRosterId: 6, xFactorId: '3294',
    xFactor: 'Prescott’s 35.90 beat Stroud’s 20.46 by 15.44, more than twice the final margin. Pair Dak with Pickens and Sahil got 61.70 from that duo. The pass game supplied the altitude; Emmett Johnson’s 26.30 made sure the engine had company.',
    lowlight: 'Tyler Warren’s 3.20 and Cam Skattebo’s 5.80 combined for 9.00 while Coleman and Lamb did 69.10 worth of work. Sahil had his own quiet passengers in Isaiah Likely (4.50) and Jaylen Warren (4.90), so keep the perfect-performance parade parked. This was a good win against a good score, with just enough spare change.',
    sources: [...lineupSource, nflSources.cowboys, nflSources.coleman],
  },
  {
    matchupId: 3, teamIds: [2, 5], billing: 'EVANS MAKES HIS CASE. TAAHA LOSES THE EVIDENCE.',
    summary: 'Zero Dark Purdy found the target, and Burden of Proof arrived with a folder full of blank paper. Mike Evans scored 24.90, Brock Purdy 22.20 and David Montgomery 17.40 as Abhishek won 121.00–71.34. Those three supplied 64.50, nearly Taaha’s entire score. Tyler Bass led Taaha with 14.20; when the kicker is your star witness, the hearing is already going sideways. Abhishek climbs to 4–7 and gets some room above the bottom of the standings. Taaha falls to 3–8, posts the week’s lowest total and loses the wildcard lead to Sahil. One bad week does not erase his scoring résumé, but it definitely spilled coffee on it.',
    xFactorRosterId: 2, xFactorId: '2216',
    xFactor: 'Evans supplied a team-high 24.90 from the FLEX spot. Taaha’s starting RB pair and two WR slots combined for 14.80. Mike brought more production by himself than that entire four-player group, which is a fairly persuasive opening statement.',
    lowlight: 'Seth McGowan (1.80), Jordan Mason (4.70), Luther Burden (3.30), Caleb Douglas (5.00) and Mark Andrews (3.40) totaled 18.20 across five slots. This was not one unfortunate miss: half the lineup took turns whispering into the microphone.',
    sources: lineupSource,
  },
  {
    matchupId: 4, teamIds: [1, 4], billing: 'JAHMYRICA SURVIVES. THE BANK FILES A COMPLAINT.',
    summary: 'Ankith put up 157.34, the third-highest score of the week, and still got handed a loss. Fantasy football remains a perfectly reasonable activity for calm people. Jahmyr Gibbs’ 27.80, Travis Kelce’s 25.40 and Javonte Williams’ 24.10 powered Anudeep to 164.30 and a 6.96-point escape. Ashton Jeanty answered with 29.40 and Antonio Williams added 23.20 for Ankith, but Chase’s 8.10 left the company’s biggest name short of its usual invoice. Gibbs’ two fourth-quarter touchdowns in Detroit’s win were the NFL highlights behind his haul here. Anudeep moves to 9–2 alongside Pranav J; Ankith drops to 6–5. No blanket flop label here: Ankith would have beaten nine of the other eleven teams. Unfortunately, the fixture list does not accept appeals.',
    xFactorRosterId: 1, xFactorId: '9221',
    xFactor: 'Gibbs led Anudeep at 27.80, and his partnership with Javonte produced 51.90 from the two RB slots. Kelce added 25.40 from TE against Loveland’s 11.90, another 13.50-point advantage in a game decided by 6.96. Jahmyrica’s veterans kept the production line running under serious pressure.',
    lowlight: 'Ja’Marr Chase managed 8.10 while Jeanty and Antonio Williams combined for 52.60. On the bench, Goff’s 20.36 exceeded Caleb Williams’ 14.34 by 6.02, but even that switch alone would have left Ankith 0.94 short. There is your painful replay: a better quarterback score still would not have changed the winner.',
    sources: [...lineupSource, nflSources.lions],
  },
  {
    matchupId: 5, teamIds: [9, 11], billing: 'BIRYANI BANKS A THIRD STRAIGHT. GARVEEN RUNS OUT OF GAS.',
    summary: 'Aditya did not need another banquet. He needed a win, and 115.66–90.06 will go in the same column. Patrick Mahomes delivered 24.96, Parker Washington 20.30 and James Cook 17.20 as Cookin Sutton Biryani reached 6–5 with a third straight victory. GarVeen got 23.10 from DJ Moore and 15.70 from Jacory Croskey-Merritt, but Josh Allen and Jonathan Taylor combined for just 18.86. That is a very expensive pair of quiet shifts. Gary and Naveen fall to 3–8; Aditya stays in the crowded chase for a record berth. The kitchen served a modest portion, and the two-man operation still could not clear the plate.',
    xFactorRosterId: 9, xFactorId: '4046',
    xFactor: 'Mahomes’ 24.96 led Aditya and beat Allen’s 12.16 by 12.80, exactly half the 25.60-point margin. Washington’s 20.30 provided the second big helping. It was enough to cover an actual zero elsewhere in the lineup without turning dinner into an emergency.',
    lowlight: 'DK Metcalf’s 1.20 and Xavier Hutchinson’s 3.30 gave GarVeen 4.50 from two spots. Metcalf was ejected after a second unsportsmanlike-conduct penalty: two flags, 1.20 points, a dreadful exchange rate. Aditya had Courtland Sutton’s 0.00, but enough around that missing contribution to survive it.',
    sources: [...lineupSource, nflSources.herbert],
  },
  {
    matchupId: 6, teamIds: [8, 10], billing: 'BUCKSTER BATTING WINS BY A WHISKER. CHECK THE MOUSE EARS.',
    summary: 'Abhiram wins 106.58–100.06, and the highlights department would like to discuss overtime pay for finding the highlights. Jameson Williams hit a 57-yard touchdown in Detroit’s win and supplied 20.80 here; Bucky Irving added 19.00 and Trey McBride 14.80, enough to scrape past Sahit by 6.52. Khalil Shakir led Sahit at 17.30, but nobody in his lineup reached 20. Abhiram moves to 6–5 and keeps his record-berth argument alive; Sahit is 2–9 after another winnable game slips away. The eighth-highest score beat the ninth-highest score. The standings call that a victory. Our awards committee calls it an appointment.',
    xFactorRosterId: 10, xFactorId: '8148',
    xFactor: 'Jameson Williams was the only starter on either team to clear 20. His 20.80 gave Abhiram the one substantial receiving punch this matchup was begging for. With a 6.52 margin, that contribution was the difference between a useful win and two managers staring at the same depressing box score.',
    lowlight: 'Schultz’s 2.10, Tyson’s 2.00 and the Chargers’ 1.00 left Abhiram with 5.10 across three slots. Sahit could not cash the invitation: Egbuka scored 3.80 and Shrader 1.40. A soft landing was available, but Loveland Island managed to miss the beach.',
    sources: [...lineupSource, nflSources.lions],
  },
];

export const mickeyOfTheWeek = {
  rosterId: snapshot.mickeyOfTheWeek.rosterId,
  headline: 'BUCKSTER BATTING: FOUR HITS, SEVEN MISSES, ONE WIN.',
  summary: 'Congratulations, Abhiram: 106.58 points, eighth place in scoring, and a lovely new win for the collection. That score would have lost to seven teams. Fortunately, the schedule booked Sahit’s 100.06, and Buckster Batting escaped by 6.52 while Ankith’s 157.34 and Pranav J’s 143.56 got nothing. This is not a batting clinic. This is finding a playoff receipt in somebody else’s shopping cart.',
  allPlayWins: snapshot.mickeyOfTheWeek.allPlayWins,
  allPlayLosses: snapshot.mickeyOfTheWeek.allPlayLosses,
  scoreRank: snapshot.mickeyOfTheWeek.scoreRank,
  opponentRank: snapshot.mickeyOfTheWeek.opponentScoreRank,
  verdict: 'Seven teams brought better bats. Abhiram brought the correct appointment. Please collect one win, two oversized ears and a complimentary fast pass past the league median of 118.33. Keep the acceptance speech under 106 words; we have already established this team does not do big numbers.',
};

const outlooks: { rosterId: number; tier: string; outlook: string; sources?: Source[] }[] = [
  { rosterId: 1, tier: 'The bye-week chase', outlook: 'At 9–2 and just 3.04 behind Pranav J in season points, Anudeep has the Gibbs–Burrow–Kelce foundation to chase the top seed without asking one player to carry the entire island. Sahil is next, so Jahmyrica’s path to a first-round bye runs straight through the team that just knocked over the other league leader.' },
  { rosterId: 12, tier: 'The bye-week chase', outlook: 'A 9–2 record and the league’s highest season total still make Pranav J a title threat, but Puka’s current IR tag leaves Coleman, Lamb and the rest of the active core carrying the load. Pranav P is next with a much deeper scoring performance behind him, so the Koopa Troop needs its supporting cast to turn up before first place becomes a shared custody arrangement.', sources: availabilitySources },
  { rosterId: 7, tier: 'The contender knocking', outlook: 'Third in season scoring and now 7–4, Pranav P has a Hubbard–McCaffrey backfield and enough receiving depth to make a real postseason run without needing a weekly miracle. With Lamar still on IR and Brown tagged doubtful with a hamstring issue, Daniels and the current starters remain central to a stretch that begins with the Pranav Bowl rematch.', sources: availabilitySources },
  { rosterId: 6, tier: 'The wildcard pilot', outlook: 'Sahil has grabbed the points-wildcard lead by 5.98, and the Prescott–Pickens pairing plus Emmett Johnson gives this 4–7 team far more punch than its record advertises. Anudeep and Pranav P are the next two opponents, and Walker’s return to limited practice makes Johnson’s future workload worth watching as the Jet Plane tries to hold its route.', sources: [nflSources.updates] },
  { rosterId: 4, tier: 'Defending a record berth', outlook: 'Ankith still holds the fifth record berth at 6–5, and Jeanty, Hall and McMillan give him a broader base than the Chase-or-bust version of this team. Sahit is the next chance to restore a win cushion, because scoring 157.34 and losing is unlucky once but an expensive habit with three games left.' },
  { rosterId: 5, tier: 'The wildcard challenger', outlook: 'Taaha’s 3–8 record makes the points route the main attraction, and a 5.98 deficit to Sahil keeps Smith-Njigba and Kyren firmly in the playoff conversation despite this week’s crater. Walker’s current groin-questionable tag makes the next backfield decision worth watching before Roshik arrives, because Burden of Proof cannot afford another case built around its kicker.', sources: availabilitySources },
  { rosterId: 3, tier: 'Contender on the ropes', outlook: 'Roshik’s 7–4 record still buys him a place in the top five, but four straight losses mean the Bijan-led rebound has to arrive before the cushion disappears. With Bowers questionable at the ankle, Jacobs questionable at the finger and Dobbins suspended for Week 12, the restaurant needs available staff more than excellent September reviews.', sources: [...availabilitySources, nflSources.jacobs, nflSources.updates] },
  { rosterId: 9, tier: 'Winning his way back', outlook: 'Aditya has three straight wins and a 6–5 record, but the tenth-highest season total means the clearest playoff route is winning games behind Mahomes, Cook and Collins. With Adams still on IR, the supporting receivers must keep the kitchen open through a direct bubble clash with Abhiram.', sources: availabilitySources },
  { rosterId: 10, tier: 'Bubble, with mouse ears', outlook: 'Abhiram’s 6–5 record keeps the record-berth chase alive, but another score around 106 will need a much friendlier opponent than he can count on down the stretch. Herbert entered concussion protocol after the Jets game, making the quarterback plan a live issue before the Aditya showdown, even with Irving, Jameson and McBride giving Buckster Batting a credible core.', sources: [...availabilitySources, nflSources.herbert] },
  { rosterId: 2, tier: 'Climbing out of trouble', outlook: 'Abhishek is 4–7 with the second-lowest season total, so the practical job is stacking wins behind Purdy, Evans and Montgomery rather than waiting for a points rescue. Marks’ concussion tag and Boston’s toe tag both read questionable today, making healthy depth useful against GarVeen as Zero Dark Purdy tries to complete a mission longer than one week.', sources: availabilitySources },
  { rosterId: 11, tier: 'Survival football', outlook: 'GarVeen is 3–8 and needs the Allen–Taylor–St Brown core to deliver more consistently if the final three games are going to change the ending. Abhishek and Sahit offer direct chances to improve the record, but Addison’s current doubtful thumb tag limits one possible reinforcement for a receiving group that just left DJ Moore doing the shouting.', sources: availabilitySources },
  { rosterId: 8, tier: 'Find a foothold', outlook: 'At 2–9 and last in season scoring, Sahit needs wins for the lower-table fight, with Barkley and Shakir offering a foundation that the supporting cast has not matched. Richardson is now the rostered quarterback and Tuten carries a questionable tag, so the immediate task before facing Ankith is finding a dependable lineup rather than printing another island tourism brochure.', sources: availabilitySources },
];
export const week11PowerRankings = outlooks.map(outlook => ({
  ...outlook, previousRank: week10PowerRankings.findIndex(team => team.rosterId === outlook.rosterId) + 1,
}));

interface Preview {
  matchupId: number; teamIds: number[]; billing: string; story: string;
  key: string; pickId: number; pickReason: string; sources?: Source[];
}
export const week12Previews: Preview[] = [
  {
    matchupId: 1, teamIds: [7, 12], billing: 'THE PRANAV BOWL: SAME NAME, NEW ARGUMENT.',
    story: 'Pranav J took the opener 148.22–111.16. Pranav P now arrives at 7–4 with consecutive scores of 190.36 and 166.16, while the 9–2 leader is coming off a loss. The old bragging rights are valid; the current challenge is considerably louder.',
    key: 'Hubbard, McCaffrey and a deep receiving group against Coleman, Lamb and the Koopa supporting cast. Puka remains on IR, while Pranav P must monitor Brown’s doubtful hamstring tag; neither forecast assumes those names are available.',
    pickId: 7, pickReason: 'Pranav P, narrowly. His recent depth earns the upset lean, but Pranav J still leads the league in season scoring; this is a prediction, not permission to start celebrating.', sources: availabilitySources,
  },
  {
    matchupId: 2, teamIds: [3, 5], billing: 'THE GARDEN VS THE COURTROOM. SOMEBODY HAS TO REOPEN.',
    story: 'Roshik escaped the opener by 5.76. Now he has lost four straight, Taaha has just slipped out of the wildcard spot, and their Week 11 totals occupied the bottom two places. Nobody is bringing that box score to the reunion voluntarily.',
    key: 'Roshik needs more around Bijan and Olave, with Bowers and Jacobs both on the current questionable list and Dobbins suspended for Week 12. Taaha’s JSN–Kyren core offers a scoring rebound, but Walker’s limited Tuesday return from the groin issue is progress, not a guaranteed full workload; check the active lineup before treating either roster as fully staffed.',
    pickId: 5, pickReason: 'Taaha by a narrow margin. His season scoring still exceeds Roshik’s by 91.02, and the wildcard deficit demands a response; the injury uncertainty keeps this far from a safe pick.', sources: [...availabilitySources, nflSources.jacobs, nflSources.updates],
  },
  {
    matchupId: 3, teamIds: [1, 6], billing: 'CAPTAIN KELCE MEETS THE JET AGAIN.',
    story: 'Anudeep won the opener 164.26–160.00, the kind of 4.26-point receipt nobody throws away. Sahil has just beaten Pranav J and now gets the other 9–2 team. The Jet Plane’s itinerary appears to have been written by someone who dislikes layovers.',
    key: 'Gibbs, Javonte and Kelce against Prescott, Pickens and Emmett Johnson. Walker’s limited return to Kansas City practice could affect Johnson’s workload; Anudeep is protecting a top-seed challenge while Sahil is protecting a wildcard lead of just 5.98.',
    pickId: 1, pickReason: 'Anudeep, narrowly, on the stronger season-long scoring base and a lineup that just produced 164.30 without a single 30-point starter. Sahil has already demonstrated exactly why that is not a comfortable pick.', sources: [nflSources.updates],
  },
  {
    matchupId: 4, teamIds: [2, 11], billing: 'ZERO DARK PURDY VS THE TWO-MAN RESCUE CREW.',
    story: 'GarVeen won the opener by 10.06. This time Abhishek is 4–7, Gary and Naveen are 3–8, and a win carries real weight near the bottom of the standings. The next round of season-saving speeches needs an actual scoreboard behind it.',
    key: 'Purdy and Evans just supplied 47.10; Allen and Taylor managed 18.86. LaPorta was estimated as a full participant Tuesday despite an ankle issue, a positive sign rather than a final game-status ruling. GarVeen has enough star power to reverse that comparison, but Metcalf and the supporting receivers need to do more than appear in the team photo.',
    pickId: 2, pickReason: 'Abhishek, slightly. His more balanced Week 11 production earns the lean, although an Allen–Taylor rebound could make this pick look very silly very quickly.', sources: [nflSources.laporta],
  },
  {
    matchupId: 5, teamIds: [4, 8], billing: 'THE BANK WANTS A REFUND. THE ISLAND WANTS A WIN.',
    story: 'Ankith won the opener 149.96–76.62. He now comes in off a 157.34-point loss while Sahit just missed a much lower-scoring chance by 6.52. For a 6–5 team defending a record berth, this is the kind of opportunity that cannot be filed under “we’ll get the next one.”',
    key: 'Jeanty and Hall give Ankith a strong backfield base; Sahit needs Barkley and Shakir backed by more consistent contributions. Richardson is now Sahit’s rostered quarterback, and Tuten is questionable, so last week’s Bryce Young score is not a forecast of this week’s lineup.',
    pickId: 4, pickReason: 'Ankith. His season scoring advantage is 333.10 and he just produced a top-three weekly score; Sahit needs a substantial jump, not merely a kinder fixture.', sources: availabilitySources,
  },
  {
    matchupId: 6, teamIds: [9, 10], billing: 'TWO AT 6–5. ONE VERY CROWDED PLAYOFF DOOR.',
    story: 'Abhiram won the opener 126.44–79.60, but Aditya has since found a three-game winning streak. Both are 6–5 and chasing the same record berths. This is a direct rival, a shrinking schedule and an excellent reason to stop calling a 106-point win “job done.”',
    key: 'Mahomes, Cook and Washington against Irving, Jameson and McBride. Herbert’s entry into concussion protocol after Week 11 makes Abhiram’s quarterback choice worth following, while Aditya still has Adams on IR; the winner needs contributions from the available supporting cast.',
    pickId: 9, pickReason: 'Aditya, narrowly, on the recent form and the Mahomes-led core. Abhiram has the higher season total by 149.10, so the mouse-ear jokes are not a reason to dismiss him.', sources: [...availabilitySources, nflSources.herbert],
  },
];
