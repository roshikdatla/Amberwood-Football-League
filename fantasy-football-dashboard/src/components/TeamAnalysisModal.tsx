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
            <img src="/claude-logo-png_seeklogo-554540.png" alt="Claude" width="40" height="40" />
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
                <h4>📊 Team Summary</h4>
                <div className="team-summary">
                  <p>{analysis.gradeExplanation}</p>
                  <p>{analysis.outlook}</p>
                </div>
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

              <div className="analysis-footer">
                <small>🤖 Analysis powered by Claude (Sonnet-4)</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamAnalysisModal;