import React from 'react';

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage = 'home' }) => {
  const isNewsletter = currentPage === 'newsletters';
  const isLastSeason = currentPage.startsWith('last-season');

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <a href="/" className="nav-brand">
          <img src="/b4318b8c9c94900e518a6168a6a73ab6.JPEG" alt="Amberwood Fantasy League" className="brand-logo" />
          Amberwood Football League
        </a>
        
        <div className="nav-links">
          <a 
            href="/" 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          >
            Home
          </a>
          <a 
            href="/newsletters" 
            className={`nav-link ${isNewsletter ? 'active' : ''}`}
          >
            Newsletter
          </a>
          <a
            href="/last-season"
            className={`nav-link ${isLastSeason ? 'active' : ''}`}
          >
            2025
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
