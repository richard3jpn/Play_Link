import React, { useState } from 'react';
import { ScoreInput } from '../../components/ScoreInput';
import './ScorePage.css';

/**
 * ScorePage - スコア入力ページ
 *
 * ScoreInputコンポーネントを使用して試合のスコアを記録
 */

interface Game {
  id: string;
  date: string;
  opponent: string;
  homeScore: number;
  awayScore: number;
}

// TODO: useGames フックで試合一覧を取得
const mockGames: Game[] = [
  {
    id: '1',
    date: '2025-01-20',
    opponent: '対戦チームA',
    homeScore: 0,
    awayScore: 0,
  },
  {
    id: '2',
    date: '2025-01-27',
    opponent: '対戦チームB',
    homeScore: 0,
    awayScore: 0,
  },
];

export const ScorePage: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<string>('');
  const games = mockGames; // TODO: useGames から取得

  const selectedGame = games.find((game) => game.id === selectedGameId);

  return (
    <div className="score-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">スコア入力</h1>
          <p className="page-description">
            試合のスコアをイニングごとに記録します。プレイバイプレイで詳細に記録できます。
          </p>
        </header>

        {/* 試合選択 */}
        <section className="game-selection">
          <label htmlFor="game-select" className="select-label">
            試合を選択
          </label>
          <select
            id="game-select"
            className="game-select"
            value={selectedGameId}
            onChange={(e) => setSelectedGameId(e.target.value)}
          >
            <option value="">試合を選択してください</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.date} - vs {game.opponent}
              </option>
            ))}
          </select>
        </section>

        {/* 現在のスコア */}
        {selectedGame && (
          <section className="current-score">
            <h2>現在のスコア</h2>
            <div className="scoreboard">
              <div className="team-score">
                <span className="team-label">我がチーム</span>
                <span className="score">{selectedGame.homeScore}</span>
              </div>
              <span className="vs">-</span>
              <div className="team-score">
                <span className="score">{selectedGame.awayScore}</span>
                <span className="team-label">{selectedGame.opponent}</span>
              </div>
            </div>
          </section>
        )}

        {/* スコア入力フォーム */}
        {selectedGameId ? (
          <section className="score-input-section">
            <div className="input-header">
              <h2>プレイ記録</h2>
              <div className="action-buttons">
                <button className="finalize-button">試合終了</button>
              </div>
            </div>
            <ScoreInput gameId={selectedGameId} />
          </section>
        ) : (
          <div className="no-selection">
            <p>試合を選択してください</p>
          </div>
        )}

        {/* 使い方ガイド */}
        <section className="usage-guide">
          <h3>使い方</h3>
          <ol>
            <li>記録する試合を選択します</li>
            <li>イニングと表/裏を選択します</li>
            <li>打者を選択します</li>
            <li>プレイタイプと結果を選択します</li>
            <li>打点・得点を入力します</li>
            <li>「記録」ボタンでプレイを保存します</li>
            <li>試合終了時は「試合終了」ボタンで確定します</li>
          </ol>
        </section>
      </div>
    </div>
  );
};
