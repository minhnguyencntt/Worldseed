# UNIT-590 — Verify: validateWorld scene character reference unit tests

## Summary
Unit tests for NPC reference validation.

## Description
Add in-memory world objects to tests/content.test.ts and assert validateWorld errors.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/content.test.ts` · `new: describe('validateWorld scene characters')` · after the last describe
- **Do:** Add a helper building a world {id:'w',title:'W',startScene:'s',scenes:[scene],characters:[{id:'boy',name:'Boy'}],flags:['f']} where scene has dialogue [{id:'greet',speaker:'boy',text:'hi',choices:[]}] and a characters array passed per test. Test 1: character id 'ghost' -> errors contains 'unknown character: ghost'. Test 2: boy with interaction.dialogue 'nope' -> contains 'unknown dialogue: nope'. Test 3: interaction events [{type:'set_flag',flag:'zzz',value:true}] -> contains 'unknown flag: zzz'. Test 4: boy with dialogue 'greet' -> errors is [].
- **Run:** `cd game && npx vitest run tests/content.test.ts -t 'validateWorld scene characters'`
- **Expected:** All four tests pass.

## Acceptance criteria
- Each bad reference yields its error.
- A valid NPC yields none.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-590.md`

## Links
- Evidence: EVD-117
- Requirement: REQ-294
- Unit (Act): UNIT-587
- Unit (Verify): UNIT-590
- Status: approved
- Change: UPDATE
