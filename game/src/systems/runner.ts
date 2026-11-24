import { evaluateAll } from './conditions';
import { getActiveNode } from './dialogue';
import { applyEvents } from './events';
import { addHistory } from '../state/gameState';
import type { GameEvent, GameState, SceneDef } from '../state/types';

export type RunnerContent = { scene: SceneDef };

export type RunnerInput =
  | { type: 'action'; objectId: string; actionId: string }
  | { type: 'choose'; index: number };

export type RunnerResult = { state: GameState; events: GameEvent[] };

export function runStep(content: RunnerContent, state: GameState, input: RunnerInput): RunnerResult {
  if (input.type === 'action') {
    const obj = content.scene.objects.find((o) => o.id === input.objectId);
    if (!obj) {
      return { state, events: [] };
    }
    const action = obj.actions.find((a) => a.id === input.actionId);
    if (!action || !evaluateAll(state, action.conditions)) {
      return { state, events: [] };
    }
    return { state: applyEvents(state, action.events), events: action.events };
  }
  const node = getActiveNode(state, content.scene);
  const choice = node?.choices[input.index];
  if (!node || !choice) {
    return { state, events: [] };
  }
  const events = choice.events ?? [];
  return {
    state: { ...addHistory(applyEvents(state, events), choice.text), activeDialogue: choice.next ?? null },
    events,
  };
}
