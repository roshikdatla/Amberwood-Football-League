import React from 'react';
import { activeSeason } from '../config/seasons';

const currentSeasonNewsletters = [
  {
    slug: 'week1',
    title: 'Week 1: Rivalry Week Preview',
    date: 'September 2026',
    description: 'Every rivalry meeting, scoring trend, margin, and positional edge on the Week 1 card',
    status: 'Read Now',
  },
  {
    slug: 'preseason',
    title: '2026 Preseason Draft Recap',
    date: 'August 2026',
    description: 'Draft coverage, value picks, positional rankings, and team-by-team analysis',
    status: 'Read Now',
  },
];

const CurrentSeasonNewsletterCollection: React.FC = () => {
  return (
    <main className="newsletter-archive-list">
      <div className="archive-header">
        <h1>{activeSeason.shortLabel} Newsletter Archive</h1>
        <p>Every edition of The Amberwood Times from the {activeSeason.label}</p>
      </div>

      <div className="newsletter-grid">
        {currentSeasonNewsletters.map((newsletter) => (
          <article className="newsletter-card available" key={newsletter.slug}>
            <h3>{newsletter.title}</h3>
            <p className="newsletter-date">{newsletter.date}</p>
            <p className="newsletter-description">{newsletter.description}</p>
            <a className="read-btn" href={`${activeSeason.newsletterBasePath}/${newsletter.slug}`}>
              {newsletter.status}
            </a>
          </article>
        ))}
      </div>
    </main>
  );
};

export default CurrentSeasonNewsletterCollection;
