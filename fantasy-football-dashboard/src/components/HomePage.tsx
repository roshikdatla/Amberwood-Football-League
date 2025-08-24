import React, { useState, useEffect } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { League, Roster, User, TeamStanding } from '../types/sleeper';
import LeagueHero from './LeagueHero';
import Navigation from './Navigation';

interface HomePageProps {
  username?: string;
  leagueId?: string;
  season?: string;
}

const HomePage: React.FC<HomePageProps> = ({ 
  username = '', 
  leagueId = '', 
  season = '2025' 
}) => {
  const [league, setLeague] = useState<League | null>(null);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [currentWeek, setCurrentWeek] = useState(1);

  const calculateStandings = (rosters: Roster[], users: User[]): TeamStanding[] => {
    const userMap = new Map(users.map(user => [user.user_id, user]));
    
    const standings = rosters.map(roster => {
      const user = userMap.get(roster.owner_id);
      
      let teamName = user?.display_name || user?.username || `Team ${roster.roster_id}`;
      
      if (user?.metadata && typeof user.metadata === 'object') {
        const customTeamName = user.metadata.team_name;
        if (customTeamName && typeof customTeamName === 'string') {
          teamName = customTeamName;
        }
      }
      
      return {
        roster_id: roster.roster_id,
        owner_id: roster.owner_id,
        user_id: roster.owner_id,
        username: user?.username || `Team ${roster.roster_id}`,
        display_name: teamName,
        wins: roster.settings.wins || 0,
        losses: roster.settings.losses || 0,
        ties: roster.settings.ties || 0,
        points_for: (roster.settings.fpts || 0) + ((roster.settings.fpts_decimal || 0) / 100),
        points_against: (roster.settings.fpts_against || 0) + ((roster.settings.fpts_against_decimal || 0) / 100),
        rank: 0
      };
    });

    standings.sort((a, b) => {
      if (a.wins !== b.wins) return b.wins - a.wins;
      if (a.losses !== b.losses) return a.losses - b.losses;
      return b.points_for - a.points_for;
    });

    standings.forEach((team, index) => {
      team.rank = index + 1;
    });

    return standings;
  };

  const fetchLeagueData = async (leagueId: string) => {
    try {
      setLoading(true);
      const [leagueData, rosters, users, week] = await Promise.all([
        sleeperApi.getLeague(leagueId),
        sleeperApi.getLeagueRosters(leagueId),
        sleeperApi.getLeagueUsers(leagueId),
        sleeperApi.getCurrentWeek()
      ]);

      setLeague(leagueData);
      setCurrentWeek(week);
      const calculatedStandings = calculateStandings(rosters, users);
      setStandings(calculatedStandings);
    } catch (err) {
      setError('Failed to fetch league data');
      console.error('Error fetching league data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leagueId) {
      fetchLeagueData(leagueId);
    } else {
      setLoading(false);
      setError('Please provide league ID');
    }
  }, [leagueId, season]);

  if (error) {
    return (
      <div className="homepage-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      <Navigation currentPage="home" />
      <LeagueHero league={league} currentWeek={currentWeek} loading={loading} />
      
      <div className="homepage-content">
        <div className="main-content">
          <div className="newsletter-cta">
            <div className="cta-content">
              <div className="cta-icon">📰</div>
              <div className="cta-text">
                <h2>Weekly Newsletter</h2>
                <p>Get the inside scoop on league drama, player analysis, and hot takes delivered weekly!</p>
              </div>
              <div className="cta-actions">
                <a href="/newsletters" className="cta-primary-btn">
                  View All Newsletters →
                </a>
                <div className="cta-latest">Latest: Week {currentWeek > 1 ? currentWeek - 1 : 1} Recap</div>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
            padding: '30px',
            marginBottom: '30px'
          }}>
            <h2 style={{ color: '#333', marginBottom: '25px', fontSize: '1.5rem' }}>League Standings</h2>
            <div>
              {standings.map((team, index) => (
                <div key={team.roster_id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '15px', 
                  borderBottom: index < standings.length - 1 ? '1px solid #eee' : 'none',
                  borderRadius: '6px',
                  background: '#fff',
                  marginBottom: '5px',
                  border: '1px solid #eee'
                }}>
                  <span style={{ fontWeight: '500', color: '#333' }}>
                    {index + 1}. {team.display_name}
                  </span>
                  <span style={{ color: '#666' }}>
                    {team.wins}-{team.losses} • {team.points_for.toFixed(1)} PF
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
            padding: '30px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666', margin: 0 }}>🤖 Claude AI team analysis coming soon!</p>
          </div>
        </div>
        
        <div className="sidebar">
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
                <div key={team.roster_id} className="compact-standing-row">
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;