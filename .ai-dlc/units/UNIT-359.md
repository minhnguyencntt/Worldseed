# UNIT-359 — Verify: Scene view visibility, persistence and flag validation unit tests

## Summary
Unit tests for A3

## Description
Prove R3 with in-memory states.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sceneView.test.ts` · `new: describe('getSceneView and validateWorld')` · new
- **Do:** Using validScene/validWorld from tests/fixtures/valid-world.ts and a game state with flags {}: (1) object with visibleWhen [{flag:'a'}] absent from getSceneView, present once flags.a is true; (2) object with persistentState {flag:'a'} has open false then true after flag set; (3) persistentState {flag:'zzz'} makes validateWorld return an array containing 'unknown flag: zzz'.
- **Run:** `cd game && npx vitest run tests/sceneView.test.ts`
- **Expected:** All three tests pass

## Acceptance criteria
- visibleWhen hides object
- persistentState drives open
- validateWorld flags unknown flag

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-359.md`

## Links
- Evidence: EVD-070
- Requirement: REQ-179
- Unit (Act): UNIT-356
- Unit (Verify): UNIT-359
- Status: completed
- Change: UPDATE
