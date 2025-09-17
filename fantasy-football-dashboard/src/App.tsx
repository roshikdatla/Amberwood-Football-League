import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import NewsletterArchive from './components/NewsletterArchive';
import Week1Newsletter from './components/Week1Newsletter';
import Week2Newsletter from './components/Week2Newsletter';
import LeagueChat from './components/LeagueChat';
import Navigation from './components/Navigation';

function AppContent() {
  const location = useLocation();
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  return (
    <div className="App">
      <Navigation currentPage={currentPage} />
      <Routes>
        <Route path="/" element={
          <HomePage 
            leagueId="1240124901977759744" 
            season="2025" 
          />
        } />
        <Route path="/newsletters" element={<NewsletterArchive showArchive={true} />} />
        <Route path="/newsletters/preseason" element={<NewsletterArchive />} />
        <Route path="/newsletters/week1" element={<Week1Newsletter />} />
        <Route path="/newsletters/week2" element={<Week2Newsletter />} />
        <Route path="/chat" element={<LeagueChat />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;