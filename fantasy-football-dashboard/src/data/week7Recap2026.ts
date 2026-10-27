import snapshot from './week7Recap2026Snapshot.json';

export const editionStatus = snapshot.phase;
export const recapSource = snapshot;
const managers: Record<number, string> = {
  1: 'Anudeep', 2: 'Abhishek', 3: 'Roshik', 4: 'Ankith', 5: 'Taaha', 6: 'Sahil',
  7: 'Pranav P', 8: 'Sahit', 9: 'Aditya', 10: 'Abhiram', 11: 'Gary & Naveen', 12: 'Pranav J',
};
type Result = { roster_id: number; matchup_id: number; points: number; custom_points: number | null };
const completedWeeks: Result[][] = [snapshot.week1, snapshot.week2, snapshot.week3, snapshot.week4, snapshot.week5, snapshot.week6, snapshot.week7];
export const recapTeams = snapshot.teams.map(team => {
  const current = snapshot.week7.find(row => row.roster_id === team.rosterId)!;
  const record = completedWeeks.reduce((total, week) => {
    const result = week.find(row => row.roster_id === team.rosterId)!;
    const opponent = week.find(row => row.matchup_id === result.matchup_id && row.roster_id !== team.rosterId)!;
    const delta = (result.custom_points ?? result.points) - (opponent.custom_points ?? opponent.points);
    if (delta > 0) total.wins += 1;
    else if (delta < 0) total.losses += 1;
    else total.ties += 1;
    return total;
  }, { wins: 0, losses: 0, ties: 0 });
  return { ...team, teamName: team.teamName.trim(), manager: managers[team.rosterId], score: current.custom_points ?? current.points,
    matchupId: current.matchup_id, record: `${record.wins}–${record.losses}${record.ties ? `–${record.ties}` : ''}` };
});
export const getRecapTeam = (id: number) => {
  const team = recapTeams.find(row => row.rosterId === id);
  if (!team) throw new Error(`Unknown Week 7 roster: ${id}`);
  return team;
};
export const formatScore = (points: number) => points.toFixed(2);
export const getStarter = (rosterId: number, playerId: string) => {
  const matchup = snapshot.week7.find(row => row.roster_id === rosterId);
  const index = matchup?.starters.indexOf(playerId) ?? -1;
  if (!matchup || index < 0) throw new Error(`${playerId} did not start for roster ${rosterId} in Week 7`);
  const player = (snapshot.players as Record<string, { name: string; position: string; team: string | null }>)[playerId];
  return { ...player, points: matchup.starters_points[index] };
};

type Source = { label: string; url: string };
type Recap = { matchupId: number; teamIds: [number, number]; billing: string; summary: string; xFactorRosterId: number; xFactorId: string; xFactor: string; lowlight: string; sources?: Source[] };
type Ranking = { rosterId: number; previousRank: number; tier: string; outlook: string; sources?: Source[] };
type Preview = { matchupId: number; teamIds: [number, number]; billing: string; story: string; key: string; pickId: number; pickReason: string; sources?: Source[] };

export const week7Overview = {
  "headline": "SIX PULL AWAY. ONLY FIVE GET THE RECORD BERTHS.",
  "lead": "Amberwood, the top half just swept the entire card. All six teams entering Week 7 atop the record-and-points standings won, Roshik stayed perfect, Pranav P hung 177.98, and the bottom half went home with six fresh explanations. That looks like separation. But do not print six playoff tickets: only five berths follow the standings, and the sixth belongs to the highest-scoring team left outside them. Right now that team is Taaha, 2\u20135 and leading the whole league in points. Abhiram is sixth by record and would miss out. The standings have built a velvet rope; the wildcard has found a side entrance."
};

