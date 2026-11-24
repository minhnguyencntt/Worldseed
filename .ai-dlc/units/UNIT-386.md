# UNIT-386 — Act: Add boy walk and interact sheets and glow effect with manifest entries

## Summary
Create three SVGs and register sheets with animations

## Description
Create walk and interact spritesheets and glow effect, register with frames and animations.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/worlds/the-boys-room/characters/boy-walk.svg` · `new: boy-walk.svg` · new
- **Do:** Create a 128x48 crispEdges SVG with four 32x48 frames styled like boy-sheet.svg (head #e8c8a0, body #c05050) where leg rects alternate position per frame. Create boy-interact.svg 96x48 with three frames where the arm rect extends further each frame. Create glow.svg 16x16 with concentric warm-yellow rects of decreasing fill-opacity.
- **Expected:** Three SVG files with stated sizes

### Step 2 — `game/public/assets/worlds/the-boys-room/manifest.json` · `assets array` · after character:boy entry
- **Do:** Add character:boy-walk (spritesheet, 128x48, frames 32/48/4, animations.walk frames [0,1,2,3] frameRate 8 repeat -1, origin 0.5,1), character:boy-interact (spritesheet, 96x48, frames 32/48/3, animations.interact frames [0,1,2] frameRate 6 repeat 0, origin 0.5,1) and effect:glow (image 16x16).

```
"animations": { "walk": { "frames": [0,1,2,3], "frameRate": 8, "repeat": -1 } }
```

- **Expected:** Manifest parses with three more ids

## Acceptance criteria
- Sheet widths equal frameWidth*frameCount
- Animations reference valid frames

## Definition of done
- Files exist and entries added
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-386.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-077
- Requirement: REQ-194
- Unit (Act): UNIT-386
- Unit (Verify): UNIT-391
- Status: completed
- Change: UPDATE
