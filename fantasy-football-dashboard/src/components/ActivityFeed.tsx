import React, { useState, useEffect } from 'react';
import { sleeperApi } from '../services/sleeperApi';

interface ActivityFeedProps {
  leagueId: string;
  loading: boolean;
  standings: any[];
}

interface ActivityItem {
  id: string;
  type: 'trade' | 'waiver' | 'add' | 'drop' | 'free_agent';
  description: string;
  timestamp: Date;
  teams: string[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ leagueId, loading, standings }) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!leagueId || standings.length === 0) return;
      
      try {
        setActivityLoading(true);
        
        // Create user mapping from standings - map by roster_id instead of user_id
        const userMap = new Map(standings.map(team => [team.roster_id.toString(), team.display_name]));
        console.log('User mapping for activity feed:', userMap);
        
        // Fetch transactions from current week and previous weeks
        const currentWeek = await sleeperApi.getCurrentWeek();
        const transactionPromises = [];
        
        // Get transactions from last few weeks
        for (let week = Math.max(1, currentWeek - 3); week <= currentWeek; week++) {
          transactionPromises.push(sleeperApi.getLeagueTransactions(leagueId, week));
        }
        
        const allTransactions = await Promise.all(transactionPromises);
        const flatTransactions = allTransactions.flat();
        console.log('Transactions found:', flatTransactions);
        
        // Get player data for names
        const players = await sleeperApi.getAllPlayers();
        
        // Convert transactions to activities
        const parsedActivities: ActivityItem[] = [];
        
        flatTransactions.forEach((transaction: any) => {
          if (!transaction || !transaction.type) return;
          
          const timestamp = new Date(transaction.created);
          
          // Handle different transaction types
          switch (transaction.type) {
            case 'waiver':
              if (transaction.adds && transaction.drops) {
                Object.entries(transaction.adds).forEach(([playerId, rosterId]) => {
                  const playerName = players[playerId]?.full_name || `Player ${playerId}`;
                  const teamName = userMap.get((rosterId as number).toString()) || 'Unknown Team';
                  
                  parsedActivities.push({
                    id: `${transaction.transaction_id}-${playerId}-add`,
                    type: 'waiver',
                    description: `${teamName} claimed ${playerName} from waivers`,
                    timestamp,
                    teams: [teamName]
                  });
                });
              }
              break;
              
            case 'free_agent':
              if (transaction.adds) {
                Object.entries(transaction.adds).forEach(([playerId, rosterId]) => {
                  const playerName = players[playerId]?.full_name || `Player ${playerId}`;
                  const teamName = userMap.get((rosterId as number).toString()) || 'Unknown Team';
                  
                  parsedActivities.push({
                    id: `${transaction.transaction_id}-${playerId}-add`,
                    type: 'add',
                    description: `${teamName} added ${playerName} from free agency`,
                    timestamp,
                    teams: [teamName]
                  });
                });
              }
              
              if (transaction.drops) {
                Object.entries(transaction.drops).forEach(([playerId, rosterId]) => {
                  const playerName = players[playerId]?.full_name || `Player ${playerId}`;
                  const teamName = userMap.get((rosterId as number).toString()) || 'Unknown Team';
                  
                  parsedActivities.push({
                    id: `${transaction.transaction_id}-${playerId}-drop`,
                    type: 'drop',
                    description: `${teamName} dropped ${playerName}`,
                    timestamp,
                    teams: [teamName]
                  });
                });
              }
              break;
              
            case 'trade':
              if (transaction.roster_ids && transaction.roster_ids.length >= 2) {
                const team1 = userMap.get(transaction.roster_ids[0].toString()) || 'Team 1';
                const team2 = userMap.get(transaction.roster_ids[1].toString()) || 'Team 2';
                
                parsedActivities.push({
                  id: `${transaction.transaction_id}-trade`,
                  type: 'trade',
                  description: `${team1} completed a trade with ${team2}`,
                  timestamp,
                  teams: [team1, team2]
                });
              }
              break;
          }
        });
        
        // Sort by timestamp (newest first) and limit to 10
        const sortedActivities = parsedActivities
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, 10);
        
        setActivities(sortedActivities);
        
        // If no real activities found, show a message
        if (sortedActivities.length === 0) {
          setActivities([{
            id: 'no-activity',
            type: 'add',
            description: 'No recent league activity found. The season may not have started yet!',
            timestamp: new Date(),
            teams: []
          }]);
        }
        
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setActivities([{
          id: 'error',
          type: 'add',
          description: 'Unable to load recent activity at this time.',
          timestamp: new Date(),
          teams: []
        }]);
      } finally {
        setActivityLoading(false);
      }
    };

    fetchTransactions();
  }, [leagueId, standings]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trade': return '🔄';
      case 'waiver': return '⚡';
      case 'add': return '➕';
      case 'drop': return '➖';
      default: return '📝';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  if (loading || activityLoading) {
    return (
      <div className="activity-feed-container">
        <h2>Recent League Activity</h2>
        <div className="loading">Loading recent activity...</div>
      </div>
    );
  }

  return (
    <div className="activity-feed-container">
      <h2>Recent League Activity</h2>
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className={`activity-item ${activity.type}`}>
            <div className="activity-icon">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <div className="activity-description">
                {activity.description}
              </div>
              <div className="activity-time">
                {getTimeAgo(activity.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities.length > 0 && activities[0].id !== 'no-activity' && activities[0].id !== 'error' && (
        <div className="activity-footer">
          <small>Showing recent transactions from your Sleeper league</small>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;