# UNIT-374 — Act: Add the nine SVG assets under game/public/assets/worlds/the-boys-room

## Summary
Create the nine SVG files at manifest paths

## Description
Copy the existing temporary pixel-art SVGs from game/frontend/public/assets/worlds/the-boys-room into game/public/assets/worlds/the-boys-room, keeping the subfolder layout, so the sources of truth agree with the manifest.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/worlds/the-boys-room/backgrounds/bedroom-room.svg` · `new: bedroom-room.svg` · new
- **Do:** Create the 320x180 background SVG with the same content as game/frontend/public/assets/worlds/the-boys-room/backgrounds/bedroom-room.svg (202 bytes).

```
cp game/frontend/public/assets/worlds/the-boys-room/backgrounds/bedroom-room.svg game/public/assets/worlds/the-boys-room/backgrounds/ (mkdir -p first)
```

- **Expected:** File exists with width=320 height=180.

### Step 2 — `game/public/assets/worlds/the-boys-room/furniture/bed.svg` · `new: bed.svg, bookshelf.svg, desk.svg` · new
- **Do:** Create the three furniture SVGs (100x35, 44x90, 70x28) by copying the same-named files from game/frontend/public/assets/worlds/the-boys-room/furniture.

```
mkdir -p game/public/assets/worlds/the-boys-room/furniture && cp game/frontend/public/assets/worlds/the-boys-room/furniture/*.svg game/public/assets/worlds/the-boys-room/furniture/
```

- **Expected:** Three furniture SVGs exist.

### Step 3 — `game/public/assets/worlds/the-boys-room/objects/door.svg` · `new: old-computer.svg, window.svg, door.svg` · new
- **Do:** Create the three object SVGs (30x34, 60x50, 40x80) by copying the same-named files from game/frontend/public/assets/worlds/the-boys-room/objects.

```
mkdir -p game/public/assets/worlds/the-boys-room/objects && cp game/frontend/public/assets/worlds/the-boys-room/objects/*.svg game/public/assets/worlds/the-boys-room/objects/
```

- **Expected:** Three object SVGs exist.

### Step 4 — `game/public/assets/worlds/the-boys-room/characters/boy-sheet.svg` · `new: boy-sheet.svg, dust.svg` · new
- **Do:** Create boy-sheet.svg (64x48, two 32x48 frames) and effects/dust.svg (4x4) by copying from the frontend public tree.

```
mkdir -p game/public/assets/worlds/the-boys-room/{characters,effects} && cp game/frontend/public/assets/worlds/the-boys-room/characters/boy-sheet.svg game/public/assets/worlds/the-boys-room/characters/ && cp game/frontend/public/assets/worlds/the-boys-room/effects/dust.svg game/public/assets/worlds/the-boys-room/effects/
```

- **Expected:** Both files exist.

## Acceptance criteria
- Each of the nine SVG paths exists under game/public/assets
- Each SVG width/height matches manifest dimensions

## Definition of done
- Nine SVG files exist
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-374.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-074
- Requirement: REQ-187
- Unit (Act): UNIT-374
- Unit (Verify): UNIT-376
- Status: completed
- Change: UPDATE
