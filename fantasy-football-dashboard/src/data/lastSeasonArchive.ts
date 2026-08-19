export type ArchiveEntryType =
  | 'Newsletter'
  | 'Season Recap'
  | 'Awards'
  | 'Keeper Notes'
  | 'Offseason Odds';

export interface ArchiveEntry {
  id: string;
  type: ArchiveEntryType;
  title: string;
  date: string;
  path?: string;
  textUrl?: string;
  summary: string;
  tags: string[];
  content: string;
}

export const lastSeasonSnapshot = {
  season: '2025',
  leagueName: 'Amberwood Football League',
  leagueId: '1240124901977759744',
  champion: 'Sahil (swahili28)',
  runnerUp: 'Pranav Jain (pranavj20)',
  regularSeasonChampion: 'Pranav Jain (pranavj20)',
  toiletBowlChampion: 'Abhiram (abhiu)',
  consolationWinner: 'Roshik',
  topDraftPick2026: 'Roshik',
  finalePath: '/last-season/newsletters/finale',
};

export const lastSeasonEntries: ArchiveEntry[] = [
  {
    id: 'season-finale',
    type: 'Newsletter',
    title: 'Season Finale: 2025 Unwrapped',
    date: 'January 2026',
    path: '/last-season/newsletters/finale',
    textUrl: '/archive/2025/finale.txt',
    summary:
      'Complete season recap: Sahil wins the title, Pranav finishes runner-up, Abhiram takes the toilet bowl, and Roshik wins the consolation bracket.',
    tags: ['champion', 'finale', 'sahil', 'pranav', 'abhiram', 'awards', '2026 draft'],
    content:
      'Sahil entered the playoffs as the 5-seed at 8-6 and averaged 153.35 playoff points per game. The title run included wins over kulkdaddy47, SahitReddi, and pranavj20. Abhiram finished 2-12 and won the toilet bowl. Roshik surged late, won the consolation bracket, and secured the number one overall pick in the 2026 draft.',
  },
  {
    id: 'week13',
    type: 'Newsletter',
    title: 'Week 13 Edition',
    date: 'December 2025',
    path: '/last-season/newsletters/week13',
    textUrl: '/archive/2025/week13.txt',
    summary:
      'The final regular-season playoff picture started taking shape with huge games for audumula, SahitReddi, swahili28, kulkdaddy47, and pranavj20.',
    tags: ['week 13', 'playoffs', 'seeding', 'swahili28', 'pranavj20', 'kulkdaddy47'],
    content:
      'Week 13 covered playoff seeding chaos, points-for tiebreakers, swahili28 holding a massive scoring advantage, and several win-and-in or spoiler scenarios entering Week 14.',
  },
  {
    id: 'week12',
    type: 'Newsletter',
    title: 'Week 12 Edition',
    date: 'November 2025',
    path: '/last-season/newsletters/week12',
    textUrl: '/archive/2025/week12.txt',
    summary:
      'Playoff chaos hit full speed as kulkdaddy47, pranavj20, abhishekD, swahili28, ankithe, SahitReddi, audumula, and pranav4789 fought around the cut line.',
    tags: ['week 12', 'playoff race', 'wild card', 'points for', 'pranav4789'],
    content:
      'Week 12 focused on the points paradox, where high-scoring teams were not always safe by record. The wild card became crucial, with pranav4789 leading the entire league in scoring while sitting outside the automatic spots.',
  },
  {
    id: 'week11',
    type: 'Newsletter',
    title: 'Week 11 Edition',
    date: 'November 2025',
    path: '/last-season/newsletters/week11',
    textUrl: '/archive/2025/week11.txt',
    summary:
      'audumula made a statement, pranav4789 led the points race, swahili28 re-entered the playoff hunt, and the standings became a tight traffic jam.',
    tags: ['week 11', 'audumula', 'playoff odds', 'mickey award', 'standings'],
    content:
      'Week 11 included audumula crushing pranavj20, swahili28 beating ankithe in a major playoff swing, and kulkdaddy47 escaping with a low-scoring win over SahitReddi.',
  },
  {
    id: 'week10',
    type: 'Newsletter',
    title: 'Week 10 Edition',
    date: 'November 2025',
    path: '/last-season/newsletters/week10',
    textUrl: '/archive/2025/week10.txt',
    summary:
      'A 172-point explosion, playoff chaos, and one of the biggest late-season collapses of the year.',
    tags: ['week 10', '172 points', 'playoff chaos', 'pranav4789', 'kulkdaddy47'],
    content:
      'Week 10 featured pranav4789 exploding for 172.85 points behind DeVon Achane and TreVeyon Henderson while kulkdaddy47 posted a season-low 76.08 points after being tied for first.',
  },
  {
    id: 'week9',
    type: 'Newsletter',
    title: 'Week 9 Edition',
    date: 'November 2025',
    path: '/last-season/newsletters/week9',
    textUrl: '/archive/2025/week9.txt',
    summary:
      'Cardiac finishes, Brock Bowers going nuclear, and several teams hitting their make-or-break stretch.',
    tags: ['week 9', 'brock bowers', 'cardiac finish', 'roshik', 'audumula'],
    content:
      'Week 9 included a huge Brock Bowers performance for roshik, a tight audumula win, and several teams facing the reality of the playoff race.',
  },
  {
    id: 'week8',
    type: 'Newsletter',
    title: 'Week 8 Edition',
    date: 'October 2025',
    path: '/last-season/newsletters/week8',
    textUrl: '/archive/2025/week8.txt',
    summary:
      'Power shifted across the league as playoff storms started brewing and struggling teams began playing spoiler.',
    tags: ['week 8', 'playoff race', 'power rankings', 'spoiler'],
    content:
      'Week 8 tracked momentum changes, abhiu finding life, akhilmetukuru fading, and the middle of the table tightening around the playoff line.',
  },
  {
    id: 'week7',
    type: 'Newsletter',
    title: 'Week 7 Edition',
    date: 'October 2025',
    path: '/last-season/newsletters/week7',
    textUrl: '/archive/2025/week7.txt',
    summary:
      'CMC went nuclear and the playoff race intensified as teams started separating into tiers.',
    tags: ['week 7', 'christian mccaffrey', 'cmc', 'playoffs', 'ankith'],
    content:
      'Week 7 centered on Christian McCaffrey dominance, roster volatility, and the league moving from early-season noise into true playoff positioning.',
  },
  {
    id: 'week6',
    type: 'Newsletter',
    title: 'Week 6 Edition',
    date: 'October 2025',
    path: '/last-season/newsletters/week6',
    textUrl: '/archive/2025/week6.txt',
    summary:
      'The perfect season fell, Sahil landed a major win, and several teams hit crisis mode.',
    tags: ['week 6', 'perfect season', 'sahil', 'pranavj20', 'trades'],
    content:
      'Week 6 featured swahili28 knocking off previously undefeated pranavj20, ongoing trade fallout, and a playoff race beginning to take shape.',
  },
  {
    id: 'week5',
    type: 'Newsletter',
    title: 'Week 5 Edition',
    date: 'October 2025',
    path: '/last-season/newsletters/week5',
    textUrl: '/archive/2025/week5.txt',
    summary:
      'Shocks, surges, and shattered dreams as the season moved out of small-sample territory.',
    tags: ['week 5', 'surges', 'power rankings', 'shattered dreams'],
    content:
      'Week 5 captured major momentum swings, disappointing starts becoming real problems, and the first clear tier shifts of the 2025 season.',
  },
  {
    id: 'week4',
    type: 'Newsletter',
    title: 'Week 4 Edition',
    date: 'September 2025',
    path: '/last-season/newsletters/week4',
    textUrl: '/archive/2025/week4.txt',
    summary:
      'The Great 2-2 Logjam created early parity and a crowded middle class.',
    tags: ['week 4', '2-2 logjam', 'parity', 'red october'],
    content:
      'Week 4 focused on the early standings pileup, with several teams hovering around .500 and no clear read on who was truly dangerous.',
  },
  {
    id: 'week3',
    type: 'Newsletter',
    title: 'Week 3 Edition',
    date: 'September 2025',
    path: '/last-season/newsletters/week3',
    textUrl: '/archive/2025/week3.txt',
    summary:
      'Momentum shifts, meltdowns, and a year-over-year check comparing the 2024 and 2025 starts.',
    tags: ['week 3', 'year over year', '2024 comparison', 'meltdowns'],
    content:
      'Week 3 compared early 2025 starts against 2024, including scoring inflation from the extra flex and several teams trying to establish identity.',
  },
  {
    id: 'week2',
    type: 'Newsletter',
    title: 'Week 2 Edition',
    date: 'September 2025',
    path: '/last-season/newsletters/week2',
    textUrl: '/archive/2025/week2.txt',
    summary:
      'Comebacks, collapses, chaos, and the first desperation games of the season.',
    tags: ['week 2', 'comebacks', 'collapses', 'desperation'],
    content:
      'Week 2 captured the first big overreactions of 2025, with winless teams already facing pressure and early contenders trying to prove their starts were real.',
  },
  {
    id: 'week1',
    type: 'Newsletter',
    title: 'Week 1 Edition',
    date: 'September 2025',
    path: '/last-season/newsletters/week1',
    textUrl: '/archive/2025/week1.txt',
    summary:
      'Fireworks, flops, first impressions, and the opening week tone-setter for 2025.',
    tags: ['week 1', 'opening week', 'first impressions', 'flops'],
    content:
      'Week 1 introduced the first big performances and early disappointments of the 2025 season, from explosive starts to managers needing quick bounce-backs.',
  },
  {
    id: 'preseason',
    type: 'Newsletter',
    title: 'Preseason Edition',
    date: 'August 2025',
    path: '/last-season/newsletters/preseason',
    textUrl: '/archive/2025/preseason.txt',
    summary:
      'Draft coverage, keeper-adjusted analysis, team-by-team championship paths, and preseason power reads.',
    tags: ['preseason', 'draft', 'keepers', 'team analysis', 'power rankings'],
    content:
      'The preseason issue covered keeper-adjusted draft value, top reaches, best values, positional trends, championship headlines, X-factors, sleepers, and team-by-team breakdowns.',
  },
  {
    id: 'awards',
    type: 'Awards',
    title: '2025 Awards and Superlatives',
    date: 'January 2026',
    path: '/last-season/newsletters/finale',
    summary:
      'Sahit won GM of the Year, CMC was League MVP, Sahil had Stack of the Year, Puka was Keeper of the Year, and Michael Wilson was Waiver Wire Addition of the Year.',
    tags: ['awards', 'gm of year', 'mvp', 'keeper', 'waiver wire', 'stack'],
    content:
      'GM of the Year went to Sahit for surviving injuries and finishing 9-5. League MVP went to Christian McCaffrey for Ankith. Stack of the Year was Sahil with Dak Prescott and George Pickens. Keeper of the Year was Pranav Jain with Puka Nacua. Waiver Wire Addition of the Year was Abhishek with Michael Wilson. Mickey of the Year went to Aditya for a lucky 9-5 season despite finishing eighth in total scoring.',
  },
  {
    id: 'keeper-notes',
    type: 'Keeper Notes',
    title: '2026 Keeper and Draft Context',
    date: 'January 2026',
    path: '/last-season/newsletters/finale',
    summary:
      'The 2025 finish set up 2026 keeper storylines around Puka, JSN, Brock Bowers, Malik Nabers, Drake London, Josh Allen, and more.',
    tags: ['keepers', '2026 draft', 'puka', 'jsn', 'bowers', 'nabers', 'drake london'],
    content:
      'Pranav Jain entered 2026 with Puka Nacua and Jaxon Smith-Njigba as elite keeper assets. Roshik held Brock Bowers and the first overall pick. Ankith had Malik Nabers and CMC context. Abhishek had Drake London. Anudeep remained tied to Josh Allen. The 2025 finale framed these as the foundation of the 2026 title race.',
  },
  {
    id: 'offseason-odds',
    type: 'Offseason Odds',
    title: '2026 Championship Betting Odds',
    date: 'August 2026',
    summary:
      'The new-season home sidebar opened with Sahil as defending champion favorite, followed by Pranav Jain, Roshik, Sahit, and Abhishek.',
    tags: ['2026 odds', 'betting odds', 'sahil', 'pranav jain', 'roshik', 'sahit'],
    content:
      'The 2026 odds board listed Sahil at +200 as defending champion, Pranav Jain at +250 with Puka and JSN, Roshik at +400 with the first pick and Bowers, Sahit at +450 after GM of the Year, Abhishek at +600 with Drake London, Anudeep at +700 with Josh Allen, Pranav P at +800, Ankith at +900, Aditya at +1200, Taaha at +2000, Akhil at +3500, and Abhiram at +5000.',
  },
];

export const newsletterArchiveEntries = lastSeasonEntries.filter(
  (entry) => entry.type === 'Newsletter'
);
