import React from 'react';

interface TeamAnalysis {
  teamName: string;
  record: string;
  overallGrade: string;
  gradeExplanation: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
  outlook: string;
  upcomingMatchup: {
    opponent: string;
    prediction: string;
    keyFactors: string[];
    confidence: string;
  };
  rosterAnalysis: {
    qb: string;
    rb: string;
    wr: string;
    te: string;
    flex: string;
    defense: string;
  };
  recentTrends: string[];
}

interface TeamAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: TeamAnalysis | null;
  loading: boolean;
  error: string | null;
}

const TeamAnalysisModal: React.FC<TeamAnalysisModalProps> = ({
  isOpen,
  onClose,
  analysis,
  loading,
  error
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <img src="/claude-logo-png_seeklogo-554540.png" alt="Claude" width="32" height="32" />
            <h2>AI Team Analysis</h2>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="analysis-loading">
              <div className="loading-spinner"></div>
              <p>Claude is analyzing the team...</p>
            </div>
          )}

          {error && (
            <div className="analysis-error">
              <p>❌ {error}</p>
              <p>Using fallback analysis instead.</p>
            </div>
          )}

          {analysis && !loading && (
            <div className="team-analysis">
              <div className="analysis-header">
                <div className="team-info">
                  <h3>{analysis.teamName}</h3>
                  <span className="team-record">{analysis.record}</span>
                </div>
                <div className="team-grade">
                  <div className="grade-value">{analysis.overallGrade}</div>
                  <div className="grade-label">Overall Grade</div>
                </div>
              </div>

              <div className="analysis-section">
                <div className="grade-explanation">
                  <p>{analysis.gradeExplanation}</p>
                </div>
              </div>

              <div className="analysis-section">
                <h4>🎯 Upcoming Matchup</h4>
                <div className="matchup-preview">
                  <div className="matchup-opponent">vs {analysis.upcomingMatchup.opponent}</div>
                  <div className="matchup-prediction">{analysis.upcomingMatchup.prediction}</div>
                  <div className="matchup-confidence">Confidence: {analysis.upcomingMatchup.confidence}</div>
                  <div className="key-factors">
                    <strong>Key Factors:</strong>
                    <ul>
                      {analysis.upcomingMatchup.keyFactors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="analysis-section">
                <h4>📊 Roster Analysis by Position</h4>
                <div className="roster-breakdown">
                  <div className="position-analysis"><strong>QB:</strong> {analysis.rosterAnalysis.qb}</div>
                  <div className="position-analysis"><strong>RB:</strong> {analysis.rosterAnalysis.rb}</div>
                  <div className="position-analysis"><strong>WR:</strong> {analysis.rosterAnalysis.wr}</div>
                  <div className="position-analysis"><strong>TE:</strong> {analysis.rosterAnalysis.te}</div>
                  <div className="position-analysis"><strong>Flex:</strong> {analysis.rosterAnalysis.flex}</div>
                  <div className="position-analysis"><strong>K/DST:</strong> {analysis.rosterAnalysis.defense}</div>
                </div>
              </div>

              <div className="analysis-section">
                <h4>📈 Recent Trends</h4>
                <ul className="analysis-list trends">
                  {analysis.recentTrends.map((trend, index) => (
                    <li key={index}>{trend}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-section">
                <h4>💪 Strengths</h4>
                <ul className="analysis-list strengths">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-section">
                <h4>⚠️ Areas for Improvement</h4>
                <ul className="analysis-list weaknesses">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-section">
                <h4>💡 Strategic Advice</h4>
                <div className="analysis-advice">
                  <p>{analysis.advice}</p>
                </div>
              </div>

              <div className="analysis-section">
                <h4>🔮 Season Outlook</h4>
                <div className="analysis-outlook">
                  <p>{analysis.outlook}</p>
                </div>
              </div>

              <div className="analysis-footer">
                <small>🤖 Deep analysis powered by Claude (Sonnet-4)</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamAnalysisModal;