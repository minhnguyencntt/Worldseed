# UNIT-410 — Act: Set root phaser specifier to ~3.90.0 in package-lock.json

## Summary
Edit root dependencies phaser specifier in the lockfile

## Description
Change packages[""].dependencies.phaser from ^4.2.1 to ~3.90.0 in game/frontend/package-lock.json.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package-lock.json` · `packages[""].dependencies.phaser` · L15
- **Do:** Replace the root dependencies phaser specifier ^4.2.1 with ~3.90.0, leaving the trailing comma and indentation unchanged.

```
"phaser": "^4.2.1", -> "phaser": "~3.90.0",
```

- **Expected:** grep -n '"phaser"' game/frontend/package-lock.json shows ~3.90.0 on line 15

## Acceptance criteria
- Root phaser specifier reads ~3.90.0.
- No other line in the root dependencies block changes.

## Definition of done
- Line 15 is "phaser": "~3.90.0",
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-410.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-082
- Requirement: REQ-205
- Unit (Act): UNIT-410
- Unit (Verify): UNIT-412
- Status: completed
- Change: NEW
