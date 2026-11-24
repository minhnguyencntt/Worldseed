# UNIT-616 — Act: Add describeRoundError, empty mapping and retry to App

## Summary
Refactor App round loading into a reusable loader with error mapping and retry

## Description
Implement loadRound, describeRoundError and wire onRetry to HeaderOverlay. Product code only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `new: describeRoundError` · after L12
- **Do:** Add exported function describeRoundError(e: unknown): string returning `Round service returned ${e.status}` plus `: ${e.detail}` if present for ApiError, 'Could not reach the server' for TypeError, otherwise 'Round request failed'.

```
export function describeRoundError(e: unknown): string {...}
```

- **Expected:** Function maps each error kind to a message

### Step 2 — `game/frontend/src/App.tsx` · `App useEffect / loadRound` · L21-L28
- **Do:** Replace the effect body with a useCallback loadRound that sets loading true and clears roundError, calls getCurrentRound, sets round on success, on ApiError status 404 sets round undefined without error, otherwise sets roundError via describeRoundError, and finally sets loading false. Call loadRound from useEffect.
- **Expected:** Initial load and retry share one code path

### Step 3 — `game/frontend/src/App.tsx` · `HeaderOverlay element` · L42
- **Do:** Pass `onRetry={loadRound}` to HeaderOverlay.

```
<HeaderOverlay ... onRetry={loadRound} />
```

- **Expected:** Retry button reloads the round

## Acceptance criteria
- 404 sets no error and no round
- Other ApiError sets error to 'Round service returned <status>' plus detail when present
- TypeError sets 'Could not reach the server'
- Retry resets loading and error and reloads

## Definition of done
- App compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-616.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-124
- Requirement: REQ-309
- Unit (Act): UNIT-616
- Unit (Verify): UNIT-619
- Status: completed
- Change: UPDATE
