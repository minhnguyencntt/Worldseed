# UNIT-122 — Act: Render LifecycleStepper in AdminApp from Round and execution

## Summary
Load the Round's execution and render the stepper at the derived stage

## Description
Extend AdminApp's load effect to list executions and render LifecycleStepper with deriveStage.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `imports` · L1-L13
- **Do:** Add listExecutions, findExecutionForRound and type ExecutionInfo to the '../api/client' import, and add `import { LifecycleStepper, deriveStage } from './LifecycleStepper';` after the TokenGate import.
- **Expected:** Imports resolve under tsc.

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp state` · after L25 (near the contributions useState)
- **Do:** Add `const [execution, setExecution] = useState<ExecutionInfo | undefined>(undefined);`.
- **Expected:** State available.

### Step 3 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp load useEffect` · L44-L61
- **Do:** Replace the Promise.all with three entries; the third is listExecutions(token).then(list => findExecutionForRound(list, roundId), err => { if (err instanceof ApiError && err.status === 401) throw err; return undefined; }). Destructure as [loaded, list, exec] and call setExecution(exec) next to setContributions(list).

```
Promise.all([getAdminRound(token, roundId), listRoundContributions(token, roundId), listExecutions(token).then((all) => findExecutionForRound(all, roundId), (err: unknown) => { if (err instanceof ApiError && err.status === 401) throw err; return undefined; })]).then(([loaded, list, exec]) => { ...; setExecution(exec); ... })
```

- **Expected:** Execution failure other than 401 yields undefined; 401 reaches handleError.

### Step 4 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp render` · L98-L104
- **Do:** After the closing of the `round ? ... : ...` block, render `{round ? <LifecycleStepper status={deriveStage(round.status, execution?.status)} /> : null}`.
- **Expected:** List with aria-label 'Round lifecycle' appears once the round loads.

## Acceptance criteria
- Stepper visible after token entry
- Executions 404 does not raise an error alert

## Definition of done
- Stepper rendered
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-122.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-024
- Requirement: REQ-062
- Unit (Act): UNIT-122
- Unit (Verify): UNIT-124
- Status: completed
- Change: UPDATE
