import React from 'react';

const Week7Newsletter: React.FC = () => {
  return (
    <div className="newsletter-archive">
      <div className="newspaper-container">
        <div className="newspaper-header">
          <div className="newspaper-masthead">
            <h1 className="newspaper-title">AMBERWOOD FANTASY TIMES</h1>
            <div className="newspaper-subtitle">The Premier Source for Fantasy Football News & Analysis</div>
            <div className="newspaper-meta">
              <span className="edition">Week 7 Edition</span>
              <span className="date">October 2025</span>
              <span className="price">FREE</span>
            </div>
          </div>
        </div>

        <div className="newspaper-content">
          <div className="main-story">
            <h2 className="headline">Week 7: CMC Goes Nuclear & The Playoff Race Intensifies</h2>
            <div className="byline">By the Office of the Commissioner</div>

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
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      marginBottom: '-50px'
                    }}
                  >
                    <source src="/1761163917658-1a074722-ab78-4626-bc92-2d653bd05e63-2695.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="draft-caption" style={{fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '10px'}}>
                  Week 7 Highlights: CMC's historic performance shakes up the playoff race
                </div>
              </div>
            </div>

            <div className="story-layout">
              <div className="story-column">
                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>📊 Week 7 Matchup Recap</h3>

                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>🔥 Statement Performances</h3>

                <div className="matchup-result">
                  <h4>"CMC GOES NUCLEAR: Ankithe Demolishes Pranav P with Historic Performance" ankithe (186.14) def. pranav4789 (113.73)</h4>
                  <p><strong>Winner Analysis:</strong> In the performance of the season, ankithe exploded for 186 points powered by Christian McCaffrey's absolutely ridiculous 39.10-point masterpiece. This wasn't just a win - this was a statement that ankithe is back and dangerous. The 186 total is the highest score of the entire season, and CMC's 39 points represents one of the best single-player performance all year. Moving to 4-3 keeps playoff hopes very much alive.</p>
                  <p><strong>Loser Analysis:</strong> pranav4789's 113 points is their worst performance in weeks, coming at the absolute worst time. Dropping to 3-4 puts them squarely on the playoff bubble despite having the 3rd-highest points for (995) in the league. This is the kind of loss that could haunt them when tiebreakers matter.</p>
                </div>

                <div className="matchup-result">
                  <h4>"SAHIT'S SURGE CONTINUES: Five Straight Wins and Rolling" SahitReddi (161.07) def. swahili28 (136.46)</h4>
                  <p><strong>Winner Analysis:</strong> SahitReddi's 161-point performance extends their winning streak to FIVE games (170 → 146 → 135 → 161 → 161). From 0-2 to 5-2, this is the hottest team in the league and they're peaking at the perfect time. At 5-2 with 969 points for (2nd in league), they're a legitimate championship threat.</p>
                  <p><strong>Loser Analysis:</strong> swahili28's 136 points is respectable but not enough against red-hot SahitReddi. Dropping to 4-3 keeps them in playoff position but the loss to a direct competitor hurts. Ja'Marr Chase and the massive performance couldn't save them.</p>
                </div>

                <div className="matchup-result">
                  <h4>"ADITYA SURVIVES SCARE: Escapes Roshik with Narrow Victory" kulkdaddy47 (152.74) def. roshik (123.83)</h4>
                  <p><strong>Winner Analysis:</strong> kulkdaddy47's 152 points bounce back nicely from last week's disaster. Patrick Mahomes and the core delivered when needed, moving them to 4-3 and keeping playoff hopes alive. This is the kind of win that matters in a tight race.</p>
                  <p><strong>Loser Analysis:</strong> roshik's 123 points keeps them in striking distance but dropping to 2-5 makes playoffs nearly impossible. They're running out of time and need to win basically every remaining game to have a shot.</p>
                </div>

                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>⚔️ Shocking Upsets</h3>

                <div className="matchup-result">
                  <h4>"ABHIRAM'S MIRACLE: First Win Comes Against Abhishek!" abhiu (151.86) def. abhishekD (101.04)</h4>
                  <p><strong>Winner Analysis:</strong> After six straight losses and an 0-6 start, abhiu FINALLY gets their first win with a season-high 151 points! The roster showed signs of life at the perfect time, beating a playoff contender. This win means everything for morale even if playoffs are out of reach.</p>
                  <p><strong>Loser Analysis:</strong> abhishekD's catastrophic 101-point performance is their second disaster in 2 weeks (89 → 101). Across the board mediocre performances with only double digits being scored by Jalen Hurts and Seahwaks DST destroyed any chance of competing. Dropping to 3-4, the playoff path that looked clear two weeks ago is now in serious jeopardy. This is the boom-bust nightmare scenario – having a stinker against the last place team in the league.</p>
                </div>

                <div className="matchup-result">
                  <h4>"AKHIL STEALS ANOTHER: Beats Anudeep by 1.30 Points!" akhilmetukuru (159.39) def. audumula (158.09)</h4>
                  <p><strong>Winner Analysis:</strong> In the closest game of the week, akhilmetukuru won by just 1.30 points with a season-high 159-point explosion. Moving to 3-4 keeps them alive in the playoff race. This is the kind of statement win that can spark a run.</p>
                  <p><strong>Loser Analysis:</strong> audumula's heartbreaking 158-point loss is devastating. That total would have won four other matchups this week. Dropping to 4-3, they're still in good position but this hurts. Every loss matters in a tight race, and losing with 158 points is brutal.</p>
                </div>
              </div>

              <div className="story-column">
                <div className="matchup-result">
                  <h4>"PRANAV JAIN HOLDS SERVE: Survives Taaha's Challenge" pranavj20 (135.09) def. taahakm (106.02)</h4>
                  <p><strong>Winner Analysis:</strong> pranavj20's 135 points maintains their league-best 6-1 record. While not their most impressive win, staying ahead of the pack matters. With 1009 points for (1st in league), they remain the clear favorite.</p>
                  <p><strong>Loser Analysis:</strong> taahakm's 106 points continues their low-ceiling struggles. Dropping to 3-4, their playoff hopes are fading fast. The 832 points for (11th in league) shows this team lacks the firepower to make a serious run.</p>
                </div>

                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>🍀 Mickey of the Week Award (Ultimate Shame Edition)</h3>
                <div className="matchup-result">
                  <h4>"Winner": abhishekD (Abhishek) - The Spectacular Collapse</h4>
                  <p>abhishekD takes home this week's Mickey Award not for luck, but for achieving something truly remarkable: back-to-back disaster weeks culminating in losing to the league's 0-6 team. This is the kind of implosion that ends seasons. Back to back weeks with the lowest score in the league calls for this special Mickey of the Week – ultimate shame edition</p>
                  <p><strong>The Brutal Reality:</strong> This wasn't just a bad week - this could be a season-defining disaster. Losing to the 0-6 team after posting 89 and 101 points in consecutive weeks shows this team is in complete free-fall. The boom-bust pattern has become all bust, and playoff hopes are dwindling</p>
                  <p><strong>The Championship Path That Died:</strong></p>
                  <ul>
                    <li>Week 1: 166 points (looked like a juggernaut)</li>
                    <li>Week 3: 156 points (championship ceiling!)</li>
                    <li>Week 5: 145 points (still dangerous)</li>
                    <li>Week 6: 89 points (uh oh...)</li>
                    <li>Week 7: 101 points (season over?)</li>
                  </ul>
                  <p>Maybe this award will serve as a chip on the team's shoulder as they make a comeback to being playoff relevant again. They have built their brand on being Boom/Bust this year, but if the past two weeks are an indicator of anything moving forward.. close your eyes.</p>
                  <p><strong>Previous Mickey Awards:</strong> Given to lucky teams. This one is for pure, unfiltered shame.</p>
                </div>

                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>📈 Week 7 Statistical Leaders</h3>
                <ul>
                  <li><strong>Highest Scorer:</strong> ankithe (186.14 pts) - Season high!</li>
                  <li><strong>Lowest Scorer:</strong> abhishekD (101.04 pts)</li>
                  <li><strong>Closest Game:</strong> akhilmetukuru def. audumula by 1.30 pts</li>
                  <li><strong>Biggest Blowout:</strong> ankithe def. pranav4789 by 72.41 pts</li>
                  <li><strong>Best Individual Performance:</strong> Christian McCaffrey (39.10 pts) - Season's best!</li>
                  <li><strong>Worst Individual Performance:</strong> Derrick Henry (0.00 pts) - Disaster</li>
                  <li><strong>Most Unlucky Loss:</strong> audumula (158.09 pts) - Would've beaten 4 other teams</li>
                  <li><strong>Luckiest Win:</strong> akhilmetukuru (159.39 pts) - Won by 1.30 points</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="team-analysis">
            <h2 className="section-headline">🏆 Power Rankings (Post-Week 7) with Playoff Probabilities</h2>
            <p><strong>Playoff Structure:</strong> Top 5 records make playoffs + 1 wild card (highest points for outside top 5)</p>
            <p><strong>8 wins typically guarantees playoffs; 7 games remaining</strong></p>

            <div className="power-rankings-section">
              <h3>Tier 1: Playoff Locks</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>1. pranavj20 (6-1, 1009 PF) - 98% Playoff Probability</h4>
                  <p>Already at 6 wins, need just 2 more in final 7 games to hit 8-win magic number. With highest points for (1009) and comfortable lead in standings, it would need historic collapse to miss playoffs.</p>
                </div>

                <div className="team-card">
                  <h4>2. SahitReddi (5-2, 969 PF) - 95% Playoff Probability</h4>
                  <p>Five-game winning streak has them at 5 wins already. Need just 3 more wins in 7 games to reach 8-6. 969 points provides wild card insurance. This team is peaking.</p>
                </div>
              </div>

              <h3>Tier 2: Playoff Favorites</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>3. ankithe (4-3, 999 PF) - 85% Playoff Probability</h4>
                  <p>The 186-point explosion shows championship ceiling. At 4-3 with second-highest points for (999), need 4 wins in 7 games to reach 8-6. Strong position for playoff spot.</p>
                </div>

                <div className="team-card">
                  <h4>4. swahili28 (4-3, 975 PF) - 80% Playoff Probability</h4>
                  <p>At 4-3 with 975 points for (4th in league), need 4 more wins to hit 8-6. Ja'Marr Chase's boom-bust potential provides high ceiling. Loss to SahitReddi hurts but still in driver's seat.</p>
                </div>

                <div className="team-card">
                  <h4>5. kulkdaddy47 (4-3, 958 PF) - 75% Playoff Probability</h4>
                  <p>Bounced back with 152 points to reach 4-3. Need 4 wins in final 7 to reach 8-6. Patrick Mahomes provides elite QB foundation. Schedule matters but talent suggests playoff spot likely.</p>
                </div>

                <div className="team-card">
                  <h4>6. audumula (4-3, 935 PF) - 75% Playoff Probability</h4>
                  <p>Heartbreaking 158-point loss drops them to 4-3. Need 4 of final 7 to reach 8-6. Lower points for (935) compared to other 4-3 teams could hurt in tiebreakers. Four-game win streak snapped painfully.</p>
                </div>

                <div className="team-card">
                  <h4>7. pranav4789 (3-4, 995 PF) - 75% Playoff Probability</h4>
                  <p>Despite 3-4 record, third-highest points for (995) provides strong wild card safety net. Can finish 6-8/7-7 and still make playoffs via wild card points if they keep up this scoring.</p>
                </div>
              </div>

              <h3>Tier 3: Outside Looking In</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>8. akhilmetukuru (3-4, 884 PF) - 45% Playoff Probability</h4>
                  <p>The 1.30-point miracle keeps hopes alive at 3-4. Need 5 of final 7 to reach 8-6. Lower points for (884) means must win games outright - can't rely on wild card. Momentum from 159-point explosion could carry them.</p>
                </div>

                <div className="team-card">
                  <h4>9. abhishekD (3-4, 880 PF) - 45% Playoff Probability</h4>
                  <p>Two disasters in three weeks (89, 101) have this team spiraling. At 3-4, need 5 of 7 to reach 8-6. Boom-bust pattern makes this difficult. Playoff hopes fading fast.</p>
                </div>

                <div className="team-card">
                  <h4>10. taahakm (3-4, 832 PF) - 35% Playoff Probability</h4>
                  <p>At 3-4 with lowest points for among bubble teams (832), need 5 of 7 to reach 8-6 AND hope points for doesn't hurt in tiebreakers. Low ceiling (106 points this week) suggests difficulty winning competitive games. Playoffs slipping away.</p>
                </div>
              </div>

              <h3>Tier 4: Long Shots</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>11. roshik (2-5, 864 PF) - 15% Playoff Probability</h4>
                  <p>At 2-5, need 6 wins in final 7 games to reach 8-6. Essentially must run the table with no margin for error. Saquon Barkley hasn't delivered consistently. Season likely over barring miracle run.</p>
                </div>

                <div className="team-card">
                  <h4>12. abhiu (1-6, 873 PF) - 5% Playoff Probability</h4>
                  <p>First win finally arrived, but at 1-6, would need to go 7-0 in final 7 games to reach 8-6. Mathematically alive but realistically eliminated. Playing for pride and spoiler role at this point.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="season-outlook">
            <h2 className="section-headline">📊 Analysis of The Logjam: The 4-3 and 3-4 Battle</h2>
            <div className="award-section">
              <p><strong>Current State:</strong> An unprecedented 10 out of 12 teams sit between 4-3 and 3-4, creating the tightest playoff race in league history. Only pranavj20 (6-1) and SahitReddi (5-2) have separated themselves.</p>

              <h3>The 4-3 Contenders (Teams 3-6 in Standings)</h3>
              <p><strong>The Four-Way Tie:</strong></p>
              <ul>
                <li>ankithe: 4-3, 999 PF (2nd in league)</li>
                <li>swahili28: 4-3, 975 PF (4th in league)</li>
                <li>kulkdaddy47: 4-3, 958 PF (5th in league)</li>
                <li>audumula: 4-3, 935 PF (6th in league)</li>
              </ul>

              <h4>Key Insights:</h4>
              <ul>
                <li><strong>Points For Will Decide Everything:</strong> The 64-point spread between ankithe (999) and audumula (935) could be the difference between playoffs and elimination. In a race where all four teams likely finish 7-7 or 8-6, every single point matters for tiebreakers.</li>
                <li><strong>The Math:</strong> All four teams need 4 wins in final 7 games to reach 8-6. That's a 4-3 finish - very achievable but zero margin for error.</li>
              </ul>

              <h3>The 3-4 Desperate Four (Teams 7-10)</h3>
              <p><strong>The Playoff Bubble:</strong></p>
              <ul>
                <li>pranav4789: 3-4, 995 PF (3rd in league!)</li>
                <li>akhilmetukuru: 3-4, 884 PF</li>
                <li>abhishekD: 3-4, 880 PF</li>
                <li>taahakm: 3-4, 832 PF</li>
              </ul>

              <h4>Key Insights:</h4>
              <ul>
                <li><strong>pranav4789's Wild Card Lifeline:</strong> Despite being in 7th place, pranav4789 has 995 points for - higher than three of the four teams at 4-3! Even if they finish 6-8 or 7-7, they could sneak into the 6th playoff spot via wild card.</li>
                <li><strong>Everyone Else Must Win Games:</strong> The other three 3-4 teams don't have the points for cushion. They must reach 8-6 by winning 5 of 7 games - no safety net.</li>
              </ul>

              <h3>Week 7 Takeaways:</h3>
              <ul>
                <li>ankithe announces they're back with historic 186-point performance</li>
                <li>SahitReddi's five-game win streak establishes them as championship threat</li>
                <li>The 4-3/3-4 logjam creates unprecedented playoff chaos</li>
                <li>pranav4789's wild card safety net (995 PF) keeps them alive despite 3-4 record</li>
                <li>Next 3 weeks will separate playoff teams from pretenders</li>
              </ul>

              <p><strong>The playoff race is wide open. Weeks 8-10 will be absolute chaos!</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week7Newsletter;
