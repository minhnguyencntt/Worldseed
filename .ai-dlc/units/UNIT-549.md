# UNIT-549 — Verify: bootScene suite mocks content and passes with typed constructor

## Summary
bootScene.test.ts with mocked content

## Description
Add a content vi.mock to bootScene.test.ts and fix typing.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootScene.test.ts` · `vi.mock('../src/runtime/content')` · after L16
- **Do:** Add vi.mock('../src/runtime/content') returning world, scene, manifest and sceneSpec with objects, layers and effects; keep new BootScene() zero-argument and type any callback parameters explicitly
- **Run:** `cd game/frontend && npx vitest run tests/bootScene.test.ts`
- **Expected:** All tests in the file pass

## Acceptance criteria
- Suite passes
- No tsc errors in the file

## Definition of done
- Command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-549.md`

## Links
- Evidence: EVD-110
- Requirement: REQ-274
- Unit (Act): UNIT-546
- Unit (Verify): UNIT-549
- Status: completed
- Change: UPDATE
