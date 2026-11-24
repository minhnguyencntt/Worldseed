import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { BootScene } from '../src/phaser/BootScene';
import { createPreloader, FALLBACK_KEY } from '../src/phaser/preload';
import { createCharacters } from '../src/phaser/characters';
import type { SceneDef, WorldDef } from '@game/state/types';
import type { AssetManifest } from '@game/assets/manifest';
import type { CharacterSpec, SceneSpec } from '@game/content/schema';
import { scene, world } from '../src/runtime/content';

// Phaser is a browser canvas runtime, so it is replaced with a fake. Every fake scene exposes
// textures.remove, anims.create/remove, load and make spies so the dispose paths can be asserted.
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
      'off',
      'once',
      'play',
      'removeAllListeners',
    ]) {
      obj[method] = vi.fn(() => obj);
    }
    obj.destroy = vi.fn();
    return obj;
  };
  // The fallback texture is generated on a graphics object that is destroyed right after.
  const fakeGraphics = (): Record<string, unknown> => {
    const g: Record<string, unknown> = {};
    g.fillStyle = vi.fn(() => g);
    g.fillRect = vi.fn(() => g);
    g.generateTexture = vi.fn();
    g.destroy = vi.fn();
    return g;
  };
  return {
    default: {
      Scene: class {
        events = { once: vi.fn() };
        scale = { width: 320, height: 240 };
        cameras = { main: { fadeIn: vi.fn(), fadeOut: vi.fn(), once: vi.fn(), off: vi.fn() } };
        input = { keyboard: { on: vi.fn(), off: vi.fn() } };
        textures = { exists: vi.fn(() => true), remove: vi.fn() };
        anims = {
          exists: vi.fn(() => false),
          create: vi.fn(),
          remove: vi.fn(),
          generateFrameNumbers: vi.fn(() => []),
        };
        tweens = { killAll: vi.fn() };
        load = { image: vi.fn(), spritesheet: vi.fn(), on: vi.fn(), off: vi.fn() };
        make = { graphics: vi.fn(() => fakeGraphics()) };
        add = {
          sprite: vi.fn(() => fakeGameObject()),
          rectangle: vi.fn(() => fakeGameObject()),
          image: vi.fn(() => fakeGameObject()),
          text: vi.fn(() => fakeGameObject()),
          particles: vi.fn(() => fakeGameObject()),
        };
      },
      Scenes: { Events: { SHUTDOWN: 'shutdown' } },
      Input: {
        Events: { POINTER_OVER: 'pointerover', POINTER_OUT: 'pointerout', POINTER_DOWN: 'pointerdown' },
      },
      Cameras: { Scene2D: { Events: { FADE_OUT_COMPLETE: 'camerafadeoutcomplete' } } },
      Animations: { Events: { ANIMATION_COMPLETE: 'animationcomplete' } },
      Geom: { Rectangle: Object.assign(vi.fn(), { Contains: vi.fn() }) },
    },
  };
});

// Content is replaced with a fixed world and scene that has one boy character with three animation
// assets, so BootScene.preload() and create() plan and release real textures and animations.
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

// A minimal fake scene for createPreloader and createCharacters, which only touch load, make, textures, anims and add.
const makeFakeScene = () => {
  const graphics: Record<string, unknown> = {};
  graphics.fillStyle = vi.fn(() => graphics);
  graphics.fillRect = vi.fn(() => graphics);
  graphics.generateTexture = vi.fn();
  graphics.destroy = vi.fn();
  const sprite: Record<string, unknown> = {};
  for (const method of ['setOrigin', 'setDepth', 'setScale', 'setInteractive', 'play', 'on', 'once', 'removeAllListeners']) {
    sprite[method] = vi.fn(() => sprite);
  }
  sprite.destroy = vi.fn();
  return {
    load: { image: vi.fn(), spritesheet: vi.fn(), on: vi.fn(), off: vi.fn() },
    make: { graphics: vi.fn(() => graphics) },
    textures: { exists: vi.fn(() => true), remove: vi.fn() },
    anims: {
      exists: vi.fn(() => false),
      create: vi.fn(),
      remove: vi.fn(),
      generateFrameNumbers: vi.fn(() => []),
    },
    add: { sprite: vi.fn(() => sprite) },
  };
};

const makeState = () => createInitialState(world, scene);

