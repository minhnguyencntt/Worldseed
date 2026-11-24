import { runStep } from '@game/systems/runner';
import type { GameEvent } from '@game/state/types';
import { reactToPhaser } from '../phaser/events';
import { useGameStore } from '../store/gameStore';
import { scene } from './content';

// Applies an object action to the game state, then tells the Phaser runtime what to show.
export function performObjectAction(objectId: string, actionId: string): GameEvent[] {
  let events: GameEvent[] = [];
  useGameStore.getState().setState((prev) => {
    const r = runStep({ scene }, prev, { type: 'action', objectId, actionId });
    events = r.events;
    return r.state;
  });
  reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' });
  const go = events.find((e) => e.type === 'goto_scene');
  if (go && go.type === 'goto_scene') reactToPhaser.emit('transitionTo', { sceneId: go.scene });
  return events;
}
