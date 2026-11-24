// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { GameLayout } from '../src/components/GameLayout';

describe('GameLayout centered dialog', () => {
  afterEach(() => {
    cleanup();
  });

  it('Given GameLayout with a header, a scene and a story, when rendered, then there is no aside, no Story toggle, the story sits in a centered sf-dialog and the scene stays mounted', () => {
    // Given GameLayout rendered with header, scene and story nodes,
    // when the DOM is queried,
    // then no aside element exists and no Story button exists,
    // the story-dialog test id is an sf-dialog element containing the story text,
    // and the scene node is in the document.
    const { container } = render(
      <GameLayout
        header={<i data-testid="h" />}
        scene={<div data-testid="scene" />}
        story={<p>Hello</p>}
      />,
    );

    expect(container.querySelector('aside')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Story' })).toBeNull();
    expect(screen.getByTestId('story-dialog')).toHaveClass('sf-dialog');
    expect(screen.getByTestId('story-dialog')).toHaveTextContent('Hello');
    expect(screen.getByTestId('scene')).toBeInTheDocument();
  });
});
