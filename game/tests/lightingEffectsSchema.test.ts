import { describe, it, expect } from 'vitest';
import { parseWorldContent } from '../src/content/schema';
import { validScene } from './fixtures/valid-world';

// Mirrors the sceneWithEffects pattern in effectsSchema.test.ts: the in-memory validScene is a
// runtime SceneDef, so its objects are replaced with one authored-content object.
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

const moonlightShaft = {
  type: 'moonlightShaft',
  color: '#cfe0f5',
  alpha: 0.18,
  area: { x: 60, y: 30, width: 90, height: 200 },
};
const lampGlow = { type: 'lampGlow', color: '#f9a84a', alpha: 0.25, x: 96, y: 130, radius: 48 };
const doorLight = {
  type: 'doorLight',
  color: '#fdd58a',
  alpha: 0.5,
  area: { x: 410, y: 162, width: 32, height: 2 },
};
const vignette = { type: 'vignette', color: '#0b0a1e', alpha: 0.45 };

describe('lightingEffectsSchema', () => {
  it('accepts a scene carrying one of each new lighting effect', () => {
    // Given a valid scene with moonlightShaft, lampGlow, doorLight and vignette effects
    const scene = sceneWithEffects([moonlightShaft, lampGlow, doorLight, vignette]);
    // When the scene is validated as scene content
    const result = parseWorldContent('scene', scene);
    // Then validation succeeds
    expect(result.ok).toBe(true);
  });

  it('rejects a lampGlow with a negative radius and points at effects.0', () => {
    // Given a scene whose first effect is a lampGlow with radius -1
    const scene = sceneWithEffects([{ ...lampGlow, radius: -1 }]);
    // When the scene is validated
    const result = parseWorldContent('scene', scene);
    // Then validation fails and the first error path starts with effects.0
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors[0].path.startsWith('effects.0')).toBe(true);
  });
});
