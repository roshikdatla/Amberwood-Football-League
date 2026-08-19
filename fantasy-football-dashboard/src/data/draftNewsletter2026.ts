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

export type PowerRanking = {
  rank: number;
  manager: string;
  grade: string;
  headline: string;
};

export type PositionalRankingRow = {
  rank: number;
  rb: string;
  wr: string;
  flex: string;
};

export type TeamProfile = {
  rank: number;
  manager: string;
  keeperGrade: string;
  draftGrade: string;
  strength: string;
  weakness: string;
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

export const powerRankings: PowerRanking[] = [
  { rank: 1, manager: 'Pranav J', grade: 'A', headline: 'WR Voltron has arrived' },
  { rank: 2, manager: 'Ankith', grade: 'A-', headline: 'Elite stars, breakout doors everywhere' },
  { rank: 3, manager: 'Anudeep', grade: 'A-', headline: 'The RB empire strikes first' },
  { rank: 4, manager: 'Sahil', grade: 'B+', headline: 'The defending champ has receiver fireworks' },
  { rank: 5, manager: 'Pranav P', grade: 'B+', headline: 'Balanced, clean, and dangerous' },
  { rank: 6, manager: 'Roshik', grade: 'B+', headline: 'Bijan, Lamar, and Bowers is a nasty spine' },
  { rank: 7, manager: 'Abhishek', grade: 'B', headline: 'No holes, plenty of heat' },
  { rank: 8, manager: 'Aditya', grade: 'B-', headline: 'Strong core, needs the bets to cash' },
  { rank: 9, manager: 'Gary', grade: 'B-', headline: 'Three superstars and a depth test' },
  { rank: 10, manager: 'Sahit', grade: 'C+', headline: 'High-ceiling core, thin margins' },
  { rank: 11, manager: 'Taaha', grade: 'C+', headline: 'The "I saw it first" team' },
  { rank: 12, manager: 'Abhiram', grade: 'C', headline: 'Needs QB help, but not out of ammunition' },
];

export const positionalRankings: PositionalRankingRow[] = [
  { rank: 1, rb: 'Anudeep', wr: 'Pranav J', flex: 'Pranav J' },
  { rank: 2, rb: 'Pranav P', wr: 'Sahil', flex: 'Abhishek' },
  { rank: 3, rb: 'Roshik', wr: 'Ankith', flex: 'Sahil' },
  { rank: 4, rb: 'Ankith', wr: 'Pranav P', flex: 'Pranav P' },
  { rank: 5, rb: 'Abhishek', wr: 'Abhishek', flex: 'Anudeep' },
  { rank: 6, rb: 'Aditya', wr: 'Gary', flex: 'Aditya' },
  { rank: 7, rb: 'Abhiram', wr: 'Sahit', flex: 'Roshik' },
  { rank: 8, rb: 'Taaha', wr: 'Aditya', flex: 'Ankith' },
  { rank: 9, rb: 'Gary', wr: 'Taaha', flex: 'Gary' },
  { rank: 10, rb: 'Sahil', wr: 'Anudeep', flex: 'Abhiram' },
  { rank: 11, rb: 'Sahit', wr: 'Roshik', flex: 'Sahit' },
  { rank: 12, rb: 'Pranav J', wr: 'Abhiram', flex: 'Taaha' },
];

export const teamProfiles: TeamProfile[] = [
  {
    rank: 1,
    manager: 'Pranav J',
    keeperGrade: 'A++',
    draftGrade: 'A',
    strength: 'Best WR room in the league',
    weakness: 'RB room needs cooperation',
    headline: 'Revenge Complete: Pooka Koopa Troopa\'s Claims The Crown',
    storyline:
      'Puka Nacua in the 8th is the kind of keeper that makes the rest of the league check the bylaws. Add CeeDee Lamb and DeVonta Smith, and suddenly this roster looks like the 2013 Broncos were dropped into a two-flex PPR league. Trading back gave Pranav J four fourth-round swings, which became Cam Skattebo, D\'Andre Swift, Tyler Warren, and Jalen Hurts: a full starting unit delivered in one round. If that middle-round avalanche holds up, last year\'s runner-up can turn the revenge tour into a trophy parade.',
  },
  {
    rank: 2,
    manager: 'Ankith',
    keeperGrade: 'A-',
    draftGrade: 'A-',
    strength: 'Elite top-end talent',
    weakness: 'TE and flex depth are less terrifying than the stars',
    headline: 'Jeanty Morgan Chase & Co. Closes The Title Deal',
    storyline:
      'Ja\'Marr Chase, Ashton Jeanty, and Rashee Rice are not a foundation, they are a weekly threat. Ankith also loaded up on breakout doors with Marvin Harrison, Josh Downs, Jayden Reed, Caleb Williams, and Jaxson Dart. This team has the feel of the 2021 Bengals: young, explosive, and one leap away from making everyone uncomfortable. If Caleb levels up and one of the bench WRs turns into a real flex weapon, the title case gets loud fast.',
  },
  {
    rank: 3,
    manager: 'Anudeep',
    keeperGrade: 'A+',
    draftGrade: 'A-',
    strength: 'Best RB room in the league',
    weakness: 'WR depth needs to hold the line',
    headline: 'Made In Jahmyrica Builds An Amberwood Champion',
    storyline:
      'Anudeep built the type of RB room that makes opponents start trade shopping before Week 1. Jahmyr Gibbs is the headliner, but Jeremiyah Love, Javonte Williams, Rico Dowdle, and Brian Robinson give this team serious flex muscle. If Drake London becomes the alpha and Joe Burrow stays healthy, this can look like the 2005 Steelers with better PPR formatting. The formula is simple: own the RB slots, own the flex slots, and make everyone else chase.',
  },
  {
    rank: 4,
    manager: 'Sahil',
    keeperGrade: 'A',
    draftGrade: 'B+',
    strength: 'Elite WR trio',
    weakness: 'TE is the soft spot',
    headline: 'Nico De Gallo Goes Back-To-Back',
    storyline:
      'The defending 2025 champion came back with Justin Jefferson, George Pickens, and Garrett Wilson, which is a title defense with pyrotechnics. Derrick Henry and Travis Etienne give the lineup enough RB bite to survive the tough weeks, and Jaylen Warren can patch a lot of lineup bruises. If Isaiah Likely is just steady enough, Sahil can pull the Chiefs-style repeat and spend December reminding everybody that the throne is not vacant.',
  },
  {
    rank: 5,
    manager: 'Pranav P',
    keeperGrade: 'B+',
    draftGrade: 'B+',
    strength: 'RB/WR balance',
    weakness: 'TE ceiling is shaky',
    headline: 'Super O-Marion Bros Levels Up To The Title',
    storyline:
      'Pranav P drafted like a GM who did not panic, did not chase, and quietly built a problem. Trading back kept him firing through the third, fourth, and fifth, where Zay Flowers, keeper Omarion Hampton, and Jameson Williams turned patience into lineup depth. Malik Nabers, Rome Odunze, and Justin Herbert give the roster even more answers, with Herbert in the 12th looking like the kind of value pick that gets replayed during playoff week. If CMC is CMC and one of the young WRs becomes a weekly rocket, this roster can win without needing a miracle.',
  },
  {
    rank: 6,
    manager: 'Roshik',
    keeperGrade: 'A+',
    draftGrade: 'B+',
    strength: 'Elite TE advantage',
    weakness: 'WR room needs one more ceiling outcome',
    headline: 'Olave Garden Serves Up An Amberwood Title',
    storyline:
      'Roshik starts every week with Bijan Robinson, Lamar Jackson, and Brock Bowers. That is a superstar spine with 2019 Ravens energy: weird to defend, explosive by design, and capable of making normal fantasy math look silly. Chris Olave and DJ Moore do not need to be superheroes, but one of them has to punch up. If Bowers becomes the weekly TE cheat code, this team can win matchups before the late window even kicks off.',
  },
  {
    rank: 7,
    manager: 'Abhishek',
    keeperGrade: 'B+',
    draftGrade: 'B',
    strength: 'Best balanced roster construction',
    weakness: 'Needs one true superstar leap',
    headline: 'Egg McMuffins Cracks The Championship Code',
    storyline:
      'Abhishek traded back and stormed the middle rounds with two third-round picks and two fourth-round picks, the fantasy equivalent of bringing extra draft cards to the podium. Breece Hall, Ladd McConkey, Tetairoa McMillan, and Mike Evans turned that volume into immediate starters around Chase Brown and keeper Emeka Egbuka. Jayden Daniels in the 7th could be the pick that turns this from solid into scary. If one of the young WRs erupts, this team becomes the playoff matchup nobody wants because every slot is alive.',
  },
  {
    rank: 8,
    manager: 'Aditya',
    keeperGrade: 'A-',
    draftGrade: 'B-',
    strength: 'Strong core pieces',
    weakness: 'A few draft bets need to outrun ADP',
    headline: 'Breece\'s Pieces Puts The Trophy Together',
    storyline:
      'Aditya has a very funny villain arc sitting on the runway. Nico Collins and James Cook are premium anchors, while Davante Adams, Quinshon Judkins, Parker Washington, Courtland Sutton, and Kyle Pitts give him multiple ways to find a second gear. The model did not love the Patrick Mahomes cost, but if Mahomes turns back into Mahomes, nobody will care. This team can spend September getting roasted and December posting screenshots.',
  },
  {
    rank: 9,
    manager: 'Gary',
    keeperGrade: 'B',
    draftGrade: 'B-',
    strength: 'Best QB room plus an elite top three',
    weakness: 'Depth has to prove it fast',
    headline: 'GarVeen\'s Superstars Finish The Job',
    storyline:
      'Josh Allen, Amon-Ra St. Brown, and Jonathan Taylor is a fantastic way to start any fantasy football sentence. That trio can win weeks by itself, which is more than most teams can say. The season comes down to Christian Watson, Carnell Tate, Stefon Diggs, RJ Harvey, and Dalton Kincaid turning the supporting cast into real weekly answers. If two of those pieces hit, Gary becomes the classic lower-seed nightmare with a superstar QB and no fear.',
  },
  {
    rank: 10,
    manager: 'Sahit',
    keeperGrade: 'A',
    draftGrade: 'C+',
    strength: 'QB/TE upside',
    weakness: 'RB and flex depth are thin',
    headline: 'Loveland Island Becomes Championship Country',
    storyline:
      'Sahit has a top five that can absolutely crash the playoff party: A.J. Brown, Saquon Barkley, Jaylen Waddle, Drake Maye, and Colston Loveland. The roster gets thin faster than the contenders above him, but the ceiling pieces are real. If Maye and Loveland pop at the same time, this starts looking like a 2007 Giants season arc: uneven early, dangerous late, and suddenly everyone is nervous. The margin is thin, but the upside is loud.',
  },
  {
    rank: 11,
    manager: 'Taaha',
    keeperGrade: 'C+',
    draftGrade: 'C+',
    strength: 'Exciting young foundation',
    weakness: 'Flex depth ranked last in the model',
    headline: 'Burden Of Proof Becomes Proof Of Greatness',
    storyline:
      'Taaha drafted like a man planting flags, not checking consensus. JSN, Kenneth Walker, Kyren Williams, Luther Burden, Harold Fannin, Xavier Worthy, and Bo Nix give this roster a lot of breakout doors. Fannin was a reach by ADP, but if he hits, that pick changes the whole tone of the draft. If Burden and Fannin level up while Worthy finally detonates, Taaha gets to spend the season handing out apology forms.',
  },
  {
    rank: 12,
    manager: 'Abhiram',
    keeperGrade: 'N/A',
    draftGrade: 'C',
    strength: 'Elite TE and real RB upside',
    weakness: 'No drafted QB',
    headline: 'From No QB To No. 1: Ayy-Shane.com Stuns Amberwood',
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
