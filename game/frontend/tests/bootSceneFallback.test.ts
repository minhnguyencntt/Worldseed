import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BootScene } from '../src/phaser/BootScene';
import { createPhaserEffectContext } from '../src/phaser/effectContext';

// Phaser is a browser canvas runtime; the fallback paths only need Scene.events, make.graphics,
// load.on/image and the add.particles factory, all replaced with fakes below.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

// Content is mocked so the test controls which asset ids the manifest knows about.
vi.mock('../src/runtime/content', () => ({
  scene: {
    id: 'bedroom',
    title: 'Bedroom',
    objects: [{ id: 'bed', asset: 'objects/bed' }],
    dialogue: [],
  },
  manifest: {
    version: 1,
    assets: [{ id: 'objects/bed', path: 'worlds/the-boys-room/furniture/bed.svg', type: 'image' }],
  },
}));

const FALLBACK = 'fallback:missing';

const makeGraphics = () => {
  const g: Record<string, unknown> = {};
  g.fillStyle = vi.fn(() => g);
  g.fillRect = vi.fn(() => g);
  g.generateTexture = vi.fn();
  g.destroy = vi.fn();
  return g;
};

describe('BootScene resolveKey fallback', () => {
  let boot: BootScene;
  let loadOn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    boot = new BootScene();
    loadOn = vi.fn();
    boot.load = { image: vi.fn(), on: loadOn } as unknown as BootScene['load'];
    boot.make = { graphics: vi.fn(() => makeGraphics()) } as unknown as BootScene['make'];
    boot.preload();
  });

  it('returns the asset id itself when the manifest knows it and it has not failed', () => {
    expect(boot.resolveKey('objects/bed')).toBe('objects/bed');
  });

  it('returns the fallback key for an id the manifest does not know', () => {
    expect(boot.resolveKey('nope')).toBe(FALLBACK);
  });

  it('returns the fallback key once the loader reports the asset as failed', () => {
    const loaderError = loadOn.mock.calls.find(([event]) => event === 'loaderror');
    expect(loaderError).toBeDefined();
    const onLoadError = loaderError?.[1] as (file: { key: string }) => void;

    onLoadError({ key: 'objects/bed' });

    expect(boot.resolveKey('objects/bed')).toBe(FALLBACK);
  });
});

describe('createPhaserEffectContext fallback key usage', () => {
  it('passes the resolved fallback key as the dust particle texture', () => {
    const emitter = { setDepth: vi.fn(), destroy: vi.fn() };
    emitter.setDepth.mockReturnValue(emitter);
    const particles = vi.fn<(...args: unknown[]) => unknown>(() => emitter);
    const scene = { add: { particles } } as unknown as Phaser.Scene;

    const ctx = createPhaserEffectContext(scene, () => FALLBACK);
    ctx.createEffect({
      type: 'dust',
      asset: 'objects/missing-dust',
      area: { x: 10, y: 20, width: 100, height: 50 },
      count: 5,
      depth: 3,
    } as never);

    expect(particles).toHaveBeenCalledTimes(1);
    expect(particles.mock.calls[0][2]).toBe(FALLBACK);
    expect(emitter.setDepth).toHaveBeenCalledWith(3);
  });
});
