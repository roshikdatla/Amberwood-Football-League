import React from 'react';

interface HomePageProps {
  username?: string;
  leagueId?: string;
  season?: string;
}

const HomePage: React.FC<HomePageProps> = ({ username, leagueId, season }) => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
      <h2>Fantasy Football Dashboard</h2>
      <p>League ID: {leagueId}</p>
      <p>Season: {season}</p>
      <p>Coming soon: Full dashboard with Claude AI analysis!</p>
    </div>
  );
};

export default HomePage;