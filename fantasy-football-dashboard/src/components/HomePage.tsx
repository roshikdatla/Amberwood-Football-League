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
                <a href="/newsletters/preseason" className="cta-primary-btn">
                  Read Latest Issue →
                </a>
                <div className="cta-latest">Latest: Preseason Edition</div>
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
            <h3>Power Rankings</h3>
            <div className="power-rankings-list">
              <div className="power-ranking-item">
                <div className="rank">1</div>
                <div className="team-analysis">
                  <div className="team-name">Pranav Jain</div>
                  <div className="analysis">Elite WR corps with Jefferson-Nacua creates unmatched weekly ceiling despite QB uncertainty</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">2</div>
                <div className="team-analysis">
                  <div className="team-name">Sahit Reddi</div>
                  <div className="analysis">Incredible WR depth with Hill-Higgins-Adams trio provides matchup flexibility every week</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">3</div>
                <div className="team-analysis">
                  <div className="team-name">Roshik</div>
                  <div className="analysis">Brock Bowers' positional advantage at TE makes up for WR depth concerns</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">4</div>
                <div className="team-analysis">
                  <div className="team-name">Sahil</div>
                  <div className="analysis">Chase-Collins WR combo is elite, but Dak Prescott limits championship upside</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">5</div>
                <div className="team-analysis">
                  <div className="team-name">Taaha</div>
                  <div className="analysis">Four #1 WRs provide safety, though Lions RB dependence caps ceiling potential</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">6</div>
                <div className="team-analysis">
                  <div className="team-name">Anudeep</div>
                  <div className="analysis">Josh Allen's dual-threat ability covers for aging RB corps and depth concerns</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">7</div>
                <div className="team-analysis">
                  <div className="team-name">Abhiram</div>
                  <div className="analysis">Lamar's rushing floor is elite, but rookie dependence creates weekly volatility</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">8</div>
                <div className="team-analysis">
                  <div className="team-name">Akhil</div>
                  <div className="analysis">Brown-McLaurin provides solid WR foundation, Taylor bounce-back questions linger</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">9</div>
                <div className="team-analysis">
                  <div className="team-name">Aditya</div>
                  <div className="analysis">Mahomes-Purdy QB pairing can't overcome inconsistent RB situation and depth issues</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">10</div>
                <div className="team-analysis">
                  <div className="team-name">Abhishek</div>
                  <div className="analysis">Derrick Henry age concerns and WR corps lacking true WR1 upside limit ceiling</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">11</div>
                <div className="team-analysis">
                  <div className="team-name">Ankith</div>
                  <div className="analysis">Young talent promising but McCaffrey injury risk leaves dangerously thin at RB</div>
                </div>
              </div>
              <div className="power-ranking-item">
                <div className="rank">12</div>
                <div className="team-analysis">
                  <div className="team-name">Pranav P</div>
                  <div className="analysis">QB uncertainty with Maye/Fields could waste solid TE advantage and skill position depth</div>
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