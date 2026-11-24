// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Phaser cannot run in jsdom, so the Phaser host, the boot scene and the
// Phaser module are replaced with inert fakes. The React side is real.
type FakeGame = {
  destroy: ReturnType<typeof vi.fn>;
  scale: { refresh: ReturnType<typeof vi.fn>; setZoom: ReturnType<typeof vi.fn> };
};

const { createGameMock } = vi.hoisted(() => {
  const createGameMock = vi.fn((): FakeGame => ({
    destroy: vi.fn(),
    scale: { refresh: vi.fn(), setZoom: vi.fn() },
  }));
  return { createGameMock };
});

vi.mock('../src/phaser/createGame', () => ({ createGame: createGameMock }));

vi.mock('../src/phaser/BootScene', () => ({ BootScene: class {} }));

vi.mock('phaser', () => ({
  default: {
    AUTO: 0,
    Scale: { FIT: 3, CENTER_BOTH: 1 },
    Game: class {},
    Scene: class {},
  },
}));

// useGame.act routes actions through runStep (systems/runner), which returns the events App turns
// into transitionTo. runStep is wrapped with the real implementation as its default, so each test
// can override the events and the scene change stays under its control.
vi.mock('@game/systems/runner', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@game/systems/runner')>();
  return { ...actual, runStep: vi.fn(actual.runStep) };
});

import App from '../src/App';
import { reactToPhaser, phaserToReact } from '../src/phaser/events';
import * as runner from '@game/systems/runner';

class FakeResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('App transitionTo emission', () => {
  let emitSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
    // useGame rehydrates from localStorage, so a saved scene from an earlier test would skew the before/after check.
    localStorage.clear();
    emitSpy = vi.spyOn(reactToPhaser, 'emit');
  });

  afterEach(() => {
    cleanup();
    emitSpy.mockRestore();
    vi.unstubAllGlobals();
    createGameMock.mockClear();
    vi.mocked(runner.runStep).mockReset();
    localStorage.clear();
  });

  function begin() {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
  }

  function clickInspectBookshelf() {
    act(() => {
      phaserToReact.emit('objectHover', { id: 'bookshelf' });
      phaserToReact.emit('objectClick', { id: 'bookshelf' });
    });
    fireEvent.click(screen.getByRole('button', { name: 'Inspect Bookshelf' }));
  }

  it('Given an action changes the current scene, when Inspect is clicked on the bookshelf, then transitionTo is emitted with the new scene id', () => {
    vi.mocked(runner.runStep).mockImplementation((_content, prev) => ({
      state: { ...prev, currentScene: 'hallway' },
      events: [{ type: 'goto_scene', scene: 'hallway' }],
    }));
    begin();

    clickInspectBookshelf();

    expect(emitSpy).toHaveBeenCalledWith('transitionTo', { sceneId: 'hallway' });
  });

  it('Given an action leaves the current scene unchanged, when Inspect is clicked on the bookshelf, then no transitionTo is emitted', () => {
    vi.mocked(runner.runStep).mockImplementation((_content, prev) => ({ state: prev, events: [] }));
    begin();

    clickInspectBookshelf();

    expect(runner.runStep).toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalledWith('transitionTo', expect.anything());
  });

  it('Given the bookshelf Inspect action does not change the scene, when Inspect is clicked, then playAnimation interact is emitted and no transitionTo is emitted', () => {
    vi.mocked(runner.runStep).mockImplementation((_content, prev) => ({ state: prev, events: [] }));
    begin();

    clickInspectBookshelf();

    expect(emitSpy).toHaveBeenCalledWith('playAnimation', { target: 'boy', name: 'interact' });
    expect(emitSpy).not.toHaveBeenCalledWith('transitionTo', expect.anything());
  });
});
