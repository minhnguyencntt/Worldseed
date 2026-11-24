# UNIT-408 — Verify: Lockfile root phaser specifier unit tests

## Summary
Unit tests for root lock entry vs package.json

## Description
Tests read package.json and package-lock.json from disk only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserLockRoot.test.ts` · `new: describe('phaser lockfile root entry')` · new
- **Do:** Create the file mirroring the readJson helper in tests/phaserDependency.test.ts for both package.json and package-lock.json; add test 'root lock entry equals ~3.90.0' asserting lock.packages[''].dependencies.phaser === '~3.90.0' and test 'matches package.json' asserting it equals pkg.dependencies.phaser
- **Run:** `cd game/frontend && npx vitest run tests/phaserLockRoot.test.ts`
- **Expected:** Both tests pass

## Acceptance criteria
- Root lock phaser equals ~3.90.0
- Root lock phaser equals package.json phaser

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-408.md`

## Links
- Evidence: EVD-081
- Requirement: REQ-203
- Unit (Act): UNIT-406
- Unit (Verify): UNIT-408
- Status: completed
- Change: UPDATE
