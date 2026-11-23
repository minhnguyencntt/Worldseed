import { describe, it, expect } from 'vitest';
import { parseWorldContent } from '../src/content/schema';
import { loadWorld } from '../src/content/loader';
import { validScene } from './fixtures/valid-world';

// The in-memory validScene fixture is a SceneDef (runtime shape), whose objects omit the
// authored fields required by sceneSchema (asset, position, layer, ...). Spreading it
// unchanged would fail for reasons unrelated to effects, so its objects are replaced with
// one object that satisfies the authored-content contract.
const authoredObject = {
  id: 'door',
  name: 'Door',
  description: 'A closed door.',
  asset: 'objects/door',
  position: { x: 270, y: 40 },
  scale: 1,
  layer: 'objects',
  actions: [{ id: 'leave', label: 'Leave', events: [] }],
};

function sceneWithEffects(effects?: unknown[]): Record<string, unknown> {
  return {
    ...validScene,
    objects: [authoredObject],
    ...(effects === undefined ? {} : { effects }),
  };
}

const dust = { type: 'dust', asset: 'effect:dust', count: 20, area: { x: 0, y: 0, width: 320, height: 180 } };
const ambientLight = { type: 'ambientLight', color: '#ffd9a0', alpha: 0.15 };
const fade = { type: 'transition', kind: 'fade', durationMs: 400 };

describe('effectsSchema', () => {
  it('accepts a scene carrying dust, ambientLight and fade effects', () => {
    // Given a valid scene with dust, ambientLight and fade effects
    const scene = sceneWithEffects([dust, ambientLight, fade]);
    // When the scene is validated as scene content
    const result = parseWorldContent('scene', scene);
    // Then validation succeeds
    expect(result.ok).toBe(true);
  });

  it('accepts a scene that omits effects entirely', () => {
    // Given a valid scene with no effects key
    const scene = sceneWithEffects();
    // When the scene is validated
    const result = parseWorldContent('scene', scene);
    // Then validation succeeds
    expect(result.ok).toBe(true);
  });

  it('rejects a fade transition with a negative durationMs and points at effects.0', () => {
    // Given a scene whose first effect is a transition with a negative durationMs
    const scene = sceneWithEffects([{ type: 'transition', kind: 'fade', durationMs: -1 }]);
    // When the scene is validated
    const result = parseWorldContent('scene', scene);
    // Then validation fails and the first error path starts with effects.0
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors[0].path.startsWith('effects.0')).toBe(true);
  });
});

describe('bedroom effects content', () => {
  it('declares dust, ambientLight and transition effects on the bedroom scene', () => {
    // Given the-boys-room world loaded from disk through the content loader
    const world = loadWorld('src/content/worlds/the-boys-room');
    // When the bedroom scene is located
    const bedroom = world.scenes.find((s) => s.id === 'bedroom');
    // Then it exists and its effect types are dust, ambientLight and transition
    expect(bedroom).toBeDefined();
    const types = (bedroom as unknown as { effects: { type: string }[] }).effects.map((e) => e.type);
    expect(types).toEqual(expect.arrayContaining(['dust', 'ambientLight', 'transition']));
  });
});
