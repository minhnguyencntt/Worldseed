import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { runStep } from '../src/systems/runner';
import type { GameState, SceneDef } from '../src/state/types';
import { runnerScene as actionScene } from './fixtures/runner-world';

const runnerScene: SceneDef = {
  id: 'runner-scene',
  title: 'Runner scene',
  objects: [],
  openingDialogue: 'n1',
  dialogue: [
    {
      id: 'n1',
      speaker: 'Guard',
      text: 'Who goes there?',
      choices: [
        {
          text: 'Ask about the door',
          next: 'n2',
          events: [{ type: 'set_flag', flag: 'talked', value: true }],
        },
        { text: 'Walk away' },
      ],
    },
    {
      id: 'n2',
      speaker: 'Guard',
      text: 'The door is locked.',
      choices: [],
    },
  ],
};

const baseState: GameState = {
  currentScene: 'runner-scene',
  inventory: [],
  discoveredObjects: [],
  completedQuests: [],
  relationships: {},
  flags: {},
  history: [],
  activeDialogue: 'n1',
};

describe('runStep dialogue', () => {
  it('chooses option 0: sets the flag, records the choice text, and moves to n2', () => {
    const choiceEvents = runnerScene.dialogue[0].choices[0].events ?? [];
    const result = runStep({ scene: runnerScene }, baseState, { type: 'choose', index: 0 });

    expect(result.state.flags.talked).toBe(true);
    expect(result.state.history[result.state.history.length - 1]).toBe('Ask about the door');
    expect(result.state.activeDialogue).toBe('n2');
    expect(result.events).toEqual(choiceEvents);
  });

  it('chooses option 1 without a next node: activeDialogue becomes null', () => {
    const result = runStep({ scene: runnerScene }, baseState, { type: 'choose', index: 1 });

    expect(result.state.activeDialogue).toBeNull();
    expect(result.state.history).toEqual(['Walk away']);
    expect(result.events).toEqual([]);
  });

  it('returns the same state reference and no events for a missing node or an out-of-range index', () => {
    const noNode = { ...baseState, activeDialogue: null };
    const noNodeResult = runStep({ scene: runnerScene }, noNode, { type: 'choose', index: 0 });
    expect(noNodeResult.state).toBe(noNode);
    expect(noNodeResult.events).toEqual([]);

    const badIndex = runStep({ scene: runnerScene }, baseState, { type: 'choose', index: 5 });
    expect(badIndex.state).toBe(baseState);
    expect(badIndex.events).toEqual([]);
  });
});

function makeActionState(overrides: Partial<GameState> = {}): GameState {
  return {
    currentScene: 'study',
    inventory: [],
    discoveredObjects: [],
    completedQuests: [],
    relationships: {},
    flags: {},
    history: [],
    activeDialogue: null,
    ...overrides,
  };
}

function deepFreezeState<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value as object)) {
      deepFreezeState((value as Record<string, unknown>)[key]);
    }
  }
  return value;
}

describe('runStep actions', () => {
  it('applies the search action events: adds the key and sets the found flag', () => {
    const state = makeActionState();
    const action = actionScene.objects[0].actions.find((a) => a.id === 'search')!;

    const result = runStep({ scene: actionScene }, state, {
      type: 'action',
      objectId: 'drawer',
      actionId: 'search',
    });

    expect(result.state.inventory).toEqual(['key']);
    expect(result.state.flags.found).toBe(true);
    expect(result.events).toEqual(action.events);
  });

  it('returns the same state and no events when a gated push has no key', () => {
    const state = makeActionState();

    const result = runStep({ scene: actionScene }, state, {
      type: 'action',
      objectId: 'drawer',
      actionId: 'push',
    });

    expect(result.state).toBe(state);
    expect(result.events).toEqual([]);
  });

  it('returns the same state and no events for an unknown objectId', () => {
    const state = makeActionState();

    const result = runStep({ scene: actionScene }, state, {
      type: 'action',
      objectId: 'window',
      actionId: 'search',
    });

    expect(result.state).toBe(state);
    expect(result.events).toEqual([]);
  });

  it('returns the same state and no events for an unknown actionId', () => {
    const state = makeActionState();

    const result = runStep({ scene: actionScene }, state, {
      type: 'action',
      objectId: 'drawer',
      actionId: 'inspect',
    });

    expect(result.state).toBe(state);
    expect(result.events).toEqual([]);
  });

  it('does not throw on a deep-frozen input state and leaves the input unchanged', () => {
    const state = deepFreezeState(makeActionState());
    const snapshot = structuredClone(state);

    expect(() =>
      runStep({ scene: actionScene }, state, { type: 'action', objectId: 'drawer', actionId: 'search' }),
    ).not.toThrow();
    expect(state).toEqual(snapshot);
  });
});

