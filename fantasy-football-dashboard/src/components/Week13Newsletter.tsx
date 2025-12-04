import React from 'react';

const Week13Newsletter: React.FC = () => {
  return (
    <div className="newsletter-archive">
      {/* Mobile Responsive Styles */}
      <style>{`
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

      <div className="newspaper-container">
        <div className="newspaper-header">
          <div className="newspaper-masthead">
            <h1 className="newspaper-title">AMBERWOOD FANTASY TIMES</h1>
            <div className="newspaper-subtitle">The Premier Source for Fantasy Football News & Analysis</div>
            <div className="newspaper-meta">
              <span className="edition">Week 13 Edition</span>
              <span className="date">December 2025</span>
              <span className="price">FREE</span>
            </div>
          </div>
        </div>

        <div className="newspaper-content">
          <div className="main-story">
            <h2 className="headline">Week 13: The Playoff Picture Takes Shape</h2>
            <div className="byline">By the Office of the Commissioner | Week 14 Preview Inside</div>

            <div className="center-image" style={{marginBottom: '30px', marginTop: '20px', textAlign: 'center', width: '100%'}}>
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
                    src="/aifaceswap-target_9f582ffde8494c217b1211cf3625d2ce.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
                <div className="draft-caption" style={{fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '10px'}}>
                  The playoff race heats up as teams battle for their championship dreams
                </div>
              </div>
            </div>

            <div className="story-layout">
              <div className="story-column">
                <h3>📊 Week 13 Recap: Playoff Battles Heat Up 📊</h3>

                <div className="matchup-result">
                  <h4>audumula Edges abhishekD in Crucial Top-6 Battle</h4>
                  <p><strong>Final: audumula 135.97, abhishekD 129.80</strong></p>
                  <p>In a pivotal matchup between two top 6 teams, audumula pulled away late to secure the victory and move to 8-5. CeeDee Lamb led the charge for audumula, while Derrick Henry put up a valiant effort for abhishekD. Both teams remain firmly in playoff position, but this head-to-head result could prove crucial if seeding comes down to tiebreakers.</p>
                </div>

                <div className="matchup-result">
                  <h4>roshik Dominates taahakm to Stay in the Hunt</h4>
                  <p><strong>Final: roshik 120.47, taahakm 102.96</strong></p>
                  <p>roshik picked up a win to improve to 6-7. Saquon Barkley and the Rams' offense carried the load, while taahakm's loss drops them to 4-9 and officially eliminates them from playoff contention. Neither team is really impacted by this result but a win is still a win especially in toilet bowl seeding.</p>
                </div>

                <div className="matchup-result">
                  <h4>SahitReddi Crushes ankithe in Playoff Positioning Game</h4>
                  <p><strong>Final: SahitReddi 132.11, ankithe 103.79</strong></p>
                  <p>In the battle of teams hovering around the playoff cut line, SahitReddi delivered a statement victory to move to 8-5. Bucky Irving and Bijan Robinson powered the ground game, while ankithe falls to 7-6 and now faces a must-win situation in Week 14. This loss significantly damages ankithe's playoff chances, as they'll need help even with a victory.</p>
                </div>

                <div className="matchup-result">
                  <h4>swahili28 Outlasts akhilmetukuru in High-Scoring Affair</h4>
                  <p><strong>Final: swahili28 161.50, akhilmetukuru 143.29</strong></p>
                  <p>The week's highest-scoring game saw swahili28 continue their offensive explosion, posting the second-highest score of the week to improve to 8-5. Ja'Marr Chase and James Cook led the scoring barrage, while akhilmetukuru's loss drops them to 3-10 despite a solid scoring output. swahili28 maintains the league's highest points-for total (1,852) and has massive tiebreaker advantages.</p>
                </div>

                <div className="matchup-result">
                  <h4>kulkdaddy47 Holds Off pranav4789 to Stay Tied for First</h4>
                  <p><strong>Final: kulkdaddy47 113.44, pranav4789 107.68</strong></p>
                  <p>In a defensive struggle, kulkdaddy47 secured a crucial victory to improve to 9-4 and remain tied for the league lead. Patrick Mahomes and Breece Hall did just enough against a resilient pranav4789 squad led by Achane.</p>
                </div>

                <div className="matchup-result">
                  <h4>pranavj20 Cruises Past abhiu to Stay Tied for First</h4>
                  <p><strong>Final: pranavj20 112.69, abhiu 76.19</strong></p>
                  <p>The league's co-leader pranavj20 took care of business against last-place abhiu, improving to 9-4 and maintaining a share of first place. Joe Burrow handled a depleted abhiu squad. pranavj20 currently holds the #1 seed via the PF tiebreaker (1,744 vs 1,662) over kulkdaddy47.</p>
                </div>
              </div>

              <div className="story-column">
                <h3>📈 Current Standings After Week 13 📈</h3>
                <ul>
                  <li><strong>#1 pranavj20:</strong> 9-4, 1,744 PF (via PF tiebreaker)</li>
                  <li><strong>#2 kulkdaddy47:</strong> 9-4, 1,662 PF</li>
                  <li><strong>#3 swahili28:</strong> 8-5, 1,852 PF</li>
                  <li><strong>#4 audumula:</strong> 8-5, 1,772 PF</li>
                  <li><strong>#5 SahitReddi:</strong> 8-5, 1,752 PF</li>
                  <li><strong>#6 abhishekD:</strong> 8-5, 1,725 PF</li>
                </ul>

                <h3>🎯 Bubble Teams 🎯</h3>
                <ul>
                  <li><strong>ankithe:</strong> 7-6, 1,757 PF</li>
                  <li><strong>pranav4789:</strong> 6-7, 1,843 PF (conditional 6th seed)</li>
                  <li><strong>roshik:</strong> 6-7, 1,659 PF</li>
                </ul>

                <h3>📊 Week 13 Statistical Leaders 📊</h3>
                <ul>
                  <li><strong>Highest Scorer:</strong> swahili28 (161.50 pts)</li>
                  <li><strong>Total Points Leader:</strong> swahili28 (1,852 PF)</li>
                  <li><strong>Most Vulnerable:</strong> abhishekD (lowest PF among 8-5)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="team-analysis">
            <h2 className="section-headline">🎯 Fantasy Playoff Picture: Scenarios & Clinching 🎯</h2>

            <div className="matchup-result">
              <p><strong>CRITICAL CONTEXT:</strong> Since tiebreakers are decided by Points For (PF), NOBODY has clinched anything yet! Teams can still be jumped by higher-scoring teams that win in Week 14.</p>

              <h4 style={{marginTop: '15px'}}>SEEDS 1-2: pranavj20 & kulkdaddy47 (9-4)</h4>
              <p style={{marginBottom: '5px'}}><strong>pranavj20 (1,744 PF):</strong> Clinches top-2 seed with win vs ankithe. Can be jumped by any 8-5 team that wins if pranavj20 loses and that team has higher PF.</p>
              <p><strong>kulkdaddy47 (1,662 PF):</strong> Clinches top-2 seed with win vs abhishekD. Can be knocked out entirely if they lose AND SahitReddi + audumula + swahili28 all win. <em>What to Watch: A loss puts kulkdaddy47 in serious trouble.</em></p>

              <h4 style={{marginTop: '15px'}}>SEED 3: swahili28 (8-5, 1,852 PF)</h4>
              <p><strong>Best PF in league = massive tiebreaker advantage.</strong> Clinches playoff spot with win vs roshik. Can jump to top-2 if they win AND pranavj20/kulkdaddy47 loses (swahili28 has 108 PF advantage over pranavj20). <em>What to Watch: If they reach 9-5, virtually guaranteed top-3 seed.</em></p>

              <h4 style={{marginTop: '15px'}}>SEEDS 4-5: audumula & SahitReddi (8-5)</h4>
              <p style={{marginBottom: '5px'}}><strong>audumula (1,772 PF):</strong> Clinches with win vs pranav4789. Watch out for ankithe winning - only 15 PF ahead at 8-6.</p>
              <p><strong>SahitReddi (1,752 PF):</strong> Clinches with win vs abhiu (easiest matchup). Watch out for ankithe winning - ankithe has 5 PF advantage at 8-6.</p>

              <h4 style={{marginTop: '15px'}}>SEED 6: abhishekD (8-5, 1,725 PF) - MOST VULNERABLE</h4>
              <p><strong>Lowest PF among 8-5 teams.</strong> Clinches with win vs kulkdaddy47. Loss + ankithe win likely ends their season on PF tiebreaker.</p>

              <h4 style={{marginTop: '15px'}}>BUBBLE TEAMS</h4>
              <p style={{marginBottom: '5px'}}><strong>ankithe (7-6, 1,757 PF):</strong> MUST WIN vs pranavj20 to reach 8-6, then needs two or more 8-5 teams to lose. Most realistic path: beat pranavj20 AND have abhishekD + one other 8-5 team lose.</p>
              <p><strong>pranav4789 (6-7, 1,843 PF):</strong> Wild card path via highest PF outside top 5. Pretty much locked up if swahili28 wins. Has 2nd-highest PF among playoff contenders.</p>

              <h4 style={{marginTop: '15px'}}>PLAYOFF PROBABILITY SUMMARY</h4>
              <p style={{marginBottom: '3px'}}><strong>VERY STRONG (85%+):</strong> pranavj20, kulkdaddy47, swahili28</p>
              <p style={{marginBottom: '3px'}}><strong>STRONG (70-80%):</strong> audumula, SahitReddi, pranav4789</p>
              <p style={{marginBottom: '3px'}}><strong>VULNERABLE (40-60%):</strong> abhishekD</p>
              <p style={{marginBottom: '3px'}}><strong>LONG SHOTS (10-20%):</strong> ankithe</p>
              <p style={{marginBottom: '0px'}}><strong>ELIMINATED:</strong> roshik, taahakm, akhilmetukuru, abhiu</p>
            </div>
          </div>

          <div className="season-outlook">
            <h2 className="section-headline">🔮 Week 14 Matchup Previews & Predictions 🔮</h2>
            <div className="award-section">

              <div className="matchup-preview">
                <h4>MATCHUP 1: audumula (8-5, 1772 PF) vs pranav4789 (6-7, 1843 PF)</h4>
                <p><strong>The Desperation Game</strong></p>
                <p><strong>Keys to Watch:</strong></p>
                <ul>
                  <li><strong>audumula:</strong> Josh Allen enters Week 14 as one of the league's hottest QBs and CeeDee Lamb's matchup will be critical. audumula controls their playoff destiny with a win.</li>
                  <li><strong>pranav4789:</strong> Amon-Ra St. Brown injury and Patriots bye week add big question marks. De'Von Achane's explosiveness could be the X-factor. pranav4789 MUST continue high scoring.</li>
                </ul>
                <p><strong>Prediction:</strong> audumula 126, pranav4789 122</p>
                <p><strong>Betting Odds:</strong> audumula -2.5 (55% win probability)</p>
                <p><strong>Why:</strong> Josh Allen's elite play gives audumula the edge in a nail-biter. pranav4789 will fight hard and could easily win this one, but audumula's win-and-in mentality prevails in a close one.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 2: abhishekD (8-5, 1725 PF) vs kulkdaddy47 (9-4, 1662 PF)</h4>
                <p><strong>The Elimination Zone</strong></p>
                <p><strong>Keys to Watch:</strong></p>
                <ul>
                  <li><strong>abhishekD:</strong> Jalen Hurts is a weekly stud, and Derrick Henry provides a safe floor. Drake London and Courtland Sutton must step up as WR1/2. abhishekD's playoff spot is in serious jeopardy with a loss due to lowest PF among 8-5 teams.</li>
                  <li><strong>kulkdaddy47:</strong> Patrick Mahomes, Breece Hall, and DK Metcalf form one of the league's most balanced rosters.</li>
                </ul>
                <p><strong>Prediction:</strong> abhishekD 131, kulkdaddy47 102</p>
                <p><strong>Betting Odds:</strong> abhishekD -8 (72% win probability)</p>
                <p><strong>Why:</strong> kulkdaddy47's reliance on the Chiefs in an extremely tough matchup vs the Texans will be the defining factor here. A dud at the most crucial time while abhishekD maintains their consistent scoring with Jalen Hurts and Derrick Henry.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 3: roshik (6-7, 1659 PF) vs swahili28 (8-5, 1852 PF)</h4>
                <p><strong>The Coronation</strong></p>
                <p><strong>Keys to Watch:</strong></p>
                <ul>
                  <li><strong>roshik:</strong> Saquon Barkley has been a disappointment but can he turn it around.</li>
                  <li><strong>swahili28:</strong> Ja'Marr Chase is the league's most dangerous weapon, and James Cook has been ultra-consistent. Nico Collins also bolsters the WR corps. A win could vault swahili28 into top-2 seed discussion.</li>
                </ul>
                <p><strong>Prediction:</strong> swahili28 148, roshik 118</p>
                <p><strong>Betting Odds:</strong> swahili28 -9.5 (75% win probability)</p>
                <p><strong>Why:</strong> Ja'Marr Chase and James Cook are too explosive, and swahili28 has been the league's most consistent high-scorer. swahili28 should cruise to 9-5 and potentially a top-2 seed.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 4: ankithe (7-6, 1757 PF) vs pranavj20 (9-4, 1744 PF)</h4>
                <p><strong>The Upset Special</strong></p>
                <p><strong>Keys to Watch:</strong></p>
                <ul>
                  <li><strong>ankithe:</strong> Lamar Jackson must return to his MVP self. Jaylen Waddle and Brian Thomas provide WR upside. ankithe MUST win and get help to make the playoffs.</li>
                  <li><strong>pranavj20:</strong> Joe Burrow, JSN, and Puka Nacua form a lethal passing attack. Fighting to maintain #1 seed, but a loss + swahili28 win could cost them a bye.</li>
                </ul>
                <p><strong>Prediction:</strong> pranavj20 134, ankithe 121</p>
                <p><strong>Betting Odds:</strong> pranavj20 -6.5 (68% win probability)</p>
                <p><strong>Why:</strong> pranavj20 plays starters to protect seeding. Joe Burrow is clicking at the right time. ankithe keeps it closer than expected behind Lamar Jackson, but without CMC the team is lacking firepower.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 5: taahakm (4-9, 1527 PF) vs akhilmetukuru (3-10, 1517 PF)</h4>
                <p><strong>The Tankapalooza</strong></p>
                <p><strong>Keys to Watch:</strong></p>
                <ul>
                  <li><strong>taahakm:</strong> Caleb Williams shows flashes, and the Gibbs/Montgomery Detroit backfield provides upside. Pride is the only thing on the line here.</li>
                  <li><strong>akhilmetukuru:</strong> Jared Goff and Justin Herbert are serviceable, but A.J. Brown and Terry McLaurin are the true weapons. Jonathan Taylor's consistency keeps them competitive.</li>
                </ul>
                <p><strong>Prediction:</strong> taahakm 119, akhilmetukuru 116</p>
                <p><strong>Betting Odds:</strong> Pick'em (50% win probability)</p>
                <p><strong>Why:</strong> Jahmyr Gibbs and David Montgomery provide the edge in a game that truly could go either way. Both teams have underachieved this season.</p>
              </div>

              <div className="matchup-preview">
                <h4>MATCHUP 6: SahitReddi (8-5, 1752 PF) vs abhiu (2-11, 1541 PF)</h4>
                <p><strong>The Lock Game</strong></p>
                <p><strong>Keys to Watch:</strong></p>
                <ul>
                  <li><strong>SahitReddi:</strong> Bucky Irving and Bijan Robinson have been the backbone of this team. Tee Higgins and Davante Adams provide WR firepower. This should be a routine win to clinch a playoff spot.</li>
                  <li><strong>abhiu:</strong> Justin Jefferson is an elite WR1, but the rest of the roster has struggled. Bo Nix has rookie QB volatility. Playing spoiler is the only motivation.</li>
                </ul>
                <p><strong>Prediction:</strong> SahitReddi 142, abhiu 89</p>
                <p><strong>Betting Odds:</strong> SahitReddi -18 (88% win probability)</p>
                <p><strong>Why:</strong> The talent gap is massive. SahitReddi's dual RB1s and elite WRs overwhelm abhiu's depleted roster. SahitReddi cruises to 9-5.</p>
              </div>
            </div>

            <div className="matchup-result">
              <h3>💭 Final Thoughts 💭</h3>
              <p>Week 14 is absolute chaos with the PF tiebreaker in play. swahili28's league-leading 1,852 PF makes them the most dangerous team in the league - they could jump from #3 to #2 seed with a win and a little help. Meanwhile, abhishekD's low PF (1,725) makes them extremely vulnerable despite their 8-5 record.</p>
              <p><strong>Key to Remember:</strong> With PF tiebreakers, your margin of victory matters just as much as getting the W!</p>
              <p>Good luck to all teams in Week 14. May your studs go nuclear and your bench stay quiet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week13Newsletter;
