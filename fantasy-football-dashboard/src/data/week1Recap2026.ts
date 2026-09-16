import snapshot from './week1Recap2026Snapshot.json';

const managerNames: Record<number, string> = {
  1: 'Anudeep', 2: 'Abhishek', 3: 'Roshik', 4: 'Ankith', 5: 'Taaha', 6: 'Sahil',
  7: 'Pranav P', 8: 'Sahit', 9: 'Aditya', 10: 'Abhiram', 11: 'Gary & Naveen', 12: 'Pranav J',
};

export const recapSource = snapshot;
export const recapTeams = snapshot.teams.map(team => {
  const result = snapshot.week1.find(row => row.roster_id === team.rosterId)!;
  const opponent = snapshot.week1.find(row => row.matchup_id === result.matchup_id && row.roster_id !== team.rosterId)!;
  return {
    ...team,
    manager: managerNames[team.rosterId],
    score: result.custom_points ?? result.points,
    record: (result.custom_points ?? result.points) === (opponent.custom_points ?? opponent.points) ? '0–0–1' : (result.custom_points ?? result.points) > (opponent.custom_points ?? opponent.points) ? '1–0' : '0–1',
    matchupId: result.matchup_id,
  };
});
export const getRecapTeam = (id: number) => recapTeams.find(team => team.rosterId === id)!;
export const formatScore = (value: number) => value.toFixed(2);
export const getStarter = (rosterId: number, playerId: string) => {
  const matchup = snapshot.week1.find(row => row.roster_id === rosterId)!;
  const index = matchup.starters.indexOf(playerId);
  if (index < 0) throw new Error(`Player ${playerId} did not start for roster ${rosterId}`);
  const player = (snapshot.players as Record<string, { name: string; position: string }>)[playerId];
  return { ...player, points: matchup.starters_points[index] };
};

