// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Phaser cannot run in jsdom, so the Phaser host, the boot scene and the
// Phaser module are replaced with inert fakes. The React side is real.
type FakeGame = {
  destroy: ReturnType<typeof vi.fn>;
  scale: { refresh: ReturnType<typeof vi.fn>; setZoom: ReturnType<typeof vi.fn> };
};

const { createGameMock, performActionMock } = vi.hoisted(() => {
  const createGameMock = vi.fn((): FakeGame => ({
    destroy: vi.fn(),
    scale: { refresh: vi.fn(), setZoom: vi.fn() },
  }));
  const performActionMock = vi.fn();
  return { createGameMock, performActionMock };
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

// Only performAction is replaced, so the scene change is controlled by each test.
// getSceneView stays real so the bookshelf actions still render from the real scene content.
vi.mock('@game/engine/scene', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@game/engine/scene')>();
  return { ...actual, performAction: performActionMock };
});

import App from '../src/App';
import { reactToPhaser, phaserToReact } from '../src/phaser/events';

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
    performActionMock.mockReset();
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
    performActionMock.mockImplementation((prev: { currentScene: string }) => ({
      ...prev,
      currentScene: 'hallway',
    }));
    begin();

    clickInspectBookshelf();

    expect(emitSpy).toHaveBeenCalledWith('transitionTo', { sceneId: 'hallway' });
  });

  it('Given an action leaves the current scene unchanged, when Inspect is clicked on the bookshelf, then no transitionTo is emitted', () => {
    performActionMock.mockImplementation((prev: unknown) => prev);
    begin();

    clickInspectBookshelf();

    expect(performActionMock).toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalledWith('transitionTo', expect.anything());
  });
});
