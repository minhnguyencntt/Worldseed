import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { BootScene } from '../src/phaser/BootScene';
import type { SceneDef, WorldDef } from '@game/state/types';
import type { AssetManifest } from '@game/assets/manifest';
import type { SceneSpec } from '@game/content/schema';
import { scene, world } from '../src/runtime/content';
import { phaserToReact } from '../src/phaser/events';

// Phaser is a browser canvas runtime, so it is replaced with a fake. The fake scene exposes
// add.sprite, anims and textures spies so the character wiring in create() can be asserted directly.
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
        events = { once: vi.fn() };
        scale = { width: 320, height: 240 };
        cameras = { main: { fadeIn: vi.fn() } };
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

// Returns the pointer-down listener BootScene registered on the first character sprite.
function pointerDownOn(sprite: Record<string, unknown>): () => void {
  const on = sprite.on as unknown as ReturnType<typeof vi.fn>;
  const call = on.mock.calls.find((c: unknown[]) => c[0] === 'pointerdown');
  if (!call) throw new Error('no pointerdown listener registered on the character sprite');
  return call[1] as () => void;
}

describe('BootScene character wiring', () => {
  beforeEach(() => {
    useGameStore.setState({ state: makeState() });
  });

  it('creates one sprite per scene character and plays its idle animation key', () => {
    // Given a scene with one boy character whose idle animation exists in the manifest
    const boot = new BootScene();
    // When create() runs
    boot.create();
    // Then exactly one character sprite is added and played with character:boy:idle
    const addSprite = boot.add.sprite as unknown as ReturnType<typeof vi.fn>;
    expect(addSprite).toHaveBeenCalledTimes(1);
    const sprite = addSprite.mock.results[0]!.value as Record<string, unknown>;
    expect(sprite.play).toHaveBeenCalledWith('character:boy:idle');
  });

  it('plays the boy interact animation when the character sprite is pressed', () => {
    // Given BootScene has created the boy character sprite
    const boot = new BootScene();
    boot.create();
    const sprite = (boot.add.sprite as unknown as ReturnType<typeof vi.fn>).mock.results[0]!.value as Record<
      string,
      unknown
    >;
    const play = sprite.play as unknown as ReturnType<typeof vi.fn>;
    play.mockClear();
    // When the sprite receives a pointer-down (the interact trigger in BootScene.createCharacter)
    pointerDownOn(sprite)();
    // Then the boy-interact interact animation is played
    expect(play).toHaveBeenCalledWith('character:boy-interact:interact');
  });

  it('emits characterClick with the spec id and still plays interact on pointerdown', () => {
    // Given BootScene has created the boy character sprite and the phaserToReact bus is spied on
    const boot = new BootScene();
    boot.create();
    const sprite = (boot.add.sprite as unknown as ReturnType<typeof vi.fn>).mock.results[0]!.value as Record<
      string,
      unknown
    >;
    const play = sprite.play as unknown as ReturnType<typeof vi.fn>;
    play.mockClear();
    const emit = vi.spyOn(phaserToReact, 'emit');
    try {
      // When the sprite receives a pointer-down
      pointerDownOn(sprite)();
      // Then characterClick is emitted on the React bridge with the character spec id
      expect(emit).toHaveBeenCalledWith('characterClick', { id: 'boy' });
      // And the interact animation still plays
      expect(play).toHaveBeenCalledWith('character:boy-interact:interact');
    } finally {
      emit.mockRestore();
    }
  });
});
