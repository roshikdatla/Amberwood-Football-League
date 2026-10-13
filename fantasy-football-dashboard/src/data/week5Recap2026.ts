import snapshot from './week5Recap2026Snapshot.json';

export const editionStatus = snapshot.phase;
export const recapSource = snapshot;
const managers: Record<number, string> = {
  1: 'Anudeep', 2: 'Abhishek', 3: 'Roshik', 4: 'Ankith', 5: 'Taaha', 6: 'Sahil',
  7: 'Pranav P', 8: 'Sahit', 9: 'Aditya', 10: 'Abhiram', 11: 'Gary & Naveen', 12: 'Pranav J',
};
type Result = { roster_id: number; matchup_id: number; points: number; custom_points: number | null };
const completedWeeks: Result[][] = [snapshot.week1, snapshot.week2, snapshot.week3, snapshot.week4, snapshot.week5];
export const recapTeams = snapshot.teams.map(team => {
  const current = snapshot.week5.find(row => row.roster_id === team.rosterId)!;
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
  if (!team) throw new Error(`Unknown Week 5 roster: ${id}`);
  return team;
};
export const formatScore = (points: number) => points.toFixed(2);
export const getStarter = (rosterId: number, playerId: string) => {
  const matchup = snapshot.week5.find(row => row.roster_id === rosterId);
  const index = matchup?.starters.indexOf(playerId) ?? -1;
  if (!matchup || index < 0) throw new Error(`${playerId} did not start for roster ${rosterId} in Week 5`);
  const player = (snapshot.players as Record<string, { name: string; position: string; team: string | null }>)[playerId];
  return { ...player, points: matchup.starters_points[index] };
};

type Source = { label: string; url: string };
type Recap = { matchupId: number; teamIds: [number, number]; billing: string; summary: string; xFactorRosterId: number; xFactorId: string; xFactor: string; lowlight: string; sources?: Source[] };
type Ranking = { rosterId: number; previousRank: number; tier: string; outlook: string; sources?: Source[] };
type Preview = { matchupId: number; teamIds: [number, number]; billing: string; story: string; key: string; pickId: number; pickReason: string; sources?: Source[] };

export const week5Overview = {
  "headline": "MONDAY STOLE TWO WINS. SAHIL STOLE THE RECORD BOOK.",
  "lead": "Stop the scroll. Put the group chat on the big screen. Week 5 gave Amberwood its loudest show of the season: Sahil detonated for an all-time-record 213.14 after finishing last a week ago, Pranav J rode Puka out of a 30.26-point Monday hole, and Aditya erased a ridiculous 76.94-point deficit with four players and an overtime thriller. Ankith scored third and lost. Anudeep watched 39.70 from Gibbs get answered by exactly 39.70 from Puka. Roshik stayed perfect at 5–0, Abhishek finally won, and Sahit is now the last manager without a victory. Six games. Two stolen endings. One record in pieces. If you called it early on Sunday, we would like to see your receipts."
};

export const week5Recaps: Recap[] = [
  {
    "matchupId": 2,
    "teamIds": [
      12,
      1
    ],
    "billing": "PUKA AFTER DARK. PRANAV J STEALS THE NIGHT.",
    "summary": "Anudeep had Gibbs. Pranav J had one last game. And Amberwood had absolutely no business going to bed. Thursday gave Anudeep a 14.20–2.90 start through Javonte and Lamb; Sunday brought Gibbs’ monstrous 39.70, Burrow’s 24.60 and Golden’s 22.30. By Monday, Anudeep was finished at 133.70 and Pranav J sat on 103.44. The assignment for Puka: beat 30.26. The answer: 17 catches, 138 yards, a touchdown and 39.70 fantasy points. The NFL game even went to overtime, where Puka added a 21-yard catch, because apparently four quarters of anxiety were not enough. Pranav J wins 143.14–133.70, turns a 30.26-point hole into a 9.44-point celebration, and goes to 4–1. Last week he scored second and lost. This week he waited until Monday to break into the win column through a window. Anudeep, please remain on the line; your lead is very important to us.",
    "xFactorRosterId": 12,
    "xFactorId": "9493",
    "xFactor": "Puka Nacua’s 39.70 matched Gibbs point for point and single-handedly covered the entire Monday deficit. Lamb managed 2.90, so Puka handled the other half of the superstar partnership, the comeback, and apparently the closing shift.",
    "lowlight": "Tate, Sadiq and Love combined for 4.10 for Anudeep. Gibbs produced almost ten times that by himself. A 133.70 score can win plenty of weeks, but giving Puka three quiet lineup spots to aim at is like leaving the front door open with the trophy sitting in the hallway.",
    "sources": [
      {
        "label": "Sleeper NFL schedule: all Week 5 games complete; day totals reconstructed from final starter scores",
        "url": "https://api.sleeper.app/schedule/nfl/regular/2026"
      },
      {
        "label": "Official Rams recap: Bills 37, Rams 34 in overtime",
        "url": "https://www.therams.com/news/game-recap-rams-fall-to-bills-37-34-in-overtime-on-monday-night-football"
      }
    ]
  },
  {
    "matchupId": 6,
    "teamIds": [
      9,
      4
    ],
    "billing": "SEVENTY-SIX POINTS DOWN. STILL COOKING.",
    "summary": "Ankith had 152.24 in the bank. Aditya needed a Monday rescue operation. Thursday had supplied Egbuka’s 17.20 against Ferguson’s 4.90; Sunday added Goff’s 27.94, Chase’s 20.20 and even 20.00 from Myers. Aditya’s Parker Washington kept the stove lit with 33.90, but the Sunday-night checkpoint still read Ankith 152.24, Aditya 75.30. Down 76.94 with Stafford, Cook, Adams and Coleman left. Stafford found Adams for two touchdowns, Cook scored twice, and Coleman joined the touchdown parade. Cook even lost a fumble in overtime, adding one last dose of unnecessary stress. Their final haul: 27.32, 23.80, 22.10 and 7.70, an 80.92-point wave that carried Aditya to 156.22–152.24. A 3.98-point win, a 3–2 record, and one very thoroughly ruined Ankith evening. Last week Aditya needed schedule assistance. This week he needed the entire Monday broadcast, and the broadcast obliged.",
    "xFactorRosterId": 9,
    "xFactorId": "9487",
    "xFactor": "Parker Washington’s 33.90 was the oxygen supply before Monday’s rescue. He outscored Nico Collins, Ferguson, Judkins and Coleman combined; without that Sunday eruption, even the 80.92-point closing act would have been a very entertaining loss.",
    "lowlight": "Ankith scored 152.24, the third-highest total in Amberwood, and still lost. That is a very good lineup receiving very bad customer service. Jeanty’s 10.70 against Stevenson’s 17.50 on the bench leaves a painful hindsight receipt, but losing a 76.94-point Monday cushion is the sort of thing you stare at twice just to make sure the app loaded properly.",
    "sources": [
      {
        "label": "Sleeper NFL schedule: all Week 5 games complete; day totals reconstructed from final starter scores",
        "url": "https://api.sleeper.app/schedule/nfl/regular/2026"
      },
      {
        "label": "Official Rams recap: Bills 37, Rams 34 in overtime",
        "url": "https://www.therams.com/news/game-recap-rams-fall-to-bills-37-34-in-overtime-on-monday-night-football"
      }
    ]
  },
  {
    "matchupId": 4,
    "teamIds": [
      6,
      8
    ],
    "billing": "213.14. THE CHAMP JUST BROKE THE SCOREBOARD.",
    "summary": "Last week, Sahil finished dead last with 101.90. This week, he arrived with a wrecking ball. Thursday opened at 42.64–0.00 through Dak and Pickens, and Sunday turned the title defense into a highlight reel: Warren 41.80, Likely 32.40, Garrett Wilson 25.40, Henry 23.00. By the time the dust settled, Sahil had 213.14, a new all-time high across Amberwood’s connected Sleeper history, and Sahit had 99.04. The old 205.30 record fell by 7.84. No Monday appeal. No dramatic final possession. Just a 114.10-point demolition, a 2–3 record for the defending champion, and Sahit stranded at 0–5. Maye scored 39.46 for Sahit, which normally earns a victory lap; here it earned him a front-row seat to a disaster film. Sahil did not quietly get back on track. He drove the train through the station.",
    "xFactorRosterId": 6,
    "xFactorId": "8228",
    "xFactor": "Jaylen Warren’s 41.80 led the entire league’s starting lineups. He and Likely combined for 74.20, nearly three-quarters of Sahit’s whole team. A running back and a tight end put together a two-man score that would have made several full lineups sweat.",
    "lowlight": "Outside Maye and Shrader, Sahit’s other eight starters combined for 42.28. Warren alone had 41.80. The island evacuation has become complicated: the quarterback is rowing, the kicker brought supplies, and everybody else appears to be reviewing the hotel breakfast menu.",
    "sources": [
      {
        "label": "Sleeper NFL schedule: all Week 5 games complete; day totals reconstructed from final starter scores",
        "url": "https://api.sleeper.app/schedule/nfl/regular/2026"
      },
      {
        "label": "Previous record: 205.30 in the 2025 Week 15 box score",
        "url": "https://api.sleeper.app/v1/league/1240124901977759744/matchups/15"
      }
    ]
  },
  {
    "matchupId": 3,
    "teamIds": [
      3,
      11
    ],
    "billing": "FIVE AND OH. OLAVE GARDEN STILL HAS NO OPENINGS.",
    "summary": "GarVeen opened Thursday with McLaughlin’s 6.10. Roshik spent Sunday making sure the lead would be remembered only as a fun historical detail. Watson exploded for 36.30, Bowers added 25.00 and Aaron Jones supplied 20.70; even with Harvey stuck at 0.70, Roshik finished at 151.72. Gary and Naveen entered Monday on 51.70, needing Allen and Kincaid to erase a 100.02-point deficit. They produced 36.20 together, including a perfectly excellent 32.50 from Allen. It still ended 151.72–87.90. Roshik is 5–0, GarVeen is 2–3, and the unbeaten table remains occupied. Two managers spent the week assembling a lineup that their opponent beat by 63.82. At some point the second opinion should probably become a different opinion.",
    "xFactorRosterId": 3,
    "xFactorId": "8167",
    "xFactor": "Christian Watson’s 36.30 was the knockout punch. Bijan and Olave combined for 24.40; Watson outscored the two names on the marquee and showed why this unbeaten team can survive an ordinary day from its usual stars.",
    "lowlight": "Metcalf, Kincaid, Andrews, Kamara and Henderson combined for 20.20. Aaron Jones alone scored 20.70 against them. GarVeen’s five-player committee lost to one man, which is an unfortunate result for a franchise already operating with twice the management.",
    "sources": [
      {
        "label": "Sleeper NFL schedule: all Week 5 games complete; day totals reconstructed from final starter scores",
        "url": "https://api.sleeper.app/schedule/nfl/regular/2026"
      }
    ]
  },
  {
    "matchupId": 1,
    "teamIds": [
      7,
      5
    ],
    "billing": "DANIELS AND NABERS WIN THE FIREWORKS ARGUMENT.",
    "summary": "Thursday gave Pranav P a modest 4.10 from Aubrey and Taaha nothing yet. Sunday supplied the volume: Daniels delivered 34.26, Nabers 31.10 and Jameson Williams 18.70. Pranav P closed at 142.86 despite a zero from McConkey. Taaha had Lawrence’s 19.74 and JSN’s 24.80 working, but reached Monday at 98.94, needing Kyren to beat a 43.92-point mountain. Kyren’s 19.60 made the final 142.86–118.54. Pranav P moves to 3–2, Taaha slips to 2–3, and the league’s hottest recent scoring machine discovers that the accelerator occasionally disconnects. One Pranav authored Monday’s miracle; the other made sure his opponent needed one.",
    "xFactorRosterId": 7,
    "xFactorId": "11566",
    "xFactor": "Jayden Daniels’ 34.26 was the biggest score in the matchup, and his partnership with Nabers supplied 65.36. Pranav P could absorb McConkey’s 0.00 because his quarterback and top receiver had already decided to work a double shift.",
    "lowlight": "Fannin and Juwan Johnson combined for 7.00 for Taaha. JSN did his job with 24.80, but the supporting cast left Burden of Proof with no witnesses willing to testify. Pranav P should also keep that empty McConkey slot receipt: winning does not make starting zero suddenly fashionable.",
    "sources": [
      {
        "label": "Sleeper NFL schedule: all Week 5 games complete; day totals reconstructed from final starter scores",
        "url": "https://api.sleeper.app/schedule/nfl/regular/2026"
      }
    ]
  },
  {
    "matchupId": 5,
    "teamIds": [
      2,
      10
    ],
    "billing": "ABHISHEK HAS A WIN. THIS IS NOT A DRILL.",
    "summary": "For four weeks, Abhishek’s trade history had more activity than his win column. Thursday looked like more of the same: Irving staked Abhiram to a 33.50–0.00 lead. Then Sunday finally offered a pulse. Evans answered with 28.30, Brissett supplied 25.28, LaPorta 19.80, Reichard 13.90 and Cleveland’s defense 10.00; Abhiram got 21.60 from McBride but only 6.92 from Nix. Both teams were finished before Monday, with Abhishek winning 128.58–104.42. The first victory is in. The record is 1–4. The parade route is pending because somebody has to explain the mouse ears first. Abhiram falls to 2–3 after generously helping launch somebody else’s season.",
    "xFactorRosterId": 2,
    "xFactorId": "2216",
    "xFactor": "Mike Evans’ 28.30 was Abhishek’s biggest score and launched Sunday’s response after Irving had run away with Thursday. After last week’s zero-point flex pairing, getting this from Evans was less a lineup adjustment than discovering the electricity had been switched off.",
    "lowlight": "Higgins, Bell, Hockenson and the Raiders defense combined for 8.50 for Abhiram. Freiermuth’s 21.50 stayed on the bench, a glaring hindsight upgrade, though that swap alone still would not have erased the 24.16-point defeat. Bucky put up 33.50 and apparently submitted his group-project contribution to the wrong group.",
    "sources": [
      {
        "label": "Sleeper NFL schedule: all Week 5 games complete; day totals reconstructed from final starter scores",
        "url": "https://api.sleeper.app/schedule/nfl/regular/2026"
      }
    ]
  }
];

export const mickeyOfTheWeek = {
  "rosterId": 2,
  "allPlayWins": 4,
  "allPlayLosses": 7,
  "scoreRank": 8,
  "opponentRank": 10,
  "headline": "Abhishek wins his first game. The mouse ears arrive immediately.",
  "summary": "Congratulations to Zero Dark Purdy on entering the win column. Unfortunately, the dress code is ears. Abhishek’s 128.58 ranked eighth out of twelve and beat Abhiram’s tenth-place 104.42; seven other teams would have beaten him, while only four would have lost. Ankith scored 152.24 and lost. Anudeep scored 133.70 and lost. Abhishek scored less than both and gets to celebrate, which is precisely the kind of accounting this award was invented to investigate. Evans’ 28.30 and Brissett’s 25.28 earned their applause. The schedule would also like its name in the credits.",
  "verdict": "Aditya hands over the ears after upgrading from last week’s 1.84-point escape to an 80.92-point Monday rescue. Abhishek, enjoy the first win: Sahil and his freshly printed 213.14 record are next. The honeymoon appears to have been booked for approximately six minutes."
};

export const week5PowerRankings: Ranking[] = [
  {
    "rosterId": 3,
    "tier": "The only unbeaten address",
    "outlook": "Five wins, a Bowers-led foundation and Watson’s 36.30 explosion keep Roshik at the front of the championship queue, with enough scoring routes to survive an ordinary Bijan week. Lamar’s ankle uncertainty still demands a quarterback plan and Aaron Jones is on bye, but Olave Garden is currently the only establishment in Amberwood that can serve a backup quarterback without also serving an apology.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ],
    "previousRank": 1
  },
  {
    "rosterId": 12,
    "tier": "The ceiling comes with overtime",
    "outlook": "Puka’s 39.70 rescue and a 4–1 record keep Pranav J squarely in the title conversation, while Houston’s Harrison acquisition gives new quarterback Stroud another weapon without guaranteeing anybody’s target share. Smith’s possible return and Monangai’s toe recovery could improve the supporting cast, but Lamb’s 2.90 is a reminder that asking Puka to run the entire business every Monday is probably a labor violation.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Chicago Monday injury and backfield update",
        "url": "https://www.chicagobears.com/news/5-things-we-learned-from-bears-coach-ben-johnson-in-week-5-loss-packers-2026"
      },
      {
        "label": "Houston announces Marvin Harrison Jr acquisition",
        "url": "https://www.houstontexans.com/news/houston-texans-transactions-10-12-2026"
      }
    ],
    "previousRank": 3
  },
  {
    "rosterId": 1,
    "tier": "One awful ending, same dangerous core",
    "outlook": "Gibbs, Burrow and London still give Anudeep a championship-caliber core at 3–2, and Golden’s 22.30 provides a much more useful long-term signal than one heartbreaking Monday result. Week 6 removes both Gibbs and Burrow on bye while the newly acquired Sadiq remains in concussion protocol, so the depth now needs to do more than admire the starters from a respectful distance.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      },
      {
        "label": "Sleeper completed league transactions, Week 5",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/transactions/5"
      }
    ],
    "previousRank": 2
  },
  {
    "rosterId": 5,
    "tier": "Still plenty of horsepower",
    "outlook": "Taaha’s Kyren–Walker–JSN foundation still offers playoff and title upside despite a 2–3 record, with Walker’s return from Kansas City’s bye restoring a major option after the 118.54 setback. JSN’s ankle needs watching before Thursday and Deebo plus Roman Wilson have availability problems, so Burden of Proof now has to provide evidence that the supporting receivers actually intend to attend work.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Seattle estimated Monday Week 6 injury report",
        "url": "https://www.seahawks.com/news/week-6-injury-report-seahawks-at-broncos"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ],
    "previousRank": 4
  },
  {
    "rosterId": 6,
    "tier": "The champ has reentered the broadcast",
    "outlook": "Sahil’s 213.14 record resets the ceiling of this 2–3 team: Henry and Warren can drive a playoff recovery, while Pickens, Wilson and Likely showed how much damage the supporting lanes can do together. Jefferson’s Week 6 bye and Charbonnet’s continuing reserve status mean depth still matters, but the defending champion has upgraded from missing-person notice to a very loud problem for everybody else.",
    "sources": [
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      },
      {
        "label": "Seattle estimated Monday Week 6 injury report",
        "url": "https://www.seahawks.com/news/week-6-injury-report-seahawks-at-broncos"
      }
    ],
    "previousRank": 9
  },
  {
    "rosterId": 4,
    "tier": "Strong roster, terrible ending",
    "outlook": "Ankith’s 152.24 loss leaves a 3–2 team with a credible playoff foundation and enough receiving depth from the McMillan–Egbuka trade to keep the longer-term ceiling attractive. The immediate danger is at quarterback with Goff on bye and Caleb’s return uncertain, plus Chase’s Cincinnati bye, so the investment committee needs a contingency plan before somebody lists positive vibes as the starting QB.",
    "sources": [
      {
        "label": "Chicago Monday injury and backfield update",
        "url": "https://www.chicagobears.com/news/5-things-we-learned-from-bears-coach-ben-johnson-in-week-5-loss-packers-2026"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      },
      {
        "label": "Sleeper McMillan–Egbuka trade, Week 3",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/transactions/3"
      }
    ],
    "previousRank": 5
  },
  {
    "rosterId": 7,
    "tier": "The stars are doing their part",
    "outlook": "Daniels and Nabers supplied 65.36, and the McCaffrey–Kittle backbone gives Pranav P’s 3–2 roster a serious playoff case even with an uneven supporting cast. McConkey’s emergency-only availability after the Odunze–Henry trade and the Week 6 Jameson bye squeeze the depth, because winning with one zero is impressive but turning it into a recurring strategy is how you end up in this newsletter for the wrong reasons.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      },
      {
        "label": "Sleeper completed league transactions, Week 5",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/transactions/5"
      }
    ],
    "previousRank": 6
  },
  {
    "rosterId": 9,
    "tier": "The kitchen has a second shift",
    "outlook": "Aditya’s 3–2 team has a stronger playoff case with Cook, Collins and Adams supported by Washington’s breakout and Mahomes returning from Kansas City’s bye. Harrison joining Houston adds uncertainty to future target distribution rather than an automatic Collins downgrade, but the supporting depth still needs work because requiring 80.92 every Monday is a recipe that eventually sets off the smoke alarm.",
    "sources": [
      {
        "label": "Houston announces Marvin Harrison Jr acquisition",
        "url": "https://www.houstontexans.com/news/houston-texans-transactions-10-12-2026"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ],
    "previousRank": 10
  },
  {
    "rosterId": 11,
    "tier": "More upside than recent evidence",
    "outlook": "Allen and Taylor keep GarVeen’s 2–3 roster in the playoff conversation, and Harrison’s move to Houston offers a fresh upside case without a promised immediate role. Amon-Ra’s bye, Henderson’s ankle and Moore’s Monday inactivity make the depth fragile, while an 87.90 total suggests the franchise could use fewer strategic meetings and more players willing to score ten points.",
    "sources": [
      {
        "label": "Houston announces Marvin Harrison Jr acquisition",
        "url": "https://www.houstontexans.com/news/houston-texans-transactions-10-12-2026"
      },
      {
        "label": "NFL Week 5 Sunday injury reports",
        "url": "https://amp.nfl.com/news/notable-injuries-news-sunday-week-5-games-2026"
      },
      {
        "label": "Week 5 Monday night inactives",
        "url": "https://amp.nfl.com/news/week-5-monday-night-inactives-buffalo-bills-at-los-angeles-rams"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ],
    "previousRank": 7
  },
  {
    "rosterId": 10,
    "tier": "The running backs need coworkers",
    "outlook": "Irving’s 33.50 and McBride’s 21.60 show why Abhiram’s 2–3 roster still has a workable playoff path, with Hubbard returning from Carolina’s bye to reinforce the backfield. Higgins and Hockenson are on Week 6 byes and Tyson is not expected to practice, so the receiver problem remains large enough that Buc-ee’s may need to open a hiring booth next to the brisket counter.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ],
    "previousRank": 8
  },
  {
    "rosterId": 2,
    "tier": "A win is a beginning",
    "outlook": "Evans, LaPorta and Brissett finally put Abhishek in the win column at 1–4, while the recent Odunze acquisition supplies another receiving option for a roster that needs sustained depth to rejoin the playoff chase. LaPorta and Brown are on bye and Montgomery is week-to-week with a groin issue, so the victory parade should probably stop at the waiver wire before it gets to city hall.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      },
      {
        "label": "Sleeper completed league transactions, Week 5",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/transactions/5"
      }
    ],
    "previousRank": 11
  },
  {
    "rosterId": 8,
    "tier": "The rescue window is shrinking",
    "outlook": "At 0–5, Sahit needs available stars and immediate wins to rebuild any playoff path, with Maye’s 39.46 showing at least one position capable of leading the rescue. Barkley’s hoped-for return and Brown’s possible practice resumption are encouraging but unconfirmed, while Shipley could miss multiple weeks, so loveland island should hold off selling the comeback merch until the boats actually arrive.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      }
    ],
    "previousRank": 12
  }
];

