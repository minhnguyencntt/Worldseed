import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { BootScene, TRANSITION_FADE_MS } from '../src/phaser/BootScene';
import { reactToPhaser } from '../src/phaser/events';
import type { SceneDef, WorldDef } from '@game/state/types';
import type { AssetManifest } from '@game/assets/manifest';
import type { SceneSpec } from '@game/content/schema';
import { scene, world } from '../src/runtime/content';

// Phaser is a browser canvas runtime, so it is replaced with a fake. The fake scene exposes
// cameras.main.fadeOut/once and scene.start spies so the transitionTo wiring can be asserted after shutdown.
vi.mock('phaser', () => {
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
      'off',
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
        input = { keyboard: { on: vi.fn(), off: vi.fn() } };
        scale = { width: 320, height: 240 };
        cameras = { main: { fadeIn: vi.fn(), fadeOut: vi.fn(), once: vi.fn() } };
        constructor() {
          // scene.start is attached with Object.assign because a class field named `scene` collides with the
          // `scene` import in the content mock.
          Object.assign(this, { scene: { start: vi.fn(), get: vi.fn(() => ({})) } });
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

describe('BootScene transitionTo shutdown', () => {
  let boot: BootScene;
  let shutdownCallback: () => void;

  // Runs the SHUTDOWN callback that create() registered through scene.events.once.
  const runShutdown = () => {
    const once = boot.events.once as unknown as Mock;
    const cb = once.mock.calls.find((c: unknown[]) => c[0] === 'shutdown')![1] as () => void;
    cb();
  };

  // Subscribed before create() in beforeEach, so it must keep receiving events after BootScene shuts down.
  let otherHandler: Mock;
  let unsubscribeOther: () => void;

  beforeEach(() => {
    vi.clearAllMocks();
    useGameStore.setState({ state: makeState() });
    otherHandler = vi.fn();
    unsubscribeOther = reactToPhaser.on('transitionTo', otherHandler);
    boot = new BootScene();
    boot.create();
    shutdownCallback = (boot.events.once as unknown as Mock).mock.calls.find((c: unknown[]) => c[0] === 'shutdown')![1] as () => void;
  });

  afterEach(() => {
    // Run the SHUTDOWN callback again only as a no-op safety net so the event bus subscription never leaks between tests.
    shutdownCallback();
    unsubscribeOther();
    useGameStore.setState({ state: null });
  });

  it('fades the camera out on transitionTo before shutdown', () => {
    // Given BootScene is created and its SHUTDOWN callback has not run yet
    const fadeOut = boot.cameras.main.fadeOut as unknown as Mock;
    // When transitionTo is emitted for the library scene
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });
    // Then the camera fades out for the transition duration (positive control for the shutdown assertions below)
    expect(fadeOut).toHaveBeenCalledTimes(1);
    expect(fadeOut).toHaveBeenCalledWith(TRANSITION_FADE_MS);
  });

  it('ignores transitionTo after the SHUTDOWN callback runs', () => {
    // Given BootScene has been created and the SHUTDOWN callback has run
    runShutdown();
    const fadeOut = boot.cameras.main.fadeOut as unknown as Mock;
    const startScene = boot.scene.start as unknown as Mock;
    // When transitionTo is emitted for the library scene
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });
    // Then the camera does not fade out and the scene manager does not start the library scene
    expect(fadeOut).not.toHaveBeenCalled();
    expect(startScene).not.toHaveBeenCalled();
  });

  it('keeps other transitionTo subscribers active after shutdown', () => {
    // Given a spy handler that was subscribed to transitionTo before BootScene.create() ran
    // When the SHUTDOWN callback runs and a transitionTo event is emitted
    runShutdown();
    const fadeOut = boot.cameras.main.fadeOut as unknown as Mock;
    const payload = { sceneId: 'library' };
    reactToPhaser.emit('transitionTo', payload);
    // Then the pre-existing spy still receives the event, while BootScene's own handler does not fade the camera
    expect(otherHandler).toHaveBeenCalledWith(payload);
    expect(fadeOut).not.toHaveBeenCalled();
  });
});
