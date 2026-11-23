// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminApp } from '../src/components/AdminApp';
import { roundFixture, worldFixture } from './fixtures/api';

const WORLD_URL = '/api/v1/worlds/the-boys-room';
const CURRENT_ROUND_URL = '/api/v1/worlds/the-boys-room/round/current';
const ADMIN_ROUND_URL = `/api/v1/admin/rounds/${roundFixture.id}?world=the-boys-room`;
const ADMIN_CONTRIBUTIONS_URL = `/api/v1/admin/rounds/${roundFixture.id}/contributions?world=the-boys-room`;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Url-routing fetch stub: answers the public world and current-round lookups and the
// admin round with a Bearer 'secret' token; any other admin call (including the removed
// executions endpoint) gets 404. The world
// response is injectable so a test can simulate a failed world lookup.
function stubFetch(worldResponse: () => Response = () => json(worldFixture)) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === WORLD_URL) return worldResponse();
    if (url === CURRENT_ROUND_URL) return json(roundFixture);
    const auth = new Headers(init?.headers).get('Authorization');
    if (auth !== 'Bearer secret') return json({ error: 'unauthorized' }, 401);
    if (url === ADMIN_ROUND_URL) return json(roundFixture);
    if (url === ADMIN_CONTRIBUTIONS_URL) return json([]);
    return json({ error: 'not found' }, 404);
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function enterToken(value: string) {
  const input = screen.getByLabelText('Admin token');
  fireEvent.change(input, { target: { value } });
  fireEvent.submit(input.closest('form')!);
}

describe('AdminApp world title', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given the public world endpoint returns the-boys-room, when AdminApp renders, then the level 1 heading shows the world title', async () => {
    const fetchMock = stubFetch();

    render(<AdminApp />);
    enterToken('secret');

    const heading = await screen.findByRole('heading', { level: 1 });
    await waitFor(() => expect(heading).toHaveTextContent(worldFixture.title));
    expect(fetchMock).toHaveBeenCalledWith(WORLD_URL);
    expect(fetchMock.mock.calls.some(([url]) => String(url).includes('/executions'))).toBe(false);
    expect(new Headers(fetchMock.mock.calls.find(([url]) => String(url) === ADMIN_ROUND_URL)![1]?.headers).get('Authorization')).toBe('Bearer secret');
  });

  it('Given the world lookup returns 404, when AdminApp renders, then the heading falls back to the world id and no error alert is shown', async () => {
    stubFetch(() => json({ error: 'not found' }, 404));

    render(<AdminApp />);
    enterToken('secret');

    const heading = await screen.findByRole('heading', { level: 1 });
    await waitFor(() => expect(heading).toHaveTextContent('the-boys-room'));
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
