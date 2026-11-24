import { afterEach, describe, expect, it, vi } from 'vitest';
import type Phaser from 'phaser';
import type { CharacterSpec } from '@game/content/schema';
import type { AssetManifest } from '@game/assets/manifest';
import type { InputLayer } from '../src/phaser/input';
import { createCharacters, type Characters } from '../src/phaser/characters';
import { reactToPhaser } from '../src/phaser/events';

// Phaser is a browser canvas runtime, so only the constants characters.ts reads are faked.
// The event bridge is the real module: playAnimation is emitted through reactToPhaser.
vi.mock('phaser', () => ({
  default: { Animations: { Events: { ANIMATION_COMPLETE: 'animationcomplete' } } },
}));

type FakeSprite = Record<string, unknown>;

// A chainable fake sprite: every Phaser setter returns the same object so call chains resolve.
function makeSprite(): FakeSprite {
  const sprite: FakeSprite = {};
  for (const method of ['setOrigin', 'setScale', 'setDepth', 'setInteractive', 'play', 'once', 'on', 'off']) {
    sprite[method] = vi.fn(() => sprite);
  }
  sprite.destroy = vi.fn();
  return sprite;
}

// Fake scene: textures always exist, anims record created keys, and add.sprite returns fresh sprites.
function makeScene() {
  const sprites: FakeSprite[] = [];
  const animKeys = new Set<string>();
  const scene = {
    add: {
      sprite: vi.fn(() => {
        const sprite = makeSprite();
        sprites.push(sprite);
        return sprite;
      }),
    },
    anims: {
      exists: vi.fn((key: string) => animKeys.has(key)),
      create: vi.fn((config: { key: string }) => {
        animKeys.add(config.key);
      }),
      generateFrameNumbers: vi.fn(() => []),
    },
    textures: { exists: vi.fn(() => true) },
  };
  return { scene, sprites };
}

// Manifest with one spritesheet asset that defines both idle and interact animations.
const manifest = {
  assets: [
    {
      id: 'character:boy',
      path: 'boy-sheet.svg',
      type: 'spritesheet',
      frames: { frameWidth: 32, frameHeight: 48, frameCount: 3 },
      animations: {
        idle: { frames: [0, 1], frameRate: 2, repeat: -1 },
        interact: { frames: [0, 1, 2], frameRate: 6, repeat: 0 },
      },
      origin: { x: 0.5, y: 1 },
    },
  ],
} as unknown as AssetManifest;

const boySpec: CharacterSpec = {
  id: 'boy',
  name: 'The Boy',
  position: { x: 150, y: 140 },
  scale: 1,
  layer: 'characters',
  animations: {
    idle: { asset: 'character:boy', animation: 'idle' },
    interact: { asset: 'character:boy', animation: 'interact' },
  },
};

const created: Characters[] = [];

// Builds the characters for a scene with the given specs and records them for teardown.
function setup(specs: CharacterSpec[] = [boySpec]) {
  const { scene, sprites } = makeScene();
  const input = { bindCharacter: vi.fn() };
  const characters = createCharacters(
    scene as unknown as Phaser.Scene,
    specs,
    manifest,
    (id) => id,
    input as unknown as InputLayer,
  );
  created.push(characters);
  return { scene, sprites, input, characters };
}

afterEach(() => {
  // Unsubscribe from the shared event bridge so no listener leaks into the next test.
  for (const characters of created.splice(0)) characters.dispose();
});

describe('spawn', () => {
  it('creates one sprite per spec and plays idle', () => {
    // Given a scene with the boy spec and a manifest whose idle animation exists
    // When createCharacters runs for that one spec
    const { scene, sprites, input } = setup();
    // Then exactly one sprite is added at the spec position with the spritesheet key
    expect(scene.add.sprite).toHaveBeenCalledTimes(1);
    expect(scene.add.sprite).toHaveBeenCalledWith(150, 140, 'character:boy');
    // And the sprite plays the idle animation keyed as `${asset}:${animation}`
    expect(sprites[0]!.play).toHaveBeenCalledWith('character:boy:idle');
    // And the character is bound to the input layer with its spec id
    expect(input.bindCharacter).toHaveBeenCalledWith(sprites[0], 'boy', expect.any(Function));
  });
});

describe('playAnimation', () => {
  it('plays the interact animation on the target character', () => {
    // Given the boy character has been spawned and its idle play call cleared
    const { sprites } = setup();
    const play = sprites[0]!.play as ReturnType<typeof vi.fn>;
    play.mockClear();
    // When playAnimation is emitted for the boy with the interact name
    reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' });
    // Then the sprite plays the interact animation key
    expect(play).toHaveBeenCalledWith('character:boy:interact');
  });

  it('ignores an unknown target and an unsupported animation name', () => {
    // Given the boy character has been spawned and its idle play call cleared
    const { sprites } = setup();
    const play = sprites[0]!.play as ReturnType<typeof vi.fn>;
    play.mockClear();
    // When playAnimation targets an unknown character id
    reactToPhaser.emit('playAnimation', { target: 'ghost', name: 'interact' });
    // Then no animation is played on the boy sprite
    expect(play).not.toHaveBeenCalled();
    // When playAnimation names an animation outside idle, walk and interact
    reactToPhaser.emit('playAnimation', { target: 'boy', name: 'dance' });
    // Then no animation is played on the boy sprite either
    expect(play).not.toHaveBeenCalled();
  });
});

describe('dispose', () => {
  it('destroys the sprite and stops responding to playAnimation', () => {
    // Given the boy character has been spawned
    const { sprites, characters } = setup();
    const play = sprites[0]!.play as ReturnType<typeof vi.fn>;
    const destroy = sprites[0]!.destroy as ReturnType<typeof vi.fn>;
    // When the characters are disposed
    characters.dispose();
    // Then the sprite is destroyed exactly once
    expect(destroy).toHaveBeenCalledTimes(1);
    // And a later playAnimation emit does not play anything on the destroyed sprite
    play.mockClear();
    reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' });
    expect(play).not.toHaveBeenCalled();
  });
});
