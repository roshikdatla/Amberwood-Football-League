import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Week1RecapNewsletter from './Week1RecapNewsletter';
import { getRecapTeam, getStarter, recapSource, week1PowerRankings, week1Recaps, week2Previews } from '../data/week1Recap2026';

test('each recap covers a scored pair and awards a starter on the winning team', () => {
  expect(week1Recaps).toHaveLength(6);
  expect(new Set(week1Recaps.flatMap(row => [row.winnerId, row.loserId])).size).toBe(12);
  for (const recap of week1Recaps) {
    const winner = getRecapTeam(recap.winnerId);
    const loser = getRecapTeam(recap.loserId);
    expect(winner.score).toBeGreaterThan(loser.score);
    expect(winner.matchupId).toBe(recap.matchupId);
    expect(loser.matchupId).toBe(recap.matchupId);
    expect(getStarter(recap.winnerId, recap.xFactorId).points).toBeGreaterThan(0);
    expect(winner.record).toBe('1–0');
    expect(loser.record).toBe('0–1');
  }
});

test('all starting score sums agree with finalized Week 1 totals', () => {
  expect(recapSource.league.completedWeek).toBeGreaterThanOrEqual(1);
  for (const matchup of recapSource.week1) {
    expect(matchup.starters_points.reduce((sum, value) => sum + value, 0)).toBeCloseTo(matchup.points, 2);
  }
});

test('rankings cover every roster once and Week 2 previews match the published schedule', () => {
  expect(new Set(week1PowerRankings.map(row => row.rosterId)).size).toBe(12);
  expect(new Set(week1PowerRankings.map(row => row.previousRank)).size).toBe(12);
  expect(week2Previews).toHaveLength(6);
  expect(new Set(week2Previews.flatMap(row => row.teamIds)).size).toBe(12);
  for (const preview of week2Previews) {
    const sourcePair = recapSource.week2.filter(row => row.matchup_id === preview.matchupId).map(row => row.roster_id);
    expect([...preview.teamIds].sort()).toEqual(sourcePair.sort());
    expect(preview.teamIds).toContain(preview.pickId);
  }
});

test('newsletter renders four sections, six readable scorecards and preserves the original edition', () => {
  const { container } = render(<Week1RecapNewsletter />);
  expect(within(screen.getByRole('navigation', { name: 'Newsletter sections' })).getAllByRole('link')).toHaveLength(4);
  expect(container.querySelectorAll('.week-one-recap')).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-scoreboard > div')).toHaveLength(12);
  expect(container.querySelectorAll('.week-one-ranking')).toHaveLength(12);
  expect(container.querySelectorAll('.week-one-preview')).toHaveLength(6);
  expect(screen.getByRole('link', { name: 'Read the original Rivalry Week preview' })).toHaveAttribute('href', '/newsletters/week1');
  expect(screen.getByRole('link', { name: /Open the 2026 dashboard/ })).toHaveAttribute('href', '/beyond-the-boxscore');
  const kelceCard = container.querySelector('#recap-3 .week-one-xfactor')!;
  expect(kelceCard).toHaveTextContent('Travis Kelce');
  expect(kelceCard).toHaveTextContent('10.10 pts');
});

test('overview replaces the two recap paragraphs with the reaction image and preserves the lead', () => {
  render(<Week1RecapNewsletter />);
  const overview = screen.getByRole('region', { name: 'Now that’s Rivalry Week.' });
  expect(within(overview).queryByText(/^Start with Anudeep and Sahil/)).not.toBeInTheDocument();
  expect(within(overview).queryByText(/^Pranav J kept the Pranav Bowl bragging rights/)).not.toBeInTheDocument();
  expect(overview.querySelector('.week-one-lead')).toHaveTextContent(
    'The defending champ scored 160—and lost. Kenneth Walker went off on Monday night—and it still wasn’t enough. Gary came out of retirement and straight into the win column. If you wanted a gentle start to the season, you picked the wrong league.'
  );
  const image = overview.querySelector('.week-one-overview-image img');
  expect(image).toHaveAttribute('src', '/week1-recap-reaction.png');
  expect(image).toHaveAttribute('width', '851');
  expect(image).toHaveAttribute('height', '362');
});

test('NFL reporting is woven into matchup prose with sources, not separate sections', () => {
  const { container } = render(<Week1RecapNewsletter />);
  expect(screen.queryByRole('heading', { name: /NFL connection/i })).not.toBeInTheDocument();
  expect(container.querySelector('.week-one-nfl-note')).not.toBeInTheDocument();
  expect(container.querySelector('.week-one-availability')).not.toBeInTheDocument();
  expect(container.querySelector('#recap-1 .week-one-recap-summary')).toHaveTextContent('NFC Offensive Player of the Week');
  expect(container.querySelector('#recap-2 .week-one-recap-summary')).toHaveTextContent('191 scrimmage yards');
  expect(container.querySelector('#recap-3 .week-one-recap-summary')).toHaveTextContent('Jason Witten');
  expect(container.querySelector('#recap-5 .week-one-recap-summary')).toHaveTextContent('three fourth-quarter interceptions');
  expect(container.querySelectorAll('.week-one-recap-summary .week-one-inline-sources a')).toHaveLength(6);
  expect(screen.getByRole('heading', { name: 'Now that’s Rivalry Week.' })).toBeInTheDocument();
});
