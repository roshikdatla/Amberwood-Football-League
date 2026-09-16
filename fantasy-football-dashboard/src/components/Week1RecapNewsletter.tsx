import React from 'react';
import {
  formatScore, getRecapTeam, getStarter, recapSource, week1PowerRankings,
  week1Recaps, week2Previews, nflConnections, week2Availability,
} from '../data/week1Recap2026';
import './Week1RecapNewsletter.css';

const Week1RecapNewsletter: React.FC = () => (
  <main className="week-one-issue" id="issue-top">
    <div className="week-one-paper">
      <header className="week-one-masthead">
        <a href="/newsletters" className="week-one-archive-link">← All editions</a>
        <p className="week-one-kicker">The league. The history. The consequences.</p>
        <h1>The Amberwood Times</h1>
        <div className="week-one-edition">
          <span>2026 · Week 1 recap</span>
          <time dateTime="2026-09-16">September 16, 2026</time>
          <strong>Rivalry Week</strong>
        </div>
      </header>

      <nav className="week-one-contents" aria-label="Newsletter sections">
        <a href="#overview"><span>01</span> Overview</a>
        <a href="#recaps"><span>02</span> Matchup recaps</a>
        <a href="#power-rankings"><span>03</span> Power rankings</a>
        <a href="#week-two"><span>04</span> Week 2 preview</a>
      </nav>

      <section className="week-one-overview" id="overview" aria-labelledby="overview-title">
        <p className="week-one-kicker">01 / Overview</p>
        <h2 id="overview-title">The margins were small.<br />The stakes were personal.</h2>
        <p className="week-one-lead">A captain answered on the final day. A Monday-night charge came within reach of rewriting a rivalry. The defending champion scored 160 and lost. Amberwood’s opening week demanded more than a good lineup—it demanded that somebody survive the opponent who cared most about beating them.</p>
        <p>Anudeep’s 164.26 beat Sahil by 4.26. Roshik held off Taaha by 5.76 after an early deficit, a Sunday comeback and Kenneth Walker’s extraordinary Monday response. Those two games alone made the difference between celebration and a week spent replaying lineup decisions.</p>
        <p>Elsewhere, GarVeen’s new partnership announced itself with a win, Pranav J extended his hold on the Pranav Bowl, Ankith gave Sahit a result he cannot explain away, and Abhiram handled Aditya comfortably. The first wins have been earned. Now comes the harder part: proving which of them describe the season ahead.</p>
        <dl className="week-one-numbers">
          <div><dt>Closest finish</dt><dd>4.26 <small>points</small></dd><span>Anudeep over Sahil</span></div>
          <div><dt>High score</dt><dd>164.26</dd><span>Made in Jahmyrica</span></div>
          <div><dt>Biggest margin</dt><dd>73.34 <small>points</small></dd><span>Ankith over Sahit</span></div>
        </dl>
      </section>

      <section className="week-one-section" id="recaps" aria-labelledby="recaps-title">
        <div className="week-one-section-heading"><p className="week-one-kicker">02 / Matchups recap</p><h2 id="recaps-title">Six rivalries. Six verdicts.</h2></div>
        <nav className="week-one-matchup-links" aria-label="Jump to a matchup recap">
          {week1Recaps.map(recap => <a key={recap.matchupId} href={`#recap-${recap.matchupId}`}>
            {getRecapTeam(recap.winnerId).manager} / {getRecapTeam(recap.loserId).manager}
          </a>)}
        </nav>
        <div className="week-one-recaps">
          {week1Recaps.map(recap => {
            const winner = getRecapTeam(recap.winnerId);
            const loser = getRecapTeam(recap.loserId);
            const player = getStarter(recap.winnerId, recap.xFactorId);
            const nfl = nflConnections[recap.matchupId];
            return (
              <article className="week-one-recap" key={recap.matchupId} id={`recap-${recap.matchupId}`}>
                <header>
                  <div className="week-one-card-meta"><span>{recap.billing}</span><b>Final</b></div>
                  <h3 className="week-one-versus">{winner.manager} <span>vs</span> {loser.manager}</h3>
                  <div className="week-one-scoreboard" aria-label="Final score">
                    {[winner, loser].map((team, index) => <div className={index === 0 ? 'week-one-winner' : ''} key={team.rosterId}>
                      <div><strong>{team.teamName}</strong><span>{team.manager} · {team.record}{index === 0 ? ' · Winner' : ''}</span></div>
                      <b>{formatScore(team.score)}</b>
                    </div>)}
                  </div>
                  <div className="week-one-result-note"><strong>{formatScore(winner.score - loser.score)}-point margin</strong><span>{recap.series}</span></div>
                </header>
                <p>{recap.summary}</p>
                <div className="week-one-xfactor">
                  <span className="week-one-kicker">The X-factor</span>
                  <h4>{player.name} <span>{formatScore(player.points)} pts</span></h4>
                  <p>{recap.xFactor}</p>
                </div>
                <div className="week-one-lowlight"><h4>The lowlight</h4><p>{recap.lowlight}</p></div>
                {nfl && <aside className="week-one-nfl-note"><h4>The NFL connection</h4><p>{nfl.text}</p><div>{nfl.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div></aside>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="week-one-section" id="power-rankings" aria-labelledby="rankings-title">
        <div className="week-one-section-heading"><p className="week-one-kicker">03 / Power rankings</p><h2 id="rankings-title">One week of evidence.<br />A season still to earn.</h2></div>
        <p>These are the Sports Desk’s season-outlook rankings, weighing the preseason roster assessment against Week 1 production, depth and current availability. They are not the standings. Movement is measured against the draft edition; one close loss does not erase a championship case.</p>
        <ol className="week-one-rankings">
          {week1PowerRankings.map((ranking, index) => {
            const team = getRecapTeam(ranking.rosterId);
            const change = ranking.previousRank - (index + 1);
            return <li className="week-one-ranking" key={ranking.rosterId}>
              <div className="week-one-rank-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <div className="week-one-rank-content">
                <div className="week-one-rank-meta"><span>{ranking.tier}</span><strong className={change > 0 ? 'rank-up' : change < 0 ? 'rank-down' : ''}>{change > 0 ? `↑ ${change}` : change < 0 ? `↓ ${Math.abs(change)}` : '—'} <span>{change === 0 ? 'No change' : `from #${ranking.previousRank}`}</span></strong></div>
                <h3><span className="week-one-sr-only">Rank {index + 1}: </span>{team.teamName}</h3>
                <p className="week-one-team-meta">{team.manager} · {team.record} · {formatScore(team.score)} in Week 1</p>
                <p>{ranking.outlook}</p>
                <details><summary>What to watch</summary><p>{ranking.watch}</p></details>
              </div>
            </li>;
          })}
        </ol>
      </section>

      <section className="week-one-section" id="week-two" aria-labelledby="week-two-title">
        <div className="week-one-section-heading"><p className="week-one-kicker">04 / Week 2 matchup preview</p><h2 id="week-two-title">The next opponent<br />has been watching.</h2></div>
        <p>Rivalry Week’s results now become Week 2’s pressure. Two matchups pair unbeaten teams; two pair teams seeking their first win. Picks below are editorial leans, with lineups and availability still subject to change.</p>
        <details className="week-one-availability"><summary>Before kickoff: NFL developments to watch</summary><ul>{week2Availability.map(note => <li key={note.url}>{note.text} <a href={note.url} target="_blank" rel="noreferrer">{note.label} ↗</a></li>)}</ul></details>
        <div className="week-one-previews">
          {week2Previews.map(preview => {
            const teams = preview.teamIds.map(getRecapTeam);
            return <article className="week-one-preview" key={preview.matchupId}>
              <p className="week-one-kicker">Week 2 · Matchup {preview.matchupId}</p>
              <h3>{preview.billing}</h3>
              <div className="week-one-preview-teams">{teams.map(team => <div key={team.rosterId}><div><strong>{team.teamName}</strong><span>{team.manager}</span></div><b>{team.record}</b></div>)}</div>
              <p>{preview.story}</p>
              <h4>The matchup within the matchup</h4><p>{preview.key}</p>
              <div className="week-one-pick"><strong>Sports Desk lean: {getRecapTeam(preview.pickId).manager}</strong><p>{preview.pickReason}</p></div>
            </article>;
          })}
        </div>
      </section>

      <aside className="week-one-dashboard-callout">
        <div><p className="week-one-kicker">The numbers behind the noise</p><h2>Beyond the Boxscore is back.</h2><p>Explore this season’s position totals, lineup efficiency and early team standouts.</p></div>
        <a href="/beyond-the-boxscore">Open the 2026 dashboard →</a>
      </aside>
      <footer className="week-one-footer">
        <p>Scores and lineup data: <a href={recapSource.sources.week1} target="_blank" rel="noreferrer">Sleeper Week 1</a> · <a href={recapSource.sources.week2} target="_blank" rel="noreferrer">Week 2 schedule</a>. Results reflect the September 16 snapshot. Injury labels and prospective lineups may change. League accounts of the rivalry-week timeline were supplied by the commissioner.</p>
        <div><a href="/newsletters/week1">Read the original Rivalry Week preview</a><a href="#issue-top">Back to top ↑</a></div>
      </footer>
    </div>
  </main>
);

export default Week1RecapNewsletter;
