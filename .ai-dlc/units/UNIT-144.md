# UNIT-144 — Act: Show execution action failures through actionError

## Summary
Add actionError state and pass it to ExecutionPanel.

## Description
Add actionError state to AdminApp, clear on start/success, set on non-401 failure with 'Request failed' fallback, route 401 to handleError, pass to ExecutionPanel.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp state` · after L33
- **Do:** Add state hook for actionError.

```
const [actionError, setActionError] = useState<string | undefined>(undefined);
```

- **Expected:** actionError state exists.

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp::runExecutionAction` · the function added by the handlers Act
- **Do:** Edit the existing runExecutionAction (do not declare a second one): call setActionError(undefined) before the await and again after success; in catch, if err is an ApiError with status 401 call handleError(err), else setActionError(err instanceof Error ? err.message : 'Request failed').

```
} catch (err) {
  if (err instanceof ApiError && err.status === 401) {
    handleError(err);
    return;
  }
  setActionError(err instanceof Error ? err.message : 'Request failed');
}
```

- **Expected:** Failures populate actionError except 401.

### Step 3 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp ExecutionPanel JSX` · the ExecutionPanel line
- **Do:** Add the prop actionError={actionError} to the existing ExecutionPanel element.

```
actionError={actionError}
```

- **Expected:** The message renders in ExecutionPanel's role=alert paragraph.

## Acceptance criteria
- Non-401 failures set actionError
- 401 failures invoke handleError and leave actionError empty

## Definition of done
- npm run typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-144.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-031
- Requirement: REQ-073
- Unit (Act): UNIT-144
- Unit (Verify): UNIT-146
- Status: completed
- Change: NEW