export const week1Recaps = [
  {
    matchupId: 1, winnerId: 12, loserId: 7, xFactorId: '6790',
    billing: 'The Pranav Bowl', series: 'Pranav J leads the series 2–1',
    summary: 'Pranav J delivered another commanding Pranav Bowl performance, backing up last season’s playoff victory with a 37.06-point win. For Pranav P, the uncomfortable question is already back: was that impressive rookie season the start of a contender, or a first-year run he now has to prove he can repeat? One loss cannot answer it, but his rival has made sure Week 2 will be watched closely.',
    xFactor: 'D’Andre Swift’s 34.40 points gave Pranav J a lead the receiving stars did not have to manufacture. Swift and Cam Skattebo combined for 47.50, compared with 22.10 from Christian McCaffrey and Omarion Hampton. That 25.40-point advantage at the two RB slots did most of the separating.',
    lowlight: 'Zay Flowers delivered 29.50 for Pranav P, but George Kittle’s 3.20 and a combined 15.70 from the two flex slots left too little support. A roster built on balance opened with one clear standout and too many quiet positions.',
  },
  {
    matchupId: 2, winnerId: 3, loserId: 5, xFactorId: '8167',
    billing: 'The Record vs. Reality Game', series: 'Roshik leads the series 3–1',
    summary: 'Taaha seized a huge early lead. Roshik mounted the improbable Sunday comeback. Then Kenneth Walker threatened to overturn everything again on Monday with 37.60 points, the highest individual starter score in Amberwood this week. Roshik survived by 5.76; Taaha was left with 153.80, the league’s fourth-highest total, and a loss that neither side will forget quickly.',
    xFactor: 'Christian Watson supplied 36.20, the largest individual contribution in Roshik’s winning lineup. Paired with Chris Olave’s 30.20, he gave Roshik 66.40 from the two WR slots alone. Lamar Jackson and Bijan Robinson added another 54.26 to withstand Kenneth Walker’s 37.60 on the other side.',
    lowlight: 'Taaha’s Harold Fannin and Quentin Johnston combined for 7.80. Juwan Johnson scored 14.40 on the bench and Deebo Samuel had 18.00; either corresponding swap would have erased the margin in hindsight. Roshik also survived a zero from Romeo Doubs. Neither manager can call the lineup work finished.',
  },
  {
    matchupId: 3, winnerId: 1, loserId: 6, xFactorId: '1466',
    billing: 'Game of the Week', series: 'Anudeep leads the series 4–2',
    summary: 'The game stayed alive until the final day, when Anudeep’s long-serving captain Travis Kelce helped carry him past the defending champion. Anudeep finished with a league-high 164.26; Sahil had 160.00 and a 4.26-point defeat. Rivalry Week demanded a closer, and the familiar captain answered.',
    xFactor: 'Kelce’s 10.10 was not the biggest number in Anudeep’s lineup, but it was the last-day contribution that saved the matchup. Remove it and 164.26 becomes 154.16, below Sahil’s 160.00. Jalen Coker’s 37.30, Jahmyr Gibbs’ 35.60 and Javonte Williams’ 24.20 built the platform; the captain helped finish the job.',
    lowlight: 'George Pickens managed 5.80, while Sahil’s kicker and defense combined for just 5.50. Anudeep got 20.30 from those same two slots—a 14.80-point difference in a 4.26-point game. This was a championship-level scoring effort undone by the margins around it.',
  },
  {
    matchupId: 4, winnerId: 11, loserId: 2, xFactorId: '4984',
    billing: 'The Streak vs. the Cannon', series: 'The series is tied 3–3',
    summary: 'Gary came out of retirement, joined Naveen at the controls, and GarVeen’s first game under the partnership became a statement. The 146.16–136.10 win over Abhishek leveled the rivalry at 3–3 and ended Abhishek’s three-game run in the series. Their top-heavy lineup made the opening argument for the new management team.',
    xFactor: 'Josh Allen delivered 34.66 against Brock Purdy’s 21.10: a 13.56-point QB advantage, larger than the final margin. Jonathan Taylor, Amon-Ra St. Brown and DJ Moore combined for 77.30. The core that was supposed to carry GarVeen did exactly that when the rivalry demanded it.',
    lowlight: 'Abhishek’s kicker and defense contributed only 7.00, while no starter cleared 22.00. Gary has his own work to do: MarShawn Lloyd, Kenny Gainwell and Harrison Mevis totaled 7.50, with Dalton Kincaid’s 20.00 and Stefon Diggs’ 15.50 sitting on the bench. Winning did not make that supporting cast reliable.',
  },
  {
    matchupId: 5, winnerId: 4, loserId: 8, xFactorId: '11560',
    billing: 'The Rivalry Reckoning', series: 'Ankith leads the series 5–3',
    summary: 'Ankith controlled this rivalry all week and finished 73.34 points clear, the widest margin of the opener. For Patriots fan Sahit, the Drake Maye–A.J. Brown stack was supposed to carry extra meaning. Instead, it produced 15.42 combined, in front of a league full of Eagles fans with their own feelings about Brown’s departure. The scoreboard left Sahit with no counterargument.',
    xFactor: 'Caleb Williams put up 37.26, the highest starting-QB score in Amberwood this week. Ashton Jeanty supplied 34.70 and David Montgomery added 28.90. Those three combined for 100.86—already more than Sahit’s entire 76.62-point lineup.',
    lowlight: 'Sahit’s starting WRs and TE combined for 6.80: A.J. Brown at 5.60, Jaylen Waddle at 1.20 and Colston Loveland at zero. Pittsburgh’s defense led the team with 17.00. There is too much established talent here to declare the season over, but Rivalry Week exposed a need for answers immediately.',
  },
  {
    matchupId: 6, winnerId: 10, loserId: 9, xFactorId: '8130',
    billing: 'The Scoreboard Shootout', series: 'Aditya leads the series 3–2',
    summary: 'Abhiram cut into Aditya’s historical lead with a controlled 46.84-point victory. Ayy - shane.com reached 126.44 without a huge receiving day; Cookin Sutton Biryani stalled at 79.60 with major production left outside the starting lineup.',
    xFactor: 'Trey McBride’s 24.50 was Abhiram’s highest individual score and a full 24.50-point edge over Kyle Pitts at tight end. Chuba Hubbard added 23.70 from a flex slot and Bucky Irving supplied 20.30. The RB-and-TE foundation gave Abhiram three substantial contributions to build the win around.',
    lowlight: 'Aditya started Matthew Stafford for 4.10 and Pitts for zero while Patrick Mahomes scored 21.66 and Dallas Goedert scored 24.20 on the bench. Those two hindsight changes would have recovered 41.76 points—still 5.08 short. Abhiram, meanwhile, won despite a zero from Jordan Addison.',
  },
];

