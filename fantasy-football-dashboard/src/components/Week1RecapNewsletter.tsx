import React from 'react';
import {
  formatScore, getRecapTeam, getStarter, recapSource, week1PowerRankings,
  week1Recaps, week2Previews, recapReportingSources, previewReportingSources,
} from '../data/week1Recap2026';
import './Week1RecapNewsletter.css';

const InlineSources: React.FC<{ sources?: { label: string; url: string }[] }> = ({ sources }) => sources ? (
  <span className="week-one-inline-sources">{sources.map((source, index) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" title={source.label} aria-label={`Source: ${source.label}`}>[{index + 1}]</a>)}</span>
) : null;

const Week1RecapNewsletter: React.FC = () => (
  <main className="week-one-issue" id="issue-top">
    <div className="week-one-paper">
      <header className="week-one-masthead">
        <a href="/newsletters" className="week-one-archive-link">← All editions</a>
        <p className="week-one-kicker">Big games. Bigger grudges.</p>
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
        <h2 id="overview-title">Now that’s<br />Rivalry Week.</h2>
        <p className="week-one-lead">The defending champ scored 160—and lost. Kenneth Walker went off on Monday night—and it still wasn’t enough. Gary came out of retirement and straight into the win column. If you wanted a gentle start to the season, you picked the wrong league.</p>
        <figure className="week-one-overview-image">
          <img src="/week1-recap-reaction.png" alt="Rivalry Week reaction: a man in sunglasses holding up one hand." width={851} height={362} decoding="async" />
        </figure>
        <dl className="week-one-numbers">
          <div><dt>Closest finish</dt><dd>4.26 <small>points</small></dd><span>Anudeep over Sahil</span></div>
          <div><dt>High score</dt><dd>164.26</dd><span>Made in Jahmyrica</span></div>
          <div><dt>Biggest margin</dt><dd>73.34 <small>points</small></dd><span>Ankith over Sahit</span></div>
        </dl>
      </section>

      <section className="week-one-section" id="recaps" aria-labelledby="recaps-title">
        <div className="week-one-section-heading"><p className="week-one-kicker">02 / Matchups recap</p><h2 id="recaps-title">Roll the highlights.<br />Check the damage.</h2></div>
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
                <p className="week-one-recap-summary">{recap.summary}<InlineSources sources={recapReportingSources[recap.matchupId]} /></p>
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

      <section className="week-one-section" id="power-rankings" aria-labelledby="rankings-title">
        <div className="week-one-section-heading"><p className="week-one-kicker">03 / Power rankings</p><h2 id="rankings-title">Who’s for real?<br />Let’s move the board.</h2></div>
        <p>No, we’re not burying a team for losing with 160. And no, one win does not make anybody a title favorite. We’re taking the draft-day pecking order, adding what we just watched, and asking who can keep this up all season. Arrows show the move from the draft edition. Let the arguments begin.</p>
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
        <div className="week-one-section-heading"><p className="week-one-kicker">04 / Week 2 matchup preview</p><h2 id="week-two-title">Take a breath.<br />Now do it again.</h2></div>
        <p>The top two teams in our rankings go head-to-head. Two games pit unbeaten teams against each other; two more feature teams desperate to avoid 0–2. The victory laps are over. Here’s the next card—and who we’re backing, with lineups and injury news still moving.</p>
        <div className="week-one-previews">
          {week2Previews.map(preview => {
            const teams = preview.teamIds.map(getRecapTeam);
            return <article className="week-one-preview" key={preview.matchupId}>
              <p className="week-one-kicker">Week 2 · Matchup {preview.matchupId}</p>
              <h3>{preview.billing}</h3>
              <div className="week-one-preview-teams">{teams.map(team => <div key={team.rosterId}><div><strong>{team.teamName}</strong><span>{team.manager}</span></div><b>{team.record}</b></div>)}</div>
              <p>{preview.story}</p>
              <h4>Keep your eyes on</h4><p>{preview.key}<InlineSources sources={previewReportingSources[preview.matchupId]} /></p>
              <div className="week-one-pick"><strong>Our pick: {getRecapTeam(preview.pickId).manager}</strong><p>{preview.pickReason}</p></div>
            </article>;
          })}
        </div>
      </section>

      <aside className="week-one-dashboard-callout">
        <div><p className="week-one-kicker">Still arguing? Pull up the numbers.</p><h2>Beyond the Boxscore is back.</h2><p>Who carried the team? Who left points on the bench? Get into the numbers behind the bragging rights.</p></div>
        <a href="/beyond-the-boxscore">Open the 2026 dashboard →</a>
      </aside>
      <footer className="week-one-footer">
        <p>Scores and lineup data: <a href={recapSource.sources.week1} target="_blank" rel="noreferrer">Sleeper Week 1</a> · <a href={recapSource.sources.week2} target="_blank" rel="noreferrer">Week 2 schedule</a>. Results and availability reflect September 16 reporting; lineups and injury labels may change. Numbered links cite the NFL reporting woven into the stories. Rivalry-week timelines and league backstories come from the commissioner.</p>
        <div><a href="/newsletters/week1">Read the original Rivalry Week preview</a><a href="#issue-top">Back to top ↑</a></div>
      </footer>
    </div>
  </main>
);

export default Week1RecapNewsletter;
