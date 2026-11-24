# UNIT-475 — Verify: Effects schema, effect creation and transition order unit tests

## Summary
Prove effects parse, build and transition in order with fakes.

## Description
Fake RenderContext and schema parsing tests.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/effects.test.ts` · `new: createEffects` · new
- **Do:** With a fake RenderContext, assert a dust def with count 5 calls addParticles(key,5) and setDepth(400), an ambientLight def with color 0x112233 and alpha 0.3 calls addOverlay(0x112233,0.3), and undefined defs return [].
- **Run:** `cd game && npx vitest run tests/effects.test.ts`
- **Expected:** Test passes

### Step 2 — `game/tests/transition.test.ts` · `new: runTransition order` · new
- **Do:** Use a fake ctx whose fade invokes its callback synchronously and records calls; assert the recorded sequence is ['fade:out','swap','fade:in'].
- **Run:** `cd game && npx vitest run tests/transition.test.ts`
- **Expected:** Test passes

### Step 3 — `game/tests/contentSchema.test.ts` · `new: effects field` · after existing tests
- **Do:** Add tests that parseWorldContent('scene', fixture without effects) is ok with data.effects equal to [] and that effects [{id:'d',type:'bogus'}] returns ok false with an error path starting 'effects.0'.
- **Run:** `cd game && npx vitest run tests/contentSchema.test.ts`
- **Expected:** New and existing tests pass

## Acceptance criteria
- Dust and ambient light effect creation, the empty-effects default and the invalid effect type error are asserted
- Transition order fade out, swap, fade in is asserted

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-475.md`

## Links
- Evidence: EVD-095
- Requirement: REQ-237
- Unit (Act): UNIT-471
- Unit (Verify): UNIT-475
- Status: approved
- Change: UPDATE
