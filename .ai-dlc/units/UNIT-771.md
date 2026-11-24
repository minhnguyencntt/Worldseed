# UNIT-771 — Verify: 480x270 constants and computeZoom unit tests

## Summary
Unit tests for constants and whole-number zoom across sizes and DPR

## Description
Test constants and computeZoom with Phaser mocked, and confirm no existing test assumes 640x360.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/computeZoom.test.ts` · `new: computeZoom table` · new
- **Do:** Create the file with the same vi.mock('phaser', ...) block as tests/phaserConfig.test.ts L1-L15. Add test.each cases [w,h,dpr,expected]: [1280,720,1,2],[1920,1080,1,4],[1920,1080,2,8],[1366,768,1,2],[1280,720,1.5,4],[1000,600,2,4],[479,269,1,1]; assert computeZoom(w,h,dpr) toBe expected and Number.isInteger.
- **Run:** `cd game/frontend && npx vitest run tests/computeZoom.test.ts`
- **Expected:** All cases pass.

### Step 2 — `game/frontend/tests/computeZoom.test.ts` · `invalid dpr` · after table
- **Do:** Add test.each over dpr values 0, -1, NaN, Infinity with viewport (1280,720) asserting the result equals computeZoom(1280,720,1) (2).
- **Run:** `cd game/frontend && npx vitest run tests/computeZoom.test.ts`
- **Expected:** Invalid dpr values yield 2.

### Step 3 — `game/frontend/tests/phaserConfig.test.ts` · `Phaser game config` · after L27
- **Do:** Import GAME_WIDTH, GAME_HEIGHT from '../src/phaser/config'. Add test 'uses the 480x270 native resolution' asserting GAME_WIDTH toBe 480, GAME_HEIGHT toBe 270, and buildGameConfig(document.createElement('div'), []) toMatchObject({width:480,height:270}).
- **Run:** `cd game/frontend && npx vitest run tests/phaserConfig.test.ts tests/phaserHost.test.tsx`
- **Expected:** Config tests and PhaserHost tests pass with no literal 640x360 expectation.

## Acceptance criteria
- Tests assert 480x270 constants and config width/height.
- Tests assert computeZoom results for several sizes and DPR values and the clamp/invalid cases.

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-771.md`

## Links
- Evidence: EVD-156
- Requirement: REQ-385
- Unit (Act): UNIT-768
- Unit (Verify): UNIT-771
- Status: completed
- Change: UPDATE
