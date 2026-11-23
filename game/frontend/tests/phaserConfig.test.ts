import { describe, expect, it, vi } from 'vitest';

const captured = vi.hoisted(() => ({ config: undefined as unknown }));

vi.mock('phaser', () => ({
  default: {
    AUTO: 0,
    Scale: { FIT: 3, CENTER_BOTH: 1 },
    Game: class {
      constructor(config: unknown) {
        captured.config = config;
      }
    },
    Scene: class {},
  },
}));

import { buildGameConfig, computeZoom } from '../src/phaser/config';
import { createGame } from '../src/phaser/createGame';

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

  it('buildGameConfig sets scale.zoom and defaults to 1', () => {
    const zoomed = buildGameConfig(document.createElement('div'), [], 3);
    expect(zoomed.scale).toMatchObject({ zoom: 3 });

    const defaulted = buildGameConfig(document.createElement('div'), []);
    expect(defaulted.scale).toMatchObject({ zoom: 1 });
  });

  it('createGame forwards zoom to the Phaser.Game config', () => {
    createGame(document.createElement('div'), [], 2);

    expect((captured.config as { scale: { zoom: number } }).scale.zoom).toBe(2);
  });
});
