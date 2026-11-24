# UNIT-816 — Verify: Scene art sources are PNG-sized, palette-only and match the committed manifest

## Summary
Unit tests for ART_SOURCES coverage, sizes, palette and manifest equality

## Description
Tests written from the requirement: coverage of ids, declared PNG sizes, palette-only pixels and committed manifest equality. No disk writes.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/sceneArtSources.test.ts` · `new: describe('scene art sources')` · new
- **Do:** Add tests. (1) ids test: generateAssets(ART_SOURCES).entries ids include all 13 ROOM_ART_SIZES names prefixed 'room/', 'character:boy-sheet', 'character:boy-portrait', 'objects/secret-door-open', 'effect:dust', 'ui/cursor-hand'. (2) size test: for each generated file, readPngSize(bytes) equals the entry dimensions; secret door is 32x64, dust 4x4. (3) palette test: gridToRgba(frame, PALETTE) does not throw for every frame of every source. (4) manifest test: import the committed manifest JSON from '../../public/assets/worlds/the-boys-room/manifest.json' and expect each generated entry toEqual the committed entry with the same id.
- **Run:** `cd game/frontend && npx vitest run tests/sceneArtSources.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Every required id is produced by generateAssets(ART_SOURCES)
- Each generated PNG reads back its declared size and gridToRgba accepts every index
- Committed manifest entries equal generated entries

## Definition of done
- Test passes in under a few seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-816.md`

## Links
- Evidence: EVD-165
- Requirement: REQ-406
- Unit (Act): UNIT-812
- Unit (Verify): UNIT-816
- Status: completed
- Change: UPDATE
