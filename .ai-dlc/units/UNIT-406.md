# UNIT-406 — Act: Set root phaser specifier to ~3.90.0 in package-lock.json

## Summary
Edit root dependencies phaser entry

## Description
Change packages[""].dependencies.phaser from ^4.2.1 to ~3.90.0 in game/frontend/package-lock.json.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package-lock.json` · `packages[""].dependencies.phaser` · L15
- **Do:** Replace the phaser specifier value ^4.2.1 with ~3.90.0 in the root package dependencies block

```
"phaser": "^4.2.1", -> "phaser": "~3.90.0",
```

- **Expected:** Root dependencies entry reads "phaser": "~3.90.0"

## Acceptance criteria
- Root dependencies.phaser equals ~3.90.0
- The lockfile remains valid JSON

## Definition of done
- L15 reads ~3.90.0
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-406.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-081
- Requirement: REQ-203
- Unit (Act): UNIT-406
- Unit (Verify): UNIT-408
- Status: completed
- Change: UPDATE
