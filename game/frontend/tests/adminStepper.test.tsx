// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminApp } from '../src/components/AdminApp';
import { adminContributionFixture, executionFixture, roundFixture } from './fixtures/api';

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
  /** The admin round the stub returns for the round under test. */
  round?: typeof roundFixture;
  /** Builds the response for the executions endpoint; a factory so each call gets a fresh Response. */
  executions: Responder;
}

// Url-routing fetch stub. Answers the public current-round lookup and every admin
// path, rejects admin calls whose bearer token is not 'secret' with 401, and answers
// the executions endpoint with the response under test.
function stubFetch({ round = roundFixture, executions }: StubOptions) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === CURRENT_ROUND_URL) return json(roundFixture);
    const auth = new Headers(init?.headers).get('Authorization');
    if (auth !== 'Bearer secret') return json({ error: 'unauthorized' }, 401);
    if (url === ADMIN_ROUND_URL) return json(round);
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

/** Returns the stage labels of the lifecycle stepper's current step(s). */
function currentStepText(list: HTMLElement): string[] {
  return Array.from(list.querySelectorAll('[aria-current="step"]')).map((el) => el.textContent ?? '');
}

describe('AdminApp lifecycle stepper', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('Given an OPEN round with no executions, when the admin round loads, then the OPEN step is the single current step', async () => {
    stubFetch({ executions: () => json([]) });
    render(<AdminApp />);
    enterToken('secret');

    const stepper = await screen.findByRole('list', { name: 'Round lifecycle' });

    expect(within(stepper).getAllByRole('listitem')).toHaveLength(7);
    expect(currentStepText(stepper)).toEqual(['OPEN']);
  });

  it('Given a CLOSED round with a RUNNING execution, when the admin round loads, then the DEVELOPING step is the current step', async () => {
    stubFetch({
      round: { ...roundFixture, status: 'CLOSED' },
      executions: () => json([executionFixture]),
    });
    render(<AdminApp />);
    enterToken('secret');

    const stepper = await screen.findByRole('list', { name: 'Round lifecycle' });

    expect(currentStepText(stepper)).toEqual(['DEVELOPING']);
  });

  it('Given an OPEN round and an executions endpoint that returns 404, when the admin round loads, then the OPEN step is current and no alert is shown', async () => {
    stubFetch({ executions: () => json({ error: 'not found' }, 404) });
    render(<AdminApp />);
    enterToken('secret');

    const stepper = await screen.findByRole('list', { name: 'Round lifecycle' });

    expect(currentStepText(stepper)).toEqual(['OPEN']);
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('Given an executions endpoint that returns 401, when the admin round loads, then the gate shows Invalid token', async () => {
    stubFetch({ executions: () => json({ error: 'unauthorized' }, 401) });
    render(<AdminApp />);
    enterToken('secret');

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid token');
    expect(screen.getByLabelText('Admin token')).toBeInTheDocument();
  });
});
