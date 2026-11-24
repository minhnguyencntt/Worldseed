import { beforeEach, describe, expect, it } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { scene, world } from '../src/runtime/content';

describe('gameStore', () => {
  beforeEach(() => {
    useGameStore.setState({ state: null });
  });

  it('init seeds the state on the first call', () => {
    const first = createInitialState(world, scene);

    useGameStore.getState().init(first);

    expect(useGameStore.getState().state).toBe(first);
  });

  it('a second init does not overwrite the state already set', () => {
    const first = createInitialState(world, scene);
    const second = createInitialState(world, scene);
    useGameStore.getState().init(first);

    useGameStore.getState().init(second);

    expect(useGameStore.getState().state).toBe(first);
  });

  it('setState applies the updater to the current state', () => {
    const initial = createInitialState(world, scene);
    useGameStore.getState().init(initial);

    useGameStore.getState().setState((prev) => ({
      ...prev,
      activeDialogue: 'changed',
    }));

    const updated = useGameStore.getState().state;
    expect(updated).not.toBe(initial);
    expect(updated?.activeDialogue).toBe('changed');
  });

  it('setState is a no-op before init', () => {
    useGameStore.getState().setState((prev) => ({ ...prev, activeDialogue: 'changed' }));

    expect(useGameStore.getState().state).toBeNull();
  });
});
