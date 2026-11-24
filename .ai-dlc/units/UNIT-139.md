# UNIT-139 — Act: Add execution action handlers to AdminApp

## Summary
runExecutionAction calls the client function, reloads and is passed to ExecutionPanel

## Description
Import approveExecution, retryExecution, rejectExecution in AdminApp.tsx. Add a runExecutionAction helper modelled on runRoundAction, and pass onApprove, onRetry and onReject to ExecutionPanel.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `import block from '../api/client'` · L2-L15
- **Do:** Add approveExecution, rejectExecution and retryExecution to the value imports from '../api/client' in alphabetical position.

```
import { ApiError, approveExecution, closeRound, ..., openRound, rejectExecution, retryExecution, WORLD_ID, ... }
```

- **Expected:** The three client functions are importable in AdminApp.tsx

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `type ExecutionAction and AdminApp.runExecutionAction` · after L17 (type) and after runRoundAction L90-L98
- **Do:** Add type ExecutionAction = (token: string, id: string) => Promise<ExecutionInfo>. Inside AdminApp, after runRoundAction, add async function runExecutionAction(action: ExecutionAction, id: string) that awaits action(token, id) in try and then calls setReloads((n) => n + 1); in catch it calls handleError(err).

```
async function runExecutionAction(action: ExecutionAction, id: string) {
  try {
    await action(token, id);
    setReloads((n) => n + 1);
  } catch (err) {
    handleError(err);
  }
}
```

- **Expected:** Calling it posts to the endpoint and triggers a reload

### Step 3 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp return: <ExecutionPanel>` · L130
- **Do:** Pass onApprove={(id) => runExecutionAction(approveExecution, id)}, onRetry={(id) => runExecutionAction(retryExecution, id)} and onReject={(id) => runExecutionAction(rejectExecution, id)} to ExecutionPanel.

```
<ExecutionPanel execution={execution} contributionCount={contributions.length} onApprove={...} onRetry={...} onReject={...} />
```

- **Expected:** Approve/Reject buttons render for AWAITING_APPROVAL and Retry for FAILED

## Acceptance criteria
- ExecutionPanel receives onApprove, onRetry and onReject from AdminApp
- Each handler awaits the client call and then increments reloads

## Definition of done
- Handlers passed to ExecutionPanel
- npm run typecheck passes in game/frontend
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-139.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-030
- Requirement: REQ-070
- Unit (Act): UNIT-139
- Unit (Verify): UNIT-141
- Status: completed
- Change: UPDATE
