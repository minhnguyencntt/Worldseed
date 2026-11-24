# UNIT-491 — Verify: Effects schema and bedroom content unit tests

## Summary
Unit tests for effectSchema and bedroom effects

## Description
Write tests from the requirement criteria for valid, invalid and absent effects.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/effectsSchema.test.ts` · `new: effectsSchema tests` · new
- **Do:** Using validScene from ./fixtures/valid-world spread with effects, assert parseWorldContent('scene') ok for dust+ambientLight+fade; ok for no effects; with durationMs -1 assert ok false and errors[0].path starts with 'effects.0'
- **Run:** `cd game && npx vitest run tests/effectsSchema.test.ts`
- **Expected:** 3 tests pass

### Step 2 — `game/tests/effectsSchema.test.ts` · `bedroom effects test` · new
- **Do:** Load bedroom.yaml via loader.ts loadWorld('src/content/worlds/the-boys-room') and assert the bedroom scene has effect types dust, ambientLight and transition
- **Run:** `cd game && npx vitest run tests/effectsSchema.test.ts -t bedroom`
- **Expected:** test passes

## Acceptance criteria
- Valid, invalid and missing effects cases are each asserted in the suite
- Bedroom scene effect types dust, ambientLight and transition are asserted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-491.md`

## Links
- Evidence: EVD-098
- Requirement: REQ-244
- Unit (Act): UNIT-488
- Unit (Verify): UNIT-491
- Status: completed
- Change: UPDATE
