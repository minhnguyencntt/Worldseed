# UNIT-353 — Verify: Manifest validator unit tests

## Summary
Test parseManifest and parseAsset

## Description
Unit tests for validator results, error paths and duplicate ids.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/manifestValidate.test.ts` · `new: describe('parseManifest')` · new
- **Do:** Create tests importing parseManifest, parseAsset from ../src/assets/manifest: (1) {version:1,assets:[valid image]} gives ok true and data.assets[0].id equals 'bookshelf'; (2) asset with dimensions.width 0 gives ok false and an error containing 'assets.0.dimensions.width'; (3) two assets with id 'bed' gives ok false and an error containing 'duplicate asset id: bed'; (4) inputs null, 'x', 42 each give ok false and do not throw; (5) parseAsset of valid image gives ok true
- **Run:** `cd game && npx vitest run tests/manifestValidate.test.ts`
- **Expected:** All validator tests pass

## Acceptance criteria
- A valid manifest returns ok true and an invalid one returns ok false with the field path
- Duplicate ids are reported and non-object input does not throw

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-353.md`

## Links
- Evidence: EVD-069
- Requirement: REQ-176
- Unit (Act): UNIT-350
- Unit (Verify): UNIT-353
- Status: completed
- Change: UPDATE
