---
id: "01M84QQ159FD1MANE8X7F3PXFH"
kind: unit
parent: 01M84QQ15900SXMSEV51SJNEJD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the nine SVG assets under game/public/assets/worlds/the-boys-room

Copy the existing temporary pixel-art SVGs from game/frontend/public/assets/worlds/the-boys-room into game/public/assets/worlds/the-boys-room, keeping the subfolder layout, so the sources of truth agree with the manifest.

## Acceptance criteria
- Each of the nine SVG paths exists under game/public/assets
- Each SVG width/height matches manifest dimensions


## Scope
- In scope: Nine SVG files
- Out of scope: tests
- Out of scope: audio
- Preserve: frontend copies


## Technical constraints
- Content identical to the frontend copies
- New file: `game/public/assets/worlds/the-boys-room/backgrounds/bedroom-room.svg`
- New file: `game/public/assets/worlds/the-boys-room/furniture/bed.svg`
- New file: `game/public/assets/worlds/the-boys-room/furniture/bookshelf.svg`
- New file: `game/public/assets/worlds/the-boys-room/furniture/desk.svg`
- New file: `game/public/assets/worlds/the-boys-room/objects/old-computer.svg`
- New file: `game/public/assets/worlds/the-boys-room/objects/window.svg`
- New file: `game/public/assets/worlds/the-boys-room/objects/door.svg`
- New file: `game/public/assets/worlds/the-boys-room/characters/boy-sheet.svg`
- New file: `game/public/assets/worlds/the-boys-room/effects/dust.svg`


## Dependencies
- REQ1


## Definition of done
- Nine SVG files exist


## Clarifying questions
- None
