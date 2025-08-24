import React, { useState, useEffect } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { League, Roster, User, TeamStanding } from '../types/sleeper';

interface HomePageProps {
  username?: string;
  leagueId?: string;
  season?: string;
}

const HomePage: React.FC<HomePageProps> = ({ 
  username = '', 
  leagueId = '', 
  season = '2025' 
}) => {
  const [league, setLeague] = useState<League | null>(null);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [currentWeek, setCurrentWeek] = useState(1);

  const calculateStandings = (rosters: Roster[], users: User[]): TeamStanding[] => {
    const userMap = new Map(users.map(user => [user.user_id, user]));
    
    const standings = rosters.map(roster => {
      const user = userMap.get(roster.owner_id);
      
      let teamName = user?.display_name || user?.username || `Team ${roster.roster_id}`;
      
      if (user?.metadata && typeof user.metadata === 'object') {
        const customTeamName = user.metadata.team_name;
        if (customTeamName && typeof customTeamName === 'string') {
          teamName = customTeamName;
        }
      }
      
      return {
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

  useEffect(() => {
    const fetchLeagueData = async () => {
      if (!leagueId) return;
      
      try {
        setLoading(true);
        const [leagueData, rosters, users, week] = await Promise.all([
          sleeperApi.getLeague(leagueId),
          sleeperApi.getLeagueRosters(leagueId),
          sleeperApi.getLeagueUsers(leagueId),
          sleeperApi.getCurrentWeek()
        ]);

        setLeague(leagueData);
        setCurrentWeek(week);
        const calculatedStandings = calculateStandings(rosters, users);
        setStandings(calculatedStandings);
      } catch (err) {
        setError('Failed to fetch league data');
        console.error('Error fetching league data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagueData();
  }, [leagueId, season]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
        <h2>Loading your league data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>{league?.name || 'Fantasy Football League'}</h1>
        <p>Season {season} • Week {currentWeek}</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2>League Standings</h2>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '10px' }}>
          {standings.map((team, index) => (
            <div key={team.roster_id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '10px', 
              borderBottom: index < standings.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none'
            }}>
              <span>{index + 1}. {team.display_name}</span>
              <span>{team.wins}-{team.losses} ({team.points_for.toFixed(1)} PF)</span>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p>🤖 Claude AI team analysis coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;