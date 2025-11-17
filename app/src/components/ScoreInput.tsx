import React, { useState } from 'react';
import { useGameLineups, useGamePlays } from '../hooks/useGames';
import {
  recordPlay,
  updatePlay,
  deletePlay,
  type RecordPlayVariables,
  type UpdatePlayVariables,
  type DeletePlayVariables
} from '../generated';

interface ScoreInputProps {
  gameId: string;
  readOnly?: boolean;
}

interface PlayInput {
  inning: number;
  isTop: boolean;
  batterId: string;
  pitcherId?: string;
  playType: string;
  result: string;
  rbi: number;
  runsScored: number;
}

/**
 * ScoreInput - スコア入力コンポーネント
 *
 * 機能:
 * - 一球ごとのプレイ記録を入力
 * - イニング、打者、投手、プレイ結果を記録
 * - RBI（打点）、得点を自動集計
 */
export const ScoreInput: React.FC<ScoreInputProps> = ({
  gameId,
  readOnly = false
}) => {
  const { data: lineupsData, loading: lineupsLoading } = useGameLineups(gameId);
  const { data: playsData, loading: playsLoading, refetch: refetchPlays } = useGamePlays(gameId);

  const [currentInning, setCurrentInning] = useState(1);
  const [isTop, setIsTop] = useState(true);
  const [selectedBatter, setSelectedBatter] = useState<string>('');
  const [selectedPitcher, setSelectedPitcher] = useState<string>('');
  const [playType, setPlayType] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [rbi, setRbi] = useState<number>(0);
  const [runsScored, setRunsScored] = useState<number>(0);

  /**
   * プレイ記録を追加
   */
  const handleRecordPlay = async () => {
    if (!selectedBatter || !playType || !result) {
      alert('打者、プレイ種別、結果を入力してください');
      return;
    }

    try {
      const variables: RecordPlayVariables = {
        gameId,
        inning: currentInning,
        isTop,
        batterId: selectedBatter,
        pitcherId: selectedPitcher || undefined,
        playType,
        result,
        rbi,
        runsScored
      };

      await recordPlay(variables);
      await refetchPlays();

      // フォームをリセット
      setSelectedBatter('');
      setSelectedPitcher('');
      setPlayType('');
      setResult('');
      setRbi(0);
      setRunsScored(0);
    } catch (error) {
      console.error('Failed to record play:', error);
      alert('プレイ記録に失敗しました');
    }
  };

  /**
   * プレイ記録を削除
   */
  const handleDeletePlay = async (playId: string) => {
    if (!window.confirm('このプレイを削除しますか？')) return;

    try {
      const variables: DeletePlayVariables = { playId };
      await deletePlay(variables);
      await refetchPlays();
    } catch (error) {
      console.error('Failed to delete play:', error);
    }
  };

  if (lineupsLoading || playsLoading) {
    return <div>Loading...</div>;
  }

  const lineups = lineupsData?.gameLineups || [];
  const plays = playsData?.gamePlays || [];

  return (
    <div className="score-input">
      <h2>スコア入力</h2>

      {/* イニング選択 */}
      <div className="inning-control">
        <label>
          イニング:
          <select
            value={currentInning}
            onChange={(e) => setCurrentInning(Number(e.target.value))}
            disabled={readOnly}
          >
            {[...Array(9)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}回
              </option>
            ))}
          </select>
        </label>

        <label>
          <input
            type="radio"
            checked={isTop}
            onChange={() => setIsTop(true)}
            disabled={readOnly}
          />
          表
        </label>
        <label>
          <input
            type="radio"
            checked={!isTop}
            onChange={() => setIsTop(false)}
            disabled={readOnly}
          />
          裏
        </label>
      </div>

      {/* プレイ入力フォーム */}
      {!readOnly && (
        <div className="play-input-form">
          <h3>プレイ記録</h3>

          <div className="form-group">
            <label>
              打者:
              <select
                value={selectedBatter}
                onChange={(e) => setSelectedBatter(e.target.value)}
              >
                <option value="">選手を選択</option>
                {lineups.map(lineup => (
                  <option key={lineup.id} value={lineup.player.id}>
                    {lineup.battingOrder}. {lineup.player.name} ({lineup.position})
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              投手（オプション）:
              <select
                value={selectedPitcher}
                onChange={(e) => setSelectedPitcher(e.target.value)}
              >
                <option value="">選手を選択</option>
                {lineups.map(lineup => (
                  <option key={lineup.id} value={lineup.player.id}>
                    {lineup.player.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              プレイ種別:
              <select
                value={playType}
                onChange={(e) => setPlayType(e.target.value)}
              >
                <option value="">選択</option>
                <option value="打撃">打撃</option>
                <option value="盗塁">盗塁</option>
                <option value="守備">守備</option>
                <option value="走塁">走塁</option>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              結果:
              <select
                value={result}
                onChange={(e) => setResult(e.target.value)}
              >
                <option value="">選択</option>
                <optgroup label="安打">
                  <option value="単打">単打</option>
                  <option value="二塁打">二塁打</option>
                  <option value="三塁打">三塁打</option>
                  <option value="本塁打">本塁打</option>
                </optgroup>
                <optgroup label="アウト">
                  <option value="三振">三振</option>
                  <option value="ゴロ">ゴロ</option>
                  <option value="フライ">フライ</option>
                  <option value="ライナー">ライナー</option>
                </optgroup>
                <optgroup label="その他">
                  <option value="四球">四球</option>
                  <option value="死球">死球</option>
                  <option value="犠打">犠打</option>
                  <option value="犠飛">犠飛</option>
                  <option value="エラー">エラー</option>
                </optgroup>
              </select>
            </label>
          </div>

          <div className="form-group">
            <label>
              打点:
              <input
                type="number"
                min="0"
                value={rbi}
                onChange={(e) => setRbi(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              得点:
              <input
                type="number"
                min="0"
                value={runsScored}
                onChange={(e) => setRunsScored(Number(e.target.value))}
              />
            </label>
          </div>

          <button onClick={handleRecordPlay} className="record-button">
            記録する
          </button>
        </div>
      )}

      {/* プレイ履歴表示 */}
      <div className="play-history">
        <h3>プレイ履歴</h3>
        <div className="plays-list">
          {plays.map(play => (
            <div key={play.id} className="play-item">
              <div className="play-info">
                <span className="inning">{play.inning}回{play.isTop ? '表' : '裏'}</span>
                <span className="batter">{play.batter.name}</span>
                <span className="result">{play.result}</span>
                {play.rbi > 0 && <span className="rbi">打点: {play.rbi}</span>}
                {play.runsScored > 0 && <span className="runs">得点: {play.runsScored}</span>}
              </div>
              {!readOnly && (
                <button
                  onClick={() => handleDeletePlay(play.id)}
                  className="delete-button"
                >
                  削除
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
