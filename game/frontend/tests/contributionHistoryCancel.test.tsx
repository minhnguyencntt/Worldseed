// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { listMine } from '../src/api/client';
import { ContributionSheet } from '../src/components/ContributionSheet';
import { contributionFixture } from './fixtures/api';

vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    submitContribution: vi.fn(),
    listMine: vi.fn(),
  };
});

const listMineMock = vi.mocked(listMine);

const HISTORY_ERROR = 'Could not load your suggestions';

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

async function flush() {
  await act(async () => {
    await Promise.resolve();
  });
}

describe('history cancel guard', () => {
  beforeEach(() => {
    listMineMock.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('late reject after close is ignored', async () => {
    const first = deferred<typeof contributionFixture[]>();
    listMineMock.mockReturnValueOnce(first.promise);
    const onClose = vi.fn();

    const { rerender } = render(<ContributionSheet open onClose={onClose} roundId="r1" />);
    rerender(<ContributionSheet open={false} onClose={onClose} roundId="r1" />);

    await act(async () => {
      first.reject(new Error('network down'));
    });
    await flush();

    listMineMock.mockResolvedValueOnce([]);
    rerender(<ContributionSheet open onClose={onClose} roundId="r1" />);
    await flush();

    expect(screen.queryByText(HISTORY_ERROR)).toBeNull();
  });

  it('late resolve after roundId change is ignored', async () => {
    const r1 = deferred<typeof contributionFixture[]>();
    listMineMock.mockReturnValueOnce(r1.promise);
    listMineMock.mockResolvedValueOnce([]);
    const onClose = vi.fn();

    const { rerender } = render(<ContributionSheet open onClose={onClose} roundId="r1" />);
    rerender(<ContributionSheet open onClose={onClose} roundId="r2" />);
    await flush();

    await act(async () => {
      r1.resolve([{ ...contributionFixture, id: 'contrib-r1', round_id: 'r1', prompt: 'Stale round idea' }]);
    });
    await flush();

    expect(screen.queryByText('Stale round idea')).toBeNull();
  });

  it('unmount does not warn', async () => {
    const pending = deferred<typeof contributionFixture[]>();
    listMineMock.mockReturnValueOnce(pending.promise);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { unmount } = render(<ContributionSheet open onClose={vi.fn()} roundId="r1" />);
    unmount();

    await act(async () => {
      pending.reject(new Error('late failure'));
    });
    await flush();

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
