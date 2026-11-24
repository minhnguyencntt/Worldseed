# UNIT-435 — Verify: guard fails while any dependency path is tracked

## Summary
Test guard with mocked listings

## Description
Unit tests for assertNoTrackedNodeModules with mocked listings.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/assertNoTrackedNodeModules.test.ts` · `new: assertNoTrackedNodeModules tests` · new
- **Do:** Mock runner returning 'game/frontend/node_modules/phaser/types/a.d.ts\nREADME.md': expect assertNoTrackedNodeModules to reject with message matching /node_modules\/phaser\/types\/a\.d\.ts/; mock returning 'README.md': expect it to resolve.
- **Run:** `cd game/frontend && npx vitest run tests/assertNoTrackedNodeModules.test.ts`
- **Expected:** Both guard tests pass

## Acceptance criteria
- Rejects naming path when tracked
- Resolves when clean

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-435.md`

## Links
- Evidence: EVD-087
- Requirement: REQ-217
- Unit (Act): UNIT-432
- Unit (Verify): UNIT-435
- Status: approved
- Change: UPDATE
