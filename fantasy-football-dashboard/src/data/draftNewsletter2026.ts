export type PickTableRow = {
  rank: number;
  manager: string;
  player: string;
  pick: string;
  adpRank: number;
  delta: number;
};

export type DraftTrend = {
  title: string;
  body: string;
};

export type PositionalRankingRow = {
  manager: string;
  qb: number;
  rb: number;
  wr: number;
  te: number;
  flex: number;
};

export type TeamProfile = {
  rank: number;
  manager: string;
  keeperGrade: string;
  draftGrade: string;
  identity: string;
  concern: string;
  headline: string;
  storyline: string;
};

export const biggestReaches: PickTableRow[] = [
  { rank: 1, manager: 'Pranav J', player: 'De\'Zhaun Stribling', pick: '10.10', adpRank: 148, delta: 30 },
  { rank: 2, manager: 'Sahit', player: 'Bhayshul Tuten', pick: '3.12', adpRank: 65, delta: 29 },
  { rank: 3, manager: 'Aditya', player: 'Parker Washington', pick: '4.04', adpRank: 66, delta: 26 },
  { rank: 4, manager: 'Taaha', player: 'Jordan Mason', pick: '7.11', adpRank: 108, delta: 25 },
  { rank: 5, manager: 'Ankith', player: 'David Montgomery', pick: '3.11', adpRank: 59, delta: 24 },
];

export const bestValues: PickTableRow[] = [
  { rank: 1, manager: 'Roshik', player: 'Chris Godwin', pick: '9.02', adpRank: 76, delta: 22 },
  { rank: 2, manager: 'Abhiram', player: 'DK Metcalf', pick: '8.09', adpRank: 74, delta: 19 },
  { rank: 3, manager: 'Roshik', player: 'Alec Pierce', pick: '8.11', adpRank: 78, delta: 17 },
  { rank: 4, manager: 'Ankith', player: 'Kyle Monangai', pick: '10.06', adpRank: 99, delta: 15 },
  { rank: 5, manager: 'Abhiram', player: 'Aaron Jones', pick: '10.09', adpRank: 105, delta: 12 },
];

export const draftTrends: DraftTrend[] = [
  {
    title: 'Wide Receiver Became The Main Event',
    body:
      'Amberwood drafted like it watched the 1999 Rams, the 2007 Patriots, and the 2021 Bengals in one sitting. Pranav J built a receiver superteam, Sahil stacked three weekly haymakers, and Ankith walked away with Chase, Rice, and Marvin Harrison. In a PPR league with two flexes, the league clearly decided that the fastest way to a title is through Sunday afternoon fireworks.',
  },
  {
    title: 'The Quarterback Market Fell Off A Cliff',
    body:
      'Josh Allen and Lamar Jackson still got their respect, but after that the room turned into a clearance rack. Herbert in the 12th, Caleb Williams in the 11th, Jaxson Dart in the 12th, Jayden Daniels in the 7th, and Joe Burrow in the 7th are all values that could make this draft look very different by November.',
  },
  {
    title: 'The Trade Board Split The League In Two',
    body:
      'Some managers pushed their chips forward to collect multiple premium picks and chase a top-heavy superteam. Pranav J, Abhishek, and Pranav P worked the other side of the market, trading back to collect more swings in the third, fourth, and fifth rounds. Pranav J made four selections in the fourth alone, while Abhishek stacked two thirds and two fourths. Amberwood turned the draft into a live argument: buy stars now, or overwhelm the middle rounds with volume.',
  },
  {
    title: 'Tight End Created A Mini Gold Rush',
    body:
      'Bowers and Loveland came in as luxury keepers, then the room started hunting for the next edge. Harold Fannin, Dalton Kincaid, George Kittle, Tucker Kraft, Kyle Pitts, and Dallas Goedert all became philosophical arguments in jersey form. If one of those middle-tier shots hits, the weekly advantage could be real.',
  },
  {
    title: 'The 2026 Rookie Class Arrived In Waves',
    body:
      'The actual 2026 rookie run started with Jeremiyah Love at 3.01, followed by Carnell Tate and Jadarian Price in the fifth and Jordyn Tyson in the sixth. Makai Lemon and KC Concepcion led a late prospect rush that also included De\'Zhaun Stribling, Denzel Boston, Jonah Coleman, Cyrus Allen, Ja\'Kobi Lane, Malachi Fields, Caleb Douglas, and Mike Washington. Jeanty, Hampton, McMillan, Egbuka, Burden, Warren, Fannin, Skattebo, and Judkins are now second-year players, with expectations instead of rookie grace.',
  },
  {
    title: 'Amberwood History Says The Model Is Only The Opening Kickoff',
    body:
      '2022 gave us Hairy Pitts. 2023 gave us Shake It Offense. 2024 Jackson\'s Jets won from 7-7 territory. 2025 Nico de Gallo finished 8-6, led the league in points, and lifted the trophy. The rankings are the pregame show. The season is where the plot twists show up.',
  },
];

