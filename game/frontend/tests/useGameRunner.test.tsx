// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runStep } from '@game/systems/runner';
import { useGame } from '../src/runtime/useGame';
import { useGameStore } from '../src/store/gameStore';
import { scene } from '../src/runtime/content';
import { readSaved, writeSaved } from '../src/runtime/storage';

// Only the localStorage-backed storage is mocked: no saved game, writes are observable.
vi.mock('../src/runtime/storage', () => ({
  readSaved: vi.fn(() => null),
  writeSaved: vi.fn(() => true),
}));

describe('useGame act and choose route through runStep', () => {
  beforeEach(() => {
    vi.mocked(readSaved).mockReturnValue(null);
    vi.mocked(writeSaved).mockReturnValue(true);
  });

  it('act("bookshelf", "search") from a fresh state returns events and matches runStep', () => {
    const { result } = renderHook(() => useGame());
    const initial = result.current.state;
    const expected = runStep({ scene }, initial, {
      type: 'action',
      objectId: 'bookshelf',
      actionId: 'search',
    });

    let events: ReturnType<typeof result.current.act> = [];
    act(() => {
      events = result.current.act('bookshelf', 'search');
    });

    expect(events.length).toBeGreaterThan(0);
    expect(events).toEqual(expected.events);
    expect(result.current.state).toEqual(expected.state);
    expect(result.current.state.flags.secret_door_open).toBe(true);
  });

  it('act("bookshelf", "nonexistent") returns no events and keeps the same state object', () => {
    const { result } = renderHook(() => useGame());
    const before = result.current.state;

    let events: ReturnType<typeof result.current.act> = [];
    act(() => {
      events = result.current.act('bookshelf', 'nonexistent');
    });

    expect(events).toEqual([]);
    expect(result.current.state).toBe(before);
  });

  it('choose(0) moves activeDialogue to the chosen node next', () => {
    const { result } = renderHook(() => useGame());
    // Seed after mount: hydrate runs once per mount and would overwrite an earlier seed.
    const seeded = { ...result.current.state, activeDialogue: 'intro' };
    act(() => {
      useGameStore.setState({ state: seeded });
    });
    expect(result.current.state.activeDialogue).toBe('intro');

    act(() => {
      result.current.choose(0);
    });

    expect(result.current.state.activeDialogue).toBe('look-around');
    expect(result.current.state.flags.looked_around).toBe(true);
  });
});
