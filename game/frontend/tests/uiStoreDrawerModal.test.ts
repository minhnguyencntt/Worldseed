import { beforeEach, describe, expect, it } from 'vitest';
import { useUiStore } from '../src/store/uiStore';

// Uses the real useUiStore (nothing mocked). State is reset to the store's
// initial state before every test so the drawer and modal start closed.
describe('uiStore drawer and modal', () => {
  beforeEach(() => {
    useUiStore.setState(useUiStore.getInitialState(), true);
  });

  it('starts closed', () => {
    const state = useUiStore.getState();
    expect(state.drawerOpen).toBe(false);
    expect(state.modal).toBeNull();
  });

  it('toggleDrawer flips', () => {
    useUiStore.getState().toggleDrawer();
    expect(useUiStore.getState().drawerOpen).toBe(true);

    useUiStore.getState().toggleDrawer();
    expect(useUiStore.getState().drawerOpen).toBe(false);
  });

  it('openModal and closeModal', () => {
    useUiStore.getState().openModal('contribution');
    expect(useUiStore.getState().modal).toBe('contribution');

    useUiStore.getState().closeModal();
    expect(useUiStore.getState().modal).toBeNull();
  });
});
