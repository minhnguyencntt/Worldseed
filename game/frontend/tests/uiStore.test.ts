import { beforeEach, describe, expect, it } from 'vitest';
import { useUiStore } from '../src/store/uiStore';

// Uses the real useUiStore (nothing mocked). State is reset to the store's
// initial state before every test.
describe('uiStore canvas layout', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
  });

  it('Given the store is at its defaults, then canvasLayout is undefined', () => {
    expect(useUiStore.getState().canvasLayout).toBeUndefined();
  });

  it('Given the store is at its defaults, when setCanvasLayout is called, then canvasLayout stores the given layout', () => {
    const layout = { left: 1, top: 2, zoom: 3, dpr: 1 };

    useUiStore.getState().setCanvasLayout(layout);

    expect(useUiStore.getState().canvasLayout).toEqual({ left: 1, top: 2, zoom: 3, dpr: 1 });
  });
});
