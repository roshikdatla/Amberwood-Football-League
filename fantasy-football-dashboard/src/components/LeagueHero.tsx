import React from 'react';
import { League } from '../types/sleeper';

interface LeagueHeroProps {
  league: League | null;
  currentWeek: number;
  loading: boolean;
}

const LeagueHero: React.FC<LeagueHeroProps> = ({ league, currentWeek, loading }) => {
  if (loading) {
    return (
      <div className="hero-section">
        <div className="hero-content loading-hero">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (!league) {
    return null;
  }

  const getSeasonProgress = () => {
    const totalWeeks = league.settings.playoff_week_start - 1;
    const progress = Math.min((currentWeek - 1) / totalWeeks * 100, 100);
    return Math.max(progress, 0);
  };

  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="league-title">
          <h1>{league.name}</h1>
          <div className="league-subtitle">
            {league.season} Season • {league.total_rosters} Teams • Week {currentWeek}
          </div>
        </div>
        
        <div className="season-progress">
          <div className="progress-label">Season Progress</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getSeasonProgress()}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Week {currentWeek} of {league.settings.playoff_week_start - 1}
          </div>
        </div>
        
        <div className="league-stats-quick">
          <div className="stat-item">
            <div className="stat-value">{league.settings.playoff_teams}</div>
            <div className="stat-label">Playoff Teams</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">Week {league.settings.trade_deadline}</div>
            <div className="stat-label">Trade Deadline</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{league.status === 'in_season' ? 'Active' : 'Inactive'}</div>
            <div className="stat-label">League Status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueHero;