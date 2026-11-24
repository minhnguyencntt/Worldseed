// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContributionSheet } from '../src/components/ContributionSheet';

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

// Harness: a trigger button that opens the sheet, with returnFocusRef pointing at it.
function Harness({ onClose = () => {} }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)}>
        Open sheet
      </button>
      <button type="button">Outside</button>
      <ContributionSheet
        open={open}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
        roundId="round-1"
        returnFocusRef={triggerRef}
      />
    </>
  );
}

describe('ContributionSheet focus trap', () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('wraps Tab from the last control to the first', () => {
    stubFetch(() => json(200, []));
    render(<ContributionSheet open onClose={vi.fn()} roundId="round-1" />);

    const close = screen.getByRole('button', { name: 'Close' });
    close.focus();
    fireEvent.keyDown(close, { key: 'Tab' });

    expect(document.activeElement).toBe(screen.getByLabelText('Your idea'));
  });

  it('pulls focus back inside when moved outside', async () => {
    stubFetch(() => json(200, []));
    render(
      <>
        <button type="button">Outside</button>
        <ContributionSheet open onClose={vi.fn()} roundId="round-1" />
      </>,
    );

    const outside = screen.getByRole('button', { name: 'Outside' });
    outside.focus();

    await waitFor(() =>
      expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(true),
    );
  });

  it('returns focus to the trigger on Escape', async () => {
    stubFetch(() => json(200, []));
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);

    const trigger = screen.getByRole('button', { name: 'Open sheet' });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
