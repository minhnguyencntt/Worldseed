// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useUiStore } from '../src/store/uiStore';

// Uses the real store (no mocks). The store has no soundEnabled/toggleSound pair,
// so the same selector-plus-toggle pattern is exercised with drawerOpen/toggleDrawer.
describe('useUiStore export', () => {
  beforeEach(() => {
    useUiStore.setState({ drawerOpen: true, modal: null });
  });

  it('is a hook with getState and setState', () => {
    expect(typeof useUiStore).toBe('function');
    expect(typeof useUiStore.getState).toBe('function');
    expect(typeof useUiStore.setState).toBe('function');
  });

  it('component re-renders when a selected value changes through an action', () => {
    function Probe() {
      return <p>{useUiStore((s) => s.drawerOpen) ? 'on' : 'off'}</p>;
    }

    render(<Probe />);
    expect(screen.getByText('on')).toBeInTheDocument();

    act(() => {
      useUiStore.getState().toggleDrawer();
    });

    expect(screen.getByText('off')).toBeInTheDocument();
  });
});
