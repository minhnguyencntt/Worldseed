---
id: "01M84QQ15900SXMSEV51SJNEJD"
kind: requirement
parent: 01M84QQ159MHYMS1M5PZ0GQ0KJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Manifest SVG image and spritesheet assets exist under game/public/assets

Context: backgrounds/bedroom-room.svg, furniture/{bed,bookshelf,desk}.svg, objects/{old-computer,window,door}.svg, characters/boy-sheet.svg and effects/dust.svg are referenced by manifest.json but missing under game/public/assets. Desired behavior: each exists with width/height equal to the manifest dimensions. Why: pixel-art friendly assets must not be stretched.

## Acceptance criteria
- Given the manifest, When each of the nine SVG paths is resolved under game/public/assets, Then a file exists
- Given each SVG, When its root width and height attributes are read, Then they equal the manifest dimensions
- Given each SVG, When parsed, Then it starts with an svg root element using crispEdges rendering


## Scope
- In scope: Nine SVG files
- Out of scope: Audio
- Out of scope: manifest edits
- Preserve: frontend/public copies


## Technical constraints
- Dimensions from manifest.json: 320x180, 100x35, 44x90, 70x28, 30x34, 60x50, 40x80, 64x48, 4x4


## Dependencies
- INT


## Definition of done
- Nine SVGs present and dimension-correct


## Clarifying questions
- None
