# UNIT-479 — Verify: Layer order and render context unit tests

## Summary
Unit tests for LAYER_ORDER and layerDepth

## Description
Test layers module against REQ1 acceptance criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/layers.test.ts` · `new: layers tests` · new
- **Do:** Add test 'LAYER_ORDER is the six layers in order' asserting equality with the array background,furniture,objects,characters,effects,ui; add test 'layerDepth increases per layer and falls back' asserting depths strictly increase over LAYER_ORDER and layerDepth(undefined) and layerDepth('nope') equal layerDepth('objects').
- **Run:** `cd game && npx vitest run tests/layers.test.ts`
- **Expected:** Both tests pass

## Acceptance criteria
- Order test passes
- Fallback test passes

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-479.md`

## Links
- Evidence: EVD-096
- Requirement: REQ-238
- Unit (Act): UNIT-476
- Unit (Verify): UNIT-479
- Status: completed
- Change: UPDATE
