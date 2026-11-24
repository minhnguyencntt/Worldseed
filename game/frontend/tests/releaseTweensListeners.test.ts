import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { BootScene } from '../src/phaser/BootScene';
import { createCharacters } from '../src/phaser/characters';
import { createTransitions, TRANSITION_FADE_MS } from '../src/phaser/transitions';
import type { InputLayer } from '../src/phaser/input';
import { reactToPhaser } from '../src/phaser/events';
import type { SceneDef, WorldDef } from '@game/state/types';
import type { AssetManifest } from '@game/assets/manifest';
import type { SceneSpec } from '@game/content/schema';
import { scene, world } from '../src/runtime/content';

// Phaser is a browser canvas runtime, so it is replaced with a fake. The fake Scene mirrors the
// shutdown-relevant surface: tweens.killAll, anims.remove, textures.remove and cameras.main.off.
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
      'removeAllListeners',
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
        cameras = { main: { fadeIn: vi.fn(), fadeOut: vi.fn(), once: vi.fn(), off: vi.fn() } };
        constructor() {
          Object.assign(this, { scene: { start: vi.fn(), get: vi.fn(() => ({})) } });
        }
        textures = { exists: vi.fn(() => true), remove: vi.fn() };
        anims = {
          exists: vi.fn(() => false),
          create: vi.fn(),
          generateFrameNumbers: vi.fn(() => []),
          remove: vi.fn(),
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

// Content is replaced with a fixed world and scene with one boy character, so BootScene.create()
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

describe('transitions dispose', () => {
  it('transitions dispose removes the fade listener', () => {
    // Given a fake scene whose main camera records the fade-out listener it was given
    const cam = { fadeOut: vi.fn(), once: vi.fn(), off: vi.fn() };
    const fakeScene = { cameras: { main: cam }, scene: { start: vi.fn(), get: vi.fn(() => ({})) } };
    const transitions = createTransitions(fakeScene as unknown as Parameters<typeof createTransitions>[0]);
    // When a transitionTo request starts a fade and the transitions are disposed
    reactToPhaser.emit('transitionTo', { sceneId: 'library' });
    expect(cam.fadeOut).toHaveBeenCalledWith(TRANSITION_FADE_MS);
    const onceCall = cam.once.mock.calls[0]!;
    transitions.dispose();
    // Then the camera removes the same fade-out listener it registered
    expect(cam.off).toHaveBeenCalledWith('camerafadeoutcomplete', onceCall[1]);
  });
});

describe('characters dispose', () => {
  it('characters dispose clears sprite listeners before destroying each sprite', () => {
    // Given a fake scene and two character specs that each create a sprite
    const sprites: Array<Record<string, Mock>> = [];
    const makeSprite = (): Record<string, Mock> => {
      const obj: Record<string, Mock> = {};
      for (const method of ['setOrigin', 'setScale', 'setDepth', 'setInteractive', 'play', 'once', 'on', 'off']) {
        obj[method] = vi.fn(() => obj);
      }
      obj.removeAllListeners = vi.fn(() => obj);
      obj.destroy = vi.fn();
      sprites.push(obj);
      return obj;
    };
    const fakeScene = {
      add: { sprite: vi.fn(() => makeSprite()) },
      textures: { exists: vi.fn(() => true) },
      anims: {
        exists: vi.fn(() => false),
        create: vi.fn(),
        generateFrameNumbers: vi.fn(() => []),
        remove: vi.fn(),
      },
    };
    const character = (id: string) => ({
      id,
      name: id,
      position: { x: 10, y: 20 },
      scale: 1,
      layer: 'characters',
      animations: {
        idle: { asset: 'character:boy', animation: 'idle' },
        walk: { asset: 'character:boy-walk', animation: 'walk' },
        interact: { asset: 'character:boy-interact', animation: 'interact' },
      },
    });
    const manifest = {
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
    const input = { bindCharacter: vi.fn() } as unknown as InputLayer;
    const characters = createCharacters(
      fakeScene as unknown as Parameters<typeof createCharacters>[0],
      [character('boy'), character('girl')] as unknown as Parameters<typeof createCharacters>[1],
      manifest,
      (id) => id,
      input,
    );
    expect(sprites).toHaveLength(2);
    // When the characters are disposed
    characters.dispose();
    // Then every sprite's listeners are removed before it is destroyed
    for (const sprite of sprites) {
      expect(sprite.removeAllListeners).toHaveBeenCalledTimes(1);
      expect(sprite.destroy).toHaveBeenCalledTimes(1);
      expect(sprite.removeAllListeners.mock.invocationCallOrder[0]!).toBeLessThan(
        sprite.destroy.mock.invocationCallOrder[0]!,
      );
    }
  });
});

describe('BootScene shutdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useGameStore.setState({ state: createInitialState(world, scene) });
  });

  afterEach(() => {
    useGameStore.setState({ state: null });
  });

  it('BootScene shutdown kills tweens', () => {
    // Given BootScene is created with a fake Phaser scene whose tweens.killAll is observable
    const boot = new BootScene();
    boot.create();
    const killAll = boot.tweens.killAll as unknown as Mock;
    const once = boot.events.once as unknown as Mock;
    // When the SHUTDOWN callback registered in create() runs
    const shutdown = once.mock.calls.find((c: unknown[]) => c[0] === 'shutdown')![1] as () => void;
    shutdown();
    // Then tweens are killed exactly once
    expect(killAll).toHaveBeenCalledTimes(1);
  });
});
