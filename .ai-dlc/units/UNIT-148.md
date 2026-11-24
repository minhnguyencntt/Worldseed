# UNIT-148 — Act: Reset round, execution and contributions in the 401 branch

## Summary
handleError on 401 also resets the loaded data.

## Description
Extend the handleError 401 branch to reset the loaded round, execution and contributions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp::handleError` · L85-L92
- **Do:** In the 401 branch, after setToken(''), add setRound(undefined), setExecution(undefined) and setContributions([]).

```
setToken('');
setRound(undefined);
setExecution(undefined);
setContributions([]);
```

- **Expected:** The gate is shown and, after re-entry, the page starts at 'Loading round…'.

## Acceptance criteria
- After a 401 the round is undefined, the execution is undefined and contributions is [].
- The reloads counter and roundId are unchanged.

## Definition of done
- Code change applied
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-148.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-032
- Requirement: REQ-075
- Unit (Act): UNIT-148
- Unit (Verify): UNIT-150
- Status: completed
- Change: UPDATE
