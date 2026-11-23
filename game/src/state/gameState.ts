import type { GameState, SceneDef, WorldDef } from './types';

export function createInitialState(world: WorldDef, scene: SceneDef): GameState {
  return {
    currentScene: world.startScene,
    inventory: [],
    discoveredObjects: [],
    completedQuests: [],
    relationships: {},
    flags: {},
    history: [],
    activeDialogue: scene.openingDialogue ?? null,
  };
}

export function setFlag(state: GameState, flag: string, value: boolean): GameState {
  return { ...state, flags: { ...state.flags, [flag]: value } };
}

export function addHistory(state: GameState, line: string): GameState {
  return { ...state, history: [...state.history, line] };
}
