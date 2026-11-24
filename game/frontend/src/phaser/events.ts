// Typed, dependency-free event bus connecting the Phaser runtime and the React UI.

export type Unsubscribe = () => void;
export type EmptyPayload = Record<string, never>;

export interface PhaserToReactEvents {
  objectHover: { id: string | null };
  objectClick: { id: string };
  characterClick: { id: string };
  sceneReady: { sceneId: string };
  focusChange: { id: string | null };
  menuClose: EmptyPayload;
}

export interface ReactToPhaserEvents {
  highlightObject: { id: string | null };
  playAnimation: { target: string; name: string };
  transitionTo: { sceneId: string };
}

export type EventBus<T extends object> = {
  on<K extends keyof T>(event: K, handler: (payload: T[K]) => void): Unsubscribe;
  off<K extends keyof T>(event: K, handler: (payload: T[K]) => void): void;
  emit<K extends keyof T>(event: K, payload: T[K]): void;
  clear(): void;
};

/** Handlers run in subscription order on a snapshot; off() of an unknown handler is a no-op; clear() drops all handlers. */
export function createEventBus<T extends object>(): EventBus<T> {
  const handlers = new Map<keyof T, Set<(payload: unknown) => void>>();
  // Cached dispatch snapshot per event; rebuilt lazily after on()/off() change the Set.
  const snapshots = new Map<keyof T, Array<(payload: unknown) => void>>();

  const on: EventBus<T>["on"] = (event, handler) => {
    let set = handlers.get(event);
    if (!set) {
      set = new Set();
      handlers.set(event, set);
    }
    const stored = handler as (payload: unknown) => void;
    set.add(stored);
    snapshots.delete(event);
    return () => off(event, handler);
  };

  const off: EventBus<T>["off"] = (event, handler) => {
    handlers.get(event)?.delete(handler as (payload: unknown) => void);
    snapshots.delete(event);
  };

  const emit: EventBus<T>["emit"] = (event, payload) => {
    const set = handlers.get(event);
    if (!set) return;
    // Snapshot so handlers that subscribe/unsubscribe during emit don't affect this dispatch.
    // A snapshot replaced by on()/off() is a new array, so an in-flight dispatch keeps its own.
    let list = snapshots.get(event);
    if (!list) {
      list = Array.from(set);
      snapshots.set(event, list);
    }
    for (let i = 0; i < list.length; i++) {
      list[i](payload);
    }
  };

  const clear = () => {
    handlers.clear();
    snapshots.clear();
  };

  return { on, off, emit, clear };
}

export const phaserToReact = createEventBus<PhaserToReactEvents>();
export const reactToPhaser = createEventBus<ReactToPhaserEvents>();
