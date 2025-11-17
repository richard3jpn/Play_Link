import React, { useState } from 'react';
import './PlayerCard.css';

/**
 * 選手成績データ型
 */
export interface PlayerStats {
  battingAverage?: number;
  homeRuns?: number;
  rbi?: number;
  hits?: number;
  atBats?: number;
  gamesPlayed?: number;
}

/**
 * PlayerCardプロパティ型
 */
export interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    uniformNumber?: number | null;
    position?: string | null;
    photoUrl?: string | null;
    bats?: string | null;
    throws?: string | null;
  };
  stats?: PlayerStats;
}

/**
 * PlayerCard コンポーネント
 *
 * 野球トレーディングカード風のフリップカードコンポーネント
 * - 表面: 選手の基本情報（背番号、名前、ポジション、写真）
 * - 裏面: 詳細な統計情報（打率、本塁打、打点等）
 * - インタラクション: マウスオーバー/タップで裏返る
 */
export const PlayerCard: React.FC<PlayerCardProps> = ({ player, stats }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="player-card-container"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleFlip();
        }
      }}
      aria-label={`${player.name}の選手カード`}
    >
      <div className={`player-card ${isFlipped ? 'flipped' : ''}`}>
        {/* 表面 */}
        <div className="card-front">
          <div className="card-header">
            {player.uniformNumber && (
              <div className="uniform-number">#{player.uniformNumber}</div>
            )}
            {player.position && (
              <div className="position-badge">{player.position}</div>
            )}
          </div>

          <div className="player-photo">
            {player.photoUrl ? (
              <img src={player.photoUrl} alt={player.name} />
            ) : (
              <div className="photo-placeholder">
                <span className="placeholder-icon">⚾</span>
              </div>
            )}
          </div>

          <div className="card-body">
            <h3 className="player-name">{player.name}</h3>
            <div className="player-meta">
              {player.bats && <span>打: {player.bats}</span>}
              {player.throws && <span>投: {player.throws}</span>}
            </div>
          </div>
        </div>

        {/* 裏面 */}
        <div className="card-back">
          <h3 className="stats-title">{player.name}の成績</h3>

          {stats ? (
            <div className="stats-grid">
              {typeof stats.battingAverage !== 'undefined' && (
                <div className="stat-item">
                  <div className="stat-label">打率</div>
                  <div className="stat-value">.{stats.battingAverage.toFixed(3).slice(2)}</div>
                </div>
              )}

              {typeof stats.homeRuns !== 'undefined' && (
                <div className="stat-item">
                  <div className="stat-label">本塁打</div>
                  <div className="stat-value">{stats.homeRuns}</div>
                </div>
              )}

              {typeof stats.rbi !== 'undefined' && (
                <div className="stat-item">
                  <div className="stat-label">打点</div>
                  <div className="stat-value">{stats.rbi}</div>
                </div>
              )}

              {typeof stats.hits !== 'undefined' && (
                <div className="stat-item">
                  <div className="stat-label">安打</div>
                  <div className="stat-value">{stats.hits}</div>
                </div>
              )}

              {typeof stats.atBats !== 'undefined' && (
                <div className="stat-item">
                  <div className="stat-label">打数</div>
                  <div className="stat-value">{stats.atBats}</div>
                </div>
              )}

              {typeof stats.gamesPlayed !== 'undefined' && (
                <div className="stat-item">
                  <div className="stat-label">試合数</div>
                  <div className="stat-value">{stats.gamesPlayed}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="no-stats">
              <p>成績データがありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
