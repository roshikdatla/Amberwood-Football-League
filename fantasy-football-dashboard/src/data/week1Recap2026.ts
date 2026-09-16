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
    summary: 'New season, same headache for Pranav P. Pranav J followed up last year’s playoff win by taking the Pranav Bowl by 37.06—and he barely needed his star receivers to get going. D’Andre Swift ran for 124 yards and three touchdowns in Chicago’s 59-point explosion, picked up NFC Offensive Player of the Week, and took this rivalry with him. Now the question follows Pranav P into Week 2: was that rookie run the real deal, or did everything just break his way? Time to answer back.',
    xFactor: 'Swift brought 34.40 points to the party. Add Cam Skattebo and Pranav J got 47.50 from his two running backs; McCaffrey and Hampton managed 22.10 for Pranav P. That is a 25.40-point hole before the receivers even enter the conversation. Swift did the heavy lifting, and nobody on the other side could lift it back.',
    lowlight: 'Zay Flowers put up 29.50 and looked around for help. Kittle? 3.20. The two flex spots? 15.70 combined. Pranav P has the names to fight back, but Flowers could not play every position for him.',
  },
  {
    matchupId: 2, winnerId: 3, loserId: 5, xFactorId: '8167',
    billing: 'Somebody Had to Survive', series: 'Roshik leads the series 3–1',
    summary: 'Somebody check on these two. Taaha jumped out early, then Roshik roared back Sunday with Christian Watson hauling in 147 yards and two touchdowns, including an 81-yard strike. Surely that was enough? Kenneth Walker had other ideas. His Chiefs debut brought a career-best 191 scrimmage yards and 37.60 fantasy points, sending Taaha charging back on Monday. Roshik hung on by 5.76. Taaha scored 153.80, watched a comeback nearly become a comeback to the comeback, and still walked away 0–1. Brutal.',
    xFactor: 'Watson’s 36.20 kept Roshik in this fight, and Chris Olave added 30.20. That is 66.40 from two receivers. Throw in 54.26 from Lamar and Bijan, and Roshik had just enough to withstand Walker’s Monday-night rampage. Just enough is doing a lot of work there.',
    lowlight: 'This is the part Taaha will keep replaying: Fannin and Quentin Johnston combined for 7.80, while Juwan Johnson had 14.40 and Deebo had 18.00 on the bench. In hindsight, either corresponding swap flips the result. Roshik got away with a Romeo Doubs zero, too. He gets the win; neither manager gets a perfect lineup grade.',
  },
  {
    matchupId: 3, winnerId: 1, loserId: 6, xFactorId: '1466',
    billing: 'Game of the Week', series: 'Anudeep leads the series 4–2',
    summary: 'You put up 160 in the opener, you expect to celebrate. Not this week, Sahil. With the rivalry still on the line heading into the final day, Anudeep turned to the man who has worn the captain’s armband for years: Travis Kelce. The veteran passed Jason Witten for second on the NFL’s all-time tight end receiving-yardage list—and helped drag Anudeep over the line, 164.26–160.00. The captain still had one more rescue in him. The defending champ got a 4.26-point gut punch.',
    xFactor: 'Coker dropped 37.30, Gibbs brought 35.60 and Javonte Williams added 24.20. Huge nights, all of them. But when it came down to finishing the job, Kelce’s 10.10 mattered most. Take those points away and Anudeep is sitting at 154.16, staring up at Sahil. That is why the captain gets the nod.',
    lowlight: 'Pickens gave Sahil 5.80, and the kicker-defense combination scraped together 5.50. Anudeep got 20.30 from his kicker and defense. A 14.80-point swing in a game decided by 4.26? That will hurt every time Sahil opens the box score.',
  },
  {
    matchupId: 4, winnerId: 11, loserId: 2, xFactorId: '4984',
    billing: 'Welcome Back, Gary', series: 'The series is tied 3–3',
    summary: 'So much for easing out of retirement. Gary teamed up with Naveen, handed the keys to the stars, and GarVeen came out swinging: 146.16–136.10 over Abhishek. Allen, Taylor, Amon-Ra and DJ Moore did exactly what a top-heavy lineup needs its big names to do. Abhishek’s three-game winning streak in this rivalry? Gone. The series is tied 3–3, and the new partnership has its first win on the board. Welcome back to Amberwood.',
    xFactor: 'Josh Allen put up 34.66 to Purdy’s 21.10. That 13.56-point quarterback gap was bigger than the final margin. Taylor, Amon-Ra and Moore piled on another 77.30, but Allen was the difference-maker at the controls. When GarVeen needed its biggest star, he played like one.',
    lowlight: 'Abhishek had plenty of decent scores and nobody above 22.00. Against Allen, decent was not quite enough. GarVeen should still check the bench before taking a victory lap: Kincaid scored 20.00 and Diggs had 15.50, while Lloyd, Gainwell and Mevis combined for 7.50 in the lineup. There is a better version of this team waiting to be picked.',
  },
  {
    matchupId: 5, winnerId: 4, loserId: 8, xFactorId: '11560',
    billing: 'The Rivalry Reckoning', series: 'Ankith leads the series 5–3',
    summary: 'Ankith ran this one from start to finish. A 73.34-point beatdown, and somehow the Patriots part made it even worse for Sahit. Maye threw three fourth-quarter interceptions in Seattle; Brown’s debut ended with an ankle injury after three catches for 26 yards. The stack returned 15.42 combined. For a Patriots fan facing a league full of Eagles fans still sore about Brown’s departure, that is a long week. Meanwhile, Caleb Williams rode Chicago’s 59-point eruption and Ankith never looked back.',
    xFactor: 'Caleb’s 37.26 led every starting quarterback in Amberwood. Jeanty added 34.70 and Montgomery chipped in 28.90. Stop right there: those three alone scored 100.86, comfortably more than Sahit’s entire lineup. Ankith did not need a big day from Chase to turn this into a rout.',
    lowlight: 'Brown: 5.60. Waddle: 1.20. Loveland: zero. Sahit got 6.80 from his starting receivers and tight end, and Pittsburgh’s defense led the team with 17.00. When the defense is carrying the offense in fantasy, you know it has been a rough one.',
  },
  {
    matchupId: 6, winnerId: 10, loserId: 9, xFactorId: '8130',
    billing: 'No Late Drama Required', series: 'Aditya leads the series 3–2',
    summary: 'While the rest of Amberwood was sweating out comebacks, Abhiram took care of business. McBride, Hubbard and Irving did the damage, Aditya never found an answer, and this one finished 126.44–79.60. No last-day rescue. No frantic finish. Just a comfortable 46.84-point win that cuts Aditya’s rivalry lead to 3–2. Abhiram will happily take the quietest victory on a very loud weekend.',
    xFactor: 'McBride gave Abhiram 24.50 at tight end. Pitts gave Aditya nothing. That is an entire star performance separating the teams at one position. With Hubbard’s 23.70 and Irving’s 20.30 backing him up, McBride made sure this game never needed a receiving explosion.',
    lowlight: 'Aditya left the answers on the bench: Mahomes had 21.66, Goedert had 24.20, and their starting replacements managed 4.10 combined. Make both swaps in hindsight and you recover 41.76—but still lose by 5.08. Even the what-if game belonged to Abhiram, who survived an Addison zero without a scare.',
  },
];

