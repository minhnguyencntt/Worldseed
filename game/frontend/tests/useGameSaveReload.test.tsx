// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGame } from '../src/runtime/useGame';
import { STORAGE_KEY } from '../src/runtime/storage';
import { scene, world } from '../src/runtime/content';

// jsdom's localStorage is the only external dependency; tests/setup.ts clears it after each test.
function savedEnvelope(): { version: number; state: Record<string, unknown> } | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw === null ? null : JSON.parse(raw);
}

describe('useGame save and reload', () => {
  it('Given a played action, when the hook is saved, then the storage key holds a versioned envelope with the new state', () => {
    // Given a fresh game
    const { result } = renderHook(() => useGame());

    // When the player searches the bookshelf through useGame
    act(() => {
      result.current.act('bookshelf', 'search');
    });

    // Then the store-owned save is written under the storage key with version 1 and the updated flag
    const envelope = savedEnvelope();
    expect(envelope?.version).toBe(1);
    expect((envelope?.state.flags as Record<string, boolean>).secret_door_open).toBe(true);
  });

  it('Given a played action, when the game is reloaded, then useGame restores the same state it saved', () => {
    // Given a game where the bookshelf was searched and the page is then closed
    const first = renderHook(() => useGame());
    act(() => {
      first.result.current.act('bookshelf', 'search');
    });
    const savedState = first.result.current.state;
    first.unmount();

    // When a new mount reloads the game
    const reloaded = renderHook(() => useGame());

    // Then the restored state equals the state that was saved before reload
    expect(reloaded.result.current.state).toEqual(savedState);
    expect(reloaded.result.current.state.flags.secret_door_open).toBe(true);
  });

  it('Given a fresh game, when useGame mounts, then the initial state is persisted and each later action keeps the stored state in step with memory', () => {
    // Given a fresh game with nothing saved yet
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    const { result } = renderHook(() => useGame());

    // Then the initial state is persisted on mount
    expect(savedEnvelope()?.state.currentScene).toBe(createInitialState(world, scene).currentScene);

    // When an action is applied
    act(() => {
      result.current.act('bookshelf', 'search');
    });

    // Then the stored state matches the in-memory state
    expect(savedEnvelope()?.state).toEqual(JSON.parse(JSON.stringify(result.current.state)));
  });
});

describe('useGame corrupt save fallback', () => {
  it('Given a corrupt save, when useGame mounts, then it starts a fresh game in the intro dialogue', () => {
    // Given the saved payload is not valid JSON
    localStorage.setItem(STORAGE_KEY, '{bad');

    // When useGame mounts
    const { result } = renderHook(() => useGame());

    // Then the fresh initial state is used
    expect(result.current.state.activeDialogue).toBe('intro');
    expect(result.current.state.flags.secret_door_open).toBeFalsy();
  });

  it('Given a save with an unsupported version, when useGame mounts, then it starts a fresh game', () => {
    // Given a save stamped with a version this build cannot read
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 99, state: { currentScene: 'bedroom' } }),
    );

    // When useGame mounts
    const { result } = renderHook(() => useGame());

    // Then the game starts fresh rather than loading the foreign state
    expect(result.current.state.currentScene).toBe(createInitialState(world, scene).currentScene);
    expect(result.current.state.activeDialogue).toBe('intro');
  });

  it('Given a corrupt save, when the player acts, then the corrupt payload is overwritten by a valid save', () => {
    // Given a corrupt save and a mounted game that started fresh
    localStorage.setItem(STORAGE_KEY, '{bad');
    const { result } = renderHook(() => useGame());

    // When the player searches the bookshelf
    act(() => {
      result.current.act('bookshelf', 'search');
    });

    // Then the storage holds a valid versioned save with the new flag
    const envelope = savedEnvelope();
    expect(envelope?.version).toBe(1);
    expect((envelope?.state.flags as Record<string, boolean>).secret_door_open).toBe(true);
  });
});
