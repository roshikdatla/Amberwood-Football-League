import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Week4RecapNewsletter from './Week4RecapNewsletter';
import {
  getRecapTeam, mickeyOfTheWeek, recapSource, week4PowerRankings, week4Recaps,
} from '../data/week4Recap2026';

test('Week 4 keeps five sections, six recaps, twelve outlooks, and six Week 5 previews', () => {
  const { container } = render(<Week4RecapNewsletter />);
  const contents = screen.getByRole('navigation', { name: 'Newsletter sections' });
  expect(within(contents).getAllByRole('link')).toHaveLength(5);
  expect(within(contents).getByRole('link', { name: /Mickey of the Week/ })).toHaveAttribute('href', '#mickey');
  expect(within(contents).getByRole('link', { name: /Week 5 preview/ })).toHaveAttribute('href', '#week-five');
  expect(container.querySelectorAll('.week-one-recap')).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-scoreboard > div')).toHaveLength(12);
  expect(container.querySelectorAll('.week-one-ranking')).toHaveLength(12);
  expect(container.querySelectorAll('.week-one-preview')).toHaveLength(6);
  expect(Array.from(container.querySelectorAll('.week-one-paper > section')).map(section => section.id))
    .toEqual(['overview', 'recaps', 'mickey', 'power-rankings', 'week-five']);
});

test('final scorecards keep team labels, records, and winner highlights together', () => {
  const { container } = render(<Week4RecapNewsletter />);
  expect(recapSource.league.completedWeek).toBeGreaterThanOrEqual(4);
  expect(screen.getAllByLabelText('Final score')).toHaveLength(6);
  expect(screen.getAllByText('Final', { exact: true })).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-winner')).toHaveLength(6);
  week4Recaps.forEach(recap => {
    const rows = container.querySelectorAll(`#recap-${recap.matchupId} .week-one-scoreboard > div`);
    recap.teamIds.forEach((id, index) => {
      const team = getRecapTeam(id);
      expect(rows[index]).toHaveTextContent(team.manager);
      expect(rows[index]).toHaveTextContent(team.teamName);
      expect(rows[index]).toHaveTextContent(team.record);
      expect(rows[index].classList.contains('week-one-winner'))
        .toBe(team.score > getRecapTeam(recap.teamIds[1 - index]).score);
    });
  });
});

test('Mickey of The Week names one recipient and explains the schedule-luck numbers', () => {
  render(<Week4RecapNewsletter />);
  const award = screen.getByRole('article', { name: 'Mickey of the Week award' });
  expect(screen.getAllByRole('heading', { name: 'Mickey of The Week' })).toHaveLength(1);
  expect(award).toHaveTextContent(getRecapTeam(mickeyOfTheWeek.rosterId).manager);
  expect(award).toHaveTextContent(getRecapTeam(mickeyOfTheWeek.rosterId).teamName);
  expect(award).toHaveTextContent(mickeyOfTheWeek.summary);
  expect(award).toHaveTextContent(mickeyOfTheWeek.verdict);
  expect(award).toHaveTextContent(`${mickeyOfTheWeek.allPlayWins}–${mickeyOfTheWeek.allPlayLosses}`);
  expect(award.querySelectorAll('dl > div')).toHaveLength(3);
  expect(award).toHaveTextContent('The award goes to the lowest-scoring winner');
  expect(award).toHaveTextContent('All-play compares this week’s score against all 11 other teams');
});

test('power rankings show exactly two season-outlook sentences for every team', () => {
  const { container } = render(<Week4RecapNewsletter />);
  const outlooks = container.querySelectorAll('.week-three-outlook');
  expect(outlooks).toHaveLength(12);
  week4PowerRankings.forEach((ranking, index) => {
    expect(outlooks[index]).toHaveTextContent(ranking.outlook);
    expect(ranking.outlook.match(/[.!?](?=\s|$)/g)).toHaveLength(2);
  });
  expect(container.querySelectorAll('.week-one-rank-content details')).toHaveLength(0);
});

test('this pregame edition separates its editorial cutoff from the data retrieval date', () => {
  const { container } = render(<Week4RecapNewsletter />);
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York',
  }).format(new Date(recapSource.capturedAt));
  expect(container.querySelector('.week-one-edition')).toHaveTextContent('Week 5 pregame edition');
  expect(container.querySelector('.week-one-footer')).toHaveTextContent(`Final score data retrieved ${date}`);
  expect(container.querySelector('.week-one-footer')).toHaveTextContent('Editorial cutoff: before Week 5 kickoff');
  expect(container.querySelectorAll('img')).toHaveLength(0);
  expect(container.textContent).not.toMatch(/September 21|September 22|Sunday edition|Score so far|Live snapshot|closing-minute|commissioner/);
  expect(screen.getByRole('link', { name: 'Read the Week 3 recap' })).toHaveAttribute('href', '/newsletters/week3-recap');
  expect(screen.getByRole('link', { name: /Open the 2026 dashboard/ })).toHaveAttribute('href', '/beyond-the-boxscore');
  expect(screen.queryByRole('heading', { name: /NFL connection/i })).not.toBeInTheDocument();
});

test('Week 5 previews avoid hindsight and keep all section jump links usable', () => {
  const { container } = render(<Week4RecapNewsletter />);
  expect(container.textContent).not.toMatch(/already underway|Season outlook updated October 12|Week 5 injuries|October 11 update|post-kickoff/i);
  expect(container.querySelector('.week-one-edition')).toHaveTextContent('The Week 5 card awaits');
  const links = container.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    const target = link.getAttribute('href')!.slice(1);
    expect(container.querySelector(`[id="${target}"]`)).not.toBeNull();
  });
});
