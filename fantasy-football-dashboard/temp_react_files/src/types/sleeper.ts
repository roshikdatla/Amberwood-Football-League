export interface League {
  league_id: string;
  name: string;
  season: string;
  total_rosters: number;
  sport: string;
  season_type: string;
  status: string;
  settings: {
    playoff_teams: number;
    playoff_week_start: number;
  };
}

export interface Roster {
  roster_id: number;
  owner_id: string;
  players: string[];
  starters: string[];
  settings: {
    wins: number;
    losses: number;
    ties: number;
    fpts: number;
    fpts_decimal: number;
    fpts_against: number;
    fpts_against_decimal: number;
  };
}

export interface User {
  user_id: string;
  username: string;
  display_name: string;
  metadata?: {
    team_name?: string;
  };
}

export interface TeamStanding {
  roster_id: number;
  owner_id: string;
  user_id: string;
  username: string;
  display_name: string;
  wins: number;
  losses: number;
  ties: number;
  points_for: number;
  points_against: number;
  rank: number;
}