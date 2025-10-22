import React, { useState, useEffect, useCallback } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { League, Roster, User, TeamStanding } from '../types/sleeper';
import LeagueHero from './LeagueHero';
import ActivityFeed from './ActivityFeed';
import WeeklyMatchups from './WeeklyMatchups';

interface HomePageProps {
  leagueId?: string;
  season?: string;
}

const HomePage: React.FC<HomePageProps> = ({ 
  leagueId = '', 
  season = '2025' 
}) => {
  const [league, setLeague] = useState<League | null>(null);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [currentWeek, setCurrentWeek] = useState(1);
  
  // Unused modal states removed for power rankings implementation

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

  const fetchLeagueData = useCallback(async (leagueId: string) => {
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
      setUsers(users);
      const calculatedStandings = calculateStandings(rosters, users);
      setStandings(calculatedStandings);
    } catch (err) {
      setError('Failed to fetch league data');
      console.error('Error fetching league data:', err);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (leagueId) {
      fetchLeagueData(leagueId);
    } else {
      setLoading(false);
      setError('Please provide league ID');
    }
  }, [leagueId, season, fetchLeagueData]);

  if (error) {
    return (
      <div className="homepage-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="homepage-container">
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
                <a href="/newsletters/week7" className="cta-primary-btn">
                  Read Latest Issue →
                </a>
                <div className="cta-latest">Latest: Week 7 Edition</div>
              </div>
            </div>
          </div>

          <WeeklyMatchups 
            leagueId={leagueId} 
            currentWeek={currentWeek} 
            users={users} 
            standings={standings} 
          />
          
          <ActivityFeed leagueId={leagueId} standings={standings} />
        </div>
        
        <div className="sidebar">
          <div className="power-rankings-container">
            <h3>Betting Odds</h3>
            <div className="power-rankings-list">
              <div className="power-ranking-item">
                <div className="rank">1</div>
                <div className="team-analysis">
                  <div className="team-name">Pranav Jain +150</div>
                  <div className="analysis">6-1 leader, 1009 PF, 98% playoff lock</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">2</div>
                <div className="team-analysis">
                  <div className="team-name">Sahit Reddi +300</div>
                  <div className="analysis">5-2, 5-game win streak, 969 PF, 95% playoffs</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">3</div>
                <div className="team-analysis">
                  <div className="team-name">Ankith +400</div>
                  <div className="analysis">4-3, 186-pt explosion, 999 PF, 85% playoffs</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">4</div>
                <div className="team-analysis">
                  <div className="team-name">Sahil +600</div>
                  <div className="analysis">4-3, Chase boom-bust, 975 PF, 80% playoffs</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">5</div>
                <div className="team-analysis">
                  <div className="team-name">Aditya +800</div>
                  <div className="analysis">4-3, Mahomes elite QB, 958 PF, 75% playoffs</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">6</div>
                <div className="team-analysis">
                  <div className="team-name">Anudeep +1000</div>
                  <div className="analysis">4-3, heartbreaking loss, 935 PF, 75% playoffs</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">7</div>
                <div className="team-analysis">
                  <div className="team-name">Pranav P +1200</div>
                  <div className="analysis">3-4 but 995 PF wild card, 75% playoffs</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">8</div>
                <div className="team-analysis">
                  <div className="team-name">Akhil +2000</div>
                  <div className="analysis">3-4, 1.30-pt miracle, 884 PF, 45% playoffs</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">9</div>
                <div className="team-analysis">
                  <div className="team-name">Abhishek +2500</div>
                  <div className="analysis">3-4, boom-bust spiraling, 880 PF, 45%</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">10</div>
                <div className="team-analysis">
                  <div className="team-name">Taaha +5000</div>
                  <div className="analysis">3-4, low ceiling, 832 PF, 35% playoffs</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">11</div>
                <div className="team-analysis">
                  <div className="team-name">Roshik +10000</div>
                  <div className="analysis">2-5, need 6-2 finish, 864 PF, 15%</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">12</div>
                <div className="team-analysis">
                  <div className="team-name">Abhiram +25000</div>
                  <div className="analysis">1-6, first win, 873 PF, 5% playoffs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;