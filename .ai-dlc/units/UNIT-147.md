# UNIT-147 — Act: Clear action error state in the handleError 401 branch

## Summary
handleError on 401 also calls setActionError and setActionDetail with undefined.

## Description
Edit handleError in AdminApp.tsx so the 401 branch clears the action error state together with the token.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp::handleError` · L85-L92
- **Do:** In the 401 branch, after setToken(''), add setActionError(undefined) and setActionDetail(undefined) before setGateError('Invalid token').

```
setToken('');
setActionError(undefined);
setActionDetail(undefined);
setGateError('Invalid token');
```

- **Expected:** A 401 leaves actionError and actionDetail undefined.

## Acceptance criteria
- The 401 branch calls setActionError(undefined) and setActionDetail(undefined).
- Non-401 errors still call setError.

## Definition of done
- Code change applied
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-147.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-032
- Requirement: REQ-074
- Unit (Act): UNIT-147
- Unit (Verify): UNIT-149
- Status: completed
- Change: UPDATE
