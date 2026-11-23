import { describe, expect, it } from 'vitest';
import { deriveStage } from '../src/components/LifecycleStepper';

describe('deriveStage', () => {
  it.each([
    ['OPEN', undefined, 'OPEN'],
    ['CLOSED', 'RUNNING', 'DEVELOPING'],
    ['CLOSED', 'AWAITING_APPROVAL', 'PUBLISHING'],
    ['CLOSED', 'APPROVED', 'PUBLISHING'],
    ['CLOSED', 'COMPLETED', 'COMPLETED'],
    ['CLOSED', 'FAILED', 'CLOSED'],
    ['CLOSED', 'QUEUED', 'CLOSED'],
    ['PUBLISHING', 'RUNNING', 'PUBLISHING'],
    ['BUILDING', 'RUNNING', 'BUILDING'],
  ])(
    'given round status %s and execution status %s, derives stage %s',
    (roundStatus, executionStatus, expected) => {
      expect(deriveStage(roundStatus, executionStatus)).toBe(expected);
    },
  );
});
