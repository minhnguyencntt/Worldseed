import type { DialogueNode, GameState, SceneDef } from '../state/types';

export function getActiveNode(state: GameState, scene: SceneDef): DialogueNode | undefined {
  if (state.activeDialogue === null) {
    return undefined;
  }
  return scene.dialogue.find((node) => node.id === state.activeDialogue);
}
