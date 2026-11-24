# UNIT-601 — Verify: validateWorld scene character reference unit tests

## Summary
Unit tests for rejecting unknown and accepting known scene character ids

## Description
Add tests to game/tests/validator.test.ts calling validateWorld with in-memory worlds built from the validWorld and validScene fixtures in game/tests/fixtures/valid-world.ts. No filesystem, network or real dependencies.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/validator.test.ts` · `new: it('reports unknown scene character id with a path tag')` · after L99
- **Do:** Add a test in a new describe 'validateWorld scene characters' that builds a scene from validScene (id 'bedroom') with characters [{id:'ghost', name:'Ghost', position:{x:0,y:0}, scale:1, layer:'characters', animations:{idle:{asset:'a', animation:'idle'}}}], calls validateWorld({ ...validWorld, scenes: [scene] }) and asserts the errors contain 'scenes[bedroom].characters[0].id: unknown character ghost'.
- **Run:** `cd game && npx vitest run tests/validator.test.ts -t 'unknown scene character'`
- **Expected:** Test passes and the errors array contains the path-tagged message

### Step 2 — `game/tests/validator.test.ts` · `new: it('accepts scene characters all in the world list')` · after the previous new test
- **Do:** Add a test using a scene with characters [{id:'boy', ...same required fields}] where validWorld.characters lists boy; assert validateWorld({ ...validWorld, scenes: [scene] }) toEqual [].
- **Run:** `cd game && npx vitest run tests/validator.test.ts -t 'all in the world list'`
- **Expected:** Test passes and validateWorld returns an empty array

## Acceptance criteria
- A scene with an unknown character id yields the exact path-tagged message
- A scene whose characters are all in the world list yields no errors
- A scene without characters yields no character error

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-601.md`

## Links
- Evidence: EVD-121
- Requirement: REQ-300
- Unit (Act): UNIT-600
- Unit (Verify): UNIT-601
- Status: completed
- Change: NEW
