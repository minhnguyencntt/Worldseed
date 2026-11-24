import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { ObjectSpec } from '../src/content/schema';
import { createInitialState, setFlag } from '../src/state/gameState';
import {
  availableActions,
  isActivationKey,
  nextFocusIndex,
  pointInBounds,
} from '../src/systems/interaction';
import { validWorld, validScene } from './fixtures/valid-world';

describe('pointInBounds', () => {
  const spec: ObjectSpec = {
    id: 'door',
    name: 'Door',
    description: 'A closed door.',
    asset: 'objects/door.svg',
    position: { x: 100, y: 200 },
    scale: 2,
    layer: 'objects',
    interactionBounds: { x: 0, y: 0, width: 40, height: 80 },
    actions: [],
  };

  it('returns true for a point inside the scaled bounds', () => {
    expect(pointInBounds(spec, 110, 210)).toBe(true);
  });

  it('excludes the right edge of the scaled bounds', () => {
    // Scaled bounds span x in [100, 180); x = 190 is outside.
    expect(pointInBounds(spec, 190, 210)).toBe(false);
  });

  it('returns false for a point left of the scaled bounds', () => {
    expect(pointInBounds(spec, 99, 210)).toBe(false);
  });

  it('returns false when the object has no interaction bounds', () => {
    const noBounds: ObjectSpec = { ...spec, interactionBounds: undefined };
    expect(pointInBounds(noBounds, 110, 210)).toBe(false);
  });
});

describe('availableActions', () => {
  // Built from the valid-world fixture object, extended to the ObjectSpec shape.
  const fixtureObject = validScene.objects[0];
  const guardedInspect = {
    id: 'inspect' as const,
    label: 'Inspect',
    conditions: [{ flag: 'a' }],
    events: [{ type: 'say', character: 'boy', text: 'Looks shut.' }],
  };
  const spec: ObjectSpec = {
    id: fixtureObject.id,
    name: fixtureObject.name,
    description: fixtureObject.description,
    asset: 'objects/door.svg',
    position: { x: 0, y: 0 },
    scale: 1,
    layer: 'objects',
    // Guarded action is authored first so the ordering assertion is meaningful.
    actions: [guardedInspect, fixtureObject.actions[0]],
  };

  it('omits actions whose conditions fail, keeping only the unguarded action', () => {
    const state = createInitialState(validWorld, validScene);
    expect(availableActions(state, spec).map((a) => a.id)).toEqual(['leave']);
  });

  it('includes the guarded action once its flag is set, in authored order', () => {
    const state = setFlag(createInitialState(validWorld, validScene), 'a', true);
    expect(availableActions(state, spec).map((a) => a.id)).toEqual(['inspect', 'leave']);
  });
});

describe('isActivationKey and nextFocusIndex', () => {
  it('treats Enter and Space as activation keys', () => {
    expect(isActivationKey('Enter')).toBe(true);
    expect(isActivationKey(' ')).toBe(true);
  });

  it('does not treat other keys as activation keys', () => {
    expect(isActivationKey('a')).toBe(false);
  });

  it('advances focus forward and wraps to the start', () => {
    expect(nextFocusIndex(3, 2, 1)).toBe(0);
  });

  it('moves focus backward and wraps to the end', () => {
    expect(nextFocusIndex(3, 0, -1)).toBe(2);
  });

  it('returns -1 when there is nothing to focus', () => {
    expect(nextFocusIndex(0, 0, 1)).toBe(-1);
  });
});

describe('SceneObject uses shared helper', () => {
  const source = readFileSync(
    fileURLToPath(new URL('../src/entities/SceneObject.ts', import.meta.url)),
    'utf8',
  );

  it('does not define its own availableActions function', () => {
    expect(source).not.toMatch(/function availableActions/);
  });

  it('imports availableActions from the shared interaction system', () => {
    expect(source).toMatch(/import\s*\{[^}]*\bavailableActions\b[^}]*\}\s*from\s*'\.\.\/systems\/interaction'/);
  });
});
