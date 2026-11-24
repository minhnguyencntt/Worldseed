# UNIT-345 — Verify: Manifest and object schema unit tests

## Summary
Unit tests for valid and invalid manifests and objects

## Description
Test schemas accept valid and reject invalid data.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestSchema.test.ts` · `new: describe('assetManifestSchema')` · new
- **Do:** Add tests: valid spritesheet entry with frames, animations, origin and interactionBounds parses; entry missing id fails with issue path ['assets',0,'id']; width -1 fails; type 'bogus' fails
- **Run:** `cd game && npx vitest run tests/manifestSchema.test.ts -t assetManifestSchema`
- **Expected:** Manifest schema tests pass

### Step 2 — `game/tests/manifestSchema.test.ts` · `new: describe('worldObjectSchema')` · after previous describe
- **Do:** Add tests: object with position, scale, layer 'furniture', bounds, actions ['inspect','push'], visibleWhen [{flag:'x',equals:true}], persistentState {flag:'secret_open'} parses and scale defaults to 1 when omitted; layer 'sky' fails; action 'fly' fails
- **Run:** `cd game && npx vitest run tests/manifestSchema.test.ts -t worldObjectSchema`
- **Expected:** Object schema tests pass

## Acceptance criteria
- Valid manifest and object parse
- Invalid entries fail with field path

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-345.md`

## Links
- Evidence: EVD-068
- Requirement: REQ-171
- Unit (Act): UNIT-342
- Unit (Verify): UNIT-345
- Status: completed
- Change: UPDATE
