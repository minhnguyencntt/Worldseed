import { beforeEach, describe, expect, it } from 'vitest';
import { useUiStore } from '../src/store/uiStore';

// Unit tests against the real uiStore (no mocks) for the sound and settings flags.
describe('uiStore sound and settings', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
  });

  it('defaults soundEnabled to true and settingsOpen to false', () => {
    const state = useUiStore.getState();
    expect(state.soundEnabled).toBe(true);
    expect(state.settingsOpen).toBe(false);
  });

  it('toggleSound sets soundEnabled to false and leaves settingsOpen false', () => {
    useUiStore.getState().toggleSound();
    const state = useUiStore.getState();
    expect(state.soundEnabled).toBe(false);
    expect(state.settingsOpen).toBe(false);
  });

  it('toggleSettings sets settingsOpen to true and leaves soundEnabled true', () => {
    useUiStore.getState().toggleSettings();
    const state = useUiStore.getState();
    expect(state.settingsOpen).toBe(true);
    expect(state.soundEnabled).toBe(true);
  });
});