export const positionalRankings: PositionalRankingRow[] = [
  { manager: 'Pranav J', qb: 4, rb: 12, wr: 1, te: 9, flex: 1 },
  { manager: 'Ankith', qb: 11, rb: 4, wr: 3, te: 6, flex: 8 },
  { manager: 'Anudeep', qb: 3, rb: 1, wr: 10, te: 4, flex: 5 },
  { manager: 'Sahil', qb: 10, rb: 10, wr: 2, te: 12, flex: 3 },
  { manager: 'Pranav P', qb: 7, rb: 2, wr: 4, te: 3, flex: 4 },
  { manager: 'Roshik', qb: 2, rb: 3, wr: 11, te: 1, flex: 7 },
  { manager: 'Abhishek', qb: 5, rb: 5, wr: 5, te: 5, flex: 2 },
  { manager: 'Aditya', qb: 6, rb: 6, wr: 8, te: 7, flex: 6 },
  { manager: 'Gary', qb: 1, rb: 9, wr: 6, te: 8, flex: 9 },
  { manager: 'Sahit', qb: 8, rb: 11, wr: 7, te: 10, flex: 11 },
  { manager: 'Taaha', qb: 9, rb: 8, wr: 9, te: 11, flex: 12 },
  { manager: 'Abhiram', qb: 12, rb: 7, wr: 12, te: 2, flex: 10 },
];

