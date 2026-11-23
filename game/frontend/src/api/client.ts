export const WORLD_ID = 'the-boys-room';
export const MAX_PER_PLAYER = 5;
export const MAX_PROMPT_LENGTH = 500;

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

export class ApiError extends Error {
  readonly status: number;
  /** The server's `error` message from a JSON error body, when it sent one. */
  readonly detail?: string;

  constructor(status: number, message: string, detail?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

/** Reads the `error` string from a JSON error body; undefined when the body is missing or not that shape. */
async function errorDetail(res: Response): Promise<string | undefined> {
  try {
    const body: unknown = await res.json();
    if (body && typeof body === 'object' && typeof (body as { error?: unknown }).error === 'string') {
      return (body as { error: string }).error;
    }
  } catch {
    // Not a JSON body: the status line alone describes the failure.
  }
  return undefined;
}

async function readJSON<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new ApiError(res.status, `${res.status} ${res.statusText}`, await errorDetail(res));
  }
  return (await res.json()) as T;
}

/** Public: the current round of a world (GET /api/v1/worlds/{id}/round/current). */
export async function getCurrentRound(worldId: string = WORLD_ID): Promise<Round> {
  const res = await fetch(`/api/v1/worlds/${encodeURIComponent(worldId)}/round/current`);
  return readJSON<Round>(res);
}

export interface World {
  id: string;
  title: string;
}

/** Public: a world by id (GET /api/v1/worlds/{id}). */
export async function getWorld(worldId: string = WORLD_ID): Promise<World> {
  const res = await fetch(`/api/v1/worlds/${encodeURIComponent(worldId)}`);
  return readJSON<World>(res);
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

/** Creates a round in the world with the given duration in hours (POST /api/v1/admin/rounds). */
export function createRound(token: string, durationHours: number): Promise<Round> {
  return adminRequest<Round>(token, '/api/v1/admin/rounds', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ world_id: WORLD_ID, duration: `${durationHours}h` }),
  });
}

export function listRoundContributions(token: string, id: string): Promise<AdminContribution[]> {
  return adminRequest<AdminContribution[]>(
    token,
    `/api/v1/admin/rounds/${encodeURIComponent(id)}/contributions?world=${WORLD_ID}`,
  );
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
