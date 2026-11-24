import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, getCurrentRound } from '../src/api/client';
import { useUiStore } from '../src/store/uiStore';
import { roundFixture } from './fixtures/api';

vi.mock('../src/api/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/api/client')>();
  return {
    ...actual,
    getCurrentRound: vi.fn(),
  };
});

const mockedGetCurrentRound = vi.mocked(getCurrentRound);

describe('uiStore loadRound', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
    mockedGetCurrentRound.mockReset();
  });

  afterEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
  });

  it('Given the round request resolves, then the round is stored, loading is off and there is no error', async () => {
    // Given the server returns the current round
    mockedGetCurrentRound.mockResolvedValue(roundFixture);

    // When the store loads the round
    await useUiStore.getState().loadRound();

    // Then the round is set, loading has finished and no error is recorded
    expect(useUiStore.getState().round).toEqual(roundFixture);
    expect(useUiStore.getState().roundLoading).toBe(false);
    expect(useUiStore.getState().roundError).toBeUndefined();
  });

  it('Given the server answers 404, then the round is cleared and no error is recorded', async () => {
    // Given a round was loaded earlier and the server now has no active round
    useUiStore.setState({ round: roundFixture });
    mockedGetCurrentRound.mockRejectedValue(new ApiError(404, '404 Not Found'));

    // When the store loads the round
    await useUiStore.getState().loadRound();

    // Then the round is undefined, loading has finished and no error is recorded
    expect(useUiStore.getState().round).toBeUndefined();
    expect(useUiStore.getState().roundLoading).toBe(false);
    expect(useUiStore.getState().roundError).toBeUndefined();
  });

  it('Given the server cannot be reached, then the error is described and loading has finished', async () => {
    // Given the network request fails with a TypeError
    mockedGetCurrentRound.mockRejectedValue(new TypeError('Failed to fetch'));

    // When the store loads the round
    await useUiStore.getState().loadRound();

    // Then the store records the reachability message and loading has finished
    expect(useUiStore.getState().roundError).toBe('Could not reach the server');
    expect(useUiStore.getState().roundLoading).toBe(false);
    expect(useUiStore.getState().round).toBeUndefined();
  });

  it('Given the request is pending, then loading is true before the request settles', async () => {
    // Given a request that has not settled yet
    let resolveRound: (r: typeof roundFixture) => void = () => {};
    mockedGetCurrentRound.mockReturnValue(
      new Promise((resolve) => {
        resolveRound = resolve;
      }),
    );

    // When the store starts loading the round
    const loading = useUiStore.getState().loadRound();

    // Then loading is true while the request is pending
    expect(useUiStore.getState().roundLoading).toBe(true);

    // And once the request settles, loading turns off with the round set
    resolveRound(roundFixture);
    await loading;
    expect(useUiStore.getState().roundLoading).toBe(false);
    expect(useUiStore.getState().round).toEqual(roundFixture);
  });
});
