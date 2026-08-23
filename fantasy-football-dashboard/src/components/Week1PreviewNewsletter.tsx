import React from 'react';
import {
  rivalryPositions,
  rivalryPreviews,
  RivalryPreview,
} from '../data/rivalryWeek2026';

const formatPoints = (points: number) => points.toFixed(2);

const getSeriesLabel = (rivalry: RivalryPreview) => {
  if (rivalry.sideA.wins === rivalry.sideB.wins) {
    return `Tied ${rivalry.sideA.wins}–${rivalry.sideB.wins}`;
  }

  const leader = rivalry.sideA.wins > rivalry.sideB.wins ? rivalry.sideA : rivalry.sideB;
  const trailer = leader === rivalry.sideA ? rivalry.sideB : rivalry.sideA;
  return `${leader.manager} ${leader.wins}–${trailer.wins}`;
};

const Week1PreviewNewsletter: React.FC = () => {
  return (
    <div className="newsletter-archive">
      <div className="draft-issue-newsletter nytimes-draft-newsletter rivalry-week-newsletter">
        <div className="newspaper-container">
          <div className="newspaper-header">
            <div className="newspaper-masthead">
              <h1 className="newspaper-title">The Amberwood Times</h1>
              <div className="newspaper-subtitle">
                A broadsheet account of football panic, hope, and keeper receipts
              </div>
              <div className="newspaper-meta">
                <span className="edition">Week 1 Edition | 2026 Season</span>
                <span className="date">September 2026</span>
                <span className="price">Rivalry Week</span>
              </div>
            </div>
          </div>

          <div className="newspaper-content">
            <div className="main-story rivalry-cover-story">
              <p className="rivalry-eyebrow">Old Scores. New Season. Bragging Rights Pending.</p>
              <h2 className="headline">History Has a Side. Week 1 Could Change It.</h2>
              <div className="byline">
                By the Amberwood Sports Desk | Data from every league meeting, 2022–2025
              </div>

              <div className="story-column rivalry-intro-copy">
                  <p className="lead-paragraph">
                    The slate wastes no time: Amberwood opens 2026 with Rivalry Week,
                    sending six familiar foes straight back into unfinished business.
                    Across twenty-six prior meetings, there is one deadlocked series,
                    two active multi-game streaks, and no shortage of receipts.
                  </p>
                  <p>
                    These numbers reach far beyond opening day. The Amberwood Sports
                    Desk went back through every scored regular-season and playoff
                    meeting in the league&apos;s connected Sleeper history—every comeback,
                    blowout, and postseason gut punch.
                  </p>
                  <p>
                    Now the tape is queued: series records, scoring averages, margins,
                    streaks, every past result, and the position groups that have swung
                    these matchups. Let the next chapter begin.
                  </p>
              </div>
            </div>

            <section className="team-analysis rivalry-matchups-section">
              <h2 className="section-headline">The Week 1 Rivalry Card</h2>

              <div className="rivalry-matchup-stack">
                {rivalryPreviews.map((rivalry) => (
                  <article className="matchup-preview rivalry-profile" key={rivalry.id}>
                    <div className="rivalry-card-heading">
                      <span>Matchup {rivalry.id}</span>
                      <strong>{rivalry.billing}</strong>
                      <span>{rivalry.meetings} prior meetings</span>
                    </div>

                    <h3
                      className="rivalry-versus-title"
                      aria-label={`${rivalry.sideA.teamName} versus ${rivalry.sideB.teamName}`}
                    >
                      <span>{rivalry.sideA.teamName}</span>
                      <b aria-hidden="true">vs</b>
                      <span>{rivalry.sideB.teamName}</span>
                    </h3>
                    <span className="rivalry-summary-label">Rivalry summary</span>
                    <p className="rivalry-deck">{rivalry.deck}</p>

                    <div
                      className="rivalry-series-score"
                      aria-label={`Series score: ${getSeriesLabel(rivalry)}`}
                    >
                      <span>Series</span>
                      <strong>{getSeriesLabel(rivalry)}</strong>
                    </div>

                    <div className="rivalry-stat-strip">
                      <div>
                        <span>Average score</span>
                        <strong className="rivalry-score-pair">
                          <span><b>{rivalry.sideA.manager}</b> {formatPoints(rivalry.sideA.averageScore)}</span>
                          <span><b>{rivalry.sideB.manager}</b> {formatPoints(rivalry.sideB.averageScore)}</span>
                        </strong>
                      </div>
                      <div>
                        <span>Average margin</span>
                        <strong>{formatPoints(rivalry.averageMargin)}</strong>
                      </div>
                      <div>
                        <span>Current streak</span>
                        <strong>{rivalry.currentStreak}</strong>
                      </div>
                    </div>

                    <div className="rivalry-last-meeting">
                      <span>Last meeting</span>
                      <strong>
                        {rivalry.lastMeeting.season} Week {rivalry.lastMeeting.week}:&nbsp;
                        {rivalry.sideA.manager} {formatPoints(rivalry.lastMeeting.scoreA)},&nbsp;
                        {rivalry.sideB.manager} {formatPoints(rivalry.lastMeeting.scoreB)}
                      </strong>
                      <em>{rivalry.lastMeeting.winner} won</em>
                    </div>

                    <h4 className="rivalry-table-title">Iconic Player Performances</h4>
                    <div className="rivalry-iconic-grid">
                      {[rivalry.sideA, rivalry.sideB].map((side) => {
                        const performance = side.iconicPerformance;
                        return (
                          <article className="rivalry-iconic-card" key={side.manager}>
                            <span>{side.manager} | {side.teamName}</span>
                            <h5>{performance.name} — {formatPoints(performance.points)} points</h5>
                            <p>{performance.story}</p>
                          </article>
                        );
                      })}
                    </div>

                    <h4 className="rivalry-table-title">Historical Points by Position</h4>
                    <div className="rivalry-table-scroll">
                      <table className="newspaper-data-table rivalry-position-table">
                        <thead>
                          <tr>
                            <th>Position</th>
                            <th>{rivalry.sideA.manager}</th>
                            <th>{rivalry.sideB.manager}</th>
                            <th>Historical edge</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rivalryPositions.map((position) => {
                            const aPoints = rivalry.sideA.positionAverages[position];
                            const bPoints = rivalry.sideB.positionAverages[position];
                            const leader = aPoints === bPoints
                              ? 'Even'
                              : aPoints > bPoints
                                ? rivalry.sideA.manager
                                : rivalry.sideB.manager;
                            return (
                              <tr key={position}>
                                <td data-label="Position">{position}</td>
                                <td data-label={rivalry.sideA.manager}>{formatPoints(aPoints)}</td>
                                <td data-label={rivalry.sideB.manager}>{formatPoints(bPoints)}</td>
                                <td data-label="Historical edge">{leader}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <h4 className="rivalry-table-title">Complete Head-to-Head Ledger</h4>
                    <div className="rivalry-table-scroll">
                      <table className="newspaper-data-table rivalry-history-table">
                        <thead>
                          <tr>
                            <th>Season</th>
                            <th>Week</th>
                            <th>{rivalry.sideA.manager}</th>
                            <th>{rivalry.sideB.manager}</th>
                            <th>Winner</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rivalry.history.map((game) => (
                            <tr key={`${game.season}-${game.week}`}>
                              <td data-label="Season">{game.season}</td>
                              <td data-label="Week">
                                {game.week}{game.isPlayoff && <span className="playoff-star"> ★</span>}
                              </td>
                              <td data-label={rivalry.sideA.manager}>{formatPoints(game.scoreA)}</td>
                              <td data-label={rivalry.sideB.manager}>{formatPoints(game.scoreB)}</td>
                              <td data-label="Winner">{game.winner}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="rivalry-playoff-key">★ Championship-bracket playoff matchup</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="final-assessment rivalry-final-word">
              <h2 className="section-headline">The Final Word Before Kickoff</h2>
              <p className="assessment-text">
                Anudeep and Sahil bring the league&apos;s finest photo-finish history.
                Abhishek brings the longest active streak. Ankith and Sahit bring the
                deepest series. The two Pranavs bring a tied record and a playoff
                receipt. Aditya and Abhiram bring the memory of 340.94 combined points.
                Roshik and Taaha bring the argument between wins and underlying scoring.
              </p>
              <p className="assessment-text">
                That is the beauty of this Week 1 card: every matchup arrives with a
                different kind of pressure. The old scores cannot win the game, but
                they make sure nobody can pretend it is just another opener.
              </p>
              <p className="rivalry-data-credit">
                Source: Sleeper league 1354521952483573760 and its connected prior
                seasons. Calculations use final team scores and starting-lineup player
                points from all completed matchups through the 2025 season.
              </p>
              <p className="rivalry-back-link">
                <a className="read-btn" href="/newsletters">Back to all newsletters</a>
              </p>
            </div>

            <div className="newspaper-footer">
              <div className="footer-line"></div>
              <div className="newspaper-tagline">
                Your Source for Amberwood Football Since the Mighty Bears Era
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week1PreviewNewsletter;
