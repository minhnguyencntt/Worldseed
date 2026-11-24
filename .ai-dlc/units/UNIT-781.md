# UNIT-781 — Act: Add art sources, generateAssets and mergeManifest

## Summary
Create sources registry and pure generation functions

## Description
Add game/frontend/src/art/sources.ts with the ArtSource type and one seed hand-cursor source, and game/frontend/src/lib/generateAssets.ts with generateAssets and mergeManifest.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/sources.ts` · `new: ArtSource, ART_SOURCES` · new
- **Do:** Export interface ArtSource {id:string; path:string; frames: number[][][]} and ART_SOURCES array holding one source id 'ui/cursor-hand', path 'ui/cursors/hand.png', one 16x16 frame of palette indices (0 transparent-free background index 0, hand outline index 36, fill index 29).
- **Expected:** ART_SOURCES has length 1 with a 16x16 frame

### Step 2 — `game/frontend/src/lib/generateAssets.ts` · `new: generateAssets` · new
- **Do:** Export generateAssets(sources, palette=PALETTE) returning {files:{path,bytes}[], entries:ManifestEntry[]}: map frames through gridToRgba, buildSpriteSheet, encodePng; entry is {id,path,type:'spritesheet',dimensions,frames:{frameWidth,frameHeight,frameCount}} when frameCount>1 else {id,path,type:'image',dimensions}.
- **Expected:** Entries match the sheet size and frame count

### Step 3 — `game/frontend/src/lib/generateAssets.ts` · `new: mergeManifest` · new
- **Do:** Export mergeManifest(manifest:{version:number;assets:ManifestEntry[]}, entries) returning a new manifest where an entry with the same id replaces the old in place and unmatched entries are appended; other assets unchanged.
- **Expected:** Existing unrelated entries are untouched

## Acceptance criteria
- generateAssets returns bytes and a valid entry per source
- mergeManifest replaces by id and keeps others

## Definition of done
- Typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-781.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-159
- Requirement: REQ-391
- Unit (Act): UNIT-781
- Unit (Verify): UNIT-784
- Status: completed
- Change: NEW
