export interface RoundInfo {
  id: string;
  number: number;
  status: string;
  starts_at: string;
  ends_at: string;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    throw new ApiError(res.status, `GET ${path} failed with status ${res.status}`);
  }
  return (await res.json()) as T;
}

export function getCurrentRound(): Promise<RoundInfo> {
  return request<RoundInfo>('/api/v1/worlds/the-boys-room/round/current');
}
