# UNIT-143 — Act: Add execution action handlers to AdminApp

## Summary
Import client functions, add runExecutionAction, pass handlers.

## Description
Edit AdminApp.tsx to import approveExecution, rejectExecution, retryExecution, add runExecutionAction and pass onApprove, onRetry, onReject to ExecutionPanel.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `imports from '../api/client'` · L2-L15
- **Do:** Add approveExecution, rejectExecution and retryExecution to the named import list from '../api/client'.

```
  ApiError,
  approveExecution,
  closeRound,
  ...
  openRound,
  rejectExecution,
  retryExecution,
```

- **Expected:** The three client functions are imported once each.

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp::runExecutionAction` · after L97
- **Do:** Add an async function runExecutionAction(action: RoundAction-like (token, id) => Promise<ExecutionInfo>, id: string) that awaits action(token, id) then calls setReloads((n) => n + 1) inside a try block; the catch block is added by the error requirement.

```
async function runExecutionAction(action: (token: string, id: string) => Promise<ExecutionInfo>, id: string) {
  try {
    await action(token, id);
    setReloads((n) => n + 1);
  } catch (err) {
    handleError(err);
  }
}
```

- **Expected:** Calling it POSTs then triggers a refetch.

### Step 3 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp ExecutionPanel JSX` · L123
- **Do:** Pass onApprove, onRetry and onReject props to ExecutionPanel, each calling runExecutionAction with the matching client function and the id argument.

```
<ExecutionPanel execution={execution} contributionCount={contributions.length} onApprove={(id) => runExecutionAction(approveExecution, id)} onRetry={(id) => runExecutionAction(retryExecution, id)} onReject={(id) => runExecutionAction(rejectExecution, id)} />
```

- **Expected:** Approve, Retry and Reject buttons appear for matching statuses and are wired.

## Acceptance criteria
- AdminApp compiles with the three handlers passed
- Each handler calls its client function with token and id then bumps reloads

## Definition of done
- npm run typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-143.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-031
- Requirement: REQ-072
- Unit (Act): UNIT-143
- Unit (Verify): UNIT-145
- Status: completed
- Change: NEW
