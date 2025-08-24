import React, { useState, useEffect } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { League, Roster, User, TeamStanding } from '../types/sleeper';
import Standings from './Standings';
import LeagueInfo from './LeagueInfo';

interface DashboardProps {
  username?: string;
  leagueId?: string;
  season?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  username = '', 
  leagueId = '', 
  season = '2024' 
}) => {
  const [league, setLeague] = useState<League | null>(null);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const calculateStandings = (rosters: Roster[], users: User[]): TeamStanding[] => {
    console.log('Calculating standings with rosters:', rosters.length, 'users:', users.length);
    
    const userMap = new Map(users.map(user => [user.user_id, user]));
    console.log('User map:', userMap);
    
    const standings = rosters.map(roster => {
      const user = userMap.get(roster.owner_id);
      console.log('Processing roster:', roster.roster_id, 'owner_id:', roster.owner_id, 'found user:', user);
      console.log('Roster metadata:', roster.metadata);
      
      // Extract team name from user metadata
      let teamName = user?.display_name || user?.username || `Team ${roster.roster_id}`;
      
      // Check if user has a custom team name in their metadata
      if (user?.metadata && typeof user.metadata === 'object') {
        const customTeamName = user.metadata.team_name;
        if (customTeamName && typeof customTeamName === 'string') {
          teamName = customTeamName;
        }
      }
      
      const standing = {
        roster_id: roster.roster_id,
        owner_id: roster.owner_id,
        user_id: roster.owner_id,
        username: user?.username || `Team ${roster.roster_id}`,
        display_name: teamName,
        wins: roster.settings.wins || 0,
        losses: roster.settings.losses || 0,
        ties: roster.settings.ties || 0,
        points_for: (roster.settings.fpts || 0) + ((roster.settings.fpts_decimal || 0) / 100),
        points_against: (roster.settings.fpts_against || 0) + ((roster.settings.fpts_against_decimal || 0) / 100),
        rank: 0
      };
      console.log('Created standing:', standing);
      return standing;
    });

    standings.sort((a, b) => {
      if (a.wins !== b.wins) return b.wins - a.wins;
      if (a.losses !== b.losses) return a.losses - b.losses;
      return b.points_for - a.points_for;
    });

    standings.forEach((team, index) => {
      team.rank = index + 1;
    });

    return standings;
  };

  const fetchLeagueData = async (leagueId: string) => {
    try {
      setLoading(true);
      console.log('Fetching league data for:', leagueId);
      const [leagueData, rosters, users] = await Promise.all([
        sleeperApi.getLeague(leagueId),
        sleeperApi.getLeagueRosters(leagueId),
        sleeperApi.getLeagueUsers(leagueId)
      ]);

      console.log('League data:', leagueData);
      console.log('Rosters:', rosters);
      console.log('Users:', users);

      setLeague(leagueData);
      const calculatedStandings = calculateStandings(rosters, users);
      console.log('Calculated standings:', calculatedStandings);
      setStandings(calculatedStandings);
    } catch (err) {
      setError('Failed to fetch league data');
      console.error('Error fetching league data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLeagues = async (username: string) => {
    try {
      setLoading(true);
      const user = await sleeperApi.getUser(username);
      const leagues = await sleeperApi.getUserLeagues(user.user_id, 'nfl', season);
      
      if (leagues.length > 0) {
        await fetchLeagueData(leagues[0].league_id);
      } else {
        setError('No leagues found for this user');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to fetch user data');
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leagueId) {
      fetchLeagueData(leagueId);
    } else if (username) {
      fetchUserLeagues(username);
    } else {
      setLoading(false);
      setError('Please provide either a username or league ID');
    }
  }, [username, leagueId, season]);

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <LeagueInfo league={league} loading={loading} />
      <Standings standings={standings} loading={loading} />
    </div>
  );
};

export default Dashboard;