# UNIT-441 — Verify: guard fails while any dependency path is tracked

## Summary
Test guard with mocked listings.

## Description
Unit tests for assertNoTrackedNodeModules with mocked file listings.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedNodeModules.test.ts` · `new: describe('assertNoTrackedNodeModules')` · new
- **Do:** Assert expect(() => assertNoTrackedNodeModules(['node_modules/phaser/x.js','src/a.ts'])).toThrow(/node_modules\/phaser\/x.js/); assert expect(() => assertNoTrackedNodeModules(['src/a.ts'])).not.toThrow().
- **Run:** `cd game/frontend && npx vitest run tests/trackedNodeModules.test.ts -t assertNoTrackedNodeModules`
- **Expected:** Tests pass.

## Acceptance criteria
- Throws when tracked
- Passes when clean

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-441.md`

## Links
- Evidence: EVD-088
- Requirement: REQ-220
- Unit (Act): UNIT-438
- Unit (Verify): UNIT-441
- Status: completed
- Change: NEW
