import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import NewsletterArchive from './components/NewsletterArchive';
import Week1Newsletter from './components/Week1Newsletter';
import Week2Newsletter from './components/Week2Newsletter';
import Week3Newsletter from './components/Week3Newsletter';
import Week4Newsletter from './components/Week4Newsletter';
import Week5Newsletter from './components/Week5Newsletter';
import Week6Newsletter from './components/Week6Newsletter';
import Week7Newsletter from './components/Week7Newsletter';
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
        <Route path="/newsletters/week3" element={<Week3Newsletter />} />
        <Route path="/newsletters/week4" element={<Week4Newsletter />} />
        <Route path="/newsletters/week5" element={<Week5Newsletter />} />
        <Route path="/newsletters/week6" element={<Week6Newsletter />} />
        <Route path="/newsletters/week7" element={<Week7Newsletter />} />
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