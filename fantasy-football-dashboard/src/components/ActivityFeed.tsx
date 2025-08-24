import React, { useState, useEffect } from 'react';
import { sleeperApi } from '../services/sleeperApi';

interface Transaction {
  transaction_id: string;
  type: string;
  status: string;
  created: number;
  roster_ids: number[];
  adds: { [key: string]: number } | null;
  drops: { [key: string]: number } | null;
  waiver_budget: any[];
}

interface ActivityFeedProps {
  leagueId: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ leagueId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [players, setPlayers] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setLoading(true);
        const [transactionData, playersData] = await Promise.all([
          sleeperApi.getLeagueTransactions(leagueId),
          sleeperApi.getAllPlayers()
        ]);
        
        setTransactions(transactionData.slice(0, 10)); // Show last 10 transactions
        setPlayers(playersData);
      } catch (err) {
        setError('Failed to fetch activity data');
        console.error('Activity feed error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (leagueId) {
      fetchActivityData();
    }
  }, [leagueId]);

  const getPlayerName = (playerId: string): string => {
    const player = players[playerId];
    if (!player) return `Player ${playerId}`;
    return `${player.first_name || ''} ${player.last_name || ''}`.trim() || player.full_name || `Player ${playerId}`;
  };

  const getTransactionDescription = (transaction: Transaction): string => {
    const timeAgo = Math.floor((Date.now() - transaction.created) / (1000 * 60 * 60 * 24));
    const timeText = timeAgo === 0 ? 'Today' : `${timeAgo}d ago`;

    if (transaction.type === 'waiver') {
      if (transaction.adds && transaction.drops) {
        const addedPlayers = Object.keys(transaction.adds).map(getPlayerName);
        const droppedPlayers = Object.keys(transaction.drops).map(getPlayerName);
        return `Waiver: Added ${addedPlayers.join(', ')} • Dropped ${droppedPlayers.join(', ')} (${timeText})`;
      } else if (transaction.adds) {
        const addedPlayers = Object.keys(transaction.adds).map(getPlayerName);
        return `Waiver: Added ${addedPlayers.join(', ')} (${timeText})`;
      }
    } else if (transaction.type === 'free_agent') {
      if (transaction.adds && transaction.drops) {
        const addedPlayers = Object.keys(transaction.adds).map(getPlayerName);
        const droppedPlayers = Object.keys(transaction.drops).map(getPlayerName);
        return `Free Agent: Added ${addedPlayers.join(', ')} • Dropped ${droppedPlayers.join(', ')} (${timeText})`;
      } else if (transaction.adds) {
        const addedPlayers = Object.keys(transaction.adds).map(getPlayerName);
        return `Free Agent: Added ${addedPlayers.join(', ')} (${timeText})`;
      }
    } else if (transaction.type === 'trade') {
      return `Trade completed (${timeText})`;
    }

    return `${transaction.type} transaction (${timeText})`;
  };

  const getTransactionIcon = (transaction: Transaction): string => {
    switch (transaction.type) {
      case 'waiver':
        return '📋';
      case 'free_agent':
        return '🆓';
      case 'trade':
        return '🔄';
      default:
        return '📝';
    }
  };

  if (loading) {
    return (
      <div className="activity-feed-container">
        <h3>Recent Activity</h3>
        <div className="loading">Loading recent activity...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="activity-feed-container">
        <h3>Recent Activity</h3>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="activity-feed-container">
      <h3>Recent Activity</h3>
      {transactions.length === 0 ? (
        <div className="no-activity">
          <p>No recent transactions</p>
        </div>
      ) : (
        <div className="activity-list">
          {transactions.map((transaction) => (
            <div key={transaction.transaction_id} className="activity-item">
              <div className="activity-icon">
                {getTransactionIcon(transaction)}
              </div>
              <div className="activity-content">
                <div className="activity-description">
                  {getTransactionDescription(transaction)}
                </div>
                <div className="activity-status">
                  Status: {transaction.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;