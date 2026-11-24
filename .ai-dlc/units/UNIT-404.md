# UNIT-404 — Act: Change phaser to ~3.90.0 in game/frontend/package.json

## Summary
Edit the phaser dependency value in package.json.

## Description
Change line 18 of game/frontend/package.json from "phaser": "^4.2.1" to "phaser": "~3.90.0". Touch no other line. Do not edit package-lock.json in this unit.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies.phaser` · L18
- **Do:** Replace the phaser dependency value ^4.2.1 with ~3.90.0, leaving every other line unchanged.

```
"phaser": "^4.2.1", -> "phaser": "~3.90.0",
```

- **Expected:** package.json dependencies.phaser is ~3.90.0 and the file remains valid JSON.

## Acceptance criteria
- Given package.json after the edit, when dependencies.phaser is read, then it is ~3.90.0.
- Given package.json after the edit, when diffed, then only the phaser line changed.

## Definition of done
- package.json contains "phaser": "~3.90.0"
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-404.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-080
- Requirement: REQ-202
- Unit (Act): UNIT-404
- Unit (Verify): UNIT-405
- Status: completed
- Change: UPDATE
