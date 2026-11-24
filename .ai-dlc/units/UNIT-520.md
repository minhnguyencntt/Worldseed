# UNIT-520 — Act: Export FALLBACK_KEY from BootScene

## Summary
Make the fallback texture key importable by tests

## Description
Context: BootScene.ts declares const FALLBACK_KEY = 'fallback:missing' privately. Export it so tests assert against the real constant.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `FALLBACK_KEY` · L12
- **Do:** Change the const declaration to a named export

```
const FALLBACK_KEY = 'fallback:missing'; -> export const FALLBACK_KEY = 'fallback:missing';
```

- **Expected:** FALLBACK_KEY importable from BootScene

## Acceptance criteria
- Given BootScene.ts, when imported, then FALLBACK_KEY equals 'fallback:missing'
- Given BootScene, when resolveKey runs, then behavior is unchanged

## Definition of done
- Constant exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-520.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-105
- Requirement: REQ-261
- Unit (Act): UNIT-520
- Unit (Verify): UNIT-523
- Status: completed
- Change: UPDATE
