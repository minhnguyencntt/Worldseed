// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StoryPanel } from '../src/components/StoryPanel';
import type { DialogueNode } from '../../src/state/types';

const node: DialogueNode = {
  id: 'intro',
  speaker: 'boy',
  text: 'What should we do?',
  choices: [{ text: 'Look around the room' }],
};

function renderPanel(inventory: string[]) {
  render(<StoryPanel node={node} history={[]} inventory={inventory} onChoose={vi.fn()} />);
  return within(screen.getByRole('region', { name: 'Inventory' }));
}

describe('new: StoryPanel inventory grid', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders six empty slots with no icons when the inventory is empty', () => {
    // Given an empty inventory,
    // when StoryPanel renders,
    // then the Inventory region shows six list items, all empty, with no images.
    const inventory = renderPanel([]);
    const slots = inventory.getAllByRole('listitem');
    expect(slots).toHaveLength(6);
    for (const slot of slots) {
      expect(slot).toHaveAttribute('data-empty', 'true');
    }
    expect(inventory.queryByRole('img')).not.toBeInTheDocument();
  });

  it('shows the item name and a 16px icon in the first slot, leaving five slots empty', () => {
    // Given an inventory holding 'old-key',
    // when StoryPanel renders,
    // then the first slot shows 'Old Key' with a 16px icon and the other five slots are empty.
    const inventory = renderPanel(['old-key']);
    const slots = inventory.getAllByRole('listitem');
    expect(slots).toHaveLength(6);
    expect(slots[0]).toHaveTextContent('Old Key');
    expect(slots[0]).toHaveAttribute('data-empty', 'false');
    const icon = slots[0].querySelector('img');
    expect(icon).not.toBeNull();
    expect(icon).toHaveAttribute('width', '16');
    for (const slot of slots.slice(1)) {
      expect(slot).toHaveAttribute('data-empty', 'true');
    }
  });

  it('lays the slots out in a three-column grid', () => {
    // Given any inventory,
    // when StoryPanel renders,
    // then the slot list has the grid-cols-3 class.
    const inventory = renderPanel([]);
    const list = inventory.getAllByRole('listitem')[0].parentElement;
    expect(list).toHaveClass('grid-cols-3');
  });
});
