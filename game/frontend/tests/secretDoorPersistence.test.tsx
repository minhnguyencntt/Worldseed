// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { applyEvent } from '@game/systems/events';
import { useGameStore } from '../src/store/gameStore';
import { useGame } from '../src/runtime/useGame';

const SECRET_DOOR = 'secret-door-open';

// Storage is faked by jsdom's localStorage; tests/setup.ts clears it and restores spies after each test.
describe('secret door stays open', () => {
  it('hides the open secret door before the bookshelf is searched', () => {
    // Given a fresh game with no saved state
    const { result } = renderHook(() => useGame());

    // When the scene view is read before any search
    // Then the secret door object is not visible
    expect(result.current.view.map((o) => o.id)).not.toContain(SECRET_DOOR);
  });

  it('shows the secret door after searching the bookshelf', () => {
    // Given a fresh game
    const { result } = renderHook(() => useGame());

    // When the player searches the bookshelf
    act(() => {
      result.current.act('bookshelf', 'search');
    });

    // Then the secret door flag is set and the secret door is visible in the view
    expect(result.current.state.flags.secret_door_open).toBe(true);
    expect(result.current.view.map((o) => o.id)).toContain(SECRET_DOOR);
  });

  it('keeps the flag and view unchanged after going to another scene and back', () => {
    // Given the secret door has been opened
    const { result } = renderHook(() => useGame());
    act(() => {
      result.current.act('bookshelf', 'search');
    });

    // When the player goes away to another scene and then returns to the bedroom
    act(() => {
      useGameStore.getState().setState((prev) =>
        applyEvent(prev, { type: 'goto_scene', scene: 'hallway' }),
      );
    });
    act(() => {
      useGameStore.getState().setState((prev) =>
        applyEvent(prev, { type: 'goto_scene', scene: 'bedroom' }),
      );
    });

    // Then the flag is still true and the secret door is still in the view
    expect(result.current.state.flags.secret_door_open).toBe(true);
    expect(result.current.view.map((o) => o.id)).toContain(SECRET_DOOR);
  });

  it('restores the open secret door after unmount and remount', () => {
    // Given the secret door has been opened and the hook is unmounted
    const first = renderHook(() => useGame());
    act(() => {
      first.result.current.act('bookshelf', 'search');
    });
    first.unmount();

    // When the game is mounted again
    const second = renderHook(() => useGame());

    // Then the secret door is still open in the view
    expect(second.result.current.state.flags.secret_door_open).toBe(true);
    expect(second.result.current.view.map((o) => o.id)).toContain(SECRET_DOOR);
  });

  it('starts a fresh game when the saved payload is corrupt', () => {
    // Given the saved payload is corrupt JSON
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('{bad');

    // When the game is mounted
    const { result } = renderHook(() => useGame());

    // Then the state is fresh: the secret door flag is not set and the secret door is hidden
    expect(result.current.state.flags.secret_door_open).toBeUndefined();
    expect(result.current.state.activeDialogue).toBe('intro');
    expect(result.current.view.map((o) => o.id)).not.toContain(SECRET_DOOR);
  });
});
