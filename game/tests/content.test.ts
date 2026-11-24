import { describe, it, expect } from 'vitest';
import { resolve } from 'node:path';
// Loader/validator location is not implemented yet in the worktree; this import is the planned module.
import { loadWorld, validateWorld } from '../src/content/loader';
import { performAction } from '../src/engine/scene';
import type { GameState } from '../src/state/types';

const WORLD_DIR = resolve(__dirname, '../src/content/worlds/the-boys-room');

function makeInitialState(): GameState {
  return {
    currentScene: 'bedroom',
    inventory: [],
    discoveredObjects: [],
    completedQuests: [],
    relationships: {},
    flags: {},
    history: [],
    activeDialogue: null,
  };
}

describe('bedroom content validity', () => {
  it('content has no reference errors', () => {
    // Given the real the-boys-room content files
    const world = loadWorld(WORLD_DIR);
    // When the content is validated
    const errors = validateWorld(world);
    // Then no reference errors are reported
    expect(errors).toEqual([]);
  });

  it('opening dialogue text', () => {
    // Given the real bedroom scene loaded from the content files
    const world = loadWorld(WORLD_DIR);
    const scene = world.scenes.find((s) => s.id === 'bedroom');
    expect(scene).toBeDefined();
    // When the opening dialogue node is looked up by its id
    const intro = scene!.dialogue.find((node) => node.id === scene!.openingDialogue);
    // Then its text and speaker match the intro line
    expect(intro?.text).toBe("I don't know what to do next. What should we do?");
    expect(intro?.speaker).toBe('boy');
  });

  it('every bedroom object has a layer and position', () => {
    // Given the real bedroom scene loaded from the content files
    const world = loadWorld(WORLD_DIR);
    const scene = world.scenes.find((s) => s.id === 'bedroom');
    expect(scene).toBeDefined();
    // Then the scene declares all fourteen objects from the re-laid-out bedroom.yaml
    expect(scene!.objects).toHaveLength(14);
    // And each object has a layer and a position
    for (const obj of scene!.objects) {
      expect(obj.layer).toBeTruthy();
      expect(obj.position).toBeDefined();
    }
  });

  it('has required objects', () => {
    // Given the real bedroom scene loaded from the content files
    const world = loadWorld(WORLD_DIR);
    const scene = world.scenes.find((s) => s.id === 'bedroom');
    expect(scene).toBeDefined();
    // When the object ids are collected
    const ids = scene!.objects.map((obj) => obj.id);
    // Then every required object is present
    for (const required of ['bed', 'bookshelf', 'desk', 'old-computer', 'window', 'door']) {
      expect(ids).toContain(required);
    }
  });

  it('bookshelf search sets flag', () => {
    // Given the real bedroom scene and an initial game state
    const world = loadWorld(WORLD_DIR);
    const scene = world.scenes.find((s) => s.id === 'bedroom');
    expect(scene).toBeDefined();
    // When the player searches the bookshelf
    const next = performAction(makeInitialState(), scene!, 'bookshelf', 'search');
    // Then the secret_door_open flag is set
    expect(next.flags.secret_door_open).toBe(true);
  });
});
