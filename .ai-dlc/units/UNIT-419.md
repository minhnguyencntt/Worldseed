# UNIT-419 — Act: Add test:phaser-pin script

## Summary
Add an npm script that runs the guard test

## Description
Add a script to game/frontend/package.json so the phaser pin guard can run on its own.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `scripts` · L5-L10
- **Do:** Add the key test:phaser-pin after test

```
"test": "vitest run", -> "test": "vitest run",
    "test:phaser-pin": "vitest run tests/phaserVersionGuard.test.ts",
```

- **Expected:** scripts contains test:phaser-pin

## Acceptance criteria
- npm run test:phaser-pin invokes the guard test file
- Other scripts are unchanged

## Definition of done
- Script present
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-419.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-084
- Requirement: REQ-210
- Unit (Act): UNIT-419
- Unit (Verify): UNIT-421
- Status: completed
- Change: UPDATE
