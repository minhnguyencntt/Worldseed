import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ExecutionPanel } from '../src/components/ExecutionPanel';
import { LifecycleStepper, STAGES } from '../src/components/LifecycleStepper';
import { executionFixture } from './fixtures/api';

afterEach(() => {
  cleanup();
});

function stepItems(container: HTMLElement): HTMLLIElement[] {
  return Array.from(container.querySelectorAll('li'));
}

const failedExecution = { ...executionFixture, status: 'FAILED', error: 'build failed' };

describe('LifecycleStepper and ExecutionPanel', () => {
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

  describe('ExecutionPanel', () => {
    it('shows the failure reason from the execution error', () => {
      render(<ExecutionPanel execution={failedExecution} contributionCount={0} />);

      expect(screen.getByRole('alert').textContent).toBe('Failure reason: build failed');
    });

    it('shows Not available for logs, test results and release version when those fields are absent', () => {
      render(<ExecutionPanel execution={executionFixture} contributionCount={0} />);

      expect(screen.getAllByText('Not available')).toHaveLength(3);
    });

    it('shows the contribution count', () => {
      render(<ExecutionPanel execution={executionFixture} contributionCount={3} />);

      expect(screen.getByText('Contributions: 3')).toBeTruthy();
    });
  });
});
