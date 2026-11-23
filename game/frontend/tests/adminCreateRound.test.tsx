// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminApp } from '../src/components/AdminApp';
import { roundFixture, worldFixture } from './fixtures/api';

const CURRENT_ROUND_URL = '/api/v1/worlds/the-boys-room/round/current';
const WORLD_URL = '/api/v1/worlds/the-boys-room';
const CREATE_ROUND_URL = '/api/v1/admin/rounds';
const ADMIN_ROUND_URL = `/api/v1/admin/rounds/${roundFixture.id}?world=the-boys-room`;
const CONTRIBUTIONS_URL = `/api/v1/admin/rounds/${roundFixture.id}/contributions?world=the-boys-room`;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Url-routing fetch stub: answers the public lookups, rejects admin calls whose bearer
// token is not 'secret' with 401, and answers the create-round POST with createResponse.
function stubFetch(createResponse: () => Response = () => json(roundFixture, 201)) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === CURRENT_ROUND_URL) return json(roundFixture);
    if (url === WORLD_URL) return json(worldFixture);
    const auth = new Headers(init?.headers).get('Authorization');
    if (auth !== 'Bearer secret') return json({ error: 'unauthorized' }, 401);
    if (url === CREATE_ROUND_URL && init?.method === 'POST') return createResponse();
    if (url === ADMIN_ROUND_URL) return json(roundFixture);
    if (url === CONTRIBUTIONS_URL) return json([]);
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

describe('AdminApp Create round', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given an authenticated admin who sets the duration to 12 hours, when Create round is clicked, then a POST to /api/v1/admin/rounds is sent with a Bearer header and the body {world_id, duration: "12h"}', async () => {
    const fetchMock = stubFetch();
    render(<AdminApp />);
    enterToken('secret');
    const createButton = await screen.findByRole('button', { name: 'Create round' });

    fireEvent.change(screen.getByLabelText('Duration (hours)'), { target: { value: '12' } });
    fireEvent.click(createButton);

    await waitFor(() => {
      const post = fetchMock.mock.calls.find(([url]) => String(url) === CREATE_ROUND_URL);
      expect(post).toBeDefined();
      const init = post![1]!;
      expect(init.method).toBe('POST');
      expect(new Headers(init.headers).get('Authorization')).toBe('Bearer secret');
      expect(JSON.parse(String(init.body))).toEqual({ world_id: 'the-boys-room', duration: '12h' });
    });
  });

  it('Given an admin whose create-round request returns 401, when Create round is clicked, then the Invalid token alert is shown and the Admin token input is shown again', async () => {
    stubFetch(() => json({ error: 'unauthorized' }, 401));
    render(<AdminApp />);
    enterToken('secret');
    const createButton = await screen.findByRole('button', { name: 'Create round' });

    fireEvent.click(createButton);

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid token');
    expect(screen.getByLabelText('Admin token')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Create round' })).toBeNull();
  });
});
