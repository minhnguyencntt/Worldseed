import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ObjectSpec } from '@game/content/schema';
import type { AssetManifest } from '@game/assets/manifest';
import type { RenderContext, RenderHandle } from '@game/engine/renderContext';
import { SceneObject } from '@game/entities/SceneObject';
import { planPreload, resolveTextureKey } from '@game/engine/planPreload';
import { createInitialState } from '@game/state/gameState';
import { validScene, validWorld } from './fixtures/valid-world';
import { BootScene, FALLBACK_KEY } from '../frontend/src/phaser/BootScene';

// Phaser is mocked through the @game vitest alias: the bare 'phaser' specifier resolves to
// frontend/node_modules/phaser, so this mock covers the import made by BootScene.
// Only Scene.events, Scenes.Events and the scene base class are used by the code under test.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

// Content is mocked so the scene references one manifest asset (objects/bed) and one unknown asset (objects/ghost).
vi.mock('../frontend/src/runtime/content', () => ({
  scene: {
    id: 'bedroom',
    title: 'Bedroom',
    objects: [
      { id: 'bed', asset: 'objects/bed' },
      { id: 'ghost', asset: 'objects/ghost' },
    ],
    dialogue: [],
  },
  manifest: {
    version: 1,
    assets: [{ id: 'objects/bed', path: 'worlds/the-boys-room/furniture/bed.svg', type: 'image' }],
  },
}));

vi.mock('../frontend/src/store/gameStore', () => ({
  useGameStore: {
    getState: () => ({ state: null }),
    subscribe: vi.fn(() => () => {}),
  },
}));

vi.mock('../frontend/src/phaser/events', () => ({
  phaserToReact: { emit: vi.fn() },
}));

vi.mock('../frontend/src/phaser/effectContext', () => ({
  createPhaserEffectContext: vi.fn(() => ({})),
}));

// Fake render context: hover and click callbacks are captured as the handle registers them.
function makeFakeContext() {
  const captured: { hoverCb?: (over: boolean) => void; clickCb?: () => void } = {};
  const handle: RenderHandle = {
    setVisible: vi.fn(),
    destroy: vi.fn(),
    setHighlighted: vi.fn(),
    setLabelVisible: vi.fn(),
    onHover: vi.fn((cb: (over: boolean) => void) => {
      captured.hoverCb = cb;
    }),
    onClick: vi.fn((cb: () => void) => {
      captured.clickCb = cb;
    }),
  };
  const ctx: RenderContext = { createSprite: vi.fn(() => handle) };
  return {
    ctx,
    handle,
    get hoverCb() {
      return captured.hoverCb;
    },
    get clickCb() {
      return captured.clickCb;
    },
  };
}

// validScene.objects[0] is a plain ObjectDef; SceneObject needs the ObjectSpec fields added here.
function makeSpec(overrides: Partial<ObjectSpec> = {}): ObjectSpec {
  return {
    ...(validScene.objects[0] as unknown as ObjectSpec),
    asset: 'door-sprite',
    position: { x: 120, y: 340 },
    scale: 2,
    layer: 'furniture',
    visibleWhen: [],
    ...overrides,
  } as ObjectSpec;
}

const manifest: AssetManifest = {
  version: 1,
  assets: [{ id: 'objects/bed', path: 'worlds/the-boys-room/furniture/bed.svg', type: 'image', dimensions: { width: 10, height: 10 } }],
};

describe('scene hover and click via @game', () => {
  it('highlights and shows the label on hover in then out', () => {
    // Given a visible scene object whose hover callback has been captured
    const fake = makeFakeContext();
    const object = new SceneObject(makeSpec(), fake.ctx);
    object.sync(createInitialState(validWorld, validScene));
    // When the pointer enters and then leaves the object
    fake.hoverCb?.(true);
    fake.hoverCb?.(false);
    // Then highlight and label are set on, then off
    expect(vi.mocked(fake.handle.setHighlighted).mock.calls).toEqual([[true], [false]]);
    expect(vi.mocked(fake.handle.setLabelVisible).mock.calls).toEqual([[true], [false]]);
  });

  it('calls the interact listener with the object id and its actions on click after sync', () => {
    // Given a visible object with a registered listener and a synced state
    const fake = makeFakeContext();
    const object = new SceneObject(makeSpec(), fake.ctx);
    const listener = vi.fn();
    object.onInteract(listener);
    object.sync(createInitialState(validWorld, validScene));
    // When the object is clicked
    fake.clickCb?.();
    // Then the listener receives the object id and the available actions
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ objectId: validScene.objects[0].id, actions: expect.any(Array) });
  });

  it('calls nothing on click while the object is hidden', () => {
    // Given an object that is hidden because its visibleWhen flag is unset
    const fake = makeFakeContext();
    const object = new SceneObject(makeSpec({ visibleWhen: [{ flag: 'never-set' }] }), fake.ctx);
    const listener = vi.fn();
    object.onInteract(listener);
    object.sync(createInitialState(validWorld, validScene));
    // When the object is clicked
    fake.clickCb?.();
    // Then the listener is not called
    expect(listener).not.toHaveBeenCalled();
  });
});

describe('missing-asset fallback via @game', () => {
  let boot: BootScene;
  let image: ReturnType<typeof vi.fn>;
  let generated: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    boot = new BootScene();
    image = vi.fn();
    generated = vi.fn();
    boot.load = { image, on: vi.fn() } as unknown as BootScene['load'];
    boot.make = {
      graphics: vi.fn(() => {
        const g: Record<string, unknown> = {};
        g.fillStyle = vi.fn(() => g);
        g.fillRect = vi.fn(() => g);
        g.generateTexture = generated;
        g.destroy = vi.fn();
        return g;
      }),
    } as unknown as BootScene['make'];
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('resolves an id that is not in the manifest to FALLBACK_KEY', () => {
    // Given a manifest without 'nope'
    // When resolving 'nope' through the @game texture resolver
    // Then the fallback key is returned
    expect(resolveTextureKey('nope', manifest, FALLBACK_KEY)).toBe(FALLBACK_KEY);
  });

  it('plans an unknown scene asset reference instead of loading it', () => {
    // Given the scene references objects/ghost, which is not in the manifest
    const plan = planPreload({ ...validScene, objects: [{ ...validScene.objects[0], id: 'g', asset: 'objects/ghost' } as never] }, manifest);
    // Then it is reported as unknown and not planned for load
    expect(plan.unknown).toEqual(['objects/ghost']);
    expect(plan.load).toEqual([]);
  });

  it('does not call load.image for an unknown asset ref and generates FALLBACK_KEY', () => {
    // Given the mocked scene references objects/ghost, which is missing from the manifest
    // When BootScene.preload runs
    boot.preload();
    // Then load.image is never called for objects/ghost
    expect(image).not.toHaveBeenCalledWith('objects/ghost', expect.anything());
    // And the fallback texture is generated under FALLBACK_KEY
    expect(generated).toHaveBeenCalledWith(FALLBACK_KEY, 8, 8);
  });
});
