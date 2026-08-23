import React, { useState, useEffect, useCallback } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { castMatchupVote, getMatchupVotes, VoteResults } from '../services/voteApi';
import { User, TeamStanding } from '../types/sleeper';

interface Matchup {
  matchup_id: number;
  roster_id: number;
  points: number;
  starters: string[];
  players_points: { [key: string]: number };
}

interface WeeklyMatchupsProps {
  leagueId: string;
  currentWeek: number;
  users: User[];
  standings: TeamStanding[];
}

const WeeklyMatchups: React.FC<WeeklyMatchupsProps> = ({ 
  leagueId, 
  currentWeek, 
  users, 
  standings 
}) => {
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [voteResults, setVoteResults] = useState<VoteResults>({ matchups: {}, selections: {} });
  const [votesLoading, setVotesLoading] = useState(true);
  const [submittingMatchup, setSubmittingMatchup] = useState<number | null>(null);
  const [voteError, setVoteError] = useState('');

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        setLoading(true);
        const matchupData = await sleeperApi.getMatchups(leagueId, currentWeek);
        setMatchups(matchupData || []);
      } catch (err) {
        setError('Failed to fetch matchups');
        console.error('Matchups error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (leagueId && currentWeek) {
      fetchMatchups();
    }
  }, [leagueId, currentWeek]);

  const loadVotes = useCallback(async () => {
    try {
      setVotesLoading(true);
      setVoteError('');
      setVoteResults(await getMatchupVotes(leagueId, currentWeek));
    } catch (err) {
      console.error('Vote totals error:', err);
      setVoteError('Fan voting is temporarily unavailable.');
    } finally {
      setVotesLoading(false);
    }
  }, [leagueId, currentWeek]);

  useEffect(() => {
    if (leagueId && currentWeek) {
      loadVotes();
    }
  }, [leagueId, currentWeek, loadVotes]);

  const handleVote = async (matchupId: number, rosterId: number) => {
    if (voteResults.selections[String(matchupId)] || submittingMatchup !== null) return;

    try {
      setSubmittingMatchup(matchupId);
      setVoteError('');
      const results = await castMatchupVote({
        league_id: leagueId,
        week: currentWeek,
        matchup_id: matchupId,
        roster_id: rosterId,
      });
      setVoteResults(results);
    } catch (err) {
      console.error('Vote submission error:', err);
      setVoteError(err instanceof Error ? err.message : 'Your vote could not be recorded.');

      await loadVotes();
    } finally {
      setSubmittingMatchup(null);
    }
  };

  const getTeamName = (rosterId: number): string => {
    const standing = standings.find(s => s.roster_id === rosterId);
    return standing?.display_name || `Team ${rosterId}`;
  };

  const getTeamRecord = (rosterId: number): string => {
    const standing = standings.find(s => s.roster_id === rosterId);
    if (!standing) return '0-0';
    return `${standing.wins}-${standing.losses}${standing.ties > 0 ? `-${standing.ties}` : ''}`;
  };

  const organizeMatchups = () => {
    const matchupGroups: { [key: number]: Matchup[] } = {};
    
    matchups.forEach(matchup => {
      if (!matchupGroups[matchup.matchup_id]) {
        matchupGroups[matchup.matchup_id] = [];
      }
      matchupGroups[matchup.matchup_id].push(matchup);
    });

    return Object.values(matchupGroups).filter(group => group.length === 2);
  };

  if (loading) {
    return (
      <div className="weekly-matchups-container">
        <h3>Week {currentWeek} Matchups</h3>
        <div className="loading">Loading matchups...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weekly-matchups-container">
        <h3>Week {currentWeek} Matchups</h3>
        <div className="error">{error}</div>
      </div>
    );
  }

  const organizedMatchups = organizeMatchups();

  return (
    <div className="weekly-matchups-container">
      <h3>Week {currentWeek} Matchups</h3>
      {organizedMatchups.length === 0 ? (
        <div className="no-matchups">
          <p>No matchups available for this week</p>
        </div>
      ) : (
        <div className="matchups-list">
          {organizedMatchups.map((matchupPair, index) => {
            const [team1, team2] = matchupPair;
            const team1Winning = team1.points > team2.points;
            const team2Winning = team2.points > team1.points;
            const matchupId = team1.matchup_id;
            const matchupVotes = voteResults.matchups[String(matchupId)] || {};
            const team1Votes = matchupVotes[String(team1.roster_id)] || 0;
            const team2Votes = matchupVotes[String(team2.roster_id)] || 0;
            const totalVotes = team1Votes + team2Votes;
            const team1Percent = totalVotes ? Math.round((team1Votes / totalVotes) * 100) : 0;
            const team2Percent = totalVotes ? 100 - team1Percent : 0;
            const selectedRosterId = voteResults.selections[String(matchupId)];
            const voteIsLocked = Boolean(selectedRosterId);
            const isSubmitting = submittingMatchup === matchupId;

            return (
              <div key={`${matchupId}-${index}`} className="matchup-card-shell">
                <div className="matchup-card">
                  <div className={`team-matchup ${team1Winning ? 'winning' : 'losing'}`}>
                    <div className="team-info">
                      <div className="team-name">{getTeamName(team1.roster_id)}</div>
                      <div className="team-record">{getTeamRecord(team1.roster_id)}</div>
                    </div>
                    <div className="team-points">
                      {team1.points?.toFixed(1) || '0.0'}
                    </div>
                  </div>

                  <div className="matchup-vs">vs</div>

                  <div className={`team-matchup ${team2Winning ? 'winning' : 'losing'}`}>
                    <div className="team-info">
                      <div className="team-name">{getTeamName(team2.roster_id)}</div>
                      <div className="team-record">{getTeamRecord(team2.roster_id)}</div>
                    </div>
                    <div className="team-points">
                      {team2.points?.toFixed(1) || '0.0'}
                    </div>
                  </div>
                </div>

                <div className="matchup-poll" aria-label={`Vote on matchup ${matchupId}`}>
                  <div className="matchup-poll-heading">
                    <strong>{voteIsLocked ? 'Your pick is locked in' : 'Who wins?'}</strong>
                    <span>{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}</span>
                  </div>

                  <div className="matchup-poll-options">
                    {[team1, team2].map((team, teamIndex) => {
                      const teamVotes = teamIndex === 0 ? team1Votes : team2Votes;
                      const teamPercent = teamIndex === 0 ? team1Percent : team2Percent;
                      const isSelected = selectedRosterId === team.roster_id;

                      return (
                        <button
                          type="button"
                          className={`matchup-vote-button${isSelected ? ' selected' : ''}`}
                          key={team.roster_id}
                          onClick={() => handleVote(matchupId, team.roster_id)}
                          disabled={voteIsLocked || isSubmitting || votesLoading || Boolean(voteError)}
                          aria-pressed={isSelected}
                        >
                          <span>{getTeamName(team.roster_id)}</span>
                          <b>{teamVotes} · {teamPercent}%</b>
                        </button>
                      );
                    })}
                  </div>

                  <div className="matchup-vote-meter" aria-hidden="true">
                    <span style={{ width: `${totalVotes ? team1Percent : 50}%` }} />
                  </div>

                  {votesLoading && <p className="matchup-poll-status">Loading fan picks…</p>}
                  {!votesLoading && voteIsLocked && (
                    <p className="matchup-poll-status">One vote per visitor · Thanks for picking.</p>
                  )}
                </div>
              </div>
            );
          })}
          {voteError && (
            <div className="matchup-poll-error" role="status">
              <span>{voteError}</span>
              <button type="button" onClick={loadVotes}>Retry</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeeklyMatchups;
