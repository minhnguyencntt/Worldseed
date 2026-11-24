# UNIT-412 — Verify: Lockfile root phaser specifier unit tests

## Summary
Unit test reads real lockfile and asserts root specifier

## Description
Write tests that read the real package-lock.json and package.json from disk and assert the root phaser specifier.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserLockfile.test.ts` · `new: describe('lockfile root phaser specifier')` · new
- **Do:** Create the file with readFileSync + fileURLToPath(new NodeURL('../package-lock.json', import.meta.url)) helpers and a test 'root phaser specifier is ~3.90.0 and equals package.json' asserting lock.packages[''].dependencies.phaser toBe '~3.90.0' and toBe pkg.dependencies.phaser.
- **Run:** `cd game/frontend && npx vitest run tests/phaserLockfile.test.ts -t 'root phaser specifier'`
- **Expected:** Test fails before ACT1 (^4.2.1) and passes after

## Acceptance criteria
- Test fails when lockfile root says ^4.2.1.
- Test passes with ~3.90.0 equal to package.json.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-412.md`

## Links
- Evidence: EVD-082
- Requirement: REQ-205
- Unit (Act): UNIT-410
- Unit (Verify): UNIT-412
- Status: completed
- Change: NEW
