---
id: "01M84R6BDE5EA9RG8W73J8ZY5B"
kind: requirement
parent: 01M84R6BDDCWAHWSDPXDTY229G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Background layers and furniture exist as separate registered assets

Context: only a flattened bedroom-room.svg background and bed, bookshelf and desk furniture exist. Desired behavior: separate wall, floor, window-view and lighting layers, plus chair and wardrobe furniture files, each in the manifest with exact dimensions. Expected result: layers can be replaced individually. Why: layer-based architecture.

## Acceptance criteria
- Given the manifest, when read, then ids background:wall, background:floor, background:window-view, background:lighting, furniture:chair and furniture:wardrobe exist
- Given each new SVG, when its width and height are read, then they equal the manifest dimensions
- Given the new SVGs, when scanned, then they contain more than one fill color and are not a single gray rect


## Scope
- In scope: 6 new SVG files
- In scope: 6 manifest entries
- Out of scope: removing scene:bedroom
- Preserve: existing bed, bookshelf, desk entries


## Technical constraints
- 320x180 logical room size for full-room layers


## Definition of done
- Files and entries committed


## Clarifying questions
- None
