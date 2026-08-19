import React, { useState, useEffect, useCallback } from 'react';
import { sleeperApi } from '../services/sleeperApi';
import { League, Roster, User, TeamStanding } from '../types/sleeper';
import LeagueHero from './LeagueHero';
import WeeklyMatchups from './WeeklyMatchups';
import { SeasonConfig } from '../config/seasons';

interface HomePageProps {
  leagueId?: string;
  season?: string;
  seasonConfig?: SeasonConfig;
}

const championshipOdds = [
  { manager: 'Pranav J', odds: '+450', case: 'League-best WR and flex rooms, plus the Puka revenge tour' },
  { manager: 'Ankith', odds: '+550', case: 'Chase, Jeanty, and Rice give this roster weekly fireworks' },
  { manager: 'Anudeep', odds: '+650', case: 'Amberwood\'s top RB room can control every flex matchup' },
  { manager: 'Sahil', odds: '+750', case: 'The defending champion returns with an elite WR trio' },
  { manager: 'Pranav P', odds: '+900', case: 'CMC, Hampton, and Nabers anchor the most balanced contender' },
  { manager: 'Roshik', odds: '+1000', case: 'Bijan, Lamar, and Bowers create three premium weekly edges' },
  { manager: 'Abhishek', odds: '+1200', case: 'Middle-round volume produced the league\'s deepest flex bench' },
  { manager: 'Aditya', odds: '+1400', case: 'Nico and James Cook lead a roster built for a breakout bet' },
  { manager: 'Gary', odds: '+1700', case: 'Josh Allen, Amon-Ra, and Jonathan Taylor can win any week' },
  { manager: 'Sahit', odds: '+2000', case: 'A.J. Brown, Saquon, Maye, and Loveland carry real ceiling' },
  { manager: 'Taaha', odds: '+2500', case: 'JSN, Kyren, and Walker headline a high-variance uprising' },
  { manager: 'Abhiram', odds: '+3500', case: 'Elite RB and TE talent awaits one decisive quarterback move' },
];

const HomePage: React.FC<HomePageProps> = ({ 
  leagueId = '', 
  season = '2026',
  seasonConfig,
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
      setCurrentWeek(seasonConfig?.currentWeekOverride || week);
      setUsers(users);
      const calculatedStandings = calculateStandings(rosters, users);
      setStandings(calculatedStandings);
    } catch (err) {
      setError('Failed to fetch league data');
      console.error('Error fetching league data:', err);
    } finally {
      setLoading(false);
    }
  }, [seasonConfig?.currentWeekOverride]);


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
      <LeagueHero
        league={league}
        currentWeek={currentWeek}
        loading={loading}
        seasonLabel={seasonConfig?.label || `${season} Season`}
      />
      
      <div className="homepage-content">
        <div className="main-content">
          {seasonConfig && !seasonConfig.isLeagueIdConfigured && (
            <div className="season-config-notice">
              2026 Sleeper league ID is not configured yet. Live tables are
              temporarily using the archived league connection.
            </div>
          )}

          <div className="newsletter-cta">
            <div className="cta-content">
              <div className="cta-icon">📰</div>
              <div className="cta-text">
                <h2>Weekly Newsletter</h2>
                <p>Get the inside scoop on league drama, player analysis, and hot takes delivered weekly!</p>
              </div>
              <div className="cta-actions">
                <a href={seasonConfig?.latestNewsletterPath || '/newsletters'} className="cta-primary-btn">
                  Open Newsletter Hub →
                </a>
                <div className="cta-latest">
                  Latest: {seasonConfig?.latestNewsletterLabel || `${season} Season Hub`}
                </div>
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
            <h3>{seasonConfig?.shortLabel || season} Championship Betting Odds</h3>
            <div className="power-rankings-list">
              {championshipOdds.map((team, index) => (
                <div className="power-ranking-item" key={team.manager}>
                  <div className="rank">{index + 1}</div>
                  <div className="team-analysis">
                    <div className="team-name">{team.manager} {team.odds}</div>
                    <div className="analysis">{team.case}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