export const week6Previews: Preview[] = [
  {
    "matchupId": 4,
    "teamIds": [
      9,
      12
    ],
    "billing": "THE MONDAY MIRACLE BOWL",
    "story": "Of course they play each other next. Aditya just climbed out of a 76.94-point hole. Pranav J just turned one Puka start into a 30.26-point escape. Two managers arrive convinced no lead is safe; the rest of the league would appreciate if they settled this before everybody’s bedtime.",
    "key": "Houston–Jacksonville in London puts Stroud and Fairbairn opposite potential Collins and Parker Washington exposure early. The Harrison trade changes the Texans’ receiving room, while Aditya gets Mahomes and Worthy back from their bye and Pranav J waits on Smith and Monangai; none of those decisions should be made from last week’s victory screenshot.",
    "pickId": 12,
    "pickReason": "Pranav J, narrowly. The Puka–Lamb ceiling and a 4–1 start earn the lean, but Aditya has enough quarterback and running-back firepower to make any confident prediction sound ridiculous by Sunday afternoon.",
    "sources": [
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      },
      {
        "label": "Houston announces Marvin Harrison Jr acquisition",
        "url": "https://www.houstontexans.com/news/houston-texans-transactions-10-12-2026"
      },
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Chicago Monday injury and backfield update",
        "url": "https://www.chicagobears.com/news/5-things-we-learned-from-bears-coach-ben-johnson-in-week-5-loss-packers-2026"
      }
    ]
  },
  {
    "matchupId": 5,
    "teamIds": [
      3,
      4
    ],
    "billing": "THE UNBEATEN TEAM MEETS THE WRONGED INVESTOR",
    "story": "Roshik is 5–0. Ankith just scored 152.24 and watched a 76.94-point cushion disappear. One team has every reason to feel comfortable; the other has every reason to open the matchup with a formal complaint.",
    "key": "The quarterback contingency plans matter: Lamar’s ankle status is uncertain, Goff is on bye and Caleb is not cleared by optimism alone. Chase is also on bye for Ankith, while Roshik must replace Aaron Jones’ Minnesota production; this is a roster-management test before it becomes a star-power contest.",
    "pickId": 3,
    "pickReason": "Roshik. The unbeaten roster has shown more ways to win, and Ankith’s quarterback question plus the Chase bye make this an especially unpleasant week to meet the league leader.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Chicago Monday injury and backfield update",
        "url": "https://www.chicagobears.com/news/5-things-we-learned-from-bears-coach-ben-johnson-in-week-5-loss-packers-2026"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ]
  },
  {
    "matchupId": 6,
    "teamIds": [
      2,
      6
    ],
    "billing": "FIRST WIN MEETS THE RECORD MACHINE",
    "story": "Abhishek finally got on the board. His reward is Sahil, fresh off 213.14 and apparently still carrying the demolition permit. The Mickey recipient versus the record holder is a spectacularly rude piece of scheduling.",
    "key": "Sahil loses Jefferson and Gesicki to byes, and Charbonnet is not dependable Thursday cover yet. Abhishek has LaPorta, Brown and Reichard on bye plus Montgomery’s groin issue; Dak and Pickens could light up Sunday night, with Purdy and Evans offering Abhishek potential Monday answers if he starts them.",
    "pickId": 6,
    "pickReason": "Sahil. Nobody should project another 213.14, but the Henry–Warren foundation and available receivers look better equipped for the bye-week damage than Abhishek’s depleted lineup.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Seattle estimated Monday Week 6 injury report",
        "url": "https://www.seahawks.com/news/week-6-injury-report-seahawks-at-broncos"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ]
  },
  {
    "matchupId": 1,
    "teamIds": [
      7,
      11
    ],
    "billing": "ONE PRANAV RISES. TWO MANAGERS NEED A RESPONSE.",
    "story": "Pranav P is 3–2 after Daniels and Nabers lit the fuse. GarVeen is 2–3 after scoring 87.90, a number that looked even worse when divided by the number of managers supervising it.",
    "key": "Jameson and Minnesota’s defense are bye replacements for Pranav P, and McConkey’s foot needs an actual update. GarVeen loses Amon-Ra to the bye and must check Henderson and Moore; Harrison’s Houston move is intriguing, while Daniels, McCaffrey and Kittle could make Monday a major closing window for Pranav P.",
    "pickId": 7,
    "pickReason": "Pranav P. His core is producing and his Monday options can apply real pressure; GarVeen needs its supporting cast to return before the apology tour requires additional dates.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "NFL Week 5 Sunday injury reports",
        "url": "https://amp.nfl.com/news/notable-injuries-news-sunday-week-5-games-2026"
      },
      {
        "label": "Week 5 Monday night inactives",
        "url": "https://amp.nfl.com/news/week-5-monday-night-inactives-buffalo-bills-at-los-angeles-rams"
      },
      {
        "label": "Houston announces Marvin Harrison Jr acquisition",
        "url": "https://www.houstontexans.com/news/houston-texans-transactions-10-12-2026"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ]
  },
  {
    "matchupId": 2,
    "teamIds": [
      1,
      8
    ],
    "billing": "A WOUNDED FAVORITE. AN ISLAND WITH NO WINS.",
    "story": "Anudeep just lost to a Monday avalanche. Sahit just lost to the highest score the league has seen. Somebody gets a much-needed reset; the other gets another week of pretending the standings page is down for maintenance.",
    "key": "Gibbs and Burrow are both on bye, forcing a substantial one-week rebuild for Anudeep, though Kelce returns from Kansas City’s bye. Sahit needs updates on Barkley and Brown rather than assumptions; Waddle plays for Denver and is a Thursday option, not a Miami bye casualty, while Shipley’s foot injury weakens the emergency backfield.",
    "pickId": 1,
    "pickReason": "Anudeep, with a much smaller cushion than the records imply. His receiving options keep the edge, but this is Sahit’s opening if the injured stars return and Anudeep fails to cover the quarterback and running-back absences.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ]
  },
  {
    "matchupId": 3,
    "teamIds": [
      5,
      10
    ],
    "billing": "THE 2–3 CROSSROADS",
    "story": "Taaha’s big-scoring run stalled at 118.54. Abhiram lost to the last team that had not yet found a win besides Sahit. A path back to .500 is available, but only one of these managers gets to stop explaining himself this week.",
    "key": "Taaha gets Walker back from Kansas City’s bye but must check JSN before Thursday and cover the Deebo/Roman Wilson absences. Abhiram gets Hubbard back, loses Higgins, Hockenson and Bates to byes, and still has Tyson unavailable for practice; Irving and McBride need a functioning support crew.",
    "pickId": 5,
    "pickReason": "Taaha. The Kyren–Walker combination and JSN’s ceiling offer more routes to a rebound, provided the Thursday injury report cooperates; Abhiram needs several replacement slots to outperform their job descriptions.",
    "sources": [
      {
        "label": "NFL Monday injury updates, October 12",
        "url": "https://amp.nfl.com/news/nfl-news-roundup-latest-league-updates-from-monday-oct-12"
      },
      {
        "label": "Seattle estimated Monday Week 6 injury report",
        "url": "https://www.seahawks.com/news/week-6-injury-report-seahawks-at-broncos"
      },
      {
        "label": "Official NFL Week 6 schedule and byes",
        "url": "https://www.nfl.com/schedules/2026/by-week/week-6"
      }
    ]
  }
];
