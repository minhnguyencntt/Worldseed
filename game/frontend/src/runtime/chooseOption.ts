import { runStep } from '@game/systems/runner';
import { useGameStore } from '../store/gameStore';
import { scene } from './content';

export function chooseOption(index: number): void {
  useGameStore.getState().setState((prev) => runStep({ scene }, prev, { type: 'choose', index }).state);
}
