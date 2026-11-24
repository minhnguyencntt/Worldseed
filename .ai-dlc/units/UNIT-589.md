# UNIT-589 — Verify: characterSchema interaction unit tests

## Summary
Unit tests for the optional character interaction field.

## Description
Add schema tests proving interaction parsing, defaults and errors.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/contentSchema.test.ts` · `new: describe('characterSchema interaction')` · after the last existing describe block
- **Do:** Add test 'keeps interaction.dialogue and defaults events': call parseWorldContent('scene', {id:'s',title:'S',dialogue:[],objects:[],characters:[{id:'npc',name:'Npc',position:{x:1,y:2},animations:{idle:{asset:'a',animation:'idle'}},interaction:{dialogue:'greet'}}]}) and assert ok and data.characters[0].interaction equals {dialogue:'greet',events:[]}.
- **Run:** `cd game && npx vitest run tests/contentSchema.test.ts -t 'characterSchema interaction'`
- **Expected:** Test passes.

### Step 2 — `game/tests/contentSchema.test.ts` · `new: it('accepts a character without interaction')` · inside the same describe
- **Do:** Parse the same input with no interaction key; assert ok is true and characters[0].interaction is undefined.
- **Run:** `cd game && npx vitest run tests/contentSchema.test.ts -t 'characterSchema interaction'`
- **Expected:** Test passes.

### Step 3 — `game/tests/contentSchema.test.ts` · `new: it('rejects a non-string interaction dialogue')` · inside the same describe
- **Do:** Parse input with interaction:{dialogue:5}; assert ok is false and errors contains an entry whose path is 'characters.0.interaction.dialogue'.
- **Run:** `cd game && npx vitest run tests/contentSchema.test.ts -t 'characterSchema interaction'`
- **Expected:** Test passes.

## Acceptance criteria
- Interaction parses with defaulted events.
- Missing interaction passes.
- Bad dialogue type yields a path-tagged error.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-589.md`

## Links
- Evidence: EVD-117
- Requirement: REQ-293
- Unit (Act): UNIT-586
- Unit (Verify): UNIT-589
- Status: approved
- Change: UPDATE
