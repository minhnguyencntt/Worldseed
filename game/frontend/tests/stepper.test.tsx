import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { LifecycleStepper, STAGES } from '../src/components/LifecycleStepper';

afterEach(() => {
  cleanup();
});

function stepItems(container: HTMLElement): HTMLLIElement[] {
  return Array.from(container.querySelectorAll('li'));
}

describe('LifecycleStepper', () => {
  it.each(STAGES.map((stage) => [stage, stage]))('marks %s as the single current step when status is %s', (stage) => {
    const { container } = render(<LifecycleStepper status={stage} />);

    const current = container.querySelectorAll('li[aria-current="step"]');
    expect(current).toHaveLength(1);
    expect(current[0].textContent).toBe(stage);
  });

  it('marks stages before DEVELOPING as done and later stages as pending', () => {
    const { container } = render(<LifecycleStepper status="DEVELOPING" />);
    const items = stepItems(container);

    expect(items.slice(0, 3).map((li) => li.textContent)).toEqual(['OPEN', 'CLOSED', 'ANALYZING']);
    items.slice(0, 3).forEach((li) => expect(li.getAttribute('data-state')).toBe('done'));

    expect(items.slice(4).map((li) => li.textContent)).toEqual(['TESTING', 'PUBLISHING', 'COMPLETED']);
    items.slice(4).forEach((li) => expect(li.getAttribute('data-state')).toBe('pending'));
  });

  it('maps the legacy BUILDING status to the TESTING step', () => {
    const { container } = render(<LifecycleStepper status="BUILDING" />);
    const current = container.querySelectorAll('li[aria-current="step"]');

    expect(current).toHaveLength(1);
    expect(current[0].textContent).toBe('TESTING');
  });
});
