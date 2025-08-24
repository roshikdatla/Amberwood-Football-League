import React from 'react';
import { TeamStanding } from '../types/sleeper';

interface LeagueStatsProps {
  standings: TeamStanding[];
  loading: boolean;
}

const LeagueStats: React.FC<LeagueStatsProps> = ({ standings, loading }) => {
  if (loading) {
    return (
      <div className="league-stats-container">
        <h2>League Statistics</h2>
        <div className="loading">Loading stats...</div>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="league-stats-container">
        <h2>League Statistics</h2>
        <div className="no-data">No statistics available</div>
      </div>
    );
  }

  const getHighestScoringTeam = () => {
    return standings.reduce((highest, team) => 
      team.points_for > highest.points_for ? team : highest
    );
  };

  const getLowestScoringTeam = () => {
    return standings.reduce((lowest, team) => 
      team.points_for < lowest.points_for ? team : lowest
    );
  };

  const getBestRecord = () => {
    return standings.reduce((best, team) => {
      const bestWinPct = best.wins / (best.wins + best.losses || 1);
      const teamWinPct = team.wins / (team.wins + team.losses || 1);
      return teamWinPct > bestWinPct ? team : best;
    });
  };

  const getWorstRecord = () => {
    return standings.reduce((worst, team) => {
      const worstWinPct = worst.wins / (worst.wins + worst.losses || 1);
      const teamWinPct = team.wins / (team.wins + team.losses || 1);
      return teamWinPct < worstWinPct ? team : worst;
    });
  };

  const getTotalPoints = () => {
    return standings.reduce((total, team) => total + team.points_for, 0);
  };

  const getAveragePoints = () => {
    return getTotalPoints() / standings.length;
  };

  const highestScorer = getHighestScoringTeam();
  const lowestScorer = getLowestScoringTeam();
  const bestRecord = getBestRecord();
  const worstRecord = getWorstRecord();

  return (
    <div className="league-stats-container">
      <h2>League Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card highlight">
          <div className="stat-header">
            <span className="stat-icon">🏆</span>
            <span className="stat-title">Highest Scoring</span>
          </div>
          <div className="stat-value">{highestScorer.display_name}</div>
          <div className="stat-detail">{highestScorer.points_for.toFixed(1)} points</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">📉</span>
            <span className="stat-title">Lowest Scoring</span>
          </div>
          <div className="stat-value">{lowestScorer.display_name}</div>
          <div className="stat-detail">{lowestScorer.points_for.toFixed(1)} points</div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-header">
            <span className="stat-icon">🔥</span>
            <span className="stat-title">Best Record</span>
          </div>
          <div className="stat-value">{bestRecord.display_name}</div>
          <div className="stat-detail">
            {bestRecord.wins}-{bestRecord.losses}
            {bestRecord.ties > 0 && `-${bestRecord.ties}`}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-icon">❄️</span>
            <span className="stat-title">Worst Record</span>
          </div>
          <div className="stat-value">{worstRecord.display_name}</div>
          <div className="stat-detail">
            {worstRecord.wins}-{worstRecord.losses}
            {worstRecord.ties > 0 && `-${worstRecord.ties}`}
          </div>
        </div>

        <div className="stat-card summary">
          <div className="stat-header">
            <span className="stat-icon">📊</span>
            <span className="stat-title">League Totals</span>
          </div>
          <div className="summary-stats">
            <div className="summary-item">
              <span className="summary-label">Total Points:</span>
              <span className="summary-value">{getTotalPoints().toFixed(1)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Avg Points:</span>
              <span className="summary-value">{getAveragePoints().toFixed(1)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Teams:</span>
              <span className="summary-value">{standings.length}</span>
            </div>
          </div>
        </div>

        <div className="stat-card fun">
          <div className="stat-header">
            <span className="stat-icon">🎯</span>
            <span className="stat-title">League Insights</span>
          </div>
          <div className="insights">
            <div className="insight-item">
              Point differential leader: <strong>{highestScorer.display_name}</strong>
            </div>
            <div className="insight-item">
              Most competitive: <strong>
                {standings.filter(t => Math.abs(t.wins - t.losses) <= 1).length} teams
              </strong> within 1 game
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueStats;