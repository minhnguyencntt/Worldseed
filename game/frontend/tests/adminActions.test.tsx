// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminApp } from '../src/components/AdminApp';
import { adminContributionFixture, executionFixture, failedExecutionFixture, roundFixture } from './fixtures/api';

const CURRENT_ROUND_URL = '/api/v1/worlds/the-boys-room/round/current';
const ADMIN_ROUND_URL = `/api/v1/admin/rounds/${roundFixture.id}?world=the-boys-room`;
const CONTRIBUTIONS_URL = `/api/v1/admin/rounds/${roundFixture.id}/contributions?world=the-boys-room`;
const EXECUTIONS_URL = '/api/v1/admin/executions';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Url-routing fetch stub, shaped like the one in adminExecution.test.tsx. It answers the
// public current-round lookup and every admin path, rejects admin calls whose bearer token
// is not 'secret' with 401, and also answers the execution action endpoints (POST
// /api/v1/admin/executions/{id}/{approve|retry|reject}) with the given execution.
function stubFetch(executions: unknown[], actionResult: unknown) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === CURRENT_ROUND_URL) return json(roundFixture);
    const auth = new Headers(init?.headers).get('Authorization');
    if (auth !== 'Bearer secret') return json({ error: 'unauthorized' }, 401);
    if (url === ADMIN_ROUND_URL) return json(roundFixture);
    if (url === CONTRIBUTIONS_URL) return json([adminContributionFixture]);
    if (url === EXECUTIONS_URL) return json(executions);
    if (/^\/api\/v1\/admin\/executions\/[^/]+\/(approve|retry|reject)$/.test(url) && init?.method === 'POST') {
      return json(actionResult);
    }
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

/** Calls made to the fetch stub as [url, method, Authorization header] tuples. */
function callsOf(fetchMock: ReturnType<typeof stubFetch>) {
  return fetchMock.mock.calls.map(([input, init]) => ({
    url: String(input),
    method: init?.method ?? 'GET',
    auth: new Headers(init?.headers).get('Authorization'),
  }));
}

describe('AdminApp execution handlers', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given a FAILED execution, when Retry is clicked, then it POSTs the retry with the admin token and reloads the executions', async () => {
    // Given a FAILED execution for the current round
    const fetchMock = stubFetch([failedExecutionFixture], failedExecutionFixture);
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');
    const retry = await screen.findByRole('button', { name: 'Retry' });
    const getsBefore = callsOf(fetchMock).filter((c) => c.url === EXECUTIONS_URL && c.method === 'GET').length;

    // When the user clicks Retry
    await user.click(retry);

    // Then the retry endpoint is called with POST and the bearer token
    const retryCall = callsOf(fetchMock).find(
      (c) => c.url === `${EXECUTIONS_URL}/${failedExecutionFixture.id}/retry` && c.method === 'POST',
    );
    expect(retryCall).toBeDefined();
    expect(retryCall?.auth).toBe('Bearer secret');

    // And the executions list is fetched again so the panel reloads
    await waitFor(() => {
      const getsAfter = callsOf(fetchMock).filter((c) => c.url === EXECUTIONS_URL && c.method === 'GET').length;
      expect(getsAfter).toBeGreaterThan(getsBefore);
    });
  });

  it('Given an AWAITING_APPROVAL execution, when Approve is clicked, then it POSTs the approval with the admin token and reloads the executions', async () => {
    // Given an execution awaiting approval for the current round
    const awaiting = { ...executionFixture, status: 'AWAITING_APPROVAL' };
    const fetchMock = stubFetch([awaiting], awaiting);
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');
    const approve = await screen.findByRole('button', { name: 'Approve' });
    const getsBefore = callsOf(fetchMock).filter((c) => c.url === EXECUTIONS_URL && c.method === 'GET').length;

    // When the user clicks Approve
    await user.click(approve);

    // Then the approve endpoint is called with POST and the bearer token
    const approveCall = callsOf(fetchMock).find(
      (c) => c.url === `${EXECUTIONS_URL}/${executionFixture.id}/approve` && c.method === 'POST',
    );
    expect(approveCall).toBeDefined();
    expect(approveCall?.auth).toBe('Bearer secret');

    // And the executions list is fetched again so the panel reloads
    await waitFor(() => {
      const getsAfter = callsOf(fetchMock).filter((c) => c.url === EXECUTIONS_URL && c.method === 'GET').length;
      expect(getsAfter).toBeGreaterThan(getsBefore);
    });
  });

  it('Given an AWAITING_APPROVAL execution, when Reject is clicked, then it POSTs the rejection with the admin token and reloads the executions', async () => {
    // Given an execution awaiting approval for the current round
    const awaiting = { ...executionFixture, status: 'AWAITING_APPROVAL' };
    const fetchMock = stubFetch([awaiting], awaiting);
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');
    const reject = await screen.findByRole('button', { name: 'Reject' });
    const getsBefore = callsOf(fetchMock).filter((c) => c.url === EXECUTIONS_URL && c.method === 'GET').length;

    // When the user clicks Reject
    await user.click(reject);

    // Then the reject endpoint is called with POST and the bearer token
    const rejectCall = callsOf(fetchMock).find(
      (c) => c.url === `${EXECUTIONS_URL}/${executionFixture.id}/reject` && c.method === 'POST',
    );
    expect(rejectCall).toBeDefined();
    expect(rejectCall?.auth).toBe('Bearer secret');

    // And the executions list is fetched again so the panel reloads
    await waitFor(() => {
      const getsAfter = callsOf(fetchMock).filter((c) => c.url === EXECUTIONS_URL && c.method === 'GET').length;
      expect(getsAfter).toBeGreaterThan(getsBefore);
    });
  });
});

