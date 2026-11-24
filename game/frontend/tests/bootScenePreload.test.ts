import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BootScene } from '../src/phaser/BootScene';

// Phaser is a browser canvas runtime; preload only needs Scene.events, make.graphics and load.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
      tweens = { killAll: vi.fn() };
      anims = { remove: vi.fn() };
      textures = { remove: vi.fn() };
      cameras = { main: { off: vi.fn() } };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
    Cameras: { Scene2D: { Events: { FADE_OUT_COMPLETE: 'camerafadeoutcomplete' } } },
  },
}));

// Content is mocked so the test controls exactly which assets the scene references
// and which assets the manifest declares.
vi.mock('../src/runtime/content', () => ({
  scene: {
    id: 'bedroom',
    title: 'Bedroom',
    objects: [
      { id: 'bed', asset: 'objects/bed' },
      { id: 'ghost', asset: 'objects/ghost' },
    ],
    dialogue: [],
  },
  manifest: {
    version: 1,
    assets: [
      { id: 'objects/bed', path: 'worlds/the-boys-room/furniture/bed.svg', type: 'image' },
      { id: 'objects/desk', path: 'worlds/the-boys-room/furniture/desk.svg', type: 'image' },
    ],
  },
}));

const makeGraphics = () => {
  const g: Record<string, unknown> = {};
  g.fillStyle = vi.fn(() => g);
  g.fillRect = vi.fn(() => g);
  g.generateTexture = vi.fn();
  g.destroy = vi.fn();
  return g;
};

describe('BootScene preload plans only scene assets', () => {
  let boot: BootScene;
  let image: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    boot = new BootScene();
    image = vi.fn();
    // preload() also registers a loaderror listener and generates a fallback texture,
    // so the stubs need those members as well as load.image.
    boot.load = { image, on: vi.fn() } as unknown as BootScene['load'];
    boot.make = { graphics: vi.fn(() => makeGraphics()) } as unknown as BootScene['make'];
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('loads the referenced, manifest-known asset with its manifest path', () => {
    boot.preload();

    expect(image).toHaveBeenCalledTimes(1);
    expect(image).toHaveBeenCalledWith('objects/bed', 'assets/worlds/the-boys-room/furniture/bed.svg');
  });

  it('never loads a manifest asset that the scene does not reference', () => {
    boot.preload();

    expect(image).not.toHaveBeenCalledWith('objects/desk', expect.anything());
  });

  it('never loads a referenced asset that is missing from the manifest', () => {
    boot.preload();

    expect(image).not.toHaveBeenCalledWith('objects/ghost', expect.anything());
  });

  it('warns about the unknown asset reference by id', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    boot.preload();

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('objects/ghost'));
  });
});
