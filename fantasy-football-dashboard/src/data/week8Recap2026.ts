export const recapTeams = [
  {
    "rosterId": 1,
    "manager": "Anudeep",
    "teamName": "Made in Jahmyrica",
    "score": 142.28,
    "record": "6–2"
  },
  {
    "rosterId": 2,
    "manager": "Abhishek",
    "teamName": "Zero Dark Purdy",
    "score": 94.06,
    "record": "3–5"
  },
  {
    "rosterId": 3,
    "manager": "Roshik",
    "teamName": "Olave Garden",
    "score": 111.1,
    "record": "7–1"
  },
  {
    "rosterId": 4,
    "manager": "Ankith",
    "teamName": "Jeanty Morgan Chase & Co.",
    "score": 146.68,
    "record": "5–3"
  },
  {
    "rosterId": 5,
    "manager": "Taaha",
    "teamName": "Burden of Proof",
    "score": 117.8,
    "record": "2–6"
  },
  {
    "rosterId": 6,
    "manager": "Sahil",
    "teamName": "J J the Jet Plane",
    "score": 110.2,
    "record": "2–6"
  },
  {
    "rosterId": 7,
    "manager": "Pranav P",
    "teamName": "Super O-Marion Bro",
    "score": 113.28,
    "record": "5–3"
  },
  {
    "rosterId": 8,
    "manager": "Sahit",
    "teamName": "loveland island",
    "score": 149.06,
    "record": "1–7"
  },
  {
    "rosterId": 9,
    "manager": "Aditya",
    "teamName": "Cookin Sutton Biryani",
    "score": 67.58,
    "record": "3–5"
  },
  {
    "rosterId": 10,
    "manager": "Abhiram",
    "teamName": "4Achane Buc-ee’s",
    "score": 176.66,
    "record": "5–3"
  },
  {
    "rosterId": 11,
    "manager": "Gary & Naveen",
    "teamName": "GarVeen",
    "score": 113.76,
    "record": "2–6"
  },
  {
    "rosterId": 12,
    "manager": "Pranav J",
    "teamName": "pooka koopa troopa’s",
    "score": 175.12,
    "record": "7–1"
  }
];
export const getRecapTeam = (id: number) => { const team = recapTeams.find(t => t.rosterId === id); if (!team) throw new Error(`Unknown roster ${id}`); return team; };
export const formatScore = (n: number) => n.toFixed(2);
export const players = {
  "chase": {
    "name": "Ja’Marr Chase",
    "points": 33.1
  },
  "rice": {
    "name": "Rashee Rice",
    "points": 18.3
  },
  "higgins": {
    "name": "Tee Higgins",
    "points": 39.5
  },
  "tuten": {
    "name": "Bhayshul Tuten",
    "points": 31.9
  },
  "swift": {
    "name": "D’Andre Swift",
    "points": 27.9
  },
  "burrow": {
    "name": "Joe Burrow",
    "points": 41.48
  }
};
export const getStarter = (_rosterId: number, playerId: string) => players[playerId as keyof typeof players];
type Source = { label: string; url: string };
type Recap = { matchupId: number; teamIds: number[]; billing: string; summary: string; xFactorRosterId: number; xFactorId: string; xFactor: string; lowlight: string; sources?: Source[] };
type Ranking = { rosterId: number; previousRank: number; tier: string; outlook: string; sources?: Source[] };
type Preview = { matchupId: number; teamIds: number[]; billing: string; story: string; key: string; pickId: number; pickReason: string; sources?: Source[] };
export const recapSource = {
  "capturedAt": "2026-11-03T05:48:00Z",
  "sources": {
    "week8": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/8",
    "week9": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/9",
    "espn8": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
  }
};
export const week8Overview = {
  "headline": "THE UNBEATEN FALL. THE WINLESS RISE.",
  "lead": "Amberwood, the perfect season and the winless season checked out on the same receipt. Sahit handed Roshik his first loss while collecting his first win, Abhiram exploded for 176.66, and the battle for the fifth record-based playoff spot tightened among Pranav P, Abhiram and Ankith. Buckle up: the top five still qualify by record, but the sixth ticket belongs to points, not vibes."
};
export const playoffPicture = {
  "headline": "FIVE RECORD BERTHS. ONE POINTS ESCAPE HATCH.",
  "paragraphs": [
    "Pranav P and Abhiram are separated by 0.36 points. That is not a cushion; that is a rounding error with playoff aspirations. Ankith is also 5–3 but trails Abhiram by 21.72 points in the record tiebreaker. Their Week 9 meeting is a direct fight for positioning.",
    "The sixth berth goes to the highest-scoring team outside the top five. Right now that is Taaha: 1,129.36 points at 2–6, 53.16 ahead of Ankith’s 1,076.20. Taaha is running a championship-caliber offense with a win column that looks like a typo. The wildcard pool changes whenever the top five changes."
  ],
  "topFive": "Pranav J 7–1 (1,162.08 PF); Roshik 7–1 (1,108.42); Anudeep 6–2 (1,116.42); Pranav P 5–3 (1,098.28); Abhiram 5–3 (1,097.92).",
  "wildcard": "Taaha 1,129.36 PF, 53.16 ahead of Ankith (1,076.20) and 95.52 ahead of Sahil (1,033.84)."
};
export const toiletPicture = {
  "headline": "SURVIVE THE FLUSH. CHASE THE FIRST PICK.",
  "paragraphs": [
    "The bottom two seeds get first-round byes in the toilet bowl. In the last-place survival bracket, win and you are safe from finishing last. There is also a tournament for the toilet-bowl winner, with the first pick on the line. That is a real prize: an elite player can turn one miserable season into a very loud draft-night comeback.",
    "If the postseason began after Week 8, the toilet-bowl field would be Ankith, Aditya, Abhishek, Sahil, Gary & Naveen and Sahit. Taaha would be in the playoffs through the points wildcard despite his 2–6 record. Among that projected toilet field, Sahit is 1–7; Sahil and Gary & Naveen are 2–6. By the current record-and-points ordering, Sahit and Gary & Naveen occupy the bottom two spots, but this is only a snapshot and the seeding can change. Sahit just beat the previously unbeaten leader, so nobody should be treating a matchup with him like a complimentary bye."
  ]
};
export const week8Recaps: Recap[] = [
  {
    "matchupId": 1,
    "teamIds": [
      4,
      7
    ],
    "billing": "SUPER O-MARION BRO HITS THE WRONG PIPE.",
    "summary": "Ankith took a 29.10–24.90 Thursday edge, then added 80.70 in Sunday’s daytime window against Pranav P’s 73.40. That made it 109.80–98.30 before the night game. Sunday night widened the gap to 132.70–113.28; Caleb Williams’ Monday 13.98 put the final score on screen. The result: 146.68–113.28, a 33.40-point win, with Chase’s 33.10 and Allen’s 25.30 doing most of the damage. Both managers now stand 5–3. Pranav P still owns fourth on the points tiebreaker, while Ankith is sixth by record and outside the field because Taaha holds the wildcard. Super O-Marion Bro spent the weekend taking damage without finding a mushroom. Ankith cleared the level, only to discover the playoff princess is still in another castle.",
    "xFactorRosterId": 4,
    "xFactorId": "chase",
    "xFactor": "Chase supplied 33.10, almost the entire winning margin by himself. Add Allen’s 25.30 and Pranav P was facing two boss fights with one health bar. There was no helpful green pipe out of this one.",
    "lowlight": "Zay Flowers’ 0.00 left Pranav P without a key contribution, while Henry and Minnesota added only 6.00 apiece. His total fell 64.70 from last week’s 177.98. Ankith survived Myers’ 0.00; Super O-Marion Bro could have used a second controller, an extra life, or literally any points from Flowers. These are lineup scores, not claims about why a player scored zero.",
    "sources": [
      {
        "label": "Sleeper Week 8 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/8"
      },
      {
        "label": "ESPN completed-game windows; reconstructed totals, not exact live lead changes",
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
    "billing": "ZERO DARK PURDY RAIDED THE WRONG KITCHEN.",
    "summary": "Neither team had a Thursday starter contribution, so the comedy waited for Sunday. Abhishek emerged from the daytime games up 68.36–60.38, an eight-point lead as Zero Dark Purdy attempted a stealth operation so quiet the scoreboard barely noticed. Sunday night supplied 25.70 for Abhishek and only 7.20 for Aditya, closing the book at 94.06–67.58 with nobody left Monday. Rice’s 18.30 and Chase Brown’s 16.10 were enough to deliver a 26.48-point victory; Cook’s 18.10 could not rescue Aditya’s total. Both teams leave at 3–5, but they occupied the bottom two scoring spots on the weekly card. The biryani was not merely undercooked. Someone forgot to turn on the stove, and Abhishek still needed raita to beat it.",
    "xFactorRosterId": 2,
    "xFactorId": "rice",
    "xFactor": "Rice’s 18.30 was the largest contribution to Abhishek’s total. The combined score was only 161.64, and somehow the best Rice in a matchup against Cookin Sutton Biryani belonged to the other team. That should trigger an immediate kitchen inspection.",
    "lowlight": "Coleman’s 1.40, Pitts’ 2.60 and Parker Washington’s 3.60 left Aditya’s lineup with very little margin. Abhishek won despite Brissett’s 3.46, Reichard’s 0.50 and Kansas City’s 1.00. Zero Dark Purdy completed the mission, but the debrief is going to be mostly questions about how a bowl of cold biryani nearly put up a fight.",
    "sources": [
      {
        "label": "Sleeper Week 8 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/8"
      },
      {
        "label": "ESPN completed-game windows; reconstructed totals, not exact live lead changes",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 3,
    "teamIds": [
      10,
      6
    ],
    "billing": "J J THE JET PLANE MAKES AN EMERGENCY BUC-EE’S STOP.",
    "summary": "Abhiram put 10.36 on the board Thursday while Sahil waited for Sunday. Then came the supermarket-sized avalanche: 166.30 more for Abhiram during Sunday’s daytime games against Sahil’s 110.20. With neither team adding points in the night games, the completed result was 176.66–110.20, a 66.46-point demolition. Higgins delivered 39.50, Fannin 25.40 and Irving 23.00, combining for 87.90 before the rest of the lineup even mattered. Warren’s 22.30 was Sahil’s biggest response. Abhiram reaches 5–3 and the fifth record-based berth in the current snapshot; Sahil drops to 2–6. J J the Jet Plane landed at Buc-ee’s looking for fuel and left with a bag of Beaver Nuggets and a grounded aircraft. The only thing reaching cruising altitude was Abhiram’s score.",
    "xFactorRosterId": 10,
    "xFactorId": "higgins",
    "xFactor": "Higgins’ 39.50 supplied the week’s loudest statement in this matchup. The Higgins–Fannin–Irving trio alone outscored Aditya’s entire lineup by 20.32. Buc-ee’s has famously oversized everything; apparently the fantasy beatdowns come in family size too.",
    "lowlight": "Tre Tucker’s 0.00, Denver’s 2.50 and Pickens’ 6.80 left Sahil short of support for Warren. Meanwhile Abhiram’s lower contributions included Gordon at 6.90 and Bernard at 8.00. J J announced that the team was experiencing minor turbulence. The wing was already in the Buc-ee’s parking lot.",
    "sources": [
      {
        "label": "Sleeper Week 8 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/8"
      },
      {
        "label": "ESPN completed-game windows; reconstructed totals, not exact live lead changes",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 4,
    "teamIds": [
      8,
      3
    ],
    "billing": "OLAVE GARDEN GETS DUMPED ON LOVELAND ISLAND.",
    "summary": "Roshik started Thursday with 42.50 while Sahit had nothing on the board. By the end of Sunday’s daytime games, the script had flipped: Sahit had 125.16, and Roshik was finished at 111.10. Barkley’s Sunday-night 12.40 and Loveland’s Monday 11.50 only made the final margin louder. Sahit wins 149.06–111.10, his first victory and Roshik’s first defeat. Tuten’s 31.90 and Wilson’s 28.80 supplied the upset’s foundation; Bowers’ 28.20 and Jacobs’ 23.20 could not preserve the perfect record. Loveland Island finally held a recoupling, and Roshik’s perfect record got dumped by the fire pit. Olave Garden promised unlimited breadsticks; Sahit helped himself to the entire undefeated season. This was not a lucky scrape: Sahit finished third in weekly scoring and won by 37.96.",
    "xFactorRosterId": 8,
    "xFactorId": "tuten",
    "xFactor": "Tuten and Wilson combined for 60.70. Sahit’s 149.06 was the third-best score of the week, and the 37.96-point margin turned this from an upset into a very uncomfortable dinner service. Tuten and Wilson ordered the Never-Ending Touchdown Bowl; Roshik never found the waiter.",
    "lowlight": "Roshik’s lineup recorded 0.00 from Lamar Jackson, Chris Godwin and Emanuel Wilson, plus 7.60 from Bijan. Three empty plates at Olave Garden, and somehow nobody thought to bring out more breadsticks. Sahit sent the perfect season home before dessert.",
    "sources": [
      {
        "label": "Sleeper Week 8 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/8"
      },
      {
        "label": "ESPN completed-game windows; reconstructed totals, not exact live lead changes",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 5,
    "teamIds": [
      12,
      11
    ],
    "billing": "GARVEEN GETS BLUE-SHELLED BY THE KOOPA TROOP.",
    "summary": "Pranav J opened with 21.52 Thursday, then stacked 123.70 during Sunday’s daytime window to reach 145.22. Gary & Naveen managed 100.96 in that window and another 12.80 Sunday night, finishing at 113.76. The result was already leaning heavily one way before Monday, when Swift’s 27.90 and Seattle’s 2.00 took Pranav J to 175.12. Pollard’s 30.20 and Puka’s 25.00 had supplied two of the biggest early bricks. The 61.36-point win moves Pranav J to 7–1 and first on the season-points tiebreaker. Allen’s 26.56 could not keep GarVeen in range. GarVeen combined two names into one team and still could not find the multiplayer advantage. Pooka Koopa Troopa’s treated them like the tutorial level: a few shells, a victory lap, and no reason to save the game.",
    "xFactorRosterId": 12,
    "xFactorId": "swift",
    "xFactor": "Swift’s Monday 27.90 completed an 83.10-point Pollard–Puka–Swift trio. Three threats, three green shells circling the kart. GarVeen spent the weekend staring at the back of a Koopa and wondering whether someone had unplugged their controller.",
    "lowlight": "Dobbins at 1.30, Metcalf at 1.40 and Taylor at 6.70 combined for 9.40 on GarVeen’s side. Allen cannot drive both halves of this tandem kart. Gary had the steering wheel, Naveen had the map, and somehow both selected Rainbow Road with no guardrails.",
    "sources": [
      {
        "label": "Sleeper Week 8 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/8"
      },
      {
        "label": "ESPN completed-game windows; reconstructed totals, not exact live lead changes",
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
    "billing": "JAHMYRICA RESTS. BURDEN OF PROOF LOSES ITS CASE.",
    "summary": "Anudeep posted 30.50 Thursday and another 111.78 during Sunday’s daytime games, finishing at 142.28. Taaha had only 59.50 from Sunday daytime and 3.20 Sunday night, leaving a 79.58-point mountain for Monday. JSN’s 26.30, Burden’s 18.60 and Santos’ 10.20 made a serious 55.10-point push, but the final 117.80 still fell 24.48 short. Burrow’s 41.48, Gibbs’ 26.80 and Golden’s 20.90 had supplied Anudeep’s biggest individual contributions. Jahmyrica moves to 6–2; Taaha falls to 2–6 while holding the points wildcard with the league’s second-highest season total. Burden of Proof submitted its Monday rally as new evidence, but the jury had already seen Burrow’s testimony. Made in Jahmyrica was halfway to the beach while Taaha was still asking the judge to reconsider.",
    "xFactorRosterId": 1,
    "xFactorId": "burrow",
    "xFactor": "Burrow’s 41.48, combined with Gibbs’ 26.80 and Golden’s 20.90, totaled 89.18. That gave Anudeep enough cover to survive three other starters below six points and Taaha’s 55.10-point Monday push. Burrow handed Jahmyrica an all-inclusive vacation; the rest of the lineup mainly argued over who packed the sunscreen.",
    "lowlight": "Omar Cooper’s 0.00 and Okonkwo’s 3.20 made Taaha’s Monday climb steeper. Anudeep was hardly flawless—London 1.80, Jeremiyah Love 2.30 and Javonte 5.70—but Burrow’s 41.48 covered a lot of sins. Burden of Proof called Cooper to the witness stand and got complete silence. The wildcard case is still open; this week’s verdict is not.",
    "sources": [
      {
        "label": "Sleeper Week 8 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/8"
      },
      {
        "label": "ESPN completed-game windows; reconstructed totals, not exact live lead changes",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=8&seasontype=2&dates=2026"
      }
    ]
  }
];
export const week8PowerRankings: Ranking[] = [
  {
    "rosterId": 12,
    "previousRank": 2,
    "tier": "The standard",
    "outlook": "The 7–1 record now comes with the league’s highest points total, and Pollard, Swift and Puka just supplied 83.10 between them. That is a convincing weekly ceiling rather than a win built on opponent malfunction. The next assignment is Taaha, whose record badly understates his scoring strength. The throne is yours; the next visitor is bringing a calculator."
  },
  {
    "rosterId": 3,
    "previousRank": 1,
    "tier": "The standard",
    "outlook": "One loss does not erase seven wins. Bowers and Jacobs still combined for 51.40 in a bad team week, and the season total remains strong enough to keep Roshik near the top of this outlook board. The immediate test is 6–2 Anudeep. Lose that one and the undefeated-parade jokes become a recurring series instead of a one-night special."
  },
  {
    "rosterId": 1,
    "previousRank": 4,
    "tier": "The contenders",
    "outlook": "A 6–2 record and 1,116.42 points give Jahmyrica both results and production. Burrow’s 41.48 was the weekly turbo button, with Gibbs and Golden adding 47.70 across the completed card. The next matchup with Roshik is a chance to turn a strong contender résumé into a direct statement. Quietly dangerous is starting to feel like an outdated description."
  },
  {
    "rosterId": 7,
    "previousRank": 3,
    "tier": "The contenders",
    "outlook": "The 113.28 loss is a setback, not a verdict on the season. Pranav P still has five wins and 1,098.28 points, but fourth place rests on a 0.36-point edge over Abhiram. Hubbard’s 24.90 was a bright spot; the broader lineup needs to return to last week’s volume. Aditya is the next opponent, which looks friendly on paper. Ask Roshik how paper performed this week."
  },
  {
    "rosterId": 10,
    "previousRank": 7,
    "tier": "The contenders",
    "outlook": "The week’s highest score moves Abhiram up this editorial board. Higgins, Fannin and Irving delivered a multi-position eruption, and the 5–3 record now carries the final record berth. Ankith is next, so this is immediately about repeatability rather than framing the 176.66 screenshot. A superstore offense still needs to open on consecutive Sundays."
  },
  {
    "rosterId": 4,
    "previousRank": 6,
    "tier": "The contenders",
    "outlook": "Chase and Allen supplied a sturdy 58.40 in the win over Pranav P, and the record is now 5–3. The bank stays sixth here because one strong week has not yet erased the 21.72-point gap to Abhiram in the actual standings. Week 9 offers a direct chance to change the race. The branch is profitable; corporate would now like a playoff seat."
  },
  {
    "rosterId": 5,
    "previousRank": 5,
    "tier": "Still dangerous",
    "outlook": "This is the clearest gap between record and scoring quality: 2–6, second in season points, currently holding the wildcard. JSN’s 26.30 was another useful contribution, but the weekly total still lost to Anudeep. Taaha stays well above a cellar label on this outlook board. Pranav J is next, because apparently the schedule thought the character development was going too smoothly."
  },
  {
    "rosterId": 6,
    "previousRank": 8,
    "tier": "Still dangerous",
    "outlook": "Sahil has 1,033.84 points despite a 2–6 record, which keeps a points-based recovery plausible. Warren’s 22.30 could not match Abhiram’s eruption, and the wildcard gap to Taaha is 95.52. The next game against Gary & Naveen matters in the lower-table race. The plane still has an engine; passengers would appreciate an updated arrival estimate."
  },
  {
    "rosterId": 11,
    "previousRank": 9,
    "tier": "Still dangerous",
    "outlook": "Josh Allen’s 26.56 shows there is real scoring capacity here, but 959.04 season points and a 2–6 record leave work to do on both routes. This week’s opponent scored 175.12; next week’s Sahil matchup is a more direct test of who can leave the lower tier. Two managers should at least be able to agree that the cellar decor is getting old."
  },
  {
    "rosterId": 2,
    "previousRank": 11,
    "tier": "Repair work",
    "outlook": "Abhishek climbs one spot after reaching 3–5, but the 94.06 win is more survival than a breakthrough. Rice and Chase Brown were the leading contributors; the next opponent is Sahit, fresh off a genuine 149.06 upset. The schedule delivered a gift this week. Do not write a season plan that assumes the wrapping paper is renewable."
  },
  {
    "rosterId": 9,
    "previousRank": 10,
    "tier": "Repair work",
    "outlook": "At 3–5, Aditya still has time to matter, but 866.60 season points and this week’s 67.58 demand more than a record-based defense. Cook’s 18.10 was useful; the total around him was not. Pranav P is next, and the most urgent goal is a complete team response. The kitchen can reopen, but the health inspector is now in the group chat."
  },
  {
    "rosterId": 8,
    "previousRank": 12,
    "tier": "Repair work",
    "outlook": "Sahit finally has a win, and it was earned with the week’s third-highest score against the unbeaten leader. Tuten and Wilson’s 60.70 gives the comeback story actual substance. The 1–7 record and 845.48 season points still leave him last on the season-outlook board, but Abhishek should prepare for an opponent rather than a bye. The island has electricity again."
  }
];
export const week9Previews: Preview[] = [
  {
    "matchupId": 1,
    "teamIds": [
      7,
      9
    ],
    "billing": "PRANAV P VS ADITYA",
    "story": "Pranav P defends his razor-thin place in the top five; Aditya needs a response after 67.58. The bar for improvement is reachable without a ladder.",
    "key": "Pranav P’s response after a 64.70-point weekly drop, versus Aditya’s ability to recover from 67.58. This is a test of full-lineup output, not which manager posts the more confident pregame message.",
    "pickId": 7,
    "pickReason": "Five wins and a 231.68-point season advantage make Pranav P the evidence-based lean. Aditya can change the conversation, but the current numbers do not require a coin flip."
  },
  {
    "matchupId": 2,
    "teamIds": [
      4,
      10
    ],
    "billing": "ANKITH VS ABHIRAM",
    "story": "Both are 5–3 and Abhiram currently holds the final record berth by 21.72 points. Direct playoff leverage and no shortage of receipts.",
    "key": "Chase and Allen supplied 58.40 for Ankith; Higgins, Fannin and Irving supplied 87.90 for Abhiram. Those are last week’s outputs, not projections, but they show the ceiling each side is chasing.",
    "pickId": 10,
    "pickReason": "A slight editorial lean to Abhiram after the 176.66 explosion and with a 21.72-point season edge. Ankith just beat a contender, so this is a close call, not a foreclosure notice."
  },
  {
    "matchupId": 3,
    "teamIds": [
      2,
      8
    ],
    "billing": "ABHISHEK VS SAHIT",
    "story": "Abhishek looks to build on a win; Sahit just took down the unbeaten leader. Do not mistake 1–7 for a free square.",
    "key": "Rice and Chase Brown led Abhishek’s 94.06; Tuten and Wilson led Sahit’s 149.06. Can Sahit make that production repeat, or was the first win the season’s most elaborate jump scare?",
    "pickId": 8,
    "pickReason": "The upset pick: Sahit’s latest 149.06 was real, while Abhishek’s 94.06 beat only Aditya. One week is a small sample; we are choosing the higher recent ceiling and accepting the group-chat consequences."
  },
  {
    "matchupId": 4,
    "teamIds": [
      6,
      11
    ],
    "billing": "SAHIL VS GARY & NAVEEN",
    "story": "Both sit 2–6. Every win matters in the race away from the bottom, and nobody wants to audition for the wrong side of the toilet bowl.",
    "key": "The gap in season points is 1,033.84 to 959.04 in Sahil’s favor. Warren and Allen were their respective leading starters last week. Both teams need the rest of the lineup to join the meeting.",
    "pickId": 6,
    "pickReason": "Sahil’s 74.80-point season advantage provides the lean in a matchup of 2–6 teams. This is an editorial forecast, not a claim that the win is already booked."
  },
  {
    "matchupId": 5,
    "teamIds": [
      1,
      3
    ],
    "billing": "ANUDEEP VS ROSHIK",
    "story": "A 6–2 contender meets the 7–1 former unbeaten. Roshik has a chance to bounce back; Anudeep has a chance to make that first loss look like a trend.",
    "key": "Burrow–Gibbs–Golden versus a Roshik team that got 51.40 from Bowers and Jacobs even in defeat. No need to invent a grudge: the records and the standings already do enough marketing.",
    "pickId": 1,
    "pickReason": "A narrow call for Anudeep, whose season total is 8.00 higher and whose latest lineup produced 142.28. Roshik is still 7–1; the pick is a contender call, not an obituary."
  },
  {
    "matchupId": 6,
    "teamIds": [
      5,
      12
    ],
    "billing": "TAAHA VS PRANAV J",
    "story": "The current points-wildcard leader faces the standings leader. Taaha’s points deserve a winning record; Pranav J is under no obligation to provide one.",
    "key": "The league’s top two season-point totals, 1,162.08 and 1,129.36. Swift and JSN were productive Monday finishers last week; this forecast is about the broader scoring strength, not a promise of the same game script.",
    "pickId": 12,
    "pickReason": "Pranav J leads the season scoring race and just posted 175.12. Taaha has every reason to be dangerous, but the forecast follows the strongest overall scoring résumé."
  }
];
export const mickeyOfTheWeek = {
  "rosterId": 2,
  "headline": "94.06 POINTS. ONE VERY GENEROUS APPOINTMENT.",
  "summary": "Abhishek won while scoring less than ten of the other eleven teams. His 94.06 ranked 11th, and the only team below him was the one on his schedule: Aditya at 67.58. This is exactly what the Mickey award measures, not a punishment for the lowest scorer. The win counts in full. The dignity is available separately.",
  "allPlayWins": 1,
  "allPlayLosses": 10,
  "scoreRank": 11,
  "opponentRank": 12,
  "verdict": "Zero Dark Purdy found the one unlocked door in an eleven-door hallway. Keep the win, frame the schedule and send Aditya a tasteful thank-you card. The league office will recognize the result; the group chat reserves the right to recognize the circumstances."
};
