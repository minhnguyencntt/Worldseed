# UNIT-827 — Verify: Lighting effect schema and bedroom content unit tests

## Summary
Schema accepts the new types, bedroom content uses palette colours

## Description
Unit tests for the schema variants and the bedroom effects.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/lightingEffectsSchema.test.ts` · `new: lightingEffectsSchema` · new
- **Do:** Create tests reusing the sceneWithEffects pattern from game/tests/effectsSchema.test.ts and validScene from game/tests/fixtures/valid-world: (a) a scene with one of each new effect validates; (b) lampGlow with radius -1 fails and errors[0].path starts with 'effects.0'.
- **Run:** `cd game && npx vitest run tests/lightingEffectsSchema.test.ts`
- **Expected:** Both tests pass

### Step 2 — `game/frontend/tests/lightingContentPalette.test.ts` · `new: bedroom lighting content` · new
- **Do:** Import scene from '../src/runtime/content' and PALETTE from '../src/lib/palette'. Assert scene.effects types include moonlightShaft, lampGlow, doorLight, vignette, dust, ambientLight, and every effect with a color has that color in PALETTE.
- **Run:** `cd game/frontend && npx vitest run tests/lightingContentPalette.test.ts`
- **Expected:** Test passes with all colours in the palette

## Acceptance criteria
- New variants validate and bad radius fails at effects.0
- Bedroom effects colours are all in PALETTE

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-827.md`

## Links
- Evidence: EVD-167
- Requirement: REQ-412
- Unit (Act): UNIT-824
- Unit (Verify): UNIT-827
- Status: completed
- Change: UPDATE
