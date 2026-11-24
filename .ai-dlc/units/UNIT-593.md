# UNIT-593 — Verify: characterSchema interaction unit tests

## Summary
Unit tests for the optional character interaction field

## Description
Add game/tests/characterSchema.test.ts testing characterSchema with and without interaction, using pure in-memory inputs and no I/O.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/characterSchema.test.ts` · `new: characterSchema interaction` · new
- **Do:** Create a describe block with a base character fixture (id 'boy', name 'Boy', position {x:1,y:2}, animations.idle {asset:'character:boy', animation:'idle'}). Test 1: parse base without interaction, expect interaction undefined. Test 2: add interaction {dialogue:'npc-greeting'}, expect result.interaction.dialogue toBe 'npc-greeting'. Test 3: add interaction {actions:[{id:'inspect',label:'Talk',events:[]}]}, expect actions length 1 and id 'inspect'.
- **Run:** `cd game && npx vitest run tests/characterSchema.test.ts`
- **Expected:** Three tests pass

### Step 2 — `game/tests/characterSchema.test.ts` · `rejects invalid interaction` · new
- **Do:** Add tests: interaction {dialogue:5} throws via expect(() => characterSchema.parse(...)).toThrow(); interaction {actions:[{id:'dance',label:'x',events:[]}]} also throws.
- **Run:** `cd game && npx vitest run tests/characterSchema.test.ts`
- **Expected:** Both rejection tests pass

## Acceptance criteria
- Tests assert absent, dialogue, actions and invalid cases
- Tests pass with the command below

## Definition of done
- All characterSchema tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-593.md`

## Links
- Evidence: EVD-118
- Requirement: REQ-296
- Unit (Act): UNIT-592
- Unit (Verify): UNIT-593
- Status: completed
- Change: NEW
