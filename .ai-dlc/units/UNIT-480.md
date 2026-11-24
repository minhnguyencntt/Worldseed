# UNIT-480 — Verify: SceneObject entity unit tests with fake context

## Summary
Unit tests for SceneObject

## Description
Test entity against REQ2 criteria using a fake RenderContext.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/sceneObject.test.ts` · `new: SceneObject tests` · new
- **Do:** Using validScene.objects[0] from tests/fixtures/valid-world.ts and a fake ctx with vi.fn createSprite returning {setVisible, destroy} mocks, add tests: constructor calls createSprite once with key, x, y, scale and depth layerDepth(layer); sync with visibleWhen [{flag:'a'}] and flags {} then {a:true} (state from createInitialState and setFlag) calls setVisible(false) then setVisible(true); destroy calls handle.destroy once.
- **Run:** `cd game && npx vitest run tests/sceneObject.test.ts`
- **Expected:** All three tests pass

## Acceptance criteria
- Constructor test passes with one sprite call
- Visibility and destroy tests pass

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-480.md`

## Links
- Evidence: EVD-096
- Requirement: REQ-239
- Unit (Act): UNIT-477
- Unit (Verify): UNIT-480
- Status: completed
- Change: UPDATE
