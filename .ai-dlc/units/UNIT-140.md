# UNIT-140 — Act: Show execution action failures through actionError

## Summary
AdminApp keeps an actionError state set on failed actions and cleared on success

## Description
Add actionError state to AdminApp.tsx, set it in runExecutionAction's catch for non-401 errors, clear it on success, and pass it to ExecutionPanel as actionError.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp state` · L33
- **Do:** Add const [actionError, setActionError] = useState<string | undefined>(undefined); after the reloads state.

```
const [actionError, setActionError] = useState<string | undefined>(undefined);
```

- **Expected:** State exists, initially undefined

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp.runExecutionAction` · the helper added by the handlers unit
- **Do:** In the try block call setActionError(undefined) after the action succeeds. In the catch block, if err is an ApiError with status 401 call handleError(err); otherwise call setActionError(err instanceof Error ? err.message : 'Request failed').

```
catch (err) {
  if (err instanceof ApiError && err.status === 401) handleError(err);
  else setActionError(err instanceof Error ? err.message : 'Request failed');
}
```

- **Expected:** Non-401 failures set actionError; 401 returns to the gate

### Step 3 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp return: <ExecutionPanel>` · L130
- **Do:** Add the prop actionError={actionError} to ExecutionPanel.

```
<ExecutionPanel ... actionError={actionError} />
```

- **Expected:** The message renders with role alert in the Execution region

## Acceptance criteria
- A failed action shows its message in the Execution region
- A 401 still shows the token gate
- A successful action clears the message

## Definition of done
- actionError state wired
- npm run typecheck passes in game/frontend
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-140.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-030
- Requirement: REQ-071
- Unit (Act): UNIT-140
- Unit (Verify): UNIT-142
- Status: completed
- Change: UPDATE
