import React from 'react';
import {
  editionStatus, formatScore, getRecapTeam, getStarter, recapSource, week2Overview,
  week2PowerRankings, week2Recaps, week3Previews,
} from '../data/week2Recap2026';
import './Week1RecapNewsletter.css';
import './Week2RecapNewsletter.css';

const InlineSources: React.FC<{ sources?: { label: string; url: string }[] }> = ({ sources }) => sources?.length ? (
  <span className="week-one-inline-sources">{sources.map((source, index) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" title={source.label} aria-label={`Source: ${source.label}`}>[{index + 1}]</a>)}</span>
) : null;

const editionDate = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York',
}).format(new Date(recapSource.capturedAt));
const isFinal = String(editionStatus) === 'final';
const isClosingMinute = String(editionStatus) === 'closing-minute';
const isRecap = isFinal || isClosingMinute;
const scoreLabel = isFinal ? 'Final' : isClosingMinute ? 'Week 2 score' : 'Score so far';
const snapshotTime = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit',
  timeZoneName: 'short', timeZone: 'America/New_York',
}).format(new Date(recapSource.capturedAt));

const Week2RecapNewsletter: React.FC = () => (
  <main className="week-one-issue week-two-issue" id="issue-top">
    <div className="week-one-paper">
      <header className="week-one-masthead">
        <a href="/newsletters" className="week-one-archive-link">← All editions</a>
        <p className="week-one-kicker">The hits keep coming.</p>
        <h1>The Amberwood Times</h1>
        <div className="week-one-edition">
          <span>2026 · Week 2 recap</span>
          <time dateTime={recapSource.capturedAt}>{editionDate}</time>
          <strong>{isRecap ? 'Week 2 recap' : 'Live snapshot'}</strong>
        </div>
      </header>

      <nav className="week-one-contents" aria-label="Newsletter sections">
        <a href="#overview"><span>01</span> Overview</a>
        <a href="#recaps"><span>02</span> Matchup recaps</a>
        <a href="#power-rankings"><span>03</span> Power rankings</a>
        <a href="#week-three"><span>04</span> Week 3 preview</a>
      </nav>

      {!isRecap && <p className="week-two-status" role="note"><strong>Snapshot · {snapshotTime}.</strong> Scores and rankings reflect games played so far, not final Week 2 results.</p>}

      <section className="week-one-overview" id="overview" aria-labelledby="overview-title">
        <p className="week-one-kicker">01 / Overview</p>
        <h2 id="overview-title">{week2Overview.headline}</h2>
        <p className="week-one-lead">{week2Overview.lead}</p>
      </section>

      <section className="week-one-section" id="recaps" aria-labelledby="recaps-title">
        <div className="week-one-section-heading"><p className="week-one-kicker">02 / Matchups recap</p><h2 id="recaps-title">Roll the highlights.<br />Check the damage.</h2></div>
        <nav className="week-one-matchup-links" aria-label="Jump to a matchup recap">
          {week2Recaps.map(recap => <a key={recap.matchupId} href={`#recap-${recap.matchupId}`}>
            {recap.teamIds.map(id => getRecapTeam(id).manager).join(' / ')}
          </a>)}
        </nav>
        <div className="week-one-recaps">
          {week2Recaps.map(recap => {
            const teams = recap.teamIds.map(getRecapTeam);
            const player = getStarter(recap.xFactorRosterId, recap.xFactorId);
            return (
              <article className="week-one-recap" key={recap.matchupId} id={`recap-${recap.matchupId}`}>
                <header>
                  <div className="week-one-card-meta"><span>{recap.billing}</span><b>{scoreLabel}</b></div>
                  <h3 className="week-one-versus">{teams[0].manager} <span>vs</span> {teams[1].manager}</h3>
                  <div className="week-one-scoreboard" aria-label={isFinal ? 'Final score' : scoreLabel}>
                    {teams.map((team, index) => {
                      const isWinner = isRecap && team.score > teams[1 - index].score;
                      return <div className={isWinner ? 'week-one-winner' : undefined} key={team.rosterId}>
                        <div><strong>{team.teamName}</strong><span>{team.manager}{isRecap ? ` · ${team.record}` : ''}{isWinner ? ' · Winner' : ''}</span></div>
                        <b>{formatScore(team.score)}</b>
                      </div>;
                    })}
                  </div>
                </header>
                <p className="week-one-recap-summary">{recap.summary}<InlineSources sources={recap.sources} /></p>
                <div className="week-one-xfactor">
                  <span className="week-one-kicker">{isRecap ? 'The X-factor' : 'The X-factor so far'}</span>
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
        <div className="week-one-section-heading"><p className="week-one-kicker">03 / Power rankings</p><h2 id="rankings-title">The long game.<br />Who’s built to last?</h2></div>
        <p>This is the season-outlook board, not a victory parade for whoever put up the biggest number. We’re weighing the firepower, the depth, and the injury hits that could change the road ahead. Arrows show movement from our Week 1 rankings; {isRecap ? 'two weeks in, here’s where the season is heading.' : 'these calls reflect the action so far.'}</p>
        <ol className="week-one-rankings">
          {week2PowerRankings.map((ranking, index) => {
            const team = getRecapTeam(ranking.rosterId);
            const change = ranking.previousRank - (index + 1);
            return <li className="week-one-ranking" key={ranking.rosterId}>
              <div className="week-one-rank-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
              <div className="week-one-rank-content">
                <div className="week-one-rank-meta"><span>{ranking.tier}</span><strong className={change > 0 ? 'rank-up' : change < 0 ? 'rank-down' : ''}>{change > 0 ? `↑ ${change}` : change < 0 ? `↓ ${Math.abs(change)}` : '—'} <span>{change === 0 ? 'No change' : `from #${ranking.previousRank}`}</span></strong></div>
                <h3><span className="week-one-sr-only">Rank {index + 1}: </span>{team.teamName}</h3>
                <p className="week-one-team-meta">{team.manager}{isRecap ? ` · ${team.record}` : ''}</p>
                <p className="week-two-outlook">{ranking.outlook}<InlineSources sources={ranking.sources} /></p>
              </div>
            </li>;
          })}
        </ol>
      </section>

      <section className="week-one-section" id="week-three" aria-labelledby="week-three-title">
        <div className="week-one-section-heading"><p className="week-one-kicker">04 / Week 3 matchup preview</p><h2 id="week-three-title">The next challenge.<br />No hiding places.</h2></div>
        <p>{isRecap ? 'Two weeks in the books. Now comes the next test.' : 'Time for an early look at the next card.'} These picks lean on what we’ve seen, with plenty riding on who stays healthy and who can keep the points coming.</p>
        <div className="week-one-previews">
          {week3Previews.map(preview => {
            const teams = preview.teamIds.map(getRecapTeam);
            return <article className="week-one-preview" key={preview.matchupId}>
              <p className="week-one-kicker">Week 3 · Matchup {preview.matchupId}</p>
              <h3>{preview.billing}</h3>
              <div className="week-one-preview-teams">{teams.map(team => <div key={team.rosterId}><div><strong>{team.teamName}</strong><span>{team.manager}</span></div></div>)}</div>
              <p>{preview.story}</p>
              <h4>Keep your eyes on</h4><p>{preview.key}<InlineSources sources={preview.sources} /></p>
              <div className="week-one-pick"><strong>{isRecap ? 'Our pick' : 'Early pick'}: {getRecapTeam(preview.pickId).manager}</strong><p>{preview.pickReason}</p></div>
            </article>;
          })}
        </div>
      </section>

      <aside className="week-one-dashboard-callout">
        <div><p className="week-one-kicker">Still arguing? Pull up the numbers.</p><h2>Beyond the Boxscore.</h2><p>Who’s carrying the lineup? Where are the points coming from? Take a closer look at the season so far.</p></div>
        <a href="/beyond-the-boxscore">Open the 2026 dashboard →</a>
      </aside>
      <footer className="week-one-footer">
        <p>Scores and lineup data: <a href={recapSource.sources.week2} target="_blank" rel="noreferrer">Sleeper Week 2</a> · <a href={recapSource.sources.week3} target="_blank" rel="noreferrer">Week 3 schedule</a>. {isClosingMinute ? 'Scores reflect the closing-minute Sleeper snapshot and remain subject to stat corrections.' : isFinal ? `Completed Week 2 results captured ${editionDate}.` : `In-progress snapshot captured ${snapshotTime}.`} Injury availability and Week 3 lineups can change. Numbered links cite the reporting woven into the stories. League gameflow notes come from the commissioner.</p>
        <div><a href="/newsletters/week1-recap">Read the Week 1 recap</a><a href="#issue-top">Back to top ↑</a></div>
      </footer>
    </div>
  </main>
);

export default Week2RecapNewsletter;