type ReportingSource = { label: string; url: string };
const bearsReport = { label: 'Bears: Swift’s Week 1 award', url: 'https://www.chicagobears.com/news/d-andre-swift-named-nfc-offensive-player-of-the-week-week-1-2026' };
const chiefsReport = { label: 'Chiefs: Walker’s debut and Kelce’s milestone', url: 'https://www.chiefs.com/news/10-quick-facts-following-the-chiefs-week-1-win-over-denver-upon-further-review' };
const packersReport = { label: 'Packers: Watson’s opener and Wentz’s relief appearance', url: 'https://www.packers.com/news/game-recap-5-takeaways-from-packers-season-opening-loss-to-vikings-week-1-2026' };

// Inline references support the reporting woven into each matchup's story.
export const recapReportingSources: Record<number, ReportingSource[]> = {
  1: [bearsReport],
  2: [packersReport, chiefsReport],
  3: [chiefsReport],
  5: [{ label: 'Patriots: what went wrong in Seattle', url: 'https://www.patriots.com/news/game-observations-8-takeaways-from-the-patriots-loss-to-the-seahawks-in-week-1' }, bearsReport],
};
export const previewReportingSources: Record<number, ReportingSource[]> = {
  4: [{ label: 'Vikings: Mason placed on IR', url: 'https://www.vikings.com/news/jordan-mason-injured-reserve-deejay-dallas-signing-2026' }],
  5: [packersReport, { label: 'Panthers: Wednesday injury report', url: 'https://www.panthers.com/team/injury-report/' }],
  6: [{ label: 'Patriots: Brown placed on IR', url: 'https://www.patriots.com/news/patriots-sign-veteran-dt-daquan-jones-and-place-wr-a-j-brown-on-ir' }],
};

