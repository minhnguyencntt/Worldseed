# UNIT-249 — Act: Remove execution state, fetch, handlers and panel from AdminApp

## Summary
Strip all execution code from AdminApp.tsx

## Description
AdminApp.tsx: drop the ExecutionPanel import and render, execution/actionError/actionDetail state, runExecutionAction, and the listExecutions call in the load effect; stepper uses round.status.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `imports` · L1-L22
- **Do:** Remove approveExecution, findExecutionForRound, listExecutions, rejectExecution, retryExecution, ExecutionInfo and ApiError-unused check from the client import (keep ApiError, used in handleError); remove the ExecutionPanel import; change the LifecycleStepper import to import { LifecycleStepper } only

```
import { LifecycleStepper } from './LifecycleStepper';
```

- **Expected:** Imports list only round, world and contribution items

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp state` · L27-L42
- **Do:** Delete the execution, actionError and actionDetail useState lines
- **Expected:** No execution state remains

### Step 3 — `game/frontend/src/components/AdminApp.tsx` · `load useEffect` · L58-L86
- **Do:** Reduce Promise.all to [getAdminRound(token, roundId), listRoundContributions(token, roundId)], destructure ([loaded, list]) and delete setExecution(exec)

```
Promise.all([getAdminRound(token, roundId), listRoundContributions(token, roundId)]).then(([loaded, list]) => {...})
```

- **Expected:** Only two requests are made on load

### Step 4 — `game/frontend/src/components/AdminApp.tsx` · `runExecutionAction` · L113-L127
- **Do:** Delete the whole runExecutionAction function
- **Expected:** Function gone

### Step 5 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp JSX` · L142-L162
- **Do:** Change the stepper to <LifecycleStepper status={round.status} /> and delete the {round ? <ExecutionPanel .../> : null} block

```
{round ? <LifecycleStepper status={round.status} /> : null}
```

- **Expected:** No panel rendered

## Acceptance criteria
- AdminApp makes no executions request
- Stepper receives round.status
- No execution identifiers remain in the file

## Definition of done
- AdminApp has no execution references
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-249.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-049
- Requirement: REQ-125
- Unit (Act): UNIT-249
- Unit (Verify): UNIT-252
- Status: completed
- Change: UPDATE
