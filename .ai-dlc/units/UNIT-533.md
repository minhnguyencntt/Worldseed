# UNIT-533 — Verify: BootScene single sceneObjects field and unchanged sync unit tests

## Summary
Unit tests for single field and existing sync/destroy behavior

## Description
Add a source test counting the field, and rerun existing sync tests proving behavior is preserved.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneNoDuplicates.test.ts` · `new: BootScene single sceneObjects field` · after L1
- **Do:** Add test `declares private sceneObjects once` reading BootScene.ts and asserting the count of lines matching /private sceneObjects: SceneObject\[\]/ equals 1.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneNoDuplicates.test.ts -t 'sceneObjects'`
- **Expected:** Test passes with count 1

### Step 2 — `game/frontend/tests/bootSceneSync.test.ts` · `existing sync and shutdown tests` · L1-end
- **Do:** Run the existing suite unchanged to confirm sync and destroy behavior still pass with the single field.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneSync.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Given the source, when matched, then one private sceneObjects field exists
- Given mocked objects, when state changes and shutdown fires, then sync and destroy are called

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-533.md`

## Links
- Evidence: EVD-107
- Requirement: REQ-266
- Unit (Act): UNIT-531
- Unit (Verify): UNIT-533
- Status: approved
- Change: UPDATE
