# UNIT-371 — Act: Confirm checkAssetRefs is pure and exported for chained tests

## Summary
Ensure checkAssetRefs takes a manifest and refs only

## Description
checkAssetRefs is a pure exported function over an AssetManifest and string refs; confirm so it can be chained after the mocked loader.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/loaders/manifestLoader.ts` · `checkAssetRefs` · L83-L86
- **Do:** Confirm it only builds a Set of manifest asset ids and maps refs to ManifestIssue entries; make no edit if so
- **Expected:** No I/O in checkAssetRefs

## Acceptance criteria
- checkAssetRefs is exported
- It has no I/O

## Definition of done
- Function confirmed pure
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-371.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-073
- Requirement: REQ-186
- Unit (Act): UNIT-371
- Unit (Verify): UNIT-373
- Status: completed
- Change: UPDATE
