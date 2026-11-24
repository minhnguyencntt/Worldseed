import { describe, it, expect } from 'vitest';
import { evaluateCondition } from '../src/systems/conditions';
import { addItem } from '../src/systems/inventory';
import { performAction } from '../src/engine/scene';
import { chooseOption } from '../src/systems/dialogue';
import type { GameState, SceneDef } from '../src/state/types';

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    currentScene: 'bedroom',
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

function deepFreeze<T>(value: T): T {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value as object)) {
      deepFreeze((value as Record<string, unknown>)[key]);
    }
  }
  return value;
}

describe('runtime systems: conditions and inventory', () => {
  it('evaluateCondition returns true when the flag is set and false when it is not', () => {
    // Given a state where flag "x" is true
    const trueState = makeState({ flags: { x: true } });
    // When the condition checks flag "x"
    // Then it evaluates to true
    expect(evaluateCondition(trueState, { flag: 'x' })).toBe(true);

    // Given a state where flag "x" is false
    const falseState = makeState({ flags: { x: false } });
    // Then the same condition evaluates to false
    expect(evaluateCondition(falseState, { flag: 'x' })).toBe(false);
  });

  it('addItem does not duplicate an item already in the inventory', () => {
    // Given an empty inventory
    let state = makeState();
    // When "key" is added twice
    state = addItem(state, 'key');
    state = addItem(state, 'key');
    // Then the inventory holds exactly one "key"
    expect(state.inventory).toHaveLength(1);
    expect(state.inventory).toEqual(['key']);
  });
});

describe('runtime systems: performAction', () => {
  const scene: SceneDef = {
    id: 'bedroom',
    title: 'Bedroom',
    objects: [
      {
        id: 'drawer',
        name: 'Drawer',
        description: 'A small wooden drawer.',
        actions: [
          {
            id: 'search',
            label: 'Search',
            events: [
              { type: 'set_flag', flag: 'x', value: true },
              { type: 'add_item', item: 'key' },
              { type: 'goto_scene', scene: 'hallway' },
            ],
          },
        ],
      },
    ],
    dialogue: [],
  };

  it('performAction applies set_flag, add_item and goto_scene events to a new state', () => {
    // Given a frozen initial state that must not be mutated
    const input = deepFreeze(makeState());
    const snapshot = structuredClone(input);

    // When the search action on the drawer is performed
    const next = performAction(input, scene, 'drawer', 'search');

    // Then the flag is set, the key is added and the scene changes
    expect(next.flags.x).toBe(true);
    expect(next.inventory).toEqual(['key']);
    expect(next.currentScene).toBe('hallway');
    // And the original state is unchanged
    expect(input).toEqual(snapshot);
  });

  it('performAction returns the same state object when the action condition fails', () => {
    // Given an action that requires the "key" item, and a state without it
    const gatedScene: SceneDef = {
      ...scene,
      objects: [
        {
          ...scene.objects[0],
          actions: [
            {
              id: 'search',
              label: 'Search',
              conditions: [{ hasItem: 'key' }],
              events: [{ type: 'set_flag', flag: 'x', value: true }],
            },
          ],
        },
      ],
    };
    const input = makeState();

    // When the gated action is performed
    const next = performAction(input, gatedScene, 'drawer', 'search');

    // Then the very same state object is returned (no-op)
    expect(next).toBe(input);
  });
});

describe('runtime systems: dialogue', () => {
  const scene: SceneDef = {
    id: 'bedroom',
    title: 'Bedroom',
    objects: [],
    openingDialogue: 'n1',
    dialogue: [
      {
        id: 'n1',
        speaker: 'Mom',
        text: 'Did you check the drawer?',
        choices: [
          {
            text: 'Open the drawer',
            next: 'n2',
            events: [{ type: 'set_flag', flag: 'x', value: true }],
          },
        ],
      },
      {
        id: 'n2',
        speaker: 'Mom',
        text: 'Good.',
        choices: [],
      },
    ],
  };

  it('chooseOption applies choice events, advances to the next node and records the choice', () => {
    // Given a state positioned at dialogue node n1
    const input = makeState({ activeDialogue: 'n1' });

    // When the first option (index 0) is chosen
    const next = chooseOption(input, scene, 0);

    // Then the event flag is set, dialogue advances to n2, and history holds the choice text
    expect(next.flags.x).toBe(true);
    expect(next.activeDialogue).toBe('n2');
    expect(next.history).toContain('Open the drawer');
  });

  it('chooseOption returns the same state object for an invalid option index', () => {
    // Given a state positioned at dialogue node n1
    const input = makeState({ activeDialogue: 'n1' });

    // When an out-of-range index is chosen
    const next = chooseOption(input, scene, 5);

    // Then the same state object is returned
    expect(next).toBe(input);
  });
});
