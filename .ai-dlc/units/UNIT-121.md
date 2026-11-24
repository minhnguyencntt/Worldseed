# UNIT-121 — Act: Add deriveStage to LifecycleStepper module

## Summary
Export deriveStage combining Round and execution status

## Description
Add a pure exported function deriveStage in LifecycleStepper.tsx that returns the later of the Round stage and the execution stage.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/LifecycleStepper.tsx` · `new: EXECUTION_STAGES` · after L13
- **Do:** Add a Record<string,string> constant mapping execution statuses to stages: RUNNING→DEVELOPING, AWAITING_APPROVAL→PUBLISHING, APPROVED→PUBLISHING, COMPLETED→COMPLETED.

```
const EXECUTION_STAGES: Record<string, string> = {
  RUNNING: 'DEVELOPING',
  AWAITING_APPROVAL: 'PUBLISHING',
  APPROVED: 'PUBLISHING',
  COMPLETED: 'COMPLETED',
};
```

- **Expected:** Constant exists; QUEUED and FAILED are absent so they add nothing.

### Step 2 — `game/frontend/src/components/LifecycleStepper.tsx` · `new: deriveStage` · after L19
- **Do:** Add exported function deriveStage(roundStatus: string, executionStatus?: string): string. Compute execStage = executionStatus ? EXECUTION_STAGES[executionStatus] : undefined. If execStage is undefined return roundStatus. If stageIndex(execStage) > stageIndex(roundStatus) return execStage; otherwise return roundStatus.

```
export function deriveStage(roundStatus: string, executionStatus?: string): string {
  const execStage = executionStatus ? EXECUTION_STAGES[executionStatus] : undefined;
  if (!execStage) return roundStatus;
  return stageIndex(execStage) > stageIndex(roundStatus) ? execStage : roundStatus;
}
```

- **Expected:** deriveStage('CLOSED','RUNNING') === 'DEVELOPING'; deriveStage('PUBLISHING','RUNNING') === 'PUBLISHING'; deriveStage('OPEN') === 'OPEN'.

## Acceptance criteria
- deriveStage('CLOSED','RUNNING') returns 'DEVELOPING'
- deriveStage('OPEN') returns 'OPEN'

## Definition of done
- deriveStage exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-121.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-024
- Requirement: REQ-061
- Unit (Act): UNIT-121
- Unit (Verify): UNIT-123
- Status: completed
- Change: UPDATE
