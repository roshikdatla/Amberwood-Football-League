import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentSeasonNewsletterCollection from './CurrentSeasonNewsletterCollection';
import Week12RecapNewsletter from './Week12RecapNewsletter';
import { activeSeason } from '../config/seasons';
import { isFinal, issue, mickey, projected, teams } from '../data/week12Recap2026';

test('shows six matchup updates, critical games and a complete standings prediction', () => {
  const { container } = render(<Week12RecapNewsletter />);
  expect(container.querySelectorAll('.week-one-recap')).toHaveLength(6);
  expect(screen.getByText('Amberwood AI’s Prediction')).toBeInTheDocument();
  expect(container.querySelectorAll('.afl-prediction li')).toHaveLength(12);
  expect(container.querySelectorAll('.afl-critical').length).toBeGreaterThan(0);
  if (!isFinal) {
    expect(screen.getAllByText('In progress')).toHaveLength(6);
    expect(mickey).toBeUndefined();
  }
});
test('league snapshots and projected season records reconcile', () => {
  expect(teams).toHaveLength(12);
  expect(projected.every(t => t.wins + t.losses + t.ties === 14)).toBe(true);
  expect(projected.reduce((n,t) => n+t.wins-t.losses,0)).toBe(0);
  Object.values(issue.fixtures).forEach(games => expect(new Set(games.flat())).toHaveProperty('size',12));
});
test('the latest issue is first in the archive', () => {
  const {container} = render(<CurrentSeasonNewsletterCollection />);
  expect(activeSeason.latestNewsletterPath).toBe('/newsletters/week12-recap');
  expect(container.querySelector('.newsletter-card a')).toHaveAttribute('href', '/newsletters/week12-recap');
});
