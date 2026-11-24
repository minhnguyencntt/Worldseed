import { beforeEach, describe, expect, it } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { scene, world } from '../src/runtime/content';

describe('gameStore focus', () => {
  beforeEach(() => {
    useGameStore.setState({ state: null, focusedObjectId: null });
  });

  it('focusedObjectId defaults to null', () => {
    expect(useGameStore.getState().focusedObjectId).toBeNull();
  });

  it('init leaves focusedObjectId null', () => {
    useGameStore.getState().init(createInitialState(world, scene));

    expect(useGameStore.getState().focusedObjectId).toBeNull();
  });
});
