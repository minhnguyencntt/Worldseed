import { moveFocus } from '@game/engine/buildScene';
import type { SceneObject } from '@game/entities/SceneObject';
import { useGameStore } from '../store/gameStore';
import { phaserToReact } from './events';

export interface InputKeyboard {
  on(event: 'keydown', fn: (e: KeyboardEvent) => void): unknown;
  off(event: 'keydown', fn: (e: KeyboardEvent) => void): unknown;
}

export interface InputPlugin {
  keyboard?: InputKeyboard | null;
}

export interface InputLayer {
  moveFocus(delta: 1 | -1): string | null;
  focusObject(id: string | null): void;
  focusedId(): string | null;
  destroy(): void;
}

export function createInputLayer(input: InputPlugin, objects: SceneObject[]): InputLayer {
  void input;

  const focusedId = (): string | null => objects.find((o) => o.isFocused)?.spec.id ?? null;

  // Publishes the current focus to the React store and the event bridge, then returns it.
  const report = (): string | null => {
    const id = focusedId();
    useGameStore.getState().setFocusedObject(id);
    phaserToReact.emit('focusChange', { id });
    return id;
  };

  return {
    moveFocus(delta: 1 | -1): string | null {
      moveFocus(objects, delta);
      return report();
    },
    focusObject(id: string | null): void {
      objects.forEach((o) => {
        if (id !== null && o.spec.id === id) o.focus();
        else o.blur();
      });
      report();
    },
    focusedId,
    destroy(): void {
      // Stub: no listeners are registered yet.
    },
  };
}
