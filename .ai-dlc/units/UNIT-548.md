# UNIT-548 — Verify: bootSceneBuild asserts buildScene gets the mocked sceneSpec

## Summary
Build suite with mocked content

## Description
Add a content vi.mock to bootSceneBuild.test.ts.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneBuild.test.ts` · `vi.mock('../src/runtime/content')` · after L30
- **Do:** Add vi.mock('../src/runtime/content') returning world, scene, manifest and a sceneSpec with objects whose ids and assets are not quoted in BootScene.ts or renderContext.ts; keep the sceneSpec import so assertions use the mocked value
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneBuild.test.ts`
- **Expected:** All 3 tests pass

## Acceptance criteria
- buildScene called with mocked sceneSpec
- Hardcoded-id scan passes

## Definition of done
- Command passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-548.md`

## Links
- Evidence: EVD-110
- Requirement: REQ-273
- Unit (Act): UNIT-545
- Unit (Verify): UNIT-548
- Status: completed
- Change: UPDATE
