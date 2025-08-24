import React, { useState, useEffect } from 'react';
import { analyzeTeam } from '../services/aiAnalysis';
import { sleeperApi } from '../services/sleeperApi';
import { TeamStanding } from '../types/sleeper';

interface TeamAnalysisProps {
  team: TeamStanding;
  leagueId: string;
  onClose: () => void;
}

interface PlayerInfo {
  name: string;
  position: string;
  team?: string;
  isStarter: boolean;
}

interface AITeamAnalysis {
  strengths: string[];
  weaknesses: string[];
  startAdvice: string[];
  benchAdvice: string[];
  overallGrade: string;
  summary: string;
}

const TeamAnalysis: React.FC<TeamAnalysisProps> = ({ team, leagueId, onClose }) => {
  const [analysis, setAnalysis] = useState<AITeamAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [players, setPlayers] = useState<PlayerInfo[]>([]);

  useEffect(() => {
    const fetchTeamAnalysis = async () => {
      try {
        setLoading(true);
        setError('');

        // Get roster data for this team
        const rosters = await sleeperApi.getLeagueRosters(leagueId);
        const teamRoster = rosters.find(r => r.roster_id === team.roster_id);
        
        if (!teamRoster) {
          setError('Could not find team roster data');
          return;
        }

        // Get player database
        const allPlayers = await sleeperApi.getAllPlayers();

        // Parse players into starters and bench
        const starters: PlayerInfo[] = (teamRoster.starters || []).map(playerId => ({
          name: allPlayers[playerId]?.full_name || `Player ${playerId}`,
          position: allPlayers[playerId]?.position || 'UNKNOWN',
          team: allPlayers[playerId]?.team || '',
          isStarter: true
        }));

        const benchPlayerIds = (teamRoster.players || []).filter(
          playerId => !teamRoster.starters.includes(playerId)
        );
        
        const bench: PlayerInfo[] = benchPlayerIds.map(playerId => ({
          name: allPlayers[playerId]?.full_name || `Player ${playerId}`,
          position: allPlayers[playerId]?.position || 'UNKNOWN',
          team: allPlayers[playerId]?.team || '',
          isStarter: false
        }));

        setPlayers([...starters, ...bench]);

        // Prepare data for AI analysis
        const teamData = {
          teamName: team.display_name,
          record: `${team.wins}-${team.losses}${team.ties > 0 ? `-${team.ties}` : ''}`,
          totalPoints: team.points_for,
          starters,
          bench
        };

        // Get AI analysis
        const aiAnalysis = await analyzeTeam(teamData);
        setAnalysis(aiAnalysis);

      } catch (err) {
        console.error('Error fetching team analysis:', err);
        setError('Failed to analyze team. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamAnalysis();
  }, [team, leagueId]);

  if (loading) {
    return (
      <div className="team-analysis-overlay">
        <div className="team-analysis-modal">
          <div className="analysis-header">
            <h2>🤖 AI Team Analysis</h2>
            <button onClick={onClose} className="close-btn">✕</button>
          </div>
          <div className="analysis-loading">
            <div className="loading-spinner"></div>
            <p>Analyzing {team.display_name}'s roster...</p>
            <small>Our AI is reviewing players, matchups, and performance data</small>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="team-analysis-overlay">
        <div className="team-analysis-modal">
          <div className="analysis-header">
            <h2>🤖 AI Team Analysis</h2>
            <button onClick={onClose} className="close-btn">✕</button>
          </div>
          <div className="analysis-error">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="team-analysis-overlay">
      <div className="team-analysis-modal">
        <div className="analysis-header">
          <div className="team-info">
            <h2>🤖 AI Analysis: {team.display_name}</h2>
            <div className="team-stats">
              <span className="record">{team.wins}-{team.losses}{team.ties > 0 && `-${team.ties}`}</span>
              <span className="points">{team.points_for.toFixed(1)} PF</span>
              <span className={`grade grade-${analysis.overallGrade.toLowerCase().replace('+', '-plus').replace('-', '-minus')}`}>
                Grade: {analysis.overallGrade}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        <div className="analysis-content">
          <div className="summary-section">
            <h3>📊 Team Summary</h3>
            <p className="summary-text">{analysis.summary}</p>
          </div>

          <div className="analysis-grid">
            <div className="analysis-section strengths">
              <h3>💪 Strengths</h3>
              <ul>
                {analysis.strengths.map((strength: string, index: number) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            <div className="analysis-section weaknesses">
              <h3>⚠️ Areas for Improvement</h3>
              <ul>
                {analysis.weaknesses.map((weakness: string, index: number) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>

            <div className="analysis-section start-advice">
              <h3>🔥 Start Recommendations</h3>
              <ul>
                {analysis.startAdvice.map((advice: string, index: number) => (
                  <li key={index}>{advice}</li>
                ))}
              </ul>
            </div>

            <div className="analysis-section bench-advice">
              <h3>🪑 Bench Management</h3>
              <ul>
                {analysis.benchAdvice.map((advice: string, index: number) => (
                  <li key={index}>{advice}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="roster-preview">
            <h3>👥 Current Roster ({players.length} players)</h3>
            <div className="roster-positions">
              <div className="starters">
                <h4>Starters</h4>
                <div className="player-list">
                  {players.filter(p => p.isStarter).map((player, index) => (
                    <div key={index} className="player-card starter">
                      <span className="position">{player.position}</span>
                      <span className="name">{player.name}</span>
                      <span className="team">{player.team}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bench-players">
                <h4>Bench</h4>
                <div className="player-list">
                  {players.filter(p => !p.isStarter).slice(0, 6).map((player, index) => (
                    <div key={index} className="player-card bench">
                      <span className="position">{player.position}</span>
                      <span className="name">{player.name}</span>
                      <span className="team">{player.team}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="analysis-footer">
          <small>
            🤖 Analysis generated by AI • Updated in real-time • For entertainment purposes
          </small>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalysis;