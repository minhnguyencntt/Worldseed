import { describe, it, expect } from 'vitest';
import { LAYER_ORDER, layerDepth } from '../src/engine/layers';

describe('layers', () => {
  it('LAYER_ORDER is the six layers in order', () => {
    expect(LAYER_ORDER).toEqual(['background', 'furniture', 'objects', 'characters', 'effects', 'ui']);
  });

  it('layerDepth increases per layer and falls back', () => {
    const depths = LAYER_ORDER.map((layer) => layerDepth(layer));
    for (let i = 1; i < depths.length; i++) {
      expect(depths[i]).toBeGreaterThan(depths[i - 1]);
    }
    expect(layerDepth(undefined)).toBe(layerDepth('objects'));
    expect(layerDepth('nope')).toBe(layerDepth('objects'));
  });
});
