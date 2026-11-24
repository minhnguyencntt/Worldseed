# UNIT-568 — Verify: effectContext exhaustive return unit tests

## Summary
Test createEffect returns handles and throws on unknown

## Description
Unit tests with a mocked Phaser scene.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/effectContextExhaustive.test.ts` · `new: createEffect exhaustive` · new
- **Do:** vi.mock('phaser', () => ({ default: {} })); build a fake scene with add.particles/add.rectangle chained mocks and scale 320x180; call createPhaserEffectContext(scene, id => id).createEffect with a dust spec, an ambientLight spec (color '#112233', alpha 0.3) and a transition spec each plus depth 1, asserting a destroy function is returned; then call with { type: 'bogus', depth: 1 } cast to never and assert it throws /Unsupported effect type: bogus/.
- **Run:** `cd game/frontend && npx vitest run tests/effectContextExhaustive.test.ts`
- **Expected:** 4 tests pass

## Acceptance criteria
- Handles returned for 3 effect types
- Throws for unknown effect type

## Definition of done
- test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-568.md`

## Links
- Evidence: EVD-113
- Requirement: REQ-283
- Unit (Act): UNIT-565
- Unit (Verify): UNIT-568
- Status: approved
- Change: UPDATE
