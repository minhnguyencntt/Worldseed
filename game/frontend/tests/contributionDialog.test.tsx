// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContributionSheet } from '../src/components/ContributionSheet';
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

describe('ContributionSheet dialog', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given an open dialog, when Escape is pressed, then onClose is called once', async () => {
    stubFetch(() => json(200, []));
    const onClose = vi.fn();
    render(<ContributionSheet open onClose={onClose} roundId="round-1" />);

    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it('Given an open dialog, then it is named by its title and described by the closing note', async () => {
    stubFetch(() => json(200, []));
    render(<ContributionSheet open onClose={vi.fn()} roundId="round-1" />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('Suggest What Happens Next');
    expect(dialog).toHaveAccessibleDescription(
      expect.stringContaining('Ideas are considered when the Round closes.'),
    );
  });

  it('Given open is false, then no dialog is rendered', () => {
    stubFetch(() => json(200, []));
    render(<ContributionSheet open={false} onClose={vi.fn()} roundId="round-1" />);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('Given an open dialog, when the Close button is clicked, then onClose is called', async () => {
    stubFetch(() => json(200, []));
    const onClose = vi.fn();
    render(<ContributionSheet open onClose={onClose} roundId="round-1" />);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it('Given an open dialog, when an idea is typed and sent, then it still posts and lists the suggestion', async () => {
    const fetchMock = stubFetch((_url, init) =>
      methodOf(init) === 'GET' ? json(200, []) : json(201, contributionFixture),
    );
    render(<ContributionSheet open onClose={vi.fn()} roundId="round-1" />);

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
});
