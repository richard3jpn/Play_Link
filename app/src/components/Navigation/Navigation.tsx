import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

/**
 * Navigation - グローバルナビゲーション
 *
 * 全ページで表示されるヘッダーナビゲーション
 */
export const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">
            <img src="/assets/team_name_font.png" alt="neoSAS" />
          </span>
        </Link>

        <ul className="nav-menu">
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
            >
              ホーム
            </Link>
          </li>
          <li>
            <Link
              to="/games"
              className={`nav-link ${isActive('/games') ? 'active' : ''}`}
            >
              試合結果
            </Link>
          </li>
          <li>
            <Link
              to="/stats"
              className={`nav-link ${isActive('/stats') ? 'active' : ''}`}
            >
              選手一覧
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              管理画面
            </Link>
          </li>
        </ul>

        <div className="nav-actions">
          <button className="login-button">ログイン</button>
        </div>
      </div>
    </nav>
  );
};
