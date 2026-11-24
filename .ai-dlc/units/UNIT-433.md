# UNIT-433 — Verify: trackedNodeModulesPaths unit tests

## Summary
Test helper filtering

## Description
Unit tests for the pure helper.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedNodeModules.test.ts` · `new: trackedNodeModulesPaths tests` · new
- **Do:** Add tests: input ['README.md','game/frontend/node_modules/phaser/a.ts','game/frontend/src/node_modules_notes.ts'] expects only the phaser path; input ['a.ts'] expects [].
- **Run:** `cd game/frontend && npx vitest run tests/trackedNodeModules.test.ts`
- **Expected:** Both tests pass

## Acceptance criteria
- Only node_modules segment paths returned
- Empty array when none

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-433.md`

## Links
- Evidence: EVD-087
- Requirement: REQ-215
- Unit (Act): UNIT-430
- Unit (Verify): UNIT-433
- Status: approved
- Change: NEW
