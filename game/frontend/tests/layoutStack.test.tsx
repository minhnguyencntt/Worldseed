// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { GameLayout } from '../src/components/GameLayout';
import { useUiStore } from '../src/store/uiStore';

describe('GameLayout UI stack usage', () => {
  beforeEach(() => {
    useUiStore.setState({ drawerOpen: false });
  });

  afterEach(() => {
    cleanup();
  });

  it('toggle renders Lucide icon and sets aside data-state to open', () => {
    // Given GameLayout with a scene and a story,
    // when the Story toggle is clicked,
    // then the toggle shows an SVG icon, the aside reports data-state open and the scene main has pb-12 while the scene stays in the document.
    const { container } = render(
      <GameLayout scene={<div data-testid="scene-node">Scene</div>} story={<div />} />,
    );

    const toggle = screen.getByRole('button', { name: 'Story' });
    expect(toggle.querySelector('svg')).not.toBeNull();

    fireEvent.click(toggle);

    const aside = container.querySelector('aside');
    expect(aside).not.toBeNull();
    expect(aside).toHaveAttribute('data-state', 'open');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const main = container.querySelector('main');
    expect(main).toHaveClass('pb-12');
    expect(screen.getByTestId('scene-node')).toBeInTheDocument();
  });
});

describe('package.json UI stack manifest', () => {
  it('package.json lists the UI stack', () => {
    // Given the frontend package.json on disk,
    // when it is parsed,
    // then runtime dependencies and styling dev dependencies for the UI stack are declared.
    const pkg = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
    ) as { dependencies?: Record<string, string>; devDependencies?: Record<string, string> };

    const deps = Object.keys(pkg.dependencies ?? {});
    const devDeps = Object.keys(pkg.devDependencies ?? {});

    for (const name of [
      'lucide-react',
      'motion',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      '@radix-ui/react-slot',
      '@radix-ui/react-dialog',
    ]) {
      expect(deps).toContain(name);
    }

    for (const name of ['tailwindcss', 'postcss', 'autoprefixer']) {
      expect(devDeps).toContain(name);
    }
  });
});
