import React, { useState, useEffect } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { Matchup, TeamStanding } from '../types/sleeper';

interface WeeklyMatchupsProps {
  leagueId: string;
  currentWeek: number;
  standings: TeamStanding[];
  loading: boolean;
}

interface MatchupPair {
  team1: TeamStanding | null;
  team2: TeamStanding | null;
  team1Score: number;
  team2Score: number;
  matchupId: number;
}

const WeeklyMatchups: React.FC<WeeklyMatchupsProps> = ({ 
  leagueId, 
  currentWeek, 
  standings, 
  loading 
}) => {
  const [matchups, setMatchups] = useState<MatchupPair[]>([]);
  const [matchupsLoading, setMatchupsLoading] = useState(true);

  useEffect(() => {
    const fetchMatchups = async () => {
      if (!leagueId || standings.length === 0) return;
      
      try {
        setMatchupsLoading(true);
        const matchupData = await sleeperApi.getLeagueMatchups(leagueId, currentWeek);
        
        // Group matchups by matchup_id
        const matchupGroups: { [key: number]: Matchup[] } = {};
        matchupData.forEach(matchup => {
          if (!matchupGroups[matchup.matchup_id]) {
            matchupGroups[matchup.matchup_id] = [];
          }
          matchupGroups[matchup.matchup_id].push(matchup);
        });

        // Create matchup pairs
        const pairs: MatchupPair[] = [];
        Object.entries(matchupGroups).forEach(([matchupId, matchupTeams]) => {
          if (matchupTeams.length === 2) {
            const team1Standing = standings.find(s => s.roster_id === matchupTeams[0].roster_id);
            const team2Standing = standings.find(s => s.roster_id === matchupTeams[1].roster_id);
            
            pairs.push({
              team1: team1Standing || null,
              team2: team2Standing || null,
              team1Score: matchupTeams[0].points || 0,
              team2Score: matchupTeams[1].points || 0,
              matchupId: parseInt(matchupId)
            });
          }
        });

        setMatchups(pairs);
      } catch (error) {
        console.error('Failed to fetch matchups:', error);
        setMatchups([]);
      } finally {
        setMatchupsLoading(false);
      }
    };

    fetchMatchups();
  }, [leagueId, currentWeek, standings]);

  if (loading || matchupsLoading) {
    return (
      <div className="weekly-matchups-container">
        <h2>This Week's Matchups</h2>
        <div className="loading">Loading matchups...</div>
      </div>
    );
  }

  if (matchups.length === 0) {
    return (
      <div className="weekly-matchups-container">
        <h2>Week {currentWeek} Matchups</h2>
        <div className="no-matchups">No matchups available for this week</div>
      </div>
    );
  }

  return (
    <div className="weekly-matchups-container">
      <h2>Week {currentWeek} Matchups</h2>
      <div className="matchups-grid">
        {matchups.map((matchup, index) => (
          <div key={matchup.matchupId} className="matchup-card">
            <div className="matchup-header">Matchup {index + 1}</div>
            <div className="matchup-teams">
              <div className="team team-1">
                <div className="team-name">
                  {matchup.team1?.display_name || 'Team 1'}
                </div>
                <div className="team-record">
                  {matchup.team1 ? `${matchup.team1.wins}-${matchup.team1.losses}` : '0-0'}
                </div>
                <div className="team-score">{matchup.team1Score.toFixed(1)}</div>
              </div>
              
              <div className="vs-divider">VS</div>
              
              <div className="team team-2">
                <div className="team-name">
                  {matchup.team2?.display_name || 'Team 2'}
                </div>
                <div className="team-record">
                  {matchup.team2 ? `${matchup.team2.wins}-${matchup.team2.losses}` : '0-0'}
                </div>
                <div className="team-score">{matchup.team2Score.toFixed(1)}</div>
              </div>
            </div>
            
            {matchup.team1Score > 0 || matchup.team2Score > 0 ? (
              <div className="matchup-status completed">Final</div>
            ) : (
              <div className="matchup-status upcoming">Upcoming</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyMatchups;