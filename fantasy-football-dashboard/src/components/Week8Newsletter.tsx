import React from 'react';

const Week8Newsletter: React.FC = () => {
  return (
    <div className="newsletter-archive">
      <div className="newspaper-container">
        <div className="newspaper-header">
          <div className="newspaper-masthead">
            <h1 className="newspaper-title">AMBERWOOD FANTASY TIMES</h1>
            <div className="newspaper-subtitle">The Premier Source for Fantasy Football News & Analysis</div>
            <div className="newspaper-meta">
              <span className="edition">Week 8 Edition</span>
              <span className="date">October 2025</span>
              <span className="price">FREE</span>
            </div>
          </div>
        </div>

        <div className="newspaper-content">
          <div className="main-story">
            <h2 className="headline">Power Shifts and Playoff Storms Brewing</h2>
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
                  <img
                    src="/IMG_3787.jpg"
                    alt="Week 8 Cover"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
                <div className="draft-caption" style={{fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '10px'}}>
                  Kelce proving Karma really is that guy on the Chiefs - and on Aditya's roster
                </div>
              </div>
            </div>

            <div className="story-layout">
              <div className="story-column">
                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>📊 Week 8 Matchup Recap</h3>

                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>🔥 Statement Victories</h3>

                <div className="matchup-result">
                  <h4>"ROSHIK ROARS BACK: Stunning Upset Over CMC's Team" roshik (148.35) def. ankithe (126.10)</h4>
                  <p><strong>Winner Analysis:</strong> In the upset of the week, roshik's 148-point performance demolished last week's 186-point juggernaut. This win moves them to 3-5 and keeps faint playoff hopes alive. Saquon Barkley and the supporting cast finally delivered when it mattered most. This is the kind of statement win that can spark a miracle run.</p>
                  <p><strong>Loser Analysis:</strong> ankithe's catastrophic collapse from 186 points to 126 points came very untimely. CMC couldn't save them this time, and the supporting cast put up an average effort. Dropping to 4-4 puts them squarely on the playoff bubble after looking unstoppable last week. This is a devastating momentum killer.</p>
                </div>

                <div className="matchup-result">
                  <h4>"ANUDEEP'S SURGE: Fourth Win in Five Games" audumula (147.02) def. taahakm (108.83)</h4>
                  <p><strong>Winner Analysis:</strong> audumula's 147 points continue their hot streak, moving to 5-3 and firmly into playoff position. After that heartbreaking 158-point loss in Week 7, they've bounced back strong. This team is peaking at the right time and has established themselves as a legitimate playoff lock.</p>
                  <p><strong>Loser Analysis:</strong> taahakm's 108 points is more of the same - low ceiling, not enough firepower. Dropping to 3-5, their playoff hopes are essentially over. Facing elite competition down the stretch makes 8 wins nearly impossible.</p>
                </div>

                <div className="matchup-result">
                  <h4>"PRANAV P STUNS THE LEADER: Massive Upset Over Pranav Jain" pranav4789 (140.73) def. pranavj20 (105.92)</h4>
                  <p><strong>Winner Analysis:</strong> In a huge upset, pranav4789's 140 points took down the league leader. Moving to 4-4 with the highest points for in the league (1136), this win keeps them right in the playoff race. The wild card safety net (highest PF) means they're in excellent position.</p>
                  <p><strong>Loser Analysis:</strong> pranavj20's second loss drops them to 6-2, but they're still in command. The 105-point performance is below their standard, but at 6-2 with comfortable lead, they remain the playoff favorite. Still need just 2 more wins to hit 8-6 and lock playoffs.</p>
                </div>

                <div className="matchup-result">
                  <h4>"ABHISHEK BOUNCES BACK: Finally Ends Disaster Streak" abhishekD (139.16) def. SahitReddi (120.42)</h4>
                  <p><strong>Winner Analysis:</strong> After back-to-back disasters (89, 101), abhishekD's 139-point bounce-back is huge for playoff hopes. Moving to 4-4, they're back in the race. This win over a 5-2 team shows they still have championship ceiling when the roster clicks. Momentum restored at perfect time.</p>
                  <p><strong>Loser Analysis:</strong> SahitReddi's five-game winning streak ends with a 120-point performance. Dropping to 5-3, they're still in great playoff position but the loss to a direct competitor hurts. The streak was going to end eventually, but timing matters in tight race.</p>
                </div>

                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>⚔️ Close Battles</h3>

                <div className="matchup-result">
                  <h4>"ADITYA'S MONDAY AVALANCHE:" kulkdaddy47 (151.97) def. swahili28 (133.27)</h4>
                  <p><strong>Winner Analysis:</strong> kulkdaddy47's yet again banked on the dynamic Chiefs duo of Patrick Mahomes and Travis Kelce, and they more than delivered. Proving to be the deadliest stack in the league this year, there's not many teams that can stop kulkdaddy47. A monster performance from Breece Hall provided much needed support against a star studded opponent in swahili28.</p>
                  <p><strong>Loser Analysis:</strong> swahili28's 133 points wasn't bad, but they needed a bit more fire power to keep up with kulkdaddy47. This loss has more to say about the ceiling of the opponent than any weakness on swahili28's team.</p>
                </div>

                <div className="matchup-result">
                  <h4>"ABHIRAM'S WINNING STREAK: Back-to-Back Victories!" abhiu (135.18) def. akhilmetukuru (128.83)</h4>
                  <p><strong>Winner Analysis:</strong> abhiu's second straight win (151 → 135) shows this team has finally figured things out. Moving to 2-6, playoffs are likely out of reach, but playing spoiler and building momentum for next season matters.</p>
                  <p><strong>Loser Analysis:</strong> akhilmetukuru's 128.83 points drops them to 3-5, and playoff hopes are fading fast. Need to win 5 of final 6 games to reach 8-6, which seems unrealistic. The season is slipping away after that 159-point miracle in Week 7.</p>
                </div>
              </div>

              <div className="story-column">
                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>📈 Week 8 Statistical Leaders</h3>
                <ul>
                  <li><strong>Highest Scorer:</strong> kulkdaddy47 (151.97 pts)</li>
                  <li><strong>Lowest Scorer:</strong> pranavj20 (105.92 pts)</li>
                  <li><strong>Closest Game:</strong> abhiu def. akhilmetukuru by 6.35 pts</li>
                  <li><strong>Biggest Blowout:</strong> audumula def. taahakm by 38.19 pts</li>
                  <li><strong>Biggest Upset:</strong> pranav4789 def. pranavj20</li>
                  <li><strong>Most Impressive Comeback:</strong> abhishekD bounces back from disasters</li>
                </ul>

                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>🎯 Week 8 Key Takeaways</h3>
                <ul>
                  <li><strong>The 4-4 Logjam:</strong> Five teams now sit at 4-4, creating unprecedented playoff chaos</li>
                  <li><strong>pranavj20 Still Leads:</strong> Despite loss, 6-2 record maintains comfortable cushion</li>
                  <li><strong>Points For Matters:</strong> pranav4789's league-high 1136 PF provides wild card insurance</li>
                  <li><strong>Momentum Shifts:</strong> audumula surging, ankithe collapsing, abhishekD resurrecting</li>
                  <li><strong>Playoff Picture Clarifying:</strong> Top 4 teams pulling away, bottom 4 falling behind</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="team-analysis">
            <h2 className="section-headline">🏆 Power Rankings (Post-Week 8) with Playoff Probabilities</h2>
            <p><strong>Playoff Structure:</strong> Top 5 records make playoffs + 1 wild card (highest points for outside top 5)</p>
            <p><strong>8 wins typically guarantees playoffs; 6 games remaining</strong></p>

            <div className="power-rankings-section">
              <h3>Tier 1: Playoff Locks</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>1. pranavj20 (6-2, 1115 PF) - 97% Playoff Probability</h4>
                  <p>Despite second loss, still two games ahead of the pack at 6-2. Need just 2 wins in final 6 games to reach 8-6 threshold. With 1115 points for (5th in league), they're in complete control of playoff destiny.</p>
                </div>

                <div className="team-card">
                  <h4>2. kulkdaddy47 (5-3, 1110 PF) - 92% Playoff Probability</h4>
                  <p>At 5-3 with a solid foundation of PF. Mahomes and elite talent should deliver 3 wins down the stretch.</p>
                </div>

                <div className="team-card">
                  <h4>3. SahitReddi (5-3, 1089 PF) - 88% Playoff Probability</h4>
                  <p>Winning streak ended but still in strong position at 5-3. Need 3 wins in final 6 games to reach 8-6. Five-game winning streak showed championship potential.</p>
                </div>

                <div className="team-card">
                  <h4>4. audumula (5-3, 1082 PF) - 88% Playoff Probability</h4>
                  <p>Hot streak continues to 5-3 with 147-point performance. Need 3 of 6 to reach 8-6. The 1082 points for (4th in league) and momentum suggest playoff spot is likely locked. This team is peaking at perfect time.</p>
                </div>
              </div>

              <h3>Tier 2: Playoff Favorites (The 4-4 Battle)</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>5. pranav4789 (4-4, 1136 PF) - 75% Playoff Probability</h4>
                  <p>Despite 4-4 record, HIGHEST points for in entire league (1136) provides ultimate wild card insurance. Even at 6-8 or 7-7, will likely claim 6th seed via points for. Need 4 of 6 to reach 8-6 for record-based playoff, but wild card is safety net. Win over pranavj20 shows they can beat anyone.</p>
                </div>

                <div className="team-card">
                  <h4>6. ankithe (4-4, 1125 PF) - 70% Playoff Probability</h4>
                  <p>Devastating loss, but still second-highest points for (1125) keeps them in strong position. Need 4 of 6 to reach 8-6. CMC's ceiling gives them championship upside, but supporting cast inconsistency is concerning. Wild card cushion provides safety net.</p>
                </div>

                <div className="team-card">
                  <h4>7. swahili28 (4-4, 1108 PF) - 70% Playoff Probability</h4>
                  <p>At 4-4 with third-highest points for (1108), need 4 of 6 to reach 8-6. Wild card firmly in play with elite scoring.</p>
                </div>

                <div className="team-card">
                  <h4>8. abhishekD (4-4, 1019 PF) - 35% Playoff Probability</h4>
                  <p>Bounce-back win moves them to 4-4, need 4 of 6 to reach 8-6. Lower points for (1019) means must win games outright - no wild card safety net. Boom-bust pattern makes this challenging. Must avoid more disaster weeks.</p>
                </div>
              </div>

              <h3>Tier 3: Long Shots</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>9. roshik (3-5, 1012 PF) - 25% Playoff Probability</h4>
                  <p>Big win moves them to 3-5, but need 5 of 6 to reach 8-6. Essentially must run the table. The 148-point performance shows ceiling, but can they sustain it? Playoffs unlikely but mathematically alive.</p>
                </div>

                <div className="team-card">
                  <h4>10. akhilmetukuru (3-5, 1013 PF) - 20% Playoff Probability</h4>
                  <p>At 3-5, need 5 of 6 wins to reach 8-6. The season-high 159 in Week 7 feels like distant memory after 108-point dud. Playoffs slipping away fast.</p>
                </div>

                <div className="team-card">
                  <h4>11. taahakm (3-5, 941 PF) - 15% Playoff Probability</h4>
                  <p>At 3-5 with lowest points for (941), need 5 of 6 AND hope points don't hurt tiebreakers. Low ceiling makes winning 5 of 6 nearly impossible. Season likely over.</p>
                </div>

                <div className="team-card">
                  <h4>12. abhiu (2-6, 1008 PF) - 5% Playoff Probability</h4>
                  <p>Back-to-back wins give hope, but at 2-6 need to go 6-0 to reach 8-6. Mathematically alive but realistically eliminated. Playing spoiler role rest of season.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="season-outlook">
            <h2 className="section-headline">🔮 Week 9 Matchup Preview - Powered by AmberwoodAI</h2>
            <div className="award-section">
              <p><strong>Each matchup's impact on the playoff race with predictions</strong></p>

              <h3>🔥 Primetime Matchups</h3>

              <div className="matchup-preview">
                <h4>abhishekD (4-4) vs pranavj20 (6-2)</h4>
                <p><strong>Playoff Impact:</strong> MASSIVE. If abhishekD wins, they move to 5-4 and knock leader to 6-3, making race wide open. If pranavj20 wins (7-2), they essentially lock #1 seed.</p>
                <p><strong>AmberwoodAI Prediction:</strong> pranavj20 115, abhishekD 108</p>
                <p><strong>Justification:</strong> pranavj20's consistency and 6-2 record suggest they bounce back from upset loss, while abhishekD's boom-bust pattern makes them risky against elite competition.</p>
              </div>

              <div className="matchup-preview">
                <h4>SahitReddi (5-3) vs pranav4789 (4-4)</h4>
                <p><strong>Playoff Impact:</strong> Direct playoff race battle. Winner strengthens position, loser falls to pack. pranav4789 needs win to keep pace; SahitReddi wants to maintain 5-3 cushion.</p>
                <p><strong>AmberwoodAI Prediction:</strong> SahitReddi 142, pranav4789 128</p>
                <p><strong>Justification:</strong> SahitReddi's recent hot streak (five-game winner before last week) and home momentum give them edge over inconsistent pranav4789.</p>
              </div>

              <h3>⚖️ Bubble Team Wars</h3>

              <div className="matchup-preview">
                <h4>audumula (5-3) vs swahili28 (4-4)</h4>
                <p><strong>Playoff Impact:</strong> Critical 5-3 vs 4-4 matchup. audumula can move to 6-3 (near-lock), swahili28 can tie at 5-4 and stay in thick of race.</p>
                <p><strong>AmberwoodAI Prediction:</strong> audumula 138, swahili28 122</p>
                <p><strong>Justification:</strong> audumula's four wins in five games shows consistency that should overcome swahili28's boom-bust volatility.</p>
              </div>

              <div className="matchup-preview">
                <h4>taahakm (3-5) vs kulkdaddy47 (5-3)</h4>
                <p><strong>Playoff Impact:</strong> kulkdaddy47 can move to 6-3 (strong position), taahakm needs win desperately to keep faint playoff hopes alive at 4-5.</p>
                <p><strong>AmberwoodAI Prediction:</strong> kulkdaddy47 145, taahakm 112</p>
                <p><strong>Justification:</strong> Mahomes' elite ceiling and kulkdaddy47's 5-3 record should dominate taahakm's low-scoring offense (941 PF).</p>
              </div>

              <h3>🎯 Desperation Games</h3>

              <div className="matchup-preview">
                <h4>ankithe (4-4) vs akhilmetukuru (3-5)</h4>
                <p><strong>Playoff Impact:</strong> ankithe needs win to stay at .500 and in playoff race. akhilmetukuru needs win to keep mathematical hopes alive at 4-5.</p>
                <p><strong>AmberwoodAI Prediction:</strong> ankithe 156, akhilmetukuru 118</p>
                <p><strong>Justification:</strong> CMC's elite floor and ankithe's 1125 PF (2nd in league) should bounce back strong against weaker opponent.</p>
              </div>

              <div className="matchup-preview">
                <h4>roshik (3-5) vs abhiu (2-6)</h4>
                <p><strong>Playoff Impact:</strong> Both eliminated from realistic playoff contention. Winner keeps faint mathematical hope; loser locks in bottom-3 finish.</p>
                <p><strong>AmberwoodAI Prediction:</strong> roshik 134, abhiu 127</p>
                <p><strong>Justification:</strong> roshik's 148-point Week 8 performance and Saquon Barkley's upside edge abhiu's inconsistent post-trade roster.</p>
              </div>

              <h3>📊 Week 9 Bottom Line</h3>
              <p>The stretch of critical matchups for playoff contention begin now. At this point, we can assume pranavj20 is the one absolute lock for the playoffs. The remaining 5 teams will come down to kulkdaddy47 (5-3, 1110 PF), SahitReddi (5-3, 1089 PF), audumula (5-3, 1082 PF), pranav4789 (4-4, 1136 PF), ankithe (4-4, 1125 PF), swahili28 (4-4, 1108 PF), and abhishekD (4-4, 1019 PF).</p>
              <p>Though wins and losses are important, we predict that the 5 teams that make the playoffs from this group of 7, will be the ones with the highest PF. Outside of abhishekD, who is roughly ~80 points back on the group, there is only a 40 point gap in PF, which as we have seen, can easily be made up in a single week. Mickey wins may not mean much for these teams as the wild card playoff spot will reward the team with the most points and not the better record.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week8Newsletter;
