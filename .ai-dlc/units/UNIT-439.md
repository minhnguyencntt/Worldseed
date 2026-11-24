# UNIT-439 — Verify: trackedNodeModulesPaths unit tests

## Summary
Test the filter.

## Description
Unit tests for the helper with literal path lists.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedNodeModules.test.ts` · `new: describe('trackedNodeModulesPaths')` · new
- **Do:** Add test with input ['node_modules/phaser/a.js','src/a.ts','src/my_node_modules_note.ts'] asserting result equals ['node_modules/phaser/a.js']; add test that [] returns [].
- **Run:** `cd game/frontend && npx vitest run tests/trackedNodeModules.test.ts -t trackedNodeModulesPaths`
- **Expected:** Both tests pass.

## Acceptance criteria
- Keeps node_modules paths
- Drops lookalike names

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-439.md`

## Links
- Evidence: EVD-088
- Requirement: REQ-218
- Unit (Act): UNIT-436
- Unit (Verify): UNIT-439
- Status: completed
- Change: NEW