export const teamProfiles: TeamProfile[] = [
  {
    rank: 1,
    manager: 'Pranav J',
    keeperGrade: 'A++',
    draftGrade: 'A',
    identity: 'A WR-first juggernaut built to bury opponents on Sunday night',
    concern: 'The RB room needs Skattebo or Swift to become a true weekly workhorse',
    headline: 'Puka, CeeDee, and DeVonta Torch The League All The Way To Amberwood Gold',
    storyline:
      'Puka Nacua in the 8th is the kind of keeper that makes the rest of the league check the bylaws. Add CeeDee Lamb and DeVonta Smith, and suddenly this roster looks like the 2013 Broncos were dropped into a two-flex PPR league. Trading back gave Pranav J four fourth-round swings, which became Cam Skattebo, D\'Andre Swift, Tyler Warren, and Jalen Hurts: a full starting unit delivered in one round. If that middle-round avalanche holds up, last year\'s runner-up can turn the revenge tour into a trophy parade.',
  },
  {
    rank: 2,
    manager: 'Ankith',
    keeperGrade: 'A-',
    draftGrade: 'A-',
    identity: 'A stars-and-breakouts roster that can win a matchup in three plays',
    concern: 'The middle of the roster leans on rookies and second-year leaps to materialize',
    headline: 'Chase, Jeanty, and Rice Give Ankith A Superstar Trio That Never Turns Off',
    storyline:
      'Ja\'Marr Chase, Ashton Jeanty, and Rashee Rice are not a foundation, they are a weekly threat. Ankith also loaded up on breakout doors with Marvin Harrison, Josh Downs, Jayden Reed, Caleb Williams, and Jaxson Dart. This team has the feel of the 2021 Bengals: young, explosive, and one leap away from making everyone uncomfortable. If Caleb levels up and one of the bench WRs turns into a real flex weapon, the title case gets loud fast.',
  },
  {
    rank: 3,
    manager: 'Anudeep',
    keeperGrade: 'A+',
    draftGrade: 'A-',
    identity: 'A ground-and-pound roster that wants to win the trenches every week',
    concern: 'Outside of Drake London, the WR room needs a second reliable starter to appear',
    headline: 'Gibbs, Love, and Javonte Turn Anudeep Into The League\'s Weekly Bully',
    storyline:
      'Anudeep built the type of RB room that makes opponents start trade shopping before Week 1. Jahmyr Gibbs is the headliner, but Jeremiyah Love, Javonte Williams, Rico Dowdle, and Brian Robinson give this team serious flex muscle. If Drake London becomes the alpha and Joe Burrow stays healthy, this can look like the 2005 Steelers with better PPR formatting. The formula is simple: own the RB slots, own the flex slots, and make everyone else chase.',
  },
  {
    rank: 4,
    manager: 'Sahil',
    keeperGrade: 'A',
    draftGrade: 'B+',
    identity: 'A defending champ with the league\'s most explosive WR ceiling',
    concern: 'The TE spot and QB slot both need somebody to just be steady',
    headline: 'Jefferson, Pickens, and Wilson Fire Sahil Toward A Back-To-Back Title',
    storyline:
      'The defending 2025 champion came back with Justin Jefferson, George Pickens, and Garrett Wilson, which is a title defense with pyrotechnics. Derrick Henry and Travis Etienne give the lineup enough RB bite to survive the tough weeks, and Jaylen Warren can patch a lot of lineup bruises. If Isaiah Likely is just steady enough, Sahil can pull the Chiefs-style repeat and spend December reminding everybody that the throne is not vacant.',
  },
  {
    rank: 5,
    manager: 'Pranav P',
    keeperGrade: 'B+',
    draftGrade: 'B+',
    identity: 'A no-holes, no-panic roster with real depth at every skill spot',
    concern: 'No true elite ceiling player besides CMC to win a shootout on his own',
    headline: 'CMC and Nabers Anchor A Pranav P Roster With No Weekly Off Switch',
    storyline:
      'Pranav P drafted like a GM who did not panic, did not chase, and quietly built a problem. Trading back kept him firing through the third, fourth, and fifth, where Zay Flowers, keeper Omarion Hampton, and Jameson Williams turned patience into lineup depth. Malik Nabers, Rome Odunze, and Justin Herbert give the roster even more answers, with Herbert in the 12th looking like the kind of value pick that gets replayed during playoff week. If CMC is CMC and one of the young WRs becomes a weekly rocket, this roster can win without needing a miracle.',
  },
  {
    rank: 6,
    manager: 'Roshik',
    keeperGrade: 'A+',
    draftGrade: 'B+',
    identity: 'A superstar-spine build with weekly positional edges at RB, QB, and TE',
    concern: 'The WR room needs one more player to hit a true starter ceiling',
    headline: 'Bijan, Lamar, and Bowers Give Roshik A Spine Nobody In Amberwood Wants To See',
    storyline:
      'Roshik starts every week with Bijan Robinson, Lamar Jackson, and Brock Bowers. That is a superstar spine with 2019 Ravens energy: weird to defend, explosive by design, and capable of making normal fantasy math look silly. Chris Olave and DJ Moore do not need to be superheroes, but one of them has to punch up. If Bowers becomes the weekly TE cheat code, this team can win matchups before the late window even kicks off.',
  },
  {
    rank: 7,
    manager: 'Abhishek',
    keeperGrade: 'B+',
    draftGrade: 'B',
    identity: 'The most balanced roster in the league with no weak starting slot',
    concern: 'Needs one middle-round WR to hit a true breakout ceiling',
    headline: 'Chase Brown and Breece Hall Fuel A Balanced Abhishek Playoff Machine',
    storyline:
      'Abhishek traded back and stormed the middle rounds with two third-round picks and two fourth-round picks, the fantasy equivalent of bringing extra draft cards to the podium. Breece Hall, Ladd McConkey, Tetairoa McMillan, and Mike Evans turned that volume into immediate starters around Chase Brown and keeper Emeka Egbuka. Jayden Daniels in the 7th could be the pick that turns this from solid into scary. If one of the young WRs erupts, this team becomes the playoff matchup nobody wants because every slot is alive.',
  },
  {
    rank: 8,
    manager: 'Aditya',
    keeperGrade: 'A-',
    draftGrade: 'B-',
    identity: 'A high-variance roster leaning on veteran bounce-backs to detonate',
    concern: 'A handful of ADP reaches need to outrun their draft cost immediately',
    headline: 'Nico Collins and James Cook Anchor Aditya\'s Long-Con Title Push',
    storyline:
      'Aditya has a very funny villain arc sitting on the runway. Nico Collins and James Cook are premium anchors, while Davante Adams, Quinshon Judkins, Parker Washington, Courtland Sutton, and Kyle Pitts give him multiple ways to find a second gear. The model did not love the Patrick Mahomes cost, but if Mahomes turns back into Mahomes, nobody will care. This team can spend September getting roasted and December posting screenshots.',
  },
  {
    rank: 9,
    manager: 'Gary',
    keeperGrade: 'B',
    draftGrade: 'B-',
    identity: 'A three-superstar roster with a real weekly QB advantage',
    concern: 'The bottom half of the lineup has to produce actual starter-quality weeks',
    headline: 'Josh Allen, Amon-Ra, and JT Give Gary A Trio That Can Steal Any Week',
    storyline:
      'Josh Allen, Amon-Ra St. Brown, and Jonathan Taylor is a fantastic way to start any fantasy football sentence. That trio can win weeks by itself, which is more than most teams can say. The season comes down to Christian Watson, Carnell Tate, Stefon Diggs, RJ Harvey, and Dalton Kincaid turning the supporting cast into real weekly answers. If two of those pieces hit, Gary becomes the classic lower-seed nightmare with a superstar QB and no fear.',
  },
  {
    rank: 10,
    manager: 'Sahit',
    keeperGrade: 'A',
    draftGrade: 'C+',
    identity: 'A boom-or-bust roster living on a very loud top five',
    concern: 'RB and flex depth thins out fast if any starter misses time',
    headline: 'A.J. Brown and Saquon Give Sahit A Top Five Nobody Wants In The Playoffs',
    storyline:
      'Sahit has a top five that can absolutely crash the playoff party: A.J. Brown, Saquon Barkley, Jaylen Waddle, Drake Maye, and Colston Loveland. The roster gets thin faster than the contenders above him, but the ceiling pieces are real. If Maye and Loveland pop at the same time, this starts looking like a 2007 Giants season arc: uneven early, dangerous late, and suddenly everyone is nervous. The margin is thin, but the upside is loud.',
  },
  {
    rank: 11,
    manager: 'Taaha',
    keeperGrade: 'C+',
    draftGrade: 'C+',
    identity: 'A young roster stacked with breakout doors nobody else was ready to open',
    concern: 'Too many picks need to outperform ADP for the plan to actually work',
    headline: 'JSN, K9, and Kyren Give Taaha A Foundation The League Underestimated',
    storyline:
      'Taaha drafted like a man planting flags, not checking consensus. JSN, Kenneth Walker, Kyren Williams, Luther Burden, Harold Fannin, Xavier Worthy, and Bo Nix give this roster a lot of breakout doors. Fannin was a reach by ADP, but if he hits, that pick changes the whole tone of the draft. If Burden and Fannin level up while Worthy finally detonates, Taaha gets to spend the season handing out apology forms.',
  },
  {
    rank: 12,
    manager: 'Abhiram',
    keeperGrade: 'N/A',
    draftGrade: 'C',
    identity: 'A talent-rich skill-position roster with one giant missing piece',
    concern: 'No drafted QB means every week starts with a waiver-wire prayer',
    headline: 'McBride, Achane, and Bucky Give Abhiram A Skill Core Too Loud To Ignore',
    storyline:
      'Abhiram left the draft with one giant blinking sign that says find quarterback, but the rest of the roster is not dead. Trey McBride, De\'Von Achane, Bucky Irving, Chuba Hubbard, Aaron Jones, Tee Higgins, Brian Thomas, DK Metcalf, and 2026 rookie Jordyn Tyson are enough talent to climb fast. Remember, 2024 Jackson\'s Jets won from 7-7 territory, so nobody gets buried in August. Nail QB on waivers or in a trade, and this ranking can look rude by midseason.',
  },
];

export const finalAssessment = [
  {
    title: 'The Broadcast Booth Favorites',
    teams: 'Pranav J, Ankith, Anudeep',
    body:
      'These are the cleanest title profiles right now. Pranav J has the massive WR edge, Ankith has the star power and breakout portfolio, and Anudeep owns the RB trenches.',
  },
  {
    title: 'The One-Break-Away Tier',
    teams: 'Sahil, Pranav P, Roshik, Abhishek',
    body:
      'Any of these teams can win without it feeling surprising. Sahil is still the defending champ, Pranav P is balanced, Roshik has elite weekly edges, and Abhishek has the no-holes playoff build.',
  },
  {
    title: 'The Chaos Tier',
    teams: 'Aditya, Gary, Sahit, Taaha, Abhiram',
    body:
      'The model sees questions, but questions become storylines every season. A Mahomes bounce-back, a Josh Allen heater, a Drake Maye leap, a Fannin breakout, or an Abhiram QB find can flip this tier fast.',
  },
];
