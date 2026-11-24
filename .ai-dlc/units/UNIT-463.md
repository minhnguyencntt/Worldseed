# UNIT-463 — Verify: computeZoom invalid dpr unit tests

## Summary
Assert dpr guard and valid-input zoom

## Description
Add tests to phaserConfig.test.ts for the dpr guard.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserConfig.test.ts` · `it: treats invalid dpr as 1` · after L22
- **Do:** Add a test looping over [NaN, 0, -1] asserting computeZoom(1280, 720, dpr) toBe 2, and asserting computeZoom(1000, 600, 2) is an integer >= 1.
- **Run:** `npx vitest run tests/phaserConfig.test.ts -t "invalid dpr"`
- **Expected:** Test passes

## Acceptance criteria
- NaN, 0, -1 dpr give 2 at 1280x720
- dpr 2 at 1000x600 gives integer >= 1

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-463.md`

## Links
- Evidence: EVD-093
- Requirement: REQ-231
- Unit (Act): UNIT-461
- Unit (Verify): UNIT-463
- Status: approved
- Change: UPDATE
