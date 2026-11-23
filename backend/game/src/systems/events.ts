import { addHistory, setFlag } from '../state/gameState';
import type { GameEvent, GameState } from '../state/types';
import { addItem, removeItem } from './inventory';

export function applyEvent(state: GameState, event: GameEvent): GameState {
  switch (event.type) {
    case 'set_flag':
      return setFlag(state, event.flag, event.value);
    case 'add_item':
      return addItem(state, event.item);
    case 'remove_item':
      return removeItem(state, event.item);
    case 'goto_scene':
      return addHistory(
        { ...state, currentScene: event.scene, activeDialogue: null },
        `Went to ${event.scene}`,
      );
    case 'say':
      return addHistory(state, `${event.character}: ${event.text}`);
    case 'show_text':
      return addHistory(state, event.text);
    case 'discover':
      if (state.discoveredObjects.includes(event.object)) {
        return state;
      }
      return { ...state, discoveredObjects: [...state.discoveredObjects, event.object] };
  }
}

export function applyEvents(state: GameState, events: GameEvent[]): GameState {
  return events.reduce(applyEvent, state);
}
