import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { approveExecution, retryExecution } from '../src/api/client';
import { ExecutionPanel } from '../src/components/ExecutionPanel';
import { executionFixture } from './fixtures/api';

function renderPanel(status: string, extra: Record<string, unknown> = {}) {
  const onApprove = vi.fn();
  const onRetry = vi.fn();
  render(
    <ExecutionPanel
      execution={{ ...executionFixture, id: 'EX1', status }}
      contributionCount={2}
      onApprove={onApprove}
      onRetry={onRetry}
      {...extra}
    />,
  );
  return { onApprove, onRetry };
}

describe('ExecutionPanel actions', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows an Approve button for an AWAITING_APPROVAL execution and calls onApprove with its id', async () => {
    const { onApprove, onRetry } = renderPanel('AWAITING_APPROVAL');

    await userEvent.click(screen.getByRole('button', { name: 'Approve' }));

    expect(onApprove).toHaveBeenCalledTimes(1);
    expect(onApprove).toHaveBeenCalledWith('EX1');
    expect(onRetry).not.toHaveBeenCalled();
  });

  it('shows a Retry button for a FAILED execution and calls onRetry with its id', async () => {
    const { onApprove, onRetry } = renderPanel('FAILED');

    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onRetry).toHaveBeenCalledWith('EX1');
    expect(onApprove).not.toHaveBeenCalled();
  });

  it('shows neither Approve nor Retry for a RUNNING execution', () => {
    renderPanel('RUNNING');

    expect(screen.queryByRole('button', { name: 'Approve' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Retry' })).not.toBeInTheDocument();
  });

  it('renders the action error in a role alert', () => {
    renderPanel('FAILED', { actionError: 'execution: illegal state' });

    expect(screen.getByRole('alert')).toHaveTextContent('execution: illegal state');
  });
});

describe('approveExecution and retryExecution', () => {
  it('POSTs to the approve route with the bearer token', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(executionFixture), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await approveExecution('t', 'EX1');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/v1/admin/executions/EX1/approve');
    expect(init.method).toBe('POST');
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer t');
  });

  it('POSTs to the retry route with the bearer token', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(executionFixture), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await retryExecution('t', 'EX1');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/v1/admin/executions/EX1/retry');
    expect(init.method).toBe('POST');
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer t');
  });
});
