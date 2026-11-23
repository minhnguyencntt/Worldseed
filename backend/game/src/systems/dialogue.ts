import { addHistory } from '../state/gameState';
import type { DialogueNode, GameState, SceneDef } from '../state/types';
import { applyEvents } from './events';

export function getActiveNode(state: GameState, scene: SceneDef): DialogueNode | undefined {
  if (state.activeDialogue === null) {
    return undefined;
  }
  return scene.dialogue.find((node) => node.id === state.activeDialogue);
}

export function chooseOption(state: GameState, scene: SceneDef, index: number): GameState {
  const node = getActiveNode(state, scene);
  if (!node) {
    return state;
  }
  const choice = node.choices[index];
  if (!choice) {
    return state;
  }
  const afterEvents = applyEvents(state, choice.events ?? []);
  return {
    ...addHistory(afterEvents, choice.text),
    activeDialogue: choice.next ?? null,
  };
}
