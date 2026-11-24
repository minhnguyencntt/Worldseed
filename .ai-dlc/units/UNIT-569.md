# UNIT-569 — Verify: game vitest phaser alias unit tests

## Summary
Test config keeps both aliases

## Description
Unit test reading game/vitest.config.ts text.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/gameVitestPhaserAlias.test.ts` · `new: game vitest phaser alias` · new
- **Do:** Read ../../vitest.config.ts with readFileSync via fileURLToPath(new NodeURL(...)); assert it contains "phaser:" with './frontend/node_modules/phaser', contains "'@game'", and contains "tests/**/*.test.ts".
- **Run:** `cd game/frontend && npx vitest run tests/gameVitestPhaserAlias.test.ts`
- **Expected:** 3 assertions pass

## Acceptance criteria
- phaser alias asserted
- @game alias asserted

## Definition of done
- test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-569.md`

## Links
- Evidence: EVD-113
- Requirement: REQ-284
- Unit (Act): UNIT-566
- Unit (Verify): UNIT-569
- Status: approved
- Change: UPDATE
