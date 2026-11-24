---
id: "01M85STPZRWT71HA4K8B2P0ARX"
kind: requirement
parent: 01M85STPZRXNKVPSGW6SP8TEVM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Pure grid drawing helpers and a declared-size registry exist

Context: sources.ts builds grids from character maps only. Desired behavior: pure helper functions create a grid, fill and outline rectangles, apply ramp shading and dither, and map ramp name and step to a PALETTE index. A registry declares width and height for every room art id. Expected result: later grids are built from these helpers against declared sizes. Why: one shared toolkit keeps outlines and shading consistent and testable.

## Acceptance criteria
- Given createGrid(w,h,idx), when called, then it returns an h-row by w-column grid of idx
- Given rampIndex('wood',2), when called, then it returns the PALETTE index of PALETTE_RAMPS.wood[2]
- Given ROOM_ART_SIZES, when read, then it has an entry with positive integer width and height for each of the 13 room ids


## Scope
- In scope: src/art/draw.ts helpers
- In scope: src/art/roomSizes.ts registry
- Out of scope: Any concrete room grid
- Out of scope: Manifest changes
- Preserve: src/lib/palette.ts values
- Preserve: src/lib/gridToRgba.ts behaviour


## Technical constraints
- Shared palette is defined once in src/lib/palette.ts and only referenced
- Pure functions, no I/O or randomness


## Dependencies
- INT


## Definition of done
- Helpers and registry exported and typed


## Clarifying questions
- None
