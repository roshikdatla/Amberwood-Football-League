import React from 'react';
import { TeamStanding } from '../types/sleeper';

interface StandingsProps {
  standings: TeamStanding[];
  loading: boolean;
}

const Standings: React.FC<StandingsProps> = ({ standings, loading }) => {
  console.log('Standings component - loading:', loading, 'standings:', standings);
  
  if (loading) {
    return (
      <div className="standings-container">
        <h2>Team Standings</h2>
        <div className="loading">Loading standings...</div>
      </div>
    );
  }

  if (!standings || standings.length === 0) {
    return (
      <div className="standings-container">
        <h2>Team Standings</h2>
        <div className="error">No team data available</div>
      </div>
    );
  }

  return (
    <div className="standings-container">
      <h2>Team Standings</h2>
      <div className="standings-table">
        <div className="standings-header">
          <div className="rank-column">Rank</div>
          <div className="team-column">Team</div>
          <div className="record-column">Record</div>
          <div className="points-column">PF</div>
          <div className="points-column">PA</div>
        </div>
        {standings.map((team, index) => (
          <div key={team.roster_id} className="standings-row">
            <div className="rank-column">{index + 1}</div>
            <div className="team-column">
              {team.display_name || team.username}
            </div>
            <div className="record-column">
              {team.wins}-{team.losses}
              {team.ties > 0 && `-${team.ties}`}
            </div>
            <div className="points-column">{team.points_for.toFixed(1)}</div>
            <div className="points-column">{team.points_against.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Standings;