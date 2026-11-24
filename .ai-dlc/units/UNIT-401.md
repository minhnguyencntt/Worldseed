# UNIT-401 — Act: Document the Phaser 3.90 target in createGame

## Summary
Mark createGame as 3.90 API-only

## Description
Confirm createGame uses only 3.90 APIs and annotate the seam; fix any compile error found after the pin.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/createGame.ts` · `createGame` · L4-L9
- **Do:** Update the seam comment to state that the Phaser 3.90 API is targeted; keep new Phaser.Game(buildGameConfig(parent, scenes)) unchanged. If tsc reports an error in this file after the pin, replace only the offending type with its 3.90 equivalent.

```
// Single seam for constructing the Phaser game; tests mock this module. -> // Single seam for constructing the Phaser 3.90 game; tests mock this module.
```

- **Expected:** File compiles with Phaser 3.90 types

## Acceptance criteria
- createGame compiles on 3.90 types
- Signature unchanged

## Definition of done
- tsc passes on 3.90
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-401.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-079
- Requirement: REQ-201
- Unit (Act): UNIT-401
- Unit (Verify): UNIT-403
- Status: completed
- Change: UPDATE
