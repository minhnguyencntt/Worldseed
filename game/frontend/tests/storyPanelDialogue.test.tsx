// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StoryPanel } from '../src/components/StoryPanel';
import { scene } from '../src/runtime/content';
import { useGameStore } from '../src/store/gameStore';
import { runStep } from '../../src/systems/runner';
import type { GameState } from '../../src/state/types';

// bedroom.yaml only has boy-spoken nodes. A speaker without a portrait is needed to cover the
// no-portrait branch, so the bundled scene gets one extra 'whisper' node (speaker 'ghost').
vi.mock('../src/runtime/content', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../src/runtime/content')>();
  return {
    ...actual,
    scene: {
      ...actual.scene,
      dialogue: [
        ...actual.scene.dialogue,
        {
          id: 'whisper',
          speaker: 'ghost',
          text: 'Behind you...',
          choices: [{ text: 'Turn around' }, { text: 'Keep still' }],
        },
      ],
    },
  };
});

// Seeds the shared game store the way the app does: hydrate a fresh state, then apply the patch.
function seed(patch: Partial<GameState> = {}) {
  useGameStore.getState().hydrate();
  useGameStore.getState().setState((prev) => ({ ...prev, ...patch }));
}

describe('StoryPanel dialogue card', () => {
  afterEach(() => {
    cleanup();
  });

  it('shows a 32px boy portrait inside the Dialogue region', () => {
    // Given the store's active node is spoken by 'boy',
    // when StoryPanel renders it,
    // then an img of width 32 pointing at boy-portrait.png is inside the Dialogue region.
    seed();
    render(<StoryPanel />);

    const dialogue = screen.getByRole('region', { name: 'Dialogue' });
    // alt="" makes the img role "presentation", so locate it by tag inside the region.
    const img = dialogue.querySelector('img');
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute('width', '32');
    expect(img!.getAttribute('src')).toMatch(/boy-portrait\.png$/);
  });

  it('renders no portrait image for a speaker without a manifest portrait, but keeps speaker and line', () => {
    // Given the active node is spoken by 'ghost', which has no portrait,
    // when StoryPanel renders it,
    // then no img is rendered and the speaker name and line still appear.
    seed({ activeDialogue: 'whisper' });
    const { container } = render(<StoryPanel />);

    expect(container.querySelector('img[src*="boy-portrait"]')).toBeNull();
    expect(container.querySelector('.dialogue img')).toBeNull();
    const dialogue = screen.getByRole('region', { name: 'Dialogue' });
    expect(within(dialogue).getByRole('heading', { level: 2, name: 'ghost' })).toBeInTheDocument();
    expect(within(dialogue).getByText('Behind you...')).toBeInTheDocument();
  });

  it('shows the second choice of the boy node as a button in the Choices list', () => {
    // Given the active node has two choices,
    // when StoryPanel renders,
    // then the Choices list holds exactly two buttons, the second reading "Let's explore".
    seed();
    render(<StoryPanel />);

    const choices = screen.getByRole('list', { name: 'Choices' });
    const buttons = within(choices).getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[1]).toHaveTextContent("Let's explore");
  });

  it('choice click advances: clicking the first choice moves the store to the runStep outcome', () => {
    // Given the store holds the opening state (active node 'intro', empty history),
    // when the first choice button is clicked,
    // then the store changes to exactly what runStep returns for choice 0:
    // the history gains the choice text and the dialogue pointer moves to 'look-around'.
    seed();
    const before = useGameStore.getState().state!;
    const expected = runStep({ scene }, before, { type: 'choose', index: 0 }).state;

    render(<StoryPanel />);
    fireEvent.click(screen.getByRole('button', { name: 'Look around the room' }));

    const after = useGameStore.getState().state!;
    expect(after).not.toBe(before);
    expect(after.activeDialogue).toBe('look-around');
    expect(after.history).toEqual(['Look around the room']);
    expect(after).toEqual(expected);
  });

  it('choosing the second choice moves the dialogue pointer to the explore node', () => {
    // Given the active node has two choices,
    // when the second choice button is clicked,
    // then the store's dialogue pointer moves to 'explore'.
    seed();
    render(<StoryPanel />);

    const choices = screen.getByRole('list', { name: 'Choices' });
    fireEvent.click(within(choices).getAllByRole('button')[1]);

    expect(useGameStore.getState().state?.activeDialogue).toBe('explore');
  });

  it('shows the scene title heading and no Dialogue region when there is no node', () => {
    // Given the store has no active dialogue node,
    // when StoryPanel renders,
    // then the scene title (scene.title from runtime/content) is an h1 and no Dialogue region exists.
    seed({ activeDialogue: null });
    render(<StoryPanel />);

    expect(screen.getByRole('heading', { level: 1, name: scene.title })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Dialogue' })).not.toBeInTheDocument();
  });

  it('gives the panel root the sf-frame-panel class', () => {
    // Given any StoryPanel render,
    // when inspecting the root element,
    // then it carries the sf-frame-panel class.
    seed();
    const { container } = render(<StoryPanel />);

    expect(container.firstElementChild).toHaveClass('sf-frame-panel');
  });
});
