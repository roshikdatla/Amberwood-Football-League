import React, { useState, useEffect } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { League, Roster, User, TeamStanding } from '../types/sleeper';
import LeagueHero from './LeagueHero';
import WeeklyMatchups from './WeeklyMatchups';
import ActivityFeed from './ActivityFeed';
import LeagueStats from './LeagueStats';
import CompactStandings from './CompactStandings';
import TeamAnalysis from './TeamAnalysis';

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
  const [selectedTeam, setSelectedTeam] = useState<TeamStanding | null>(null);

  const calculateStandings = (rosters: Roster[], users: User[]): TeamStanding[] => {
    const userMap = new Map(users.map(user => [user.user_id, user]));
    
    const standings = rosters.map(roster => {
      const user = userMap.get(roster.owner_id);
      
      // Extract team name from user metadata
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

          <WeeklyMatchups 
            leagueId={leagueId} 
            currentWeek={currentWeek} 
            standings={standings}
            loading={loading} 
          />
          <ActivityFeed leagueId={leagueId} loading={loading} standings={standings} />
          <LeagueStats standings={standings} loading={loading} />
        </div>
        
        <div className="sidebar">
          <CompactStandings 
            standings={standings} 
            loading={loading} 
            onTeamClick={setSelectedTeam}
          />
        </div>
      </div>
      
      {selectedTeam && (
        <TeamAnalysis
          team={selectedTeam}
          leagueId={leagueId}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  );
};

export default HomePage;