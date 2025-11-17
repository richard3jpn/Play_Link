import React from 'react';
import './Home.css';

/**
 * Home - トップページ
 *
 * 公開ページ：チームのホームページとして機能
 * - お知らせ表示
 * - 最新試合結果
 * - 次回試合予定
 */
export const Home: React.FC = () => {
  // TODO: useTeamBySlug で現在のチーム情報を取得
  // TODO: useGames で試合情報を取得

  return (
    <div className="home-page">
      {/* ヒーローセクション */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="team-name">
            <img src="/assets/sas_mascot.png" alt="neoSAS マスコット" />
          </h1>
          <p className="team-slogan"></p>
        </div>
      </section>

      {/* お知らせセクション */}
      <section className="news-section">
        <div className="container">
          <h2 className="section-title">お知らせ</h2>
          <div className="news-list">
            <article className="news-item">
              <time className="news-date">2025-01-15</time>
              <h3 className="news-title">新シーズン開幕のお知らせ</h3>
              <p className="news-excerpt">
                2025年シーズンが開幕します。今年もよろしくお願いします。
              </p>
            </article>
            <article className="news-item">
              <time className="news-date">2025-01-10</time>
              <h3 className="news-title">練習試合のお知らせ</h3>
              <p className="news-excerpt">
                1月20日に練習試合を実施します。
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 最新試合結果セクション */}
      <section className="latest-game-section">
        <div className="container">
          <h2 className="section-title">最新試合結果</h2>
          <div className="game-card">
            <div className="game-date">2025-01-12</div>
            <div className="game-score">
              <div className="team home-team">
                <span className="team-name">neoSAS</span>
                <span className="score">5</span>
              </div>
              <span className="vs">-</span>
              <div className="team away-team">
                <span className="team-name">対戦相手</span>
                <span className="score">3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 次回試合予定セクション */}
      <section className="next-game-section">
        <div className="container">
          <h2 className="section-title">次回試合予定</h2>
          <div className="schedule-card">
            <div className="schedule-date">
              <span className="month">1月</span>
              <span className="day">20</span>
            </div>
            <div className="schedule-details">
              <h3 className="opponent">vs 次の対戦相手</h3>
              <p className="venue">📍 球場名</p>
              <p className="time">⏰ 13:00 試合開始</p>
            </div>
          </div>
        </div>
      </section>

      {/* クイックリンクセクション */}
      <section className="quick-links-section">
        <div className="container">
          <h2 className="section-title">メニュー</h2>
          <div className="quick-links-grid">
            <a href="/games" className="quick-link-card">
              <span className="icon">📅</span>
              <h3>試合結果</h3>
              <p>過去の試合を確認</p>
            </a>
            <a href="/stats" className="quick-link-card">
              <span className="icon">📊</span>
              <h3>選手一覧</h3>
              <p>選手成績を確認</p>
            </a>
            <a href="/dashboard" className="quick-link-card">
              <span className="icon">⚙️</span>
              <h3>管理画面</h3>
              <p>チーム管理（要ログイン）</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
