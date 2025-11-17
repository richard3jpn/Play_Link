import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameDetail, useGameLineups } from '../hooks/useGames';
import { useTeamBySlug } from '../hooks/useTeam';
import { LineupBoard } from '../components/LineupBoard';
import { ScoreInput } from '../components/ScoreInput';

/**
 * GamePage - 試合詳細ページ
 *
 * 機能:
 * - 試合情報表示
 * - スタメン登録・表示
 * - スコア入力・表示
 */
export const GamePage: React.FC = () => {
  const { gameId, teamSlug } = useParams<{ gameId: string; teamSlug: string }>();
  const { data: teamData } = useTeamBySlug(teamSlug || '');
  const { data: gameData, loading: gameLoading } = useGameDetail(gameId || '');
  const { data: lineupsData, loading: lineupsLoading } = useGameLineups(gameId || '');

  const [activeTab, setActiveTab] = useState<'lineup' | 'score'>('lineup');

  if (gameLoading || lineupsLoading) {
    return <div>Loading game...</div>;
  }

  const game = gameData?.game;
  const team = teamData?.teams?.[0];

  if (!game) {
    return <div>Game not found</div>;
  }

  const lineups = lineupsData?.gameLineups || [];
  const isFinished = game.status === 'final';
  const isOngoing = game.status === 'ongoing';

  return (
    <div className="game-page">
      <header className="game-header">
        <h1>試合詳細</h1>
        <div className="game-info">
          <div className="game-date">
            {new Date(game.gameDate).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </div>
          <div className="game-matchup">
            <span className="home-team">
              {game.isHome ? 'ホーム' : game.opponentName}
            </span>
            <span className="vs">vs</span>
            <span className="away-team">
              {game.isHome ? game.opponentName : 'アウェイ'}
            </span>
          </div>
          {game.location && (
            <div className="game-location">会場: {game.location}</div>
          )}
          <div className="game-status-badge">
            {isFinished && '試合終了'}
            {isOngoing && '試合中'}
            {game.status === 'scheduled' && '試合前'}
          </div>
        </div>

        {isFinished && (
          <div className="final-score">
            <div className="score-display">
              <span className="home-score">{game.homeScore}</span>
              <span className="separator">-</span>
              <span className="away-score">{game.awayScore}</span>
            </div>
          </div>
        )}

        {game.videoUrl && (
          <div className="video-link">
            <a href={game.videoUrl} target="_blank" rel="noopener noreferrer">
              📹 試合映像を見る
            </a>
          </div>
        )}
      </header>

      <div className="game-tabs">
        <button
          className={`tab ${activeTab === 'lineup' ? 'active' : ''}`}
          onClick={() => setActiveTab('lineup')}
        >
          スタメン
        </button>
        <button
          className={`tab ${activeTab === 'score' ? 'active' : ''}`}
          onClick={() => setActiveTab('score')}
        >
          スコア
        </button>
      </div>

      <div className="game-content">
        {activeTab === 'lineup' && (
          <LineupBoard
            gameId={gameId || ''}
            teamId={team?.id || ''}
            initialLineup={lineups}
            readOnly={isFinished}
          />
        )}

        {activeTab === 'score' && (
          <ScoreInput
            gameId={gameId || ''}
            readOnly={isFinished}
          />
        )}
      </div>
    </div>
  );
};
