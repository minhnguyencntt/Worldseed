# UNIT-274 — Act: Delete deriveStage and EXECUTION_STAGES from LifecycleStepper

## Summary
Remove the unused execution helpers from LifecycleStepper.tsx

## Description
Delete the EXECUTION_STAGES map and the deriveStage function from game/frontend/src/components/LifecycleStepper.tsx. Nothing in game/frontend/src imports deriveStage; only AdminApp imports LifecycleStepper.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/LifecycleStepper.tsx` · `EXECUTION_STAGES` · L16-L21
- **Do:** Delete the const EXECUTION_STAGES Record and the blank line after it.

```
const EXECUTION_STAGES: Record<string, string> = { RUNNING: ..., AWAITING_APPROVAL: ..., APPROVED: ..., COMPLETED: ... }; -> (removed)
```

- **Expected:** No EXECUTION_STAGES identifier remains in the file.

### Step 2 — `game/frontend/src/components/LifecycleStepper.tsx` · `deriveStage` · L29-L37
- **Do:** Delete the deriveStage function together with its JSDoc comment, leaving stageIndex and LifecycleStepper untouched.

```
export function deriveStage(roundStatus: string, executionStatus?: string): string {...} -> (removed)
```

- **Expected:** The file exports only STAGES, stageIndex, LifecycleStepperProps and LifecycleStepper.

## Acceptance criteria
- Given the file after the change, when it is read, then deriveStage and EXECUTION_STAGES are absent
- Given the file after the change, when tsc runs, then it passes

## Definition of done
- Execution helpers are removed and the frontend type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-274.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-055
- Requirement: REQ-137
- Unit (Act): UNIT-274
- Unit (Verify): UNIT-276
- Status: completed
- Change: UPDATE
