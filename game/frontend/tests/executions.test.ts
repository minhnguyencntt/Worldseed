import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, listExecutions } from '../src/api/client';
import { executionFixture } from './fixtures/api';

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
