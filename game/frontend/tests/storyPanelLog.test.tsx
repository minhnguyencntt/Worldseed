// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StoryPanel } from '../src/components/StoryPanel';
import type { DialogueNode } from '../../src/state/types';

const node: DialogueNode = {
  id: 'intro',
  speaker: 'boy',
  text: "I don't know what to do next. What should we do?",
  choices: [{ text: 'Look around the room' }],
};

describe('StoryPanel event log', () => {
  afterEach(() => {
    cleanup();
  });

  it('lists the history lines in order inside the Event log region', () => {
    // Given a StoryPanel whose history is ['a', 'b'],
    // when it renders,
    // then the Event log region contains a Story history list whose items read a, then b.
    render(
      <StoryPanel
        sceneTitle="The Boys Room"
        node={node}
        history={['a', 'b']}
        inventory={[]}
        onChoose={vi.fn()}
      />,
    );

    const log = screen.getByRole('region', { name: 'Event log' });
    const history = within(log).getByRole('list', { name: 'Story history' });
    const items = within(history).getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(['a', 'b']);
  });

  it('shows the empty message and no Story history list when history is empty', () => {
    // Given a StoryPanel whose history is [],
    // when it renders,
    // then the Event log region shows 'Nothing has happened yet' and no Story history list exists.
    render(
      <StoryPanel
        sceneTitle="The Boys Room"
        node={node}
        history={[]}
        inventory={[]}
        onChoose={vi.fn()}
      />,
    );

    const log = screen.getByRole('region', { name: 'Event log' });
    expect(within(log).getByText('Nothing has happened yet')).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Story history' })).toBeNull();
  });
});
