# UNIT-532 — Verify: BootScene has a single SceneObject import unit tests

## Summary
Unit test reads BootScene.ts source and counts imports

## Description
Write a unit test that reads the BootScene.ts source from disk and asserts a single SceneObject type import.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneNoDuplicates.test.ts` · `new: BootScene single SceneObject import` · new
- **Do:** Add test `has exactly one import type SceneObject line` that reads ../src/phaser/BootScene.ts with readFileSync and asserts the count of lines matching /^import type \{ SceneObject \}/ equals 1.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneNoDuplicates.test.ts -t 'import'`
- **Expected:** Test passes with count 1

## Acceptance criteria
- Given the source, when matched, then exactly one SceneObject import exists
- Given the source, when matched, then no duplicate import line exists

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-532.md`

## Links
- Evidence: EVD-107
- Requirement: REQ-265
- Unit (Act): UNIT-530
- Unit (Verify): UNIT-532
- Status: approved
- Change: UPDATE
