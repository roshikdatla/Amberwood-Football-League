import React, { useState } from 'react';

const NewsletterArchive: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="newsletter-archive">
      {!showContent ? (
        <div className="coming-soon-container">
          <div className="coming-soon-content">
            <h1>📰 Newsletter Archive</h1>
            <h2>Coming Soon!</h2>
            <p>Our weekly fantasy football newsletter will be available here soon.</p>
            <p>Stay tuned for in-depth analysis, trade recommendations, and league drama!</p>
          </div>
        </div>
      ) : (
        <div className="newspaper-container">
        <div className="newspaper-header">
          <div className="newspaper-masthead">
            <h1 className="newspaper-title">AMBERWOOD FANTASY TIMES</h1>
            <div className="newspaper-subtitle">The Premier Source for Fantasy Football News & Analysis</div>
            <div className="newspaper-meta">
              <span className="edition">Week 14 Edition</span>
              <span className="date">December 2024</span>
              <span className="price">FREE</span>
            </div>
          </div>
        </div>

        <div className="newspaper-content">
          <div className="main-story">
            <h2 className="headline">The King Looks to Reclaim His Crown</h2>
            <div className="byline">By Fantasy Sports Desk | Sports Editor</div>
            
            <div className="story-layout">
              <div className="story-column">
                <p className="lead-paragraph">
                  After a tumultuous midseason that saw multiple contenders rise and fall, 
                  the former champion finds himself in an unexpected position - fighting 
                  tooth and nail for a playoff spot in what many expected to be a 
                  coronation season.
                </p>
                
                <p>
                  The defending champion, who dominated last season with a record-breaking 
                  offensive output, now sits precariously in the middle of the pack as 
                  Week 14 approaches. Injuries to key players and unexpected breakout 
                  performances from rival managers have created the most competitive 
                  playoff race in league history.
                </p>
                
                <p>
                  "Nobody expected this level of parity," said league commissioner during 
                  our exclusive interview. "We've got six teams realistically competing 
                  for four playoff spots, and the defending champ is right in the thick 
                  of it."
                </p>
              </div>
              
              <div className="image-placeholder">
                <img src="/king-crown.png" alt="The King" className="newspaper-photo" />
                <div className="photo-caption">
                  The defending champion sits on his throne, but his crown feels heavier 
                  than ever as challengers close in during the final weeks of the regular season.
                </div>
              </div>
              
              <div className="story-column">
                <p>
                  What makes this story even more compelling is the emergence of several 
                  dark horse candidates who have quietly assembled formidable rosters 
                  through savvy waiver wire pickups and strategic trades.
                </p>
                
                <p>
                  The current standings show just a few points separating the playoff 
                  contenders, with head-to-head matchups in the final weeks likely to 
                  determine who advances to the postseason tournament.
                </p>
                
                <p>
                  League analysts predict this could be the most exciting finish in the 
                  seven-year history of the Amberwood Fantasy Football League. With 
                  star players returning from injury and rookies making their mark, 
                  anything can happen in these crucial final games.
                </p>
                
                <div className="sidebar-story">
                  <h3>INSIDE THIS EDITION</h3>
                  <ul>
                    <li>Waiver Wire Gems: Hidden Treasures Still Available</li>
                    <li>Trade Deadline Recap: Winners and Losers</li>
                    <li>Injury Report: Who's Coming Back for Playoffs?</li>
                    <li>Manager Spotlight: Rookie Making Waves</li>
                    <li>Power Rankings: Final Regular Season Update</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="newspaper-footer">
            <div className="footer-line"></div>
            <div className="newspaper-tagline">
              "Your Source for Fantasy Football Excellence Since 2018"
            </div>
          </div>
        </div>
        <div className="back-to-coming-soon">
          <button 
            className="back-btn"
            onClick={() => setShowContent(false)}
          >
            ← Back to Coming Soon
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default NewsletterArchive;