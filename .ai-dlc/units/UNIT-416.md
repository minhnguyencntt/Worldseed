# UNIT-416 — Verify: config, createGame and events use only 3.90 APIs unit tests

## Summary
Mocked-phaser tests for config, factory and event bus imports

## Description
Write tests/phaser390Config.test.ts with phaser mocked via vi.mock. Assert the config shape, the createGame wiring and that the source files reference no Phaser 4-only symbols.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaser390Config.test.ts` · `new: phaser 3.90 config tests` · new
- **Do:** Create the test file. vi.mock('phaser') returning default {AUTO:0, Scale:{FIT:3, CENTER_BOTH:1}, Game: vi.fn()}. Test 1: buildGameConfig(document.createElement('div'), []) gives type 0, width 640, height 360, render.pixelArt true, scale.mode 3. Test 2: createGame passes buildGameConfig output to the mocked Game constructor. Test 3: read src/phaser/config.ts, createGame.ts and events.ts with readFileSync and expect no match for the Phaser 4 filter regex; expect events.ts not to contain "from 'phaser'".
- **Run:** `cd game/frontend && npx vitest run tests/phaser390Config.test.ts`
- **Expected:** All three tests pass.

## Acceptance criteria
- Given the mocked phaser, when buildGameConfig is called, then type is AUTO, size is 640x360 and pixelArt is true.
- Given source text of config.ts, createGame.ts and events.ts read with node:fs, when scanned, then none matches /Filters|enableFilters|setFilter|Phaser\.Renderer\.WebGL\.Renderer\.Filters/.
- Given events.ts source, when scanned, then it has no import from 'phaser'.

## Definition of done
- New test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-416.md`

## Links
- Evidence: EVD-083
- Requirement: REQ-207
- Unit (Act): UNIT-414
- Unit (Verify): UNIT-416
- Status: completed
- Change: UPDATE
