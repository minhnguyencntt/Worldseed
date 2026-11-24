# UNIT-021 — Verify: Runtime systems unit tests

## Summary
Unit tests for conditions, inventory, events, dialogue and scene engine

## Description
Write Vitest tests for each runtime system from the requirement spec, using in-memory state only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/tests/systems.test.ts` · `new: conditions and inventory tests` · new
- **Do:** Add tests 'evaluateCondition flag true/false' and 'addItem does not duplicate' using a hand-built GameState literal (currentScene 'bedroom', empty collections); assert true/false results and inventory length 1 after adding 'key' twice.
- **Run:** `cd backend/game && npx vitest run tests/systems.test.ts -t 'condition|addItem'`
- **Expected:** Tests pass.

### Step 2 — `backend/game/tests/systems.test.ts` · `new: events and performAction tests` · new
- **Do:** Add tests 'performAction applies set_flag add_item goto_scene' (inputs: an inline SceneDef with one object whose search action has those three events; assert flags.x true, inventory ['key'], currentScene changed, original state deep-equal to a Object.freeze'd copy) and 'performAction no-op when condition fails' (assert returned state toBe input).
- **Run:** `cd backend/game && npx vitest run tests/systems.test.ts -t 'performAction'`
- **Expected:** Tests pass; input unchanged.

### Step 3 — `backend/game/tests/systems.test.ts` · `new: dialogue tests` · new
- **Do:** Add test 'chooseOption applies events and advances' with a two-node SceneDef: choosing index 0 sets flag, activeDialogue becomes 'n2', history contains the choice text; and 'chooseOption invalid index returns same state'.
- **Run:** `cd backend/game && npx vitest run tests/systems.test.ts -t 'chooseOption'`
- **Expected:** Tests pass.

## Acceptance criteria
- Given the tests, when run, then every system has passing cases for success and no-op paths.
- Given each test, when it passes a frozen state, then immutability is asserted.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-021.md`

## Links
- Evidence: EVD-004
- Requirement: REQ-009
- Unit (Act): UNIT-017
- Unit (Verify): UNIT-021
- Status: completed
- Change: UPDATE
