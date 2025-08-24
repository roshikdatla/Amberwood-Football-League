import React from 'react';

interface TeamAnalysis {
  teamName: string;
  record: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
  outlook: string;
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
            <img src="./claude-logo-png_seeklogo-554540.png" alt="Claude" width="32" height="32" />
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
                <h3>{analysis.teamName}</h3>
                <span className="team-record">{analysis.record}</span>
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