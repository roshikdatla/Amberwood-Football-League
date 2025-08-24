import axios from 'axios';
import { User, League, Roster, Matchup } from '../types/sleeper';

const BASE_URL = 'https://api.sleeper.app/v1';

class SleeperApiService {
  async getUser(username: string): Promise<User> {
    const response = await axios.get(`${BASE_URL}/user/${username}`);
    return response.data;
  }

  async getUserLeagues(userId: string, sport: string, season: string): Promise<League[]> {
    const response = await axios.get(`${BASE_URL}/user/${userId}/leagues/${sport}/${season}`);
    return response.data;
  }

  async getLeague(leagueId: string): Promise<League> {
    const response = await axios.get(`${BASE_URL}/league/${leagueId}`);
    return response.data;
  }

  async getLeagueRosters(leagueId: string): Promise<Roster[]> {
    const response = await axios.get(`${BASE_URL}/league/${leagueId}/rosters`);
    return response.data;
  }

  async getLeagueMatchups(leagueId: string, week: number): Promise<Matchup[]> {
    const response = await axios.get(`${BASE_URL}/league/${leagueId}/matchups/${week}`);
    return response.data;
  }

  async getLeagueUsers(leagueId: string): Promise<User[]> {
    const response = await axios.get(`${BASE_URL}/league/${leagueId}/users`);
    return response.data;
  }

  async getCurrentWeek(): Promise<number> {
    try {
      const response = await axios.get('https://api.sleeper.app/v1/state/nfl');
      return response.data.week;
    } catch (error) {
      return 1;
    }
  }

  async getLeagueTransactions(leagueId: string, round: number): Promise<any[]> {
    try {
      const response = await axios.get(`${BASE_URL}/league/${leagueId}/transactions/${round}`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      return [];
    }
  }

  async getAllPlayers(): Promise<{ [key: string]: any }> {
    try {
      const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
      return response.data || {};
    } catch (error) {
      console.error('Failed to fetch players:', error);
      return {};
    }
  }
}

export const sleeperApi = new SleeperApiService();