import React, { useState } from 'react';
import { LineupBoard } from '../../components/LineupBoard';
import './LineupPage.css';

/**
 * LineupPage - スタメン登録ページ
 *
 * LineupBoardコンポーネントを使用して試合のスタメンを登録
 */

interface Game {
  id: string;
  date: string;
  opponent: string;
}

// TODO: useGames フックで試合一覧を取得
const mockGames: Game[] = [
  { id: '1', date: '2025-01-20', opponent: '対戦チームA' },
  { id: '2', date: '2025-01-27', opponent: '対戦チームB' },
];

export const LineupPage: React.FC = () => {
  const [selectedGameId, setSelectedGameId] = useState<string>('');
  const games = mockGames; // TODO: useGames から取得

  return (
    <div className="lineup-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">スタメン登録</h1>
          <p className="page-description">
            試合のスタメンを登録します。選手をドラッグ&ドロップで配置できます。
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

        {/* スタメン登録ボード */}
        {selectedGameId ? (
          <section className="lineup-board-section">
            <div className="board-header">
              <h2>スタメン配置</h2>
              <div className="action-buttons">
                <button className="save-button">保存</button>
                <button className="reset-button">リセット</button>
              </div>
            </div>
            <LineupBoard gameId={selectedGameId} teamId="team-1" />
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
            <li>試合を選択します</li>
            <li>選手一覧から選手をドラッグします（または選択ボックスで選択）</li>
            <li>打順とポジションに選手を配置します</li>
            <li>「保存」ボタンでスタメンを確定します</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

