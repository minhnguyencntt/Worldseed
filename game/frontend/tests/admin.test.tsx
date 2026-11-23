// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminApp } from '../src/components/AdminApp';
import { adminContributionFixture, roundFixture } from './fixtures/api';


const CURRENT_ROUND_URL = '/api/v1/worlds/the-boys-room/round/current';
const ADMIN_ROUND_URL = `/api/v1/admin/rounds/${roundFixture.id}?world=the-boys-room`;
const OPEN_URL = `/api/v1/admin/rounds/${roundFixture.id}/open?world=the-boys-room`;
const CLOSE_URL = `/api/v1/admin/rounds/${roundFixture.id}/close?world=the-boys-room`;
const CONTRIBUTIONS_URL = `/api/v1/admin/rounds/${roundFixture.id}/contributions?world=the-boys-room`;
const STATUS_TEXT = new RegExp(`status ${roundFixture.status}`);

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Url-routing fetch stub: answers the public current-round lookup and every admin
// path, and rejects admin calls whose bearer token is not 'secret' with 401.
function stubFetch() {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === CURRENT_ROUND_URL) return json(roundFixture);
    const auth = new Headers(init?.headers).get('Authorization');
    if (auth !== 'Bearer secret') return json({ error: 'unauthorized' }, 401);
    if (url === ADMIN_ROUND_URL) return json(roundFixture);
    if (url === CONTRIBUTIONS_URL) return json([adminContributionFixture]);
    if (url === OPEN_URL || url === CLOSE_URL) return json({ ...roundFixture, status: 'open' });
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

describe('AdminApp', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given no admin token yet, when AdminApp first renders, then only the Admin token input is shown and fetch is called only for the public current round', async () => {
    const fetchMock = stubFetch();

    render(<AdminApp />);

    expect(screen.getByLabelText('Admin token')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Open round' })).toBeNull();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(CURRENT_ROUND_URL);
  });

  it('Given the token gate, when the token secret is entered and submitted, then the admin round is fetched with a Bearer header and its status is shown', async () => {
    const fetchMock = stubFetch();
    render(<AdminApp />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(CURRENT_ROUND_URL));

    enterToken('secret');

    await waitFor(() => expect(screen.getByText(STATUS_TEXT)).toBeInTheDocument());
    const adminCall = fetchMock.mock.calls.find(([url]) => String(url) === ADMIN_ROUND_URL);
    expect(adminCall).toBeDefined();
    expect(new Headers(adminCall![1]?.headers).get('Authorization')).toBe('Bearer secret');
  });

  it('Given an authenticated admin, when Open round is clicked, then a POST to the open endpoint is sent', async () => {
    const fetchMock = stubFetch();
    render(<AdminApp />);
    enterToken('secret');
    await waitFor(() => expect(screen.getByText(STATUS_TEXT)).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: 'Open round' }));

    await waitFor(() => {
      const post = fetchMock.mock.calls.find(([url]) => String(url) === OPEN_URL);
      expect(post).toBeDefined();
      expect(post![1]?.method).toBe('POST');
    });
  });

  it('Given an authenticated admin, when Close round is clicked, then a POST to the close endpoint is sent', async () => {
    const fetchMock = stubFetch();
    render(<AdminApp />);
    enterToken('secret');
    await waitFor(() => expect(screen.getByText(STATUS_TEXT)).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: 'Close round' }));

    await waitFor(() => {
      const post = fetchMock.mock.calls.find(([url]) => String(url) === CLOSE_URL);
      expect(post).toBeDefined();
      expect(post![1]?.method).toBe('POST');
    });
  });

  it('Given an authenticated admin with one contribution, when the round loads, then the contributions list shows the prompt', async () => {
    stubFetch();
    render(<AdminApp />);
    enterToken('secret');

    const list = await screen.findByRole('list', { name: 'Contributions' });
    expect(list).toHaveTextContent(adminContributionFixture.prompt);
  });

  it('Given a wrong token, when the admin fetch returns 401, then the gate shows Invalid token and the token input returns', async () => {
    stubFetch();
    render(<AdminApp />);
    enterToken('wrong');

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid token');
    expect(screen.getByLabelText('Admin token')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Open round' })).toBeNull();
  });
});
