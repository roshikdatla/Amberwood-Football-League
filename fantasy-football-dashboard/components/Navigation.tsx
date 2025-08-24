import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">🏈</span>
          <span className="brand-text">Amberwood Football League</span>
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/newsletters" 
            className={`nav-link ${location.pathname.includes('/newsletters') ? 'active' : ''}`}
          >
            📰 Weekly Newsletter
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;