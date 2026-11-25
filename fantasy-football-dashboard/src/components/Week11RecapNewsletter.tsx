import React from 'react';
import {
  formatScore, getRecapTeam, getStarter, mickeyOfTheWeek, recapSource,
  playoffPicture, week11Overview, week11PowerRankings, week11Recaps, week12Previews,
} from '../data/week11Recap2026';
import './Week1RecapNewsletter.css';
import './Week3RecapNewsletter.css';

const InlineSources: React.FC<{ sources?: { label: string; url: string }[] }> = ({ sources }) => sources?.length ? (
  <span className="week-one-inline-sources">{sources.map((source, index) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" title={source.label} aria-label={`Source: ${source.label}`}>[{index + 1}]</a>)}</span>
) : null;

const editionDate = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York',
}).format(new Date(recapSource.capturedAt));

const Week11RecapNewsletter: React.FC = () => {
  const mickeyTeam = getRecapTeam(mickeyOfTheWeek.rosterId);

  return (
    <main className="week-one-issue week-three-issue" id="issue-top">
      <div className="week-one-paper">
        <header className="week-one-masthead">
          <a href="/newsletters" className="week-one-archive-link">← All editions</a>
          <p className="week-one-kicker">Big scores. Short memories. Long receipts.</p>
          <h1>The Amberwood Times</h1>
          <div className="week-one-edition">
            <span>2026 · Week 11 recap</span>
            <span>Week 12 pregame edition</span>
            <strong>The Week 12 card awaits</strong>
          </div>
        </header>

        <nav className="week-one-contents" aria-label="Newsletter sections">
          <a href="#overview"><span>01</span> Overview</a>
          <a href="#recaps"><span>02</span> Matchup recaps</a>
          <a href="#mickey"><span>03</span> Mickey of the Week</a>
          <a href="#power-rankings"><span>04</span> Power rankings</a>
          <a href="#week-twelve"><span>05</span> Week 12 preview</a>
        </nav>

        <section className="week-one-overview" id="overview" aria-labelledby="overview-title">
          <p className="week-one-kicker">01 / Overview</p>
          <h2 id="overview-title">{week11Overview.headline}</h2>
          <p className="week-one-lead">{week11Overview.lead}</p>
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
            {week11Recaps.map(recap => <a key={recap.matchupId} href={`#recap-${recap.matchupId}`}>
              {recap.teamIds.map(id => getRecapTeam(id).manager).join(' / ')}
            </a>)}
          </nav>
          <div className="week-one-recaps">
            {week11Recaps.map(recap => {
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
          <p>Three weeks left in the regular season. The records have receipts, but which lineups can still cash them in? These season outlooks weigh scoring, current personnel, and the road ahead. Arrows show movement from the Week 10 rankings.</p>
          <ol className="week-one-rankings">
            {week11PowerRankings.map((ranking, index) => {
              const team = getRecapTeam(ranking.rosterId);
              const change = ranking.previousRank - (index + 1);
              return <li className="week-one-ranking" key={ranking.rosterId}>
                <div className="week-one-rank-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                <div className="week-one-rank-content">
                  <div className="week-one-rank-meta"><span>{ranking.tier}</span><strong className={change > 0 ? 'rank-up' : change < 0 ? 'rank-down' : ''}>{change > 0 ? `↑ ${change}` : change < 0 ? `↓ ${Math.abs(change)}` : '—'} <span>{change === 0 ? 'No change' : `from #${ranking.previousRank}`}</span></strong></div>
                  <h3><span className="week-one-sr-only">Rank {index + 1}: </span>{team.teamName}</h3>
                  <p className="week-one-team-meta">{team.manager} · {team.record}</p>
                  <p className="week-three-outlook">{ranking.outlook}<InlineSources sources={ranking.sources} /></p>
                </div>
              </li>;
            })}
          </ol>
        </section>

        <section className="week-one-section" id="week-twelve" aria-labelledby="week-twelve-title">
          <div className="week-one-section-heading"><p className="week-one-kicker">05 / Week 12 matchup preview</p><h2 id="week-twelve-title">The next challenge.<br />No hiding places.</h2></div>
          <p>All six opening-week matchups are back. Keep the receipts, check the active lineups, and enjoy six picks the league will absolutely remember if they go wrong.</p>
          <div className="week-one-previews">
            {week12Previews.map(preview => {
              const teams = preview.teamIds.map(getRecapTeam);
              return <article className="week-one-preview" key={preview.matchupId}>
                <p className="week-one-kicker">Week 12 · Matchup {preview.matchupId}</p>
                <h3>{preview.billing}</h3>
                <div className="week-one-preview-teams">{teams.map(team => <div key={team.rosterId}><div><strong>{team.teamName}</strong><span>{team.manager}</span></div></div>)}</div>
                <p>{preview.story}</p>
                <h4>Keep your eyes on</h4><p>{preview.key}<InlineSources sources={preview.sources} /></p>
                <div className="week-one-pick"><strong>Our pick: {getRecapTeam(preview.pickId).manager}</strong><p>{preview.pickReason}</p></div>
              </article>;
            })}
          </div>
        </section>

        <aside className="week-one-dashboard-callout">
          <div><p className="week-one-kicker">Still arguing? Pull up the numbers.</p><h2>Beyond the Boxscore.</h2><p>Who’s carrying the lineup? Where are the points coming from? Take a closer look at the season so far.</p></div>
        </aside>
        <footer className="week-one-footer">
          <p>Scores and lineup data: <a href={recapSource.sources.week11} target="_blank" rel="noreferrer">Sleeper Week 11</a> · <a href={recapSource.sources.week12} target="_blank" rel="noreferrer">Week 12 schedule</a>. Editorial cutoff: November 25, 2026, after Week 11. Recaps preserve historical Week 11 lineups; Week 12 picks are forecasts and availability can change. Final score data retrieved {editionDate}, subject to stat corrections. Numbered links cite supporting reports.</p>
          <p>Rankings and Week 12 picks are editorial forecasts. Playoff rules follow the league’s stated format; ranking movement is measured against the published Week 10 edition.</p>
          <p>Availability notes use dated NFL reports and Sleeper’s November 25 <a href={recapSource.sources.rosters} target="_blank" rel="noreferrer">roster</a> and <a href={recapSource.sources.players} target="_blank" rel="noreferrer">player-status</a> snapshot. Current tags do not establish when an injury occurred or guarantee a return; historical Week 11 starters remain separate from current rosters.</p>
          <div><a href="/newsletters/week10-recap">Read the Week 10 recap</a><a href="#issue-top">Back to top ↑</a></div>
        </footer>
      </div>
    </main>
  );
};

export default Week11RecapNewsletter;
