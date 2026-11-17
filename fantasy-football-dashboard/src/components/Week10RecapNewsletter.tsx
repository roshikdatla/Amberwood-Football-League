import React from 'react';
import {
  formatScore, getRecapTeam, getStarter, mickeyOfTheWeek, recapSource,
  playoffPicture, week10Overview, week10PowerRankings, week10Recaps, week11Previews,
} from '../data/week10Recap2026';
import './Week1RecapNewsletter.css';
import './Week3RecapNewsletter.css';
import { restOfSeasonPreview, finalStandingsPrediction } from '../data/week10RestOfSeason';
import './Week10RecapNewsletter.css';

const InlineSources: React.FC<{ sources?: { label: string; url: string }[] }> = ({ sources }) => sources?.length ? (
  <span className="week-one-inline-sources">{sources.map((source, index) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" title={source.label} aria-label={`Source: ${source.label}`}>[{index + 1}]</a>)}</span>
) : null;

const editionDate = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York',
}).format(new Date(recapSource.capturedAt));

const Week10RecapNewsletter: React.FC = () => {
  const mickeyTeam = getRecapTeam(mickeyOfTheWeek.rosterId);

  return (
    <main className="week-one-issue week-three-issue" id="issue-top">
      <div className="week-one-paper">
        <header className="week-one-masthead">
          <a href="/newsletters" className="week-one-archive-link">← All editions</a>
          <p className="week-one-kicker">Big scores. Short memories. Long receipts.</p>
          <h1>The Amberwood Times</h1>
          <div className="week-one-edition">
            <span>2026 · Week 10 recap</span>
            <span>Week 11 pregame edition</span>
            <strong>The Week 11 card awaits</strong>
          </div>
        </header>

        <nav className="week-one-contents" aria-label="Newsletter sections">
          <a href="#overview"><span>01</span> Overview</a>
          <a href="#recaps"><span>02</span> Matchup recaps</a>
          <a href="#mickey"><span>03</span> Mickey of the Week</a>
          <a href="#power-rankings"><span>04</span> Power rankings</a>
          <a href="#week-eleven"><span>05</span> Week 11 preview</a>
          <a href="#rest-of-season"><span>06</span> Rest of Season Preview</a>
        </nav>

        <section className="week-one-overview" id="overview" aria-labelledby="overview-title">
          <p className="week-one-kicker">01 / Overview</p>
          <h2 id="overview-title">{week10Overview.headline}</h2>
          <p className="week-one-lead">{week10Overview.lead}</p>
          <figure className="week-one-overview-image week-ten-cover">
            <img src="/week10-recap-cover.jpg" alt="Saaho movie poster with a motorcycle rider amid an explosive action scene." width="1122" height="1402" decoding="async" />
          </figure>
          <aside className="week-three-mickey-card" aria-labelledby="playoff-picture-title">
            <p className="week-one-kicker">The playoff picture / Two different races</p>
            <h3 id="playoff-picture-title">{playoffPicture.headline}</h3>
            {playoffPicture.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <p><strong>Five record berths:</strong> {playoffPicture.topFive}</p>
            <p><strong>Points wildcard, outside that five:</strong> {playoffPicture.wildcard}</p>
          </aside>
        </section>

        <section className="week-one-section" id="recaps" aria-labelledby="recaps-title">
          <div className="week-one-section-heading"><p className="week-one-kicker">02 / Matchups recap</p><h2 id="recaps-title">Roll the highlights.<br />Check the damage.</h2></div>
          <nav className="week-one-matchup-links" aria-label="Jump to a matchup recap">
            {week10Recaps.map(recap => <a key={recap.matchupId} href={`#recap-${recap.matchupId}`}>
              {recap.teamIds.map(id => getRecapTeam(id).manager).join(' / ')}
            </a>)}
          </nav>
          <div className="week-one-recaps">
            {week10Recaps.map(recap => {
              const teams = recap.teamIds.map(getRecapTeam);
              const player = getStarter(recap.xFactorRosterId, recap.xFactorId);
              return (
                <article className="week-one-recap" key={recap.matchupId} id={`recap-${recap.matchupId}`}>
                  <header>
                    <div className="week-one-card-meta"><span>{recap.billing}</span><b>Final</b></div>
                    <h3 className="week-one-versus">{teams[0].manager} <span>vs</span> {teams[1].manager}</h3>
                    <div className="week-one-scoreboard" aria-label="Final score">
                      {teams.map((team, index) => {
                        const isWinner = team.score > teams[1 - index].score;
                        return <div className={isWinner ? 'week-one-winner' : undefined} key={team.rosterId}>
                          <div><strong>{team.teamName}</strong><span>{team.manager} · {team.record}{isWinner ? ' · Winner' : ''}</span></div>
                          <b>{formatScore(team.score)}</b>
                        </div>;
                      })}
                    </div>
                  </header>
                  <p className="week-one-recap-summary">{recap.summary}<InlineSources sources={recap.sources} /></p>
                  <div className="week-one-xfactor">
                    <span className="week-one-kicker">The X-factor</span>
                    <h4>{player.name} <span>{formatScore(player.points)} pts</span></h4>
                    <p>{recap.xFactor}</p>
                  </div>
                  <div className="week-one-lowlight"><h4>The lowlight</h4><p>{recap.lowlight}</p></div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="week-one-section week-three-mickey" id="mickey" aria-labelledby="mickey-title">
          <div className="week-one-section-heading"><p className="week-one-kicker">03 / The schedule’s favorite</p><h2 id="mickey-title">Mickey of The Week</h2></div>
          <article className="week-three-mickey-card" aria-label="Mickey of the Week award">
            <div className="week-three-mickey-topline"><span>A win is a win. Allegedly.</span><span className="week-three-mickey-stamp" aria-hidden="true">Lucky W</span></div>
            <h3>{mickeyOfTheWeek.headline}</h3>
            <p className="week-three-mickey-recipient"><strong>{mickeyTeam.manager}</strong> · {mickeyTeam.teamName}</p>
            <p>{mickeyOfTheWeek.summary}</p>
            <dl className="week-three-mickey-numbers">
              <div><dt>All-play record</dt><dd>{mickeyOfTheWeek.allPlayWins}–{mickeyOfTheWeek.allPlayLosses}</dd></div>
              <div><dt>Scoring rank</dt><dd>#{mickeyOfTheWeek.scoreRank}<small> / 12</small></dd></div>
              <div><dt>Opponent’s rank</dt><dd>#{mickeyOfTheWeek.opponentRank}<small> / 12</small></dd></div>
            </dl>
            <p className="week-three-mickey-explainer">The award goes to the lowest-scoring winner. All-play compares this week’s score against all 11 other teams—not just the scheduled opponent.</p>
            <div className="week-three-mickey-verdict"><h4>The verdict</h4><p>{mickeyOfTheWeek.verdict}</p></div>
          </article>
        </section>

        <section className="week-one-section" id="power-rankings" aria-labelledby="rankings-title">
          <div className="week-one-section-heading"><p className="week-one-kicker">04 / Power rankings</p><h2 id="rankings-title">The long game.<br />Who’s built to last?</h2></div>
          <p>Ten weeks in, the Jet Plane has re-entered the airspace and the Garden has lost three straight. This is an editorial season-outlook board, weighing season production and demonstrated lineup ceiling rather than simply copying records. Arrows compare with the published Week 9 rankings; picks below are forecasts, not guaranteed results.</p>
          <ol className="week-one-rankings">
            {week10PowerRankings.map((ranking, index) => {
              const team = getRecapTeam(ranking.rosterId);
              const change = ranking.previousRank - (index + 1);
              return <li className="week-one-ranking" key={ranking.rosterId}>
                <div className="week-one-rank-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                <div className="week-one-rank-content">
                  <div className="week-one-rank-meta"><span>{ranking.tier}</span><strong className={change > 0 ? 'rank-up' : change < 0 ? 'rank-down' : ''}>{change > 0 ? `↑ ${change}` : change < 0 ? `↓ ${Math.abs(change)}` : '—'} <span>{change === 0 ? 'No change' : `from #${ranking.previousRank}`}</span></strong></div>
                  <h3><span className="week-one-sr-only">Rank {index + 1}: </span>{team.teamName}</h3>
                  <p className="week-one-team-meta">{team.manager} · {team.record}</p>
                  <p className="week-three-outlook">{ranking.outlook}</p>
                </div>
              </li>;
            })}
          </ol>
        </section>

        <section className="week-one-section" id="week-eleven" aria-labelledby="week-eleven-title">
          <div className="week-one-section-heading"><p className="week-one-kicker">05 / Week 11 matchup preview</p><h2 id="week-eleven-title">The next challenge.<br />No hiding places.</h2></div>
          <p>Put the receipts away. Actually, keep them. Here are the next six matchups, the pressure points, and six picks the league will absolutely remember if they go wrong.</p>
          <div className="week-one-previews">
            {week11Previews.map(preview => {
              const teams = preview.teamIds.map(getRecapTeam);
              return <article className="week-one-preview" key={preview.matchupId}>
                <p className="week-one-kicker">Week 11 · Matchup {preview.matchupId}</p>
                <h3>{preview.billing}</h3>
                <div className="week-one-preview-teams">{teams.map(team => <div key={team.rosterId}><div><strong>{team.teamName}</strong><span>{team.manager}</span></div></div>)}</div>
                <p>{preview.story}</p>
                <h4>Keep your eyes on</h4><p>{preview.key}<InlineSources sources={preview.sources} /></p>
                <div className="week-one-pick"><strong>Our pick: {getRecapTeam(preview.pickId).manager}</strong><p>{preview.pickReason}</p></div>
              </article>;
            })}
          </div>
        </section>

        <section className="week-one-section" id="rest-of-season" aria-labelledby="rest-of-season-title">
          <div className="week-one-section-heading"><p className="week-one-kicker">06 / Four weeks. Every route.</p><h2 id="rest-of-season-title">Rest of Season Preview</h2></div>
          <p>Weeks 11–14 are all that remain before the Week 15 playoffs. Five berths go by record, with points breaking ties; the sixth goes to the highest points total outside that five. The win targets below are practical forecasts, not clinches: nine wins is a strong position, while ten guarantees a top-five record berth. A key game is a priority route, not the only mathematically possible route.</p>
          <aside className="week-three-mickey-card"><h3>The other cut line: stay out of the bottom two.</h3><p>For teams that miss the playoffs, finishing in the bottom two means they cannot win the toilet bowl and their best possible finish is ninth. The other four non-playoff teams retain a shot at winning it and the first pick. A team qualifying through the points wildcard is a playoff team, even if its record is near the bottom.</p></aside>
          <div className="week-ten-legend"><span><span aria-hidden="true">★</span> Critical game</span><p>Priority wins or direct seeding / survival swings, not mathematical must-wins. Difficulty is relative to each team after byes.</p></div>
          <nav className="week-ten-team-nav" aria-label="Jump to a team’s remaining schedule">{restOfSeasonPreview.map(item => <a href={`#ros-team-${item.rosterId}`} key={item.rosterId}>{getRecapTeam(item.rosterId).manager}</a>)}</nav>
          <div className="week-one-recaps week-ten-ros-grid">{restOfSeasonPreview.map(item => {
            const team = getRecapTeam(item.rosterId);
            return <article className="week-one-recap week-ten-ros-card" id={`ros-team-${item.rosterId}`} key={item.rosterId} aria-labelledby={`ros-name-${item.rosterId}`}>
              <header className="week-ten-team-header"><div><p className="week-one-kicker">{team.manager} <span className="week-ten-record">{team.record}</span></p><h3 id={`ros-name-${item.rosterId}`}>{team.teamName}</h3></div><div className="week-ten-win-target"><h4>Wins needed</h4><p>{item.winsNeeded}</p></div></header>
              <ol className="week-ten-schedule" aria-label={`${team.manager} remaining opponents`}>{item.schedule.map(game => <li key={game.week} className={game.critical ? 'is-critical' : ''}><a href={`#ros-${item.rosterId}-week-${game.week}`}><strong>W{game.week}{game.critical && <span aria-label="Critical game"> ★</span>}</strong><span>{getRecapTeam(game.opponentId).manager}</span></a></li>)}</ol>
              <h4 className="week-ten-weekly-title">Week-by-week matchup preview</h4>
              <ol className="week-ten-matchups">{item.schedule.map(game => {
                const opponent = getRecapTeam(game.opponentId);
                return <li id={`ros-${item.rosterId}-week-${game.week}`} key={game.week} className={game.critical ? 'is-critical' : ''}>
                  <div className="week-ten-game-top"><span className="week-ten-week">Week {game.week}</span><span className={`week-ten-difficulty difficulty-${game.difficulty.toLowerCase()}`}>{game.difficulty}</span></div>
                  <h5>vs {opponent.manager} <span className="week-ten-opponent-record">{opponent.record}</span></h5>
                  {game.critical && <span className="week-ten-critical-label"><span aria-hidden="true">★</span> Critical game</span>}
                  <p>{game.preview}</p>
                </li>;
              })}</ol>
              <div className="week-ten-bottom-line"><div><h4>The route</h4><p>{item.path}</p></div><div><h4>Seeding / bottom-two stakes</h4><p>{item.bottomTwo}</p></div></div>
            </article>;
          })}</div>
          <p className="week-one-team-meta">Schedule and standings: Sleeper, captured November 17. Roster and injury tags refreshed November 17 (evening update), including the latest player moves. NFL bye weeks: Week 11 ATL/CLE/GB/LAR/NE/SEA; Week 12 none; Week 13 BAL/IND/LV/NYJ; Week 14 ARI/DAL. Difficulty labels are editorial lineup-depth judgments, not simulated point projections. PPG uses the ten completed weeks; current Out/IR tags are not predictions of future availability. Week 12 has no scheduled byes. Future roster moves, injuries and stat corrections can change the race. No team is labeled eliminated solely because of its record. Sources: <a href="https://api.sleeper.app/v1/league/1354521952483573760/rosters" target="_blank" rel="noreferrer">current rosters</a> · <a href="https://www.nfl.com/schedules/2026/by-week/week-11" target="_blank" rel="noreferrer">NFL schedule</a>.</p>
          <aside className="week-three-mickey-card week-ten-final-call" aria-labelledby="week-ten-final-call-title">
            <h3 id="week-ten-final-call-title">Amberwood AI’s Prediction</h3>
            <p>Projected final regular-season standings. Ties assume the current points-for order holds.</p>
            <ol className="week-ten-predicted-standings">{finalStandingsPrediction.map(team => <li key={team.rosterId}><strong>{getRecapTeam(team.rosterId).manager}</strong> — {team.wins}–{team.losses}{team.wildcard && <span> · Points wildcard</span>}</li>)}</ol>
          </aside>
        </section>

        <aside className="week-one-dashboard-callout">
          <div><p className="week-one-kicker">Still arguing? Pull up the numbers.</p><h2>Beyond the Boxscore.</h2><p>Who’s carrying the lineup? Where are the points coming from? Take a closer look at the season so far.</p></div>
        </aside>
        <footer className="week-one-footer">
          <p>Scores and lineup data: <a href={recapSource.sources.week10} target="_blank" rel="noreferrer">Sleeper Week 10</a> · <a href={recapSource.sources.week11} target="_blank" rel="noreferrer">Week 11 schedule</a>. Editorial cutoff: November 17, 2026, after Week 10. Recaps preserve historical Week 10 lineups; Week 11 picks are forecasts and availability can change. Final score data retrieved {editionDate}, subject to stat corrections. Numbered links cite supporting reports.</p>
          <p>Season-outlook rankings and Week 11 picks are editorial judgments based on completed scoring and demonstrated lineup output, not injury-status guarantees or live projections. Playoff and toilet-bowl rules follow the league’s stated format. Prior ranking positions come from the published Week 9 edition.</p>
          <p>Thursday and Monday references use the <a href={recapSource.sources.espn10} target="_blank" rel="noreferrer">ESPN NFL game schedule</a>. Recaps describe completed-game contributions, not archived live lead changes. Scores remain subject to stat corrections.</p>
          <div><a href="/newsletters/week9-recap">Read the Week 9 recap</a><a href="#issue-top">Back to top ↑</a></div>
        </footer>
      </div>
    </main>
  );
};

export default Week10RecapNewsletter;