// Editorial season-outlook order, weighed against the published preseason order.
// This is deliberately not the Week 1 points leaderboard or a set of betting odds.
export const week1PowerRankings = [
  { rosterId: 12, previousRank: 1, tier: 'Title standard',
    outlook: 'The No. 1 chair still belongs to Pranav J. He put up 148.22 with Puka Nacua and DeVonta Smith combining for just 20.70. Swift delivered 34.40, and Kyle Monangai left another 23.90 on the bench. Remember the worries about this backfield? Pranav J has a pretty good opening answer.',
    watch: 'Monangai is knocking on the starting lineup’s door. Pranav J needs the right answer when Swift comes back to earth.' },
  { rosterId: 4, previousRank: 2, tier: 'Title standard',
    outlook: 'Caleb Williams dropped 37.26, Jaxson Dart had 25.60 on the bench, and suddenly Ankith’s quarterback problem is choosing one. Jeanty and Montgomery piled on 63.60. Chase gave him 3.20 and he still reached 149.96. That is a lot of trouble for the rest of Amberwood if the receivers join in.',
    watch: 'The starting WR slots managed 8.90. Chase and company cannot keep leaving the entire bill to the quarterbacks and running backs.' },
  { rosterId: 1, previousRank: 3, tier: 'Title standard',
    outlook: 'Beat the champion. Lead the league in points. Anudeep did both, and he keeps his top-three seat. Gibbs, Javonte Williams and Love make this backfield a weekly handful, while Jalen Coker’s 37.30 gave the receiving corps a new headliner. Kelce made sure all that work ended with a win.',
    watch: 'Coker was limited Wednesday with an ankle issue. Enjoy the 37-point fireworks; check the injury report before asking for an encore.' },
  { rosterId: 3, previousRank: 6, tier: 'Title challenger',
    outlook: 'Olave and Watson heard the questions about Roshik’s receivers and answered with 66.40. Add Lamar and Bijan, and you can see why he climbs two places. He survived Taaha with 159.56 while Brock Bowers sat on the bench. Get the tight end back and this lineup becomes an even tougher assignment.',
    watch: 'Bowers is listed questionable. The flex pair managed only 8.30, so Roshik still has a couple of seats to fill properly.' },
  { rosterId: 6, previousRank: 4, tier: 'Title challenger',
    outlook: 'Imagine posting 160.00 and having to explain an 0–1 record to the group chat. That is the champion’s welcome back. Sahil would have gone 10–1 against the full league; Henry, Jefferson and Isaiah Likely supplied 95.30. He slips one place, but nobody should be lining up to face this team.',
    watch: 'Pickens, the kicker and the defense owe Sahil a better week. The champion does not want the conversation turning to 0–2.' },
  { rosterId: 11, previousRank: 9, tier: 'Playoff pressure',
    outlook: 'GarVeen jumps three places, and Gary and Naveen have their stars to thank. Allen, Taylor, St. Brown and Moore brought 111.96 to the rivalry. Kincaid and Diggs were sitting on useful scores, too. There is more available here if the new partnership gets the lineup calls right.',
    watch: 'RB2 and both flex slots combined for 14.30. GarVeen’s supporting cast needs to earn its place beside those headliners.' },
  { rosterId: 5, previousRank: 11, tier: 'Playoff pressure',
    outlook: 'Taaha takes the biggest jump on the board while sitting at 0–1. Walker’s 37.60, Smith-Njigba’s 28.70 and Lawrence’s 26.10 dragged Roshik into a fight. That 153.80 would have beaten eight other teams. The preseason doubters have some explaining to do, even if Taaha still needs his first win.',
    watch: 'Jordan Mason is on IR. Taaha needs an RB replacement and sharper TE/flex calls; Walker cannot rescue every difficult Sunday.' },
  { rosterId: 2, previousRank: 7, tier: 'Playoff pressure',
    outlook: 'Hall, Purdy, McConkey and Brown all reached 18.80. Abhishek has plenty of players doing their jobs, but 136.10 still left him watching GarVeen celebrate. Somebody has to grab a matchup the way Allen grabbed this one. Until then, the balanced roster stays in the chasing pack.',
    watch: 'McConkey is listed questionable. Keep an eye on him, and get more than a cameo from the kicker and defense.' },
  { rosterId: 7, previousRank: 5, tier: 'Response required',
    outlook: 'Flowers brought 29.50 to the Pranav Bowl. Too much of the rest of the lineup watched him work. The 111.16 opener sends Pranav P down the board, but McCaffrey, Hampton, Nabers and Kittle make it far too early to write him off. Those names need to start showing up on the scoreboard.',
    watch: 'Two flex slots, 15.70 points. The depth was supposed to be a strength, and Sahil is arriving to test it again.' },
  { rosterId: 10, previousRank: 12, tier: 'Response required',
    outlook: 'Abhiram is off the bottom and up two places. McBride, Hubbard and Irving delivered 68.50 and made sure his season started with a win. Hold the victory parade, though: 126.44 ranked ninth this week, and the receivers were quiet. Anudeep will demand considerably more than Aditya did.',
    watch: 'The running backs and tight end did their part. Now Abhiram needs a quarterback he can trust and receivers who join the fight.' },
  { rosterId: 9, previousRank: 8, tier: 'Response required',
    outlook: '79.60 is an ugly opening number, especially with Mahomes and Goedert sitting on the bench. Collins and Parker Washington carried 40.50 of the load; help was available, just in the wrong places. Aditya has changes he can make immediately. Another week like this will be harder to explain.',
    watch: 'James Cook needs to get going. Fixing the quarterback and tight end calls will only take Aditya so far.' },
  { rosterId: 8, previousRank: 10, tier: 'Response required',
    outlook: 'Last place on the board after 76.62, with no offensive starter above 10.60. Sahit knows how bad that sounds. Barkley, Maye and Loveland can give him a way back, but A.J. Brown going to IR makes the job tougher. The response has to come from the players still available.',
    watch: 'Find a receiving pair and get Loveland involved. GarVeen is coming, and another quiet offense will invite another long week.' },
];

