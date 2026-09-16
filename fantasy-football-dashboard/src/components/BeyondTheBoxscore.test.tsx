import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import BeyondTheBoxscore from './BeyondTheBoxscore';
import Navigation from './Navigation';
import { activeSeason, archivedSeason } from '../config/seasons';
import { sleeperApi } from '../services/sleeperApi';

jest.mock('../services/sleeperApi', () => ({
  sleeperApi: {
    getLeague: jest.fn(),
    getCurrentWeek: jest.fn(),
    getLeagueRosters: jest.fn(),
    getLeagueUsers: jest.fn(),
    getSeasonMatchups: jest.fn(),
    getAllPlayers: jest.fn(),
    getLeagueDrafts: jest.fn(),
    getDraftPicks: jest.fn(),
  },
}));

const api = sleeperApi as jest.Mocked<typeof sleeperApi>;
const league = { settings: { last_scored_leg: 1 }, roster_positions: ['QB', 'FLEX'] };
const weekOne = {
  week: 1,
  matchups: [
    { roster_id: 1, points: 35, starters: ['q1', 'r1'], players: ['q1', 'r1'], players_points: { q1: 25, r1: 10 } },
    { roster_id: 2, points: 25, starters: ['q2', 'r2'], players: ['q2', 'r2'], players_points: { q2: 10, r2: 15 } },
  ],
};
const emptyFutureWeek = {
  week: 2,
  matchups: weekOne.matchups.map((matchup) => ({
    ...matchup,
    points: 0,
    players_points: Object.fromEntries(matchup.players.map((id) => [id, 0])),
  })),
};

beforeEach(() => {
  jest.resetAllMocks();
  api.getLeague.mockResolvedValue(league);
  api.getCurrentWeek.mockResolvedValue(2);
  api.getLeagueRosters.mockResolvedValue([
    { roster_id: 1, owner_id: 'one' },
    { roster_id: 2, owner_id: 'two' },
  ]);
  api.getLeagueUsers.mockResolvedValue([
    { user_id: 'one', display_name: 'Taaha', metadata: { team_name: '  ' } },
    { user_id: 'two', display_name: 'Opponent', metadata: { team_name: 'The Challengers' } },
  ]);
  api.getSeasonMatchups.mockResolvedValue([weekOne]);
  api.getAllPlayers.mockResolvedValue({
    q1: { full_name: 'Quarterback One', position: 'QB' },
    q2: { full_name: 'Quarterback Two', position: 'QB' },
    r1: { full_name: 'Running Back One', position: 'RB' },
    r2: { full_name: 'Running Back Two', position: 'RB' },
  });
  api.getLeagueDrafts.mockResolvedValue([{ draft_id: 'draft', status: 'complete' }]);
  api.getDraftPicks.mockResolvedValue([
    { player_id: 'r1', pick_no: 1 },
    { player_id: 'q2', pick_no: 2 },
    { player_id: 'r2', pick_no: 3 },
    { player_id: 'q1', pick_no: 4 },
  ]);
});

test('current season stops at the league’s completed week and awards actual Week 1 starters', async () => {
  render(<BeyondTheBoxscore seasonConfig={activeSeason} />);

  await screen.findByText('1 week charted');
  expect(api.getSeasonMatchups).toHaveBeenCalledWith(activeSeason.leagueId, 1);
  expect(api.getCurrentWeek).not.toHaveBeenCalled();
  expect(screen.getByRole('option', { name: 'Taaha' })).toBeInTheDocument();

  const card = screen.getByRole('heading', { name: 'Taaha' }).closest('article')!;
  const mvp = within(card).getByText('Early MVP').closest('.beyond-spotlight')!;
  const disappointment = within(card).getByText('Early Disappointment').closest('.beyond-spotlight')!;
  expect(mvp).toHaveTextContent('Quarterback One');
  expect(mvp).toHaveTextContent('+7.5 points/start vs average QB');
  expect(disappointment).toHaveTextContent('Running Back One');
  expect(within(card).getByText('After Week 2')).toBeInTheDocument();
  expect(within(card).getByText('FLEX').closest('.beyond-position-row')).toHaveTextContent('10.0/wk');
  expect(within(card).getByText('RB').closest('.beyond-position-row')).toHaveTextContent('0.0/wk');
});

