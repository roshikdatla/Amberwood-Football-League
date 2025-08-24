import React from 'react';
import { TeamStanding } from '../types/sleeper';

interface CompactStandingsProps {
  standings: TeamStanding[];
  loading: boolean;
  onTeamClick?: (team: TeamStanding) => void;
}

const CompactStandings: React.FC<CompactStandingsProps> = ({ standings, loading, onTeamClick }) => {
  if (loading) {
    return (
      <div className="compact-standings-container">
        <h3>Standings</h3>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="compact-standings-container">
        <h3>Standings</h3>
        <div className="no-data">No standings available</div>
      </div>
    );
  }

  return (
    <div className="compact-standings-container">
      <h3>League Standings</h3>
      <div className="ai-feature-notice">
        <div className="ai-notice-content">
          <img src="/claude-logo.png" alt="Claude" className="claude-logo" width="48" height="48" />
          <small>Click any team for AI analysis (Sonnet-4)</small>
        </div>
      </div>
      <div className="compact-standings-list">
        {standings.map((team, index) => (
          <div 
            key={team.roster_id} 
            className={`compact-standing-row ${onTeamClick ? 'clickable' : ''}`}
            onClick={() => onTeamClick?.(team)}
          >
            <div className="rank">{index + 1}</div>
            <div className="team-info">
              <div className="team-name">{team.display_name}</div>
              <div className="team-record">
                {team.wins}-{team.losses}
                {team.ties > 0 && `-${team.ties}`}
              </div>
            </div>
            <div className="points">{team.points_for.toFixed(0)}</div>
          </div>
        ))}
      </div>
      <div className="standings-footer">
        <small>PF = Points For</small>
      </div>
    </div>
  );
};

export default CompactStandings;