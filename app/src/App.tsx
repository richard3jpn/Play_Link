import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './firebase'; // Firebase初期化
import { HomePage } from './pages/HomePage';
import { TeamPage } from './pages/TeamPage';
import { GamePage } from './pages/GamePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teams/:teamSlug" element={<TeamPage />} />
          <Route path="/teams/:teamSlug/games/:gameId" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
