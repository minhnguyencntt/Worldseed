import { useEffect, useState } from 'react';
import { getSceneView, performAction, type SceneObjectView } from '@game/engine/scene';
import { createInitialState } from '@game/state/gameState';
import type { GameState, SceneDef } from '@game/state/types';
import { chooseOption } from '@game/systems/dialogue';
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
  const [state, setState] = useState<GameState>(
    () => readSaved() ?? createInitialState(world, scene),
  );

  useEffect(() => {
    writeSaved(state);
  }, [state]);

  return {
    state,
    scene,
    view: getSceneView(state, scene),
    act: (objectId, actionId) =>
      setState((prev) => performAction(prev, scene, objectId, actionId)),
    choose: (index) => setState((prev) => chooseOption(prev, scene, index)),
  };
}
