# UNIT-854 — Verify: anchorFor maths and PhaserHost layout reporting unit tests

## Summary
Unit tests for anchor maths and onLayout calls with Phaser mocked.

## Description
Test anchorFor with fixed inputs and PhaserHost onLayout with createGame, ResizeObserver and matchMedia faked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/anchor.test.ts` · `new: anchorFor tests` · new
- **Do:** Add tests: (1) position (150,60), bounds {0,0,48,96}, scale 1, zoom 2, offset (10,20), dpr 1 expects top {x:358,y:140} and bottom {x:358,y:332}; (2) zoom 4 dpr 2 equals result (1); (3) bounds undefined returns null; (4) scale 2 doubles bounds offsets.
- **Run:** `cd game/frontend && npx vitest run tests/anchor.test.ts`
- **Expected:** 4 tests pass

### Step 2 — `game/frontend/tests/phaserHostLayout.test.tsx` · `new: PhaserHost onLayout` · new
- **Do:** Copy the mock setup (vi.mock createGame, fake ResizeObserver capturing its callback, jsdom) from frontend/tests/appObjectClick.test.tsx. Render PhaserHost with onLayout spy; assert one call with zoom>=1 and dpr 1 on mount; invoke the captured ResizeObserver callback and assert a second call.
- **Run:** `cd game/frontend && npx vitest run tests/phaserHostLayout.test.tsx`
- **Expected:** onLayout called on mount and on resize

## Acceptance criteria
- Anchor results match the formula for zoom, offset and DPR
- onLayout fires on mount and on resize

## Definition of done
- Both test files pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-854.md`

## Links
- Evidence: EVD-171
- Requirement: REQ-425
- Unit (Act): UNIT-850
- Unit (Verify): UNIT-854
- Status: completed
- Change: UPDATE
