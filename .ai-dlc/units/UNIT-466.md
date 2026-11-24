# UNIT-466 — Verify: Config and createGame pass zoom unit tests

## Summary
Phaser-mocked tests for zoom in config

## Description
Unit tests with Phaser mocked prove that zoom is put into the config and forwarded by createGame.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserConfig.test.ts` · `new: it('buildGameConfig sets scale.zoom and defaults to 1')` · after existing tests
- **Do:** Add a test calling buildGameConfig(document.createElement('div'), [], 3) and asserting scale.zoom is 3, then without the third argument asserting scale.zoom is 1. Follow the file's existing Phaser import or mock approach.
- **Run:** `cd game/frontend && npx vitest run tests/phaserConfig.test.ts`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/phaserConfig.test.ts` · `new: it('createGame forwards zoom to the Phaser.Game config')` · after previous test
- **Do:** Use vi.mock('phaser') with a fake Game class capturing its config argument; call createGame(div, [], 2) and assert captured config.scale.zoom equals 2.
- **Run:** `cd game/frontend && npx vitest run tests/phaserConfig.test.ts -t 'forwards zoom'`
- **Expected:** Test passes

## Acceptance criteria
- Config zoom set and defaults to 1
- createGame forwards zoom

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-466.md`

## Links
- Evidence: EVD-094
- Requirement: REQ-232
- Unit (Act): UNIT-464
- Unit (Verify): UNIT-466
- Status: completed
- Change: UPDATE
