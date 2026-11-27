import React from 'react';
import { cards, isFinal, issue, mickey, outlooks, previews13, previews14, projected, ranked, score, standings, team, wildcard } from '../data/week12Recap2026';
import './Week1RecapNewsletter.css';
import './Week3RecapNewsletter.css';
import './Week12RecapNewsletter.css';

const sections = [['overview','Overview'],['recaps','Matchup recaps'],['mickey','Mickey of the Week'],['power-rankings','Power rankings'],['week-thirteen','Week 13 preview'],['prediction','Final standings prediction']];
const position = (i: number) => String(i + 1).padStart(2,'0');
const localCutoff = new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short',timeZone:'America/New_York'}).format(new Date(issue.capturedAt));

const Week12RecapNewsletter: React.FC = () => (
  <main className="week-one-issue week-three-issue afl-week12" id="issue-top"><div className="week-one-paper">
    <header className="week-one-masthead">
      <a href="/newsletters" className="week-one-archive-link">← All editions</a>
      <p className="week-one-kicker">Big scores. Short memories. Long receipts.</p><h1>The Amberwood Times</h1>
      <div className="week-one-edition"><span>2026 · Week 12</span><span>{isFinal ? 'Final recap' : 'Thanksgiving edition'}</span><strong>{isFinal ? 'Final scores' : 'Scores in progress'}</strong></div>
    </header>
    <nav className="week-one-contents" aria-label="Newsletter sections">{sections.map(([id,label],i) => <a key={id} href={`#${id}`}><span>{position(i)}</span> {label}</a>)}</nav>
    <section className="week-one-overview" id="overview" aria-labelledby="w12-overview"><p className="week-one-kicker">01 / Overview</p>
      <h2 id="w12-overview">Gibbs carved. DeVonta feasted.</h2>
      <p className="week-one-lead">Gibbs dropped 53.70, DeVonta Smith dropped 49.00, and two of the league’s heavyweight matchups got loud before Black Friday. Below them, the 6–5 teams are fighting over the last record berth, and three teams near the bottom are about to play each other for Toilet Bowl eligibility.</p>
      <aside className="week-three-mickey-card">
        <p className="week-one-kicker">The playoff picture · official through Week {issue.completedWeek}</p>
        <h3>Five by record. One by points.</h3>
        <p><strong>Record berths right now:</strong> {standings.slice(0,5).map(t => `${t.manager} ${t.record}`).join(' · ')}.</p>
        <p><strong>Points wildcard, outside the top five:</strong> {wildcard.slice(0,3).map(t => `${t.manager} ${score(t.pf)}`).join(' · ')} PF. These are current positions, not clinch calls.</p>
        <p><strong>Toilet Bowl watch:</strong> The bottom two non-playoff teams can finish no better than ninth. A Week 12 loss caps Sahit at four wins and leaves him needing scoring and other results to break his way. A win keeps a path to five open, through GarVeen and Pranav J. GarVeen’s game against Abhishek also bears directly on the race before GarVeen faces Sahit and Taaha.</p>
      </aside>
    </section>
    <section className="week-one-section" id="recaps" aria-labelledby="w12-recaps">
      <div className="week-one-section-heading"><p className="week-one-kicker">02 / Six matchup updates</p><h2 id="w12-recaps">Roll the highlights.<br/>Check the damage.</h2></div>
      {!isFinal && <p>Thanksgiving scoreboard, captured {localCutoff} ET. Games still to play, nothing here is a final fantasy result.</p>}
      <nav className="week-one-matchup-links" aria-label="Jump to matchup">{issue.fixtures['12'].map((pair,i) => <a key={i} href={`#recap-${i+1}`}>{pair.map(id => team(id).manager).join(' / ')}</a>)}</nav>
      <div className="week-one-recaps">{cards.map((card,i) => {
        const pair = issue.fixtures['12'][i].map(team);
        const player = pair.flatMap(t => t.starters).find(p => p.name === card.x);
        return <article className="week-one-recap" id={`recap-${i+1}`} key={card.title}>
          <header><div className="week-one-card-meta"><span>{card.title}</span><b>{isFinal ? 'Final' : 'In progress'}</b></div>
          <h3 className="week-one-versus">{pair[0].manager} <span>vs</span> {pair[1].manager}</h3>
          <div className="week-one-scoreboard" aria-label={isFinal ? 'Final score' : 'Scores at capture'}>{pair.map(t => <div key={t.id} className={t.points > pair.find(o => o.id !== t.id)!.points ? 'week-one-winner' : undefined}>
          <div><strong>{t.teamName}</strong><span>{t.manager} · {t.record}</span></div><b>{score(t.points)}</b></div>)}</div></header>
          <p className="week-one-recap-summary">{card.lead}</p>
          <div className="week-one-xfactor"><span className="week-one-kicker">The X-factor</span><h4>{card.x}{player && <span>{score(player.points)} pts</span>}</h4></div>
          <div className="week-one-lowlight"><h4>The lowlight</h4><p>{card.low}</p></div>
        </article>;
      })}</div>
    </section>
    <section className="week-one-section week-three-mickey" id="mickey" aria-labelledby="w12-mickey"><div className="week-one-section-heading"><p className="week-one-kicker">03 / The schedule’s favorite</p><h2 id="w12-mickey">Mickey of The Week</h2></div>
      <article className="week-three-mickey-card"><h3>{mickey ? `${mickey.manager} · ${score(mickey.points)} pts` : 'Keep the ears in the box.'}</h3>
      <p>{mickey ? 'The lowest-scoring winner takes the award.' : 'The award goes to the lowest-scoring winner. Nobody gets the ears until all six games are final.'}</p></article>
    </section>
    <section className="week-one-section" id="power-rankings" aria-labelledby="w12-rank"><div className="week-one-section-heading"><p className="week-one-kicker">04 / Power rankings</p><h2 id="w12-rank">Who’s built to last?</h2></div>
      <p>Last issue’s order, with updated personnel and schedule notes. Thanksgiving alone doesn’t move the board.</p>
      <ol className="week-one-rankings">{ranked.map((id,i) => <li className="week-one-ranking" key={id}><div className="week-one-rank-number" aria-hidden="true">{position(i)}</div><div className="week-one-rank-content"><h3>{team(id).teamName}</h3><p className="week-one-team-meta">{team(id).manager} · {team(id).record}</p><p className="week-three-outlook">{outlooks[id]}</p></div></li>)}</ol>
    </section>
    <section className="week-one-section" id="week-thirteen" aria-labelledby="w12-preview-title"><div className="week-one-section-heading"><p className="week-one-kicker">05 / Rest of season</p><h2 id="w12-preview-title">Two weeks. No hiding places.</h2></div>
      <p>★ Critical for a record berth, playoff bye, points wildcard or the bottom two. NFL byes below reflect current rosters, not expected starting lineups.</p>
      <h3>Week 13 · BAL, IND, LV, NYJ on bye</h3>
      <div className="week-one-previews">{previews13.map((p,i) => <article className={`week-one-preview ${p.title.startsWith('★') ? 'afl-critical' : ''}`} key={p.title}>
        <p className="week-one-kicker">{issue.fixtures['13'][i].map(id => team(id).manager).join(' vs ')}</p><h3>{p.title}</h3><p>{p.note}</p><div className="week-one-pick"><strong>Our pick: {team(p.pick).manager}</strong></div></article>)}</div>
      <h3 className="afl-week14-heading">Week 14 · ARI, DAL on bye</h3>
      <ul className="afl-roadmap">{previews14.map((p,i) => <li className={p.critical ? 'afl-critical' : undefined} key={i}><strong>{p.critical && '★ '}{issue.fixtures['14'][i].map(id => team(id).manager).join(' vs ')}</strong><p>{p.note}</p></li>)}</ul>
    </section>
    <section className="week-one-section" id="prediction" aria-labelledby="w12-predict"><div className="week-one-section-heading"><p className="week-one-kicker">06 / Projected regular-season finish</p><h2 id="w12-predict">Amberwood AI’s Prediction</h2></div>
      <p>Projected records from matchup picks, with current season points breaking ties. This is regular-season order, not playoff seeding.</p>
      <ol className="afl-prediction">{projected.map(t => <li key={t.id}><span>{t.manager}</span><strong>{t.wins}–{t.losses}{t.ties ? `–${t.ties}` : ''}</strong></li>)}</ol>
    </section>
    <footer className="week-one-footer"><p>Captured {localCutoff} ET. <a href={issue.sources.w12}>Sleeper Week 12</a> · <a href={issue.sources.w13}>Week 13</a> · <a href={issue.sources.w14}>Week 14</a> · <a href="https://www.nfl.com/schedules/2026/by-week/week-13">NFL schedule</a>. Scoring is league-specific and subject to corrections.</p>
      <div><a href="/newsletters/week11-recap">Read the Week 11 recap</a><a href="#issue-top">Back to top ↑</a></div></footer>
  </div></main>
);
export default Week12RecapNewsletter;
