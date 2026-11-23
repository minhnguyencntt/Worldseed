import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ApiError,
  findExecutionForRound,
  getCurrentRoundExecution,
  listExecutions,
  rejectExecution,
} from '../src/api/client';
import type { ExecutionInfo } from '../src/api/client';
import { executionFixture, roundFixture } from './fixtures/api';

describe('listExecutions', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends GET with Bearer token and returns the array', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify([executionFixture]), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const result = await listExecutions('tok');

    expect(result).toEqual([executionFixture]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/v1/admin/executions');
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer tok');
  });

  it('rejects with ApiError 401', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 401, statusText: 'Unauthorized' })),
    );

    const error = await listExecutions('bad').catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(401);
  });
});

describe('rejectExecution', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('POSTs to the reject endpoint with Bearer token and returns the execution', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(executionFixture), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const result = await rejectExecution('tok', 'exec-1');

    expect(result).toEqual(executionFixture);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/v1/admin/executions/exec-1/reject');
    expect(init.method).toBe('POST');
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer tok');
  });

  it('rejects with ApiError 401', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(null, { status: 401, statusText: 'Unauthorized' })),
    );

    const error = await rejectExecution('bad', 'exec-1').catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(401);
  });
});

describe('findExecutionForRound', () => {
  it('returns the execution whose round_id matches', () => {
    const list: ExecutionInfo[] = [
      { ...executionFixture, id: 'a', round_id: 'round-1' },
      { ...executionFixture, id: 'b', round_id: 'round-2' },
    ];

    expect(findExecutionForRound(list, 'round-1')?.id).toBe('a');
  });

  it('returns undefined when no execution matches the round', () => {
    const list: ExecutionInfo[] = [
      { ...executionFixture, id: 'a', round_id: 'round-1' },
      { ...executionFixture, id: 'b', round_id: 'round-2' },
    ];

    expect(findExecutionForRound(list, 'round-9')).toBeUndefined();
  });

  it('returns the newest execution by updated_at when several match', () => {
    const list: ExecutionInfo[] = [
      { ...executionFixture, id: 'older', round_id: 'round-1', updated_at: '2026-01-01T00:00:10Z' },
      { ...executionFixture, id: 'newer', round_id: 'round-1', updated_at: '2026-01-01T00:00:50Z' },
    ];

    expect(findExecutionForRound(list, 'round-1')?.id).toBe('newer');
  });
});

describe('getCurrentRoundExecution', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function stubFetchByUrl(list: unknown[]) {
    const fetchMock = vi.fn((url: string) => {
      if (url === '/api/v1/worlds/the-boys-room/round/current') {
        return Promise.resolve(new Response(JSON.stringify(roundFixture), { status: 200 }));
      }
      if (url === '/api/v1/admin/executions') {
        return Promise.resolve(new Response(JSON.stringify(list), { status: 200 }));
      }
      return Promise.resolve(new Response(null, { status: 404, statusText: 'Not Found' }));
    });
    vi.stubGlobal('fetch', fetchMock);
    return fetchMock;
  }

  it('resolves to the execution of the current round and calls both endpoints', async () => {
    const fetchMock = stubFetchByUrl([
      { ...executionFixture, round_id: 'round-2', id: 'x' },
      { ...executionFixture, id: 'exec-1' },
    ]);

    const result = await getCurrentRoundExecution('tok');

    expect(result?.id).toBe('exec-1');
    const urls = fetchMock.mock.calls.map((call) => call[0]);
    expect(urls).toContain('/api/v1/worlds/the-boys-room/round/current');
    expect(urls).toContain('/api/v1/admin/executions');
  });

  it('resolves to undefined when the list only has executions for other rounds', async () => {
    stubFetchByUrl([{ ...executionFixture, round_id: 'round-2', id: 'x' }]);

    await expect(getCurrentRoundExecution('tok')).resolves.toBeUndefined();
  });
});
