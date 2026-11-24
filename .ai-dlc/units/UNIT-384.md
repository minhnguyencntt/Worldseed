# UNIT-384 — Act: Add background layer and chair/wardrobe SVGs with manifest entries

## Summary
Create six SVGs and register them

## Description
Create wall, floor, window-view, lighting, chair and wardrobe pixel-art SVGs and add six entries to manifest.json.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/worlds/the-boys-room/backgrounds/wall.svg` · `new: wall.svg` · new
- **Do:** Create a 320x120 SVG with shape-rendering="crispEdges": a warm beige wall rect, a darker wainscot strip and a few baseboard rects. Same for floor.svg (320x60 wood planks in two browns), window-view.svg (60x50 night sky blue with stars and moon), lighting.svg (320x180 translucent warm-yellow rect and darker corner rects using fill-opacity), chair.svg (24x32 brown chair) and wardrobe.svg (48x90 dark wood with two doors and handles).

```
<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120" shape-rendering="crispEdges"><rect width="320" height="120" fill="#d8c4a0"/><rect y="96" width="320" height="24" fill="#b89c70"/></svg>
```

- **Expected:** Six SVG files exist, each with width/height equal to its stated size

### Step 2 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets array` · after L109
- **Do:** Append six entries: background:wall (320x120), background:floor (320x60), background:window-view (60x50), background:lighting (320x180), furniture:chair (24x32, interactionBounds 0,0,24,32), furniture:wardrobe (48x90, interactionBounds 0,0,48,90), each type image with path relative to worlds/the-boys-room.

```
{ "id": "background:wall", "path": "worlds/the-boys-room/backgrounds/wall.svg", "type": "image", "dimensions": { "width": 320, "height": 120 } }
```

- **Expected:** Manifest parses with six more unique ids

## Acceptance criteria
- Six files exist at the paths in the manifest
- Six manifest entries carry matching dimensions

## Definition of done
- Files exist and entries added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-384.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-077
- Requirement: REQ-192
- Unit (Act): UNIT-384
- Unit (Verify): UNIT-389
- Status: completed
- Change: UPDATE
