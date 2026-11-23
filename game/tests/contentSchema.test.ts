import { describe, it, expect } from 'vitest';
import { parseWorldContent } from '../src/content/schema';

// Builds a scene wrapping a single object so object-level rules run through parseWorldContent.
function sceneWith(object: Record<string, unknown>): Record<string, unknown> {
  return { id: 'scene-1', title: 'Study', dialogue: [], objects: [object] };
}

function validObject(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: 'bookshelf',
    name: 'Bookshelf',
    description: 'A tall shelf of old books',
    asset: 'objects/bookshelf.png',
    position: { x: 620, y: 350 },
    scale: 2,
    layer: 'furniture',
    interactionBounds: { x: 0, y: 0, width: 32, height: 64 },
    actions: [{ id: 'inspect', label: 'Look', events: [] }],
    visibleWhen: [{ flag: 'a' }],
    persistentState: { flag: 'a' },
    ...overrides,
  };
}

describe('objectSchema', () => {
  it('accepts a full valid furniture object inside a scene', () => {
    // Given a scene containing a fully specified furniture object
    const scene = sceneWith(validObject());
    // When the scene is validated as scene content
    const result = parseWorldContent('scene', scene);
    // Then validation succeeds
    expect(result.ok).toBe(true);
  });

  it('rejects an object whose layer is not a known render layer', () => {
    // Given an object with the unknown layer 'sky'
    const scene = sceneWith(validObject({ layer: 'sky' }));
    // When the scene is validated
    const result = parseWorldContent('scene', scene);
    // Then validation fails with an error pointing at the layer field
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.some((e) => e.path.endsWith('layer'))).toBe(true);
  });

  it('rejects an object that has no position', () => {
    // Given an object with the position field omitted
    const object = validObject();
    delete object.position;
    // When the scene is validated
    const result = parseWorldContent('scene', sceneWith(object));
    // Then validation fails with an error pointing at the position field
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.some((e) => e.path.endsWith('position'))).toBe(true);
  });

  it('defaults scale to 1 when scale is omitted', () => {
    // Given an object without a scale
    const object = validObject();
    delete object.scale;
    // When the scene is validated
    const result = parseWorldContent('scene', sceneWith(object));
    // Then validation succeeds and the parsed object has scale 1
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.data).toMatchObject({ objects: [{ scale: 1 }] });
  });
});
