import { useState, useEffect } from 'react';
import {
  getTeamBySlug,
  getTeams,
  createTeam,
  updateTeam,
  type GetTeamBySlugVariables,
  type CreateTeamVariables,
  type UpdateTeamVariables,
  type GetTeamBySlugData,
  type GetTeamsData,
  type CreateTeamData,
  type UpdateTeamData
} from '../generated';

/**
 * チーム情報取得フック（スラッグ指定）
 */
export function useTeamBySlug(slug: string) {
  const [data, setData] = useState<GetTeamBySlugData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getTeamBySlug({ slug });
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  return { data, loading, error };
}

/**
 * チーム一覧取得フック
 */
export function useTeams() {
  const [data, setData] = useState<GetTeamsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getTeams();
        setData(result.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * チーム作成フック
 */
export function useCreateTeam() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: CreateTeamVariables) => {
    try {
      setLoading(true);
      const result = await createTeam(variables);
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
 * チーム更新フック
 */
export function useUpdateTeam() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: UpdateTeamVariables) => {
    try {
      setLoading(true);
      const result = await updateTeam(variables);
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
