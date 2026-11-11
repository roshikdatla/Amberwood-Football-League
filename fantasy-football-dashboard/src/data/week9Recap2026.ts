export const recapTeams = [
  {
    "rosterId": 1,
    "manager": "Anudeep",
    "teamName": "Made in Jahmyrica",
    "score": 168.94,
    "record": "7–2"
  },
  {
    "rosterId": 2,
    "manager": "Abhishek",
    "teamName": "Zero Dark Purdy",
    "score": 104.18,
    "record": "3–6"
  },
  {
    "rosterId": 3,
    "manager": "Roshik",
    "teamName": "Olave Garden",
    "score": 142.74,
    "record": "7–2"
  },
  {
    "rosterId": 4,
    "manager": "Ankith",
    "teamName": "Jeanty Morgan Chase & Co.",
    "score": 123.46,
    "record": "6–3"
  },
  {
    "rosterId": 5,
    "manager": "Taaha",
    "teamName": "Burden of Proof",
    "score": 140.98,
    "record": "2–7"
  },
  {
    "rosterId": 6,
    "manager": "Sahil",
    "teamName": "J J the Jet Plane",
    "score": 85.78,
    "record": "2–7"
  },
  {
    "rosterId": 7,
    "manager": "Pranav P",
    "teamName": "Super O-Marion Bro",
    "score": 102.86,
    "record": "5–4"
  },
  {
    "rosterId": 8,
    "manager": "Sahit",
    "teamName": "loveland island",
    "score": 119.16,
    "record": "2–7"
  },
  {
    "rosterId": 9,
    "manager": "Aditya",
    "teamName": "Cookin Sutton Biryani",
    "score": 121.38,
    "record": "4–5"
  },
  {
    "rosterId": 10,
    "manager": "Abhiram",
    "teamName": "4Achane Buc-ee’s",
    "score": 109.84,
    "record": "5–4"
  },
  {
    "rosterId": 11,
    "manager": "Gary & Naveen",
    "teamName": "GarVeen",
    "score": 90.36,
    "record": "3–6"
  },
  {
    "rosterId": 12,
    "manager": "Pranav J",
    "teamName": "pooka koopa troopa’s",
    "score": 176.28,
    "record": "8–1"
  }
];
export const getRecapTeam = (id: number) => { const team = recapTeams.find(t => t.rosterId === id); if (!team) throw new Error(`Unknown roster ${id}`); return team; };
export const formatScore = (n: number) => n.toFixed(2);
export const players = {
  "golden": {
    "name": "Matthew Golden",
    "points": 34.4
  },
  "watson": {
    "name": "Christian Watson",
    "points": 32.1
  },
  "chase": {
    "name": "Ja’Marr Chase",
    "points": 34.0
  },
  "walker": {
    "name": "Kenneth Walker III",
    "points": 38.3
  },
  "purdy": {
    "name": "Brock Purdy",
    "points": 25.28
  },
  "concepcion": {
    "name": "KC Concepcion Jr.",
    "points": 20.3
  },
  "cook": {
    "name": "James Cook III",
    "points": 18.7
  },
  "mccaffrey": {
    "name": "Christian McCaffrey",
    "points": 22.7
  },
  "nacua": {
    "name": "Puka Nacua",
    "points": 37.0
  },
  "love": {
    "name": "Jordan Love",
    "points": 36.18
  },
  "lamb": {
    "name": "CeeDee Lamb",
    "points": 36.0
  },
  "stbrown": {
    "name": "Amon-Ra St. Brown",
    "points": 16.6
  },
  "prescott": {
    "name": "Dak Prescott",
    "points": 19.5
  }
};
export const getStarter = (_rosterId: number, playerId: string) => players[playerId as keyof typeof players];
type Source = { label: string; url: string };
type Recap = { matchupId: number; teamIds: number[]; billing: string; summary: string; xFactorRosterId: number; xFactorId: string; xFactor: string; lowlight: string; sources?: Source[] };
type Ranking = { rosterId: number; previousRank: number; tier: string; outlook: string; sources?: Source[] };
type Preview = { matchupId: number; teamIds: number[]; billing: string; story: string; key: string; pickId: number; pickReason: string; sources?: Source[] };
export const recapSource = {
  "capturedAt": "2026-11-11T18:48:00Z",
  "sources": {
    "week9": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/9",
    "week10": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/10",
    "espn9": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=9&seasontype=2&dates=2026"
  }
};
export const week9Overview = {
  "headline": "THE CONTENDERS CONSOLIDATE. THE WILDCARD WON’T BUDGE.",
  "lead": "Amberwood, Week 9 turned a three-way race for the top into a clearer picture: Pranav J (8–1) is now alone at the top, Anudeep knocked Roshik off at 7–2, and the fifth and sixth spots are a photo finish between Abhiram and Pranav P. Meanwhile Taaha put up another 140.98 in a losing effort and still owns the points wildcard with 1,270.34 — third in the league behind only Pranav J and Anudeep. The record column keeps lying about who is dangerous."
};
export const playoffPicture = {
  "headline": "FIVE RECORD BERTHS. ONE POINTS ESCAPE HATCH.",
  "paragraphs": [
    "Pranav J is 8–1 and alone at the top. Anudeep and Roshik are 7–2, separated by 34.20 season points after swapping places at the top of the standings. Ankith moved to 6–3 and now sits fourth. The fifth record berth is a two-team race: Abhiram (5–4, 1,207.76 PF) edges Pranav P (5–4, 1,201.14 PF) by 6.62 points — a margin so thin it will be decided by one Thursday night fumble.",
    "The sixth berth remains Taaha’s points-wildcard property. He is 2–7 but has 1,270.34 season points, more than every team except Pranav J and Anudeep — including the 7–2 Roshik. Nobody outside the top-five record berths is within 69 points of that number. The wildcard pool shifts whenever the top five shifts; right now the math keeps printing Taaha’s name."
  ],
  "topFive": "Pranav J 8–1 (1,338.36 PF); Anudeep 7–2 (1,285.36); Roshik 7–2 (1,251.16); Ankith 6–3 (1,199.66); Abhiram 5–4 (1,207.76).",
  "wildcard": "Taaha 1,270.34 PF — third in the league behind Pranav J and Anudeep, and 69.20 ahead of Pranav P’s 1,201.14."
};
export const week9Recaps: Recap[] = [
  {
    "matchupId": 1,
    "teamIds": [
      7,
      9
    ],
    "billing": "COOKIN SUTTON BIRYANI FINALLY SERVES SOMETHING HOT.",
    "summary": "Pranav P entered the week defending the fifth record berth by a 0.36-point margin and left having surrendered it entirely. Aditya’s 121.38–102.86 win moves him to 4–5 and drops Pranav P to 5–4, where he now sits 6.62 points behind Abhiram for the fifth berth. Cook (18.70), Parker Washington (15.60) and Nico Collins (15.50) led Aditya’s balanced output; McCaffrey’s 22.70 and a modest 14.56 from Jayden Daniels was not enough. The biryani was finally served at full temperature. Super O-Marion Bro left the dining room with a new reservation on the outside looking in.",
    "xFactorRosterId": 9,
    "xFactorId": "cook",
    "xFactor": "Cook’s 18.70 topped Aditya’s board, but the real story was that the kitchen finally cooked across the whole menu — four starters between 10 and 18 points. The Sunday Biryani special came with a side of Pranav P’s playoff positioning.",
    "lowlight": "Ladd McConkey’s 0.00, Zay Flowers’ 5.30 and single-digit contributions from Nabers, Diggs and Aubrey left Pranav P propped up by McCaffrey alone. For the second week in a row, half the lineup refused to arrive. Super O-Marion Bro is now one bad week away from being the first team pushed out of the record field.",
    "sources": [
      {
        "label": "Sleeper Week 9 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/9"
      },
      {
        "label": "ESPN completed-game windows; reconstructed totals, not exact live lead changes",
        "url": "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=9&seasontype=2&dates=2026"
      }
    ]
  },
  {
    "matchupId": 2,
    "teamIds": [
      4,
      10
    ],
    "billing": "JEANTY MORGAN CHASE & CO. TAKES OVER FOURTH.",
    "summary": "A direct fight for the fifth record berth ended in Ankith’s favor, 123.46–109.84. Chase (34.00) carried Ankith’s top line while Tetairoa McMillan (15.60) and Rhamondre Stevenson (14.80) added balance. Abhiram countered with Bucky Irving (27.50) and Tee Higgins (20.20), but the rest of the lineup ran cold. Ankith moves to 6–3 and now owns fourth place; Abhiram stays at 5–4 and holds the fifth record berth by 6.62 points. The branch is now the headquarters. The playoff teller window is open; Abhiram should check whether his account is still active.",
    "xFactorRosterId": 4,
    "xFactorId": "chase",
    "xFactor": "Chase’s 34.00 was the entire margin by himself, with change left over for the tip. Add McMillan and Stevenson’s combined 30.40 and Ankith had a three-headed scoring attack that Abhiram’s two-man show could not cover.",
    "lowlight": "Abhiram got only 12.20 from Fannin after last week’s 25.40, and nothing much from the rest of his supporting cast. Chase supplied most of the damage for Ankith; the real lowlight for Abhiram was that Buc-ee’s suddenly looked understocked.",
    "sources": [
      {
        "label": "Sleeper Week 9 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/9"
      }
    ]
  },
  {
    "matchupId": 3,
    "teamIds": [
      8,
      2
    ],
    "billing": "LOVELAND ISLAND KEEPS THE RECEIPTS FROM LAST WEEK.",
    "summary": "A week after knocking Roshik off perfection, Sahit backed it up with a 119.16–104.18 win over Abhishek. KC Concepcion Jr. (20.30), Drake Maye (18.26) and Spencer Shrader (14.60) were the top three contributors. Purdy’s 25.28 gave Abhishek a lift but Rome Odunze’s 16.00 and the Chiefs defense (11.00) could not get him past 105. Sahit moves to 2–7 with a second straight win; Abhishek slides to 3–6 — and both opponents on Sahit’s win streak will remember them. Zero Dark Purdy showed up with a flashlight; Sahit’s island had working streetlights.",
    "xFactorRosterId": 8,
    "xFactorId": "concepcion",
    "xFactor": "Concepcion’s 20.30 led Sahit’s lineup in a week where the top three finishers only combined for 53.16. That’s not a blowout, it’s a steady-handed win — the kind that suggests the 1–7 start may have been the tail of the bell curve, not the center.",
    "lowlight": "Abhishek’s lineup never found a true tentpole after Purdy’s 25.28. Odunze had 16.00, the Chiefs had 11.00, and the rest was a long drop-off to single digits. Loveland Island is slowly becoming a destination opponents hoped was closed for the season.",
    "sources": [
      {
        "label": "Sleeper Week 9 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/9"
      }
    ]
  },
  {
    "matchupId": 4,
    "teamIds": [
      11,
      6
    ],
    "billing": "GARVEEN SNEAKS PAST THE JET PLANE ON A COMMUTER FLIGHT.",
    "summary": "Both teams were 2–6 entering the week and both scored under 91. GarVeen won 90.36–85.78, the lowest combined total of the week. Amon-Ra St. Brown (16.60), Josh Allen (12.86) and Blake Corum (11.80) were the leading contributors. Sahil got 19.50 from Dak Prescott and 16.30 from Isaiah Likely, but the supporting cast was quiet. GarVeen moves to 3–6; Sahil falls to 2–7 and joins Taaha and Sahit in the growing toilet-bowl waiting room. GarVeen booked a window seat on a regional puddle-jumper and still beat J J to the gate.",
    "xFactorRosterId": 11,
    "xFactorId": "stbrown",
    "xFactor": "ARSB’s 16.60 was unspectacular by his standards but it was exactly the kind of steady contribution GarVeen has rarely seen this year. In a 90-point win, every reasonable number counts twice.",
    "lowlight": "A game where 90.36 was enough tells you everything. Sahil’s Zach Charbonnet got 9.60 and the bottom of his lineup never got going. The Jet Plane is still looking for the gate agent. GarVeen takes home the Mickey; Sahil takes home another loss.",
    "sources": [
      {
        "label": "Sleeper Week 9 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/9"
      }
    ]
  },
  {
    "matchupId": 5,
    "teamIds": [
      1,
      3
    ],
    "billing": "JAHMYRICA TAKES THE TOP-TWO TIEBREAKER.",
    "summary": "The marquee game of the week delivered a clean result: Anudeep 168.94, Roshik 142.74. Matthew Golden (34.40), Joe Burrow (29.54) and Javonte Williams (24.40) supplied Jahmyrica’s top three — 88.34 before anyone else chipped in. Roshik countered with Christian Watson (32.10), Bijan Robinson (27.70) and Brock Bowers (24.30), a top three of 84.10 that nearly kept pace, but the rest of the lineup did not. Both teams are 7–2; Anudeep now owns the tiebreaker by 34.20 season points and sits second. Olave Garden had a fine meal; Jahmyrica brought the dessert menu.",
    "xFactorRosterId": 1,
    "xFactorId": "golden",
    "xFactor": "Golden’s 34.40 was the single highest contribution in the matchup and the lineup’s top line. Combined with Burrow’s 29.54, this was a 63.94-point one-two punch that Olave Garden could not match at the top of the ticket.",
    "lowlight": "Roshik’s bottom end never arrived — not a disaster at any single position, but the gap between his top three and his tail was wider than Anudeep’s. One loss does not make a trend; two in three weeks might.",
    "sources": [
      {
        "label": "Sleeper Week 9 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/9"
      }
    ]
  },
  {
    "matchupId": 6,
    "teamIds": [
      12,
      5
    ],
    "billing": "BURDEN OF PROOF SUBMITS 140.98. JURY STILL RULES AGAINST.",
    "summary": "Pranav J posted 176.28, his second straight 175-plus week. Puka Nacua (37.00), Jordan Love (36.18) and CeeDee Lamb (36.00) combined for a historic 109.18 at the top of the lineup. Taaha’s 140.98 would have been a competitive total against almost anyone else in the league — Kenneth Walker III had 38.30, Luther Burden III added 22.20 — but he drew the week’s highest score and lost by 35.30. Pranav J is 8–1 and alone at the top; Taaha is 2–7 but still the points wildcard. Burden of Proof once again submitted the kind of weekly total that wins most matchups; it just keeps drawing the one it can’t.",
    "xFactorRosterId": 12,
    "xFactorId": "nacua",
    "xFactor": "Nacua’s 37.00 topped a three-way tie at the top of Pranav J’s lineup where everyone finished within 1.00 of each other. When your top three all hit 36-plus, you don’t need bench contributions; you just need the clock to run out.",
    "lowlight": "Trevor Lawrence’s 13.58 was Taaha’s third-leading contributor, which gives you a picture of how top-heavy the lineup gets after Walker and Burden. The wildcard case keeps building; the record stays unfixable.",
    "sources": [
      {
        "label": "Sleeper Week 9 lineups and scores",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/9"
      }
    ]
  }
];
export const week9PowerRankings: Ranking[] = [
  {
    "rosterId": 12,
    "previousRank": 1,
    "tier": "The standard",
    "outlook": "Back-to-back 175-plus weeks and an 8–1 record. Nacua, Love and Lamb combined for 109.18 and the gap to the rest of the record field is a comfortable 53.00 points over 7–2 Anudeep. Next up: Abhiram, a top-six scoring attack but one playing for a record berth, not a bye. The throne isn’t just occupied; the Koopa Troop installed a fence around it."
  },
  {
    "rosterId": 1,
    "previousRank": 3,
    "tier": "The standard",
    "outlook": "The 7–2 record now comes with the league’s second-highest points total at 1,285.36 and a direct win over the other 7–2 team. Golden, Burrow and Javonte supplied an 88.34-point top line, but seven other starters also cleared six points — a balanced explosion that wins marquee matchups. Next assignment is GarVeen, whose 90.36 week suggests a scheduled breather. Jahmyrica is quietly running out of convincing counter-arguments."
  },
  {
    "rosterId": 3,
    "previousRank": 2,
    "tier": "The standard",
    "outlook": "Two losses in three weeks puts Roshik on the back of the top-three train, but 7–2 and 1,251.16 PF are still an elite résumé. Watson, Bijan and Bowers delivered a top-three of 84.10 — the supporting cast is the problem. Aditya is next and that is a get-right opportunity. Olave Garden still has unlimited breadsticks; the kitchen is just running slower service."
  },
  {
    "rosterId": 5,
    "previousRank": 7,
    "tier": "The contenders",
    "outlook": "This is the clearest gap between record and scoring quality in the league: 2–7 and third in season points at 1,270.34 — behind only Pranav J and Anudeep. Walker’s 38.30 and Burden’s 22.20 are not lineup anomalies; they are weekly outputs. Taaha is a contender wearing a toilet-bowl costume, and the points wildcard keeps printing receipts."
  },
  {
    "rosterId": 10,
    "previousRank": 5,
    "tier": "The contenders",
    "outlook": "Abhiram holds the fifth record berth by 6.62 points over Pranav P. The 109.84 loss to Ankith wasn’t a disaster but Irving and Higgins carried a lineup that had little else to say. Next up is Pranav J — a brutal draw. The 4-Achane Buc-ee’s has the gas; the question is whether it has enough snacks for the long drive."
  },
  {
    "rosterId": 4,
    "previousRank": 6,
    "tier": "The contenders",
    "outlook": "Chase and the whole operation moved Ankith to 6–3 and fourth place. Three-headed scoring attacks win playoff weeks, and the 30.40 combined from McMillan and Stevenson is the depth that was missing early in the season. Next up is Sahil, who just scored 85.78. The branch moved up to a regional office."
  },
  {
    "rosterId": 7,
    "previousRank": 4,
    "tier": "The contenders",
    "outlook": "Dropped out of the top five by 6.62 points, Pranav P now needs help. Five wins and 1,201.14 PF are a sturdy foundation, but this week’s 102.86 after Week 8’s 113.28 shows a lineup that keeps leaving points on the bench. Next up is Abhishek, a schedule gift that the current form absolutely requires. The branch bank needs a deposit."
  },
  {
    "rosterId": 9,
    "previousRank": 11,
    "tier": "Repair work",
    "outlook": "Aditya’s 121.38 win moves him to 4–5 and officially back into the conversation. The balanced output across Cook, Washington and Collins is exactly the recipe this team has been missing. Next up: Roshik — a real test. The biryani is finally hot; the question is whether the chef can keep temperature."
  },
  {
    "rosterId": 11,
    "previousRank": 9,
    "tier": "Repair work",
    "outlook": "GarVeen got to 3–6 by scoring 90.36 in a weekly battle of two struggling lineups. A win is a win — the Mickey plaque acknowledges that — and the schedule now offers Anudeep. This remains a team where Josh Allen keeps delivering but the surrounding cast rarely shows up alongside him. Two managers; one playbook; still trying to agree on a game plan."
  },
  {
    "rosterId": 2,
    "previousRank": 10,
    "tier": "Repair work",
    "outlook": "Abhishek drops to 3–6 after running into a Sahit team on a two-game heater. Purdy’s 25.28 kept the lineup afloat for a half but the supporting cast was quiet. 967.14 PF through nine weeks is thin, and the next opponent is Pranav P, who has his own problems. Repair work continues; the receipts aren’t getting shorter."
  },
  {
    "rosterId": 6,
    "previousRank": 8,
    "tier": "Repair work",
    "outlook": "85.78 points, a loss in the lowest-scoring game of the week, and a drop to 2–7. Sahil has 1,119.62 season points — real scoring capacity exists but it keeps missing shifts. Next up is Ankith, now 6–3 with Ja’Marr Chase firing. The Jet Plane needs more than a new paint job; the tower is asking for identification."
  },
  {
    "rosterId": 8,
    "previousRank": 12,
    "tier": "Repair work",
    "outlook": "Two straight wins for Sahit, including taking down the then-unbeaten leader. The 119.16 over Abhishek was less spectacular than the 149.06 blow against Roshik, but back-to-back wins against anyone counts. Still 2–7, still 964.64 PF, still bottom of the season-outlook board — but the island has not just electricity, it has a kitchen running two hot meals."
  }
];
export const week10Previews: Preview[] = [
  {
    "matchupId": 1,
    "teamIds": [
      2,
      7
    ],
    "billing": "ABHISHEK VS PRANAV P",
    "story": "Zero Dark Purdy at 3–6 meets Super O-Marion Bro at 5–4, with the fifth record berth still 6.62 points away for Pranav P. Both teams need the win.",
    "key": "Purdy’s 25.28 kept Abhishek in last week’s game. McCaffrey’s 22.70 kept Pranav P in his. The key is which lineup finds a second scorer; the wildcard cutoff is watching from a safe distance.",
    "pickId": 7,
    "pickReason": "Pranav P’s season total of 1,201.14 is 234.00 points ahead of Abhishek. The five wins are real. The forecast follows the stronger résumé, not last week’s stumble.",
    "sources": [
      {
        "label": "Sleeper Week 10 schedule",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/10"
      }
    ]
  },
  {
    "matchupId": 2,
    "teamIds": [
      4,
      6
    ],
    "billing": "ANKITH VS SAHIL",
    "story": "Ankith (6–3) is locked into fourth place and climbing; Sahil (2–7) is trying to avoid the toilet-bowl bottom two.",
    "key": "Chase just put up 34.00; Prescott put up 19.50. That is the current ceiling gap between these two. Sahil needs a complete lineup; Ankith needs one more complete lineup to tighten his grip on fourth.",
    "pickId": 4,
    "pickReason": "An 80.04-point season advantage and the week’s most recent 123.46 both lean here. Sahil has upside but currently lacks the multi-position output to outscore a lineup with Chase at the top.",
    "sources": [
      {
        "label": "Sleeper Week 10 schedule",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/10"
      }
    ]
  },
  {
    "matchupId": 3,
    "teamIds": [
      3,
      9
    ],
    "billing": "ROSHIK VS ADITYA",
    "story": "Olave Garden looks for a bounce-back after losing the top-two tiebreaker; Aditya just reasserted that his lineup can produce when the whole menu shows up.",
    "key": "Watson, Bijan and Bowers delivered 84.10 for Roshik even in defeat. Cook, Washington and Collins delivered 49.80 together for Aditya. Roshik’s depth remains the differentiator — but so was Sahit’s depth two weeks ago.",
    "pickId": 3,
    "pickReason": "Roshik is 7–2 with 1,251.16 PF. Aditya is 4–5 with 987.98 — a 263.18-point season gap. The pick follows the stronger body of work, not any one recent week.",
    "sources": [
      {
        "label": "Sleeper Week 10 schedule",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/10"
      }
    ]
  },
  {
    "matchupId": 4,
    "teamIds": [
      10,
      12
    ],
    "billing": "ABHIRAM VS PRANAV J",
    "story": "A direct meeting between the fifth record berth and the 8–1 leader. If there was a right week for Pranav J to drop one, this is the schedule that would announce it.",
    "key": "Pranav J’s 176.28 was his second straight 175-plus. Abhiram’s 109.84 was below his season average. One of these teams has an issue to solve; the other has a weekly scoring record to keep chasing.",
    "pickId": 12,
    "pickReason": "The 8–1 record and 1,338.36 season points leave no ambiguity. Abhiram has upside but will likely need Pranav J to post something closer to 100 than 175 — not the way the Koopa Troop has been trending.",
    "sources": [
      {
        "label": "Sleeper Week 10 schedule",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/10"
      }
    ]
  },
  {
    "matchupId": 5,
    "teamIds": [
      5,
      8
    ],
    "billing": "TAAHA VS SAHIT",
    "story": "The points-wildcard leader meets the hottest 2–7 team in the league. Sahit is trying to make last week’s win against the unbeaten leader look like the first of many.",
    "key": "Taaha’s 1,270.34 PF is the league’s third-highest, behind only Pranav J and Anudeep. Sahit’s 964.64 is twelfth. But Sahit has won two in a row, including a 149.06 against Roshik. The gap narrows if Taaha runs into another low total.",
    "pickId": 5,
    "pickReason": "The 305.70-point season advantage is massive, and Walker’s 38.30 ceiling is a real weapon. A Sahit upset is on the menu, but the base forecast follows the much stronger scoring résumé.",
    "sources": [
      {
        "label": "Sleeper Week 10 schedule",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/10"
      }
    ]
  },
  {
    "matchupId": 6,
    "teamIds": [
      1,
      11
    ],
    "billing": "ANUDEEP VS GARY & NAVEEN",
    "story": "A 7–2 contender with the week’s highest win rolling into a matchup with the 3–6 Mickey recipient. On paper, the mismatch is clear; GarVeen now has an entire week of highlight reels about teams that got comfortable.",
    "key": "Anudeep’s Golden-Burrow top end produced 63.94 by itself last week. GarVeen’s Josh Allen slot is a real weapon but rarely gets support. The forecast tracks lineup depth, which Jahmyrica currently has in surplus.",
    "pickId": 1,
    "pickReason": "A 236-point season advantage, a 168.94-point most-recent effort, and the second-best season total in the league. Everything in the numbers leans here. GarVeen’s best-case is a tight loss.",
    "sources": [
      {
        "label": "Sleeper Week 10 schedule",
        "url": "https://api.sleeper.app/v1/league/1354521952483573760/matchups/10"
      }
    ]
  }
];
export const mickeyOfTheWeek = {
  "rosterId": 11,
  "headline": "90.36 POINTS. MARGIN OF 4.58.",
  "summary": "GarVeen won while scoring less than ten of the other eleven teams. Their 90.36 ranked 11th, and the only team below them was Sahil at 85.78 — their scheduled opponent. The margin was 4.58 points; the schedule luck factor was +0.909, the highest possible. This is exactly what the Mickey award measures, not a punishment for the lowest scorer. The win counts in full. The lightness is included.",
  "allPlayWins": 1,
  "allPlayLosses": 10,
  "scoreRank": 11,
  "opponentRank": 12,
  "verdict": "GarVeen flew the regional puddle-jumper to the one open gate in a 12-gate terminal. The win goes in the record book; the itinerary should be laminated. The league office will recognize the result; the group chat reserves the right to recognize the circumstances."
};
