import { describe, expect, it, vi } from 'vitest';

vi.mock('phaser', () => ({
  default: {
    AUTO: 0,
    Scale: { FIT: 3, CENTER_BOTH: 1 },
    Game: class {},
    Scene: class {},
  },
}));

import { buildGameConfig, computeZoom } from '../src/phaser/config';

describe('Phaser game config', () => {
  it('builds a pixel-art config with rounded pixels and FIT scaling', () => {
    const config = buildGameConfig(document.createElement('div'), []);

    expect(config.render).toMatchObject({ pixelArt: true, roundPixels: true });
    expect(config.scale).toMatchObject({ mode: 3 });
  });

  it('computes an integer zoom of at least 1 for a large viewport', () => {
    const zoom = computeZoom(1000, 600, 2);

    expect(Number.isInteger(zoom)).toBe(true);
    expect(zoom).toBeGreaterThanOrEqual(1);
  });

  it('clamps zoom to 1 for a tiny viewport', () => {
    expect(computeZoom(10, 10, 1)).toBe(1);
  });
});