describe('runStep inventory', () => {
  // The fixture has no remove_item action, so extend the drawer with a "use" action that
  // consumes the key. The fixture itself stays unchanged for the other tests.
  const inventoryScene: SceneDef = {
    ...actionScene,
    objects: actionScene.objects.map((obj) =>
      obj.id === 'drawer'
        ? {
            ...obj,
            actions: [
              ...obj.actions,
              {
                id: 'use',
                label: 'Use',
                conditions: [{ hasItem: 'key' }],
                events: [{ type: 'remove_item', item: 'key' }],
              },
            ],
          }
        : obj,
    ),
  };

  it('picks up a key, unlocks the gated action, and empties the inventory after use', () => {
    const start = makeActionState();

    // Before pickup the gated action is unavailable.
    const gatedBefore = runStep({ scene: inventoryScene }, start, {
      type: 'action',
      objectId: 'drawer',
      actionId: 'push',
    });
    expect(gatedBefore.state).toBe(start);
    expect(gatedBefore.events).toEqual([]);

    const picked = runStep({ scene: inventoryScene }, start, {
      type: 'action',
      objectId: 'drawer',
      actionId: 'search',
    });
    expect(picked.state.inventory).toEqual(['key']);

    // After pickup the gated action runs.
    const gatedAfter = runStep({ scene: inventoryScene }, picked.state, {
      type: 'action',
      objectId: 'drawer',
      actionId: 'push',
    });
    expect(gatedAfter.events.length).toBeGreaterThan(0);

    const used = runStep({ scene: inventoryScene }, picked.state, {
      type: 'action',
      objectId: 'drawer',
      actionId: 'use',
    });
    expect(used.state.inventory).toEqual([]);
  });
});

describe('runner source', () => {
  const source = readFileSync(
    fileURLToPath(new URL('../src/systems/runner.ts', import.meta.url)),
    'utf8',
  );

  it('keeps runner.ts at 200 lines or fewer', () => {
    const lineCount = source.split('\n').length;
    expect(lineCount).toBeLessThanOrEqual(200);
  });

  it('imports no Phaser, React or frontend modules', () => {
    const specifiers = [...source.matchAll(/^\s*import\s[^'"]*['"]([^'"]+)['"]/gm)].map((m) => m[1]);
    expect(specifiers.length).toBeGreaterThan(0);
    for (const specifier of specifiers) {
      expect(specifier).not.toMatch(/phaser|react|frontend/);
    }
  });
});

describe('old direct paths removed', () => {
  const srcRoot = fileURLToPath(new URL('../src', import.meta.url));

  function listTsFiles(dir: string): string[] {
    return readdirSync(dir, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
      .map((entry) => join(entry.parentPath ?? entry.path, entry.name));
  }

  it('no source file under game/src still references performAction or chooseOption', () => {
    const files = listTsFiles(srcRoot);
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const text = readFileSync(file, 'utf8');
      expect(text, file).not.toContain('performAction');
      expect(text, file).not.toContain('chooseOption');
    }
  });
});
