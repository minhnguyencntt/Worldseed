import { useState } from 'react';
import { getSceneView, type SceneObjectView } from '@game/engine/scene';
import { runStep } from '@game/systems/runner';
import type { GameEvent, GameState, SceneDef } from '@game/state/types';
import { useGameStore } from '../store/gameStore';
import { scene } from './content';

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
    act: (objectId, actionId) => {
      let events: GameEvent[] = [];
      useGameStore.getState().setState((prev) => {
        const r = runStep({ scene }, prev, { type: 'action', objectId, actionId });
        events = r.events;
        return r.state;
      });
      return events;
    },
    choose: (index) =>
      useGameStore.getState().setState((prev) => runStep({ scene }, prev, { type: 'choose', index }).state),
  };
}
