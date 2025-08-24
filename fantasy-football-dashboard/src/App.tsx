import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import NewsletterArchive from './components/NewsletterArchive';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <HomePage 
              username="roshik" 
              leagueId="1240124901977759744" 
              season="2025" 
            />
          } />
          <Route path="/newsletters" element={<NewsletterArchive />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;