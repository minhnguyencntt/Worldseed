# UNIT-820 — Act: Author item icon grids and add them to ART_SOURCES

## Summary
Create itemIcons.ts with six 16x16 grids and wire ITEM_SOURCES into ART_SOURCES

## Description
Create game/frontend/src/art/itemIcons.ts following the pattern of sceneExtras.ts (ArtSource entries built from draw.ts helpers) and spread the result into ART_SOURCES in sources.ts so the existing generator picks it up.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/art/itemIcons.ts` · `new: ITEM_ICON_SIZE and grid functions oldKeyGrid, noteGrid, bookGrid, coinGrid, flashlightGrid, photoGrid` · new
- **Do:** Create the file importing ArtSource from './sources' and createGrid, fillRect, outlineRect, rampIndex, shadeRect, dither, Grid from './draw'. Export const ITEM_ICON_SIZE = 16 and OUTLINE = rampIndex('indigo', 0). Each function starts from createGrid(16, 16, 0) and draws a distinct silhouette: old-key (brass ramp: ring at top, shaft, two teeth), note (parchment ramp rectangle with two moon-step-2 text lines), book (plum ramp cover with parchment page edge), coin (brass ramp disc with step 5 highlight), flashlight (moon ramp body, lamp step 5 lens), photo (parchment frame with moon ramp picture and hoodie step 3 figure). Each uses outlineRect or fillRect with OUTLINE around its shape and at least two ramp steps.

```
export function coinGrid(): Grid {
  const g = createGrid(ITEM_ICON_SIZE, ITEM_ICON_SIZE, 0);
  fillRect(g, 3, 3, 10, 10, rampIndex('brass', 3));
  fillRect(g, 4, 4, 3, 3, rampIndex('brass', 5));
  outlineRect(g, 3, 3, 10, 10, OUTLINE);
  return g;
}
```

- **Expected:** Six functions each return a 16x16 Grid of palette indices.

### Step 2 — `game/frontend/src/art/itemIcons.ts` · `new: ITEM_SOURCES` · new
- **Do:** Export ITEM_SOURCES: ArtSource[] with six entries of the form { id: 'item/old-key', path: 'worlds/the-boys-room/items/old-key.png', frames: [oldKeyGrid()] } for old-key, note, book, coin, flashlight and photo.

```
export const ITEM_SOURCES: ArtSource[] = [
  { id: 'item/old-key', path: 'worlds/the-boys-room/items/old-key.png', frames: [oldKeyGrid()] },
  // note, book, coin, flashlight, photo follow the same shape
];
```

- **Expected:** ITEM_SOURCES has six entries with unique ids and paths.

### Step 3 — `game/frontend/src/art/sources.ts` · `ART_SOURCES` · L8 and the ART_SOURCES array
- **Do:** Add import { ITEM_SOURCES } from './itemIcons'; after the SCENE_EXTRA_SOURCES import, and add ...ITEM_SOURCES, after ...SCENE_EXTRA_SOURCES, inside the ART_SOURCES array.

```
...SCENE_EXTRA_SOURCES, -> ...SCENE_EXTRA_SOURCES,
  ...ITEM_SOURCES,
```

- **Expected:** ART_SOURCES contains the six item sources; npm run typecheck passes.

## Acceptance criteria
- itemIcons.ts exports ITEM_ICON_SIZE (16), six grid functions and ITEM_SOURCES with six entries.
- sources.ts spreads ITEM_SOURCES into ART_SOURCES after SCENE_EXTRA_SOURCES.
- Each grid uses rampIndex colours and an indigo step 0 outline, with no hardcoded raw indices other than 0 for transparent.

## Definition of done
- npm run typecheck passes in game/frontend for the new module.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-820.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-166
- Requirement: REQ-410
- Unit (Act): UNIT-820
- Unit (Verify): UNIT-822
- Status: completed
- Change: UPDATE
