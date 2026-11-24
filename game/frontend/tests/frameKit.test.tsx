// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import * as uiFrames from '../src/art/uiFrames';
import { FRAME_KIT } from '../src/art/uiFrames';
import { Button, type ButtonState } from '../src/components/ui/button';
import { Frame } from '../src/components/ui/Frame';
import { GameLayout } from '../src/components/GameLayout';
import { HeaderOverlay } from '../src/components/HeaderOverlay';
import { StoryPanel } from '../src/components/StoryPanel';
import { useUiStore } from '../src/store/uiStore';
import type { DialogueNode } from '../src/state/types';

describe('frame kit', () => {
  afterEach(() => {
    cleanup();
  });

  it('frame classes use border-image and pixelated', () => {
    // Given the frame kit generator exported from the frame sources,
    // when frameComponentClasses is called,
    // then each sf-frame class is pixelated with a border-image from its FRAME_KIT file and slice,
    // and the sf-btn states carry distinct border-image values.
    const frameComponentClasses = (uiFrames as Record<string, unknown>).frameComponentClasses;
    expect(typeof frameComponentClasses, 'frameComponentClasses must be exported from src/art/uiFrames').toBe('function');

    const classes = (frameComponentClasses as () => Record<string, Record<string, string>>)();

    for (const name of ['bar', 'panel', 'plaque', 'parchment', 'slot']) {
      const entry = FRAME_KIT.find((f) => f.file === name);
      expect(entry, `FRAME_KIT entry for ${name}`).toBeDefined();
      const rule = classes[`.sf-frame-${name}`];
      expect(rule, `.sf-frame-${name} rule`).toBeDefined();
      expect(rule.imageRendering).toBe('pixelated');
      expect(rule.borderImage).toContain(name);
      expect(rule.borderImage).toContain(String(entry!.slice));
    }

    const selectors = ['.sf-btn', '.sf-btn:disabled', ".sf-btn[data-state='hover']", ".sf-btn[data-state='pressed']"];
    for (const selector of selectors) {
      expect(classes[selector], `${selector} rule`).toBeDefined();
      expect(classes[selector].borderImage, `${selector} borderImage`).toBeDefined();
    }
    const values = selectors.map((s) => classes[s]?.borderImage);
    expect(new Set(values).size).toBe(selectors.length);
  });

  it('button shows four states', () => {
    // Given a frame Button rendered in each of the four states,
    // when it is rendered,
    // then each has the sf-btn class and its data-state, the disabled one is disabled,
    // and a Frame of kind panel carries the sf-frame-panel class.
    const states: ButtonState[] = ['normal', 'hover', 'pressed', 'disabled'];
    for (const state of states) {
      const { unmount } = render(
        <Button variant="frame" state={state}>
          {state}
        </Button>,
      );
      const button = screen.getByRole('button', { name: state });
      expect(button).toHaveClass('sf-btn');
      expect(button).toHaveAttribute('data-state', state);
      if (state === 'disabled') {
        expect(button).toBeDisabled();
      } else {
        expect(button).not.toBeDisabled();
      }
      unmount();
    }

    const { container } = render(<Frame kind="panel">Panel</Frame>);
    expect(container.firstElementChild).toHaveClass('sf-frame-panel');
  });

  it('game screen components apply the kit', () => {
    // Given the game layout, header overlay and story panel rendered with the kit props,
    // when they are rendered,
    // then the centered story dialog is a sf-frame-panel, the header is a sf-frame-bar with an sf-btn Settings button,
    // the story panel root is a sf-frame-panel without the legacy bg-stone-900 or border-amber-900 classes,
    // the Event log region is a sf-frame-plaque, every inventory slot is a sf-frame-slot,
    // and the Dialogue region is a sf-frame-parchment.
    useUiStore.setState({ drawerOpen: false, soundEnabled: true });

    const layout = render(
      <GameLayout header={<div>Header</div>} scene={<div>Scene</div>} story={<div>Story</div>} />,
    );
    expect(layout.getByTestId('story-dialog')).toHaveClass('sf-frame-panel');
    layout.unmount();

    const header = render(<HeaderOverlay worldTitle="W" />);
    const bar = header.container.querySelector('header');
    expect(bar).toHaveClass('sf-frame-bar');
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveClass('sf-btn');
    header.unmount();

    const node = {
      speaker: 'Guide',
      text: 'Hello there.',
      choices: [],
    } as unknown as DialogueNode;
    const story = render(
      <StoryPanel
        sceneTitle="Room"
        node={node}
        history={[]}
        inventory={['Key']}
        onChoose={() => {}}
      />,
    );
    const root = story.container.firstElementChild as HTMLElement;
    expect(root).toHaveClass('sf-frame-panel');
    expect(root.className).not.toContain('bg-stone-900');
    expect(root.className).not.toContain('border-amber-900');
    expect(screen.getByRole('region', { name: 'Event log' })).toHaveClass('sf-frame-plaque');
    const inventory = screen.getByRole('region', { name: 'Inventory' });
    const slots = within(inventory).getAllByRole('listitem');
    expect(slots).toHaveLength(6);
    for (const slot of slots) {
      expect(slot).toHaveClass('sf-frame-slot');
    }
    expect(screen.getByRole('region', { name: 'Dialogue' })).toHaveClass('sf-frame-parchment');
    story.unmount();
  });
});
