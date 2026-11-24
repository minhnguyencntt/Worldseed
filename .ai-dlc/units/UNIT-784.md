# UNIT-784 — Verify: generateAssets and mergeManifest unit tests

## Summary
Unit tests for planning and merge

## Description
Tests for generateAssets and mergeManifest from REQ-2 acceptance criteria.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/generateAssets.test.ts` · `new: sheet entry and PNG header match` · new
- **Do:** Make a source with four 32x48 frames of index 1; call generateAssets; assert entry.dimensions {width:128,height:48}, frames {32,48,4}, type 'spritesheet', assetSchema.safeParse(entry).success true and readPngSize(files[0].bytes) equals {128,48}.
- **Run:** `cd game/frontend && npx vitest run tests/generateAssets.test.ts`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/generateAssets.test.ts` · `new: single frame is image and bad index throws` · new
- **Do:** Assert a one-frame 16x16 source yields type 'image' without frames; assert a grid containing index 999 makes generateAssets throw /out of range/; assert ART_SOURCES ids are unique.
- **Run:** `cd game/frontend && npx vitest run tests/generateAssets.test.ts`
- **Expected:** Test passes

### Step 3 — `game/frontend/tests/generateAssets.test.ts` · `new: mergeManifest replaces by id` · new
- **Do:** With manifest assets [a,b,c] and an entry with id b changed, assert result order [a,b',c] with a and c deep-equal to the originals; an unknown id is appended last.
- **Run:** `cd game/frontend && npx vitest run tests/generateAssets.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- Sheet entry size and frames correct
- Single frame is image
- Merge replaces in place
- Out-of-range index throws

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-784.md`

## Links
- Evidence: EVD-159
- Requirement: REQ-391
- Unit (Act): UNIT-781
- Unit (Verify): UNIT-784
- Status: completed
- Change: UPDATE