export const week2Previews = [
  { matchupId: 1, teamIds: [6, 7], billing: 'Somebody is staring at 0–2',
    story: 'Sahil scored 160.00 and lost. Pranav P scored 111.16 and lost. Now the champion and the Pranav Bowl loser meet with something to answer for. Barring a tie, one leaves 0–2—and this league will absolutely have something to say about it.',
    key: 'Henry and Jefferson looked ready for another title run. Pranav P needs McCaffrey and Hampton to get past their combined 22.10 and stop asking Flowers to carry the argument alone.',
    pickId: 6, pickReason: 'Give me Sahil. Pranav P has the names to make this uncomfortable, but the champion showed up with more players ready to deliver.' },
  { matchupId: 2, teamIds: [2, 3], billing: 'Roshik wants an encore',
    story: 'Roshik escaped Taaha and walks in at 1–0 with Olave and Watson flying. Abhishek just watched Josh Allen take over a matchup; now Lamar and Bijan are waiting. Another respectable loss will not make him feel any better about September.',
    key: 'Hall and Brown brought 40.60 last week. Abhishek needs that backfield punching again, because Olave and Watson just put 66.40 on tape. Keep those receivers from running away with it, and this becomes a proper fight.',
    pickId: 3, pickReason: 'Roshik gets the call. Abhishek can wear him down across the lineup, but Lamar, Bijan and those receivers are a difficult group to contain.' },
  { matchupId: 3, teamIds: [4, 12], billing: 'No. 1 vs. No. 2. Settle it on the field.',
    story: 'Here comes the main event. The preseason No. 1 and No. 2 both won, both sit 1–0, and their opening totals were separated by 1.74. Ankith and Pranav J get an early chance to settle who belongs at the top of this league.',
    key: 'Swift and Skattebo meet Ankith’s backfield; Chase and Rice take on Pranav J’s receivers. And here is the QB wrinkle: as of September 16, Ankith has Dart starting after Caleb’s 37.26. Keep watching that lineup right up to kickoff.',
    pickId: 12, pickReason: 'Pranav J, narrowly. His receiving depth gets my vote, but this is the pick most likely to have the booth sweating on Sunday.' },
  { matchupId: 4, teamIds: [5, 9], billing: 'Time to turn the argument into a win',
    story: 'Taaha brought 153.80. Aditya brought 79.60. Both got handed an 0–1 record. Taaha wants a win to go with the respect; Aditya needs to get his best answers off the bench before another opponent gets comfortable.',
    key: 'As of September 16, Mahomes and Goedert are in after leaving 45.86 on Aditya’s bench. Taaha still has Walker and Smith-Njigba, but Mason’s thumb injury has sent him to IR. That replacement decision now belongs in the middle of this fight.',
    pickId: 5, pickReason: 'Taaha gets his first win. Moving Mahomes and Goedert in should make Aditya tougher to handle, but Walker and Smith-Njigba get the nod.' },
  { matchupId: 5, teamIds: [1, 10], billing: 'Welcome to a tougher assignment',
    story: 'Abhiram won by 46.84. Anudeep led the entire league in points. Both arrive 1–0, but Abhiram is stepping into a much tougher room this week: the team that just beat the champion is waiting for him.',
    key: 'McBride gives Abhiram a way to hit back at Gibbs and Anudeep’s backfield. As of September 16, he has Wentz at QB after that three-touchdown relief appearance; the Week 2 role still needs confirmation. Anudeep is watching Coker’s ankle after a limited Wednesday practice, with no final game designation yet.',
    pickId: 1, pickReason: 'Anudeep. Abhiram needs McBride to own tight end again and his quarterback call to land; Anudeep has more places to find a big afternoon.' },
  { matchupId: 6, teamIds: [8, 11], billing: 'GarVeen smells a 2–0 start',
    story: 'Gary and Naveen have GarVeen rolling into Week 2 with a rivalry win. Sahit is trying to get off the canvas, and Brown’s September 12 move to IR makes that harder. The Patriots stack is on hold; the rest of this lineup has to answer.',
    key: 'Maye and Barkley combined for 18.82. Sahit needs a whole lot more with Allen, Taylor and St. Brown on the other side. GarVeen’s September 16 lineup also brings Kincaid and Diggs off the bench. The partnership is already making adjustments.',
    pickId: 11, pickReason: 'GarVeen. Sahit needs several players to wake up together, and Gary and Naveen have too many proven threats to make that an easy afternoon.' },
];
