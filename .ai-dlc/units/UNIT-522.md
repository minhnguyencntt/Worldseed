# UNIT-522 — Verify: game vitest config alias unit tests

## Summary
Test the @game alias and include glob in the game vitest config

## Description
Add a unit test reading the config object.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/preloadConfig.test.ts` · `new: describe('vitest config')` · new
- **Do:** Create the file importing config from ../vitest.config and assert config.resolve.alias['@game'] ends with '/src' and config.test.include contains 'tests/**/*.test.ts'
- **Run:** `cd game && npx vitest run tests/preloadConfig.test.ts`
- **Expected:** Both assertions pass

## Acceptance criteria
- Given the config, when imported, then @game alias ends with src
- Given the config, then include contains tests/**/*.test.ts

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-522.md`

## Links
- Evidence: EVD-105
- Requirement: REQ-260
- Unit (Act): UNIT-519
- Unit (Verify): UNIT-522
- Status: completed
- Change: UPDATE
