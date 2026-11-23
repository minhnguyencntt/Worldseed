import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createInitialState } from '@game/state/gameState';
import { useGameStore } from '../src/store/gameStore';
import { BootScene } from '../src/phaser/BootScene';
import { phaserToReact } from '../src/phaser/events';
import { scene, world } from '../src/runtime/content';

// Phaser is a browser canvas runtime; the scene only needs Scene.events and the SHUTDOWN constant.
vi.mock('phaser', () => ({
  default: {
    Scene: class {
      events = { once: vi.fn() };
    },
    Scenes: { Events: { SHUTDOWN: 'shutdown' } },
  },
}));

const makeState = () => createInitialState(world, scene);

describe('BootScene state reading', () => {
  beforeEach(() => {
    useGameStore.setState({ state: null });
  });

  it('readState returns the state currently held by the shared store', () => {
    const state = makeState();
    useGameStore.setState({ state });

    const boot = new BootScene();

    expect(boot.readState()).toBe(state);
  });

  it('calls onStateChange and returns the new reference when the store state changes after create()', () => {
    const first = makeState();
    const next = makeState();
    useGameStore.setState({ state: first });
    const boot = new BootScene();
    boot.create();
    const onStateChange = vi.spyOn(boot, 'onStateChange');

    useGameStore.setState({ state: next });

    expect(onStateChange).toHaveBeenCalled();
    expect(boot.readState()).toBe(next);
  });

  it('stops reacting to store changes after the SHUTDOWN callback runs', () => {
    useGameStore.setState({ state: makeState() });
    const boot = new BootScene();
    boot.create();
    const onStateChange = vi.spyOn(boot, 'onStateChange');
    const once = boot.events.once as unknown as ReturnType<typeof vi.fn>;
    const shutdownCall = once.mock.calls.find(([event]) => event === 'shutdown');
    expect(shutdownCall).toBeDefined();
    const onShutdown = shutdownCall?.[1] as () => void;

    onShutdown();
    useGameStore.setState({ state: makeState() });

    expect(onStateChange).not.toHaveBeenCalled();
  });

  it('emits sceneReady on the phaserToReact bus during create()', () => {
    useGameStore.setState({ state: makeState() });
    const received = vi.fn();
    const off = phaserToReact.on('sceneReady', received);

    new BootScene().create();

    expect(received).toHaveBeenCalledWith({ sceneId: 'boot' });
    off();
  });
});
