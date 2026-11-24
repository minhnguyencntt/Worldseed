import { describe, it, expect } from 'vitest';
import { getSceneView } from '../src/engine/scene';
import { validateWorld } from '../src/content/loader';
import { createInitialState, setFlag } from '../src/state/gameState';
import type { SceneDef, ObjectDef } from '../src/state/types';
import { validScene, validWorld } from './fixtures/valid-world';

// In-memory state only: no app, server, database or browser is started.
const baseObject: ObjectDef = validScene.objects[0];

function sceneWith(object: ObjectDef): SceneDef {
  return { ...validScene, objects: [object] };
}

describe('getSceneView and validateWorld', () => {
  it('hides an object whose visibleWhen flag is unset and shows it once the flag is true', () => {
    // Given a scene object gated by visibleWhen on flag "a" and a state with flags {}
    const scene = sceneWith({ ...baseObject, id: 'gated', visibleWhen: [{ flag: 'a' }] });
    const initial = createInitialState(validWorld, validScene);
    expect(initial.flags).toEqual({});

    // When the scene view is computed with flags {}
    // Then the gated object is absent
    expect(getSceneView(initial, scene).map((o) => o.id)).not.toContain('gated');

    // When flag "a" is set to true and the scene view is recomputed
    const withFlag = setFlag(initial, 'a', true);
    // Then the gated object is present
    expect(getSceneView(withFlag, scene).map((o) => o.id)).toContain('gated');
  });

  it('reports open false before the persisted flag is set and true after it is set', () => {
    // Given a scene object with persistentState on flag "a" and a state with flags {}
    const scene = sceneWith({ ...baseObject, id: 'latch', persistentState: { flag: 'a' } });
    const initial = createInitialState(validWorld, validScene);

    // When the scene view is computed before the flag is set
    // Then the object reports open false
    expect(getSceneView(initial, scene).find((o) => o.id === 'latch')?.open).toBe(false);

    // When flag "a" is set and the scene view is recomputed
    const after = setFlag(initial, 'a', true);
    // Then the object reports open true
    expect(getSceneView(after, scene).find((o) => o.id === 'latch')?.open).toBe(true);
  });

  it('returns an unknown flag error when persistentState references a flag not declared by the world', () => {
    // Given a world whose only scene has an object with persistentState on undeclared flag "zzz"
    const scene = sceneWith({ ...baseObject, id: 'latch', persistentState: { flag: 'zzz' } });
    const world = { ...validWorld, scenes: [scene] };

    // When the world is validated
    const errors = validateWorld(world);

    // Then the errors include 'unknown flag: zzz'
    expect(errors).toContain('unknown flag: zzz');
  });
});
