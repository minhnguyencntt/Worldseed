import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { BootScene } from '../src/phaser/BootScene';
import type { SceneDef, WorldDef } from '@game/state/types';
import type { AssetManifest } from '@game/assets/manifest';
import type { SceneSpec } from '@game/content/schema';
import { scene, world } from '../src/runtime/content';
import { reactToPhaser } from '../src/phaser/events';

// Phaser is a browser canvas runtime, so it is replaced with a fake. The fake scene exposes
// cameras.main.fadeOut/once, events.once and scene.start spies so the transitionTo subscription handle
// and the shutdown teardown in create() can be asserted directly.
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
        // events.once records the SHUTDOWN callback so tests can run the teardown explicitly.
        events = { once: vi.fn() };
        // create() subscribes to keyboard input, so the fake scene provides a keyboard stub.
        input = { keyboard: { on: vi.fn(), off: vi.fn() } };
        scale = { width: 320, height: 240 };
        // fadeOut and once are the camera calls transitionTo makes before starting the target scene.
        cameras = { main: { fadeIn: vi.fn(), fadeOut: vi.fn(), once: vi.fn() } };
        constructor() {
          // scene.start is the Phaser scene manager call that changes to the requested scene. It is attached
          // with Object.assign because a class field named `scene` collides with the `scene` import in the content mock.
          Object.assign(this, { scene: { start: vi.fn() } });
        }
        textures = { exists: vi.fn(() => true) };
        anims = {
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

// Content is replaced with a fixed world and scene that has one boy character, so BootScene.create()
// wires real character data without loading the real game content.
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
    characters: [
      {
        id: 'boy',
        name: 'The Boy',
        position: { x: 150, y: 140 },
        scale: 1,
        layer: 'characters',
        animations: {
          idle: { asset: 'character:boy', animation: 'idle' },
          walk: { asset: 'character:boy-walk', animation: 'walk' },
          interact: { asset: 'character:boy-interact', animation: 'interact' },
        },
      },
    ],
  } as unknown as SceneDef;
  const manifest: AssetManifest = {
    assets: [
      {
        id: 'character:boy',
        path: 'boy-sheet.svg',
        type: 'spritesheet',
        frames: { frameWidth: 32, frameHeight: 48, frameCount: 2 },
        animations: { idle: { frames: [0, 1], frameRate: 2, repeat: -1 } },
        origin: { x: 0.5, y: 1 },
      },
      {
        id: 'character:boy-walk',
        path: 'boy-walk.svg',
        type: 'spritesheet',
        frames: { frameWidth: 32, frameHeight: 48, frameCount: 4 },
        animations: { walk: { frames: [0, 1, 2, 3], frameRate: 8, repeat: -1 } },
        origin: { x: 0.5, y: 1 },
      },
      {
        id: 'character:boy-interact',
        path: 'boy-interact.svg',
        type: 'spritesheet',
        frames: { frameWidth: 32, frameHeight: 48, frameCount: 3 },
        animations: { interact: { frames: [0, 1, 2], frameRate: 6, repeat: 0 } },
        origin: { x: 0.5, y: 1 },
      },
    ],
  } as unknown as AssetManifest;
  const sceneSpec = scene as unknown as SceneSpec;
  return { world, scene, manifest, sceneSpec };
});

const makeState = () => createInitialState(world, scene);

// Finds the SHUTDOWN callback BootScene registered through events.once during create().
const shutdownCallbackOf = (boot: BootScene): (() => void) => {
  const once = boot.events.once as unknown as Mock;
  const call = once.mock.calls.find((c) => c[0] === 'shutdown');
  expect(call).toBeDefined();
  return call![1] as () => void;
};

describe('BootScene transitionTo subscription handle', () => {
  let boot: BootScene;

  beforeEach(() => {
    // Drop any transitionTo subscriptions left by earlier tests so each test subscribes fresh in create().
    reactToPhaser.clear();
    useGameStore.setState({ state: makeState() });
    // Given BootScene has been created and is subscribed to transitionTo
    boot = new BootScene();
    boot.create();
  });

  it('fades out exactly once per transitionTo after create', () => {
    // Given BootScene has been created with a fake main camera
    const fadeOut = boot.cameras.main.fadeOut as unknown as Mock;
    // When transitionTo is emitted once for the library scene
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });
    // Then the camera fades out exactly once, so there is a single transitionTo handler
    expect(fadeOut).toHaveBeenCalledTimes(1);
  });

  it('fades out once on the new scene after shutdown and re-create', () => {
    // Given the first BootScene is shut down, which must unsubscribe its transitionTo handler
    const firstFadeOut = boot.cameras.main.fadeOut as unknown as Mock;
    shutdownCallbackOf(boot)();
    // When a second BootScene is created and transitionTo is emitted once
    const second = new BootScene();
    second.create();
    const secondFadeOut = second.cameras.main.fadeOut as unknown as Mock;
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });
    // Then only the second scene fades out, once, and the first scene's handler is not called again
    expect(secondFadeOut).toHaveBeenCalledTimes(1);
    expect(firstFadeOut).not.toHaveBeenCalled();
  });
});
