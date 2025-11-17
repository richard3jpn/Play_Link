import React, { useState } from 'react';
import { usePlayersByTeam } from '../hooks/usePlayers';
import {
  createLineupEntry,
  updateLineup,
  deleteLineup,
  type CreateLineupEntryVariables,
  type UpdateLineupVariables,
  type DeleteLineupVariables
} from '../generated';

interface LineupBoardProps {
  gameId: string;
  teamId: string;
  initialLineup?: any[]; // GameLineup型
  readOnly?: boolean;
}

interface LineupPosition {
  battingOrder: number;
  position: string;
  playerId: string | null;
  lineupId?: string;
}

/**
 * LineupBoard - スタメン登録ボード
 *
 * 機能:
 * - 選手をドラッグ&ドロップで配置
 * - 打順と守備位置を指定
 * - スタメン/ベンチ入りメンバーを管理
 */
export const LineupBoard: React.FC<LineupBoardProps> = ({
  gameId,
  teamId,
  initialLineup = [],
  readOnly = false
}) => {
  const { data: playersData, loading: playersLoading } = usePlayersByTeam(teamId);

  // 1-9番の打順位置を初期化
  const [lineup, setLineup] = useState<LineupPosition[]>(() => {
    const positions: LineupPosition[] = [];
    for (let i = 1; i <= 9; i++) {
      const existingEntry = initialLineup.find(l => l.battingOrder === i);
      positions.push({
        battingOrder: i,
        position: existingEntry?.position || '',
        playerId: existingEntry?.player?.id || null,
        lineupId: existingEntry?.id
      });
    }
    return positions;
  });

  const [bench, setBench] = useState<string[]>([]);

  /**
   * 選手を打順に配置
   */
  const handleAssignPlayer = async (battingOrder: number, playerId: string, position: string) => {
    if (readOnly) return;

    try {
      const variables: CreateLineupEntryVariables = {
        gameId,
        playerId,
        battingOrder,
        position,
        isStarter: true
      };

      await createLineupEntry(variables);

      setLineup(prev =>
        prev.map(pos =>
          pos.battingOrder === battingOrder
            ? { ...pos, playerId, position }
            : pos
        )
      );
    } catch (error) {
      console.error('Failed to assign player:', error);
    }
  };

  /**
   * 選手を打順から削除
   */
  const handleRemovePlayer = async (battingOrder: number) => {
    if (readOnly) return;

    const position = lineup.find(p => p.battingOrder === battingOrder);
    if (!position?.lineupId) return;

    try {
      const variables: DeleteLineupVariables = {
        lineupId: position.lineupId
      };

      await deleteLineup(variables);

      setLineup(prev =>
        prev.map(pos =>
          pos.battingOrder === battingOrder
            ? { ...pos, playerId: null, position: '', lineupId: undefined }
            : pos
        )
      );
    } catch (error) {
      console.error('Failed to remove player:', error);
    }
  };

  /**
   * 守備位置を更新
   */
  const handleUpdatePosition = async (battingOrder: number, newPosition: string) => {
    if (readOnly) return;

    const position = lineup.find(p => p.battingOrder === battingOrder);
    if (!position?.lineupId) return;

    try {
      const variables: UpdateLineupVariables = {
        lineupId: position.lineupId,
        position: newPosition,
        battingOrder
      };

      await updateLineup(variables);

      setLineup(prev =>
        prev.map(pos =>
          pos.battingOrder === battingOrder
            ? { ...pos, position: newPosition }
            : pos
        )
      );
    } catch (error) {
      console.error('Failed to update position:', error);
    }
  };

  if (playersLoading) {
    return <div>Loading players...</div>;
  }

  const players = playersData?.players || [];

  return (
    <div className="lineup-board">
      <h2>スタメン登録</h2>

      {/* 打順表示エリア */}
      <div className="lineup-grid">
        {lineup.map(pos => {
          const player = players.find(p => p.id === pos.playerId);

          return (
            <div key={pos.battingOrder} className="lineup-slot">
              <div className="batting-order">{pos.battingOrder}</div>

              {player ? (
                <div className="player-card">
                  <div className="player-info">
                    <span className="uniform-number">{player.uniformNumber}</span>
                    <span className="player-name">{player.name}</span>
                  </div>

                  {!readOnly && (
                    <>
                      <select
                        value={pos.position}
                        onChange={(e) => handleUpdatePosition(pos.battingOrder, e.target.value)}
                        className="position-select"
                      >
                        <option value="">守備位置</option>
                        <option value="P">投手</option>
                        <option value="C">捕手</option>
                        <option value="1B">一塁</option>
                        <option value="2B">二塁</option>
                        <option value="3B">三塁</option>
                        <option value="SS">遊撃</option>
                        <option value="LF">左翼</option>
                        <option value="CF">中堅</option>
                        <option value="RF">右翼</option>
                      </select>

                      <button
                        onClick={() => handleRemovePlayer(pos.battingOrder)}
                        className="remove-button"
                      >
                        削除
                      </button>
                    </>
                  )}
                </div>
              ) : (
                !readOnly && (
                  <select
                    onChange={(e) => {
                      const selectedPlayerId = e.target.value;
                      if (selectedPlayerId) {
                        handleAssignPlayer(pos.battingOrder, selectedPlayerId, '');
                      }
                    }}
                    className="player-select"
                  >
                    <option value="">選手を選択</option>
                    {players.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.uniformNumber} - {p.name}
                      </option>
                    ))}
                  </select>
                )
              )}
            </div>
          );
        })}
      </div>

      {/* ベンチメンバー表示エリア */}
      {!readOnly && (
        <div className="bench-area">
          <h3>ベンチメンバー</h3>
          <div className="bench-players">
            {players
              .filter(p => !lineup.some(pos => pos.playerId === p.id))
              .map(player => (
                <div key={player.id} className="bench-player">
                  <span>{player.uniformNumber}</span>
                  <span>{player.name}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
