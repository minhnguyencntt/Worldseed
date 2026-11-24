# UNIT-812 — Act: Add secret door and dust sources, register room sources and run art:generate

## Summary
New sceneExtras sources, ART_SOURCES registration, regenerated PNGs and manifest

## Description
Create secret-door and dust grids with draw.ts helpers, add ROOM_SOURCES and the extras to ART_SOURCES, then run the generator so PNGs and manifest entries are committed.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/sceneExtras.ts` · `new: secretDoorGrid, dustGrid, SCENE_EXTRA_SOURCES` · new
- **Do:** Create the file. Import createGrid, fillRect, outlineRect, shadeRect, rampIndex from './draw' and type ArtSource from './sources'. secretDoorGrid returns a 32x64 Grid: shadeRect indigo interior, outlineRect brass frame, fillRect a lamp-ramp strip on the bottom row. dustGrid returns a 4x4 Grid of moon ramp step 4 with transparent corners (index 0). Export SCENE_EXTRA_SOURCES with ids 'objects/secret-door-open' (path worlds/the-boys-room/objects/secret-door-open.png) and 'effect:dust' (path worlds/the-boys-room/effects/dust.png).

```
export const SCENE_EXTRA_SOURCES: ArtSource[] = [
  { id: 'objects/secret-door-open', path: 'worlds/the-boys-room/objects/secret-door-open.png', frames: [secretDoorGrid()] },
  { id: 'effect:dust', path: 'worlds/the-boys-room/effects/dust.png', frames: [dustGrid()] },
];
```

- **Expected:** The module exports two single-frame sources of 32x64 and 4x4

### Step 2 — `game/frontend/src/art/sources.ts` · `ART_SOURCES` · L6, L66-L72
- **Do:** Add imports of ROOM_SOURCES from './roomSources' and SCENE_EXTRA_SOURCES from './sceneExtras'. Change the ART_SOURCES array to spread them after BOY_SOURCES. Make the ArtSource import in roomBackground/roomFurniture stay type-only to avoid a runtime cycle.

```
...BOY_SOURCES,  ->  ...BOY_SOURCES,
  ...ROOM_SOURCES,
  ...SCENE_EXTRA_SOURCES,
```

- **Expected:** ART_SOURCES has 1 + 2 + 13 + 2 sources

### Step 3 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets` · whole file
- **Do:** From game/frontend run the generator so every source is written as a PNG and merged into manifest.json (existing ids replaced in place, new ids appended).
- **Run:** `cd game/frontend && npm run art:generate`
- **Expected:** room/*.png, secret-door-open.png and dust.png exist and manifest.json contains the room/* ids

## Acceptance criteria
- ART_SOURCES contains room, boy, extras and cursor sources
- npm run art:generate completes and writes room/*.png, secret-door and dust PNGs

## Definition of done
- Generated files committed
- Manifest passes parseManifest
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-812.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-165
- Requirement: REQ-406
- Unit (Act): UNIT-812
- Unit (Verify): UNIT-816
- Status: completed
- Change: UPDATE
