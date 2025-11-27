import React, { useState, useEffect, useCallback } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { League, Roster, User, TeamStanding } from '../types/sleeper';
import LeagueHero from './LeagueHero';
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
                <a href="/newsletters/week12" className="cta-primary-btn">
                  Read Latest Issue →
                </a>
                <div className="cta-latest">Latest: Week 12 Edition</div>
              </div>
            </div>
          </div>

          <WeeklyMatchups
            leagueId={leagueId}
            currentWeek={currentWeek}
            users={users}
            standings={standings}
          />
        </div>
        
        <div className="sidebar">
          <div className="power-rankings-container">
            <h3>Betting Odds</h3>
            <div className="power-rankings-list">
              <div className="power-ranking-item">
                <div className="rank">1</div>
                <div className="team-analysis">
                  <div className="team-name">Pranav Jain +110</div>
                  <div className="analysis">8-4, 1632 PF, faces abhiu next, 99% playoff</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">2</div>
                <div className="team-analysis">
                  <div className="team-name">Pranav P +200</div>
                  <div className="analysis">6-6, 1735 PF (HIGHEST!), wild card lock, 85%</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">3</div>
                <div className="team-analysis">
                  <div className="team-name">Sahil +250</div>
                  <div className="analysis">7-5, 1690 PF, easiest schedule, 85%</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">4</div>
                <div className="team-analysis">
                  <div className="team-name">Abhishek +300</div>
                  <div className="analysis">8-4, 1596 PF, 1-win from clinch, 85%</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">5</div>
                <div className="team-analysis">
                  <div className="team-name">Aditya +350</div>
                  <div className="analysis">8-4, 1549 PF, 149-pt explosion, 80%</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">6</div>
                <div className="team-analysis">
                  <div className="team-name">Ankith +600</div>
                  <div className="analysis">7-5, 1653 PF, must beat SahitReddi, 60%</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">7</div>
                <div className="team-analysis">
                  <div className="team-name">Sahit Reddi +650</div>
                  <div className="analysis">7-5, 1620 PF, ankithe showdown, 60%</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">8</div>
                <div className="team-analysis">
                  <div className="team-name">Anudeep +800</div>
                  <div className="analysis">7-5, 1636 PF, brutal schedule, 55%</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">9</div>
                <div className="team-analysis">
                  <div className="team-name">Roshik +5000</div>
                  <div className="analysis">5-7, playing spoiler role</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">10</div>
                <div className="team-analysis">
                  <div className="team-name">Taaha +10000</div>
                  <div className="analysis">4-8, eliminated from playoffs</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">11</div>
                <div className="team-analysis">
                  <div className="team-name">Akhil +25000</div>
                  <div className="analysis">3-9, season over</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">12</div>
                <div className="team-analysis">
                  <div className="team-name">Abhiram +50000</div>
                  <div className="analysis">2-10, building for next year</div>
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