import React from 'react';

const Week12Newsletter: React.FC = () => {
  return (
    <div className="newsletter-archive">
      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .thanksgiving-banner-title {
            font-size: 20px !important;
          }
          .thanksgiving-banner-subtitle {
            font-size: 14px !important;
          }
          .thanksgiving-banner-emoji {
            font-size: 24px !important;
          }
          .newspaper-meta span {
            font-size: 12px !important;
            padding: 3px 8px !important;
            display: inline-block;
            margin: 2px !important;
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
      {/* Thanksgiving Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #c1502e 100%)',
        padding: '20px',
        textAlign: 'center',
        borderBottom: '3px solid #8B4513',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div className="thanksgiving-banner-emoji" style={{fontSize: '36px', marginBottom: '10px'}}>
          🦃 🍂 🥧 🌽 🍁
        </div>
        <h2 className="thanksgiving-banner-title" style={{
          color: '#fff',
          fontSize: '28px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          margin: '10px 0'
        }}>
          HAPPY THANKSGIVING FROM AMBERWOOD FOOTBALL LEAGUE!
        </h2>
        <p className="thanksgiving-banner-subtitle" style={{
          color: '#fff',
          fontSize: '16px',
          fontStyle: 'italic',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          Grateful for fantasy football, fierce competition, and this amazing league 🦃
        </p>
        <div className="thanksgiving-banner-emoji" style={{fontSize: '36px', marginTop: '10px'}}>
          🍁 🌽 🥧 🍂 🦃
        </div>
      </div>

      <div className="newspaper-container" style={{
        background: 'linear-gradient(to bottom, #FFF8E7 0%, #FFEFD5 100%)',
        borderLeft: '4px solid #D2691E',
        borderRight: '4px solid #D2691E'
      }}>
        <div className="newspaper-header">
          <div className="newspaper-masthead" style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
          }}>
            <div style={{fontSize: '24px', marginBottom: '10px'}}>🦃</div>
            <h1 className="newspaper-title" style={{color: '#FFF8E7'}}>AMBERWOOD FANTASY TIMES</h1>
            <div className="newspaper-subtitle" style={{color: '#FFE4B5'}}>The Premier Source for Fantasy Football News & Analysis</div>
            <div className="newspaper-meta">
              <span className="edition" style={{
                color: '#FF6B35',
                backgroundColor: '#FFF8E7',
                padding: '4px 12px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>🍂 Week 12 Thanksgiving Edition 🍂</span>
              <span className="date" style={{
                color: '#8B4513',
                backgroundColor: '#FFE4B5',
                padding: '4px 12px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>November 2025</span>
              <span className="price" style={{
                color: '#FF6B35',
                backgroundColor: '#FFD700',
                padding: '4px 12px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>FREE</span>
            </div>
            <div style={{fontSize: '24px', marginTop: '10px'}}>🦃</div>
          </div>
        </div>

        <div className="newspaper-content">
          <div className="main-story">
            <div style={{
              background: 'linear-gradient(to right, #ff6b35, #f7931e)',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: '2px solid #8B4513'
            }}>
              <h2 className="headline section-headline" style={{color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', margin: 0}}>
                🦃 Week 12: Playoff Chaos as kulkdaddy47 Dominates 🦃
              </h2>
            </div>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
              <div className="byline" style={{
                background: '#FFE4B5',
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #D2691E',
                display: 'inline-block',
                fontSize: '14px'
              }}>
                By the Office of the Commissioner | Happy Thanksgiving! 🍁
              </div>
            </div>

            <div className="center-image" style={{marginBottom: '30px', textAlign: 'center', width: '100%'}}>
              <div style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'inline-block', maxWidth: '700px', width: '100%'}}>
                <div style={{
                  width: '100%',
                  maxWidth: '680px',
                  overflow: 'hidden',
                  border: '2px solid #333',
                  borderRadius: '4px',
                  position: 'relative'
                }}>
                  <img
                    src="/IMG_3889.WEBP"
                    alt="Week 12 Cover"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
                <div className="draft-caption" style={{fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '10px'}}>
                  The usual suspects are at the winners table - can anyone spoil the party?
                </div>
              </div>
            </div>

            <div className="story-layout">
              <div className="story-column">
                <h3 style={{
                  fontSize: '20px',
                  textDecoration: 'underline',
                  background: 'linear-gradient(to right, #ff6b35, #f7931e)',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '6px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>🦃 📊 Week 12 Matchup Recaps 📊 🦃</h3>

                <div className="matchup-result">
                  <h4>🔥 KULKDADDY47 DOMINATES IN PLAYOFF-DEFINING SHOWDOWN</h4>
                  <p><strong>kulkdaddy47 (149.18) def. audumula (96.42)</strong></p>
                  <p><strong>Winner Analysis:</strong> Kulkdaddy47 put up a season-defining 149.18 points—the largest margin of victory this week at 52.76 points—to move to 8-4 and solidify their top-3 standing. This explosive performance came at the perfect time, showing their roster is peaking as the playoff race intensifies.</p>
                  <p><strong>Loser Analysis:</strong> Audumula's disappointing 96.42-point output drops them to 7-5 in a brutal four-way tie for spots 4-7. With tough matchups against abhishekD and pranav4789 remaining, this loss could prove devastating to their playoff hopes despite holding a winning record.</p>
                </div>

                <div className="matchup-result">
                  <h4>💪 PRANAVJ20 STAYS HOT, EXTENDS WINNING STREAK</h4>
                  <p><strong>pranavj20 (147.97) def. SahitReddi (134.41)</strong></p>
                  <p><strong>Winner Analysis:</strong> Pranavj20 posted 147.97 points to push their season total to a league-high 1,632 and improve to 8-4. They had to outlast a strong 134.41-point effort from SahitReddi, demonstrating the consistency that makes them a playoff frontrunner.</p>
                  <p><strong>Loser Analysis:</strong> SahitReddi's 134.41 points would have won half the matchups this week, but wasn't enough against the league's top scorer. At 7-5 in the crowded middle pack with matchups against ankithe and abhiu remaining, they'll need wins—not just respectable scores—to secure their playoff spot.</p>
                </div>

                <div className="matchup-result">
                  <h4>🎯 ANKITHE ERUPTS FOR 149 IN MUST-WIN SITUATION</h4>
                  <p><strong>ankithe (149.06) def. abhiu (119.43)</strong></p>
                  <p><strong>Winner Analysis:</strong> Ankithe delivered a week-high 149.06 points to convincingly beat abhiu and move to 7-5 with 1,653 total points. This offensive explosion at crunch time shows they have the ceiling to compete with anyone when their roster clicks.</p>
                  <p><strong>Loser Analysis:</strong> Abhiu falls to 2-10 with another loss despite a respectable 119.43 points. While playoffs are long gone, they still face pranavj20 and SahitReddi and could play spoiler for teams fighting for playoff positioning.</p>
                </div>

                <div className="matchup-result">
                  <h4>🚀 SWAHILI28 EDGES TAAHAKM IN CRUCIAL PLAYOFF CLASH</h4>
                  <p><strong>swahili28 (142.86) def. taahakm (137.77)</strong></p>
                  <p><strong>Winner Analysis:</strong> Swahili28 survived a scare with a narrow 5.09-point victory to improve to 7-5. With a league-leading 1,690 total points among non-8-win teams, they've built the strongest wild card case if they can't secure a top-5 finish.</p>
                  <p><strong>Loser Analysis:</strong> Taahakm's 137.77 points deserved better, but at 4-8 their playoff hopes are eliminated. They've improved recently and could play spoiler, but early-season struggles with only 1,424 total points proved too much to overcome.</p>
                </div>

                <div className="matchup-result">
                  <h4>⚔️ ABHISHEKD SURVIVES NAIL-BITER AGAINST PRANAV4789</h4>
                  <p><strong>abhishekD (142.81) def. pranav4789 (141.76)</strong></p>
                  <p><strong>Winner Analysis:</strong> AbhishekD escaped with a heart-stopping 1.05-point victory—the closest margin of the week—to stay at 8-4. Outlasting pranav4789, the league's highest scorer with 1,735 points, in a shootout demonstrates they have the firepower to hang with anyone.</p>
                  <p><strong>Loser Analysis:</strong> Pranav4789 dropped 141.76 points and lost by just over a point in a devastating defeat. At 6-6 as the league's highest scorer sitting outside the top 5, they're the poster child for bad luck and need to win out to have any realistic playoff shot.</p>
                </div>

                <div className="matchup-result">
                  <h4>🎲 ROSHIK REBOUNDS WITH COMMANDING VICTORY</h4>
                  <p><strong>roshik (128.17) def. akhilmetukuru (100.31)</strong></p>
                  <p><strong>Winner Analysis:</strong> Roshik snapped their losing skid with a 27.86-point victory to move to 5-7. While playoff hopes are slim with 1,539 total points, they could still impact the playoff race as a spoiler with games against taahakm and swahili28 remaining.</p>
                  <p><strong>Loser Analysis:</strong> Akhilmetukuru drops to 3-9 with a disappointing 100.31-point output and just 1,374 total points on the season. Playoffs are out of reach, but the final two weeks offer a chance to derail someone else's playoff dreams and build momentum for next season.</p>
                </div>
              </div>

              <div className="story-column">
                <h3 style={{
                  fontSize: '20px',
                  textDecoration: 'underline',
                  background: 'linear-gradient(to right, #ff6b35, #f7931e)',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '6px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>🍂 📈 Week 12 Statistical Leaders 📈 🍂</h3>
                <ul>
                  <li><strong>Highest Scorer:</strong> ankithe (149.06 pts) - Week-high explosion!</li>
                  <li><strong>Highest Victory Margin:</strong> kulkdaddy47 def. audumula by 52.76 pts</li>
                  <li><strong>Lowest Scorer:</strong> audumula (96.42 pts)</li>
                  <li><strong>Closest Game:</strong> abhishekD def. pranav4789 by 1.05 pts</li>
                  <li><strong>Total Points Leader:</strong> pranav4789 (1,735 PF)</li>
                </ul>

                <h3 style={{
                  fontSize: '20px',
                  textDecoration: 'underline',
                  background: 'linear-gradient(to right, #ff6b35, #f7931e)',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '6px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>🥧 🎯 Week 12 Key Takeaways 🎯 🥧</h3>
                <ul>
                  <li><strong>Top 3 Locked In:</strong> pranavj20, abhishekD, kulkdaddy47 all at 8-4</li>
                  <li><strong>Four-Way Logjam at 7-5:</strong> swahili28, ankithe, audumula, SahitReddi</li>
                  <li><strong>Points Paradox:</strong> Top scorers not in top 3 by record</li>
                  <li><strong>Wild Card King:</strong> pranav4789 leads league with 1,735 PF despite 6-6</li>
                  <li><strong>Playoff Math:</strong> 9 wins = safe, 8 wins = danger zone</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="team-analysis">
            <h2 className="section-headline" style={{
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #c1502e 100%)',
              color: '#fff',
              padding: '15px',
              borderRadius: '8px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              border: '3px solid #8B4513'
            }}>🦃 🔥 Week 12 Playoff Picture Impact 🔥 🦃</h2>

            <div className="matchup-result">
              <h4>THE MOST CONSEQUENTIAL MATCHUP: kulkdaddy47 vs audumula</h4>
              <p>While several games had playoff implications, the kulkdaddy47 vs audumula clash stands out as the week's most significant result. Kulkdaddy47's dominant 149.18-point performance moved them to 8-4 and solidified their position in the top 3 alongside pranavj20 and abhishekD. More importantly, audumula's loss dropped them into a nightmarish four-way logjam at 7-5 with swahili28, ankithe, and SahitReddi—all fighting for the final two automatic playoff spots and the wild card position.</p>
            </div>

            <div className="matchup-result" style={{marginTop: '20px'}}>
              <h4>THE UNPRECEDENTED SITUATION: Top 3 Teams Are NOT the Top Scorers</h4>
              <p>This year's playoff race has a bizarre twist that makes everything unpredictable: the top 3 teams by record (all 8-4) are being outscored by nearly everyone below them. Here's the shocking reality:</p>

              <p><strong>Top 3 by Record (8-4):</strong></p>
              <ul>
                <li>pranavj20: 1,632 PF</li>
                <li>abhishekD: 1,596 PF</li>
                <li>kulkdaddy47: 1,549 PF</li>
              </ul>

              <p><strong>Teams Ranked 4-8:</strong></p>
              <ul>
                <li>swahili28 (7-5): 1,690 PF</li>
                <li>pranav4789 (6-6): 1,735 PF ⚡ LEAGUE LEADER</li>
                <li>ankithe (7-5): 1,653 PF</li>
                <li>audumula (7-5): 1,636 PF</li>
                <li>SahitReddi (7-5): 1,620 PF</li>
              </ul>

              <p>Pranav4789 leads the ENTIRE league in scoring despite sitting at 6-6, while swahili28's 1,690 points would typically be playoff-lock territory. This creates a dangerous situation: 8 wins might not be enough if multiple teams finish 8-6—the top-3 squads could lose the points tiebreaker for the non-wildcard spots.</p>

              <p><strong>Critical Playoff Math Moving Forward:</strong></p>
              <ul>
                <li>9 wins = playoff guarantee - Get to 9-6 and you're in, no questions asked</li>
                <li>8 wins = danger zone - Could miss playoffs on points tiebreaker to higher-scoring 8-6 teams</li>
                <li>Wild card is king - With the 6th spot going to highest points outside top-5, having elite scoring is crucial</li>
              </ul>

              <p>The safest teams right now: pranavj20 (faces easy 2-10 abhiu next for 9 wins) and pranav4789 (massive 1,735 PF lead for wild card despite 6-6 record).</p>
            </div>

            <h2 className="section-headline" style={{
              marginTop: '30px',
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #c1502e 100%)',
              color: '#fff',
              padding: '15px',
              borderRadius: '8px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              border: '3px solid #8B4513'
            }}>🍁 🎯 Fantasy Playoff Picture Preview 🎯 🍁</h2>
            <div className="power-rankings-section">
              <h3>Two weeks remain. Six teams fighting for three spots.</h3>

              <div className="teams-grid">
                <div className="team-card">
                  <h4>SAFE ZONE - 1. PRANAVJ20 (8-4, 1,632 PF) - 99% PLAYOFF CHANCE</h4>
                  <p><strong>Week 13:</strong> vs abhiu | <strong>Week 14:</strong> vs ankithe</p>
                  <p><strong>Analysis:</strong> Pranavj20 has the clearest path to the playoffs with a Week 13 matchup against 2-10 abhiu. Win that game to reach 9-5, and they're guaranteed a playoff spot regardless of what happens in Week 14. Even in a nightmare scenario where they lose both games to finish 8-6, their playoff odds remain strong—though not guaranteed given the points situation.</p>
                  <p><strong>Keys to Watch:</strong> Beat abhiu in Week 13 to clinch. Don't overlook the easiest matchup remaining in the league.</p>
                </div>

                <div className="team-card">
                  <h4>SAFE ZONE - 2. ABHISHEKD (8-4, 1,596 PF) - 85% PLAYOFF CHANCE</h4>
                  <p><strong>Week 13:</strong> vs audumula | <strong>Week 14:</strong> vs kulkdaddy47</p>
                  <p><strong>Analysis:</strong> AbhishekD faces brutal back-to-back games against playoff contenders, but one win clinches a playoff berth at 9-5. The Week 13 matchup against desperate 7-5 audumula is critical—win that and they're in even with a Week 14 loss. However, losing both games to finish 8-6 with only 1,596 points (lowest among 8-4 teams) creates serious danger.</p>
                  <p><strong>Keys to Watch:</strong> The audumula game is everything. Win it and relax. Lose both and you're in serious trouble with the points tiebreaker.</p>
                </div>

                <div className="team-card">
                  <h4>SAFE ZONE - 3. KULKDADDY47 (8-4, 1,549 PF) - 80% PLAYOFF CHANCE</h4>
                  <p><strong>Week 13:</strong> vs pranav4789 | <strong>Week 14:</strong> vs abhishekD</p>
                  <p><strong>Analysis:</strong> Kulkdaddy47 drew a tough remaining schedule—facing the league's highest scorer pranav4789 (1,735 PF) followed by abhishekD. With the lowest points total among 8-4 teams at 1,549, losing both games to finish 8-6 would be catastrophic for wild card hopes. One win gets them to 9-5 and safely in.</p>
                  <p><strong>Keys to Watch:</strong> Must steal one of these two games. An 8-6 finish with 1,549 points likely loses the wild card to teams like swahili28 or pranav4789.</p>
                </div>

                <div className="team-card">
                  <h4>DANGER ZONE - 4. SWAHILI28 (7-5, 1,690 PF) - 85% PLAYOFF CHANCE</h4>
                  <p><strong>Week 13:</strong> vs akhilmetukuru | <strong>Week 14:</strong> vs roshik</p>
                  <p><strong>Analysis:</strong> Swahili28 is the wild card leader among 7-5 teams with 1,690 points. They have the most favorable remaining schedule—facing 3-9 akhilmetukuru and 5-7 roshik—meaning two wins to reach 9-5 is entirely realistic. Win both games and you're in the top 5. Win one game to go 8-6, and you're probably grabbing the 6th wild card spot.</p>
                  <p><strong>Keys to Watch:</strong> Cannot overlook akhilmetukuru—any loss to a 3-9 team would be devastating. Take care of business and you're playoff-bound.</p>
                </div>

                <div className="team-card">
                  <h4>DANGER ZONE - 5. ANKITHE (7-5, 1,653 PF) - 60% PLAYOFF CHANCE</h4>
                  <p><strong>Week 13:</strong> vs SahitReddi | <strong>Week 14:</strong> vs pranavj20</p>
                  <p><strong>Analysis:</strong> Week 13 against SahitReddi is a four-point swing game—both teams at 7-5, fighting for the same spot. Win that, and ankithe is in great shape even with a likely Week 14 loss to pranavj20. At 8-6 with 1,653 points, they'd be playoff-bound. The nightmare scenario? Losing to SahitReddi creates a must-win in Week 14.</p>
                  <p><strong>Keys to Watch:</strong> The SahitReddi matchup is a playoff play-in game. Treat it as such. Everything else becomes easier with that win.</p>
                </div>

                <div className="team-card">
                  <h4>DANGER ZONE - 6. SAHITREDDI (7-5, 1,620 PF) - 60% PLAYOFF CHANCE</h4>
                  <p><strong>Week 13:</strong> vs ankithe | <strong>Week 14:</strong> vs abhiu</p>
                  <p><strong>Analysis:</strong> SahitReddi's playoff fate likely comes down to one game: Week 13 vs ankithe. Win that head-to-head matchup, and they control their destiny with an easy Week 14 game against 2-10 abhiu. That would put them at 9-5 and safely in the playoffs. The concern? 1,620 points is the lowest among the four 7-5 teams, meaning wild card tiebreakers don't favor them.</p>
                  <p><strong>Keys to Watch:</strong> Steal one from ankithe in Week 13, and you're controlling your own destiny. Lose, and you're hoping for chaos to break your way.</p>
                </div>

                <div className="team-card">
                  <h4>DANGER ZONE - 7. AUDUMULA (7-5, 1,636 PF) - 55% PLAYOFF CHANCE</h4>
                  <p><strong>Week 13:</strong> vs abhishekD | <strong>Week 14:</strong> vs pranav4789</p>
                  <p><strong>Analysis:</strong> Audumula drew the absolute worst schedule among the 7-5 teams. Facing 8-4 abhishekD in Week 13 and the league's highest-scoring team pranav4789 (who's desperate at 6-6) in Week 14 is a brutal way to end the regular season. At 8-6 with 1,636 points, they should make the wild card. At 7-7, they're on the outside looking in.</p>
                  <p><strong>Keys to Watch:</strong> Win one of these two, and you're likely in. Lose both, and start planning for next season.</p>
                </div>

                <div className="team-card">
                  <h4>SLEEPING GIANT - 8. PRANAV4789 (6-6, 1,735 PF) - 85% PLAYOFF CHANCE</h4>
                  <p><strong>Week 13:</strong> vs kulkdaddy47 | <strong>Week 14:</strong> vs audumula</p>
                  <p><strong>Analysis:</strong> Pranav4789 is the league's most fascinating case—leading the entire league in scoring with 1,735 points but sitting at 6-6. With a 100+ point lead over the next-closest wild card contender, they control their own destiny even at 6-6. Winning both games likely guarantees a spot in the top 5, but even if not, they are the biggest favorites for the wildcard spot.</p>
                  <p><strong>Keys to Watch:</strong> Maintaining their current scoring trend guarantees the playoffs regardless of result. Their scoring dominance is the ultimate insurance policy—no one can catch them in points.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="season-outlook">
            <h2 className="section-headline" style={{
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #c1502e 100%)',
              color: '#fff',
              padding: '15px',
              borderRadius: '8px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              border: '3px solid #8B4513'
            }}>🌽 🔮 Week 13 Matchup Previews & Predictions 🔮 🌽</h2>
            <div className="award-section">

              <div className="matchup-preview">
                <h4>MATCHUP 1: audumula vs abhishekD - GAME OF THE WEEK</h4>
                <p><strong>Playoff Implications:</strong> MASSIVE</p>
                <p><strong>Prediction:</strong> abhishekD 128, audumula 118</p>
                <p><strong>Betting Odds:</strong> abhishekD -145, audumula +125</p>
                <p><strong>Analysis:</strong> Both teams are playoff-bound with a win, but a loss creates serious drama. AbhishekD (8-4) can clinch a playoff spot with a victory, while audumula (7-5) desperately needs this win to avoid a must-win Week 14 against pranav4789. After audumula's disappointing 96.42-point showing in Week 12, they need to bounce back in a major way. The momentum is with abhishekD after surviving last week's nail-biter.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 2: ankithe vs SahitReddi - THE ELIMINATION GAME</h4>
                <p><strong>Playoff Implications:</strong> CRITICAL</p>
                <p><strong>Prediction:</strong> ankithe 136, SahitReddi 131</p>
                <p><strong>Betting Odds:</strong> ankithe -120, SahitReddi +100</p>
                <p><strong>Analysis:</strong> The ultimate four-point swing game. Both teams are 7-5, both are fighting for their playoff lives, and the winner dramatically improves their odds while the loser faces potential elimination. Ankithe is coming off a massive 149.06-point explosion, while SahitReddi put up a solid 134.41 points in defeat. This should be the highest-scoring matchup of the week. Too close to call with any real confidence—expect a shootout.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 3: kulkdaddy47 vs pranav4789 - PICK 'EM BATTLE</h4>
                <p><strong>Playoff Implications:</strong> ELIMINATION GAME FOR PRANAV4789</p>
                <p><strong>Prediction:</strong> kulkdaddy47 132, pranav4789 129</p>
                <p><strong>Betting Odds:</strong> PICK 'EM (kulkdaddy47 -110, pranav4789 -110)</p>
                <p><strong>Analysis:</strong> Kulkdaddy47 (8-4) can clinch a playoff berth with a win, while pranav4789 (6-6) faces a must-win situation despite leading the league with 1,735 points. Kulkdaddy47's Week 12 explosion (149.18 points) showed they're peaking at the right time, but pranav4789's desperation makes them dangerous. Complete toss-up between the league's best offense and the team with the clutch gene.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 4: swahili28 vs akhilmetukuru - DON'T SLIP UP</h4>
                <p><strong>Playoff Implications:</strong> STATEMENT GAME</p>
                <p><strong>Prediction:</strong> swahili28 125, akhilmetukuru 98</p>
                <p><strong>Betting Odds:</strong> swahili28 -300, akhilmetukuru +240</p>
                <p><strong>Analysis:</strong> Swahili28 (7-5) should absolutely handle 3-9 akhilmetukuru as the current wild card points leader with 1,690 PF. This is swahili28's game to lose. Anything less than a comfortable win here would be a massive red flag for their playoff readiness.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 5: abhiu vs pranavj20 - TRAP GAME ALERT</h4>
                <p><strong>Playoff Implications:</strong> CLINCH OPPORTUNITY</p>
                <p><strong>Prediction:</strong> pranavj20 135, abhiu 110</p>
                <p><strong>Betting Odds:</strong> pranavj20 -400, abhiu +300</p>
                <p><strong>Analysis:</strong> On paper, this is pranavj20 (8-4, league-leading 1,632 PF) demolishing 2-10 abhiu. Pranavj20 is essentially playoff-bound and might overlook abhiu, who's playing with nothing to lose. A pranavj20 loss here would create absolute chaos. Don't overlook your opponent.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 6: roshik vs taahakm - SPOILER ALERT</h4>
                <p><strong>Playoff Implications:</strong> NONE</p>
                <p><strong>Prediction:</strong> roshik 114, taahakm 107</p>
                <p><strong>Betting Odds:</strong> roshik -135, taahakm +115</p>
                <p><strong>Analysis:</strong> Two teams mathematically eliminated from playoff contention square off. Roshik (5-7) is coming off a win, while taahakm (4-8) has lost eight games despite some decent recent performances. The only intrigue here is whether either team plays spoiler in Week 14. Expect a relatively low-scoring affair.</p>
              </div>
            </div>

            <div className="matchup-result" style={{
              marginTop: '30px',
              borderTop: '3px solid #D2691E',
              paddingTop: '20px',
              background: 'linear-gradient(to bottom, #FFF8E7, #FFE4B5)',
              padding: '20px',
              borderRadius: '8px',
              border: '2px solid #8B4513'
            }}>
              <h3 style={{
                background: 'linear-gradient(to right, #ff6b35, #f7931e)',
                color: '#fff',
                padding: '12px',
                borderRadius: '6px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}>🦃 🏁 PLAYOFF RACE SUMMARY 🏁 🦃</h3>
              <p><strong>SAFEST TEAMS:</strong></p>
              <ul>
                <li>pranavj20 (99%) - Easy Week 13 vs abhiu to clinch at 9 wins</li>
                <li>pranav4789 (85%) - Massive 1,735 PF lead locks up wild card</li>
              </ul>
              <p><strong>LIKELY IN (80-85%):</strong></p>
              <ul>
                <li>kulkdaddy47, abhishekD, swahili28 - Need just 1 win each</li>
              </ul>
              <p><strong>DANGER ZONE (55-60%):</strong></p>
              <ul>
                <li>ankithe, SahitReddi, audumula - Tough schedules, must win now</li>
              </ul>
              <p><strong>The New Reality:</strong> 9 wins = guaranteed playoff spot. 8 wins = potential disaster if you lose the points tiebreaker. The wild card has never mattered more.</p>
              <p><strong>Stay tuned for Week 13 results and our final playoff picture update next week!</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week12Newsletter;
