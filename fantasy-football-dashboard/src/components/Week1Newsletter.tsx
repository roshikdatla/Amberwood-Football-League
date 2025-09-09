import React from 'react';

const Week1Newsletter: React.FC = () => {
  return (
    <div className="newsletter-archive">
      <div className="newspaper-container">
        <div className="newspaper-header">
          <div className="newspaper-masthead">
            <h1 className="newspaper-title">AMBERWOOD FANTASY TIMES</h1>
            <div className="newspaper-subtitle">The Premier Source for Fantasy Football News & Analysis</div>
            <div className="newspaper-meta">
              <span className="edition">Week 1 Edition</span>
              <span className="date">September 2025</span>
              <span className="price">FREE</span>
            </div>
          </div>
        </div>

        <div className="newspaper-content">
          <div className="main-story">
            <h2 className="headline">AFL Week 1 Recap: Fireworks, Flops, and First Impressions</h2>
            <div className="byline">By the Office of the Commissioner</div>
            
            <div className="story-layout">
              <div className="story-column">
                <div className="left-image" style={{marginBottom: '20px', marginLeft: '80px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center', display: 'inline-block'}}>
                  <img src="/0CAFA0B7-EB9E-4F67-A55A-A122676D6371.PNG" alt="Ankith King Slayer" style={{maxWidth: '350px', height: 'auto', border: '2px solid #333', borderRadius: '4px'}} />
                  <div className="draft-caption" style={{fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '5px', maxWidth: '350px'}}>
                    Ankith stuns the former champion
                  </div>
                </div>
                
                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>🔥 High-Scoring Affairs</h3>
                
                <div className="matchup-result">
                  <h4>abhishekD (166.03) def. pranav4789 (132.13)</h4>
                  <p className="matchup-tagline">"HENRY'S HAMMER" - Highlights Derrick Henry's dominant 29-point performance</p>
                  <p><strong>Winner Analysis:</strong> abhishekD dominated with a league-high 166 points thanks to stellar performances from their core trio of Jalen Hurts, Derrick Henry, and Sam LaPorta. This team showed excellent depth and consistency across all positions.</p>
                  <p><strong>Loser Analysis:</strong> pranav4789 actually put up a respectable 132 points that would have won several other matchups, but fell victim to bad matchup luck.</p>
                </div>

                <div className="matchup-result">
                  <h4>roshik (154.87) def. akhilmetukuru (102.42)</h4>
                  <p className="matchup-tagline">"BARKLEY BULLDOZES" - Emphasizes Saquon's solid performance and team depth</p>
                  <p><strong>Winner Analysis:</strong> roshik's 154 points were powered by the dynamic duo of Saquon Barkley and Kyren Williams. Kyler and Marvin Harrison Jr. stack is already paying dividends.</p>
                  <p><strong>Loser Analysis:</strong> akhilmetukuru struggled to find consistency, with underperformances from key players like A.J. Brown, Devonta Smith and Jonathan Taylor.</p>
                </div>

                <div className="matchup-result">
                  <h4>kulkdaddy47 (152.12) def. audumula (137.86)</h4>
                  <p className="matchup-tagline">"JETS TAKE FLIGHT" - Garrett Wilson's 22.50 points and Breece Hall's 16.50 points combined for 39 points</p>
                  <p><strong>Winner Analysis:</strong> kulkdaddy47 rode Patrick Mahomes + Travis Kelce stack to victory. Breece Hall and Garrett Wilson provided solid production from the Jets surprising offense.</p>
                  <p><strong>Loser Analysis:</strong> audumula actually had a solid week with 137 points but faced tough luck. Josh Allen performed well, but inconsistent WR play cost them crucial points.</p>
                </div>
              </div>
              
              <div className="story-column">
                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>⚔️ Closer Contests</h3>
                
                <div className="matchup-result">
                  <h4>ankithe (140.12) def. abhiu (123.66)</h4>
                  <p className="matchup-tagline">"CMC CARRIES THE DAY" - Christian McCaffrey's 23-point anchor performance</p>
                  <p><strong>Winner Analysis:</strong> ankithe got excellent performance from QB Jayden Daniels and Deebo Samuel. Benefited from consistent scoring from the rest of the starting lineup with Christian McCaffrey remaining the ultimate fantasy anchor.</p>
                  <p><strong>Loser Analysis:</strong> abhiu's team underperformed expectations even with Lamar Jackson's elite game. This team will need to find scoring from other positions to support the elite QB.</p>
                </div>

                <div className="matchup-result">
                  <h4>pranavj20 (127.94) def. SahitReddi (106.87)</h4>
                  <p className="matchup-tagline">"JEFFERSON JETS PAST" - Justin Jefferson's steady leadership in a low-scoring win</p>
                  <p><strong>Winner Analysis:</strong> pranavj20 squeezed out a win with solid contributions from Puka Nacua and Sutton. Overcoming a donut from the injured Xavier Worthy is very impressive.</p>
                  <p><strong>Loser Analysis:</strong> SahitReddi's star-studded roster of Bijan Robinson, Tyreek Hill, and Joe Burrow failed to deliver. This team has championship potential but needs to find their rhythm.</p>
                </div>

                <div className="matchup-result">
                  <h4>taahakm (109.13) def. swahili28 (83.32)</h4>
                  <p className="matchup-tagline">"CHASE CHOKES: Ja'Marr's 4.6-Point Disaster Dooms Championship Dreams"</p>
                  <p><strong>Winner Analysis:</strong> taahakm managed the lowest winning score of the week but got solid production from Baker Mayfield keeping the team afloat.</p>
                  <p><strong>Loser Analysis:</strong> swahili28 had a nightmare week with just 83 points. Ja'Marr Chase and Nico Collins severely underperformed.</p>
                </div>

                <div className="sidebar-story">
                  <h3>🎭 MICKEY OF THE WEEK AWARD</h3>
                  <p><strong>Winner: taahakm</strong></p>
                  <p>Congratulations to taahakm for achieving what many thought impossible: winning a fantasy football matchup while actively trying to lose. With a pathetic 109.13 points - the lowest winning total of the week.</p>
                  <p>Started BOTH Detroit RBs (Montgomery AND Gibbs) – That's not diversification, that's putting all your eggs in one basket and then dropping the basket!</p>
                  <p><strong>The Math of Shame:</strong> taahakm's 109 points would have lost to literally every other team except swahili28 and akhilmetukuru.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="team-analysis">
            <h2 className="section-headline">🏆 Power Rankings (Post-Week 1)</h2>
            
            <div className="power-rankings-section">
              <h3>Tier 1: The Early Juggernauts</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>1. abhishekD (1-0, 166 PF)</h4>
                  <p><strong>Strengths:</strong> Elite QB-RB-TE core, explosive scoring potential</p>
                  <p><strong>Concerns:</strong> WR depth relies heavily on rookies and unproven commodities</p>
                  <p><strong>Week 1 Performance:</strong> Dominant victory showcasing championship-level ceiling</p>
                </div>
                
                <div className="team-card">
                  <h4>2. roshik (1-0, 154 PF)</h4>
                  <p><strong>Strengths:</strong> Dual RB1 setup with Barkley/Williams, excellent WR depth</p>
                  <p><strong>Concerns:</strong> Reliance on the risky Kyler Murray/Marvin Harrison stack</p>
                  <p><strong>Week 1 Performance:</strong> Convincing win with multiple players contributing</p>
                </div>
              </div>

              <h3>Tier 2: Strong Contenders</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>3. kulkdaddy47 (1-0, 152 PF)</h4>
                  <p><strong>Strengths:</strong> Mahomes-Kelce stack, elite TE depth, proven veterans</p>
                  <p><strong>Concerns:</strong> Aging skill position players, limited upside plays</p>
                  <p><strong>Week 1 Performance:</strong> Methodical victory showing championship experience</p>
                </div>
                
                <div className="team-card">
                  <h4>4. ankithe (1-0, 140 PF)</h4>
                  <p><strong>Strengths:</strong> CMC anchor, promising QB, emerging WR talent</p>
                  <p><strong>Concerns:</strong> Heavy reliance on injury-prone players, inconsistent depth</p>
                  <p><strong>Week 1 Performance:</strong> Solid win but needs more explosive weeks</p>
                </div>
                
                <div className="team-card">
                  <h4>5. audumula (0-1, 137 PF)</h4>
                  <p><strong>Strengths:</strong> Josh Allen elite ceiling, solid RB depth, CeeDee Lamb explosive upside</p>
                  <p><strong>Concerns:</strong> Boom-or-bust WR corps, defense/kicker streaming issues</p>
                  <p><strong>Week 1 Performance:</strong> Unlucky loss despite strong total - promising signs</p>
                </div>
              </div>

              <h3>Tier 3: Middle of the Pack</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>6. pranavj20 (1-0, 127 PF)</h4>
                  <p><strong>Strengths:</strong> Justin Jefferson game-changer, solid veteran RBs</p>
                  <p><strong>Concerns:</strong> QB uncertainty, limited depth scoring</p>
                  <p><strong>Week 1 Performance:</strong> Gutsy win but low total among winners</p>
                </div>
                
                <div className="team-card">
                  <h4>7. pranav4789 (0-1, 132 PF)</h4>
                  <p><strong>Strengths:</strong> Elite receiving duo in ARSB/Meyers, Tight end depth with Kittle/Warren</p>
                  <p><strong>Concerns:</strong> Thin at RB, inconsistent depth</p>
                  <p><strong>Week 1 Performance:</strong> Good total but faced tough matchup</p>
                </div>
                
                <div className="team-card">
                  <h4>8. abhiu (0-1, 123 PF)</h4>
                  <p><strong>Strengths:</strong> Lamar Jackson ceiling, promising rookie assets</p>
                  <p><strong>Concerns:</strong> Unproven rookie-heavy roster, inconsistent veterans</p>
                  <p><strong>Week 1 Performance:</strong> Disappointing output from elite QB talent</p>
                </div>
                
                <div className="team-card">
                  <h4>9. taahakm (1-0, 109 PF)</h4>
                  <p><strong>Strengths:</strong> Baker Mayfield + Mike Evans reliability</p>
                  <p><strong>Concerns:</strong> Low ceiling across most positions, limited explosive plays, Ken Walker</p>
                  <p><strong>Week 1 Performance:</strong> Managed win despite underwhelming total</p>
                </div>
              </div>

              <h3>Tier 4: On Shaky Ground</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>10. SahitReddi (0-1, 106 PF)</h4>
                  <p><strong>Strengths:</strong> Elite roster talent that should rebound, Bijan Robinson upside</p>
                  <p><strong>Concerns:</strong> Massive underperformance from multiple stars, chemistry issues</p>
                  <p><strong>Week 1 Performance:</strong> Alarming 106 points given roster quality - needs immediate bounceback</p>
                </div>
                
                <div className="team-card">
                  <h4>11. swahili28 (0-1, 83 PF)</h4>
                  <p><strong>Strengths:</strong> When healthy, elite WR talent with Chase/Collins</p>
                  <p><strong>Concerns:</strong> Ja'Marr Chase's 4.60 pts disaster, multiple position failures</p>
                  <p><strong>Week 1 Performance:</strong> Season-threatening 83 points - needs a full 180</p>
                </div>
                
                <div className="team-card">
                  <h4>12. akhilmetukuru (0-1, 102 PF)</h4>
                  <p><strong>Strengths:</strong> A.J. Brown bounce-back potential, Jonathan Taylor upside</p>
                  <p><strong>Concerns:</strong> Multiple key players failed to produce, aging roster concerns</p>
                  <p><strong>Week 1 Performance:</strong> 102 points unacceptable given talent level</p>
                </div>
              </div>
            </div>
          </div>

          <div className="week-preview">
            <h2 className="section-headline">🔮 Week 2 Matchup Preview</h2>
            
            <div className="preview-section">
              <h3>🔥 Marquee Matchups</h3>
              <div className="matchup-preview" style={{backgroundColor: '#f9f9f9', border: '2px solid #000', borderRadius: '4px', padding: '10px', margin: '10px 0'}}>
                <h4>audumula vs abhishekD</h4>
                <p><strong>Key Storylines:</strong> Revenge game for audumula after a tough Week 1 loss. Can they slow down the league's highest-scoring offense?</p>
                <p><strong>X-Factors:</strong> Josh Allen vs Jalen Hurts in an elite QB showdown. CeeDee Lamb needs to bounce back for audumula.</p>
                <p><strong>Prediction:</strong> High-scoring affair with abhishekD's depth giving them the edge.</p>
              </div>
              
              <div className="matchup-preview" style={{backgroundColor: '#f9f9f9', border: '2px solid #000', borderRadius: '4px', padding: '10px', margin: '10px 0'}}>
                <h4>roshik vs taahakm</h4>
                <p><strong>Key Storylines:</strong> High-powered offense meets opportunistic low scorer. Can taahakm's lightning strike twice?</p>
                <p><strong>X-Factors:</strong> Saquon Barkley's workload vs Detroit backfield committee production.</p>
                <p><strong>Prediction:</strong> roshik should handle business easily, but stranger things have happened.</p>
              </div>

              <h3>⚖️ Even Battles</h3>
              <div className="matchup-preview" style={{backgroundColor: '#f9f9f9', border: '2px solid #000', borderRadius: '4px', padding: '10px', margin: '10px 0'}}>
                <h4>ankithe vs SahitReddi</h4>
                <p><strong>Key Storylines:</strong> Two teams with championship-level talent looking to establish dominance.</p>
                <p><strong>X-Factors:</strong> Christian McCaffrey vs Bijan Robinson in an elite RB battle. Joe Burrow needs to show up for SahitReddi.</p>
                <p><strong>Prediction:</strong> Coin flip game that could go either way - expect high scoring.</p>
              </div>
              
              <div className="matchup-preview" style={{backgroundColor: '#f9f9f9', border: '2px solid #000', borderRadius: '4px', padding: '10px', margin: '10px 0'}}>
                <h4>swahili28 vs akhilmetukuru</h4>
                <p><strong>Key Storylines:</strong> Battle of the Week 1 disappointments. Loser could be in serious trouble.</p>
                <p><strong>X-Factors:</strong> Between Ja'Marr Chase and A.J. Brown, let's see who bounces back better.</p>
                <p><strong>Prediction:</strong> Desperation game - expect both teams to show significant improvement.</p>
              </div>

              <h3>🎯 Trap Games</h3>
              <div className="matchup-preview" style={{backgroundColor: '#f9f9f9', border: '2px solid #000', borderRadius: '4px', padding: '10px', margin: '10px 0'}}>
                <h4>kulkdaddy47 vs pranav4789</h4>
                <p><strong>Key Storylines:</strong> Strong contender faces scrappy underdog with nothing to lose.</p>
                <p><strong>X-Factors:</strong> Mahomes-Kelce connection vs Amon-Ra St. Brown + Jameson Williams</p>
                <p><strong>Prediction:</strong> kulkdaddy47 should win, but pranav4789 has upset potential.</p>
              </div>
              
              <div className="matchup-preview" style={{backgroundColor: '#f9f9f9', border: '2px solid #000', borderRadius: '4px', padding: '10px', margin: '10px 0'}}>
                <h4>abhiu vs pranavj20</h4>
                <p><strong>Key Storylines:</strong> Two teams with similar performances last week but production coming from different position groups.</p>
                <p><strong>X-Factors:</strong> Lamar Jackson's rushing floor vs Justin Jefferson's ceiling</p>
                <p><strong>Prediction:</strong> pranavj20 puts together the league's highest score in a huge bounce back performance.</p>
              </div>
            </div>
          </div>
          
          <div className="final-assessment">
            <h2 className="section-headline">Final Assessment</h2>
            <p className="assessment-text">
              The league appears wide open after Week 1, with several championship-caliber teams showing their potential 
              while others need to bounce back quickly. Week 2 will be crucial for establishing early-season momentum!
            </p>
            <p className="assessment-text">
              Fantasy football's beautiful chaos was on full display in Week 1 - from abhishekD's dominant 166-point 
              performance to swahili28's nightmare 83-point showing. The season is young, but patterns are already emerging.
            </p>
            <p className="assessment-text">
              Remember, it's not about how you start - it's about how you finish. Every team still has a path to the 
              championship, but some paths just got a lot more challenging after Week 1.
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
  );
};

export default Week1Newsletter;