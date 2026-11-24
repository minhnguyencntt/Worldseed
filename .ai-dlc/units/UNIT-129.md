# UNIT-129 — Act: Wire execution actions in AdminApp

## Summary
Pass approve, retry and reject handlers to ExecutionPanel

## Description
Add runExecutionAction in AdminApp that calls the client, reloads, and reports errors.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `imports` · L2-L15
- **Do:** Add approveExecution, retryExecution and rejectExecution to the import list from '../api/client'.
- **Expected:** The three functions are imported

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp state` · L33
- **Do:** Add const [actionError, setActionError] = useState<string | undefined>(undefined); after the reloads state.
- **Expected:** actionError state exists

### Step 3 — `game/frontend/src/components/AdminApp.tsx` · `runExecutionAction` · after L91
- **Do:** Add async function runExecutionAction(action: (token: string, id: string) => Promise<ExecutionInfo>, id: string): clear actionError, await action(token, id), then setReloads((n) => n + 1); in catch, if err is ApiError with status 401 call handleError(err), otherwise setActionError(err instanceof Error ? err.message : 'Request failed').

```
async function runExecutionAction(action: (t: string, id: string) => Promise<ExecutionInfo>, id: string) {
  setActionError(undefined);
  try {
    await action(token, id);
    setReloads((n) => n + 1);
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) handleError(err);
    else setActionError(err instanceof Error ? err.message : 'Request failed');
  }
}
```

- **Expected:** Function compiles

### Step 4 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp render: ExecutionPanel` · L120
- **Do:** Pass onApprove={(id) => runExecutionAction(approveExecution, id)}, onRetry={(id) => runExecutionAction(retryExecution, id)}, onReject={(id) => runExecutionAction(rejectExecution, id)} and actionError={actionError} to ExecutionPanel.
- **Expected:** Panel buttons trigger the client calls

## Acceptance criteria
- Success increments reloads
- 401 shows the gate; other errors show an alert

## Definition of done
- Handlers wired
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-129.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-026
- Requirement: REQ-066
- Unit (Act): UNIT-129
- Unit (Verify): UNIT-132
- Status: completed
- Change: UPDATE
