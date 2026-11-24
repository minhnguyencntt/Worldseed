import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BootScene } from '../src/phaser/BootScene';
import { useGameStore } from '../src/store/gameStore';
import { phaserToReact } from '../src/phaser/events';
import { buildScene } from '@game/engine/buildScene';

// Phaser is a browser canvas runtime; create() only needs Scene.events and the SHUTDOWN constant.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
      input = { keyboard: undefined };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

// Content is mocked so the test does not parse YAML or depend on authored scene data.
vi.mock('../src/runtime/content', () => ({
  scene: { id: 'bedroom', title: 'Bedroom', objects: [], dialogue: [], openingDialogue: [] },
  sceneSpec: { id: 'bedroom', objects: [] },
  manifest: { version: 1, assets: [] },
  world: { id: 'the-boys-room', startScene: 'bedroom' },
}));

// buildScene is mocked so the scene holds exactly one fake bookshelf whose hover callback is captured.
vi.mock('@game/engine/buildScene', () => ({ buildScene: vi.fn() }));
vi.mock('@game/engine/buildEffects', () => ({ buildEffects: vi.fn(() => []), destroyEffects: vi.fn() }));
vi.mock('@game/engine/playSceneTransition', () => ({ playSceneTransition: vi.fn() }));
vi.mock('../src/phaser/renderContext', () => ({ createPhaserRenderContext: vi.fn(() => ({})) }));
vi.mock('../src/phaser/effectContext', () => ({ createPhaserEffectContext: vi.fn(() => ({})) }));

const makeFakeObject = () => ({
  spec: { id: 'bookshelf' },
  sync: vi.fn(),
  destroy: vi.fn(),
  onInteract: vi.fn(),
  onHoverChange: vi.fn(),
  isFocused: false,
  focus: vi.fn(),
  blur: vi.fn(),
});

describe('BootScene object hover emission', () => {
  let boot: BootScene;
  let fake: ReturnType<typeof makeFakeObject>;

  beforeEach(() => {
    fake = makeFakeObject();
    vi.mocked(buildScene).mockReturnValue([fake] as unknown as ReturnType<typeof buildScene>);
    useGameStore.setState({ state: null });
    boot = new BootScene();
  });

  afterEach(() => {
    // Run the SHUTDOWN handler registered in create() so the store subscription is released between tests.
    const shutdown = (boot.events.once as unknown as ReturnType<typeof vi.fn>).mock.calls.find(
      ([event]) => event === 'shutdown',
    );
    shutdown?.[1]?.();
    useGameStore.setState({ state: null });
  });

  it('emits objectHover with the bookshelf id when hover starts and with a null id when it ends', () => {
    const emit = vi.spyOn(phaserToReact, 'emit');

    boot.create();

    expect(fake.onHoverChange).toHaveBeenCalledTimes(1);
    const hoverCb = fake.onHoverChange.mock.calls[0][0] as (e: { objectId: string; over: boolean }) => void;

    hoverCb({ objectId: 'bookshelf', over: true });
    hoverCb({ objectId: 'bookshelf', over: false });

    const hoverEmits = emit.mock.calls.filter(([event]) => event === 'objectHover');
    expect(hoverEmits).toEqual([
      ['objectHover', { id: 'bookshelf' }],
      ['objectHover', { id: null }],
    ]);
  });
});
