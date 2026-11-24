---
id: "01M85QW2EBXVMD69T7ERA37QBB"
kind: requirement
parent: 01M85QW2EA0XY4GZ16JRJP5BE5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · gridToRgba converts a palette-indexed grid to RGBA and rejects bad indices

Context: palette colours are hex strings in PALETTE. Desired behaviour: gridToRgba(grid) returns width, height and a Uint8ClampedArray of RGBA. Index -1 means transparent (alpha 0); any other index outside 0..PALETTE.length-1, or a non-integer, throws a RangeError; rows of unequal length throw. Expected result: every opaque pixel equals a PALETTE colour. Why: guarantees art uses only the shared palette.

## Acceptance criteria
- Given a 3x2 grid, when converted, then width is 3, height is 2 and data length is 24.
- Given any valid grid, when converted, then each opaque pixel's rgb matches the hex of PALETTE[index] with alpha 255.
- Given index 48, -2 or 1.5, when converted, then a RangeError is thrown.
- Given the same grid twice, when converted, then the byte arrays are equal.


## Scope
- In scope: gridToRgba and a hex-to-rgb helper
- Out of scope: Sheet layout
- Out of scope: PNG encoding
- Preserve: PALETTE definition


## Technical constraints
- Palette of at most 48 colours, defined once and reused.
- Pure function, no I/O.


## Dependencies
- INT


## Definition of done
- gridToRgba is exported from game/frontend/src/art/pixelGrid.ts.


## Clarifying questions
- None
