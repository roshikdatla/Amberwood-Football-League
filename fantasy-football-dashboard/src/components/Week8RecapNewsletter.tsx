import React from 'react';
import issue from '../data/week8Recap2026.json';
import './Week1RecapNewsletter.css';
import './Week3RecapNewsletter.css';

const Week8RecapNewsletter: React.FC = () => (
  <main className="week-one-issue week-three-issue" id="issue-top">
    <div className="week-one-paper">
      <header className="week-one-masthead">
        <a href="/newsletters" className="week-one-archive-link">← All editions</a>
        <p className="week-one-kicker">Big scores. Short memories. Long receipts.</p>
        <h1>The Amberwood Times</h1>
        <div className="week-one-edition"><span>2026 · Week 8 recap</span><span>Week 9 pregame edition</span><strong>November 3, 2026</strong></div>
      </header>
      <nav className="week-one-contents" aria-label="Newsletter sections">
        <a href="#overview"><span>01</span> Overview</a><a href="#playoffs"><span>02</span> Playoff picture</a><a href="#toilet"><span>03</span> Toilet bowl</a><a href="#recaps"><span>04</span> Matchup recaps</a><a href="#mickey"><span>05</span> Mickey of the Week</a><a href="#rankings"><span>06</span> Power rankings</a><a href="#preview"><span>07</span> Week 9 preview</a>
      </nav>
      <section className="week-one-overview" id="overview"><p className="week-one-kicker">01 / Overview</p><h2>{issue.headline}</h2><p className="week-one-lead">{issue.lead}</p></section>
      <section className="week-one-section" id="playoffs"><div className="week-one-section-heading"><p className="week-one-kicker">02 / The playoff picture</p><h2>Five through the front door. One through the points window.</h2></div>{issue.playoff.map((p, i) => <p key={i}>{p}</p>)}</section>
      <section className="week-one-section" id="toilet"><div className="week-one-section-heading"><p className="week-one-kicker">03 / Toilet bowl preview</p><h2>A bye, a lifeline, and a first pick.</h2></div>{issue.toilet.map((p, i) => <p key={i}>{p}</p>)}</section>
      <section className="week-one-section" id="recaps"><div className="week-one-section-heading"><p className="week-one-kicker">04 / Matchup recaps</p><h2>Roll the highlights. Check the damage.</h2></div><div className="week-one-recaps">{issue.recaps.map((recap, i) => <article className="week-one-recap" key={i}><h3>{recap.title}</h3><p className="week-one-kicker">{recap.score}</p>{recap.paragraphs.map((p, j) => <p key={j}>{p}</p>)}</article>)}</div></section>
      <section className="week-one-section" id="mickey"><div className="week-one-section-heading"><p className="week-one-kicker">05 / Mickey of the Week</p><h2>The ears are calling.</h2></div><aside className="week-three-mickey-card">{issue.mickey.map((p, i) => <p key={i}>{p}</p>)}</aside></section>
      <section className="week-one-section" id="rankings"><div className="week-one-section-heading"><p className="week-one-kicker">06 / Power rankings</p><h2>Receipts included.</h2></div>{issue.rankings.map((rank, i) => <article key={i}><h3>{i + 1}. {rank.team}</h3><p>{rank.blurb}</p></article>)}</section>
      <section className="week-one-section" id="preview"><div className="week-one-section-heading"><p className="week-one-kicker">07 / Week 9 preview</p><h2>Next up on the card.</h2></div>{issue.previews.map((preview, i) => <article className="week-one-recap" key={i}><h3>{preview.title}</h3><p>{preview.blurb}</p></article>)}</section>
      <footer><a href="#issue-top">Back to top ↑</a> · <a href="/newsletters">All editions</a></footer>
    </div>
  </main>
);
export default Week8RecapNewsletter;
