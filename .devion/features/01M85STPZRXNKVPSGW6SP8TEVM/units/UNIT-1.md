---
id: "01M85STPZS5G7Y9JBB0C3MT4EC"
kind: unit
parent: 01M85STPZRWT71HA4K8B2P0ARX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add draw helpers and the ROOM_ART_SIZES registry

Add pure helpers over number[][] grids that index PALETTE, plus the registry of declared sizes: wall 480x150, wainscot 480x40, floor 480x80, window 64x56, desk 80x32, computer 30x34, lamp 16x30, plant 20x32, poster 28x36, bookshelf 48x96, bed 104x40, door 40x80, rug 80x24. The first three together fill 480x270.

## Acceptance criteria
- draw.ts exports createGrid, fillRect, outlineRect, shadeRect, dither and rampIndex
- roomSizes.ts exports ROOM_ART_SIZES with the 13 declared sizes


## Scope
- In scope: Two new source files
- Out of scope: Concrete art grids
- Preserve: PALETTE_RAMPS ordering


## Technical constraints
- Shared palette of at most 48 colours stays defined once in src/lib/palette.ts
- 480x270 native resolution: wall+wainscot+floor heights sum to 270
- New file: `game/frontend/src/art/draw.ts`
- New file: `game/frontend/src/art/roomSizes.ts`


## Dependencies
- R1


## Definition of done
- Both files compile under tsc --noEmit


## Clarifying questions
- None
