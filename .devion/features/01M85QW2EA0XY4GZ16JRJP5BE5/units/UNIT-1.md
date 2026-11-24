---
id: "01M85QW2EB86F265E3NWCYMBVZ"
kind: unit
parent: 01M85QW2EBXVMD69T7ERA37QBB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add gridToRgba to the art module

Create the pure module converting a palette-indexed grid into RGBA bytes using PALETTE from src/lib/palette.ts.

## Acceptance criteria
- gridToRgba returns width, height and RGBA data for valid grids.
- Out-of-range or non-integer indices throw RangeError.


## Scope
- In scope: game/frontend/src/art/pixelGrid.ts
- Out of scope: tests
- Out of scope: sheet layout
- Preserve: src/lib/palette.ts


## Technical constraints
- Reuse PALETTE; do not redefine colours (shared palette, max 48).
- Phaser stays on 3.90.x.
- New file: `game/frontend/src/art/pixelGrid.ts`


## Dependencies
- REQ1


## Definition of done
- Module compiles under tsc --noEmit and exports PixelGrid, TRANSPARENT and gridToRgba.


## Non-functional requirements
- Pure and deterministic.


## Clarifying questions
- None
