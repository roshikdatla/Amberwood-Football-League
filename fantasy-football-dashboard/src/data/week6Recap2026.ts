import snapshot from './week6Recap2026Snapshot.json';

export const editionStatus = snapshot.phase;
export const recapSource = snapshot;
const managers: Record<number, string> = {
  1: 'Anudeep', 2: 'Abhishek', 3: 'Roshik', 4: 'Ankith', 5: 'Taaha', 6: 'Sahil',
  7: 'Pranav P', 8: 'Sahit', 9: 'Aditya', 10: 'Abhiram', 11: 'Gary & Naveen', 12: 'Pranav J',
};
type Result = { roster_id: number; matchup_id: number; points: number; custom_points: number | null };
const completedWeeks: Result[][] = [snapshot.week1, snapshot.week2, snapshot.week3, snapshot.week4, snapshot.week5, snapshot.week6];
export const recapTeams = snapshot.teams.map(team => {
  const current = snapshot.week6.find(row => row.roster_id === team.rosterId)!;
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
  if (!team) throw new Error(`Unknown Week 6 roster: ${id}`);
  return team;
};
export const formatScore = (points: number) => points.toFixed(2);
export const getStarter = (rosterId: number, playerId: string) => {
  const matchup = snapshot.week6.find(row => row.roster_id === rosterId);
  const index = matchup?.starters.indexOf(playerId) ?? -1;
  if (!matchup || index < 0) throw new Error(`${playerId} did not start for roster ${rosterId} in Week 6`);
  const player = (snapshot.players as Record<string, { name: string; position: string; team: string | null }>)[playerId];
  return { ...player, points: matchup.starters_points[index] };
};

type Source = { label: string; url: string };
type Recap = { matchupId: number; teamIds: [number, number]; billing: string; summary: string; xFactorRosterId: number; xFactorId: string; xFactor: string; lowlight: string; sources?: Source[] };
type Ranking = { rosterId: number; previousRank: number; tier: string; outlook: string; sources?: Source[] };
type Preview = { matchupId: number; teamIds: [number, number]; billing: string; story: string; key: string; pickId: number; pickReason: string; sources?: Source[] };

export const week6Overview = {
  "headline": "SIX AND OH. TWO MOUSE EARS. THREE MONDAY HEISTS.",
  "lead": "Amberwood, do not touch that remote. Pranav P turned a 47.90-point Monday hole into a 21.70-point win. Abhiram won the highest-scoring fight of the week with a final-night answer. Abhishek made it two straight by beating the defending champion, who followed 213.14 with 97.42. And somehow the man receiving the Mickey award is also the man nobody has beaten: Roshik, 6–0, still taking reservations at Olave Garden. Taaha scored third and lost. Sahit lost without Gibbs or Burrow even appearing for his opponent. The scoreboard has stopped pretending to be fair, and the Week 7 bye list is already sharpening the knife."
};

export const week6Recaps: Recap[] = [
  {
    "matchupId": 1,
    "teamIds": [
      7,
      11
    ],
    "billing": "47.90 DOWN. THREE MEN. ONE MONDAY TAKEOVER.",
    "summary": "GarVeen had finished the job. Unfortunately, Pranav P had not started the closing shift. With neither team involved Thursday, Sunday gave Gary and Naveen Taylor’s 21.10, Metcalf’s 20.30 and a respectable 125.20 final total. Nabers kept Pranav P breathing with 30.50, but after Aubrey’s lonely Sunday-night point the challenger sat at 77.30. The deficit: 47.90. The remaining cast: Daniels, McCaffrey and Kittle. Cue 21.00, 30.70 and 17.90, a 69.60-point Monday surge that flipped the result to 146.90–125.20. Pranav P is 4–2 with three straight wins; GarVeen is 2–4 with four straight losses. Two managers, a 47.90-point cushion, and still nobody assigned to night security.",
    "xFactorRosterId": 7,
    "xFactorId": "4034",
    "xFactor": "Christian McCaffrey’s 30.70 led the comeback and edged Nabers for the biggest score on the winning roster. Daniels and Kittle supplied the other 38.90, so this was a three-man rescue with McCaffrey driving the getaway car.",
    "lowlight": "GarVeen’s 125.20 ranked fifth and would have beaten seven opponents. That is real bad luck, but Ferguson’s 3.30 and Harrison’s 6.40 left little insurance against an opponent saving three stars for Monday; Diggs’ 16.40 on the bench was another painful receipt, not a one-swap cure for the 21.70-point loss.",
    "sources": [
      {
        "label": "Week 6 kickoff windows and completed games; final starter points grouped by window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=6&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 3,
    "teamIds": [
      10,
      5
    ],
    "billing": "THIRTY-EIGHT HUNDREDTHS. THEN WHITE CLOSED THE DOOR.",
    "summary": "Taaha opened Thursday with JSN’s 27.40, then Lawrence, Meyers and Little carried him to 77.04 after London. Abhiram answered Sunday afternoon with Shough’s 26.96, Omar Cooper’s 24.80 and Hubbard’s 21.10; Walker’s 29.90 kept Taaha swinging back. When Sunday was over, the margin was practically a rounding error: Taaha 135.14, Abhiram 134.76. A 0.38-point lead, San Francisco’s defense against Rachaad White, and one last broadcast to settle it. White delivered 15.70 to the defense’s 5.00. Abhiram wins 150.46–140.14, claims the weekly high score and climbs to 3–3. Taaha scores third, falls to 2–4 and gets to explain why being good at fantasy is apparently insufficient. Buc-ee’s stayed open late. The courtroom ran out of objections.",
    "xFactorRosterId": 10,
    "xFactorId": "8136",
    "xFactor": "Rachaad White’s 15.70 turned a 0.38-point deficit into a 10.32-point win. The Sunday contributors built the platform, but White supplied the final answer with Taaha still holding a live defense on the other side.",
    "lowlight": "Juwan Johnson and MarShawn Lloyd combined for 1.00 for Taaha, while Kyren stopped at 9.70. Walker, JSN and Lawrence combined for 84.64 and still could not make up for every quiet seat in the room.",
    "sources": [
      {
        "label": "Week 6 kickoff windows and completed games; final starter points grouped by window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=6&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 5,
    "teamIds": [
      3,
      4
    ],
    "billing": "UNBEATEN. UNCONVINCING. UNAVAILABLE FOR COMMENT.",
    "summary": "Roshik’s 19.80 Thursday opening beat Myers’ 5.90, but Ankith had moved in front 83.84–76.00 after the Sunday early window. Young’s 19.84 and Egbuka’s 17.80 had the bank open for business. The late games handed the lead back: Cousins and Bowers helped Roshik reach 105.52 against Ankith’s 99.64, leaving Watson versus Kraft on Sunday night. Kraft needed to outscore Watson by more than 5.88. Instead, Watson won their little duel 9.40–8.70, and the final became 114.92–108.34. No Monday lifeline. Roshik moves to 6–0; Ankith slips to 3–3 after a second straight loss. Olave Garden survived without a single 20-point starter, which is either excellent resilience or a rewards program the rest of us were not invited to join.",
    "xFactorRosterId": 3,
    "xFactorId": "1945",
    "xFactor": "Chris Boswell’s 14.90 beat Myers by 9.00 in a matchup decided by 6.58. On a quiet week for the marquee names, the kicker supplied a larger positional edge than the entire winning margin.",
    "lowlight": "Stevenson’s 3.60 and Jacksonville’s 1.00 gave Ankith almost no cushion. Bryce Young outscored bench quarterback Caleb Williams 19.84–15.50, so this one cannot be filed under the usual hindsight-QB complaint; the undefeated opponent simply found enough loose change elsewhere.",
    "sources": [
      {
        "label": "Week 6 kickoff windows and completed games; final starter points grouped by window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=6&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 6,
    "teamIds": [
      2,
      6
    ],
    "billing": "THE RECORD HOLDER LOST TO THE REBUILD.",
    "summary": "Last week Sahil broke the record book. This week Abhishek checked whether the warranty covered sudden power failure. Dobbins gave Abhishek a 13.60–12.00 Thursday edge, Bernard erupted for 25.70 on Sunday, and Likely’s 23.90 kept Sahil upright while Henry and Warren combined for just 14.80. Dak and Pickens added 24.32 Sunday night, putting Sahil ahead 95.12–80.20 with one game left. Abhishek still had Purdy, Evans and Drew Stevens; Sahil had Cooks. The closing totals were 35.86 versus 2.30, turning a 14.92-point deficit into a 116.06–97.42 victory. Both teams are 2–4, but only one has won twice in a row. Sahil went from first to last in weekly scoring, a 115.72-point drop. The jet plane appears to have left its offense in last week’s overhead compartment.",
    "xFactorRosterId": 2,
    "xFactorId": "13274",
    "xFactor": "Germie Bernard’s 25.70 was the biggest score in the matchup and kept Abhishek within Monday striking distance. Purdy finished the job, but Bernard gave the rescue team an address worth driving to.",
    "lowlight": "Tre Tucker’s 27.20 sat on Sahil’s bench while Cooks started for 2.30. That legal receiver-for-receiver hindsight swap gains 24.90, more than the 18.64-point loss; this is the kind of bench receipt that prints itself without anyone pressing the button.",
    "sources": [
      {
        "label": "Week 6 kickoff windows and completed games; final starter points grouped by window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=6&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 2,
    "teamIds": [
      1,
      8
    ],
    "billing": "NO GIBBS. NO BURROW. STILL NO FIRST WIN.",
    "summary": "Thursday belonged to Waddle’s 6.40, and Tuten’s 24.70 pushed Sahit to 31.10 after London before Anudeep had scored. Maye’s 23.80 and Loveland’s 18.50 helped Sahit finish at 107.70, while Anudeep reached Sunday night on only 67.10. The island could see the rescue boat. Then Love, Golden and Javonte arrived with 20.24, 24.40 and 13.00, a 57.64-point Sunday-night response that took Anudeep to 124.74. Ekeler’s 2.70 Monday was merely the signature at the bottom: 127.44–107.70. Anudeep is 4–2 after covering the Gibbs and Burrow byes; Sahit is 0–6. Losing to the full-strength contender would have been understandable. Losing to the temporary staff is a much harder performance review.",
    "xFactorRosterId": 1,
    "xFactorId": "12501",
    "xFactor": "Matthew Golden’s 24.40 was Anudeep’s biggest score and the loudest piece of the Sunday-night comeback. Add Coker’s 14.70 and Tate’s 19.00, and the replacement-heavy supporting cast supplied exactly the kind of depth a contender needs.",
    "lowlight": "Maye, Tuten and Loveland combined for 67.00; Sahit’s other seven starters supplied 40.70. Brown’s 4.70 and Waddle’s 6.40 did not provide enough receiving support, and the first-win celebration has now been postponed so often the caterer is asking for a deposit.",
    "sources": [
      {
        "label": "Week 6 kickoff windows and completed games; final starter points grouped by window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=6&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 4,
    "teamIds": [
      12,
      9
    ],
    "billing": "TWO ZEROS. ONE LAMB. FIVE WINS.",
    "summary": "Pranav J began with Seattle’s 2.00 Thursday, then Stroud and Fairbairn helped him reach 34.88 after London against Aditya’s 22.80. Swift’s 23.00 and DeVonta Smith’s 20.50 kept the wheels moving despite zeros from Skattebo and Waller. Aditya’s late-window group, led by Cook’s 24.30, pushed him in front 105.28–99.98 before Sunday night. Lamb answered with 16.00, putting Pranav J at 115.98 and leaving Aditya needing more than 10.70 from Pineiro on Monday. The kicker supplied 3.30. Final: 115.98–108.58, a 7.40-point escape that sends Pranav J to 5–1 and Aditya to 3–3. Last week both managers authored Monday miracles. This week one needed a kicker, the other needed the kicker not to do much, and only the second prayer was answered.",
    "xFactorRosterId": 12,
    "xFactorId": "6786",
    "xFactor": "CeeDee Lamb’s 16.00 converted a 5.30-point Sunday-night deficit into the cushion Pineiro could not erase. Stroud and Swift supplied 45.98 earlier, but Lamb delivered the final lead change between completed game windows.",
    "lowlight": "Aditya left Kyle Pitts’ 23.00 on the bench while starting Goedert for 12.10. The 10.90-point hindsight gain exceeds the 7.40-point margin; meanwhile, Pranav J somehow won with two zeroes, which should require a signed explanation before the app awards the victory.",
    "sources": [
      {
        "label": "Week 6 kickoff windows and completed games; final starter points grouped by window",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=6&seasontype=2&dates=2026"
      }
    ]
  }
];

export const mickeyOfTheWeek = {
  "rosterId": 3,
  "allPlayWins": 4,
  "allPlayLosses": 7,
  "scoreRank": 8,
  "opponentRank": 10,
  "headline": "Table for six wins. High chair for the mouse.",
  "summary": "Roshik is 6–0. Roshik is also wearing the ears. His 114.92 ranked eighth and beat Ankith’s tenth-place 108.34, making him the lowest-scoring winner; against all eleven alternatives, he goes 4–7. Taaha scored 140.14 and lost. GarVeen scored 125.20 and lost. Olave Garden scored less than both, handed out breadsticks, and kept the perfect record. Boswell’s 14.90 was useful. The schedule’s contribution was apparently unlimited.",
  "verdict": "Abhishek passes on the ears after actually outscoring half the league this time. Roshik, the unbeaten record remains perfectly real, but the mouse is coming to the next reservation; Sahil gets the first chance to send both home in Week 7."
};

export const week6PowerRankings: Ranking[] = [
  {
    "rosterId": 3,
    "previousRank": 1,
    "tier": "Perfect record, imperfect evening",
    "outlook": "Roshik remains the title favorite at 6–0, with Aaron Jones returning from bye and Jacobs getting a full practice week, although Jacobs’ game availability is not settled. Lamar remains day to day and Doubs is now on IR, so the depth still has work to do; winning eighth-place scoring weeks is a useful skill, but it is not an offensive scheme.",
    "sources": [
      {
        "label": "October 19 Packers: Jacobs practice return, game status undecided",
        "url": "https://www.packers.com/news/packers-rb-josh-jacobs-to-get-full-week-of-practice-game-status-tbd-oct-19-2026"
      },
      {
        "label": "October 19 Ravens update: Jackson day to day",
        "url": "https://www.baltimoreravens.com/news/transcript-press-conferences-10-19-26"
      },
      {
        "label": "October 19–20 NFL injury updates",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-19"
      }
    ]
  },
  {
    "rosterId": 1,
    "previousRank": 3,
    "tier": "The understudies passed the audition",
    "outlook": "Anudeep is 4–2 after winning without Gibbs or Burrow, and getting both back behind Golden’s emergence makes this roster look more like a contender than a team merely surviving. McLaurin’s knee injury threatens the receiver depth with tests still pending, but Sunday’s replacements proved the bench can contribute something besides moral support.",
    "sources": [
      {
        "label": "October 20: McLaurin knee injury, further tests pending",
        "url": "https://amp.nfl.com/news/commanders-wr-terry-mclaurin-carted-off-field-with-knee-injury-vs-49ers"
      }
    ]
  },
  {
    "rosterId": 12,
    "previousRank": 2,
    "tier": "Five wins, important repairs",
    "outlook": "Pranav J is 5–1 with Puka, Lamb, Swift and Stroud keeping the championship ceiling intact, but two Week 6 zeros show how fragile the supporting slots remain. Hurts cannot participate in contact football while receiving treatment, and the tight-end options still need clearance, so the Raymond-for-$3-FAAB deal adds depth rather than solving the lineup’s biggest questions.",
    "sources": [
      {
        "label": "Eagles statement on Hurts treatment and football restrictions",
        "url": "https://www.philadelphiaeagles.com/news/eagles-and-jalen-hurts-agent-nicole-lynn-provide-an-update-on-qb-jalen-hurts"
      },
      {
        "label": "Completed Week 6 league transactions",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/transactions/6"
      }
    ]
  },
  {
    "rosterId": 7,
    "previousRank": 7,
    "tier": "The hottest streak outside first place",
    "outlook": "Three straight wins and a 4–2 record push Pranav P up the board, with McCaffrey, Nabers and Kittle giving him a core that can win without waiting for an opponent to collapse. Daniels is his only rostered quarterback and is on bye alongside Shakir and McConkey, so this week’s management assignment is slightly more demanding than yelling “run it back” at Monday’s highlights.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      }
    ]
  },
  {
    "rosterId": 5,
    "previousRank": 4,
    "tier": "First in points, filing an appeal",
    "outlook": "Taaha leads Amberwood with 881.66 points yet sits at 2–4, and the Walker–JSN–Kyren foundation still looks much stronger than that record. Lawrence and Meyers are on bye while Mason has only opened his practice window, so the playoff recovery needs immediate lineup coverage rather than another beautifully argued case against the schedule.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      },
      {
        "label": "Vikings open Mason return-to-practice window",
        "url": "https://www.vikings.com/news/running-back-jordan-mason-return-to-practice-week-7"
      }
    ]
  },
  {
    "rosterId": 4,
    "previousRank": 6,
    "tier": "The blue chips are coming back",
    "outlook": "Ankith’s 3–3 roster gets Chase and Goff back from bye, with Egbuka, McMillan and Jeanty supplying enough talent to keep a playoff push credible despite two straight losses. Allen’s workload still depends on Hall’s return and the Jaguars defense needs a bye replacement, so the bank has assets but should stop outsourcing its weekly closing statement to bad luck.",
    "sources": [
      {
        "label": "October 19 Jets: Allen role while Hall recovers",
        "url": "https://www.newyorkjets.com/news/jets-notebook-braelon-allen-excels-in-filling-in-breece-hall-starting-role-10-19-2026"
      },
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      }
    ]
  },
  {
    "rosterId": 10,
    "previousRank": 10,
    "tier": "A real receiving option has entered",
    "outlook": "Abhiram reaches 3–3 with the weekly high score, and Cooper’s return plus Higgins coming off bye give this roster a more convincing receiving plan around Hubbard, Irving and McBride. White is off and Pierce’s opportunity depends on Barkley’s availability, so the new ceiling is worth celebrating without penciling every replacement into the permanent starting lineup.",
    "sources": [
      {
        "label": "Jets report on Omar Cooper return and breakout",
        "url": "https://www.newyorkjets.com/news/rookie-omar-cooper-jr-moves-up-jets-all-time-lists-sunday-vs-patriots-10-19-2026"
      },
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      },
      {
        "label": "Last verified Eagles report: Barkley out in Week 6; no Week 7 clearance established",
        "url": "https://www.philadelphiaeagles.com/news/panthers-vs-eagles-injury-report-2026-nfl-week-6-saquon-barkley-devonta-smith"
      }
    ]
  },
  {
    "rosterId": 6,
    "previousRank": 5,
    "tier": "The ceiling is real, so is the floor",
    "outlook": "Sahil’s 2–4 team still has Henry, Jefferson and enough upside to make a playoff recovery, with Jefferson returning after a week in which the champion finished last. The 213.14-to-97.42 swing and Tucker’s wasted 27.20 expose the weekly volatility, so the next title-defense speech should probably be delivered after checking the entire bench.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      }
    ]
  },
  {
    "rosterId": 11,
    "previousRank": 9,
    "tier": "Four straight losses, one urgent vacancy",
    "outlook": "GarVeen’s Allen–Taylor–Amon-Ra foundation still offers more upside than a 2–4 record, and 125.20 was a meaningful improvement even though Monday turned it into a fourth straight loss. Allen, Kincaid and Diggs are on bye with no second quarterback rostered, so Amon-Ra’s return needs to be accompanied by an actual replacement plan rather than another meeting between the co-managers.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      }
    ]
  },
  {
    "rosterId": 2,
    "previousRank": 11,
    "tier": "The rebuild is finally producing wins",
    "outlook": "Abhishek has won two straight to reach 2–4, with Bernard’s breakout and the returning LaPorta and Chase Brown giving the playoff rescue a more credible supporting cast. Evans’ Achilles soreness still needs monitoring despite optimism for Week 7, so celebrate the recovery in the standings without treating every injured name as an automatic lineup upgrade.",
    "sources": [
      {
        "label": "October 19–20 NFL injury updates",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-19"
      },
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      }
    ]
  },
  {
    "rosterId": 9,
    "previousRank": 8,
    "tier": "The kitchen needs a new menu",
    "outlook": "Aditya remains in the race at 3–3, but Adams’ expected six-to-ten-week hamstring absence removes a major receiver while Cook, Coleman and Parker Washington are all on bye. Pitts’ 23.00 on the bench shows there are usable pieces, yet this is now a depth-building job rather than waiting for last week’s Monday comeback to repeat itself.",
    "sources": [
      {
        "label": "October 19: Adams expected to miss 6–10 weeks",
        "url": "https://amp.nfl.com/news/davante-adams-hamstring-expected-to-miss-6-10-weeks-as-injuries-pile-up-rams"
      },
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      }
    ]
  },
  {
    "rosterId": 8,
    "previousRank": 12,
    "tier": "The rescue has a deadline",
    "outlook": "Sahit is 0–6 despite useful production from Maye, Tuten and Loveland, and the margin for a playoff recovery is shrinking fast. Tuten and Vidal are on bye, Barkley’s Week 7 clearance is unverified and Brown was only limited Monday, so the first priority is finding available running backs before anyone prints the comeback banner.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      },
      {
        "label": "Last verified Eagles report: Barkley out in Week 6; no Week 7 clearance established",
        "url": "https://www.philadelphiaeagles.com/news/panthers-vs-eagles-injury-report-2026-nfl-week-6-saquon-barkley-devonta-smith"
      },
      {
        "label": "Week 7 Patriots–Bears estimated Monday injury report",
        "url": "https://www.patriots.com/news/week-7-injury-report-patriots-at-bears"
      }
    ]
  }
];

export const week7Previews: Preview[] = [
  {
    "matchupId": 6,
    "teamIds": [
      3,
      6
    ],
    "billing": "THE PERFECT RECORD MEETS THE ANGRY CHAMP",
    "story": "Roshik is 6–0 and has the Mickey ears. Sahil is 2–4 and has just followed the league record with the lowest score of the week. This is either the champion’s bounce-back statement or another occasion for the unbeaten manager to insist that the standings speak for themselves.",
    "key": "Neither current roster has a Week 7 bye. Jefferson returns for Sahil, Aaron Jones returns for Roshik, and Lamar’s practice progress could matter to both the quarterback plan and Henry’s outlook. Jacobs is a possible reinforcement, not a confirmed starter; Roshik also needs to absorb Doubs going to IR.",
    "pickId": 3,
    "pickReason": "Roshik. The roster has more reliable ways to survive a quiet star, but a Jefferson–Henry rebound could make this the week the perfect record finally gets a proper stress test.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      },
      {
        "label": "October 19 Ravens update: Jackson day to day",
        "url": "https://www.baltimoreravens.com/news/transcript-press-conferences-10-19-26"
      },
      {
        "label": "October 19 Packers: Jacobs practice return, game status undecided",
        "url": "https://www.packers.com/news/packers-rb-josh-jacobs-to-get-full-week-of-practice-game-status-tbd-oct-19-2026"
      },
      {
        "label": "October 19–20 NFL injury updates",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-19"
      }
    ]
  },
  {
    "matchupId": 4,
    "teamIds": [
      4,
      5
    ],
    "billing": "THE BANK VERSUS THE LEAGUE’S UNPAID TOP SCORER",
    "story": "Ankith is 3–3. Taaha is 2–4 while leading the entire league in points. Both have lost twice in a row, so somebody gets a course correction and somebody gets another week of explaining why the roster is better than the record.",
    "key": "Goff and Chase return for Ankith, while Taaha must replace Lawrence, Meyers and Little on bye; Kyler is already rostered as an option. Thursday puts Stevenson and Burden into the early conversation, and the Hall–Allen workload remains something to verify rather than assume.",
    "pickId": 4,
    "pickReason": "Ankith, narrowly. Getting the core back while Taaha replaces three bye-week contributors creates the edge, but the Walker–JSN ceiling makes this a very uncomfortable pick to publish.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      },
      {
        "label": "October 19 Jets: Allen role while Hall recovers",
        "url": "https://www.newyorkjets.com/news/jets-notebook-braelon-allen-excels-in-filling-in-breece-hall-starting-role-10-19-2026"
      }
    ]
  },
  {
    "matchupId": 5,
    "teamIds": [
      2,
      12
    ],
    "billing": "TWO STRAIGHT WINS EACH. VERY DIFFERENT ALTITUDES.",
    "story": "Pranav J is 5–1 and just won with two zeros. Abhishek is 2–4 and has suddenly remembered that victories are available to him too. The favorite has the stars; the challenger has momentum and absolutely no reason to be polite about it.",
    "key": "Pranav J has no byes but must sort out tight end and the backfield depth, with Monangai absent from Monday’s estimated practice. Abhishek gets LaPorta and Chase Brown back, while Evans’ soreness needs checking. Lamb and DeVonta give Pranav J potential Monday closing options again if they start.",
    "pickId": 12,
    "pickReason": "Pranav J. Puka, Lamb, Swift and Stroud provide the higher ceiling, provided the manager fills the supporting slots instead of testing whether the app will allow a third zero.",
    "sources": [
      {
        "label": "Week 7 Patriots–Bears estimated Monday injury report",
        "url": "https://www.patriots.com/news/week-7-injury-report-patriots-at-bears"
      },
      {
        "label": "October 19–20 NFL injury updates",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-19"
      },
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      }
    ]
  },
  {
    "matchupId": 2,
    "teamIds": [
      10,
      11
    ],
    "billing": "THE WEEKLY HIGH SCORE VERSUS THE FOUR-GAME SLIDE",
    "story": "Abhiram just put up 150.46 and looks a lot less dependent on one player doing everything. GarVeen’s 125.20 was respectable, but four straight defeats have turned the recovery plan into a standing agenda item.",
    "key": "Higgins returns for Abhiram while White is off, and Pierce’s value depends on Barkley’s status. GarVeen gets Amon-Ra back but loses Allen, Kincaid and Diggs to byes; a quarterback pickup is necessary on the current roster. Henderson’s full Monday estimate is encouraging, not a final game designation.",
    "pickId": 10,
    "pickReason": "Abhiram. The emerging receiver depth and GarVeen’s quarterback vacancy favor the team arriving with the weekly-high trophy; a strong QB pickup could narrow the gap.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      },
      {
        "label": "Last verified Eagles report: Barkley out in Week 6; no Week 7 clearance established",
        "url": "https://www.philadelphiaeagles.com/news/panthers-vs-eagles-injury-report-2026-nfl-week-6-saquon-barkley-devonta-smith"
      },
      {
        "label": "Week 7 Patriots–Bears estimated Monday injury report",
        "url": "https://www.patriots.com/news/week-7-injury-report-patriots-at-bears"
      },
      {
        "label": "Jets report on Omar Cooper return and breakout",
        "url": "https://www.newyorkjets.com/news/rookie-omar-cooper-jr-moves-up-jets-all-time-lists-sunday-vs-patriots-10-19-2026"
      }
    ]
  },
  {
    "matchupId": 3,
    "teamIds": [
      1,
      9
    ],
    "billing": "REINFORCEMENTS ARRIVE AT THE WRONG KITCHEN",
    "story": "Anudeep is 4–2 after surviving his biggest bye-week absences. Aditya is 3–3 after a 7.40-point loss and now faces a much more serious roster squeeze. One team gets its headliners back; the other is checking the pantry.",
    "key": "Gibbs and Burrow return for Anudeep, although McLaurin’s knee news is a longer-term concern. Aditya must cover Cook and Parker Washington on bye as well as Adams’ expected extended absence; Pitts and Sutton offer existing receiving options, but they do not solve the running-back slot by themselves.",
    "pickId": 1,
    "pickReason": "Anudeep. The returning stars and demonstrated receiver depth give him the clearest personnel edge on this card unless Aditya finds substantial reinforcements.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      },
      {
        "label": "October 20: McLaurin knee injury, further tests pending",
        "url": "https://amp.nfl.com/news/commanders-wr-terry-mclaurin-carted-off-field-with-knee-injury-vs-49ers"
      },
      {
        "label": "October 19: Adams expected to miss 6–10 weeks",
        "url": "https://amp.nfl.com/news/davante-adams-hamstring-expected-to-miss-6-10-weeks-as-injuries-pile-up-rams"
      }
    ]
  },
  {
    "matchupId": 1,
    "teamIds": [
      7,
      8
    ],
    "billing": "THREE STRAIGHT WINS. SIX STRAIGHT LOSSES. ZERO FREE PASSES.",
    "story": "Pranav P is 4–2 and rolling. Sahit is 0–6 and running out of comfortable ways to describe the start. The records make this look simple, but the bye list has made sure neither manager can just recycle last Sunday’s lineup.",
    "key": "Pranav P needs a quarterback with Daniels off and must cover the Shakir and McConkey absences. Sahit loses Tuten and Vidal and still needs a Barkley contingency; Maye, Brown and Loveland bring Thursday decisions, while Barkley’s Monday game makes waiting for clearance awkward. These are Tuesday needs, not final submitted lineups.",
    "pickId": 7,
    "pickReason": "Pranav P, assuming a quarterback is acquired. McCaffrey, Kittle and Nabers give him the stronger available core, but leaving the QB job vacant would be an unusually generous way to welcome Sahit to the win column.",
    "sources": [
      {
        "label": "Official Week 7 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-7"
      },
      {
        "label": "Last verified Eagles report: Barkley out in Week 6; no Week 7 clearance established",
        "url": "https://www.philadelphiaeagles.com/news/panthers-vs-eagles-injury-report-2026-nfl-week-6-saquon-barkley-devonta-smith"
      },
      {
        "label": "Week 7 Patriots–Bears estimated Monday injury report",
        "url": "https://www.patriots.com/news/week-7-injury-report-patriots-at-bears"
      }
    ]
  }
];
