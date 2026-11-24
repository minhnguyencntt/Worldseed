import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { serializeState, deserializeState } from '../src/state/persistence';
import { createInitialState } from '../src/state/gameState';
import { getSceneView, performAction } from '../src/engine/scene';
import type { GameState, SceneDef, WorldDef } from '../src/state/types';

// The loader in src does not exist yet, so the test reads the real the-boys-room
// content from disk and parses it with the same `yaml` package the project depends on.
const worldDir = fileURLToPath(new URL('../content/worlds/the-boys-room/', import.meta.url));

function loadWorldFromDisk(): { world: WorldDef; scene: SceneDef } {
  const world = parse(readFileSync(`${worldDir}world.yaml`, 'utf8')) as WorldDef;
  const scene = parse(readFileSync(`${worldDir}scenes/bedroom.yaml`, 'utf8')) as SceneDef;
  return { world, scene };
}

describe('state persistence: round trip and invalid input', () => {
  it('round trip equals original', () => {
    // Given a state with flag "a" set and a key in the inventory
    const original: GameState = {
      currentScene: 'bedroom',
      inventory: ['key'],
      discoveredObjects: [],
      completedQuests: [],
      history: [],
      flags: { a: true },
      relationships: {},
      activeDialogue: null,
    } as unknown as GameState;

    // When it is serialized and deserialized again
    const restored = deserializeState(serializeState(original));

    // Then the restored state equals the original
    expect(restored).toEqual(original);
  });

  it('invalid input throws', () => {
    // Given JSON that is an object without a valid game state shape
    // Then deserializing it throws
    expect(() => deserializeState('{}')).toThrow();
    // And given text that is not JSON at all, deserializing throws
    expect(() => deserializeState('not json')).toThrow();
  });
});

describe('state persistence: bookshelf secret door', () => {
  it('secret door stays open after restore', () => {
    // Given the real the-boys-room content and a fresh game state
    const { world, scene } = loadWorldFromDisk();
    const initial = createInitialState(world, scene);

    // When the bookshelf is searched, which opens the secret door
    const searched = performAction(initial, scene, 'bookshelf', 'search');

    // And the state is saved and restored
    const restored = deserializeState(serializeState(searched));

    // Then the bookshelf is still open after restore
    const bookshelf = getSceneView(restored, scene).find((o) => o.id === 'bookshelf');
    expect(bookshelf?.open).toBe(true);
  });
});
