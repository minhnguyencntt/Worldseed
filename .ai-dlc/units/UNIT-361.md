# UNIT-361 — Act: Author the-boys-room manifest.json

## Summary
Write the manifest entries for all created assets.

## Description
Create manifest.json with version 1 and an asset entry per file created for the-boys-room and ui.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/public/assets/worlds/the-boys-room/manifest.json` · `new: manifest.json` · new
- **Do:** Create JSON {version:1, assets:[...]} with entries: scene:bedroom background (image 320x180, origin 0,0), objects/bed (100x35), objects/bookshelf (44x90), objects/desk (70x28), objects/old-computer (30x34), objects/window (60x50), objects/door (40x80), each with its relative path and interactionBounds {x:0,y:0,width,height}; character:boy spritesheet (path worlds/the-boys-room/characters/boy-sheet.svg, dimensions 64x48, frames {frameWidth:32,frameHeight:48,frameCount:2}, animations.idle {frames:[0,1],frameRate:2,repeat:-1}, origin 0.5,1); effect:dust image 4x4; audio:ambient-room type audio; ui:icon-sound, ui:panel-frame, ui:cursor-pointer images with ui/ paths.

```
{"version":1,"assets":[{"id":"objects/bed","path":"worlds/the-boys-room/furniture/bed.svg","type":"image","dimensions":{"width":100,"height":35},"interactionBounds":{"x":0,"y":0,"width":100,"height":35}}]}
```

- **Expected:** JSON lists 17 assets, all valid

## Acceptance criteria
- Given the file, when parsed, then it satisfies manifestSchema
- Given each entry, when its path is resolved, then the file exists

## Definition of done
- File written
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-361.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-071
- Requirement: REQ-181
- Unit (Act): UNIT-361
- Unit (Verify): UNIT-364
- Status: completed
- Change: UPDATE
