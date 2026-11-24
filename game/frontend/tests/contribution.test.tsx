// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContributionSheet } from '../src/components/ContributionSheet';
import { listMine, submitContribution } from '../src/api/client';
import { contributionFixture } from './fixtures/api';

type Route = (url: string, init?: RequestInit) => Response;

function json(status: number, body?: unknown): Response {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Replaces the global fetch with a stub that answers each call via `route`.
function stubFetch(route: Route) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) =>
    route(String(input), init),
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function methodOf(init?: RequestInit): string {
  return init?.method ?? 'GET';
}

function renderSheet(roundId = 'round-1') {
  return render(<ContributionSheet open onClose={vi.fn()} roundId={roundId} />);
}

describe('ContributionSheet', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given an open sheet, when a prompt is sent, then it posts world_id and prompt and lists the suggestion', async () => {
    const fetchMock = stubFetch((url, init) => {
      if (methodOf(init) === 'GET') return json(200, []);
      return json(201, contributionFixture);
    });
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), {
      target: { value: 'Look behind the shelf' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/v1/contributions',
        expect.objectContaining({ method: 'POST' }),
      ),
    );
    const post = fetchMock.mock.calls.find(([url]) => url === '/api/v1/contributions');
    expect(JSON.parse(String(post?.[1]?.body))).toEqual({
      world_id: 'the-boys-room',
      prompt: 'Look behind the shelf',
    });

    const list = screen.getByRole('list', { name: 'Your suggestions' });
    await waitFor(() => expect(within(list).getByText('Look behind the shelf')).toBeInTheDocument());
    expect(within(list).getByText('Sent')).toBeInTheDocument();
  });

  it('Given the server answers 429, when a prompt is sent, then it shows the slow-down error', async () => {
    stubFetch((_url, init) => (methodOf(init) === 'GET' ? json(200, []) : json(429, { error: 'rate limited' })));
    renderSheet();

    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'Too many ideas' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Slow down, try again shortly');
  });

  it('Given an open sheet, then it shows the remaining count and the closing note', async () => {
    stubFetch(() => json(200, []));
    renderSheet();

    expect(screen.getByText('Contributions left: 5')).toBeInTheDocument();
    expect(screen.getByText('Ideas are considered when the Round closes.')).toBeInTheDocument();
  });

  it('Given the server answers 401 once, when a prompt is sent, then it creates a session and retries in order', async () => {
    const responses: Response[] = [json(401), json(200, {}), json(201, contributionFixture)];
    const fetchMock = stubFetch(() => {
      const next = responses.shift();
      if (next === undefined) throw new Error('unexpected extra fetch call');
      return next;
    });
    // An empty round id skips the best-effort history load, so only the submission calls run.
    renderSheet('');

    fireEvent.change(screen.getByLabelText('Your idea'), {
      target: { value: 'Look behind the shelf' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
    expect(
      fetchMock.mock.calls.map(([url, init]) => `${methodOf(init)} ${url}`),
    ).toEqual([
      'POST /api/v1/contributions',
      'POST /api/v1/player/session',
      'POST /api/v1/contributions',
    ]);
    const list = screen.getByRole('list', { name: 'Your suggestions' });
    await waitFor(() => expect(within(list).getByText('Sent')).toBeInTheDocument());
  });
});

describe('contribution client calls', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('Given a prompt, when submitContribution runs, then it POSTs world_id and prompt with the session cookie', async () => {
    const fetchMock = stubFetch(() => json(201, contributionFixture));

    const result = await submitContribution('Look behind the shelf');

    expect(result).toEqual(contributionFixture);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/v1/contributions');
    expect(init?.method).toBe('POST');
    expect(init?.credentials).toBe('include');
    expect(JSON.parse(String(init?.body))).toEqual({
      world_id: 'the-boys-room',
      prompt: 'Look behind the shelf',
    });
  });

  it('Given a round id, when listMine runs, then it GETs the caller contributions for that round', async () => {
    const fetchMock = stubFetch(() => json(200, [contributionFixture]));

    const list = await listMine('round-1');

    expect(list).toEqual([contributionFixture]);
    expect(fetchMock.mock.calls[0][0]).toBe('/api/v1/player/me/contributions?round_id=round-1');
  });
});
