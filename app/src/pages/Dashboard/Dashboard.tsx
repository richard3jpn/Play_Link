import React from 'react';
import './Dashboard.css';

/**
 * Dashboard - 管理画面（要ログイン）
 *
 * チーム管理者向けのダッシュボード
 * - 試合登録
 * - スタメン登録
 * - スコア入力
 * - 選手管理
 * - 統計確認
 */
export const Dashboard: React.FC = () => {
  // TODO: useAuth で認証状態確認
  // TODO: useTeam でチーム情報取得

  return (
    <div className="dashboard-page">
      <div className="container">
        <header className="dashboard-header">
          <h1 className="page-title">管理画面</h1>
          <div className="user-info">
            <span className="user-name">ユーザー名</span>
            <button className="logout-button">ログアウト</button>
          </div>
        </header>

        {/* クイックアクション */}
        <section className="quick-actions">
          <h2 className="section-title">クイックアクション</h2>
          <div className="action-grid">
            <a href="/dashboard/game/new" className="action-card">
              <span className="icon">⚾</span>
              <h3>新規試合登録</h3>
              <p>新しい試合を登録</p>
            </a>
            <a href="/dashboard/lineup" className="action-card">
              <span className="icon">📋</span>
              <h3>スタメン登録</h3>
              <p>試合のスタメンを設定</p>
            </a>
            <a href="/dashboard/score" className="action-card">
              <span className="icon">✏️</span>
              <h3>スコア入力</h3>
              <p>試合のスコアを記録</p>
            </a>
            <a href="/dashboard/players" className="action-card">
              <span className="icon">👥</span>
              <h3>選手管理</h3>
              <p>選手情報を編集</p>
            </a>
          </div>
        </section>

        {/* 最近の活動 */}
        <section className="recent-activities">
          <h2 className="section-title">最近の活動</h2>
          <div className="activities-list">
            <div className="activity-item">
              <div className="activity-icon">⚾</div>
              <div className="activity-content">
                <h4>試合登録</h4>
                <p>vs 対戦チームA（2025-01-12）</p>
              </div>
              <time className="activity-time">2時間前</time>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📋</div>
              <div className="activity-content">
                <h4>スタメン登録</h4>
                <p>1/12 試合のスタメンを設定しました</p>
              </div>
              <time className="activity-time">5時間前</time>
            </div>
            <div className="activity-item">
              <div className="activity-icon">👤</div>
              <div className="activity-content">
                <h4>選手追加</h4>
                <p>新選手「山田太郎」を登録</p>
              </div>
              <time className="activity-time">1日前</time>
            </div>
          </div>
        </section>

        {/* 統計サマリー */}
        <section className="stats-summary">
          <h2 className="section-title">統計サマリー</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">総試合数</div>
              <div className="stat-value">12</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">勝利</div>
              <div className="stat-value win">8</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">敗北</div>
              <div className="stat-value lose">3</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">引分</div>
              <div className="stat-value draw">1</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">勝率</div>
              <div className="stat-value">.667</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">登録選手数</div>
              <div className="stat-value">18</div>
            </div>
          </div>
        </section>

        {/* 次回試合 */}
        <section className="upcoming-games">
          <h2 className="section-title">次回試合</h2>
          <div className="game-card">
            <div className="game-date-badge">
              <span className="month">1月</span>
              <span className="day">20</span>
            </div>
            <div className="game-info">
              <h3>vs 次の対戦相手</h3>
              <p className="venue">📍 球場名</p>
              <p className="time">⏰ 13:00 試合開始</p>
            </div>
            <div className="game-actions">
              <button className="action-button">スタメン登録</button>
              <button className="action-button secondary">詳細</button>
            </div>
          </div>
        </section>

        {/* 選手一覧（簡易版） */}
        <section className="players-preview">
          <div className="section-header">
            <h2 className="section-title">選手一覧</h2>
            <a href="/dashboard/players" className="view-all-link">
              全て見る →
            </a>
          </div>
          <div className="players-grid">
            <div className="player-mini-card">
              <div className="player-number">#1</div>
              <div className="player-info">
                <h4>山田太郎</h4>
                <p>投手</p>
              </div>
            </div>
            <div className="player-mini-card">
              <div className="player-number">#2</div>
              <div className="player-info">
                <h4>田中一郎</h4>
                <p>捕手</p>
              </div>
            </div>
            <div className="player-mini-card">
              <div className="player-number">#3</div>
              <div className="player-info">
                <h4>佐藤次郎</h4>
                <p>一塁手</p>
              </div>
            </div>
            <div className="player-mini-card">
              <div className="player-number">#4</div>
              <div className="player-info">
                <h4>鈴木三郎</h4>
                <p>二塁手</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
