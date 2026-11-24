# UNIT-800 — Act: Carry animations and origin into generated entries and register boy sources

## Summary
Extend ArtSource and generateAssets, add boy sources to ART_SOURCES, regenerate

## Description
ArtSource gains optional animations and origin; generateAssets copies them; BOY_SHEET_SOURCE declares idle/walk/interact; ART_SOURCES includes BOY_SOURCES; run art:generate to write PNGs and manifest.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/sources.ts` · `ArtSource` · L4-L8
- **Do:** Add optional fields animations?: AssetEntry['animations'] and origin?: AssetEntry['origin'] (import type AssetEntry from '@game/assets/manifest').

```
animations?: AssetEntry['animations']; origin?: AssetEntry['origin'];
```

- **Expected:** type compiles

### Step 2 — `game/frontend/src/art/boy.ts` · `BOY_SHEET_SOURCE` · end of sheet source
- **Do:** Add animations {idle:{frames:[0,1,2,3],frameRate:4,repeat:-1}, walk:{frames:[4,5,6,7,8,9],frameRate:10,repeat:-1}, interact:{frames:[10,11,12,13],frameRate:8,repeat:0}} and origin {x:0.5,y:1}.
- **Expected:** source declares three animations

### Step 3 — `game/frontend/src/lib/generateAssets.ts` · `generateAssets` · L36-L45
- **Do:** In the spritesheet entries.push, spread ...(source.animations ? { animations: source.animations } : {}) and ...(source.origin ? { origin: source.origin } : {}); do the same in the image branch.
- **Expected:** entries include animations and origin when provided

### Step 4 — `game/frontend/src/art/sources.ts` · `ART_SOURCES` · L35-L53
- **Do:** Import BOY_SOURCES from './boy' and append ...BOY_SOURCES to ART_SOURCES.

```
export const ART_SOURCES: ArtSource[] = [ {cursor...}, ...BOY_SOURCES ];
```

- **Expected:** ART_SOURCES contains boy ids

### Step 5 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets` · append
- **Do:** Run npm run art:generate in game/frontend; commit the regenerated manifest and PNGs boy.png and boy-portrait.png.
- **Run:** `cd game/frontend && npm run art:generate`
- **Expected:** manifest gains character:boy-art and character:boy-portrait entries

## Acceptance criteria
- entries carry animations and origin
- ART_SOURCES includes boy ids
- manifest regenerated and valid

## Definition of done
- npm run art:generate succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-800.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-163
- Requirement: REQ-401
- Unit (Act): UNIT-800
- Unit (Verify): UNIT-803
- Status: completed
- Change: UPDATE
