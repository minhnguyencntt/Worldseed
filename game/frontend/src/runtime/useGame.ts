import { useState } from 'react';
import { getSceneView, type SceneObjectView } from '@game/engine/scene';
import type { GameEvent, GameState, SceneDef } from '@game/state/types';
import { useGameStore } from '../store/gameStore';
import { scene } from './content';
import { chooseOption } from './chooseOption';
import { performObjectAction } from './objectActions';

export type UseGame = {
  state: GameState;
  scene: SceneDef;
  view: SceneObjectView[];
  act: (objectId: string, actionId: string) => GameEvent[];
  choose: (index: number) => void;
};

export function useGame(): UseGame {
  // Rehydrate once per mount. A plain init() would keep a stale in-memory state from an earlier
  // mount in the same page session, so a mount with no valid save would not start fresh.
  useState(() => {
    useGameStore.getState().hydrate();
  });
  const state = useGameStore((s) => s.state);
  if (state === null) throw new Error('GameState not hydrated');

  return {
    state,
    scene,
    view: getSceneView(state, scene),
    act: (objectId, actionId) => performObjectAction(objectId, actionId),
    choose: chooseOption,
  };
}
