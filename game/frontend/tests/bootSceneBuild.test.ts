import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildScene } from '@game/engine/buildScene';
import { buildEffects } from '@game/engine/buildEffects';
import { playSceneTransition } from '@game/engine/playSceneTransition';
import { BootScene } from '../src/phaser/BootScene';
import { createPhaserRenderContext } from '../src/phaser/renderContext';
import { sceneSpec } from '../src/runtime/content';

// Phaser is a browser canvas runtime; the scene only needs Scene.events and the SHUTDOWN constant.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

// Object construction is an engine concern; BootScene only wires it, so it is replaced with fake objects.
vi.mock('@game/engine/buildScene', () => ({
  buildScene: vi.fn(),
}));

vi.mock('@game/engine/buildEffects', () => ({
  buildEffects: vi.fn(() => []),
}));

vi.mock('@game/engine/playSceneTransition', () => ({
  playSceneTransition: vi.fn(),
}));

// The Phaser render context is replaced with a marker so the test can check what buildScene receives.
const fakeRenderContext = { createSprite: vi.fn() };
vi.mock('../src/phaser/renderContext', () => ({
  createPhaserRenderContext: vi.fn(() => fakeRenderContext),
}));

const makeFakeObject = () => ({
  destroy: vi.fn(),
  onInteract: vi.fn(),
  sync: vi.fn(),
});

describe('BootScene build wiring', () => {
  let fakeObjects: ReturnType<typeof makeFakeObject>[];

  beforeEach(() => {
    fakeObjects = [makeFakeObject(), makeFakeObject()];
    vi.mocked(buildScene).mockReset();
    vi.mocked(buildScene).mockReturnValue(fakeObjects as unknown as ReturnType<typeof buildScene>);
    vi.mocked(buildEffects).mockReset();
    vi.mocked(buildEffects).mockReturnValue([]);
    vi.mocked(playSceneTransition).mockReset();
  });

  it('builds scene objects once from the bundled scene spec when create() runs', () => {
    const boot = new BootScene();

    boot.create();

    expect(createPhaserRenderContext).toHaveBeenCalled();
    expect(buildScene).toHaveBeenCalledTimes(1);
    expect(buildScene).toHaveBeenCalledWith(fakeRenderContext, sceneSpec);
  });

  it('destroys every built scene object once when the scene shuts down', () => {
    const boot = new BootScene();
    boot.create();

    const once = boot.events.once as unknown as ReturnType<typeof vi.fn>;
    const shutdown = once.mock.calls.find(([event]) => event === 'shutdown');
    expect(shutdown).toBeDefined();
    const onShutdown = shutdown![1] as () => void;
    onShutdown();

    for (const obj of fakeObjects) {
      expect(obj.destroy).toHaveBeenCalledTimes(1);
    }
  });
});

describe('BootScene source has no hardcoded scene content', () => {
  const sources = [
    readFileSync(fileURLToPath(new URL('../src/phaser/BootScene.ts', import.meta.url)), 'utf8'),
    readFileSync(fileURLToPath(new URL('../src/phaser/renderContext.ts', import.meta.url)), 'utf8'),
  ].join('\n');

  const ids = sceneSpec.objects.flatMap((o) => [o.id, o.asset]);

  it('contains no quoted object or asset id from the bundled scene spec', () => {
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) {
      for (const quote of ["'", '"', '`']) {
        expect(sources.includes(`${quote}${id}${quote}`), `hardcoded id ${quote}${id}${quote}`).toBe(false);
      }
    }
  });
});
