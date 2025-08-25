import React, { useState, useEffect } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { User, TeamStanding } from '../types/sleeper';

interface Matchup {
  matchup_id: number;
  roster_id: number;
  points: number;
  starters: string[];
  players_points: { [key: string]: number };
}

interface WeeklyMatchupsProps {
  leagueId: string;
  currentWeek: number;
  users: User[];
  standings: TeamStanding[];
}

const WeeklyMatchups: React.FC<WeeklyMatchupsProps> = ({ 
  leagueId, 
  currentWeek, 
  users, 
  standings 
}) => {
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        setLoading(true);
        const matchupData = await sleeperApi.getMatchups(leagueId, currentWeek);
        setMatchups(matchupData || []);
      } catch (err) {
        setError('Failed to fetch matchups');
        console.error('Matchups error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (leagueId && currentWeek) {
      fetchMatchups();
    }
  }, [leagueId, currentWeek]);

  const getTeamName = (rosterId: number): string => {
    const standing = standings.find(s => s.roster_id === rosterId);
    return standing?.display_name || `Team ${rosterId}`;
  };

  const getTeamRecord = (rosterId: number): string => {
    const standing = standings.find(s => s.roster_id === rosterId);
    if (!standing) return '0-0';
    return `${standing.wins}-${standing.losses}${standing.ties > 0 ? `-${standing.ties}` : ''}`;
  };

  const organizeMatchups = () => {
    const matchupGroups: { [key: number]: Matchup[] } = {};
    
    matchups.forEach(matchup => {
      if (!matchupGroups[matchup.matchup_id]) {
        matchupGroups[matchup.matchup_id] = [];
      }
      matchupGroups[matchup.matchup_id].push(matchup);
    });

    return Object.values(matchupGroups).filter(group => group.length === 2);
  };

  if (loading) {
    return (
      <div className="weekly-matchups-container">
        <h3>Week {currentWeek} Matchups</h3>
        <div className="loading">Loading matchups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weekly-matchups-container">
        <h3>Week {currentWeek} Matchups</h3>
        <div className="error">{error}</div>
      </div>
    );
  }

  const organizedMatchups = organizeMatchups();

  return (
    <div className="weekly-matchups-container">
      <h3>Week {currentWeek} Matchups</h3>
      {organizedMatchups.length === 0 ? (
        <div className="no-matchups">
          <p>No matchups available for this week</p>
        </div>
      ) : (
        <div className="matchups-list">
          {organizedMatchups.map((matchupPair, index) => {
            const [team1, team2] = matchupPair;
            const team1Winning = team1.points > team2.points;
            const team2Winning = team2.points > team1.points;

            return (
              <div key={index} className="matchup-card">
                <div className={`team-matchup ${team1Winning ? 'winning' : 'losing'}`}>
                  <div className="team-info">
                    <div className="team-name">{getTeamName(team1.roster_id)}</div>
                    <div className="team-record">{getTeamRecord(team1.roster_id)}</div>
                  </div>
                  <div className="team-points">
                    {team1.points?.toFixed(1) || '0.0'}
                  </div>
                </div>
                
                <div className="matchup-vs">vs</div>
                
                <div className={`team-matchup ${team2Winning ? 'winning' : 'losing'}`}>
                  <div className="team-info">
                    <div className="team-name">{getTeamName(team2.roster_id)}</div>
                    <div className="team-record">{getTeamRecord(team2.roster_id)}</div>
                  </div>
                  <div className="team-points">
                    {team2.points?.toFixed(1) || '0.0'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeeklyMatchups;