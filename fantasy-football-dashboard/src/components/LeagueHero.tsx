import React from 'react';
import { League } from '../types/sleeper';

interface LeagueHeroProps {
  league: League | null;
  currentWeek: number;
  loading: boolean;
  seasonLabel?: string;
}

const LeagueHero: React.FC<LeagueHeroProps> = ({ league, currentWeek, loading, seasonLabel = '2026 Season' }) => {
  const totalWeeks = 17; // Standard NFL season weeks
  const progressPercentage = (currentWeek / totalWeeks) * 100;

  if (loading) {
    return (
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="league-title">
            <h1>Loading...</h1>
          </div>
          <p className="league-subtitle loading-hero">Getting your league data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="league-title">
          <h1>{league?.name || 'Amberwood Football League'}</h1>
        </div>
        <p className="league-subtitle">
          Fantasy Football • {seasonLabel}
        </p>
        
        <div className="season-progress">
          <div className="progress-label">Season Progress</div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Week {currentWeek} of {totalWeeks}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeagueHero;
