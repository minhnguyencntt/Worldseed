---
id: "01M84R6BDEKBMZJWW7DH2JN59T"
kind: unit
parent: 01M84R6BDE5EA9RG8W73J8ZY5B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add background layer and chair/wardrobe SVGs with manifest entries

Create wall, floor, window-view, lighting, chair and wardrobe pixel-art SVGs and add six entries to manifest.json.

## Acceptance criteria
- Six files exist at the paths in the manifest
- Six manifest entries carry matching dimensions


## Scope
- In scope: SVGs
- In scope: manifest.json
- Out of scope: tests
- Preserve: existing entries


## Technical constraints
- crispEdges, integer sizes
- New file: `game/public/assets/worlds/the-boys-room/backgrounds/wall.svg`
- New file: `game/public/assets/worlds/the-boys-room/backgrounds/floor.svg`
- New file: `game/public/assets/worlds/the-boys-room/backgrounds/window-view.svg`
- New file: `game/public/assets/worlds/the-boys-room/backgrounds/lighting.svg`
- New file: `game/public/assets/worlds/the-boys-room/furniture/chair.svg`
- New file: `game/public/assets/worlds/the-boys-room/furniture/wardrobe.svg`
- Code path: `game/public/assets/worlds/the-boys-room/manifest.json`


## Definition of done
- Files exist and entries added


## Clarifying questions
- None
