import axios from 'axios';

const BASE_URL = 'https://api.sleeper.app/v1';

export const sleeperApi = {
  // Get league information
  getLeague: async (leagueId: string) => {
    const response = await axios.get(`${BASE_URL}/league/${leagueId}`);
    return response.data;
  },

  // Get league rosters
  getLeagueRosters: async (leagueId: string) => {
    const response = await axios.get(`${BASE_URL}/league/${leagueId}/rosters`);
    return response.data;
  },

  // Get league users
  getLeagueUsers: async (leagueId: string) => {
    const response = await axios.get(`${BASE_URL}/league/${leagueId}/users`);
    return response.data;
  },

  // Get current week
  getCurrentWeek: async () => {
    const response = await axios.get(`${BASE_URL}/state/nfl`);
    return response.data.week;
  },

  // Get matchups for a specific week
  getMatchups: async (leagueId: string, week: number) => {
    const response = await axios.get(`${BASE_URL}/league/${leagueId}/matchups/${week}`);
    return response.data;
  },

  // Get league transactions
  getLeagueTransactions: async (leagueId: string) => {
    const response = await axios.get(`${BASE_URL}/league/${leagueId}/transactions/1`);
    return response.data;
  },

  // Get all NFL players
  getAllPlayers: async () => {
    const response = await axios.get(`${BASE_URL}/players/nfl`);
    return response.data;
  }
};