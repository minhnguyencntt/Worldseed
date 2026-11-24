# UNIT-462 — Verify: Phaser-mocked config render and scale unit tests

## Summary
Assert render and scale keys with phaser mocked

## Description
Extend phaserConfig.test.ts, which already mocks phaser via vi.mock.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserConfig.test.ts` · `it: declares exact render and scale keys` · after L22
- **Do:** Add a test calling buildGameConfig(document.createElement('div'), []) and asserting render toEqual {pixelArt:true, roundPixels:true, antialias:false} and scale toEqual {mode:3, autoCenter:1, autoRound:true}, matching the mocked Scale constants.
- **Run:** `npx vitest run tests/phaserConfig.test.ts -t "exact render and scale keys"`
- **Expected:** Test passes

## Acceptance criteria
- render exactly matches pixel-art settings
- scale has FIT, CENTER_BOTH, autoRound true

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-462.md`

## Links
- Evidence: EVD-093
- Requirement: REQ-230
- Unit (Act): UNIT-460
- Unit (Verify): UNIT-462
- Status: approved
- Change: UPDATE