// NFL reporting is kept separate from league-specific scoring and editorial inference.
export const nflConnections: Record<number, { text: string; sources: { label: string; url: string }[] }> = {
  1: {
    text: 'The NFL headline belonged to Swift, too: 124 rushing yards and three touchdowns earned NFC Offensive Player of the Week. Chicago’s 59-point opener powered both Pranav J’s backfield and Ankith’s Caleb Williams—a shared source of firepower before their Week 2 collision.',
    sources: [{ label: 'Bears: Swift’s Week 1 award', url: 'https://www.chicagobears.com/news/d-andre-swift-named-nfc-offensive-player-of-the-week-week-1-2026' }],
  },
  2: {
    text: 'Watson caught six passes for 147 yards and two touchdowns, including an 81-yard strike, even as Green Bay lost. Walker then delivered a career-best 191 scrimmage yards and broke 14 tackles in his Chiefs debut. Two national highlight performances became the opposing forces in Amberwood’s wildest comeback story.',
    sources: [
      { label: 'Packers: Watson’s explosive opener', url: 'https://www.packers.com/news/game-recap-5-takeaways-from-packers-season-opening-loss-to-vikings-week-1-2026' },
      { label: 'Chiefs: Walker’s debut', url: 'https://www.chiefs.com/news/10-quick-facts-following-the-chiefs-week-1-win-over-denver-upon-further-review' },
    ],
  },
  3: {
    text: 'Kelce’s night also moved him past Jason Witten into second place in career receiving yards by a tight end. A place in the NFL record book and a rescue for Anudeep: the captain’s value was not measured by having the biggest score, but by answering when the game still needed him.',
    sources: [{ label: 'Chiefs: Kelce’s milestone', url: 'https://www.chiefs.com/news/10-quick-facts-following-the-chiefs-week-1-win-over-denver-upon-further-review' }],
  },
  5: {
    text: 'New England’s opener supplied the grim backdrop: Maye threw three fourth-quarter interceptions, while Brown’s debut ended early with an ankle injury after three catches for 26 yards. Sahit’s stack did not merely have a quiet night; its quarterback faltered and its new receiver could not finish.',
    sources: [{ label: 'Patriots: what went wrong in Seattle', url: 'https://www.patriots.com/news/game-observations-8-takeaways-from-the-patriots-loss-to-the-seahawks-in-week-1' }],
  },
};

export const week2Availability = [
  { text: 'Sahit must navigate A.J. Brown’s move to injured reserve; the Patriots announced the transaction September 12.', label: 'Patriots roster update', url: 'https://www.patriots.com/news/patriots-sign-veteran-dt-daquan-jones-and-place-wr-a-j-brown-on-ir' },
  { text: 'Taaha loses Jordan Mason to IR after a thumb injury, adding urgency to his RB2 decision.', label: 'Vikings roster update', url: 'https://www.vikings.com/news/jordan-mason-injured-reserve-deejay-dallas-signing-2026' },
  { text: 'Abhiram’s current QB choice, Carson Wentz, threw three touchdowns after replacing injured Kyler Murray in Minnesota’s opener. The fantasy opportunity is worth watching; his Week 2 role still needs confirmation.', label: 'Packers–Vikings recap', url: 'https://www.packers.com/news/game-recap-5-takeaways-from-packers-season-opening-loss-to-vikings-week-1-2026' },
  { text: 'Anudeep’s breakout receiver Jalen Coker was limited Wednesday with an ankle issue. No final game designation had been assigned in the published report.', label: 'Panthers injury report', url: 'https://www.panthers.com/team/injury-report/' },
];

