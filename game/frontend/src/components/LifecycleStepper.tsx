export const STAGES = [
  'OPEN',
  'CLOSED',
  'ANALYZING',
  'DEVELOPING',
  'TESTING',
  'PUBLISHING',
  'COMPLETED',
] as const;

const STATUS_ALIASES: Record<string, string> = {
  PLANNING: 'DEVELOPING',
  BUILDING: 'TESTING',
};

const EXECUTION_STAGES: Record<string, string> = {
  RUNNING: 'DEVELOPING',
  AWAITING_APPROVAL: 'PUBLISHING',
  APPROVED: 'PUBLISHING',
  COMPLETED: 'COMPLETED',
};

/** Returns the index of the lifecycle stage for a Round status, or -1 when unknown. */
export function stageIndex(status: string): number {
  const mapped = STATUS_ALIASES[status] ?? status;
  return (STAGES as readonly string[]).indexOf(mapped);
}

/**
 * Returns the later of the Round stage and the stage implied by the execution status.
 * Unmapped execution statuses (e.g. QUEUED, FAILED) leave the Round stage unchanged.
 */
export function deriveStage(roundStatus: string, executionStatus?: string): string {
  const execStage = executionStatus ? EXECUTION_STAGES[executionStatus] : undefined;
  if (!execStage) return roundStatus;
  return stageIndex(execStage) > stageIndex(roundStatus) ? execStage : roundStatus;
}

export interface LifecycleStepperProps {
  status: string;
}

export function LifecycleStepper({ status }: LifecycleStepperProps) {
  const current = stageIndex(status);

  return (
    <ol aria-label="Round lifecycle" className="lifecycle-stepper">
      {STAGES.map((stage, index) => {
        const state = current === -1 ? 'pending' : index < current ? 'done' : index === current ? 'current' : 'pending';
        return (
          <li
            key={stage}
            data-state={state}
            aria-current={state === 'current' ? 'step' : undefined}
          >
            {stage}
          </li>
        );
      })}
    </ol>
  );
}
