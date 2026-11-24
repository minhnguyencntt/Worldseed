import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BootScene, FALLBACK_KEY as BOOT_FALLBACK_KEY } from '../src/phaser/BootScene';
import { createPreloader } from '../src/phaser/preload';
import { manifest, scene } from '../src/runtime/content';

const preloadMock = vi.hoisted(() => ({
  resolveKey: vi.fn(() => 'k'),
  dispose: vi.fn(),
}));

// Phaser is a browser canvas runtime; BootScene only needs the Scene base class and its event names.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

// The preload module is replaced so BootScene's delegation is observed without a loader.
vi.mock('../src/phaser/preload', () => ({
  FALLBACK_KEY: 'fallback:missing',
  createPreloader: vi.fn(() => preloadMock),
}));

// Content is mocked so the manifest and scene handed to the preloader are known fixtures.
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

describe('BootScene preload delegation', () => {
  let boot: BootScene;

  beforeEach(() => {
    vi.mocked(createPreloader).mockClear();
    preloadMock.resolveKey.mockClear();
    preloadMock.dispose.mockClear();
    boot = new BootScene();
  });

  it('delegates preload to createPreloader once with the scene, content and manifest', () => {
    boot.preload();

    expect(createPreloader).toHaveBeenCalledTimes(1);
    expect(createPreloader).toHaveBeenCalledWith(boot, scene, manifest);
  });

  it('resolves asset ids through the preloader returned by createPreloader', () => {
    boot.preload();

    expect(boot.resolveKey('x')).toBe('k');
    expect(preloadMock.resolveKey).toHaveBeenCalledWith('x');
  });

  it('exports the fallback key that the preload module defines', () => {
    expect(BOOT_FALLBACK_KEY).toBe('fallback:missing');
  });

  it('keeps asset loading out of BootScene itself', () => {
    const source = readFileSync(resolve(__dirname, '../src/phaser/BootScene.ts'), 'utf8');

    expect(source).not.toContain('load.image');
    expect(source).not.toContain('planPreload(');
  });
});
