import React from 'react';

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage = 'home' }) => {
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
            className={`nav-link ${currentPage === 'newsletters' ? 'active' : ''}`}
          >
            Newsletter
          </a>
          <a 
            href="/chat" 
            className={`nav-link ${currentPage === 'chat' ? 'active' : ''}`}
          >
            League Chat
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;