/** Fetch stub for the failure cases: admin reads succeed, and each execution action POST is answered by `respond`. */
function stubActionFetch(executions: unknown[], respond: (url: string) => Response | Promise<Response>) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === CURRENT_ROUND_URL) return json(roundFixture);
    const auth = new Headers(init?.headers).get('Authorization');
    if (auth !== 'Bearer secret') return json({ error: 'unauthorized' }, 401);
    if (url === ADMIN_ROUND_URL) return json(roundFixture);
    if (url === CONTRIBUTIONS_URL) return json([adminContributionFixture]);
    if (url === EXECUTIONS_URL) return json(executions);
    if (/^\/api\/v1\/admin\/executions\/[^/]+\/(approve|retry|reject)$/.test(url) && init?.method === 'POST') {
      return respond(url);
    }
    return json({ error: 'not found' }, 404);
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('AdminApp execution action errors', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given a FAILED execution, when the retry endpoint returns 500 with {error:"boom"}, then the Execution region shows "boom" in an alert', async () => {
    // Given a FAILED execution whose retry endpoint answers 500 with a JSON error body
    stubActionFetch([failedExecutionFixture], () => json({ error: 'boom' }, 500));
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');
    await user.click(await screen.findByRole('button', { name: 'Retry' }));

    // Then the Execution region shows the server's error message in an alert
    const region = await screen.findByRole('region', { name: 'Execution' });
    await waitFor(() => {
      const alerts = within(region).getAllByRole('alert').map((a) => a.textContent);
      expect(alerts).toContain('boom');
    });
  });

  it('Given an AWAITING_APPROVAL execution, when the approve endpoint returns 401, then the admin token field is shown again with "Invalid token"', async () => {
    // Given an execution awaiting approval whose approve endpoint rejects the token
    const awaiting = { ...executionFixture, status: 'AWAITING_APPROVAL' };
    stubActionFetch([awaiting], () => json({ error: 'unauthorized' }, 401));
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');
    await user.click(await screen.findByRole('button', { name: 'Approve' }));

    // Then the token gate is shown again with the Invalid token message
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid token');
    expect(screen.getByLabelText('Admin token')).toBeInTheDocument();
  });

  it('Given a FAILED execution, when the retry endpoint returns 401, then the admin token field is shown again with "Invalid token"', async () => {
    // Given a FAILED execution whose retry endpoint rejects the token
    stubActionFetch([failedExecutionFixture], () => json({ error: 'unauthorized' }, 401));
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');
    await user.click(await screen.findByRole('button', { name: 'Retry' }));

    // Then the token gate is shown again with the Invalid token message
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid token');
    expect(screen.getByLabelText('Admin token')).toBeInTheDocument();
  });

  it('Given an AWAITING_APPROVAL execution, when the reject endpoint returns 401, then the admin token field is shown again with "Invalid token"', async () => {
    // Given an execution awaiting approval whose reject endpoint rejects the token
    const awaiting = { ...executionFixture, status: 'AWAITING_APPROVAL' };
    stubActionFetch([awaiting], () => json({ error: 'unauthorized' }, 401));
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');
    await user.click(await screen.findByRole('button', { name: 'Reject' }));

    // Then the token gate is shown again with the Invalid token message
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid token');
    expect(screen.getByLabelText('Admin token')).toBeInTheDocument();
  });

  it('Given an AWAITING_APPROVAL execution, when the reject endpoint returns 500 with {error:"boom"}, then the Execution region shows "boom" in an alert', async () => {
    // Given an execution awaiting approval whose reject endpoint returns a 500 with a message
    stubActionFetch([{ ...executionFixture, status: 'AWAITING_APPROVAL' }], () => json({ error: 'boom' }, 500));
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');

    // When the user clicks Reject
    await user.click(await screen.findByRole('button', { name: 'Reject' }));

    // Then the Execution region shows the server's error message in an alert
    const region = await screen.findByRole('region', { name: 'Execution' });
    await waitFor(() => {
      const alerts = within(region).getAllByRole('alert').map((a) => a.textContent);
      expect(alerts).toContain('boom');
    });
  });

  it('Given a failed action, when the next action succeeds, then the earlier error message is gone', async () => {
    // Given a FAILED execution whose first retry returns 500 and whose second retry succeeds
    let calls = 0;
    const statusLine = '500 Internal Server Error';
    stubActionFetch([failedExecutionFixture], () => {
      calls += 1;
      return calls === 1
        ? new Response(JSON.stringify({ error: 'boom' }), {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { 'Content-Type': 'application/json' },
          })
        : json(failedExecutionFixture);
    });
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');
    await user.click(await screen.findByRole('button', { name: 'Retry' }));
    const region = await screen.findByRole('region', { name: 'Execution' });
    await waitFor(() => {
      expect(within(region).getAllByRole('alert').map((a) => a.textContent)).toContain(statusLine);
    });

    // When the user retries again and the second action succeeds
    await user.click(screen.getByRole('button', { name: 'Retry' }));

    // Then the earlier error message is no longer shown
    await waitFor(() => {
      expect(calls).toBe(2);
    });
    await waitFor(() => {
      const alerts = within(region).queryAllByRole('alert').map((a) => a.textContent);
      expect(alerts).not.toContain(statusLine);
    });
  });

  it('Given a FAILED execution, when fetch rejects with a non-Error value, then the Execution region shows "Request failed"', async () => {
    // Given a FAILED execution whose retry request rejects with a plain string
    stubActionFetch([failedExecutionFixture], () => Promise.reject('network down'));
    const user = userEvent.setup();
    render(<AdminApp />);
    enterToken('secret');
    await user.click(await screen.findByRole('button', { name: 'Retry' }));

    // Then the Execution region shows the generic failure message
    const region = await screen.findByRole('region', { name: 'Execution' });
    await waitFor(() => {
      const alerts = within(region).getAllByRole('alert').map((a) => a.textContent);
      expect(alerts).toContain('Request failed');
    });
  });
});