export const playoffPicture = {
  "headline": "THE TOP SIX SWEPT. THE PLAYOFF SIX ARE DIFFERENT.",
  "paragraphs": [
    "Before Week 7, the top six by record with points as the tiebreaker were Roshik, Pranav J, Anudeep, Pranav P, Ankith and Abhiram. All six won. They are now all at least 4\u20133, while seventh-place Aditya is 3\u20134 and four more teams sit at 2\u20135. It is an emerging split, not a clinch: sixth is still only one win above seventh.",
    "Ankith and Abhiram are tied at 4\u20133 for the last record-based berth, with Ankith ahead 929.52\u2013921.26 in total points, just 8.26. Abhiram\u2019s win matters, but sixth in the standings is not an automatic playoff seat. He can chase fifth on record and the points tiebreaker, or chase the separate wildcard race.",
    "Taaha has 1,010.56 total points, most in Amberwood, despite a 2\u20135 record and three straight losses. He currently takes the wildcard ahead of Sahil\u2019s 923.64 and Abhiram\u2019s 921.26, leads of 86.92 and 89.30. If the regular season ended now, the six qualifiers would be the top five listed below plus Taaha, not the top six in the standings."
  ],
  "topFive": "Roshik 7\u20130 (998.32 PF); Pranav J 6\u20131 (986.96); Pranav P 5\u20132 (985.00); Anudeep 5\u20132 (974.14); Ankith 4\u20133 (929.52).",
  "wildcard": "Taaha 1,010.56 PF; Sahil 923.64 (86.92 back); Abhiram 921.26 (89.30); GarVeen 845.28 (165.28); Aditya 799.02 (211.54); Abhishek 768.90 (241.66); Sahit 696.42 (314.14)."
};

