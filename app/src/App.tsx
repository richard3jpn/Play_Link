import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './firebase'; // Firebase初期化

// 旧ページ
import { HomePage } from './pages/HomePage';
import { TeamPage } from './pages/TeamPage';
import { GamePage } from './pages/GamePage';

// 新ページ
import { Home } from './pages/Home';
import { GameArchive } from './pages/Games/GameArchive';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { LineupPage } from './pages/Games/LineupPage';
import { ScorePage } from './pages/Games/ScorePage';
import { StatsPage } from './pages/Stats/StatsPage';

// コンポーネント
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <Routes>
          {/* 新ルート */}
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameArchive />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/lineup" element={<LineupPage />} />
          <Route path="/dashboard/score" element={<ScorePage />} />

          {/* 旧ルート（互換性のため残す） */}
          <Route path="/old" element={<HomePage />} />
          <Route path="/teams/:teamSlug" element={<TeamPage />} />
          <Route path="/teams/:teamSlug/games/:gameId" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
