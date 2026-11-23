// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { GameLayout } from '../src/components/GameLayout';

describe('GameLayout header slot', () => {
  afterEach(() => {
    cleanup();
  });

  it('header inside main: Given GameLayout with a header, a scene and a story, when rendered, then the header renders inside main and not inside the aside', () => {
    // Given GameLayout rendered with header, scene and story nodes,
    // when the header test id is queried,
    // then it is a descendant of the main column and not a descendant of the aside drawer.
    const { container } = render(
      <GameLayout
        header={<div data-testid="hdr" />}
        scene={<div data-testid="scene-node" />}
        story={<div data-testid="story-node" />}
      />,
    );

    const main = container.querySelector('main');
    const aside = container.querySelector('aside');
    expect(main).not.toBeNull();
    expect(aside).not.toBeNull();

    const header = screen.getByTestId('hdr');
    expect(within(main as HTMLElement).getByTestId('hdr')).toBe(header);
    expect(aside).not.toContainElement(header);
  });

  it('omitted header leaves layout unchanged: Given GameLayout without a header, when rendered, then scene and story nodes are present and no header node exists', () => {
    // Given GameLayout rendered with only scene and story nodes,
    // when the DOM is queried,
    // then the scene node and the story node are present,
    // and no element with the header test id is rendered.
    render(<GameLayout scene={<div data-testid="scene-node" />} story={<div data-testid="story-node" />} />);

    expect(screen.getByTestId('scene-node')).toBeInTheDocument();
    expect(screen.getByTestId('story-node')).toBeInTheDocument();
    expect(screen.queryByTestId('hdr')).toBeNull();
  });
});