test('zero-filled future score maps do not increase weeks or dilute position averages', async () => {
  api.getLeague.mockResolvedValue({ ...league, settings: { last_scored_leg: 2 } });
  api.getSeasonMatchups.mockResolvedValue([weekOne, emptyFutureWeek]);
  render(<BeyondTheBoxscore seasonConfig={activeSeason} />);

  await screen.findByText('1 week charted');
  const card = screen.getByRole('heading', { name: 'Taaha' }).closest('article')!;
  expect(within(card).getByText('QB').closest('.beyond-position-row')).toHaveTextContent('25.0/wk');
  expect(within(card).getByText('FLEX').closest('.beyond-position-row')).toHaveTextContent('10.0/wk');
  expect(card.querySelector('.beyond-total')).toHaveTextContent('35.0');
  expect(screen.getByText(/provisional after 1 completed week and require 1 start/)).toBeInTheDocument();
});

test('missing league score boundary falls back to the previous NFL week', async () => {
  api.getLeague.mockResolvedValue({ ...league, settings: {} });
  render(<BeyondTheBoxscore seasonConfig={activeSeason} />);

  await screen.findByText('1 week charted');
  expect(api.getCurrentWeek).toHaveBeenCalledTimes(1);
  expect(api.getSeasonMatchups).toHaveBeenCalledWith(activeSeason.leagueId, 1);
});

test('preseason boundary zero does not fetch or rank unplayed matchups', async () => {
  api.getLeague.mockResolvedValue({ ...league, settings: { last_scored_leg: 0 } });
  render(<BeyondTheBoxscore seasonConfig={activeSeason} />);

  await screen.findByText(/The dashboard is ready/);
  expect(api.getSeasonMatchups).not.toHaveBeenCalled();
  expect(screen.queryByText(/#1 in scoring/)).not.toBeInTheDocument();
  expect(screen.queryByText('Early MVP')).not.toBeInTheDocument();
});

test('2025 archive still requests all 18 weeks and requires four starts for awards', async () => {
  render(<BeyondTheBoxscore seasonConfig={archivedSeason} />);

  await screen.findByText('1 week charted');
  expect(api.getSeasonMatchups).toHaveBeenCalledWith(archivedSeason.leagueId, 18);
  expect(api.getCurrentWeek).not.toHaveBeenCalled();
  const card = screen.getByRole('heading', { name: 'Taaha' }).closest('article')!;
  expect(within(card).getByText('Team MVP').closest('.beyond-spotlight')).toHaveTextContent('TBD');
  expect(screen.queryByText('Early MVP')).not.toBeInTheDocument();
  expect(screen.getByText(/Both awards require at least four starts/)).toBeInTheDocument();
});

test('four completed starts qualify for normal archived awards', async () => {
  api.getSeasonMatchups.mockResolvedValue([1, 2, 3, 4].map((week) => ({ ...weekOne, week })));
  render(<BeyondTheBoxscore seasonConfig={archivedSeason} />);

  await screen.findByText('4 weeks charted');
  const card = screen.getByRole('heading', { name: 'Taaha' }).closest('article')!;
  expect(within(card).getByText('Team MVP').closest('.beyond-spotlight')).toHaveTextContent('Quarterback One');
  expect(card.querySelector('.beyond-total')).toHaveTextContent('140.0');
  expect(within(card).getByText('QB').closest('.beyond-position-row')).toHaveTextContent('25.0/wk');
});

test('switching from the archive to the current season resets the selected team', async () => {
  const { rerender } = render(<BeyondTheBoxscore seasonConfig={archivedSeason} />);
  await screen.findByText('1 week charted');
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
  expect(screen.queryByRole('heading', { name: 'Taaha' })).not.toBeInTheDocument();
  rerender(<BeyondTheBoxscore seasonConfig={activeSeason} />);

  await waitFor(() => expect(screen.getAllByText('Early MVP')).toHaveLength(2));
  expect(screen.getByRole('combobox')).toHaveValue('all');
  expect(api.getSeasonMatchups).toHaveBeenLastCalledWith(activeSeason.leagueId, 1);
});

test('navigation exposes the current analytics dashboard alongside the 2025 archive', () => {
  render(<Navigation currentPage="beyond-the-boxscore" />);
  expect(screen.getByRole('link', { name: 'Beyond the Boxscore' })).toHaveAttribute('href', '/beyond-the-boxscore');
  expect(screen.getByRole('link', { name: 'Beyond the Boxscore' })).toHaveClass('active');
  expect(screen.getByRole('link', { name: '2025' })).toHaveAttribute('href', '/last-season');
});
