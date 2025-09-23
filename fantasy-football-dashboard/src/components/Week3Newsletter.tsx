import React from 'react';

const Week3Newsletter: React.FC = () => {
  return (
    <div className="newsletter-archive">
      <div className="newspaper-container">
        <div className="newspaper-header">
          <div className="newspaper-masthead">
            <h1 className="newspaper-title">AMBERWOOD FANTASY TIMES</h1>
            <div className="newspaper-subtitle">The Premier Source for Fantasy Football News & Analysis</div>
            <div className="newspaper-meta">
              <span className="edition">Week 3 Edition</span>
              <span className="date">September 2025</span>
              <span className="price">FREE</span>
            </div>
          </div>
        </div>

        <div className="newspaper-content">
          <div className="main-story">
            <h2 className="headline">Week 3 Recap & Week 4 Preview</h2>
            <div className="byline">By the Office of the Commissioner</div>

            <div className="center-image" style={{marginBottom: '30px', textAlign: 'center', width: '100%'}}>
              <div style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'inline-block', maxWidth: '700px', width: '100%'}}>
                <img src="/IMG_3635.WEBP" alt="Week 3 Highlights" style={{width: '100%', maxWidth: '680px', height: 'auto', border: '2px solid #333', borderRadius: '4px'}} />
                <div className="draft-caption" style={{fontSize: '12px', fontStyle: 'italic', textAlign: 'center', marginTop: '10px'}}>
                  Anudeep's woes continue. The king takes one step forward and two steps back
                </div>
              </div>
            </div>

            <div className="story-layout">
              <div className="story-column">
                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>🌟 Week 3 Summary</h3>
                <p>Week 3 was the week of dramatic swings and perfect records, as pranavj20 remained the league's only undefeated team while several championship contenders suffered shocking defeats.</p>

                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>📊 Week 3 Matchup Recap</h3>

                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>🔥 Statement Victories</h3>

                <div className="matchup-result">
                  <h4>"JEFFERSON JUSTIFIED: Pranav Jain's Perfect Season Continues" pranavj20 (158.32) def. ankithe (125.37)</h4>
                  <p><strong>Winner Analysis:</strong> pranavj20's 158 points were powered by a balanced attack. The trade acquisition of Lamar Jackson is paying massive dividends as this team looks unstoppable at 3-0.</p>
                  <p><strong>Loser Analysis:</strong> ankithe's 125 points were anchored by CMC's consistent 24.00 points, but it wasn't enough against the league's hottest team. This loss drops them from undefeated status but they remain dangerous.</p>
                </div>

                <div className="matchup-result">
                  <h4>"KING HURTS RETURNS: Abhishek Bounces Back in Style" abhishekD (156.59) def. kulkdaddy47 (127.36)</h4>
                  <p><strong>Winner Analysis:</strong> abhishekD's massive 156-point explosion represents the perfect bounce-back after Week 2's disaster. Jalen Hurts' masterclass in combination with 37.25 points from Vikings DST is an uphill battle for anyone to overcome.</p>
                  <p><strong>Loser Analysis:</strong> kulkdaddy47's 127 points show decent production, but they faced a motivated abhishekD team hungry for redemption. The championship experience couldn't overcome the opponent's desperation.</p>
                </div>

                <div className="matchup-result">
                  <h4>"SUN GOD SHINES AGAIN: ARSB Powers Another Victory" pranav4789 (139.82) def. audumula (90.32)</h4>
                  <p><strong>Winner Analysis:</strong> pranav4789's 139 points were driven by Amon-Ra St. Brown's excellent 20.70-point performance - his second strong game in three weeks. This team's ceiling remains among the league's highest.</p>
                  <p><strong>Loser Analysis:</strong> audumula's catastrophic 90 points represent their worst performance of the season. Multiple position groups failed simultaneously, creating a perfect storm of underperformance. With injuries littering the roster from top to bottom, the team will have to make some changes quickly</p>
                </div>
              </div>

              <div className="story-column">
                <h3 style={{fontSize: '20px', textDecoration: 'underline'}}>⚔️ Competitive Battles</h3>

                <div className="matchup-result">
                  <h4>"UPSET SPECIAL: Akhil Finally Breaks Through" akhilmetukuru (151.15) def. taahakm (135.42)</h4>
                  <p><strong>Winner Analysis:</strong> akhilmetukuru's 151 points represent their season-high and first victory! After two tough losses, this team finally put together a complete performance when they needed it most. The eagles WR duo really carried Akhil to a much needed win</p>
                  <p><strong>Loser Analysis:</strong> taahakm's 135 points would have won several other matchups, but they faced a desperate opponent playing their best game. The 2-0 magic finally ran out.</p>
                </div>

                <div className="matchup-result">
                  <h4>"BARKLEY'S BATTLE: Roshik Edges Past Sahil" roshik (126.16) def. swahili28 (114.94)</h4>
                  <p><strong>Winner Analysis:</strong> roshik's 126 points show steady, if unspectacular, production. Kyren Williams anchored this victory with consistent ground game production.</p>
                  <p><strong>Loser Analysis:</strong> swahili28's 115 points continue their frustrating inconsistency. After Week 2's 176-point explosion, this team can't find their rhythm.</p>
                </div>

                <div className="matchup-result">
                  <h4>"DAMAGE CONTROL: Sahit Survives Abhiram's Struggles" SahitReddi (125.57) def. abhiu (75.67)</h4>
                  <p><strong>Winner Analysis:</strong> SahitReddi's 125 points finally get them in the win column. Facing the league's lowest scorer made this a must-win game they couldn't afford to lose.</p>
                  <p><strong>Loser Analysis:</strong> abhiu's season-worst 75.67 points represent the trade aftermath disaster. Without Lamar Jackson, this team is struggling to find consistent production at any position.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="team-analysis">
            <h2 className="section-headline">🏆 Power Rankings (Post-Week 3)</h2>

            <div className="power-rankings-section">
              <h3>Tier 1: Championship Elite</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>1. pranavj20 (3-0, 428 PF)</h4>
                  <p><strong>Strengths:</strong> Perfect record, Lamar Jackson trade paying off, clutch performances in big games</p>
                  <p><strong>Concerns:</strong> Justin Jefferson's quiet 12.50 pts shows even stars can disappoint</p>
                  <p><strong>Week 3 Performance:</strong> Survived battle of undefeateds - championship mettle showing</p>
                </div>

                <div className="team-card">
                  <h4>2. abhishekD (2-1, 416 PF)</h4>
                  <p><strong>Strengths:</strong> Derrick Henry bouncing back (10.70 pts), explosive ceiling (156 pts), clutch factor</p>
                  <p><strong>Concerns:</strong> Week 2 disaster shows floor concerns, consistency questions remain</p>
                  <p><strong>Week 3 Performance:</strong> Perfect revenge game - this team is dangerous when motivated</p>
                </div>

                <div className="team-card">
                  <h4>3. ankithe (2-1, 437 PF)</h4>
                  <p><strong>Strengths:</strong> Highest points for in league, CMC's reliable 24.00 pts, balanced scoring</p>
                  <p><strong>Concerns:</strong> First loss shows vulnerability, dependent on CMC staying healthy</p>
                  <p><strong>Week 3 Performance:</strong> Competitive loss to perfect team - still elite tier</p>
                </div>

                <div className="team-card">
                  <h4>4. pranav4789 (2-1, 433 PF)</h4>
                  <p><strong>Strengths:</strong> Second-highest points for, ARSB's 20.70 pts consistency, explosive upside</p>
                  <p><strong>Concerns:</strong> Young QB development, defensive consistency needed</p>
                  <p><strong>Week 3 Performance:</strong> Dominant 139-point victory shows championship potential</p>
                </div>
              </div>

              <h3>Tier 2: Playoff Contenders</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>5. roshik (2-1, 383 PF)</h4>
                  <p><strong>Strengths:</strong> Steady production, proven veterans, good record in close games</p>
                  <p><strong>Concerns:</strong> Lower ceiling than other contenders, needs explosive weeks</p>
                  <p><strong>Week 3 Performance:</strong> Workmanlike 126-point win - gets the job done</p>
                </div>

                <div className="team-card">
                  <h4>6. taahakm (2-1, 378 PF)</h4>
                  <p><strong>Strengths:</strong> Still strong overall record, clutch gene activated in past weeks</p>
                  <p><strong>Concerns:</strong> First loss shows ceiling limitations, luck may be running out</p>
                  <p><strong>Week 3 Performance:</strong> Solid 135 points but faced superior opponent</p>
                </div>
              </div>

              <h3>Tier 3: Bubble Teams</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>7. akhilmetukuru (1-2, 382 PF)</h4>
                  <p><strong>Strengths:</strong> Season-high 151 points shows ceiling potential, finally got first win</p>
                  <p><strong>Concerns:</strong> Took three weeks to find rhythm, consistency questions remain</p>
                  <p><strong>Week 3 Performance:</strong> Breakthrough victory - momentum building</p>
                </div>

                <div className="team-card">
                  <h4>8. kulkdaddy47 (1-2, 381 PF)</h4>
                  <p><strong>Strengths:</strong> Championship experience, solid overall points total</p>
                  <p><strong>Concerns:</strong> 1-2 record despite decent production, tough schedule showing</p>
                  <p><strong>Week 3 Performance:</strong> Decent 127 points but faced motivated opponent</p>
                </div>

                <div className="team-card">
                  <h4>9. swahili28 (1-2, 374 PF)</h4>
                  <p><strong>Strengths:</strong> Week 2's 176 points shows elite ceiling when hitting</p>
                  <p><strong>Concerns:</strong> Boom-or-bust consistency, can't find reliable weekly floor</p>
                  <p><strong>Week 3 Performance:</strong> Disappointing 115 points after massive Week 2</p>
                </div>
              </div>

              <h3>Tier 4: Rebuild Mode</h3>
              <div className="teams-grid">
                <div className="team-card">
                  <h4>10. audumula (1-2, 363 PF)</h4>
                  <p><strong>Strengths:</strong> Some bright spots in previous weeks, veteran leadership</p>
                  <p><strong>Concerns:</strong> Season-worst 90 points shows major floor problems</p>
                  <p><strong>Week 3 Performance:</strong> Catastrophic collapse - needs immediate fixes</p>
                </div>

                <div className="team-card">
                  <h4>11. SahitReddi (1-2, 355 PF)</h4>
                  <p><strong>Strengths:</strong> Finally got first win, decent talent on roster</p>
                  <p><strong>Concerns:</strong> Still lowest in points for among 1-2 teams, inconsistent stars</p>
                  <p><strong>Week 3 Performance:</strong> Survived against struggling opponent</p>
                </div>

                <div className="team-card">
                  <h4>12. abhiu (0-3, 309 PF)</h4>
                  <p><strong>Strengths:</strong> Nowhere to go but up, potential trade deadline buyer</p>
                  <p><strong>Concerns:</strong> Winless record, trade aftermath showing, season-low 75 points</p>
                  <p><strong>Week 3 Performance:</strong> Trade disaster fully realized - major roster overhaul needed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mickey-award">
            <h2 className="section-headline">🍀 Mickey of the Week Award (Lucky Charm Edition)</h2>

            <div className="award-section">
              <h3>"Winner": SahitReddi (Sahit) - The Fortunate One</h3>
              <p>Sometimes fantasy football isn't about having the best lineup - it's about having the best timing. SahitReddi takes home this week's Mickey Award not for embarrassment, but for catching the fantasy equivalent of finding a $20 bill on the sidewalk. With 125.57 points, they managed to secure their first victory of the season by facing the only team having a worse week than them.</p>

              <div className="collapse-stats">
                <h4>The Lucky Break Down:</h4>
                <ul>
                  <li>125.57 points - A perfectly average score that would normally result in a loss</li>
                  <li>Faced abhiu's season-low 75.67 points - The only team in the league they could beat this week</li>
                  <li>Won by 49.90 points - Made their mediocre performance look dominant</li>
                  <li>First victory of the season - Finally broke through when it mattered most</li>
                </ul>

                <h4>Why This is Peak Luck:</h4>
                <ul>
                  <li>This 125-point performance would have lost to literally every other team this week</li>
                  <li>abhiu's 75-point disaster was so bad it made SahitReddi look like championship contenders</li>
                  <li>Perfect timing to face a team in complete meltdown mode</li>
                  <li>Sometimes you don't need to play well, you just need your opponent to play worse</li>
                </ul>

                <h4>The Fortunate Timing:</h4>
                <ul>
                  <li>Week 1: Lost to ankithe (123 vs 171) - faced a powerhouse</li>
                  <li>Week 2: Lost to ankithe (124 vs 171) - faced the same powerhouse again</li>
                  <li>Week 3: Beat abhiu (126 vs 76) - finally faced someone having a worse day</li>
                </ul>

                <p>This Mickey Award comes with a rabbit's foot keychain and a reminder that sometimes the fantasy football gods smile upon those who wait for their opponents to implode.</p>
                <p>Previous Mickey Awards: Given to teams that forgot football existed (still would have been more competitive than abhiu this week).</p>
              </div>
            </div>
          </div>

          <div className="season-superlatives">
            <h2 className="section-headline">🏅 Season Superlatives (Through Week 3)</h2>

            <div className="award-section">
              <h3>🎯 "Mr. Reliable" Award - ankithe (Ankith)</h3>
              <h4>For Most Consistent Elite Performance</h4>
              <p>Despite suffering their first loss in Week 3, ankithe earns the Mr. Reliable award for delivering the most consistent championship-level production through three weeks. With the league's highest points for (437) and Christian McCaffrey anchoring their lineup with performances of 23.20, 22.70, and 24.00 points, this team has shown they can be counted on week after week.</p>

              <div className="stats-breakdown">
                <h4>The Numbers:</h4>
                <ul>
                  <li>437 total points (league-leading average of 145.7 per week)</li>
                  <li>CMC's consistency: Never below 22 points in any week</li>
                  <li>2-1 record with their only loss coming to the perfect team</li>
                  <li>Smallest variance in weekly scoring among top teams</li>
                </ul>
                <p><em>"While others have explosive weeks followed by disasters, ankithe just keeps grinding out elite performances. That's championship DNA."</em></p>
              </div>
            </div>

            <div className="award-section">
              <h3>🎢 "Mr. Boom or Bust" Award - abhishekD (Abhishek)</h3>
              <h4>For Most Dramatic Weekly Swings</h4>
              <p>Nobody embodies the wild ride of fantasy football quite like abhishekD. From league-leading highs to league-worst lows, this team has given their fanbase (and opponents) more heart attacks than a McDonald's convention. The 72-point swing between weeks represents the most dramatic fantasy football rollercoaster in league history.</p>

              <div className="stats-breakdown">
                <h4>The Chaos:</h4>
                <ul>
                  <li>Week 1: 166.03 points (League Leader)</li>
                  <li>Week 2: 93.64 points (League Basement)</li>
                  <li>Week 3: 156.59 points (Statement Victory)</li>
                  <li>Point Range: 72.95 points between highest and lowest weeks</li>
                  <li>Derrick Henry Swings: 29.20 → 1.30 → 10.70 points</li>
                </ul>
                <p><em>"If you want predictable, don't draft abhishekD's team. If you want entertainment and potential championship upside, this is your squad."</em></p>
              </div>
            </div>

            <div className="award-section">
              <h3>🏅 "Comeback Player of the Year" Award - pranavj20 (Pranav Jain)</h3>
              <h4>For Most Dramatic Season-Over-Season Improvement</h4>
              <p>From the ashes of a catastrophic 2024 start rises pranavj20, delivering the most remarkable turnaround in league history. After suffering through an 0-3 nightmare start last season with embarrassingly low scoring, this team has completely reinvented itself into an undefeated powerhouse.</p>

              <div className="stats-breakdown">
                <h4>The Remarkable Transformation:</h4>
                <ul>
                  <li>2024 Disaster: 0-3 record, 319 points (106.3 avg) - league's biggest disappointment</li>
                  <li>2025 Dominance: 3-0 record, 428 points (142.7 avg) - league's only perfect team</li>
                  <li>Net Improvement: +36.4 points per week, +3 wins through same span</li>
                  <li>Point Swing: 109-point improvement over 3 weeks - unprecedented turnaround</li>
                </ul>
                <p><em>"This isn't just improvement - this is a complete franchise transformation. From laughingstock to league leader in one offseason."</em></p>
              </div>
            </div>
          </div>

          <div className="name-changes">
            <h2 className="section-headline">🎭 Fresh Start Chronicles: The Name Change Brigade</h2>
            <p>Four teams changed their names this season, hoping for better fantasy karma</p>

            <div className="rebranding-section">
              <h3>🔄 The Rebranding Revolution</h3>
              <div className="name-change-list">
                <p><strong>"Tudh Pushin' P" (Abhishek):</strong> Banking on Jalen Hurts' tush push reliability - seeking consistency after boom-bust performances</p>
                <p><strong>"Treylor Swift" (Anudeep):</strong> Creative triple-wordplay (DeAndre Swift + Trey McBride + Taylor Swift) trying to "shake off" that 90-point disaster</p>
                <p><strong>"Drake N' Bake" (Pranav P):</strong> Fully committing to Drake Maye's development. Like baking, this team is banking on elite rookies that may take time before they reach full potential</p>
                <p><strong>"Skatte-Bo Show" (Abhiram):</strong> Embracing the youth movement with Cam Skattebo + Bo Nix – and a new QB running the show</p>
              </div>
              <p><strong>The Lesson:</strong> Changing your team name won't change your record, but sometimes a fresh identity can provide the psychological boost needed for better decision-making going forward.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week3Newsletter;