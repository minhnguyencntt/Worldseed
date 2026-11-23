// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminApp } from '../src/components/AdminApp';
import { adminContributionFixture, failedExecutionFixture, roundFixture } from './fixtures/api';

const CURRENT_ROUND_URL = '/api/v1/worlds/the-boys-room/round/current';
const ADMIN_ROUND_URL = `/api/v1/admin/rounds/${roundFixture.id}?world=the-boys-room`;
const CONTRIBUTIONS_URL = `/api/v1/admin/rounds/${roundFixture.id}/contributions?world=the-boys-room`;
const EXECUTIONS_URL = '/api/v1/admin/executions';

type Responder = () => Response;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

interface StubOptions {
  /** Builds the response for the executions endpoint; a factory so each call gets a fresh Response. */
  executions: Responder;
}

// Url-routing fetch stub. Answers the public current-round lookup and every admin
// path, rejects admin calls whose bearer token is not 'secret' with 401, and answers
// the executions endpoint with the response under test.
function stubFetch({ executions }: StubOptions) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === CURRENT_ROUND_URL) return json(roundFixture);
    const auth = new Headers(init?.headers).get('Authorization');
    if (auth !== 'Bearer secret') return json({ error: 'unauthorized' }, 401);
    if (url === ADMIN_ROUND_URL) return json(roundFixture);
    if (url === CONTRIBUTIONS_URL) return json([adminContributionFixture]);
    if (url === EXECUTIONS_URL) return executions();
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

describe('AdminApp execution panel', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given a FAILED execution with details, when AdminApp loads, then the Execution region shows them', async () => {
    stubFetch({ executions: () => json([failedExecutionFixture]) });
    render(<AdminApp />);
    enterToken('secret');

    const region = await screen.findByRole('region', { name: 'Execution' });

    expect(region).toHaveTextContent('Contributions: 1');
    expect(region).toHaveTextContent('Failure reason: build failed');
    // The backend execution has no logs, test results or release version, so those show placeholders.
    expect(within(region).getAllByText('Not available')).toHaveLength(3);
  });

  it('Given no executions, when AdminApp loads, then placeholders are shown', async () => {
    stubFetch({ executions: () => json([]) });
    render(<AdminApp />);
    enterToken('secret');

    const region = await screen.findByRole('region', { name: 'Execution' });

    expect(region).toHaveTextContent('Contributions: 1');
    // Duration reads "Duration: Not available" (inline text); logs, tests and release version are standalone placeholders.
    expect(region).toHaveTextContent('Duration: Not available');
    expect(within(region).getAllByText('Not available')).toHaveLength(3);
    expect(region).not.toHaveTextContent('Failure reason');
  });
});
