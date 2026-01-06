import React from 'react';

interface NewsletterArchiveProps {
  showArchive?: boolean;
}

const NewsletterArchive: React.FC<NewsletterArchiveProps> = ({ showArchive = false }) => {
  if (showArchive) {
    return (
      <div className="newsletter-archive-list">
        <div className="archive-header">
          <h1>📰 Newsletter Archive</h1>
          <p>Browse all editions of the Amberwood Fantasy Times</p>
        </div>
        
        <div className="newsletter-grid">
          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/preseason'}>
            <h3>Preseason Edition</h3>
            <p className="newsletter-date">August 2025</p>
            <p className="newsletter-description">Draft coverage and team analysis</p>
            <button className="read-btn">Read Now</button>
          </div>
          
          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week1'}>
            <h3>Week 1 Edition</h3>
            <p className="newsletter-date">September 2025</p>
            <p className="newsletter-description">Fireworks, flops, and first impressions</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week2'}>
            <h3>Week 2 Edition</h3>
            <p className="newsletter-date">September 2025</p>
            <p className="newsletter-description">Comebacks, collapses, and chaos</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week3'}>
            <h3>Week 3 Edition</h3>
            <p className="newsletter-date">September 2025</p>
            <p className="newsletter-description">Momentum shifts and meltdowns</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week4'}>
            <h3>Week 4 Edition</h3>
            <p className="newsletter-date">September 2025</p>
            <p className="newsletter-description">Red October: The Great 2-2 Logjam</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week5'}>
            <h3>Week 5 Edition</h3>
            <p className="newsletter-date">October 2025</p>
            <p className="newsletter-description">Shocks, surges, and shattered dreams</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week6'}>
            <h3>Week 6 Edition</h3>
            <p className="newsletter-date">October 2025</p>
            <p className="newsletter-description">The perfect season falls</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week7'}>
            <h3>Week 7 Edition</h3>
            <p className="newsletter-date">October 2025</p>
            <p className="newsletter-description">CMC goes nuclear & playoff race intensifies</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week8'}>
            <h3>Week 8 Edition</h3>
            <p className="newsletter-date">October 2025</p>
            <p className="newsletter-description">Power shifts and playoff storms brewing</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week9'}>
            <h3>Week 9 Edition</h3>
            <p className="newsletter-date">November 2025</p>
            <p className="newsletter-description">Cardiac finishes and nuclear explosions</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week10'}>
            <h3>Week 10 Edition</h3>
            <p className="newsletter-date">November 2025</p>
            <p className="newsletter-description">Playoff chaos and 172-point explosions</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week11'}>
            <h3>Week 11 Edition</h3>
            <p className="newsletter-date">November 2025</p>
            <p className="newsletter-description">audumula's dominance and playoff picture shakeup</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week12'}>
            <h3>Week 12 Edition</h3>
            <p className="newsletter-date">November 2025</p>
            <p className="newsletter-description">Playoff chaos as kulkdaddy47 dominates</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/week13'}>
            <h3>Week 13 Edition</h3>
            <p className="newsletter-date">December 2025</p>
            <p className="newsletter-description">The Final Regular Season Showdown</p>
            <button className="read-btn">Read Now</button>
          </div>

          <div className="newsletter-card available" onClick={() => window.location.href = '/newsletters/finale'}>
            <h3>Season Finale: 2025 Unwrapped</h3>
            <p className="newsletter-date">January 2026</p>
            <p className="newsletter-description">Complete season recap and championship story</p>
            <button className="read-btn">Read Now</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-archive">
        <div className="newspaper-container">
        <div className="newspaper-header">
          <div className="newspaper-masthead">
            <h1 className="newspaper-title">AMBERWOOD FANTASY TIMES</h1>
            <div className="newspaper-subtitle">The Premier Source for Fantasy Football News & Analysis</div>
            <div className="newspaper-meta">
              <span className="edition">Preseason Edition</span>
              <span className="date">August 2025</span>
              <span className="price">FREE</span>
            </div>
          </div>
        </div>

        <div className="newspaper-content">
          <div className="main-story">
            <h2 className="headline">When Keepers Rule, Strategy Shifts: Fantasy Managers Go All-In on Upside</h2>
            <div className="byline">By the Office of the Commissioner</div>
            
            <div className="large-collage-container">
              <div className="image-collage-horizontal">
                <img src="/536239336_746657801583789_4209499692132568005_n.jpg" alt="Draft Coverage 1" className="collage-photo-horizontal" />
                <img src="/IMG_4349.jpg" alt="Draft Coverage 2" className="collage-photo-horizontal" />
                <img src="/b20d6339b2c5e31b61fd29e9d36bb226.JPEG" alt="Draft Coverage 3" className="collage-photo-horizontal" />
              </div>
              <div className="draft-caption">
                With elite talent locked up as keepers, this year's draft became about finding the next tier of players and gambling on upside. 
                The removal of consensus top players (Puka, Bowers, etc.) from the draft pool created a fascinating dynamic where managers had 
                to pivot strategies entirely.
              </div>
            </div>
            
            <div className="story-layout">
              <div className="story-column">
                <h3>Top 3 Biggest Reaches</h3>
                <ol>
                  <li><strong>Aaron Jones</strong> - #39 (Round 4, Pick 10) - kulkdaddy47<br/>
                  <em>Keeper-Adjusted ADP: ~65th available - Drafted ~26 picks ahead of where he should go</em></li>
                  <li><strong>Breece Hall</strong> - #10 (Round 1, Pick 10) - kulkdaddy47<br/>
                  <em>Keeper-Adjusted ADP: ~25th available - Drafted ~15 picks ahead with injury concerns</em></li>
                  <li><strong>Josh Allen</strong> - #16 (Round 2, Pick 9) - audumula<br/>
                  <em>Keeper-Adjusted ADP: ~28th available - Drafted ~12 picks ahead of adjusted QB market</em></li>
                </ol>

                <h3>Top 3 Highest Value Picks</h3>
                <ol>
                  <li><strong>A.J. Brown</strong> - #12 (Round 1, Pick 12) - akhilmetukuru<br/>
                  <em>Adjusted ADP: ~6th available - With keepers removed, Brown should go much earlier than 12th pick</em></li>
                  <li><strong>Trey McBride</strong> - #28 (Round 3, Pick 4) - audumula<br/>
                  <em>Adjusted ADP: ~20th available - Premium TE option with Brock Bowers kept</em></li>
                  <li><strong>Sam Laporta</strong> - #55 (Round 7, Pick 11) - abhishekD<br/>
                  <em>Adjusted ADP: ~20th available - Top 4 TE option that ended up falling down the board</em></li>
                </ol>
              </div>
              
              <div className="story-column">
                <h3>Key Positional Trends</h3>
                <ul>
                  <li><strong>WR Premium Intensified:</strong> With limited elite WRs available, teams reached aggressively</li>
                  <li><strong>QB Polarization:</strong> Some paid premium for top tier QBs while others punted completely</li>
                  <li><strong>Rookie Gambling:</strong> Heavy investment in rookies to find keeper-level talent for next year</li>
                  <li><strong>TE Scarcity:</strong> With Bowers/Hockenson kept, remaining TEs became more valuable</li>
                </ul>


                <div className="sidebar-story">
                  <h3>INSIDE THIS EDITION</h3>
                  <ul>
                    <li>Complete Team-by-Team Analysis</li>
                    <li>Championship Headlines for All 12 Teams</li>
                    <li>Sleeper Picks That Could Win Leagues</li>
                    <li>X-Factors for Each Roster</li>
                    <li>Final Power Rankings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="team-analysis">
            <h2 className="section-headline">Team-by-Team Championship Breakdown</h2>
            
            <div className="teams-grid">
              <div className="team-card">
                <h3>swahili28 (Sahil)</h3>
                <p><strong>Strength:</strong> Ja'Marr Chase + Nico Collins (kept) forms elite WR1/WR2 combo</p>
                <p><strong>Weakness:</strong> Dak Prescott's inconsistency could limit ceiling</p>
                <p><strong>X-Factor:</strong> James Cook - Bills backfield uncertainty makes him boom-or-bust</p>
                <p><strong>Sleeper:</strong> Mark Andrews - Could bounce back with Lamar Jackson</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Ja'Marr Chase and Nico Collins combine for 3,000+ receiving yards as Dak Prescott has career resurgence.
                </div>
              </div>
              
              <div className="team-card">
                <h3>SahitReddi (Sahit)</h3>
                <p><strong>Strength:</strong> Tyreek Hill, Tee Higgins, Davante Adams trio provides elite depth</p>
                <p><strong>Weakness:</strong> Beyond Bijan Robinson and kept Bucky Irving, RB depth concerning</p>
                <p><strong>X-Factor:</strong> Tyreek Hill - Must return to elite WR1 form</p>
                <p><strong>Sleeper:</strong> Josh Downs - Could emerge as Daniel Jones top target</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Bijan Robinson explodes for 1,400+ rushing yards while the Hill-Higgins-Adams WR rotation proves matchup-proof.
                </div>
              </div>
              
              <div className="team-card">
                <h3>taahakm (Taaha)</h3>
                <p><strong>Strength:</strong> Brian Thomas Jr, Mike Evans, Tetairoa McMillan, and Matthew Golden - 4 WRs that are #1 options</p>
                <p><strong>Weakness:</strong> Relying on Lions backfield provides low ceiling but high floor</p>
                <p><strong>X-Factor:</strong> Tetairoa McMillan - Rookie could emerge as Bryce Young's weapon</p>
                <p><strong>Sleeper:</strong> Dylan Sampson - SEC Offensive Player of the year may be Browns RB1</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Lions backfield dominance as Gibbs and Montgomery combine for 2,500+ yards.
                </div>
              </div>
              
              <div className="team-card">
                <h3>pranavj20 (Pranav Jain)</h3>
                <p><strong>Strength:</strong> Puka Nacua (kept) + Justin Jefferson + Courtland Sutton creates unmatched depth</p>
                <p><strong>Weakness:</strong> Bo Nix sophomore season uncertainty</p>
                <p><strong>X-Factor:</strong> Alvin Kamara - Age and Saints offense concerns</p>
                <p><strong>Sleeper:</strong> TreVeyon Henderson - Patriots rookie RB with explosive preseason</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Jefferson-Nacua combination proves dynamite while Xavier Worthy becomes Chiefs' new Tyreek Hill.
                </div>
              </div>
              
              <div className="team-card">
                <h3>Roshik</h3>
                <p><strong>Strength:</strong> Brock Bowers (kept) provides massive positional advantage</p>
                <p><strong>Weakness:</strong> Marvin Harrison Jr. has upside but lacks proven depth</p>
                <p><strong>X-Factor:</strong> DJ Moore - If he takes "Amon Ra" role in Ben Johnson's offense</p>
                <p><strong>Sleeper:</strong> Zay Flowers - Ravens WR1 could finally take the jump</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Saquon Barkley rushes for 1,600+ yards while Brock Bowers breaks Travis Kelce's single season TE record.
                </div>
              </div>
              
              <div className="team-card">
                <h3>abhiu (Abhiram)</h3>
                <p><strong>Strength:</strong> Lamar Jackson (kept) provides weekly ceiling with rushing upside</p>
                <p><strong>Weakness:</strong> Heavy reliance on Jaxon Smith-Njigba and Travis Hunter as rookie</p>
                <p><strong>X-Factor:</strong> Ashton Jeanty - Rookie RB taken 6th overall must hit immediately</p>
                <p><strong>Sleeper:</strong> Travis Hunter - Two-way player unprecedented fantasy scoring potential</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Ashton Jeanty becomes Offensive Rookie of the Year while Travis Hunter makes history as first two-way fantasy superstar.
                </div>
              </div>
            </div>
            
            <div className="teams-grid">
              <div className="team-card">
                <h3>ankithe (Ankith)</h3>
                <p><strong>Strength:</strong> Malik Nabers (kept) + Ladd McConkey provides emerging young talent</p>
                <p><strong>Weakness:</strong> Christian McCaffrey injury risk leaves thin RB depth</p>
                <p><strong>X-Factor:</strong> Rashee Rice - NFL ruling on suspension will determine value</p>
                <p><strong>Sleeper:</strong> Ricky Pearsall - 49ers rookie WR could emerge with injuries</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Christian McCaffrey stays healthy for full season, rushing for 1,500+ yards while Malik Nabers leads NFL in receiving.
                </div>
              </div>
              
              <div className="team-card">
                <h3>pranav4789 (Pranav P)</h3>
                <p><strong>Strength:</strong> George Kittle + Tyler Warren provides positional advantage when healthy</p>
                <p><strong>Weakness:</strong> Drake Maye/Justin Fields uncertainty could sink roster</p>
                <p><strong>X-Factor:</strong> De'Von Achane - Injury history makes him volatile</p>
                <p><strong>Sleeper:</strong> Jayden Higgins - Texans rookie WR in high-powered offense</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Drake Maye exceeds expectations with Rookie of the Year campaign while George Kittle stays healthy for 17 games.
                </div>
              </div>
              
              <div className="team-card">
                <h3>audumula (Anudeep)</h3>
                <p><strong>Strength:</strong> Josh Allen provides weekly ceiling and safety</p>
                <p><strong>Weakness:</strong> Questionable RB depth with Will Shipley, Joe Mixon, aging D'Andre Swift</p>
                <p><strong>X-Factor:</strong> Cooper Kupp - Health and Seahawks transition</p>
                <p><strong>Sleeper:</strong> Calvin Ridley - Titans veteran with more consistent QB play</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Josh Allen throws for 4,500+ yards while Cooper Kupp stays healthy and returns to being the #1 target.
                </div>
              </div>
              
              <div className="team-card">
                <h3>kulkdaddy47 (Aditya)</h3>
                <p><strong>Strength:</strong> Patrick Mahomes + Brock Purdy provides elite safety and upside</p>
                <p><strong>Weakness:</strong> Breece Hall inconsistency plus aging Aaron Jones</p>
                <p><strong>X-Factor:</strong> Breece Hall - Must return to 2023 elite form</p>
                <p><strong>Sleeper:</strong> Michael Pittman Jr. - Colts WR1 could break out with Daniel Jones</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Breece Hall returns to elite form with 1,400+ total yards while Patrick Mahomes leads Chiefs to another title.
                </div>
              </div>
              
              <div className="team-card">
                <h3>abhishekD (Abhishek)</h3>
                <p><strong>Strength:</strong> Derrick Henry + Chase Brown provides proven production and emerging upside</p>
                <p><strong>Weakness:</strong> Drake London (kept) leads thin group lacking true WR1 upside</p>
                <p><strong>X-Factor:</strong> Derrick Henry - Age vs. Ravens offense efficiency</p>
                <p><strong>Sleeper:</strong> Rome Odunze - Bears WR could emerge as Caleb Williams' favorite</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Derrick Henry defies age with 1,300+ rushing yards while Rome Odunze becomes Caleb Williams' #1 target in Ben Johnson's offense.
                </div>
              </div>
              
              <div className="team-card">
                <h3>akhilmetukuru (Akhil)</h3>
                <p><strong>Strength:</strong> A.J. Brown + Terry McLaurin provides weekly WR1/WR2 production</p>
                <p><strong>Weakness:</strong> Jonathan Taylor bounce-back questions leave thin RB depth</p>
                <p><strong>X-Factor:</strong> Jonathan Taylor - Must return to elite form after injury-plagued seasons</p>
                <p><strong>Sleeper:</strong> Tony Pollard - Titans RB1 with Spears injury and new offense</p>
                <div className="championship-headline">
                  <strong>Championship Headline:</strong> Jonathan Taylor continues elite form with 1,500+ rushing yards while A.J. Brown and DeVonta Smith both eclipse 1,200 receiving yards.
                </div>
              </div>
            </div>
          </div>
          
          <div className="final-assessment">
            <h2 className="section-headline">Final Assessment</h2>
            <p className="assessment-text">
              Managers like Pranav Jain, Sahit Reddi, Sahil Parikh, Taaha Motorwala, and Roshik Datla 
              maximized their keeper advantages by building around them while also adding an elite 1st round talent. 
              They are undoubtedly the favorites heading into the season.
            </p>
            <p className="assessment-text">
              Draft grades and power rankings are merely starting points - once Week 1 kicks off, none of this 
              analysis matters. Fantasy football's beautiful chaos means the team ranked 12th could easily hoist 
              the championship trophy while the "best" draft crumbles under the weight of injuries, busts, and bad luck.
            </p>
            <p className="assessment-text">
              Remember, championships aren't won in August drafts but through 17 weeks of smart waiver wire moves, 
              shrewd trades, lineup decisions, and catching breaks when it matters most. Every single team in this 
              league has a legitimate path to the title - it's just a matter of who executes best once the games begin.
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

export default NewsletterArchive;