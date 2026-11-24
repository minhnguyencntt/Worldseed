# UNIT-599 — Verify: validateWorld scene character reference unit tests

## Summary
Unit tests for scene character validation.

## Description
Add tests in game/tests/validator.test.ts using in-memory fixtures from tests/fixtures/valid-world.ts, with no filesystem or network.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/validator.test.ts` · `describe: validateWorld scene character references` · after L43
- **Do:** Add a describe block with three tests built from validWorld and validScene: (1) validScene plus characters [boy, ghost] (position {x:0,y:0}, animations.idle {asset:'character:boy',animation:'idle'}) expects errors toContain 'scenes.bedroom.characters.1.id: unknown character: ghost'; (2) scene with characters [boy] expects no error containing 'characters.'; (3) scene without characters expects errors toEqual [].
- **Run:** `cd game && npx vitest run tests/validator.test.ts`
- **Expected:** All tests in validator.test.ts pass, including the three new ones

## Acceptance criteria
- Unknown scene character id yields the exact path-tagged error
- Valid and absent scene characters yield no character error

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-599.md`

## Links
- Evidence: EVD-120
- Requirement: REQ-299
- Unit (Act): UNIT-598
- Unit (Verify): UNIT-599
- Status: approved
- Change: NEW
