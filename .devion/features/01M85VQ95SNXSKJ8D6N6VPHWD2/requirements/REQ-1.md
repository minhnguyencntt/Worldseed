---
id: "01M85VQ95S9RJ58YFG37R7B0AR"
kind: requirement
parent: 01M85VQ95SNXSKJ8D6N6VPHWD2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Every scene asset has a palette-grid source and a generated PNG with a manifest entry

Context: sources.ts ART_SOURCES holds only the hand cursor and BOY_SOURCES; ROOM_SOURCES (13 room/* grids) is not registered, and the secret door and dust mote have no grid. Desired: register all of them and regenerate. Expected: PNGs exist under public/assets and manifest.json has entries with real sizes. Why: content cannot reference PNG ids that do not exist.

## Acceptance criteria
- Given ART_SOURCES, when generateAssets runs, then entries exist for the 13 room/* ids, character:boy-sheet, character:boy-portrait, objects/secret-door-open, effect:dust and ui/cursor-hand
- Given the generated secret door and dust grids, when sizes are read, then they are 32x64 and 4x4 and use only palette indices
- Given the committed manifest, when its entries are compared to generateAssets output, then they are equal


## Scope
- In scope: New sceneExtras.ts sources
- In scope: Registering ROOM_SOURCES in ART_SOURCES
- In scope: Running art:generate
- Out of scope: Redrawing existing room or boy grids
- Preserve: ROOM_ART_SIZES keys and its 13-name test
- Preserve: encodePng determinism


## Technical constraints
- Palette-indexed grids, deterministic generation, shared palette of at most 48 colours
- Do not add ids to ROOM_ART_SIZES


## Dependencies
- INT


## Definition of done
- art:generate has been run and its outputs are in the tree


## Clarifying questions
- None
