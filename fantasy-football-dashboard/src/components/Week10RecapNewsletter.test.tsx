import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Week10RecapNewsletter from './Week10RecapNewsletter';
import {
  getRecapTeam, mickeyOfTheWeek, recapSource, week10PowerRankings, week10Recaps,
} from '../data/week10Recap2026';

test('Week 10 keeps six sections, six recaps, twelve outlooks, and six Week 11 previews', () => {
  const { container } = render(<Week10RecapNewsletter />);
  const contents = screen.getByRole('navigation', { name: 'Newsletter sections' });
  expect(within(contents).getAllByRole('link')).toHaveLength(6);
  expect(within(contents).getByRole('link', { name: /Mickey of the Week/ })).toHaveAttribute('href', '#mickey');
  expect(within(contents).getByRole('link', { name: /Week 11 preview/ })).toHaveAttribute('href', '#week-eleven');
  expect(container.querySelectorAll('#recaps .week-one-recap')).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-scoreboard > div')).toHaveLength(12);
  expect(container.querySelectorAll('.week-one-ranking')).toHaveLength(12);
  expect(container.querySelectorAll('.week-one-preview')).toHaveLength(6);
  expect(Array.from(container.querySelectorAll('.week-one-paper > section')).map(section => section.id))
    .toEqual(['overview', 'recaps', 'mickey', 'power-rankings', 'week-eleven', 'rest-of-season']);
});

test('final scorecards keep team labels, records, and winner highlights together', () => {
  const { container } = render(<Week10RecapNewsletter />);

  expect(screen.getAllByLabelText('Final score')).toHaveLength(6);
  expect(screen.getAllByText('Final', { exact: true })).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-winner')).toHaveLength(6);
  week10Recaps.forEach(recap => {
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
  render(<Week10RecapNewsletter />);
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

test('power rankings show substantial season-outlook commentary for every team', () => {
  const { container } = render(<Week10RecapNewsletter />);
  const outlooks = container.querySelectorAll('.week-three-outlook');
  expect(outlooks).toHaveLength(12);
  week10PowerRankings.forEach((ranking, index) => {
    expect(outlooks[index]).toHaveTextContent(ranking.outlook);
    expect(ranking.outlook.length).toBeGreaterThan(180);
  });
  expect(container.querySelectorAll('.week-one-rank-content details')).toHaveLength(0);
});

test('this pregame edition separates its editorial cutoff from the data retrieval date', () => {
  const { container } = render(<Week10RecapNewsletter />);
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York',
  }).format(new Date(recapSource.capturedAt));
  expect(container.querySelector('.week-one-edition')).toHaveTextContent('Week 11 pregame edition');
  expect(container.querySelector('.week-one-footer')).toHaveTextContent(`Final score data retrieved ${date}`);
  expect(container.querySelector('.week-one-footer')).toHaveTextContent('Editorial cutoff: November 17, 2026');
  expect(container.textContent).not.toMatch(/Score so far|Live snapshot|commissioner/);
  expect(screen.getByRole('link', { name: 'Read the Week 9 recap' })).toHaveAttribute('href', '/newsletters/week9-recap');
  expect(container.querySelector('a[href="/beyond-the-boxscore"]')).toBeNull();
  expect(screen.queryByRole('heading', { name: /NFL connection/i })).not.toBeInTheDocument();
});

test('Week 11 previews avoid hindsight and keep all section jump links usable', () => {
  const { container } = render(<Week10RecapNewsletter />);
  expect(container.textContent).not.toMatch(/already underway|Week 11 results/i);
  expect(container.querySelector('.week-one-edition')).toHaveTextContent('The Week 11 card awaits');
  const links = container.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    const target = link.getAttribute('href')!.slice(1);
    expect(container.querySelector(`[id="${target}"]`)).not.toBeNull();
  });
});

test('restored format retains playoff card and correct Mickey winner without removed text', () => {
  const { container } = render(<Week10RecapNewsletter />);
  expect(container.querySelector('#overview #playoff-picture-title')).not.toBeNull();
  expect(mickeyOfTheWeek.rosterId).toBe(12);
  expect(mickeyOfTheWeek.allPlayWins).toBe(5);
  expect(mickeyOfTheWeek.allPlayLosses).toBe(6);
  expect(container.querySelectorAll('.week-one-xfactor')).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-lowlight')).toHaveLength(6);
  expect(container.querySelectorAll('.week-one-pick')).toHaveLength(6);
});

 test('ROS gives every team four games and win/survival guidance', () => { const {container}=render(<Week10RecapNewsletter />); expect(container.querySelectorAll('.week-ten-ros-card')).toHaveLength(12); expect(container.querySelectorAll('.week-ten-schedule li')).toHaveLength(48); expect(container.querySelector('#rest-of-season')).toHaveTextContent('best possible finish is ninth'); expect(container.querySelector('#rest-of-season')).toHaveTextContent('practical forecasts, not clinches'); });

test('matchup roadmap replaces the bye list with concise previews and critical markers', () => {
  const {container}=render(<Week10RecapNewsletter />);
  expect(container.querySelectorAll('.week-ten-byes')).toHaveLength(0);
  expect(screen.queryByText('Bye-week pressure points')).not.toBeInTheDocument();
  expect(container.querySelectorAll('.week-ten-matchups')).toHaveLength(12);
  expect(container.querySelectorAll('.week-ten-matchups > li')).toHaveLength(48);
  expect(container.querySelectorAll('.week-ten-difficulty')).toHaveLength(48);
  expect(container.querySelectorAll('.week-ten-critical-label').length).toBeGreaterThan(15);
  expect(container.querySelectorAll('.week-ten-critical-label').length).toBeLessThan(36);
  expect(container.querySelectorAll('.week-ten-team-nav a')).toHaveLength(12);
  expect(container.querySelector('#rest-of-season')).toHaveTextContent('Week 12 has no scheduled byes');
  expect(container.querySelector('#rest-of-season')).toHaveTextContent('not simulated point projections');
  expect(container.querySelectorAll('#recaps .week-one-recap')).toHaveLength(6);
});


test('final prediction is a compact twelve-team standings list', () => {
  const {container}=render(<Week10RecapNewsletter />);
  const call=container.querySelector('.week-ten-final-call')!;
  expect(call).toHaveTextContent('Amberwood AI’s Prediction');
  expect(call).toHaveTextContent('Projected final regular-season standings');
  expect(call.querySelectorAll('li')).toHaveLength(12);
  expect(call.querySelectorAll('p')).toHaveLength(1);
  expect(call.querySelectorAll('li')[5]).toHaveTextContent('Taaha — 7–7 · Points wildcard');
});

test('uses the supplied photo as the uncropped Week 10 cover', () => {
  render(<Week10RecapNewsletter />);
  const cover = screen.getByRole('img', { name: /Saaho movie poster/ });
  expect(cover).toHaveAttribute('src', '/week10-recap-cover.jpg');
  expect(cover).toHaveAttribute('width', '1122');
  expect(cover).toHaveAttribute('height', '1402');
});
