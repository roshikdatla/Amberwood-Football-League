import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Week2RecapNewsletter from './Week2RecapNewsletter';
import { editionStatus, getRecapTeam, recapSource, week2PowerRankings, week2Recaps } from '../data/week2Recap2026';

const isFinal = String(editionStatus) === 'final';
const isClosingMinute = String(editionStatus) === 'closing-minute';
const isRecap = isFinal || isClosingMinute;

test('the edition preserves four sections with six scorecards, twelve rankings, and six previews', () => {
  const { container } = render(<Week2RecapNewsletter />);
  const contents = screen.getByRole('navigation', { name: 'Newsletter sections' });
  expect(within(contents).getAllByRole('link')).toHaveLength(4);
  expect(within(contents).getByRole('link', { name: /Week 3 preview/ })).toHaveAttribute('href', '#week-three');
  expect(container.querySelectorAll('.week-one-recap')).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-scoreboard > div')).toHaveLength(12);
  expect(container.querySelectorAll('.week-one-ranking')).toHaveLength(12);
  expect(container.querySelectorAll('.week-one-preview')).toHaveLength(6);
  expect(screen.getByRole('link', { name: 'Read the Week 1 recap' })).toHaveAttribute('href', '/newsletters/week1-recap');
});

test('scorecards label their actual completion status and retain the editorial team order', () => {
  const { container } = render(<Week2RecapNewsletter />);
  if (isRecap) expect(screen.queryByRole('note')).not.toBeInTheDocument();
  else expect(screen.getByRole('note')).toHaveTextContent('not final Week 2 results');
  expect(screen.getAllByLabelText(isFinal ? 'Final score' : isClosingMinute ? 'Week 2 score' : 'Score so far')).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-winner')).toHaveLength(isRecap ? 6 : 0);
  expect(screen.queryAllByText('Final', { exact: true })).toHaveLength(isFinal ? 6 : 0);
  for (const recap of week2Recaps) {
    const rows = container.querySelectorAll(`#recap-${recap.matchupId} .week-one-scoreboard > div`);
    recap.teamIds.forEach((id, index) => {
      const team = getRecapTeam(id);
      const isWinner = isRecap && team.score > getRecapTeam(recap.teamIds[1 - index]).score;
      expect(rows[index]).toHaveTextContent(team.manager);
      expect(rows[index]).toHaveTextContent(team.teamName);
      if (isRecap) expect(rows[index]).toHaveTextContent(team.record);
      expect(rows[index].classList.contains('week-one-winner')).toBe(isWinner);
    });
    expect(container.querySelector(`#recap-${recap.matchupId} .week-one-xfactor .week-one-kicker`)).toHaveTextContent(isRecap ? /^The X-factor$/ : /^The X-factor so far$/);
  }
});

test('rankings render only each team’s season outlook without a second watch section', () => {
  const { container } = render(<Week2RecapNewsletter />);
  const outlooks = container.querySelectorAll('.week-two-outlook');
  expect(outlooks).toHaveLength(12);
  week2PowerRankings.forEach((ranking, index) => {
    expect(outlooks[index]).toHaveTextContent(ranking.outlook);
    expect(ranking.outlook.match(/[.!?](?=\s|$)/g)).toHaveLength(2);
  });
  expect(container.querySelectorAll('.week-one-rank-content details')).toHaveLength(0);
  expect(screen.queryByText('What to watch', { exact: true })).not.toBeInTheDocument();
});

test('the edition uses the snapshot date without stale Sunday labels or the Week 1 image', () => {
  const { container } = render(<Week2RecapNewsletter />);
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York',
  }).format(new Date(recapSource.capturedAt));
  expect(container.querySelector('.week-one-edition time')).toHaveTextContent(date);
  expect(container.querySelector('.week-one-edition time')).toHaveAttribute('dateTime', recapSource.capturedAt);
  expect(container.querySelector('img[src="/week1-recap-reaction.png"]')).not.toBeInTheDocument();
  expect(container.textContent).not.toMatch(/Sunday edition|Through Sunday · September 20/);
  if (isRecap) expect(container.textContent).not.toMatch(/Score so far|X-factor so far|not final Week 2 results|Live snapshot/);
  if (isClosingMinute) expect(container.querySelector('.week-one-footer')).toHaveTextContent('Scores reflect the closing-minute Sleeper snapshot and remain subject to stat corrections.');
  expect(screen.queryByRole('heading', { name: /NFL connection/i })).not.toBeInTheDocument();
});
