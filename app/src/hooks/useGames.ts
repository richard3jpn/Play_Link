import { useState, useEffect, useCallback } from 'react';
import {
  getGamesByTeam,
  getGameDetail,
  getGameLineups,
  getGamePlays,
  getUpcomingGames,
  createGame,
  updateGame,
  finalizeGame,
  startGame,
  type GetGamesByTeamVariables,
  type GetGameDetailVariables,
  type GetGameLineupsVariables,
  type GetGamePlaysVariables,
  type GetUpcomingGamesVariables,
  type CreateGameVariables,
  type UpdateGameVariables,
  type FinalizeGameVariables,
  type StartGameVariables,
  type GetGamesByTeamData,
  type GetGameDetailData,
  type GetGameLineupsData,
  type GetGamePlaysData,
  type GetUpcomingGamesData
} from '../generated';

/**
 * チームの試合一覧取得フック（アーカイブ）
 */
export function useGamesByTeam(teamId: string, limit?: number) {
  const [data, setData] = useState<GetGamesByTeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getGamesByTeam({ teamId, limit });
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
  }, [teamId, limit]);

  return { data, loading, error };
}

/**
 * 試合詳細取得フック
 */
export function useGameDetail(gameId: string) {
  const [data, setData] = useState<GetGameDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getGameDetail({ gameId });
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchData();
    }
  }, [gameId]);

  return { data, loading, error };
}

/**
 * 試合のスタメン・ベンチ情報取得フック
 */
export function useGameLineups(gameId: string) {
  const [data, setData] = useState<GetGameLineupsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getGameLineups({ gameId });
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchData();
    }
  }, [gameId]);

  return { data, loading, error };
}

/**
 * 試合のプレイ記録取得フック
 */
export function useGamePlays(gameId: string) {
  const [data, setData] = useState<GetGamePlaysData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getGamePlays({ gameId });
      setData(result.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    if (gameId) {
      refetch();
    }
  }, [gameId, refetch]);

  return { data, loading, error, refetch };
}

/**
 * 次回の試合予定取得フック
 */
export function useUpcomingGames(teamId: string, limit?: number) {
  const [data, setData] = useState<GetUpcomingGamesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getUpcomingGames({ teamId, limit });
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
  }, [teamId, limit]);

  return { data, loading, error };
}

/**
 * 試合作成フック
 */
export function useCreateGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: CreateGameVariables) => {
    try {
      setLoading(true);
      const result = await createGame(variables);
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
 * 試合更新フック
 */
export function useUpdateGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: UpdateGameVariables) => {
    try {
      setLoading(true);
      const result = await updateGame(variables);
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
 * 試合終了フック
 */
export function useFinalizeGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: FinalizeGameVariables) => {
    try {
      setLoading(true);
      const result = await finalizeGame(variables);
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
 * 試合開始フック
 */
export function useStartGame() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: StartGameVariables) => {
    try {
      setLoading(true);
      const result = await startGame(variables);
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
