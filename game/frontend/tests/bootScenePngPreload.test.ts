import { beforeEach, describe, expect, it, vi } from 'vitest';
import type Phaser from 'phaser';
import { BootScene, FALLBACK_KEY } from '../src/phaser/BootScene';
import { createCharacters } from '../src/phaser/characters';
import type { InputLayer } from '../src/phaser/input';
import { planPreload } from '@game/engine/planPreload';
import { manifest, scene } from '../src/runtime/content';

// Phaser is a browser canvas runtime; preload only needs Scene.events, make.graphics and load.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
      tweens = { killAll: vi.fn() };
      cameras = { main: { off: vi.fn() } };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
    Cameras: { Scene2D: { Events: { FADE_OUT_COMPLETE: 'camerafadeoutcomplete' } } },
    Animations: { Events: { ANIMATION_COMPLETE: 'animationcomplete' } },
  },
}));

const makeGraphics = () => {
  const g: Record<string, unknown> = {};
  g.fillStyle = vi.fn(() => g);
  g.fillRect = vi.fn(() => g);
  g.generateTexture = vi.fn();
  g.destroy = vi.fn();
  return g;
};

describe('BootScene PNG preload', () => {
  let boot: BootScene;
  let image: ReturnType<typeof vi.fn>;
  let spritesheet: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    boot = new BootScene();
    image = vi.fn();
    spritesheet = vi.fn();
    // The real manifest and scene are used; only Phaser's loader and graphics factory are stubbed.
    boot.load = { image, spritesheet, on: vi.fn() } as unknown as BootScene['load'];
    boot.make = { graphics: vi.fn(() => makeGraphics()) } as unknown as BootScene['make'];
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('loads the room wall PNG and the boy sprite sheet with their frame size', () => {
    boot.preload();

    expect(image).toHaveBeenCalledWith('room/wall', 'assets/worlds/the-boys-room/room/wall.png');
    expect(spritesheet).toHaveBeenCalledWith(
      'character:boy-sheet',
      'assets/worlds/the-boys-room/characters/boy-sheet.png',
      { frameWidth: 32, frameHeight: 48 },
    );
  });

  it('never issues a load call whose path ends in .svg', () => {
    boot.preload();

    const paths = [...image.mock.calls, ...spritesheet.mock.calls].map((call) => String(call[1]));
    expect(paths.filter((p) => p.endsWith('.svg'))).toEqual([]);
  });

  it('resolves every planned asset id to its own texture key, never the fallback', () => {
    boot.preload();

    const plan = planPreload(scene, manifest);
    expect(plan.load.length).toBeGreaterThan(0);
    for (const id of plan.load) {
      expect(boot.resolveKey(id)).toBe(id);
      expect(boot.resolveKey(id)).not.toBe(FALLBACK_KEY);
    }
  });

  it('creates the idle, walk and interact animations with 4, 6 and 4 frames, interact playing once', () => {
    const create = vi.fn();
    const generateFrameNumbers = vi.fn((_key: string, cfg: { frames: number[] }) =>
      cfg.frames.map((frame) => ({ key: 'character:boy-sheet', frame })),
    );
    boot.textures = { exists: vi.fn(() => true) } as unknown as BootScene['textures'];
    boot.anims = { exists: vi.fn(() => false), create, generateFrameNumbers } as unknown as BootScene['anims'];

    // Animations are registered by the real characters module; the fake scene records what it creates and plays.
    const sprite = { setOrigin: vi.fn(), setScale: vi.fn(), setDepth: vi.fn(), setInteractive: vi.fn(), play: vi.fn(), once: vi.fn() };
    sprite.setOrigin.mockReturnValue(sprite);
    sprite.setScale.mockReturnValue(sprite);
    sprite.setDepth.mockReturnValue(sprite);
    sprite.setInteractive.mockReturnValue(sprite);
    const fakeScene = {
      textures: { exists: vi.fn(() => true) },
      anims: { exists: vi.fn(() => false), create, generateFrameNumbers },
      add: { sprite: vi.fn(() => sprite) },
    } as unknown as Phaser.Scene;
    const input = { bindCharacter: vi.fn(), bindObject: vi.fn() } as unknown as InputLayer;
    const boy = scene.characters?.find((c) => c.animations?.walk?.asset === 'character:boy-sheet');
    expect(boy).toBeDefined();

    const characters = createCharacters(fakeScene, scene.characters ?? [], manifest, (id) => id, input);
    characters.play(boy!.id, 'walk');
    characters.play(boy!.id, 'interact');

    expect(sprite.play).toHaveBeenCalledWith('character:boy-sheet:idle');
    expect(sprite.play).toHaveBeenCalledWith('character:boy-sheet:walk');
    expect(sprite.play).toHaveBeenCalledWith('character:boy-sheet:interact');

    const configs = create.mock.calls.map((call) => call[0] as { key: string; frames: unknown[]; repeat: number });
    const byKey = Object.fromEntries(configs.map((c) => [c.key, c]));
    expect(byKey['character:boy-sheet:idle'].frames).toHaveLength(4);
    expect(byKey['character:boy-sheet:walk'].frames).toHaveLength(6);
    expect(byKey['character:boy-sheet:interact'].frames).toHaveLength(4);
    expect(byKey['character:boy-sheet:interact'].repeat).toBe(0);
  });
});
