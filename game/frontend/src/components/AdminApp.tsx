import { useEffect, useState } from 'react';
import {
  ApiError,
  closeRound,
  getAdminRound,
  getCurrentRound,
  listRoundContributions,
  openRound,
  WORLD_ID,
  type AdminContribution,
  type Round,
} from '../api/client';
import { TokenGate } from './TokenGate';

type RoundAction = (token: string, id: string) => Promise<Round>;

export function AdminApp() {
  // The admin token lives in memory only: a reload asks for it again.
  const [token, setToken] = useState('');
  const [gateError, setGateError] = useState<string | undefined>(undefined);
  const [roundId, setRoundId] = useState<string | undefined>(undefined);
  const [round, setRound] = useState<Round | undefined>(undefined);
  const [contributions, setContributions] = useState<AdminContribution[]>([]);
  const [durationHours, setDurationHours] = useState(24);
  const [maxContributions, setMaxContributions] = useState(5);
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

  if (!token) {
    return (
      <TokenGate
        onToken={(value) => {
          setGateError(undefined);
          setToken(value);
        }}
        error={gateError}
      />
    );
  }

  return (
    <main className="admin-app">
      <h1>Admin · {WORLD_ID}</h1>
      {error ? <p role="alert">{error}</p> : null}
      {round ? (
        <p>
          Round {round.id} · number {round.number} · status {round.status}
        </p>
      ) : (
        <p>Loading round…</p>
      )}
      <label>
        Duration (hours)
        <input
          type="number"
          min={1}
          value={durationHours}
          onChange={(event) => setDurationHours(Number(event.target.value))}
        />
      </label>
      <label>
        Max contributions per player
        <input
          type="number"
          min={1}
          value={maxContributions}
          onChange={(event) => setMaxContributions(Number(event.target.value))}
        />
      </label>
      <div>
        <button type="button" onClick={() => runRoundAction(openRound)}>
          Open round
        </button>
        <button type="button" onClick={() => runRoundAction(closeRound)}>
          Close round
        </button>
      </div>
      <ul aria-label="Contributions">
        {contributions.map((c) => (
          <li key={c.id}>{c.prompt}</li>
        ))}
      </ul>
    </main>
  );
}
