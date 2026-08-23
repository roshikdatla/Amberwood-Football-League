import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import CurrentSeasonNewsletterArchive from './components/CurrentSeasonNewsletterArchive';
import CurrentSeasonNewsletterCollection from './components/CurrentSeasonNewsletterCollection';
import Week1PreviewNewsletter from './components/Week1PreviewNewsletter';
import LastSeasonArchive from './components/LastSeasonArchive';
import NewsletterArchive from './components/NewsletterArchive';
import Week1Newsletter from './components/Week1Newsletter';
import Week2Newsletter from './components/Week2Newsletter';
import Week3Newsletter from './components/Week3Newsletter';
import Week4Newsletter from './components/Week4Newsletter';
import Week5Newsletter from './components/Week5Newsletter';
import Week6Newsletter from './components/Week6Newsletter';
import Week7Newsletter from './components/Week7Newsletter';
import Week8Newsletter from './components/Week8Newsletter';
import Week9Newsletter from './components/Week9Newsletter';
import Week10Newsletter from './components/Week10Newsletter';
import Week11Newsletter from './components/Week11Newsletter';
import Week12Newsletter from './components/Week12Newsletter';
import Week13Newsletter from './components/Week13Newsletter';
import FinaleNewsletter from './components/FinaleNewsletter';
import LeagueChat from './components/LeagueChat';
import Navigation from './components/Navigation';
import BeyondTheBoxscore from './components/BeyondTheBoxscore';
import { activeSeason, archivedSeason } from './config/seasons';

function AppContent() {
  const location = useLocation();
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  return (
    <div className="App">
      <Navigation currentPage={currentPage} />
      <Routes>
        <Route path="/" element={
          <HomePage 
            leagueId={activeSeason.leagueId}
            season={activeSeason.key}
            seasonConfig={activeSeason}
          />
        } />
        <Route path="/newsletters" element={<CurrentSeasonNewsletterCollection />} />
        <Route path="/beyond-the-boxscore" element={<BeyondTheBoxscore seasonConfig={activeSeason} />} />
        <Route path="/newsletters/preseason" element={<CurrentSeasonNewsletterArchive />} />
        <Route path="/newsletters/week1" element={<Week1PreviewNewsletter />} />
        <Route path="/last-season" element={<LastSeasonArchive />} />
        <Route path="/last-season/beyond-the-boxscore" element={<BeyondTheBoxscore seasonConfig={archivedSeason} />} />
        <Route
          path="/last-season/newsletters"
          element={
            <NewsletterArchive
              showArchive={true}
              basePath={archivedSeason.newsletterBasePath}
              title="2025 Newsletter Archive"
              subtitle="Browse all 2025 editions of the Amberwood Fantasy Times"
            />
          }
        />
        <Route path="/last-season/newsletters/preseason" element={<NewsletterArchive basePath={archivedSeason.newsletterBasePath} />} />
        <Route path="/last-season/newsletters/week1" element={<Week1Newsletter />} />
        <Route path="/last-season/newsletters/week2" element={<Week2Newsletter />} />
        <Route path="/last-season/newsletters/week3" element={<Week3Newsletter />} />
        <Route path="/last-season/newsletters/week4" element={<Week4Newsletter />} />
        <Route path="/last-season/newsletters/week5" element={<Week5Newsletter />} />
        <Route path="/last-season/newsletters/week6" element={<Week6Newsletter />} />
        <Route path="/last-season/newsletters/week7" element={<Week7Newsletter />} />
        <Route path="/last-season/newsletters/week8" element={<Week8Newsletter />} />
        <Route path="/last-season/newsletters/week9" element={<Week9Newsletter />} />
        <Route path="/last-season/newsletters/week10" element={<Week10Newsletter />} />
        <Route path="/last-season/newsletters/week11" element={<Week11Newsletter />} />
        <Route path="/last-season/newsletters/week12" element={<Week12Newsletter />} />
        <Route path="/last-season/newsletters/week13" element={<Week13Newsletter />} />
        <Route path="/last-season/newsletters/finale" element={<FinaleNewsletter />} />
        <Route path="/last-season/chat" element={<LeagueChat season={archivedSeason.key} archiveMode={true} />} />
        <Route path="/chat" element={<LeagueChat season={activeSeason.key} />} />
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
