import { moveFocus } from '@game/engine/buildScene';
import type { SceneObject } from '@game/entities/SceneObject';
import { useGameStore } from '../store/gameStore';
import { phaserToReact } from './events';
import { handleMenuKey } from './menuKeys';

export interface InputKeyboard {
  on(event: 'keydown', fn: (e: KeyboardEvent) => void): unknown;
  off(event: 'keydown', fn: (e: KeyboardEvent) => void): unknown;
}

export interface InputPlugin {
  keyboard?: InputKeyboard | null;
}

export interface PointerTarget {
  on(e: 'pointerdown', fn: () => void): unknown;
  off(e: 'pointerdown', fn: () => void): unknown;
}

export interface InputLayer {
  moveFocus(delta: 1 | -1): string | null;
  focusObject(id: string | null): void;
  focusedId(): string | null;
  bindCharacter(target: PointerTarget, id: string, onDown?: () => void): void;
  destroy(): void;
}

export function createInputLayer(input: InputPlugin, objects: SceneObject[]): InputLayer {
  const focusedId = (): string | null => objects.find((o) => o.isFocused)?.spec.id ?? null;

  // Publishes the current focus to the React store and the event bridge, then returns it.
  const report = (): string | null => {
    const id = focusedId();
    useGameStore.getState().setFocusedObject(id);
    phaserToReact.emit('focusChange', { id });
    return id;
  };

  // Moves focus one step, then publishes the result.
  const step = (delta: 1 | -1): string | null => {
    moveFocus(objects, delta);
    return report();
  };

  let active = true;
  const releasers: Array<() => void> = [];
  for (const o of objects) {
    o.onInteract((e) => {
      if (active) phaserToReact.emit('objectClick', { id: e.objectId });
    });
    o.onHoverChange((e) => {
      if (active) phaserToReact.emit('objectHover', { id: e.over ? e.objectId : null });
    });
  }

  // Keyboard navigation: Tab and arrows move focus, Enter and Space activate the focused
  // object, Escape asks the React side to close its menu.
  const onKeyDown = (e: KeyboardEvent): void => {
    if (!active) return;
    switch (e.key) {
      case 'Tab':
        e.preventDefault();
        step(e.shiftKey ? -1 : 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        step(-1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        step(1);
        break;
      case 'Enter':
      case ' ':
        for (const o of objects) o.handleKey(e.key);
        break;
      case 'Escape':
        handleMenuKey(e.key);
        break;
    }
  };

  const keyboard = input.keyboard ?? null;
  keyboard?.on('keydown', onKeyDown);

  return {
    moveFocus(delta: 1 | -1): string | null {
      return step(delta);
    },
    focusObject(id: string | null): void {
      objects.forEach((o) => {
        if (id !== null && o.spec.id === id) o.focus();
        else o.blur();
      });
      report();
    },
    focusedId,
    bindCharacter(target: PointerTarget, id: string, onDown?: () => void): void {
      const fn = (): void => {
        if (!active) return;
        phaserToReact.emit('characterClick', { id });
        onDown?.();
      };
      target.on('pointerdown', fn);
      releasers.push(() => target.off('pointerdown', fn));
    },
    destroy(): void {
      if (!active) return;
      active = false;
      keyboard?.off('keydown', onKeyDown);
      releasers.splice(0).forEach((release) => release());
    },
  };
}
