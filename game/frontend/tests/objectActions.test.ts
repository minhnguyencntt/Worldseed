import { describe, expect, it } from 'vitest';
import { performAction } from '@game/engine/scene';
import { createInitialState } from '@game/state/gameState';
import type { GameState } from '@game/state/types';
import { scene, world } from '../src/runtime/content';

// Uses the real bedroom scene bundled from game/src/content so the tests
// exercise the authored object actions, not hand-built fixtures.
function freshState(): GameState {
  return createInitialState(world, scene);
}

describe('contextual actions', () => {
  it('bed search adds old-key to the inventory', () => {
    const next = performAction(freshState(), scene, 'bed', 'search');

    expect(next.inventory).toEqual(['old-key']);
  });

  it('repeating bed search keeps a single old-key in the inventory', () => {
    const once = performAction(freshState(), scene, 'bed', 'search');
    const twice = performAction(once, scene, 'bed', 'search');

    expect(twice.inventory).toEqual(['old-key']);
  });

  it('old computer search sets the computer_on flag to true', () => {
    const next = performAction(freshState(), scene, 'old-computer', 'search');

    expect(next.flags.computer_on).toBe(true);
  });

  it('window inspect sets the window_seen flag to true', () => {
    const next = performAction(freshState(), scene, 'window', 'inspect');

    expect(next.flags.window_seen).toBe(true);
  });

  it('bookshelf search sets the secret_door_open flag to true', () => {
    const next = performAction(freshState(), scene, 'bookshelf', 'search');

    expect(next.flags.secret_door_open).toBe(true);
  });

  it('door leave on a fresh state returns the identical state object', () => {
    const state = freshState();

    const next = performAction(state, scene, 'door', 'leave');

    expect(next).toBe(state);
  });

  it('door leave sets door_unlocked after the bed has been searched for the key', () => {
    const withKey = performAction(freshState(), scene, 'bed', 'search');

    const next = performAction(withKey, scene, 'door', 'leave');

    expect(next.flags.door_unlocked).toBe(true);
  });
});
