import { useEffect } from 'react';
import { getSceneView, performAction, type SceneObjectView } from '@game/engine/scene';
import { createInitialState } from '@game/state/gameState';
import type { GameState, SceneDef } from '@game/state/types';
import { chooseOption } from '@game/systems/dialogue';
import { useGameStore } from '../store/gameStore';
import { scene, world } from './content';
import { readSaved, writeSaved } from './storage';

export type UseGame = {
  state: GameState;
  scene: SceneDef;
  view: SceneObjectView[];
  act: (objectId: string, actionId: string) => void;
  choose: (index: number) => void;
};

export function useGame(): UseGame {
  // init is a no-op once the store holds a state; the null guard avoids re-reading storage each render.
  if (useGameStore.getState().state === null) {
    useGameStore.getState().init(readSaved() ?? createInitialState(world, scene));
  }
  const state = useGameStore((s) => s.state) as GameState;

  useEffect(() => {
    writeSaved(state);
  }, [state]);

  return {
    state,
    scene,
    view: getSceneView(state, scene),
    act: (objectId, actionId) =>
      useGameStore
        .getState()
        .setState((prev) => performAction(prev, scene, objectId, actionId)),
    choose: (index) =>
      useGameStore.getState().setState((prev) => chooseOption(prev, scene, index)),
  };
}
