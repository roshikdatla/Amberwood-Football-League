import React from 'react';
import { activeSeason } from '../config/seasons';
import {
  bestValues,
  biggestReaches,
  draftTrends,
  finalAssessment,
  positionalRankings,
  powerRankings,
  teamProfiles,
} from '../data/draftNewsletter2026';

const CurrentSeasonNewsletterArchive: React.FC = () => {
  return (
    <div className="newsletter-archive">
      <div className="draft-issue-newsletter nytimes-draft-newsletter">
        <div className="newspaper-container">
          <div className="newspaper-header">
            <div className="newspaper-masthead">
              <h1 className="newspaper-title">The Amberwood Times</h1>
              <div className="newspaper-subtitle">
                A broadsheet account of football panic, hope, and keeper receipts
              </div>
              <div className="newspaper-meta">
                <span className="edition">Sports Tuesday | {activeSeason.label}</span>
                <span className="date">August 2026</span>
                <span className="price">Draft Special</span>
              </div>
            </div>
          </div>

          <div className="newspaper-content">
            <div className="main-story">
              <h2 className="headline">A League of Contenders, Every One Certain This Is the Year</h2>
              <div className="byline">
                By the Amberwood Sports Desk | 2026 Preseason Draft Recap
              </div>

              <div className="story-layout">
                <div className="story-column">
                  <p className="lead-paragraph">
                    The 2026 Amberwood draft is in the books, the keeper
                    receipts are laminated, and every manager has already found
                    a completely reasonable path to the championship. The league
                    entered a new season with old scars, fresh optimism, and
                    enough confidence in the real 2026 rookie class to power an
                    entire Sunday slate.
                  </p>
                  <p>
                    The opening headline belongs to Pranav J, whose Puka Nacua
                    keeper and CeeDee Lamb selection turned the wide receiver
                    room into a weekly broadcast emergency. Ankith and Anudeep
                    are right behind with different formulas: Ankith brings star
                    power and upside, while Anudeep is trying to control the
                    line of scrimmage with the league&apos;s nastiest RB room.
                  </p>
                  <p>
                    But this is Amberwood. The 2024 Jackson&apos;s Jets title run
                    came from 7-7 territory, and the 2025 Nico de Gallo
                    championship came from an 8-6 team that caught fire when it
                    mattered. The model gets the pregame show. The managers get
                    the season.
                  </p>
                </div>

                <div className="story-column">
                  <h3>Draft Board Sirens</h3>
                  <p>
                    Wide receiver became the main event. Quarterbacks slid. Tight
                    end caused a mini gold rush. The true 2026 rookie run began
                    with Jeremiyah Love at 3.01, then gathered speed with Carnell
                    Tate, Jadarian Price, and Jordyn Tyson.
                  </p>
                  <p>
                    Among running backs and receivers taken in the first 10
                    rounds, the value board loved Roshik grabbing Chris Godwin
                    in the ninth, Abhiram landing DK Metcalf in the eighth, and
                    Roshik adding Alec Pierce in the eighth. The reaches were
                    mostly upside bets, the kind of picks that either disappear
                    quietly or become a victory-lap text in October.
                  </p>
                  <p>
                    Historical comp for the room: part 1999 Rams, part 2007
                    Patriots, part fantasy manager group chat at 1:14 AM. Nobody
                    is calm. Everybody is undefeated. This is exactly how it
                    should feel.
                  </p>
                  <p>
                    The trade market created two draft rooms inside one league.
                    Some managers moved up to stack premium picks and hunt stars;
                    Pranav J, Abhishek, and Pranav P traded back for extra shots
                    across the third, fourth, and fifth rounds. The season will
                    settle Amberwood&apos;s newest argument: concentrated star power
                    or middle-round volume.
                  </p>
                </div>
              </div>
            </div>

            <div className="team-analysis">
              <h2 className="section-headline">Top Reaches & Value Picks</h2>
              <p className="draft-table-note">
                FantasyPros PPR ADP | Rounds 1-10 | RB/WR only | Keepers excluded
              </p>
              <div className="story-layout draft-results-layout">
                <div className="story-column">
                  <h3>Top 5 Biggest Reaches</h3>
                  <table className="newspaper-data-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Manager</th>
                        <th>Player</th>
                        <th>Pick</th>
                        <th>FP ADP</th>
                        <th>Reach</th>
                      </tr>
                    </thead>
                    <tbody>
                      {biggestReaches.map((pick) => (
                        <tr key={`${pick.rank}-${pick.player}`}>
                          <td>{pick.rank}</td>
                          <td>{pick.manager}</td>
                          <td>{pick.player}</td>
                          <td>{pick.pick}</td>
                          <td>{pick.adpRank}</td>
                          <td>+{pick.delta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="story-column">
                  <h3>Top 5 Value Picks</h3>
                  <table className="newspaper-data-table value-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Manager</th>
                        <th>Player</th>
                        <th>Pick</th>
                        <th>FP ADP</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bestValues.map((pick) => (
                        <tr key={`${pick.rank}-${pick.player}`}>
                          <td>{pick.rank}</td>
                          <td>{pick.manager}</td>
                          <td>{pick.player}</td>
                          <td>{pick.pick}</td>
                          <td>{pick.adpRank}</td>
                          <td>+{pick.delta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="team-analysis">
              <h2 className="section-headline">Draft Trends</h2>
              <div className="trend-newspaper-grid">
                {draftTrends.map((trend) => (
                  <div className="trend-newspaper-card" key={trend.title}>
                    <h3>{trend.title}</h3>
                    <p>{trend.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="team-analysis">
              <h2 className="section-headline">Positional Power Rankings</h2>
              <p className="draft-table-note positional-ranking-note">
                FantasyPros PPR weighted room scores | Flex ranks the best
                remaining RB, WR, and TE options after core starters are filled
              </p>
              <div className="position-rankings-scroll">
                <table className="newspaper-data-table position-rankings-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>RB Room</th>
                      <th>WR Room</th>
                      <th>Flex Depth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positionalRankings.map((row) => (
                      <tr key={row.rank}>
                        <td>{row.rank}</td>
                        <td>{row.rb}</td>
                        <td>{row.wr}</td>
                        <td>{row.flex}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="team-analysis">
              <h2 className="section-headline">Preseason Power Rankings</h2>
              <div className="power-newspaper-grid">
                {powerRankings.map((team) => (
                  <div className="power-newspaper-row" key={team.manager}>
                    <span>{team.rank}</span>
                    <div>
                      <strong>{team.manager}</strong>
                      <p className="power-ranking-slogan">{team.headline}</p>
                    </div>
                    <em>{team.grade}</em>
                  </div>
                ))}
              </div>
            </div>

            <div className="team-analysis">
              <h2 className="section-headline">How Every Team Wins The Title</h2>
              <div className="teams-grid draft-teams-grid">
                {teamProfiles.map((team) => (
                  <div className="team-card draft-team-card" key={team.manager}>
                    <h3>
                      #{team.rank} {team.manager}
                    </h3>
                    <div className="draft-grade-line">
                      <span>Keeper: {team.keeperGrade}</span>
                      <span>Draft: {team.draftGrade}</span>
                    </div>
                    <p>
                      <strong>Strength:</strong> {team.strength}
                    </p>
                    <p>
                      <strong>Weakness:</strong> {team.weakness}
                    </p>
                    <p className="championship-headline">
                      <span>Championship Headline</span>
                      <strong>{team.headline}</strong>
                    </p>
                    <p>{team.storyline}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="final-assessment">
              <h2 className="section-headline">Final Assessment</h2>
              {finalAssessment.map((tier) => (
                <p className="assessment-text" key={tier.title}>
                  <strong>{tier.title}:</strong> {tier.teams}. {tier.body}
                </p>
              ))}
              <p className="assessment-text">
                Pranav J is the preseason favorite, Ankith has the flashiest
                breakout portfolio, Anudeep owns the RB trenches, and Sahil is
                still the defending champ until somebody takes the belt. The
                2026 Amberwood season is officially open for business.
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

export default CurrentSeasonNewsletterArchive;