// Editorial season-outlook order, weighed against the published preseason order.
// This is deliberately not the Week 1 points leaderboard or a set of betting odds.
export const week1PowerRankings = [
  { rosterId: 12, previousRank: 1, tier: 'Title standard',
    outlook: 'Pranav J stays on top. A 148.22-point win with only 20.70 combined from Puka Nacua and DeVonta Smith shows a route to victory beyond a receiver avalanche. Swift’s 34.40 and Kyle Monangai’s 23.90 on the bench strengthen the roster’s weakest preseason position.',
    watch: 'Monangai gives Pranav J a genuine lineup decision. The next test is sustaining the RB production when Swift is not scoring at this pace.' },
  { rosterId: 4, previousRank: 2, tier: 'Title standard',
    outlook: 'Ankith’s quarterback question has a convincing opening answer: Caleb Williams scored 37.26 and Jaxson Dart added 25.60 on the bench. Jeanty and Montgomery supplied 63.60. Winning at 149.96 with Chase held to 3.20 leaves room for this ceiling to rise.',
    watch: 'The starting WR slots combined for 8.90. They need to contribute when the QB and running backs cool off.' },
  { rosterId: 1, previousRank: 3, tier: 'Title standard',
    outlook: 'Anudeep defended his top-three position by beating the champion and leading the league in scoring. Gibbs, Javonte Williams and Love give the running game several paths to points; Coker’s 37.30 supplied the receiving breakthrough this roster needed.',
    watch: 'Coker was limited in Wednesday practice with an ankle issue. His 37-point performance is evidence of upside, not a weekly baseline.' },
  { rosterId: 3, previousRank: 6, tier: 'Title challenger',
    outlook: 'Roshik rises two places as Olave and Watson answer the preseason WR doubts with a combined 66.40. Lamar and Bijan remain the foundation, and 159.56 without a scoring contribution from benched Brock Bowers is a substantial opening statement.',
    watch: 'Bowers is listed questionable, and the two flex slots produced just 8.30 combined.' },
  { rosterId: 6, previousRank: 4, tier: 'Title challenger',
    outlook: 'Sahil drops only one place despite the loss. The champion’s 160.00 would have gone 10–1 against the full league, and Henry, Jefferson and Isaiah Likely combined for 95.30. The title defense remains credible; the matchup draw was simply brutal.',
    watch: 'Pickens and the kicker/defense slots left too little margin for error. A second loss would add pressure, not erase this ceiling.' },
  { rosterId: 11, previousRank: 9, tier: 'Playoff pressure',
    outlook: 'Gary climbs after Allen, Taylor, St. Brown and Moore combined for 111.96 in a rivalry win. Kincaid and Diggs both supplied useful scores on the bench, suggesting the supporting lineup can improve without needing another star to arrive.',
    watch: 'The RB2 and two flex slots combined for 14.30. The stars cannot cover every thin spot for an entire season.' },
  { rosterId: 5, previousRank: 11, tier: 'Playoff pressure',
    outlook: 'Taaha makes the largest climb despite starting 0–1. Walker’s 37.60, Smith-Njigba’s 28.70 and Lawrence’s 26.10 drove a 153.80-point effort that would have beaten eight other teams. The record hides a much more competitive roster than the preseason forecast.',
    watch: 'Jordan Mason is listed on IR. Available RB depth and cleaner TE/flex choices matter more than repeating one enormous Walker game.' },
  { rosterId: 2, previousRank: 7, tier: 'Playoff pressure',
    outlook: 'Abhishek’s balance remains real: Hall, Purdy, McConkey and Brown each scored at least 18.80. A 136.10-point loss is no collapse, but the roster still needs a player who can create the sort of advantage Allen created against it.',
    watch: 'McConkey is listed questionable. The receiving depth has to hold up, and the kicker/defense return needs to improve.' },
  { rosterId: 7, previousRank: 5, tier: 'Response required',
    outlook: 'Pranav P falls after the 111.16-point opener, but the roster retains more season-long upside than that single result. Flowers delivered 29.50; McCaffrey, Hampton, Nabers and Kittle give him credible ways to recover production across several positions.',
    watch: 'The supposed depth produced only 15.70 from the flex slots. Week 2 against Sahil is a demanding test of the rebound case.' },
  { rosterId: 10, previousRank: 12, tier: 'Response required',
    outlook: 'Abhiram moves up two places with an opening win and a 68.50-point combined return from McBride, Hubbard and Irving. The RB-and-TE strength is tangible. The ranking stays measured because 126.44 was only ninth in the league and the receiving production remained limited.',
    watch: 'Quarterback and the second wave of receivers must become dependable before this looks like a sustained contender.' },
  { rosterId: 9, previousRank: 8, tier: 'Response required',
    outlook: 'Aditya’s 79.60 demands a reset, but Mahomes and Goedert supplied immediate alternatives on the bench. Collins and Parker Washington combined for 40.50. Better deployment can close much of the gap; one poor lineup does not exhaust this roster’s options.',
    watch: 'James Cook and the rest of the starting skill group need to turn those alternatives into a weekly floor.' },
  { rosterId: 8, previousRank: 10, tier: 'Response required',
    outlook: 'Sahit reaches the bottom after a league-low 76.62, with no offensive starter above 10.60. Barkley, Maye and Loveland still offer a rebound case, but the opening result and A.J. Brown’s current IR designation make the early path more difficult.',
    watch: 'A usable receiving combination and production from tight end are urgent needs before Gary arrives in Week 2.' },
];

