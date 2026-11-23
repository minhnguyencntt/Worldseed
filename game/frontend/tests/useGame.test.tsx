// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useGame } from '../src/runtime/useGame';

// Storage is faked by jsdom's localStorage; tests/setup.ts clears it and restores spies after each test.
describe('useGame persistence', () => {
  it('persists state across remount', () => {
    const first = renderHook(() => useGame());
    act(() => {
      first.result.current.act('bookshelf', 'search');
    });
    expect(first.result.current.state.flags.secret_door_open).toBe(true);
    first.unmount();

    const second = renderHook(() => useGame());

    expect(second.result.current.state.flags.secret_door_open).toBe(true);
  });

  it('storage failure fallback: keeps playing when writes throw and starts fresh on corrupt saves', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('{bad');
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    const { result } = renderHook(() => useGame());

    expect(result.current.state.activeDialogue).toBe('intro');
    expect(() => {
      act(() => {
        result.current.act('bookshelf', 'search');
      });
    }).not.toThrow();
    expect(setItem).toHaveBeenCalled();
    expect(result.current.state.flags.secret_door_open).toBe(true);
  });
});
