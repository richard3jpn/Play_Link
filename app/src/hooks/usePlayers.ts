import { useState, useEffect } from 'react';
import {
  getPlayersByTeam,
  getPlayerDetail,
  createPlayer,
  updatePlayer,
  deactivatePlayer,
  type GetPlayersByTeamVariables,
  type GetPlayerDetailVariables,
  type CreatePlayerVariables,
  type UpdatePlayerVariables,
  type DeactivatePlayerVariables,
  type GetPlayersByTeamData,
  type GetPlayerDetailData
} from '../generated';

/**
 * チームの選手一覧取得フック
 */
export function usePlayersByTeam(teamId: string) {
  const [data, setData] = useState<GetPlayersByTeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getPlayersByTeam({ teamId });
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (teamId) {
      fetchData();
    }
  }, [teamId]);

  return { data, loading, error };
}

/**
 * 選手詳細取得フック
 */
export function usePlayerDetail(playerId: string) {
  const [data, setData] = useState<GetPlayerDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getPlayerDetail({ playerId });
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchData();
    }
  }, [playerId]);

  return { data, loading, error };
}

/**
 * 選手作成フック
 */
export function useCreatePlayer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: CreatePlayerVariables) => {
    try {
      setLoading(true);
      const result = await createPlayer(variables);
      setError(null);
      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

/**
 * 選手更新フック
 */
export function useUpdatePlayer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: UpdatePlayerVariables) => {
    try {
      setLoading(true);
      const result = await updatePlayer(variables);
      setError(null);
      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}

/**
 * 選手無効化フック（論理削除）
 */
export function useDeactivatePlayer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: DeactivatePlayerVariables) => {
    try {
      setLoading(true);
      const result = await deactivatePlayer(variables);
      setError(null);
      return result.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
