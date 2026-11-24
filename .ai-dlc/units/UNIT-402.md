# UNIT-402 — Verify: Phaser dependency pin unit tests

## Summary
Unit tests read manifest and lockfile

## Description
Add a test mirroring zustandDependency.test.ts that reads package.json and package-lock.json from disk.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserDependency.test.ts` · `new: phaser dependency pin` · new
- **Do:** Create a vitest file modelled on tests/zustandDependency.test.ts with test 'declares phaser as ~3.90.0' asserting package.json dependencies.phaser === '~3.90.0', and test 'locks phaser to 3.90.x' asserting package-lock.json packages['node_modules/phaser'].version matches /^3\.90\./ and packages[''].dependencies.phaser === '~3.90.0'.
- **Run:** `cd game/frontend && npx vitest run tests/phaserDependency.test.ts`
- **Expected:** Both tests pass

## Acceptance criteria
- Manifest range admits only 3.90.x
- Lockfile entry is 3.90.x

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-402.md`

## Links
- Evidence: EVD-079
- Requirement: REQ-200
- Unit (Act): UNIT-400
- Unit (Verify): UNIT-402
- Status: completed
- Change: UPDATE
