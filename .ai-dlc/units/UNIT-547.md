# UNIT-547 — Verify: bootSceneEffects mocks sceneSpec and passes

## Summary
Effects suite with mocked content

## Description
Add a content vi.mock to bootSceneEffects.test.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneEffects.test.ts` · `vi.mock('../src/runtime/content')` · after L28
- **Do:** Add vi.mock('../src/runtime/content') returning world, scene, manifest and sceneSpec with objects, layers and effects arrays; import scene from the mocked module so the sceneArg toBe(scene) assertions hold
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneEffects.test.ts`
- **Expected:** All 5 tests in the file pass

## Acceptance criteria
- 3 BootScene effect tests pass
- Suite does not import real content

## Definition of done
- Command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-547.md`

## Links
- Evidence: EVD-110
- Requirement: REQ-272
- Unit (Act): UNIT-544
- Unit (Verify): UNIT-547
- Status: completed
- Change: UPDATE
