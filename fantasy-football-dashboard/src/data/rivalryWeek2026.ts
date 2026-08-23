export type RivalryPosition = 'QB' | 'RB' | 'WR' | 'TE' | 'FLEX' | 'K' | 'DEF';

export type RivalrySide = {
  manager: string;
  teamName: string;
  wins: number;
  losses: number;
  averageScore: number;
  iconicPerformance: {
    name: string;
    position: string;
    points: number;
    season: number;
    week: number;
    teamScore: number;
    won: boolean;
    isPlayoff: boolean;
    story: string;
  };
  positionAverages: Record<RivalryPosition, number>;
};

export type RivalryResult = {
  season: number;
  week: number;
  winner: string;
  scoreA: number;
  scoreB: number;
  isPlayoff: boolean;
};

export type RivalryPreview = {
  id: number;
  billing: string;
  headline: string;
  deck: string;
  historyStart: number;
  meetings: number;
  averageMargin: number;
  currentStreak: string;
  sideA: RivalrySide;
  sideB: RivalrySide;
  lastMeeting: RivalryResult;
  history: RivalryResult[];
};

export const rivalryPositions: RivalryPosition[] = ['QB', 'RB', 'WR', 'TE', 'FLEX', 'K', 'DEF'];

export const rivalryPreviews: RivalryPreview[] = [
  {
    id: 1,
    billing: 'The Pranav Bowl',
    headline: 'One Name. Two Contenders. No Shared Bragging Rights.',
    deck:
      'The series is tied after two 2025 meetings, including Pranav J’s 164.96-point playoff statement. Pranav P controlled the first game by 34.81 points before Pranav J answered with a 28.71-point postseason victory.',
    historyStart: 2025,
    meetings: 2,
    averageMargin: 31.76,
    currentStreak: 'Pranav J, 1 win',
    sideA: {
      manager: 'Pranav P',
      teamName: 'Super O-Marion Bros',
      wins: 1,
      losses: 1,
      averageScore: 138.49,
      iconicPerformance: {
        name: 'Daniel Jones', position: 'QB', points: 23.18, season: 2025, week: 8,
        teamScore: 140.73, won: true, isPlayoff: false,
        story: 'Daniel Jones set the pace in the rivalry’s first meeting, scoring 23.18 points as Super O-Marion Bros rolled to a 140.73–105.92 win. His steady QB production helped Pranav P claim the series’ largest victory.',
      },
      positionAverages: { QB: 22.94, RB: 23.05, WR: 20.55, TE: 12.25, FLEX: 19.45, K: 16, DEF: 24.25 },
    },
    sideB: {
      manager: 'Pranav J',
      teamName: 'Pooka Koopa Troopa’s',
      wins: 1,
      losses: 1,
      averageScore: 135.44,
      iconicPerformance: {
        name: 'Puka Nacua', position: 'WR', points: 46.5, season: 2025, week: 16,
        teamScore: 164.96, won: true, isPlayoff: true,
        story: 'Puka Nacua authored the rivalry’s defining playoff performance with 46.50 points in the 2025 semifinal. His eruption supplied more than a quarter of Pooka Koopa Troopa’s 164.96 points and sent Pranav J through with the win.',
      },
      positionAverages: { QB: 26.64, RB: 12.55, WR: 40.4, TE: 10.75, FLEX: 23.7, K: 16.4, DEF: 5 },
    },
    lastMeeting: { season: 2025, week: 16, winner: 'Pranav J', scoreA: 136.25, scoreB: 164.96, isPlayoff: true },
    history: [
      { season: 2025, week: 16, winner: 'Pranav J', scoreA: 136.25, scoreB: 164.96, isPlayoff: true },
      { season: 2025, week: 8, winner: 'Pranav P', scoreA: 140.73, scoreB: 105.92, isPlayoff: false },
    ],
  },
  {
    id: 2,
    billing: 'The Record vs. Reality Game',
    headline: 'Roshik Owns the Record. Taaha Owns the Scoring Edge.',
    deck:
      'Olave Garden leads the series 2–1, but Burden of Proof has averaged more points in the matchup. The record says Roshik; the underlying numbers refuse to make it comfortable.',
    historyStart: 2024,
    meetings: 3,
    averageMargin: 18.21,
    currentStreak: 'Roshik, 1 win',
    sideA: {
      manager: 'Roshik',
      teamName: 'Olave Garden',
      wins: 2,
      losses: 1,
      averageScore: 118.38,
      iconicPerformance: {
        name: 'Joe Mixon', position: 'RB', points: 26.4, season: 2024, week: 7,
        teamScore: 132.46, won: true, isPlayoff: false,
        story: 'Joe Mixon delivered 26.40 points in the closest game this series has produced. Olave Garden needed nearly every one of them to survive Burden of Proof 132.46–127.00 and open the rivalry with a win.',
      },
      positionAverages: { QB: 13.96, RB: 27.7, WR: 23.7, TE: 16.8, FLEX: 21.5, K: 5.3, DEF: 9.42 },
    },
    sideB: {
      manager: 'Taaha',
      teamName: 'Burden of Proof',
      wins: 1,
      losses: 2,
      averageScore: 121.27,
      iconicPerformance: {
        name: 'Jahmyr Gibbs', position: 'RB', points: 19.4, season: 2025, week: 2,
        teamScore: 133.85, won: true, isPlayoff: false,
        story: 'Jahmyr Gibbs led Taaha’s offense with 19.40 points when Burden of Proof struck back in 2025. The balanced 133.85-point effort produced Taaha’s only series win and its largest margin at 31.65.',
      },
      positionAverages: { QB: 15.05, RB: 33.13, WR: 21.2, TE: 6.3, FLEX: 11.57, K: 17.1, DEF: 16.92 },
    },
    lastMeeting: { season: 2025, week: 13, winner: 'Roshik', scoreA: 120.47, scoreB: 102.96, isPlayoff: false },
    history: [
      { season: 2025, week: 13, winner: 'Roshik', scoreA: 120.47, scoreB: 102.96, isPlayoff: false },
      { season: 2025, week: 2, winner: 'Taaha', scoreA: 102.2, scoreB: 133.85, isPlayoff: false },
      { season: 2024, week: 7, winner: 'Roshik', scoreA: 132.46, scoreB: 127, isPlayoff: false },
    ],
  },
  {
    id: 3,
    billing: 'Game of the Week',
    headline: 'Five Meetings. A 5.11-Point Average Margin. Settle In.',
    deck:
      'Made in Jahmyrica and defending champion Nico de Gallo have produced Amberwood’s tightest rivalry. Their last three meetings were decided by a combined 4.09 points.',
    historyStart: 2022,
    meetings: 5,
    averageMargin: 5.11,
    currentStreak: 'Anudeep, 2 wins',
    sideA: {
      manager: 'Anudeep',
      teamName: 'Made in Jahmyrica',
      wins: 3,
      losses: 2,
      averageScore: 120.88,
      iconicPerformance: {
        name: 'Josh Allen', position: 'QB', points: 28.82, season: 2025, week: 9,
        teamScore: 158, won: true, isPlayoff: false,
        story: 'Josh Allen scored 28.82 points at the center of the highest-scoring game in this rivalry’s history. Made in Jahmyrica needed the full performance to escape Nico de Gallo 158.00–154.25 and extend Anudeep’s streak to two.',
      },
      positionAverages: { QB: 17.93, RB: 29.16, WR: 31.5, TE: 8.24, FLEX: 14.96, K: 11.2, DEF: 7.9 },
    },
    sideB: {
      manager: 'Sahil',
      teamName: 'Nico de Gallo',
      wins: 2,
      losses: 3,
      averageScore: 123.14,
      iconicPerformance: {
        name: 'Trevor Lawrence', position: 'QB', points: 33.42, season: 2022, week: 14,
        teamScore: 134.92, won: true, isPlayoff: false,
        story: 'Trevor Lawrence posted 33.42 points in the most decisive win of an otherwise razor-thin series. His QB outburst drove Nico de Gallo to 134.92 points and Sahil’s 18.24-point victory in 2022.',
      },
      positionAverages: { QB: 19.57, RB: 27.46, WR: 27.5, TE: 10.84, FLEX: 16.24, K: 9.48, DEF: 12.05 },
    },
    lastMeeting: { season: 2025, week: 9, winner: 'Anudeep', scoreA: 158, scoreB: 154.25, isPlayoff: false },
    history: [
      { season: 2025, week: 9, winner: 'Anudeep', scoreA: 158, scoreB: 154.25, isPlayoff: false },
      { season: 2024, week: 7, winner: 'Anudeep', scoreA: 111.16, scoreB: 111, isPlayoff: false },
      { season: 2023, week: 9, winner: 'Sahil', scoreA: 116.14, scoreB: 116.32, isPlayoff: false },
      { season: 2022, week: 14, winner: 'Sahil', scoreA: 116.68, scoreB: 134.92, isPlayoff: false },
      { season: 2022, week: 3, winner: 'Anudeep', scoreA: 102.44, scoreB: 99.22, isPlayoff: false },
    ],
  },
  {
    id: 4,
    billing: 'The Streak vs. the Cannon',
    headline: 'Abhishek Has Won Three Straight. Gary Still Scores More.',
    deck:
      'Gary opened the rivalry with two emphatic wins, but Abhishek answered by taking the next three. Those early blowouts still leave GarVeen with an 11.05-point historical scoring advantage despite the losing series record.',
    historyStart: 2022,
    meetings: 5,
    averageMargin: 26.63,
    currentStreak: 'Abhishek, 3 wins',
    sideA: {
      manager: 'Abhishek',
      teamName: 'Egg Mc²Muffins',
      wins: 3,
      losses: 2,
      averageScore: 125.09,
      iconicPerformance: {
        name: 'Saquon Barkley', position: 'RB', points: 26.7, season: 2024, week: 7,
        teamScore: 140.1, won: true, isPlayoff: false,
        story: 'Saquon Barkley powered Egg Mc²Muffins with 26.70 points in the latest chapter of the series. Abhishek finished at 140.10, beat GarVeen by 22.28, and stretched the rivalry winning streak to three games.',
      },
      positionAverages: { QB: 19.79, RB: 24.48, WR: 35.16, TE: 7.18, FLEX: 18.94, K: 12.94, DEF: 6.6 },
    },
    sideB: {
      manager: 'Gary',
      teamName: 'GarVeen',
      wins: 2,
      losses: 3,
      averageScore: 136.14,
      iconicPerformance: {
        name: 'Josh Jacobs', position: 'RB', points: 48.3, season: 2022, week: 12,
        teamScore: 174.62, won: true, isPlayoff: false,
        story: 'Josh Jacobs detonated for 48.30 points during GarVeen’s 2022 peak, the largest individual score anywhere on this rivalry card. Gary reached 174.62 points and turned that career day into a 49.42-point demolition.',
      },
      positionAverages: { QB: 23.96, RB: 33.4, WR: 25.98, TE: 14.62, FLEX: 16.14, K: 11.24, DEF: 10.8 },
    },
    lastMeeting: { season: 2024, week: 7, winner: 'Abhishek', scoreA: 140.1, scoreB: 117.82, isPlayoff: false },
    history: [
      { season: 2024, week: 7, winner: 'Abhishek', scoreA: 140.1, scoreB: 117.82, isPlayoff: false },
      { season: 2023, week: 10, winner: 'Abhishek', scoreA: 117.44, scoreB: 108.88, isPlayoff: false },
      { season: 2022, week: 16, winner: 'Abhishek', scoreA: 123, scoreB: 114.88, isPlayoff: true },
      { season: 2022, week: 12, winner: 'Gary', scoreA: 125.2, scoreB: 174.62, isPlayoff: false },
      { season: 2022, week: 1, winner: 'Gary', scoreA: 119.72, scoreB: 164.48, isPlayoff: false },
    ],
  },
  {
    id: 5,
    billing: 'The Seven-Game War',
    headline: 'Four–Three, With Absolutely No Interest in Normal Scores.',
    deck:
      'Ankith leads the most-played pairing on the current Week 1 slate by one game. Six of their seven meetings were decided by more than 20 points, producing a rivalry built on alternating blowouts rather than narrow escapes.',
    historyStart: 2022,
    meetings: 7,
    averageMargin: 30.59,
    currentStreak: 'Sahit, 1 win',
    sideA: {
      manager: 'Ankith',
      teamName: 'Jeanty Morgan Chase & Co.',
      wins: 4,
      losses: 3,
      averageScore: 136.35,
      iconicPerformance: {
        name: 'Malik Nabers', position: 'WR', points: 37.7, season: 2025, week: 2,
        teamScore: 171.6, won: true, isPlayoff: false,
        story: 'Malik Nabers supplied 37.70 points in Ankith’s highest-scoring win against Sahit. Jeanty Morgan Chase & Co. reached 171.60 and converted Nabers’ breakout into a 48.11-point rout.',
      },
      positionAverages: { QB: 15.99, RB: 39.31, WR: 32.19, TE: 11.11, FLEX: 17.35, K: 12.29, DEF: 8.11 },
    },
    sideB: {
      manager: 'Sahit',
      teamName: 'Loveland Island',
      wins: 3,
      losses: 4,
      averageScore: 131.76,
      iconicPerformance: {
        name: 'Raheem Mostert', position: 'RB', points: 45.2, season: 2023, week: 3,
        teamScore: 170.76, won: true, isPlayoff: false,
        story: 'Raheem Mostert tore through the 2023 meeting for 45.20 points, producing Sahit’s signature performance in the series. His rushing explosion carried Loveland Island to 170.76 points and a commanding 34.62-point win.',
      },
      positionAverages: { QB: 14.86, RB: 34.89, WR: 34.19, TE: 6.63, FLEX: 15.29, K: 9.56, DEF: 16.36 },
    },
    lastMeeting: { season: 2025, week: 13, winner: 'Sahit', scoreA: 103.79, scoreB: 132.11, isPlayoff: false },
    history: [
      { season: 2025, week: 13, winner: 'Sahit', scoreA: 103.79, scoreB: 132.11, isPlayoff: false },
      { season: 2025, week: 2, winner: 'Ankith', scoreA: 171.6, scoreB: 123.49, isPlayoff: false },
      { season: 2024, week: 6, winner: 'Ankith', scoreA: 87.72, scoreB: 82.26, isPlayoff: false },
      { season: 2023, week: 15, winner: 'Sahit', scoreA: 150.1, scoreB: 178.16, isPlayoff: true },
      { season: 2023, week: 14, winner: 'Ankith', scoreA: 133.64, scoreB: 112.42, isPlayoff: false },
      { season: 2023, week: 3, winner: 'Sahit', scoreA: 136.14, scoreB: 170.76, isPlayoff: false },
      { season: 2022, week: 11, winner: 'Ankith', scoreA: 171.46, scoreB: 123.14, isPlayoff: false },
    ],
  },
  {
    id: 6,
    billing: 'The Scoreboard Shootout',
    headline: 'Their Last Meeting Produced 340.94 Points. Run It Back.',
    deck:
      'Aditya leads the series 3–1, but Abhiram pushed the latest meeting to a 173.45–167.49 finish. Their four games have ranged from 169.22 combined points to a 340.94-point shootout.',
    historyStart: 2022,
    meetings: 4,
    averageMargin: 19.59,
    currentStreak: 'Aditya, 1 win',
    sideA: {
      manager: 'Aditya',
      teamName: 'Breece’s Pieces',
      wins: 3,
      losses: 1,
      averageScore: 130.1,
      iconicPerformance: {
        name: 'DeAndre Hopkins', position: 'WR', points: 34.8, season: 2023, week: 8,
        teamScore: 155.38, won: true, isPlayoff: false,
        story: 'DeAndre Hopkins delivered 34.80 points in the game that gave Aditya his largest victory over Abhiram. Breece’s Pieces climbed to 155.38 points and Hopkins’ receiving clinic helped create a 46.30-point margin.',
      },
      positionAverages: { QB: 18.09, RB: 34.95, WR: 34.08, TE: 10.5, FLEX: 16.58, K: 7.98, DEF: 7.94 },
    },
    sideB: {
      manager: 'Abhiram',
      teamName: 'Ayy-shane.com',
      wins: 1,
      losses: 3,
      averageScore: 116.74,
      iconicPerformance: {
        name: 'Justin Jefferson', position: 'WR', points: 21.4, season: 2024, week: 7,
        teamScore: 90.84, won: true, isPlayoff: false,
        story: 'Justin Jefferson contributed 21.40 points in a low-scoring 2024 struggle where every catch mattered. His production accounted for nearly a quarter of Ayy-shane.com’s 90.84 points and helped secure Abhiram’s lone victory in the series.',
      },
      positionAverages: { QB: 17.75, RB: 30.55, WR: 22.95, TE: 4.51, FLEX: 21.25, K: 6.43, DEF: 13.31 },
    },
    lastMeeting: { season: 2025, week: 4, winner: 'Aditya', scoreA: 173.45, scoreB: 167.49, isPlayoff: false },
    history: [
      { season: 2025, week: 4, winner: 'Aditya', scoreA: 173.45, scoreB: 167.49, isPlayoff: false },
      { season: 2024, week: 7, winner: 'Abhiram', scoreA: 78.38, scoreB: 90.84, isPlayoff: false },
      { season: 2023, week: 8, winner: 'Aditya', scoreA: 155.38, scoreB: 109.08, isPlayoff: false },
      { season: 2022, week: 9, winner: 'Aditya', scoreA: 113.2, scoreB: 99.54, isPlayoff: false },
    ],
  },
];
