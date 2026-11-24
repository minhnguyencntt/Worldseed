import { useEffect, useState } from 'react';
import {
  ApiError,
  createRound,
  getAdminRound,
  getCurrentRound,
  getWorld,
  listRoundContributions,
  WORLD_ID,
  type AdminContribution,
  type Round,
} from '../../api/client';

type RoundAction = (token: string, id: string) => Promise<Round>;

export function useAdminRound() {
  // The admin token lives in memory only: a reload asks for it again.
  const [token, setToken] = useState('');
  const [gateError, setGateError] = useState<string | undefined>(undefined);
  const [roundId, setRoundId] = useState<string | undefined>(undefined);
  const [round, setRound] = useState<Round | undefined>(undefined);
  const [contributions, setContributions] = useState<AdminContribution[]>([]);
  const [durationHours, setDurationHours] = useState(24);
  const [worldTitle, setWorldTitle] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [reloads, setReloads] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getCurrentRound(WORLD_ID).then(
      (current) => {
        if (!cancelled) setRoundId(current.id);
      },
      () => {
        if (!cancelled) setError('Could not load the current round');
      },
    );
    getWorld(WORLD_ID).then(
      (w) => {
        if (!cancelled) setWorldTitle(w.title);
      },
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!token || !roundId) return;
    let cancelled = false;
    Promise.all([getAdminRound(token, roundId), listRoundContributions(token, roundId)]).then(
      ([loaded, list]) => {
        if (cancelled) return;
        setRound(loaded);
        setContributions(list);
        setError(undefined);
      },
      (err: unknown) => {
        if (!cancelled) handleError(err);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [token, roundId, reloads]);

  function handleError(err: unknown) {
    if (err instanceof ApiError && err.status === 401) {
      setToken('');
      setGateError('Invalid token');
      return;
    }
    setError(err instanceof Error ? err.message : 'Request failed');
  }

  async function runRoundAction(action: RoundAction) {
    if (!roundId) return;
    try {
      await action(token, roundId);
      setReloads((n) => n + 1);
    } catch (err) {
      handleError(err);
    }
  }

  async function handleCreateRound() {
    try {
      const created = await createRound(token, durationHours);
      setRoundId(created.id);
      setReloads((n) => n + 1);
    } catch (err) {
      handleError(err);
    }
  }

  return {
    token,
    gateError,
    roundId,
    round,
    contributions,
    durationHours,
    worldTitle,
    error,
    setToken,
    setGateError,
    setDurationHours,
    runRoundAction,
    handleCreateRound,
  };
}
