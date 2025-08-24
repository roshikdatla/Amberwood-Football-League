export interface User {
  user_id: string;
  username?: string;
  display_name: string;
  avatar: string;
  metadata?: { 
    team_name?: string;
    [key: string]: any;
  };
}

export interface League {
  league_id: string;
  name: string;
  season: string;
  season_type: string;
  total_rosters: number;
  status: string;
  sport: string;
  settings: {
    max_keepers: number;
    draft_rounds: number;
    trade_deadline: number;
    playoff_week_start: number;
    num_teams: number;
    league_average_match: number;
    leg: number;
    playoff_type: number;
    playoff_round_type: number;
    playoff_seed_type: number;
    playoff_teams: number;
    start_week: number;
  };
  scoring_settings: { [key: string]: number };
  roster_positions: string[];
  previous_league_id?: string;
}

export interface Roster {
  roster_id: number;
  owner_id: string;
  user_id?: string;
  league_id: string;
  players: string[];
  starters: string[];
  reserve: string[] | null;
  taxi: string[] | null;
  settings: {
    wins: number;
    waiver_position: number;
    waiver_budget_used: number;
    total_moves: number;
    ties: number;
    losses: number;
    fpts_decimal: number;
    fpts_against_decimal: number;
    fpts_against: number;
    fpts: number;
  };
  co_owners?: string[] | null;
  keepers?: string[] | null;
  metadata?: { [key: string]: any } | null;
}

export interface Matchup {
  matchup_id: number;
  roster_id: number;
  points: number;
  players: string[];
  starters: string[];
  players_points: { [key: string]: number };
  starters_points: number[];
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