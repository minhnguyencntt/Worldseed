# UNIT-813 — Act: Re-lay out bedroom.yaml on PNG ids and prune SVG entries from the manifest

## Summary
Switch objects, boy and dust to PNG ids and remove svg manifest entries

## Description
Edit the scene content to the new ids and 480x270 layout, and remove every manifest entry whose path ends .svg.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `characters[boy].animations` · L41-L50
- **Do:** Point idle, walk and interact at the one sheet and set position to x 230, y 240.

```
idle: { asset: character:boy-sheet, animation: idle }
walk: { asset: character:boy-sheet, animation: walk }
interact: { asset: character:boy-sheet, animation: interact }
```

- **Expected:** The boy resolves all three animations from character:boy-sheet

### Step 2 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `objects (existing seven)` · L52-L225
- **Do:** Change asset and position and interactionBounds: bed room/bed (290,165) bounds 104x40; bookshelf room/bookshelf (150,60) 48x96; desk room/desk (20,150) 80x32; old-computer room/computer (45,118) 30x34; window room/window (60,30) 64x56; door room/door (410,100) 40x80; secret-door-open objects/secret-door-open (158,92) bounds 32x64. Keep ids, actions, events, visibleWhen, persistentState unchanged.
- **Expected:** The seven existing objects use room/* or secret-door PNG ids at 480x270 positions with unchanged ids and actions

### Step 3 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `objects (new decor)` · after L225
- **Do:** Append decor objects with actions: [] and scale 1: wall room/wall (0,0) layer background; wainscot room/wainscot (0,150) background; floor room/floor (0,190) background; rug room/rug (170,215) background; poster room/poster (210,40) furniture; lamp room/lamp (80,120) furniture; plant room/plant (112,152) furniture. Use ids wall, wainscot, floor, rug, poster, lamp, plant and matching names.
- **Expected:** Scene has 14 objects, wall first in layer order

### Step 4 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `effects[dust].area` · L231-L235
- **Do:** Change area to width 480 height 270 keeping asset effect:dust.

```
area: { x: 0, y: 0, width: 320, height: 180 } -> area: { x: 0, y: 0, width: 480, height: 270 }
```

- **Expected:** Dust covers the 480x270 scene

### Step 5 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets` · whole file
- **Do:** Delete every entry whose path ends .svg: scene:bedroom, objects/bed, bookshelf, desk, old-computer, window, door, books, secret-door-closed, character:boy, character:boy-walk, character:boy-interact, effect:glow, ui:icon-sound, ui:panel-frame, ui:cursor-pointer, background:wall/floor/window-view/lighting, furniture:chair, furniture:wardrobe. Keep audio:ambient-room and all generated PNG entries.
- **Run:** `grep -c '\.svg' game/public/assets/worlds/the-boys-room/manifest.json`
- **Expected:** Prints 0

## Acceptance criteria
- bedroom.yaml references only PNG ids
- manifest.json has no .svg path

## Definition of done
- Positions inside 480x270
- Content loads through runtime/content.ts
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-813.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-165
- Requirement: REQ-407
- Unit (Act): UNIT-813
- Unit (Verify): UNIT-817
- Status: completed
- Change: UPDATE
