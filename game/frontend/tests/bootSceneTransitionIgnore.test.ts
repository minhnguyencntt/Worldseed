import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { BootScene } from '../src/phaser/BootScene';
import type { SceneDef, WorldDef } from '@game/state/types';
import type { AssetManifest } from '@game/assets/manifest';
import type { SceneSpec } from '@game/content/schema';
import { scene, world } from '../src/runtime/content';
import { reactToPhaser } from '../src/phaser/events';

// Phaser is a browser canvas runtime, so it is replaced with a fake. The fake scene reports no registered
// scene (scene.get returns null), so the transitionTo guard must ignore every requested id.
vi.mock('phaser', () => {
  // Every fake game object returns itself from its chainable setters so Phaser call chains resolve.
  const fakeGameObject = (): Record<string, unknown> => {
    const obj: Record<string, unknown> = {};
    for (const method of [
      'setOrigin',
      'setDepth',
      'setScale',
      'setInteractive',
      'setVisible',
      'setTint',
      'clearTint',
      'on',
      'once',
      'removeAllListeners',
      'play',
    ]) {
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
        cameras = { main: { off: vi.fn(), fadeIn: vi.fn(), fadeOut: vi.fn(), once: vi.fn() } };
        constructor() {
          // scene.get reports that no scene is registered under the requested key, so every id is unknown.
          Object.assign(this, { scene: { start: vi.fn(), get: vi.fn(() => null) } });
        }
        textures = { exists: vi.fn(() => true), remove: vi.fn() };
        anims = {
          remove: vi.fn(),
          exists: vi.fn(() => false),
          create: vi.fn(),
          generateFrameNumbers: vi.fn(() => []),
        };
        add = {
          sprite: vi.fn(() => fakeGameObject()),
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
      Animations: { Events: { ANIMATION_COMPLETE: 'animationcomplete' } },
      Geom: { Rectangle: Object.assign(vi.fn(), { Contains: vi.fn() }) },
    },
  };
});

// Content is replaced with a fixed world and scene so BootScene.create() wires known data only.
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
  const scene = {
    id: 'bedroom',
    title: 'Bedroom',
    openingDialogue: 'intro',
    dialogue: [],
    objects: [],
    characters: [],
  } as unknown as SceneDef;
  const manifest: AssetManifest = { assets: [] } as unknown as AssetManifest;
  const sceneSpec = scene as unknown as SceneSpec;
  return { world, scene, manifest, sceneSpec };
});

const makeState = () => createInitialState(world, scene);

describe('BootScene transitionTo ignores empty and unknown scene ids', () => {
  let boot: BootScene;

  beforeEach(() => {
    // Drop any transitionTo subscriptions left by earlier tests so each test subscribes fresh in create().
    reactToPhaser.clear();
    useGameStore.setState({ state: makeState() });
    // Given BootScene has been created and is subscribed to transitionTo
    boot = new BootScene();
    boot.create();
  });

  it('ignores an empty sceneId and does not fade or start a scene', () => {
    // Given the BootScene is created with a fake main camera and a scene manager that knows no scenes
    const fadeOut = boot.cameras.main.fadeOut as unknown as ReturnType<typeof vi.fn>;
    const startScene = boot.scene.start as unknown as ReturnType<typeof vi.fn>;
    // When transitionTo is emitted with an empty sceneId
    reactToPhaser.emit('transitionTo', { sceneId: '' });
    // Then the camera never fades out and the scene manager never starts a scene
    expect(fadeOut).not.toHaveBeenCalled();
    expect(startScene).not.toHaveBeenCalled();
  });

  it('ignores an unknown sceneId and does not fade or start a scene', () => {
    // Given the BootScene is created with a fake main camera and a scene manager that knows no scenes
    const fadeOut = boot.cameras.main.fadeOut as unknown as ReturnType<typeof vi.fn>;
    const startScene = boot.scene.start as unknown as ReturnType<typeof vi.fn>;
    // When transitionTo is emitted with a sceneId that is not registered
    reactToPhaser.emit('transitionTo', { sceneId: 'nope' });
    // Then the camera never fades out and the scene manager never starts a scene
    expect(fadeOut).not.toHaveBeenCalled();
    expect(startScene).not.toHaveBeenCalled();
  });
});
