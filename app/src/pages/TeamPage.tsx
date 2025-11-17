import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTeamBySlug } from '../hooks/useTeam';
import { useUpcomingGames } from '../hooks/useGames';
import { usePlayersByTeam } from '../hooks/usePlayers';

/**
 * TeamPage - チームページ
 *
 * 機能:
 * - チーム情報表示
 * - 今後の試合予定表示
 * - 選手一覧へのリンク
 * - 試合一覧へのリンク
 */
export const TeamPage: React.FC = () => {
  const { teamSlug } = useParams<{ teamSlug: string }>();
  const { data: teamData, loading: teamLoading } = useTeamBySlug(teamSlug || '');

  const team = teamData?.teams?.[0];
  const teamId = team?.id;

  const { data: gamesData, loading: gamesLoading } = useUpcomingGames(
    teamId || '',
    5
  );

  const { data: playersData, loading: playersLoading } = usePlayersByTeam(teamId || '');

  if (teamLoading) {
    return <div>Loading team...</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  const upcomingGames = gamesData?.games || [];
  const players = playersData?.players || [];

  return (
    <div className="team-page">
      <header className="team-header">
        {team.logoUrl && (
          <img src={team.logoUrl} alt={team.name} className="team-logo-large" />
        )}
        <h1>{team.name}</h1>
        {team.description && (
          <p className="team-description">{team.description}</p>
        )}
      </header>

      <nav className="team-nav">
        <Link to={`/teams/${teamSlug}/games`} className="nav-link">
          試合一覧
        </Link>
        <Link to={`/teams/${teamSlug}/players`} className="nav-link">
          選手名簿
        </Link>
        <Link to={`/teams/${teamSlug}/stats`} className="nav-link">
          成績
        </Link>
        <Link to={`/teams/${teamSlug}/articles`} className="nav-link">
          記事
        </Link>
      </nav>

      <section className="upcoming-games">
        <h2>次回の試合</h2>
        {gamesLoading ? (
          <p>Loading games...</p>
        ) : upcomingGames.length > 0 ? (
          <div className="games-list">
            {upcomingGames.map(game => (
              <Link
                key={game.id}
                to={`/teams/${teamSlug}/games/${game.id}`}
                className="game-card"
              >
                <div className="game-date">
                  {new Date(game.gameDate).toLocaleDateString('ja-JP', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </div>
                <div className="game-opponent">
                  vs {game.opponentName}
                </div>
                <div className="game-location">
                  {game.isHome ? 'ホーム' : 'アウェイ'} - {game.location}
                </div>
                <div className="game-status">
                  {game.status === 'scheduled' ? '予定' : '進行中'}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>予定されている試合はありません</p>
        )}
      </section>

      <section className="players-section">
        <h2>選手名簿</h2>
        {playersLoading ? (
          <p>Loading players...</p>
        ) : players.length > 0 ? (
          <div className="players-grid">
            {players.map(player => (
              <div key={player.id} className="player-card">
                <div className="player-number">#{player.uniformNumber}</div>
                <div className="player-name">{player.name}</div>
                <div className="player-position">{player.position}</div>
                <div className="player-stats">
                  {player.bats && <span>打: {player.bats}</span>}
                  {player.throws && <span>投: {player.throws}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>選手が登録されていません</p>
        )}
      </section>
    </div>
  );
};
