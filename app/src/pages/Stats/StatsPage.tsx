import React, { useState } from 'react';
import { PlayerCard } from '../../components/PlayerCard';
import './StatsPage.css';

/**
 * StatsPage - 成績一覧ページ
 *
 * - 選手成績一覧表示
 * - 打撃成績表
 * - 選手カード表示
 */

interface PlayerStat {
  id: string;
  name: string;
  uniformNumber: number;
  position: string;
  gamesPlayed: number;
  atBats: number;
  hits: number;
  homeRuns: number;
  rbi: number;
  battingAverage: number;
  photoUrl?: string;
  bats?: string;
  throws?: string;
}

// TODO: usePlayerStats フックで実際のデータを取得
const mockPlayerStats: PlayerStat[] = [
  {
    id: '1',
    name: '山田太郎',
    uniformNumber: 1,
    position: '投手',
    gamesPlayed: 12,
    atBats: 40,
    hits: 15,
    homeRuns: 2,
    rbi: 8,
    battingAverage: 0.375,
    bats: '右',
    throws: '右',
  },
  {
    id: '2',
    name: '田中一郎',
    uniformNumber: 2,
    position: '捕手',
    gamesPlayed: 12,
    atBats: 45,
    hits: 18,
    homeRuns: 3,
    rbi: 12,
    battingAverage: 0.4,
    bats: '右',
    throws: '右',
  },
  {
    id: '3',
    name: '佐藤次郎',
    uniformNumber: 3,
    position: '一塁手',
    gamesPlayed: 11,
    atBats: 42,
    hits: 14,
    homeRuns: 4,
    rbi: 10,
    battingAverage: 0.333,
    bats: '左',
    throws: '左',
  },
];

export const StatsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [sortBy, setSortBy] = useState<keyof PlayerStat>('battingAverage');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const stats = mockPlayerStats; // TODO: usePlayerStats から取得

  const handleSort = (column: keyof PlayerStat) => {
    if (sortBy === column) {
      // 同じ列をクリックしたら昇順/降順を切り替え
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      // 違う列をクリックしたら降順でソート
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedStats = [...stats].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'desc'
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }
    return 0;
  });

  return (
    <div className="stats-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">選手一覧</h1>
          <p className="page-description">チーム全体の選手成績を確認できます</p>
        </header>

        {/* コントロール */}
        <section className="controls">
          <div className="view-mode-toggle">
            <button
              className={`toggle-button ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
            >
              選手
            </button>
            <button
              className={`toggle-button ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              成績表
            </button>
          </div>

          <div className="sort-controls">
            <label htmlFor="sort-select" className="sort-label">
              並び替え:
            </label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as keyof PlayerStat)}
            >
              <option value="battingAverage">打率</option>
              <option value="homeRuns">本塁打</option>
              <option value="rbi">打点</option>
              <option value="hits">安打</option>
              <option value="gamesPlayed">試合数</option>
            </select>
          </div>
        </section>

        {/* 成績表示 */}
        {viewMode === 'table' ? (
          <section className="stats-table-section">
            <div className="table-wrapper">
              <table className="stats-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('uniformNumber')} className="sortable">
                      背番号 <span className="sort-indicator">{sortBy === 'uniformNumber' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}</span>
                    </th>
                    <th onClick={() => handleSort('name')} className="sortable">
                      名前 <span className="sort-indicator">{sortBy === 'name' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}</span>
                    </th>
                    <th onClick={() => handleSort('position')} className="sortable">
                      位置 <span className="sort-indicator">{sortBy === 'position' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}</span>
                    </th>
                    <th onClick={() => handleSort('gamesPlayed')} className="sortable">
                      試合 <span className="sort-indicator">{sortBy === 'gamesPlayed' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}</span>
                    </th>
                    <th onClick={() => handleSort('atBats')} className="sortable">
                      打数 <span className="sort-indicator">{sortBy === 'atBats' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}</span>
                    </th>
                    <th onClick={() => handleSort('hits')} className="sortable">
                      安打 <span className="sort-indicator">{sortBy === 'hits' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}</span>
                    </th>
                    <th onClick={() => handleSort('homeRuns')} className="sortable">
                      本塁打 <span className="sort-indicator">{sortBy === 'homeRuns' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}</span>
                    </th>
                    <th onClick={() => handleSort('rbi')} className="sortable">
                      打点 <span className="sort-indicator">{sortBy === 'rbi' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}</span>
                    </th>
                    <th onClick={() => handleSort('battingAverage')} className="sortable">
                      打率 <span className="sort-indicator">{sortBy === 'battingAverage' ? (sortOrder === 'desc' ? '▼' : '▲') : ''}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStats.map((player) => (
                    <tr key={player.id}>
                      <td className="number">#{player.uniformNumber}</td>
                      <td className="name">{player.name}</td>
                      <td>{player.position}</td>
                      <td>{player.gamesPlayed}</td>
                      <td>{player.atBats}</td>
                      <td>{player.hits}</td>
                      <td className="highlight">{player.homeRuns}</td>
                      <td className="highlight">{player.rbi}</td>
                      <td className="avg">
                        .{player.battingAverage.toFixed(3).slice(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="stats-cards-section">
            <div className="cards-grid">
              {sortedStats.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={{
                    id: player.id,
                    name: player.name,
                    uniformNumber: player.uniformNumber,
                    position: player.position,
                    photoUrl: player.photoUrl || null,
                    bats: player.bats || null,
                    throws: player.throws || null,
                  }}
                  stats={{
                    battingAverage: player.battingAverage,
                    homeRuns: player.homeRuns,
                    rbi: player.rbi,
                    hits: player.hits,
                    atBats: player.atBats,
                    gamesPlayed: player.gamesPlayed,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
