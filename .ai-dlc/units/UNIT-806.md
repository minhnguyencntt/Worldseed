# UNIT-806 — Act: Carry animations and origin into generated entries and register boy sources

## Summary
Extend ArtSource and generateAssets, add boy animations, register in ART_SOURCES

## Description
Add optional animations and origin to ArtSource, copy them in generateAssets, declare boy animations and origin, register BOY_SOURCES.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/sources.ts` · `ArtSource` · L4-L8
- **Do:** Add optional fields animations?: Record<string, AnimationDef> and origin?: Origin, importing types AnimationDef and Origin from '@game/assets/manifest'.

```
animations?: Record<string, AnimationDef>;
origin?: Origin;
```

- **Expected:** ArtSource accepts the new optional fields

### Step 2 — `game/frontend/src/art/sources.ts` · `ART_SOURCES` · L47-L52
- **Do:** Import BOY_SOURCES from './boy' and change the array to [hand cursor entry, ...BOY_SOURCES].
- **Expected:** ART_SOURCES lists cursor-hand then the boy sheet and portrait

### Step 3 — `game/frontend/src/lib/generateAssets.ts` · `generateAssets` · L22-L53
- **Do:** In both entries.push calls, spread optional fields: ...(source.animations ? { animations: source.animations } : {}), ...(source.origin ? { origin: source.origin } : {}).
- **Expected:** Entries include animations and origin only when the source has them

### Step 4 — `game/frontend/src/art/boy.ts` · `BOY_SHEET_SOURCE` · end of object
- **Do:** Add animations idle {frames:[0,1,2,3],frameRate:6,repeat:-1}, walk {frames:[4,5,6,7,8,9],frameRate:10,repeat:-1}, interact {frames:[10,11,12,13],frameRate:8,repeat:0} and origin {x:0.5,y:1}.
- **Expected:** Sheet source declares three animations and origin

## Acceptance criteria
- Entries copy animations and origin when present
- ART_SOURCES includes boy sources

## Definition of done
- Typecheck passes for touched files
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-806.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-164
- Requirement: REQ-404
- Unit (Act): UNIT-806
- Unit (Verify): UNIT-810
- Status: completed
- Change: NEW
