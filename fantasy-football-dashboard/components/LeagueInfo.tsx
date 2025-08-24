import React from 'react';
import { League } from '../types/sleeper';

interface LeagueInfoProps {
  league: League | null;
  loading: boolean;
}

const LeagueInfo: React.FC<LeagueInfoProps> = ({ league, loading }) => {
  if (loading) {
    return (
      <div className="league-info-container">
        <h2>League Information</h2>
        <div className="loading">Loading league info...</div>
      </div>
    );
  }

  if (!league) {
    return null;
  }

  return (
    <div className="league-info-container">
      <h1>{league.name}</h1>
      <div className="league-details">
        <div className="detail-item">
          <span className="label">Season:</span>
          <span className="value">{league.season}</span>
        </div>
        <div className="detail-item">
          <span className="label">Teams:</span>
          <span className="value">{league.total_rosters}</span>
        </div>
        <div className="detail-item">
          <span className="label">Status:</span>
          <span className="value">{league.status}</span>
        </div>
        <div className="detail-item">
          <span className="label">Playoff Teams:</span>
          <span className="value">{league.settings.playoff_teams}</span>
        </div>
        <div className="detail-item">
          <span className="label">Trade Deadline:</span>
          <span className="value">Week {league.settings.trade_deadline}</span>
        </div>
      </div>
    </div>
  );
};

export default LeagueInfo;