# UNIT-326 — Act: Add loading, empty and error states to HeaderOverlay

## Summary
Render state messages in place of round info

## Description
Replace the round block in HeaderOverlay with a state switch.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/HeaderOverlay.tsx` · `HeaderOverlay` · round block added in ACT1
- **Do:** Wrap the round block in a chain: if error is truthy render <span role="alert">Round unavailable: {error}</span>; else if loading render <span>Loading round…</span>; else if round render the round block; else render <span>No active round</span>.

```
{error ? <span role="alert">Round unavailable: {error}</span> : loading ? <span>Loading round…</span> : round ? (<>…round block…</>) : <span>No active round</span>}
```

- **Expected:** Each state shows its text; logo and buttons remain

## Acceptance criteria
- error > loading > empty precedence
- Error text includes the explanation

## Definition of done
- Three states render distinct text
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-326.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-065
- Requirement: REQ-164
- Unit (Act): UNIT-326
- Unit (Verify): UNIT-329
- Status: completed
- Change: UPDATE
