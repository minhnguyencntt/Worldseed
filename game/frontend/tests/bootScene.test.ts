import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { BootScene } from '../src/phaser/BootScene';
import { phaserToReact } from '../src/phaser/events';
import type { SceneDef, WorldDef } from '@game/state/types';
import type { AssetManifest } from '@game/assets/manifest';
import type { SceneSpec } from '@game/content/schema';
import { scene, world } from '../src/runtime/content';

// Phaser is a browser canvas runtime; the scene needs Scene.events, the game-object factories
// used by effects and sprites, camera and scale, and the event-name constants.
vi.mock('phaser', () => {
  // Every fake game object returns itself from its chainable setters so Phaser call chains resolve.
  const fakeGameObject = (): Record<string, unknown> => {
    const obj: Record<string, unknown> = {};
    for (const method of ['setOrigin', 'setDepth', 'setScale', 'setInteractive', 'setVisible', 'setTint', 'clearTint', 'on']) {
      obj[method] = vi.fn(() => obj);
    }
    obj.destroy = vi.fn();
    return obj;
  };
  return {
    default: {
      Scene: class {
        events = { once: vi.fn() };
        tweens = { killAll: vi.fn() };
        input = { keyboard: { on: vi.fn(), off: vi.fn() } };
        scale = { width: 320, height: 240 };
        cameras = { main: { off: vi.fn(), fadeIn: vi.fn() } };
        add = {
          rectangle: vi.fn(() => fakeGameObject()),
          image: vi.fn(() => fakeGameObject()),
          text: vi.fn(() => fakeGameObject()),
          particles: vi.fn(() => fakeGameObject()),
        };
      },
      Scenes: { Events: { SHUTDOWN: 'shutdown' } },
      Cameras: { Scene2D: { Events: { FADE_OUT_COMPLETE: 'camerafadeoutcomplete' } } },
      Input: {
        Events: { POINTER_OVER: 'pointerover', POINTER_OUT: 'pointerout', POINTER_DOWN: 'pointerdown' },
      },
      Geom: { Rectangle: Object.assign(vi.fn(), { Contains: vi.fn() }) },
    },
  };
});

// Bundled content is parsed with zod and read via import.meta.glob; the suite supplies a fixed
// world, scene, manifest and scene spec so BootScene is tested against known data only.
vi.mock('../src/runtime/content', (): {
  world: WorldDef;
  scene: SceneDef;
  manifest: AssetManifest;
  sceneSpec: SceneSpec;
} => {
  const world: WorldDef = {
    id: 'test-world',
    title: 'Test World',
    startScene: 'bedroom',
    scenes: ['bedroom'],
    characters: [{ id: 'boy', name: 'Boy' }],
    flags: ['door_open'],
  };
  const scene: SceneDef = {
    id: 'bedroom',
    title: 'Bedroom',
    openingDialogue: 'intro',
    dialogue: [],
    objects: [
      {
        id: 'desk',
        name: 'Desk',
        description: 'A desk',
        actions: [{ id: 'inspect', label: 'Inspect', events: [] }],
        asset: 'desk-img',
        position: { x: 10, y: 20 },
        scale: 1,
        layer: 'objects',
      },
    ],
    effects: [
      { type: 'ambientLight', color: '#202030', alpha: 0.3 },
      { type: 'transition', kind: 'fade', durationMs: 200 },
    ],
  };
  const manifest: AssetManifest = {
    assets: [{ id: 'desk-img', path: 'desk.png', type: 'image' }],
  };
  const sceneSpec = scene as unknown as SceneSpec;
  return { world, scene, manifest, sceneSpec };
});

const makeState = () => createInitialState(world, scene);

describe('BootScene state reading', () => {
  beforeEach(() => {
    useGameStore.setState({ state: null });
  });

  it('readState returns the state currently held by the shared store', () => {
    const state = makeState();
    useGameStore.setState({ state });

    const boot = new BootScene();

    expect(boot.readState()).toBe(state);
  });

  it('calls onStateChange and returns the new reference when the store state changes after create()', () => {
    const first = makeState();
    const next = makeState();
    useGameStore.setState({ state: first });
    const boot = new BootScene();
    boot.create();
    const onStateChange = vi.spyOn(boot, 'onStateChange');

    useGameStore.setState({ state: next });

    expect(onStateChange).toHaveBeenCalled();
    expect(boot.readState()).toBe(next);
  });

  it('stops reacting to store changes after the SHUTDOWN callback runs', () => {
    useGameStore.setState({ state: makeState() });
    const boot = new BootScene();
    boot.create();
    const onStateChange = vi.spyOn(boot, 'onStateChange');
    const once = boot.events.once as unknown as ReturnType<typeof vi.fn>;
    const shutdownCall = once.mock.calls.find((call: unknown[]) => call[0] === 'shutdown');
    expect(shutdownCall).toBeDefined();
    const onShutdown = shutdownCall?.[1] as () => void;

    onShutdown();
    useGameStore.setState({ state: makeState() });

    expect(onStateChange).not.toHaveBeenCalled();
  });

  it('emits sceneReady on the phaserToReact bus during create()', () => {
    useGameStore.setState({ state: makeState() });
    const received = vi.fn();
    const off = phaserToReact.on('sceneReady', received);

    new BootScene().create();

    expect(received).toHaveBeenCalledWith({ sceneId: 'boot' });
    off();
  });
});
