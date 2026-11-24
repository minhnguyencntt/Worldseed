import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { runStep } from '@game/systems/runner';
import { createInitialState } from '@game/state/gameState';
import type { GameState } from '@game/state/types';
import { reactToPhaser, type ReactToPhaserEvents } from '../src/phaser/events';
import { scene, world } from '../src/runtime/content';
import { performObjectAction } from '../src/runtime/objectActions';
import { useGameStore } from '../src/store/gameStore';

// Uses the real bedroom scene bundled from game/src/content so the tests
// exercise the authored object actions, not hand-built fixtures.
function freshState(): GameState {
  return createInitialState(world, scene);
}

// The engine applies object actions through runStep; performAction no longer exists.
function act(state: GameState, objectId: string, actionId: string): GameState {
  return runStep({ scene }, state, { type: 'action', objectId, actionId }).state;
}

describe('contextual actions', () => {
  it('bed search adds old-key to the inventory', () => {
    const next = act(freshState(), 'bed', 'search');

    expect(next.inventory).toEqual(['old-key']);
  });

  it('repeating bed search keeps a single old-key in the inventory', () => {
    const once = act(freshState(), 'bed', 'search');
    const twice = act(once, 'bed', 'search');

    expect(twice.inventory).toEqual(['old-key']);
  });

  it('old computer search sets the computer_on flag to true', () => {
    const next = act(freshState(), 'old-computer', 'search');

    expect(next.flags.computer_on).toBe(true);
  });

  it('window inspect sets the window_seen flag to true', () => {
    const next = act(freshState(), 'window', 'inspect');

    expect(next.flags.window_seen).toBe(true);
  });

  it('bookshelf search sets the secret_door_open flag to true', () => {
    const next = act(freshState(), 'bookshelf', 'search');

    expect(next.flags.secret_door_open).toBe(true);
  });

  it('door leave on a fresh state returns the identical state object', () => {
    const state = freshState();

    const next = act(state, 'door', 'leave');

    expect(next).toBe(state);
  });

  it('door leave sets door_unlocked after the bed has been searched for the key', () => {
    const withKey = act(freshState(), 'bed', 'search');

    const next = act(withKey, 'door', 'leave');

    expect(next.flags.door_unlocked).toBe(true);
  });
});

// The bundled bedroom door has no goto_scene event, and no content authors one yet. The bridge test
// therefore appends a goto_scene to the door's leave action in the bundled scene; everything else is real.
vi.mock('../src/runtime/content', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/runtime/content')>();
  const scene = {
    ...actual.scene,
    objects: actual.scene.objects.map((o) =>
      o.id !== 'door'
        ? o
        : {
            ...o,
            actions: o.actions.map((a) =>
              a.id !== 'leave'
                ? a
                : { ...a, events: [...a.events, { type: 'goto_scene' as const, scene: 'hallway' }] },
            ),
          },
    ),
  };
  return { ...actual, scene };
});

describe('performObjectAction emits bridge events', () => {
  const playAnimation: ReactToPhaserEvents['playAnimation'][] = [];
  const transitionTo: ReactToPhaserEvents['transitionTo'][] = [];
  const offs: Array<() => void> = [];

  beforeEach(() => {
    useGameStore.getState().hydrate();
    playAnimation.length = 0;
    transitionTo.length = 0;
    offs.push(reactToPhaser.on('playAnimation', (p) => playAnimation.push(p)));
    offs.push(reactToPhaser.on('transitionTo', (p) => transitionTo.push(p)));
  });

  afterEach(() => {
    while (offs.length) offs.pop()!();
  });

  it('a non-transition action returns its events, changes the store, plays the boy interact animation and emits no transitionTo', () => {
    const events = performObjectAction('bookshelf', 'search');

    expect(events.map((e) => e.type)).toEqual(['set_flag', 'show_text']);
    expect(useGameStore.getState().state?.flags.secret_door_open).toBe(true);
    expect(playAnimation).toEqual([{ target: 'boy', name: 'interact' }]);
    expect(transitionTo).toEqual([]);
  });

  it('a goto_scene action returns the goto_scene event, changes the store, plays the boy interact animation and emits transitionTo with the target scene', () => {
    performObjectAction('bed', 'search');
    playAnimation.length = 0;

    const events = performObjectAction('door', 'leave');

    expect(events.some((e) => e.type === 'goto_scene' && e.scene === 'hallway')).toBe(true);
    expect(useGameStore.getState().state?.flags.door_unlocked).toBe(true);
    expect(playAnimation).toEqual([{ target: 'boy', name: 'interact' }]);
    expect(transitionTo).toEqual([{ sceneId: 'hallway' }]);
  });
});
