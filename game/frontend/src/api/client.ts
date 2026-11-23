export const WORLD_ID = 'the-boys-room';
export const MAX_PER_PLAYER = 5;

export interface Round {
  id: string;
  number: number;
  status: string;
  starts_at: string;
  ends_at: string;
}

export interface Contribution {
  id: string;
  world_id: string;
  round_id: string;
  player_id: string;
  prompt: string;
  created_at: string;
}

export interface AdminContribution extends Contribution {
  prompt_hash: string;
}

/** An execution as the admin execution endpoints return it (backend/internal/execution/execution.go). */
export interface ExecutionInfo {
  id: string;
  world_id: string;
  round_id: string;
  status: string;
  error: string;
  updated_at: string;
  log?: string;
  tests?: string;
  release_version?: string;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function readJSON<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new ApiError(res.status, `${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

/** Public: the current round of a world (GET /api/v1/worlds/{id}/round/current). */
export async function getCurrentRound(worldId: string = WORLD_ID): Promise<Round> {
  const res = await fetch(`/api/v1/worlds/${encodeURIComponent(worldId)}/round/current`);
  return readJSON<Round>(res);
}

/** Sends a request to an /api/v1/admin path with the bearer token attached. */
export async function adminRequest<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(path, { ...init, headers });
  return readJSON<T>(res);
}

export function getAdminRound(token: string, id: string): Promise<Round> {
  return adminRequest<Round>(token, `/api/v1/admin/rounds/${encodeURIComponent(id)}?world=${WORLD_ID}`);
}

export function openRound(token: string, id: string): Promise<Round> {
  return adminRequest<Round>(token, `/api/v1/admin/rounds/${encodeURIComponent(id)}/open?world=${WORLD_ID}`, {
    method: 'POST',
  });
}

export function closeRound(token: string, id: string): Promise<Round> {
  return adminRequest<Round>(token, `/api/v1/admin/rounds/${encodeURIComponent(id)}/close?world=${WORLD_ID}`, {
    method: 'POST',
  });
}

export function listRoundContributions(token: string, id: string): Promise<AdminContribution[]> {
  return adminRequest<AdminContribution[]>(
    token,
    `/api/v1/admin/rounds/${encodeURIComponent(id)}/contributions?world=${WORLD_ID}`,
  );
}

/** Approves an AWAITING_APPROVAL execution (POST /api/v1/admin/executions/{id}/approve). */
export function approveExecution(token: string, id: string): Promise<ExecutionInfo> {
  return adminRequest<ExecutionInfo>(token, `/api/v1/admin/executions/${encodeURIComponent(id)}/approve`, {
    method: 'POST',
  });
}

/** Retries a FAILED execution (POST /api/v1/admin/executions/{id}/retry). */
export function retryExecution(token: string, id: string): Promise<ExecutionInfo> {
  return adminRequest<ExecutionInfo>(token, `/api/v1/admin/executions/${encodeURIComponent(id)}/retry`, {
    method: 'POST',
  });
}

/** Lists every execution (GET /api/v1/admin/executions). */
export function listExecutions(token: string): Promise<ExecutionInfo[]> {
  return adminRequest<ExecutionInfo[]>(token, '/api/v1/admin/executions');
}

/** Picks the newest execution (greatest updated_at) whose round_id matches, or undefined when none match. */
export function findExecutionForRound(list: ExecutionInfo[], roundId: string): ExecutionInfo | undefined {
  return list
    .filter((e) => e.round_id === roundId)
    .reduce<ExecutionInfo | undefined>((best, e) => (!best || e.updated_at > best.updated_at ? e : best), undefined);
}

/** Resolves the ExecutionInfo for the current Round of a world, or undefined when it has none. */
export async function getCurrentRoundExecution(token: string, worldId: string = WORLD_ID): Promise<ExecutionInfo | undefined> {
  const [round, list] = await Promise.all([getCurrentRound(worldId), listExecutions(token)]);
  return findExecutionForRound(list, round.id);
}

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

/** Player request: prefixes the API base URL and always sends the session cookie. */
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { ...init, credentials: 'include' });
  return readJSON<T>(res);
}

/** Creates an anonymous player session; the server sets the session cookie. */
export function createSession(): Promise<unknown> {
  return request<unknown>('/api/v1/player/session', { method: 'POST' });
}

/**
 * Submits a prompt to the current round of WORLD_ID. On 401 it creates a session
 * and retries the submission once.
 */
export async function submitContribution(prompt: string): Promise<Contribution> {
  const send = () =>
    request<Contribution>('/api/v1/contributions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ world_id: WORLD_ID, prompt }),
    });

  try {
    return await send();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      await createSession();
      return send();
    }
    throw err;
  }
}

/** Lists the caller's contributions for one round, oldest first. */
export function listMine(roundId: string): Promise<Contribution[]> {
  return request<Contribution[]>(
    `/api/v1/player/me/contributions?round_id=${encodeURIComponent(roundId)}`,
  );
}
