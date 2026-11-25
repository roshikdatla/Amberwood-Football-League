import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Week11RecapNewsletter from './Week11RecapNewsletter';
import CurrentSeasonNewsletterCollection from './CurrentSeasonNewsletterCollection';
import { activeSeason } from '../config/seasons';
import {
  formatScore, getRecapTeam, getStarter, mickeyOfTheWeek, recapSource,
  week11PowerRankings, week11Recaps,
} from '../data/week11Recap2026';

test('Week 11 covers every matchup and team with five usable section links', () => {
  const { container } = render(<Week11RecapNewsletter />);
  const contents = screen.getByRole('navigation', { name: 'Newsletter sections' });
  expect(within(contents).getAllByRole('link')).toHaveLength(5);
  expect(within(contents).getByRole('link', { name: /Week 12 preview/ })).toHaveAttribute('href', '#week-twelve');
  expect(Array.from(container.querySelectorAll('.week-one-paper > section')).map(section => section.id))
    .toEqual(['overview', 'recaps', 'mickey', 'power-rankings', 'week-twelve']);
  expect(container.querySelectorAll('#recaps .week-one-recap')).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-ranking')).toHaveLength(12);
  expect(container.querySelectorAll('.week-one-preview')).toHaveLength(6);
  expect(container.querySelector('#overview #playoff-picture-title')).not.toBeNull();
  container.querySelectorAll('a[href^="#"]').forEach(link => {
    expect(container.querySelector(`[id="${link.getAttribute('href')!.slice(1)}"]`)).not.toBeNull();
  });
});

test('scorecards pair final scores with the right teams and winning starter X-factors', () => {
  const { container } = render(<Week11RecapNewsletter />);
  expect(screen.getAllByLabelText('Final score')).toHaveLength(6);
  expect(screen.getAllByText('Final', { exact: true })).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-winner')).toHaveLength(6);
  week11Recaps.forEach(recap => {
    const card = container.querySelector(`#recap-${recap.matchupId}`)!;
    const rows = card.querySelectorAll('.week-one-scoreboard > div');
    recap.teamIds.forEach((id, index) => {
      const team = getRecapTeam(id);
      expect(rows[index]).toHaveTextContent(team.manager);
      expect(rows[index]).toHaveTextContent(team.teamName);
      expect(rows[index]).toHaveTextContent(team.record);
      expect(rows[index]).toHaveTextContent(formatScore(team.score));
      expect(rows[index].classList.contains('week-one-winner'))
        .toBe(team.score > getRecapTeam(recap.teamIds[1 - index]).score);
    });
    const player = getStarter(recap.xFactorRosterId, recap.xFactorId);
    expect(card.querySelector('.week-one-xfactor')).toHaveTextContent(player.name);
    expect(card.querySelector('.week-one-xfactor')).toHaveTextContent(`${formatScore(player.points)} pts`);
    expect(card.querySelector('.week-one-lowlight')).toHaveTextContent(recap.lowlight);
  });
});

test('Mickey names its recipient and displays the comparison against all eleven opponents', () => {
  render(<Week11RecapNewsletter />);
  const award = screen.getByRole('article', { name: 'Mickey of the Week award' });
  expect(award).toHaveTextContent(getRecapTeam(mickeyOfTheWeek.rosterId).manager);
  expect(award).toHaveTextContent(mickeyOfTheWeek.summary);
  expect(award).toHaveTextContent(mickeyOfTheWeek.verdict);
  expect(award).toHaveTextContent(`${mickeyOfTheWeek.allPlayWins}–${mickeyOfTheWeek.allPlayLosses}`);
  expect(award).toHaveTextContent('All-play compares this week’s score against all 11 other teams');
  expect(award.querySelectorAll('dl > div')).toHaveLength(3);
});

test('rankings show the current outlook and movement from the preceding issue', () => {
  const { container } = render(<Week11RecapNewsletter />);
  const entries = container.querySelectorAll('.week-one-ranking');
  week11PowerRankings.forEach((ranking, index) => {
    const change = ranking.previousRank - index - 1;
    expect(entries[index].querySelector('.week-three-outlook')).toHaveTextContent(ranking.outlook);
    expect(entries[index]).toHaveTextContent(change === 0 ? 'No change' : `from #${ranking.previousRank}`);
    if (change !== 0) expect(entries[index]).toHaveTextContent(`${change > 0 ? '↑' : '↓'} ${Math.abs(change)}`);
  });
});

test('the new edition keeps dates and sources current without recycling a prior cover or special section', () => {
  const { container } = render(<Week11RecapNewsletter />);
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York',
  }).format(new Date(recapSource.capturedAt));
  expect(container.querySelector('.week-one-edition')).toHaveTextContent('2026 · Week 11 recap');
  expect(container.querySelector('.week-one-edition')).toHaveTextContent('Week 12 pregame edition');
  expect(container.querySelector('.week-one-footer')).toHaveTextContent(`Final score data retrieved ${date}`);
  expect(screen.getByRole('link', { name: 'Sleeper Week 11' })).toHaveAttribute('href', recapSource.sources.week11);
  expect(screen.getByRole('link', { name: 'Week 12 schedule' })).toHaveAttribute('href', recapSource.sources.week12);
  expect(screen.getByRole('link', { name: 'Read the Week 10 recap' })).toHaveAttribute('href', '/newsletters/week10-recap');
  expect(container.querySelectorAll('img')).toHaveLength(0);
  expect(container.querySelector('#rest-of-season')).toBeNull();
  expect(screen.queryByRole('heading', { name: /NFL connection/i })).not.toBeInTheDocument();
});

test('the archive and latest issue link expose Week 11 without removing prior editions', () => {
  const { container } = render(<CurrentSeasonNewsletterCollection />);
  expect(activeSeason.latestNewsletterPath).toBe('/newsletters/week11-recap');
  expect(activeSeason.latestNewsletterLabel).toBe('Week 11 Recap & Week 12 Preview');
  const cards = container.querySelectorAll('.newsletter-card');
  expect(cards[0].querySelector('a')).toHaveAttribute('href', '/newsletters/week11-recap');
  expect(container.querySelector('a[href="/newsletters/week10-recap"]')).not.toBeNull();
  expect(container.querySelector('a[href="/newsletters/week1-recap"]')).not.toBeNull();
  expect(container.querySelector('a[href="/newsletters/week1"]')).not.toBeNull();
});
