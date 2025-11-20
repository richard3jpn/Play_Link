import React, { useState } from 'react';
import './GameArchive.css';

/**
 * GameArchive - 試合結果アーカイブページ
 *
 * - 過去の試合一覧表示
 * - ボックススコア表示
 * - 試合詳細モーダル
 */

interface Game {
  id: string;
  date: string;
  opponent: string;
  homeScore: number;
  awayScore: number;
  isHome: boolean;
  result: 'win' | 'lose' | 'draw';
}

// TODO: useGames フックで実際のデータを取得
const mockGames: Game[] = [
  {
    id: '1',
    date: '2025-01-12',
    opponent: '対戦チームA',
    homeScore: 5,
    awayScore: 3,
    isHome: true,
    result: 'win',
  },
  {
    id: '2',
    date: '2025-01-05',
    opponent: '対戦チームB',
    homeScore: 2,
    awayScore: 4,
    isHome: true,
    result: 'lose',
  },
  {
    id: '3',
    date: '2024-12-28',
    opponent: '対戦チームC',
    homeScore: 3,
    awayScore: 3,
    isHome: false,
    result: 'draw',
  },
];

export const GameArchive: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const games = mockGames; // TODO: useGames から取得

  const getResultClass = (result: Game['result']) => {
    switch (result) {
      case 'win':
        return 'result-win';
      case 'lose':
        return 'result-lose';
      case 'draw':
        return 'result-draw';
      default:
        return '';
    }
  };

  const getResultText = (result: Game['result']) => {
    switch (result) {
      case 'win':
        return '勝';
      case 'lose':
        return '負';
      case 'draw':
        return '分';
      default:
        return '-';
    }
  };

  return (
    <div className="game-archive-page">
      <div className="container">
        {/* チーム統計サマリー */}
        <section className="team-summary">
          <h2>チーム統計</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-label">総試合数</div>
              <div className="summary-value">12</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">チーム打率</div>
              <div className="summary-value">.369</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">総本塁打</div>
              <div className="summary-value">9</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">総打点</div>
              <div className="summary-value">30</div>
            </div>
          </div>
        </section>

        <h1 className="page-title">試合結果アーカイブ</h1>

        {/* フィルター（将来実装） */}
        <div className="filters">
          <select className="filter-select">
            <option>全期間</option>
            <option>2025年</option>
            <option>2024年</option>
          </select>
          <select className="filter-select">
            <option>全試合</option>
            <option>勝ちのみ</option>
            <option>負けのみ</option>
          </select>
        </div>

        {/* 試合一覧 */}
        <div className="games-list">
          {games.length === 0 ? (
            <div className="no-games">
              <p>試合結果がありません</p>
            </div>
          ) : (
            games.map((game) => (
              <div
                key={game.id}
                className={`game-item ${getResultClass(game.result)}`}
                onClick={() => setSelectedGame(game)}
              >
                <div className="game-date">{game.date}</div>
                <div className="game-matchup">
                  <div className="team home">
                    <span className="team-name">
                      {game.isHome ? 'neoSAS' : game.opponent}
                    </span>
                    <span className="score">
                      {game.isHome ? game.homeScore : game.awayScore}
                    </span>
                  </div>
                  <span className="vs">-</span>
                  <div className="team away">
                    <span className="team-name">
                      {game.isHome ? game.opponent : 'neoSAS'}
                    </span>
                    <span className="score">
                      {game.isHome ? game.awayScore : game.homeScore}
                    </span>
                  </div>
                </div>
                <div className="game-result">{getResultText(game.result)}</div>
              </div>
            ))
          )}
        </div>

        {/* 試合詳細モーダル */}
        {selectedGame && (
          <div className="modal-overlay" onClick={() => setSelectedGame(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>試合詳細</h2>
                <button
                  className="close-button"
                  onClick={() => setSelectedGame(null)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <div className="game-info">
                  <div className="game-date-full">{selectedGame.date}</div>
                  <div className="game-score-full">
                    <div className="team">
                      <span className="team-name">
                        {selectedGame.isHome ? 'neoSAS' : selectedGame.opponent}
                      </span>
                      <span className="score">
                        {selectedGame.isHome
                          ? selectedGame.homeScore
                          : selectedGame.awayScore}
                      </span>
                    </div>
                    <span className="vs">-</span>
                    <div className="team">
                      <span className="team-name">
                        {selectedGame.isHome ? selectedGame.opponent : 'neoSAS'}
                      </span>
                      <span className="score">
                        {selectedGame.isHome
                          ? selectedGame.awayScore
                          : selectedGame.homeScore}
                      </span>
                    </div>
                  </div>
                  <div className={`result-badge ${getResultClass(selectedGame.result)}`}>
                    {getResultText(selectedGame.result)}
                  </div>
                </div>

                {/* ボックススコア */}
                <div className="box-score">
                  <h3>ボックススコア</h3>
                  <table className="box-score-table">
                    <thead>
                      <tr>
                        <th>チーム</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>R</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {selectedGame.isHome ? 'neoSAS' : selectedGame.opponent}
                        </td>
                        <td>0</td>
                        <td>1</td>
                        <td>0</td>
                        <td>2</td>
                        <td>0</td>
                        <td>1</td>
                        <td>0</td>
                        <td>1</td>
                        <td>0</td>
                        <td>
                          {selectedGame.isHome
                            ? selectedGame.homeScore
                            : selectedGame.awayScore}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {selectedGame.isHome ? selectedGame.opponent : 'neoSAS'}
                        </td>
                        <td>1</td>
                        <td>0</td>
                        <td>1</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>1</td>
                        <td>0</td>
                        <td>0</td>
                        <td>
                          {selectedGame.isHome
                            ? selectedGame.awayScore
                            : selectedGame.homeScore}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* スタメン（TODO: 実データから取得） */}
                <div className="lineup">
                  <h3>スタメン</h3>
                  <p className="coming-soon">準備中...</p>
                </div>

                {/* プレイバイプレイ（TODO: 実データから取得） */}
                <div className="play-by-play">
                  <h3>プレイバイプレイ</h3>
                  <p className="coming-soon">準備中...</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
