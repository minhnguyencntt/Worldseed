import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import * as mod from '../src/components/LifecycleStepper';
import { LifecycleStepper } from '../src/components/LifecycleStepper';

afterEach(() => {
  cleanup();
});

describe('LifecycleStepper module', () => {
  it('exports no deriveStage execution helper and keeps stageIndex for CLOSED', () => {
    expect((mod as Record<string, unknown>).deriveStage).toBeUndefined();
    expect(mod.stageIndex('CLOSED')).toBe(1);
  });

  it('renders CLOSED as the current step and OPEN as done', () => {
    const { container } = render(<LifecycleStepper status="CLOSED" />);

    const items = Array.from(container.querySelectorAll('li'));
    const closed = items.find((li) => li.textContent === 'CLOSED');
    const open = items.find((li) => li.textContent === 'OPEN');

    expect(closed?.getAttribute('aria-current')).toBe('step');
    expect(open?.getAttribute('data-state')).toBe('done');
  });

  it('contains no execution wording in the component source', () => {
    // Run from game/frontend (see the verify command); jsdom's URL global is not a file: URL.
    const source = readFileSync(resolve(process.cwd(), 'src/components/LifecycleStepper.tsx'), 'utf8');

    expect(source.toLowerCase()).not.toContain('execution');
  });
});
