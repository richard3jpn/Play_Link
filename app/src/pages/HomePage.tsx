import React from 'react';
import { Link } from 'react-router-dom';
import { useTeams } from '../hooks/useTeam';

/**
 * HomePage - トップページ
 *
 * 機能:
 * - チーム一覧表示
 * - チームページへのナビゲーション
 */
export const HomePage: React.FC = () => {
  const { data, loading, error } = useTeams();

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading teams: {error.message}</p>
      </div>
    );
  }

  const teams = data?.teams || [];

  return (
    <div className="home-page">
      <header className="page-header">
        <h1>⚾ Play Link</h1>
        <p>野球クラブ統合管理システム</p>
      </header>

      <section className="teams-section">
        <h2>チーム一覧</h2>
        <div className="teams-grid">
          {teams.map(team => (
            <Link
              key={team.id}
              to={`/teams/${team.slug}`}
              className="team-card"
            >
              {team.logoUrl && (
                <img
                  src={team.logoUrl}
                  alt={team.name}
                  className="team-logo"
                />
              )}
              <h3>{team.name}</h3>
              {team.description && (
                <p className="team-description">{team.description}</p>
              )}
            </Link>
          ))}
        </div>

        {teams.length === 0 && (
          <p className="no-teams">チームが登録されていません</p>
        )}
      </section>
    </div>
  );
};