describe('texture and animation release on dispose', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useGameStore.setState({ state: makeState() });
  });

  afterEach(() => {
    useGameStore.setState({ state: null });
  });

  it('preloader dispose removes queued textures', () => {
    // Given a scene whose planned objects and characters reference an image and a spritesheet
    const fake = makeFakeScene();
    const manifest = {
      version: 1,
      assets: [
        { id: 'objects/bed', path: 'a/bed.png', type: 'image' },
        {
          id: 'character:boy',
          path: 'boy-sheet.png',
          type: 'spritesheet',
          frames: { frameWidth: 32, frameHeight: 48, frameCount: 2 },
        },
      ],
    } as unknown as AssetManifest;
    const content = {
      id: 'bedroom',
      title: 'Bedroom',
      objects: [{ id: 'bed', asset: 'objects/bed' }],
      characters: [
        {
          id: 'boy',
          name: 'The Boy',
          position: { x: 0, y: 0 },
          scale: 1,
          layer: 'characters',
          animations: { idle: { asset: 'character:boy', animation: 'idle' } },
        },
      ],
      dialogue: [],
    } as unknown as SceneDef;
    const preloader = createPreloader(fake as never, content, manifest);
    // When the preloader is disposed
    preloader.dispose();
    // Then the queued image and spritesheet textures and the fallback texture are all removed
    expect(fake.textures.remove).toHaveBeenCalledWith('objects/bed');
    expect(fake.textures.remove).toHaveBeenCalledWith('character:boy');
    expect(fake.textures.remove).toHaveBeenCalledWith(FALLBACK_KEY);
    expect(fake.textures.remove).toHaveBeenCalledTimes(3);
  });

  it('characters dispose removes animations', () => {
    // Given a character whose idle and interact animations are registered as Phaser animations
    const fake = makeFakeScene();
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
          id: 'character:boy-interact',
          path: 'boy-interact.svg',
          type: 'spritesheet',
          frames: { frameWidth: 32, frameHeight: 48, frameCount: 3 },
          animations: { interact: { frames: [0, 1, 2], frameRate: 6, repeat: 0 } },
          origin: { x: 0.5, y: 1 },
        },
      ],
    } as unknown as AssetManifest;
    const specs = [
      {
        id: 'boy',
        name: 'The Boy',
        position: { x: 150, y: 140 },
        scale: 1,
        layer: 'characters',
        animations: {
          idle: { asset: 'character:boy', animation: 'idle' },
          interact: { asset: 'character:boy-interact', animation: 'interact' },
        },
      },
    ] as unknown as CharacterSpec[];
    const input = { bindCharacter: vi.fn() };
    const characters = createCharacters(fake as never, specs, manifest, (id) => id, input as never);
    const created = fake.anims.create as unknown as Mock;
    const removed = fake.anims.remove as unknown as Mock;
    expect(created).toHaveBeenCalledTimes(2);
    // When the characters are disposed
    characters.dispose();
    // Then anims.remove is called once for each anims.create, with the same keys
    expect(removed).toHaveBeenCalledTimes(created.mock.calls.length);
    const createdKeys = created.mock.calls.map((c: unknown[]) => (c[0] as { key: string }).key);
    const removedKeys = removed.mock.calls.map((c: unknown[]) => c[0]);
    expect(removedKeys).toEqual(createdKeys);
  });

  it('BootScene disposes preloader last', () => {
    // Given BootScene has preloaded its textures and created a character sprite
    const boot = new BootScene();
    boot.preload();
    boot.create();
    const sprite = (boot.add.sprite as unknown as Mock).mock.results[0]!.value as Record<string, unknown>;
    const destroy = sprite.destroy as unknown as Mock;
    const remove = boot.textures.remove as unknown as Mock;
    // When the scene's SHUTDOWN callback runs
    const once = boot.events.once as unknown as Mock;
    const shutdown = once.mock.calls.find((c: unknown[]) => c[0] === 'shutdown')![1] as () => void;
    shutdown();
    // Then the texture removal happens after the sprite is destroyed (the preloader is disposed last)
    expect(remove).toHaveBeenCalled();
    expect(destroy).toHaveBeenCalled();
    expect(remove.mock.invocationCallOrder[0]!).toBeGreaterThan(destroy.mock.invocationCallOrder[0]!);
  });
});