export const week2Previews = [
  { matchupId: 1, teamIds: [6, 7], billing: 'No room for another concession',
    story: 'Sahil scored 160.00 and lost; Pranav P scored 111.16 and lost. The records match, but the performances do not. One of these established contenders is heading toward an 0–2 start unless the game ends tied, and neither can afford to treat this as an ordinary September fixture.',
    key: 'Henry and Jefferson give Sahil the stronger opening evidence. Pranav P needs McCaffrey and Hampton to improve on their combined 22.10 and give Flowers meaningful support.',
    pickId: 6, pickReason: 'Sahil’s broader scoring base earns the edge, though a return to form from Pranav P’s core would change the contest quickly.' },
  { matchupId: 2, teamIds: [2, 3], billing: 'Depth meets the big-play offense',
    story: 'Abhishek’s balanced lineup gets another test against an opponent capable of winning through a few stars. Roshik arrives at 1–0 after surviving Taaha; Abhishek needs to stop a good opening performance from becoming a second close loss.',
    key: 'Hall and Brown combined for 40.60 in Week 1. They must keep Abhishek close enough to challenge Roshik’s Lamar–Bijan core, while Olave and Watson try to show their 66.40-point partnership has staying power.',
    pickId: 3, pickReason: 'Roshik has more demonstrated separation at the top. Abhishek’s route is steady contributions across the full lineup.' },
  { matchupId: 3, teamIds: [4, 12], billing: 'The top two put their rankings on the line',
    story: 'The preseason No. 1 and No. 2 teams both won their rivalry openers. Now they meet with identical 1–0 records and only 1.74 points between their Week 1 totals. This is the clearest early test of who deserves to set the championship standard.',
    key: 'Ankith’s RB production challenges the Swift–Skattebo combination, while Pranav J’s receiver depth meets Chase and Rice. The September 16 lineup snapshot has Dart in Ankith’s QB slot after Caleb’s 37.26-point opener. That choice deserves close attention before kickoff.',
    pickId: 12, pickReason: 'A narrow lean to Pranav J on receiving depth. This is the least comfortable pick on the card; Ankith has already shown he can win without a big Chase game.' },
  { matchupId: 4, teamIds: [5, 9], billing: 'Two losses, two very different responses',
    story: 'Taaha’s 153.80 and Aditya’s 79.60 produced the same record. That is the trap in reading the standings after one week. Taaha needs to turn competitive scoring into a win; Aditya needs to turn a bench full of answers into a functioning starting lineup.',
    key: 'The current snapshot puts Mahomes and Goedert into Aditya’s lineup after their combined 45.86 on the bench. Taaha counters with Walker and Smith-Njigba, but must replace Mason, who is listed on IR.',
    pickId: 5, pickReason: 'Taaha’s stronger opening core gets the nod. Aditya’s QB and TE changes make a much closer game plausible.' },
  { matchupId: 5, teamIds: [1, 10], billing: 'An unbeaten record has to be defended',
    story: 'Anudeep enters with the league’s highest score; Abhiram arrives with a 46.84-point victory. Both are 1–0, but Abhiram now faces a very different standard than the one required in his opener. Anudeep has already shown what it takes to beat a contender.',
    key: 'Gibbs and Anudeep’s RB depth meet Abhiram’s McBride-led strength at TE and flex. Coker was limited Wednesday with an ankle issue, while the current snapshot has Carson Wentz at quarterback for Abhiram. Those lineup developments matter as much as last week’s totals.',
    pickId: 1, pickReason: 'Anudeep’s depth earns the lean. Abhiram can narrow it by winning tight end again and finding steadier quarterback production.' },
  { matchupId: 6, teamIds: [8, 11], billing: 'The floor has to rise',
    story: 'Gary can convert a rivalry win into a 2–0 start. Sahit has to respond to the week’s heaviest defeat with Brown currently listed on IR. There is no point arguing preseason pedigree here: the starting lineup must deliver evidence.',
    key: 'Maye and Barkley need a much larger return than their combined 18.82. Gary brings Allen, Taylor and St. Brown, and the current lineup also promotes Kincaid and Diggs after productive bench appearances.',
    pickId: 11, pickReason: 'Gary has the clearer scoring foundation. Sahit needs improvement across multiple positions to overturn that advantage.' },
];
