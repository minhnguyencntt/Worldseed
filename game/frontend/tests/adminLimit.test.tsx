// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminApp } from '../src/components/AdminApp';
import { roundFixture } from './fixtures/api';

const CURRENT_ROUND_URL = '/api/v1/worlds/the-boys-room/round/current';
const ADMIN_ROUND_URL = `/api/v1/admin/rounds/${roundFixture.id}?world=the-boys-room`;
const CONTRIBUTIONS_URL = `/api/v1/admin/rounds/${roundFixture.id}/contributions?world=the-boys-room`;
const CREATE_ROUND_URL = '/api/v1/admin/rounds';
const LIMIT_LABEL = 'Max contributions per player';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Url-routing fetch stub modelled on tests/admin.test.tsx: answers the public current-round
// lookup and the admin paths, rejecting admin calls whose bearer token is not 'secret'.
function stubFetch() {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === CURRENT_ROUND_URL) return json(roundFixture);
    const auth = new Headers(init?.headers).get('Authorization');
    if (auth !== 'Bearer secret') return json({ error: 'unauthorized' }, 401);
    if (url === ADMIN_ROUND_URL) return json(roundFixture);
    if (url === CONTRIBUTIONS_URL) return json([]);
    if (url === CREATE_ROUND_URL && init?.method === 'POST') return json(roundFixture, 201);
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

describe('AdminApp contribution-limit field', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given an authenticated admin, when AdminApp renders, then the Max contributions per player input is disabled and the server-configuration note is shown', async () => {
    stubFetch();
    render(<AdminApp />);
    enterToken('secret');

    await screen.findByText(/status OPEN/);

    expect(screen.getByLabelText(LIMIT_LABEL)).toBeDisabled();
    expect(screen.getByText(/server configuration/)).toBeInTheDocument();
  });

  it('Given an authenticated admin, when Create round is clicked, then no request body sent to the server contains a max field', async () => {
    const fetchMock = stubFetch();
    render(<AdminApp />);
    enterToken('secret');
    await screen.findByText(/status OPEN/);

    fireEvent.click(screen.getByRole('button', { name: 'Create round' }));

    await waitFor(() => {
      const post = fetchMock.mock.calls.find(
        ([url, init]) => String(url) === CREATE_ROUND_URL && init?.method === 'POST',
      );
      expect(post).toBeDefined();
    });
    const bodies = fetchMock.mock.calls.map(([, init]) => (typeof init?.body === 'string' ? init.body : ''));
    for (const body of bodies) {
      expect(body.toLowerCase()).not.toContain('max');
    }
  });
});
