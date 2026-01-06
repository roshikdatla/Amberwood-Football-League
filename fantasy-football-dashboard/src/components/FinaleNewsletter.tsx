import React from 'react';

const FinaleNewsletter: React.FC = () => {
  return (
    <div className="newsletter-archive">
      {/* Championship Edition Styles */}
      <style>{`
        /* Championship Theme Colors */
        .championship-newsletter .newspaper-container {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%) !important;
          border: 3px solid #FFD700 !important;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.3), 0 8px 16px rgba(0,0,0,0.3) !important;
        }

        .championship-newsletter .newspaper-header {
          background: linear-gradient(180deg, #FFD700 0%, #FFA500 100%) !important;
          border-bottom: 3px solid #FFD700 !important;
          padding: 30px 20px !important;
          position: relative !important;
        }

        .championship-newsletter .newspaper-title {
          color: #1a1a1a !important;
          text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.3) !important;
          font-weight: 900 !important;
        }

        .championship-newsletter .newspaper-subtitle {
          color: #2d2d2d !important;
          font-weight: 600 !important;
        }

        .championship-newsletter .newspaper-meta {
          background: transparent !important;
          border-radius: 8px !important;
          padding: 10px !important;
        }

        .championship-newsletter .newspaper-meta span {
          color: #1a1a1a !important;
          font-weight: 700 !important;
          background: transparent !important;
          border: none !important;
        }

        .championship-newsletter .newspaper-content {
          background: #f9f9f9 !important;
          color: #1a1a1a !important;
        }

        .championship-newsletter .headline {
          color: #1a1a1a !important;
          background: transparent !important;
          padding: 15px 20px !important;
          border-radius: 0 !important;
          text-align: center !important;
          box-shadow: none !important;
          border: none !important;
          margin-bottom: 10px !important;
        }

        .championship-newsletter .byline {
          border-bottom: 2px solid #1a1a1a !important;
          padding-bottom: 15px !important;
          margin-bottom: 20px !important;
        }

        .championship-newsletter h3 {
          color: #1a1a1a !important;
          border-left: 5px solid #FFD700 !important;
          padding-left: 15px !important;
          background: linear-gradient(90deg, rgba(255, 215, 0, 0.1), transparent) !important;
          padding: 10px 15px !important;
          border-radius: 4px !important;
        }

        .championship-newsletter h4 {
          color: #2d2d2d !important;
          border-bottom: 2px solid #FFD700 !important;
          padding-bottom: 5px !important;
        }

        .championship-newsletter .matchup-result {
          background: transparent !important;
          border-left: none !important;
          padding: 0 !important;
          margin: 10px 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }

        .championship-newsletter .section-headline {
          background: linear-gradient(90deg, #1a1a1a, #2d2d2d) !important;
          color: #FFD700 !important;
          padding: 15px 20px !important;
          text-align: center !important;
          border: 3px solid #FFD700 !important;
          border-radius: 8px !important;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5) !important;
          box-shadow: 0 4px 8px rgba(255, 215, 0, 0.2) !important;
        }

        .championship-newsletter .story-column h3 {
          color: #1a1a1a !important;
          margin-top: 20px !important;
        }

        .championship-newsletter .team-analysis,
        .championship-newsletter .final-assessment {
          background: rgba(255, 215, 0, 0.05) !important;
          border: 1px solid rgba(255, 215, 0, 0.2) !important;
          border-radius: 8px !important;
          padding: 20px !important;
        }

        .championship-newsletter .newspaper-footer {
          background: linear-gradient(180deg, #2d2d2d 0%, #1a1a1a 100%) !important;
          border-top: 3px solid #FFD700 !important;
          color: #FFD700 !important;
        }

        .championship-newsletter .footer-line {
          border-top: 2px solid #FFD700 !important;
        }

        .championship-newsletter .newspaper-tagline {
          color: #FFD700 !important;
          font-weight: 700 !important;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5) !important;
        }

        @media (max-width: 768px) {
          .newspaper-meta {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
            align-items: center !important;
          }
          .newspaper-meta span {
            font-size: 11px !important;
            padding: 6px 12px !important;
            display: block !important;
            margin: 0 !important;
            width: auto !important;
            max-width: 90% !important;
          }
          .section-headline {
            font-size: 18px !important;
            padding: 10px !important;
          }
          .story-column h3 {
            font-size: 16px !important;
            padding: 8px !important;
          }
        }
      `}</style>

      <div className="championship-newsletter">

      <div className="newspaper-container">
        <div className="newspaper-header">
          <div className="newspaper-masthead">
            <h1 className="newspaper-title">AMBERWOOD FANTASY TIMES</h1>
            <div className="newspaper-subtitle">The Premier Source for Fantasy Football News & Analysis</div>
            <div className="newspaper-meta">
              <span className="edition">2025 Unwrapped: Season Finale</span>
              <span className="date">January 2026</span>
              <span className="price">FREE</span>
            </div>
          </div>
        </div>

        <div className="newspaper-content">
          <div className="main-story">
            <h2 className="headline">The Prince Who Finally Became a King</h2>
            <div className="byline">By the Office of the Commissioner | Complete Season Recap</div>

            <div className="center-image" style={{marginBottom: '20px', marginTop: '20px', textAlign: 'center'}}>
              <video
                autoPlay
                muted
                playsInline
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  height: 'auto',
                  border: '3px solid #FFD700',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(255, 215, 0, 0.3)',
                  display: 'block',
                  margin: '0 auto'
                }}
              >
                <source src="/2023 - Aditya Kulkarni 2024 - Anudeep Udumula 2025- Abhiram Udumula (3).mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="draft-caption" style={{fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '10px'}}>
                The 2025 Amberwood Fantasy League Champion
              </div>
            </div>

            <p>
              When the playoffs began, Sahil (swahili28) entered as the 5-seed with an 8-6 record, but what
              unfolded over the next three weeks was nothing short of championship dominance. His team averaged
              a ridiculous <strong>153.35 points per game</strong> during the playoffs—nearly 12 points higher
              than his regular season average. What a riser!
            </p>

            <h4>The Championship Run (Weeks 15-17):</h4>
            <div className="matchup-result">
              <p><strong>Week 15 vs kulkdaddy47: 165.66-87.51</strong></p>
              <p>
                The statement game. Sahil's squad exploded for 165.66 points in the semifinal, absolutely
                dismantling Aditya's team. The Dak-Pickens stack was firing on all cylinders, and James Cook
                reminded everyone why he was a second-round pick with a dominant performance.
              </p>
            </div>

            <div className="matchup-result">
              <p><strong>Week 16 vs SahitReddi: 149.41-112.57</strong></p>
              <p>
                The semifinal victory over the 2-seed Sahit showed that this wasn't a fluke. Even facing one
                of the league's most consistent teams, Sahil's roster came through when it mattered most.
              </p>
            </div>

            <div className="matchup-result">
              <p><strong>Week 17 Championship vs pranavj20: 144.98-129.85</strong></p>
              <p>
                In the finals, Sahil faced the regular season champion Pranav and delivered once again. Three
                straight weeks of 140+ points to close out the season. That's championship pedigree.
              </p>
            </div>

            <h4>Team's MVP: Cowboy Combo</h4>
            <p>
              Dak averaged 19.32 points per game and gave Sahil the consistent QB production you need to win it all,
              while Pickens (17.88 ppg) provided weekly boom potential with a ceiling of 33.40 points. The two
              combined gave Sahil explosive boom potential every week.
            </p>

            <h3>The Toilet Bowl Champion: Abhiram's Historic Collapse</h3>

            <div className="center-image" style={{marginBottom: '20px', marginTop: '20px', textAlign: 'center'}}>
              <img
                src="/abhiram.jpg"
                alt="Toilet Bowl Champion Abhiram"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  border: '2px solid #8B4513',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(139, 69, 19, 0.3)'
                }}
              />
              <div className="draft-caption" style={{fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '10px'}}>
                From champion to toilet bowl: Abhiram's stunning fall from grace
              </div>
            </div>

            <p>
              Every league has its champion. And every league has its toilet bowl champion. This year, that dubious
              honor belongs to Abhiram (abhiu), who finished 2-12 in the regular season and winless in the consolation
              bracket. Truly shocking considering he was the champion of the entire league at this point last year.
              This really goes to show the power and strength of Amberwood Football League.
            </p>

            <h4>The Final Descent (Weeks 16-17):</h4>
            <div className="matchup-result">
              <p><strong>Week 16 vs ankithe: ✗ 130.72-138.14</strong></p>
              <p>
                Started off looking like a win, but the 49ers duo ruined abhiram's hopes of escaping the toilet
                bowl. Despite posting a respectable 130.72, Abhiram fell short.
              </p>
            </div>

            <div className="matchup-result">
              <p><strong>Week 17 vs akhilmetukuru: ✗ 76.93-85.34</strong></p>
              <p>
                The grand finale. A fitting end to a forgettable season with a brutal 76.93-point performance.
                When it mattered least, Abhiram's team cared even less.
              </p>
            </div>

            <p>
              The cruel irony? With a regular season points-per-game average of just 116.92 (second-worst in the
              league), consistency was nowhere to be found. The gap between his stars and the rest of his roster
              was the Grand Canyon. Trading away JSN was the costly move that tanked his season.
            </p>
          </div>

          <div className="team-analysis">
            <h2 className="section-headline">🏅 The Awards</h2>

            <div className="story-layout">
              <div className="story-column">
                <h3>The "Injury Ward Manager" Award (GM of the Year): Sahit</h3>
                <p>
                  Let's talk about overcoming adversity. Sahit finished 9-5 and secured the 2-seed despite his roster
                  looking like a hospital ward for most of the season. The casualties:
                </p>
                <ul>
                  <li>Tyreek Hill - The supposed WR1 who couldn't stay healthy</li>
                  <li>Tee Higgins - His third-round pick plagued by injuries</li>
                  <li>Davante Adams - end of season hamstring pull</li>
                  <li>Joe Burrow - His QB1 early season injury</li>
                  <li>Austin Ekeler, Bucky Irving, Zach Ertz - The injury report was longer than a CVS receipt</li>
                </ul>
                <p>
                  Yet Sahit adapted, finding production from waiver heroes and late-round gems. When your fourth-round
                  QB gives you nothing and half your drafted starters are questionable every week, finishing 3rd place
                  is GM wizardry. Bijan Robinson (22.20 ppg) and the late-season explosions kept the ship afloat. This
                  is the kind of season that separates the pretenders from the managers who actually know what they're doing.
                </p>

                <h4>The "He's Just Built Different" Award (League MVP): Ankith's Christian McCaffrey</h4>
                <p>
                  Some picks are safe. Some picks are boring. Christian McCaffrey is neither. Ankith took CMC with the
                  7th overall pick and was rewarded with the league's best player—25.18 points per game of pure,
                  unadulterated dominance. His 39.10-point ceiling won weeks single-handedly.
                </p>
                <p>
                  In a season full of running back busts and injury concerns, McCaffrey reminded everyone why he's worth
                  the first-round investment. He was the fulcrum of Ankith's 7-7 team that finished 3rd in the consolation
                  bracket. Without him? Ankith might've been competing with Abhiram for last place.
                </p>

                <h4>The "Pancake Stack" Award (Stack of the Year): Sahil's Dak + George Pickens</h4>
                <p>
                  You know that feeling when you're watching Thursday Night Football and your QB-WR stack goes absolutely
                  bananas? That's what Sahil experienced week after week with Dak Prescott and George Pickens.
                </p>
                <p>
                  <strong>Dak:</strong> 19.32 ppg with a 30.96-point explosion<br/>
                  <strong>Pickens:</strong> 17.88 ppg with a 33.40-point ceiling
                </p>
                <p>
                  The math is simple: When both hit, you're looking at 60+ points from two roster spots. That's
                  league-winning production. The stack that helped deliver a championship wasn't Burrow-Chase. It was
                  an eighth-round QB and a fifth-round WR who became a weekly cheat code. Stack game on another level.
                </p>

                <h4>The "Steal of the Draft" Award (Keeper of the Year): Pranav's Puka Nacua</h4>
                <p>
                  Pranav's sharp addition off the 2023 waiver wire, Puka Nacua finished the season averaging 23.27
                  points per game—the best WR in the league this season.
                </p>
                <p>
                  Nacua's 46.50-point nuclear game was the kind of weekly ceiling that turned losses into wins. Finding
                  this kind of production in round nine? That's the difference between a playoff team and a championship
                  team. Pranav may not have won it all, but he will be able to keep the cornerstone WR1 in 2026 for the
                  last time.
                </p>

                <h4>The "From the Scrap Heap to Glory" Award (Waiver Wire Addition of the Year): Abhishek's Michael Wilson</h4>
                <p>
                  Abhishek went dumpster diving and found treasure. Michael Wilson, a name most fantasy managers ignored,
                  became one of the league's most consistent late-season weapons, averaging 21.23 points per game overall.
                  His weekly production down the stretch told the story of a league-winner:
                </p>
                <p>33 pts → 21 pts → 6 pts (okay, one dud) → 37 pts → 16 pts → 13 pts → 19 pts → 20 pts</p>
                <p>
                  That's eight straight weeks of relevance with multiple 30+ point bombs. Abhishek's 9-5 record finish
                  owes a huge debt to his ability to mine the waiver wire for gold while other teams stuck with their
                  underperforming draft picks.
                </p>
              </div>
            </div>
          </div>

          <div className="team-analysis">
            <h2 className="section-headline">Season Superlatives</h2>

            <div className="story-layout">
              <div className="story-column">
                <h3>💪 Comeback Team of the Year: Roshik's Late-Season Surge</h3>
                <p>
                  Roshik entered Week 15 with a 7-7 record—middle of the pack, nothing special. Then he unleashed the
                  secret weapon: Chase Brown.
                </p>
                <p>
                  The addition of Brown transformed Roshik's team from mediocre to dominant. Brown averaged 20.52 points
                  per game down the stretch and gave Roshik the RB1 production he was missing all season. The result?
                  Roshik finished as the hottest team in the league, winning the consolation bracket and securing the
                  #1 overall pick in the 2026 draft.
                </p>
                <ul>
                  <li><strong>Week 15:</strong> 131.42 points (defeated ankithe)</li>
                  <li><strong>Week 16:</strong> 182.58 points (destroyed audumula)</li>
                </ul>
                <p>
                  That Week 16 performance—182.58 points—was the stuff of legend. Roshik's team peaked at exactly the
                  right time, and with the first pick next year, they're set up to return as a championship contender.
                  Sometimes you don't need to win it all to win the future.
                </p>

                <h3>🎲 The "Lucky Bastard" Award (Mickey of the Year): Aditya</h3>
                <p>
                  Let's talk about Aditya (kulkdaddy47). This man finished 9-5, made the playoffs as the 4-seed, and
                  scored exactly 1,742 points on the season. Sounds respectable, right?
                </p>
                <p>
                  Wrong.
                </p>
                <p>
                  Aditya was the luckiest man alive in 2025. His team scored 1,742 points—8th out of 12 teams in total
                  scoring—but somehow finished with a winning record. How? By playing every opponent on their worst week
                  and avoiding the league's best teams during their hot streaks.
                </p>
                <p>
                  Then came the homestretch of the season, where the luck ran out and reality set in:
                </p>
                <ul>
                  <li><strong>Week 14:</strong> 79.30 points (lost to abhishekD)</li>
                  <li><strong>Week 15:</strong> 87.51 points (lost to swahili28)</li>
                  <li><strong>Week 16:</strong> 68.60 points (lost to abhishekD)</li>
                </ul>
                <p>
                  Three straight weeks of sub-90 performances. That's not just cold—that's Ice Age cold.
                </p>
                <p>
                  Meanwhile, teams like Anudeep and Ankith sat at home despite being statistically superior. Aditya's
                  playoff spot was gifted by the schedule, and the fantasy football gods collected their debt in brutal
                  fashion during the playoffs. Justice was served.
                </p>
              </div>

              <div className="story-column">
                <h3>📊 Positional Dominance: Who Ruled Each Position?</h3>

                <h4>Quarterback Beast:</h4>
                <p>
                  <strong>Anudeep (audumula)</strong> - Josh Allen (22.04 ppg) the fantasy football king led Anudeep
                  to dominate the QB position once again. The early round draft capital used on Josh Allen has been one
                  of the best investments you can make in fantasy for the past couple years now.
                </p>

                <h4>Running Back Leaders:</h4>
                <p>
                  <strong>Ankith (ankithe)</strong> - Christian McCaffrey (25.18 ppg) was the league's best RB by a mile
                  and paired with the steady ship of Jaylen Warren (13.57 ppg), the team was consistently putting up 40+
                  points at the RB position per week.
                </p>

                <h4>Wide Receiver Guru:</h4>
                <p>
                  <strong>Pranav Jain (pranavj20)</strong> - Puka Nacua (23.27 ppg) and Jaxson Smith-Njigba (21.17 ppg)
                  ended the season as the WR1 and WR2 on the season. It is almost unheard of to have the top 2 players
                  in any position group let alone WR. A truly magical year for the WR Guru.
                </p>

                <h4>Flex God:</h4>
                <p>
                  <strong>Sahit (SahitReddi)</strong> - Parker Washington, Alec Pierce, Khalil Shakir, Darious Slayton
                  are all players that found themselves scoring 20+ points in Sahit's flex. Majority of the players Sahit
                  started in flex weren't even drafted, but by mastering matchups he was able to maximize the position
                  with hidden value.
                </p>

                <h4>Tight End Whisperer:</h4>
                <p>
                  <strong>Pranav P (pranav4789)</strong> - Pranav masterfully navigated the TE landscape, starting the
                  season with Tyler Warren and Jake Ferguson at their peaks. As they tapered off, he was able to sub in
                  Kittle coming off his early season injury.
                </p>
              </div>
            </div>
          </div>

          <div className="final-assessment">
            <h2 className="section-headline">🎬 Final Thoughts</h2>
            <p className="assessment-text">
              The 2025 Amberwood Football League season had it all: a dominant champion in Sahil, the heartbreak of
              close losses, the agony of injuries, and the pure chaos of waiver wire heroes rising from obscurity to
              change playoff races.
            </p>
            <p className="assessment-text">
              Congrats to Sahil for hoisting the trophy. Condolences to Abhiram for earning the toilet bowl crown.
              And to everyone in between—there's always next year.
            </p>
            <p className="assessment-text">
              Same time, same place in 2026. Let's run it back. 🏈
            </p>
          </div>

          <div className="newspaper-footer">
            <div className="footer-line"></div>
            <div className="newspaper-tagline">
              "Your Source for Fantasy Football Excellence Since 2018"
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default FinaleNewsletter;
