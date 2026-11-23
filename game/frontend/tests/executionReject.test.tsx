// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ExecutionPanel } from '../src/components/ExecutionPanel';
import { executionFixture } from './fixtures/api';

// Renders ExecutionPanel directly (no AdminApp, no fetch) with vi.fn callbacks.
// The execution object follows the ExecutionInfo contract from executionFixture.
function renderPanel(status: string, withReject = true) {
  const onApprove = vi.fn();
  const onRetry = vi.fn();
  const onReject = withReject ? vi.fn() : undefined;
  const result = render(
    <ExecutionPanel
      execution={{ ...executionFixture, id: 'EX1', status }}
      contributionCount={2}
      onApprove={onApprove}
      onRetry={onRetry}
      onReject={onReject}
    />,
  );
  return { ...result, onApprove, onRetry, onReject };
}

afterEach(() => {
  cleanup();
});

describe('ExecutionPanel Reject button', () => {
  it('shows Reject for AWAITING_APPROVAL and calls onReject with the id', async () => {
    // Given an execution awaiting approval with an onReject handler
    const user = userEvent.setup();
    const { onApprove, onRetry, onReject } = renderPanel('AWAITING_APPROVAL');

    // When the user clicks Reject
    await user.click(screen.getByRole('button', { name: 'Reject' }));

    // Then onReject is called once with the execution id and the other actions are not called
    expect(onReject).toHaveBeenCalledTimes(1);
    expect(onReject).toHaveBeenCalledWith('EX1');
    expect(onApprove).not.toHaveBeenCalled();
    expect(onRetry).not.toHaveBeenCalled();
  });

  it('hides Reject without onReject or for non-awaiting statuses', () => {
    // Given AWAITING_APPROVAL but no onReject handler, Reject must be hidden
    const noHandler = renderPanel('AWAITING_APPROVAL', false);
    expect(screen.queryByRole('button', { name: 'Reject' })).not.toBeInTheDocument();
    noHandler.unmount();

    // Given a FAILED execution with an onReject handler, Reject must be hidden
    const failed = renderPanel('FAILED');
    expect(screen.queryByRole('button', { name: 'Reject' })).not.toBeInTheDocument();
    failed.unmount();

    // Given a RUNNING execution with an onReject handler, Reject must be hidden
    renderPanel('RUNNING');
    expect(screen.queryByRole('button', { name: 'Reject' })).not.toBeInTheDocument();
  });

  it('Approve and Retry still call their callbacks', async () => {
    // Given an execution awaiting approval
    const user = userEvent.setup();
    const approving = renderPanel('AWAITING_APPROVAL');

    // When the user clicks Approve
    await user.click(within(approving.container).getByRole('button', { name: 'Approve' }));

    // Then onApprove is called with the execution id
    expect(approving.onApprove).toHaveBeenCalledWith('EX1');
    approving.unmount();

    // Given a failed execution
    const failed = renderPanel('FAILED');

    // When the user clicks Retry
    await user.click(within(failed.container).getByRole('button', { name: 'Retry' }));

    // Then onRetry is called with the execution id and onReject is never called
    expect(failed.onRetry).toHaveBeenCalledWith('EX1');
    expect(failed.onReject).not.toHaveBeenCalled();
  });
});
