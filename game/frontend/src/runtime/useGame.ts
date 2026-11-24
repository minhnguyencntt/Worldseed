import { useState } from 'react';
import { getSceneView, performAction, type SceneObjectView } from '@game/engine/scene';
import type { GameState, SceneDef } from '@game/state/types';
import { chooseOption } from '@game/systems/dialogue';
import { useGameStore } from '../store/gameStore';
import { scene } from './content';

export type UseGame = {
  state: GameState;
  scene: SceneDef;
  view: SceneObjectView[];
  act: (objectId: string, actionId: string) => void;
  choose: (index: number) => void;
};

export function useGame(): UseGame {
  // Rehydrate once per mount. A plain init() would keep a stale in-memory state from an earlier
  // mount in the same page session, so a mount with no valid save would not start fresh.
  useState(() => {
    useGameStore.setState({ state: readSaved() ?? createInitialState(world, scene) });
  });
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