export const week7Recaps: Recap[] = [
  {
    "matchupId": 4,
    "teamIds": [
      4,
      5
    ],
    "billing": "THE BANK SURVIVES A SUNDAY-NIGHT CROSS-EXAMINATION",
    "summary": "Taaha struck first Thursday: Burden and Santos combined for 38.40 against Stevenson\u2019s 23.00. By the end of Sunday\u2019s early window, Ankith had turned that into a 78.90\u201367.80 lead, with Allen\u2019s 21.40 doing the heavy lifting. The late games pushed the bank to 132.32 while Taaha sat at 85.90. Then came the anxiety subscription: JSN\u2019s 33.30 and Walker\u2019s 9.70 against Myers\u2019 6.50 on Sunday night. The chase stopped 9.92 short. Ankith wins 138.82\u2013128.90, snaps a two-game slide and reaches 4\u20133; Taaha loses a third straight to fall to 2\u20135 despite ranking fifth in weekly scoring. The bank passed its stress test. Burden of Proof submitted another immaculate case to a judge who only reads the win column.",
    "xFactorRosterId": 4,
    "xFactorId": "7611",
    "xFactor": "Rhamondre Stevenson\u2019s 23.00 gave Ankith a real Thursday foundation, and the Allen\u2013Jeanty pair added 43.00. Three running backs above 21 points let the bank absorb JSN\u2019s late closing argument without needing a Monday bailout.",
    "lowlight": "Taaha got 1.70 apiece from Jaylin Noel and Juwan Johnson, plus \u22121.00 from San Francisco. Caleb Douglas\u2019 22.50 stayed on the bench; this was not a lack of total talent so much as the most expensive seating chart in the league.",
    "sources": [
      {
        "label": "Week 7 kickoff windows and final games; starter points grouped by completed window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=7&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 1,
    "teamIds": [
      7,
      8
    ],
    "billing": "FOUR STRAIGHT WINS. SEVEN STRAIGHT SOS SIGNALS.",
    "summary": "Sahit owned Thursday 56.44\u201314.10 behind Maye and Loveland, so for a brief moment the island had reliable electricity. Rodgers brought Pranav P to 27.18 in London, then the Sunday early avalanche arrived: 96.10 from McCaffrey, Flowers, Nabers, Kittle and Minnesota. That flipped the picture to 123.28\u201385.44. Corum and Jameson Williams added 43.20 in the late window, leaving Pranav P ahead 166.48\u2013104.84 before Monday. Barkley\u2019s 15.10 beat Aubrey\u2019s 11.50, but the final was still 177.98\u2013119.94. Pranav P takes the weekly high, wins a fourth straight and climbs to 5\u20132. Sahit is 0\u20137. This was the week the island needed a rescue boat and got a commemorative postcard.",
    "xFactorRosterId": 7,
    "xFactorId": "9997",
    "xFactor": "Zay Flowers\u2019 30.20 was the biggest score on the winning roster and the centerpiece of the 96.10-point Sunday-early takeover. Nine starters reached double figures, with Jameson Williams at 26.10 and McCaffrey at 22.00; this was depth doing its loudest possible demonstration.",
    "lowlight": "Sahit\u2019s 119.94 would have beaten five other teams, including Anudeep, but not the weekly-high machine across the aisle. Roschon Johnson, Shrader and the Jets combined for 5.10, and the roster had no bench scorer above zero to turn into an easy hindsight fix.",
    "sources": [
      {
        "label": "Week 7 kickoff windows and final games; starter points grouped by completed window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=7&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 6,
    "teamIds": [
      3,
      6
    ],
    "billing": "SEVEN AND OH. THE CHAMP\u2019S ENGINE LIGHT IS ON.",
    "summary": "Roshik opened with Douglas\u2019 5.30 Thursday, then Olave and Boswell brought him to 26.50 after London against Warren\u2019s 18.70. The teams were almost level after Sunday early: Roshik 42.70, Sahil 42.30. The late window settled the argument. Cousins, Jacobs, Watson, Bowers and Harvey delivered exactly 80.00, pushing Olave Garden to a finished 122.70 while Sahil had 54.20 and the Dak\u2013Pickens stack left Monday. The required comeback was 68.50; the stack supplied 38.98. Roshik wins 122.70\u201393.18 and remains unbeaten at 7\u20130. Sahil is 2\u20135 after consecutive sub-100 weeks. The defending champion followed the 213.14 record with 97.42 and 93.18, an impressive commitment to making that record look like a clerical error.",
    "xFactorRosterId": 3,
    "xFactorId": "5850",
    "xFactor": "Josh Jacobs\u2019 20.10 helped anchor the decisive 80.00-point late window. Cousins led the roster with 20.40, while three more late starters reached double figures; Roshik did not need a single heroic outlier to finish the job.",
    "lowlight": "Henry, Garrett Wilson and Jefferson combined for 18.90, only 0.20 more than Warren alone. Tre Tucker\u2019s 23.30 was left on the bench, but even replacing the lowest-scoring flex with him would not erase a 29.52-point loss; the problem was wider than one lineup call.",
    "sources": [
      {
        "label": "Week 7 kickoff windows and final games; starter points grouped by completed window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=7&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 5,
    "teamIds": [
      12,
      2
    ],
    "billing": "POLLARD BROUGHT A FIRE EXTINGUISHER. WRONG DIRECTION.",
    "summary": "Swift put Pranav J ahead with 19.00 Thursday. Abhishek\u2019s London opening was Bernard\u2019s 5.70; by the end of Sunday early the gap was 106.72\u201359.22, with Pollard\u2019s 38.50 turning the matchup into a public-service announcement. Puka helped Pranav J reach 132.42 in the late window, Seattle added 7.50 Sunday night, and Lamb supplied another 24.40 Monday after the opponent was already finished. Final: 164.32\u201372.32, a 92.00-point demolition. Pranav J moves to 6\u20131 with three straight wins. Abhishek\u2019s two-game revival ends at 2\u20135. Zero Dark Purdy took the first two words of the brand far too literally.",
    "xFactorRosterId": 12,
    "xFactorId": "5967",
    "xFactor": "Tony Pollard\u2019s 38.50 led every starter in this matchup and accounted for more than half of Abhishek\u2019s entire team score. The winning supporting cast then had the audacity to include Lamb\u2019s 24.40, Puka\u2019s 21.80 and Swift\u2019s 19.00.",
    "lowlight": "Abhishek had no starter above Purdy\u2019s 12.02 and only one other double-digit scorer: kicker Will Reichard at 10.40. LaPorta\u2019s 2.80 and the two rookie receiver totals of 5.70 each left no platform for a competitive finish.",
    "sources": [
      {
        "label": "Week 7 kickoff windows and final games; starter points grouped by completed window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=7&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 2,
    "teamIds": [
      10,
      11
    ],
    "billing": "BUC-EE\u2019S EXPANDS. GARVEEN MISSES ANOTHER EXIT.",
    "summary": "GarVeen led 6.30 after Thursday and 27.10\u20134.00 after London, but the lead had the shelf life of a gas-station sandwich. Abhiram piled up 98.28 in Sunday\u2019s early window, led by Higgins\u2019 28.80 and Irving\u2019s 25.00, and emerged ahead 102.28\u201367.42. McBride\u2019s 29.10 drove the late push to 137.48 against GarVeen\u2019s finished 99.82. Lemon added 19.70 Monday for a 157.18\u201399.82 final. Abhiram follows last week\u2019s 150.46 with an even bigger score, improves to 4\u20133 and makes the fifth-place race uncomfortable. GarVeen falls to 2\u20135 with five straight losses. Two managers, one team, and apparently neither has the password to the win column.",
    "xFactorRosterId": 10,
    "xFactorId": "8130",
    "xFactor": "Trey McBride\u2019s 29.10 edged Higgins for the winning roster\u2019s top score and made the Sunday-late cushion feel permanent. The broader story is five starters at 19.30 or better, with Omar Cooper\u2019s 24.50 still available on the bench.",
    "lowlight": "The Allen bye replacement produced Bryce Young\u2019s 5.42, while Henderson managed 4.30 and New England added 2.00. Amon-Ra\u2019s 26.20 and Taylor\u2019s 19.00 were useful, but nobody was winning this 57.36-point argument by tweaking one bench slot.",
    "sources": [
      {
        "label": "Week 7 kickoff windows and final games; starter points grouped by completed window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=7&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 3,
    "teamIds": [
      1,
      9
    ],
    "billing": "A WIN, A MOUSE, AND A VERY FORGIVING OPPONENT",
    "summary": "No Thursday starters here. Pittsburgh gave Anudeep an 8.00\u20135.80 edge after London, but Judkins and Pitts helped Aditya take a 49.00\u201339.40 lead through Sunday early. Love and Gibbs led a 46.16-point late response, flipping Anudeep ahead 85.56\u201374.00. Kelce versus Worthy on Sunday night stretched that to 93.96\u201378.10. Monday brought Javonte against Goedert; Javonte won that duel 23.50\u20139.80, and Anudeep won the matchup 117.46\u201387.90. Made in Jahmyrica is 5\u20132 after two straight wins. Aditya slips to 3\u20134. Anudeep gets the victory and the Mickey ears, a complete resort package with the queue conveniently removed.",
    "xFactorRosterId": 1,
    "xFactorId": "7588",
    "xFactor": "Javonte Williams\u2019 23.50 was Anudeep\u2019s highest score and expanded the Monday margin by 13.70. Anudeep entered the night ahead by 15.86, so this was a clean close rather than a comeback that needs mythology attached.",
    "lowlight": "Anudeep survived Fitzgerald\u2019s 0.00 and Coker\u2019s 1.90 because Aditya\u2019s Collins, Worthy and Pineiro combined for only 7.70. Burrow\u2019s 28.88 sat behind Love\u2019s 16.96 on the winning bench, but an opponent finishing at 87.90 lets you get away with a surprising amount of paperwork.",
    "sources": [
      {
        "label": "Week 7 kickoff windows and final games; starter points grouped by completed window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=7&seasontype=2&dates=2026"
      }
    ]
  }
];

export const mickeyOfTheWeek = {
  "rosterId": 1,
  "headline": "MADE IN JAHMYRICA. CHECKED INTO MICKEY\u2019S RESORT.",
  "summary": "Anudeep won with 117.46, the eighth-highest score of the week and the lowest among all six winners. He would have gone 4\u20137 against the full league, but drew Aditya\u2019s 87.90, the eleventh-highest score. Taaha and Sahit both scored more and lost; Anudeep gets 5\u20132 and a complimentary pair of ears.",
  "allPlayWins": 4,
  "allPlayLosses": 7,
  "scoreRank": 8,
  "opponentRank": 11,
  "verdict": "The score was ordinary. The opponent was extremely cooperative. Javonte closed it properly Monday, but the schedule had already upgraded the room."
};

export const week7PowerRankings: Ranking[] = [
  {
    "rosterId": 3,
    "previousRank": 1,
    "tier": "The unbeaten standard",
    "outlook": "Roshik is 7\u20130 with a balanced lineup that just won without a 21-point scorer, and his lead has earned the first chair until somebody actually takes it. Olave\u2019s bye and Aaron Jones\u2019 day-to-day knee trim the depth, but Cousins remains the Raiders\u2019 Week 8 starter while Lamar\u2019s return awaits more information.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-26"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://amp.nfl.com/news/raiders-klint-kubiak-sticking-with-kirk-cousins-as-starting-qb-for-week-8-game-vs-jets"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 12,
    "previousRank": 3,
    "tier": "A real challenger",
    "outlook": "Pranav J is 6\u20131 after a 92-point win, with Pollard, Lamb and Puka providing the kind of ceiling that can threaten the unbeaten favorite. Jordan Love is now rostered to cover Stroud\u2019s bye, but Fairbairn needs a replacement and the Giants backfield options are off, so this is a strong team with actual housekeeping rather than permission to coast.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 7,
    "previousRank": 4,
    "tier": "Four straight and accelerating",
    "outlook": "Pranav P has four straight wins, the weekly high and enough production to move ahead of Anudeep on the 5\u20132 points tiebreaker. Week 8 takes away McCaffrey, Kittle and Nabers, while McCaffrey\u2019s mild hamstring strain remains a post-bye watch, so Daniels and the supporting cast must protect that momentum.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.49ers.com/news/after-further-review-shanahan-provides-mccaffrey-injury-update-breaks-down-week-7-game"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 1,
    "previousRank": 2,
    "tier": "Winning with room to improve",
    "outlook": "Anudeep is 5\u20132 and has a deep enough roster to win while leaving Burrow\u2019s 28.88 on the bench, although the Mickey award is a fair reminder that this week was not dominant. There are no Week 8 byes and Burrow is now his lone rostered quarterback, but Golden\u2019s estimated non-participation and Coker\u2019s limited walkthrough status make the Thursday receiving decisions worth attention.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.packers.com/news/packers-panthers-injury-report-oct-26-2026"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 5,
    "previousRank": 5,
    "tier": "The wildcard refuses to die",
    "outlook": "Taaha is 2\u20135 but leads Amberwood with 1,010.56 points, which currently earns the wildcard and makes a burial based only on record look ridiculous. Lawrence and Meyers return from bye and Omar Cooper is now rostered, while the Juwan Johnson, Deebo and 49ers-defense byes demand replacements rather than another week of treating JSN as an entire department.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 4,
    "previousRank": 6,
    "tier": "The fifth-place tightrope",
    "outlook": "Ankith\u2019s three productive running backs delivered the win that keeps him fifth, but his points tiebreak cushion over Abhiram is only 8.26. A bye-free Week 8 is a genuine opportunity against Pranav P\u2019s depleted core, provided Hall\u2019s return is checked before assuming Allen keeps the same workload.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.miamidolphins.com/news/inactives-week-7-dolphins-at-jets"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 10,
    "previousRank": 7,
    "tier": "The cutoff\u2019s loudest pursuer",
    "outlook": "Abhiram has scored 307.64 over the last two weeks and is only 8.26 total points behind Ankith for fifth, yet sixth by record would currently leave him out behind Taaha\u2019s wildcard. The immediate danger is practical: both rostered quarterbacks, McCarthy and Shough, are on bye, so the Higgins\u2013McBride\u2013Irving core needs a new passer rather than another compliment.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 6,
    "previousRank": 8,
    "tier": "The champion\u2019s warning light",
    "outlook": "Sahil still has a path through points, sitting 86.92 behind Taaha, but back-to-back sub-100 weeks have pushed the defending champion to 2\u20135 and made the record route much harder. Dak and Pickens remain a useful stack, yet Likely and Zvada are both on bye with no other tight end or kicker currently rostered, so two additions come before any talk of a title defense.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 11,
    "previousRank": 9,
    "tier": "Five straight wrong turns",
    "outlook": "GarVeen is 2\u20135 after five consecutive losses, and 165.28 points behind the current wildcard leader leaves little room for more quiet weekends. Allen returns from bye to repair the quarterback spot, but Kamara, Harrison and newly rostered Vele are off, while Amon-Ra\u2019s ankle status still needs watching rather than assuming every returning name is ready.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 9,
    "previousRank": 11,
    "tier": "The record route is closer",
    "outlook": "Aditya is 3\u20134 and one win behind the fifth-place pair, so chasing a record berth is a more immediate proposition than erasing a 211.54-point wildcard deficit. Cook returns from bye, but Collins is off and both kicker and defense need replacements, making this a week for basic lineup repair before any elaborate comeback speech.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 2,
    "previousRank": 10,
    "tier": "Two steps forward, a trapdoor back",
    "outlook": "Abhishek\u2019s two-win revival ended with 72.32, leaving him 2\u20135 and 241.66 points off the wildcard pace. Brissett can cover Purdy\u2019s bye and White returns to the available pool, but Marks and Evans are also off and Evans\u2019 possible post-bye return is not a Week 8 rescue plan.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.49ers.com/news/after-further-review-shanahan-provides-mccaffrey-injury-update-breaks-down-week-7-game"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "rosterId": 8,
    "previousRank": 12,
    "tier": "The island needs more than morale",
    "outlook": "Sahit is 0\u20137 despite improving to 119.94 this week, and 1,077.96 points against explains some of the damage without creating a win. Bye-week reinforcements give him more choices, but Barkley\u2019s new back issue and Waddle\u2019s chest exit mean the next lineup still needs a real availability check rather than an optimistic roll call.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-26"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://fieldlevelmedia.com/news/broncos-wr-jaylen-waddle-chest-exits-vs-cardinals/"
      }
    ]
  }
];

export const week8Previews: Preview[] = [
  {
    "matchupId": 1,
    "teamIds": [
      4,
      7
    ],
    "billing": "THE FIFTH-PLACE BANK MEETS THE BYE-WEEK TAX",
    "story": "Ankith is 4\u20133 and guarding an 8.26-point tiebreak edge for fifth. Pranav P is 5\u20132 with four straight wins and just scored 177.98, but now has to discover whether the supporting cast can keep the show running when three headliners leave town.",
    "key": "McCaffrey, Kittle and Nabers are all on bye; Daniels returns and Hunter Henry offers an existing tight-end answer. Ankith has no byes, although Hall\u2019s status could change Allen\u2019s role. Kraft and McMillan can open Thursday, with Myers potentially waiting until Monday.",
    "pickId": 4,
    "pickReason": "Ankith, narrowly. The availability advantage is substantial, but Flowers and Jameson just showed why declaring Pranav P helpless would be an excellent way to become next week\u2019s screenshot.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.49ers.com/news/after-further-review-shanahan-provides-mccaffrey-injury-update-breaks-down-week-7-game"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.miamidolphins.com/news/inactives-week-7-dolphins-at-jets"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 6,
    "teamIds": [
      1,
      5
    ],
    "billing": "MICKEY\u2019S NEW TENANT MEETS THE POINTS KING",
    "story": "Anudeep is 5\u20132 with a trophy nobody requested. Taaha is 2\u20135 with more points than anybody else. One has been collecting wins; the other has been collecting evidence. This pairing could pull Taaha closer to the record race while he tries to defend the wildcard lead.",
    "key": "Anudeep has no byes but must monitor Golden and Coker before Thursday. Taaha gets Lawrence and Meyers back, has Omar Cooper on the current roster, and can use Chig Okonkwo with Juwan Johnson off. The 49ers-defense bye still needs covering; Burden, JSN and Santos give Taaha a possible Monday closing crew.",
    "pickId": 1,
    "pickReason": "Anudeep by a thin margin. The available running-back base and no-bye roster get the nod, but Taaha\u2019s scoring profile makes this a much tougher matchup than 5\u20132 against 2\u20135 suggests.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.packers.com/news/packers-panthers-injury-report-oct-26-2026"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 3,
    "teamIds": [
      6,
      10
    ],
    "billing": "THE CHAMPION VERSUS THE CUTOFF CHASER",
    "story": "Sahil needs to stop turning his record week into a historical footnote. Abhiram needs another win and enough points to threaten Ankith\u2019s fifth-place tiebreak. Both have a reason to care about every last reception even after the head-to-head result starts to take shape.",
    "key": "Abhiram needs a quarterback because McCarthy and Shough are both on bye. Sahil needs a tight end and kicker with Likely and Zvada off. Once those holes are filled, the comparison is the Dak\u2013Pickens\u2013Henry\u2013Jefferson ceiling against Abhiram\u2019s Irving\u2013Higgins\u2013McBride\u2013Lemon spread.",
    "pickId": 10,
    "pickReason": "Abhiram, conditional on adding a starting quarterback. Two straight weeks above 150 and several independent scoring paths earn the edge; leaving QB empty would void the entire argument.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 4,
    "teamIds": [
      3,
      8
    ],
    "billing": "THE UNBEATEN RESTAURANT VISITS THE WINLESS ISLAND",
    "story": "Roshik is 7\u20130. Sahit is 0\u20137. The league has produced the cleanest possible record contrast, which is usually when fantasy decides to act like a prank show. Roshik wants distance at the top; Sahit wants one Sunday that does not require a philosophical explanation.",
    "key": "Olave is off for Roshik, Lamar\u2019s return is not confirmed and Aaron Jones is day-to-day, but Cousins remains an available quarterback fallback. Sahit has no byes and gets several Week 7 absentees back on the schedule; Barkley\u2019s back and Waddle\u2019s chest still need checking before counting those points.",
    "pickId": 3,
    "pickReason": "Roshik. The balanced scoring base and roster resilience make him the clear favorite, but this is a forecast, not permission to replace the lineup screen with a reservation confirmation.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-26"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://amp.nfl.com/news/raiders-klint-kubiak-sticking-with-kirk-cousins-as-starting-qb-for-week-8-game-vs-jets"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://fieldlevelmedia.com/news/broncos-wr-jaylen-waddle-chest-exits-vs-cardinals/"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 5,
    "teamIds": [
      11,
      12
    ],
    "billing": "FIVE STRAIGHT LOSSES MEET THREE STRAIGHT WINS",
    "story": "GarVeen is 2\u20135 and looking for a functional reset. Pranav J is 6\u20131 and just won by 92.00. Getting Josh Allen back helps, but the other side is arriving with Pollard, Lamb and Puka and no interest in providing a rehabilitation service.",
    "key": "Pranav J now has Love to cover Stroud\u2019s bye, though Fairbairn needs replacing and Tracy and Skattebo are off. GarVeen gets Allen back while Kamara, Harrison and Vele sit; Amon-Ra\u2019s ankle and Kincaid\u2019s availability need checking. Love can open Thursday and Swift could finish Monday.",
    "pickId": 12,
    "pickReason": "Pranav J. The top-end receivers and backfield give him more reliable scoring routes, while GarVeen needs both a stronger supporting cast and the returning names actually available.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 2,
    "teamIds": [
      2,
      9
    ],
    "billing": "SOMEBODY HAS TO REOPEN THE KITCHEN",
    "story": "Abhishek is 2\u20135 after the lowest score of the week. Aditya is 3\u20134 after the second-lowest. The prize is an actual win, not a complimentary certificate for surviving the injury report; Aditya is still only one victory behind the fifth-place tie.",
    "key": "Purdy and Marks are off for Abhishek, with Brissett and White current options. Cook returns for Aditya, but Collins is off and both kicker and defense need replacements. Neither manager should mistake a player\u2019s practice-window opening or an old injury tag for a confirmed Week 8 start.",
    "pickId": 9,
    "pickReason": "Aditya, narrowly. Cook\u2019s return and the established quarterback and tight-end choices give the cleaner starting point, provided the empty specialist jobs get filled.",
    "sources": [
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      },
      {
        "label": "Week 8 schedule and current availability reporting",
        "url": "https://www.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-26"
      }
    ]
  }
];
