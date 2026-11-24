import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { BootScene } from '../src/phaser/BootScene';
import type { SceneDef, WorldDef } from '@game/state/types';
import type { AssetManifest } from '@game/assets/manifest';
import type { SceneSpec } from '@game/content/schema';
import { scene, world } from '../src/runtime/content';
import { reactToPhaser } from '../src/phaser/events';

// Phaser is a browser canvas runtime, so it is replaced with a fake. The fake scene exposes
// add.sprite, anims and textures spies so the playAnimation wiring in create() can be asserted directly.
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
        // create() subscribes to keyboard input, so the fake scene provides a keyboard stub.
        input = { keyboard: { on: vi.fn(), off: vi.fn() } };
        scale = { width: 320, height: 240 };
        cameras = { main: { off: vi.fn(), fadeIn: vi.fn() } };
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

// Content is replaced with a fixed world and scene that has one boy character whose idle and
// interact animations exist in the fake manifest, so BootScene.create() wires real character data.
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

// Creates a BootScene, runs create(), and returns the fake boy sprite that create() added.
function createBootWithBoySprite(): { boot: BootScene; play: ReturnType<typeof vi.fn> } {
  const boot = new BootScene();
  boot.create();
  const addSprite = boot.add.sprite as unknown as ReturnType<typeof vi.fn>;
  const sprite = addSprite.mock.results[0]!.value as Record<string, unknown>;
  return { boot, play: sprite.play as unknown as ReturnType<typeof vi.fn> };
}

describe('BootScene playAnimation', () => {
  beforeEach(() => {
    // Drop any playAnimation subscriptions left by earlier tests so each test subscribes fresh in create().
    reactToPhaser.clear();
    useGameStore.setState({ state: makeState() });
  });

  it('plays the interact animation on the target character when playAnimation names interact', () => {
    // Given BootScene has created the boy character sprite
    const { play } = createBootWithBoySprite();
    play.mockClear();
    // When playAnimation is emitted for the boy with the interact name
    reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' });
    // Then the sprite plays the boy interact animation key from the mocked manifest
    expect(play).toHaveBeenLastCalledWith('character:boy-interact:interact');
  });

  it('plays the idle animation on the target character when playAnimation names idle', () => {
    // Given BootScene has created the boy character sprite
    const { play } = createBootWithBoySprite();
    play.mockClear();
    // When playAnimation is emitted for the boy with the idle name
    reactToPhaser.emit('playAnimation', { target: 'boy', name: 'idle' });
    // Then the sprite plays the boy idle animation key from the mocked manifest
    expect(play).toHaveBeenLastCalledWith('character:boy:idle');
  });

  it('ignores playAnimation for an unknown target and plays nothing', () => {
    // Given BootScene has created the boy character sprite
    const { play } = createBootWithBoySprite();
    play.mockClear();
    // When playAnimation is emitted for a target that is not a scene character
    reactToPhaser.emit('playAnimation', { target: 'ghost', name: 'interact' });
    // Then the sprite play call count is unchanged
    expect(play).toHaveBeenCalledTimes(0);
  });
});
