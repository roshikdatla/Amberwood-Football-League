import React from 'react';

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage = 'home' }) => {
  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <a href="/" className="nav-brand">
          <span className="brand-icon">🏈</span>
          Amberwood League
        </a>
        
        <div className="nav-links">
          <a 
            href="/" 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
          <a 
            href="/standings" 
            className={`nav-link ${currentPage === 'standings' ? 'active' : ''}`}
          >
            Standings
          </a>
          <a 
            href="/matchups" 
            className={`nav-link ${currentPage === 'matchups' ? 'active' : ''}`}
          >
            Matchups
          </a>
          <a 
            href="/newsletters" 
            className={`nav-link ${currentPage === 'newsletters' ? 'active' : ''}`}
          >
            Newsletter
          </a>
          <a 
            href="/analysis" 
            className={`nav-link ${currentPage === 'analysis' ? 'active' : ''}`}
          >
            AI Analysis
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;