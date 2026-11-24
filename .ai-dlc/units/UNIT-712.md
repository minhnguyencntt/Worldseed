# UNIT-712 — Act: Subscribe App to menuClose to clear the selection

## Summary
Add a useEffect for menuClose

## Description
Add an effect next to the objectClick effect in App.tsx.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `App` · after L58
- **Do:** Add a useEffect after the objectClick effect that subscribes to menuClose and clears the selection, returning the unsubscribe.

```
useEffect(() => phaserToReact.on('menuClose', () => setSelectedId(undefined)), []);
```

- **Expected:** Emitting menuClose removes the ActionMenu.

## Acceptance criteria
- menuClose sets selectedId to undefined.
- The effect returns the unsubscribe function.

## Definition of done
- Effect present
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-712.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-143
- Requirement: REQ-357
- Unit (Act): UNIT-712
- Unit (Verify): UNIT-715
- Status: completed
- Change: UPDATE
