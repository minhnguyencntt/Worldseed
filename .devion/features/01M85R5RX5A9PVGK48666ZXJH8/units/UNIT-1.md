---
id: "01M85R5RX6YZVAEZ9R6Z2ACT2K"
kind: unit
parent: 01M85R5RX56ZHZ9773JNNNAFY1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create gridToRgba in the frontend lib

Create the pure function that converts a palette-indexed grid to RGBA using PALETTE from palette.ts, throwing on invalid indices or ragged rows.

## Acceptance criteria
- gridToRgba(grid) returns width, height and RGBA data of length width*height*4
- An out-of-range or non-integer index throws


## Scope
- In scope: new file game/frontend/src/lib/gridToRgba.ts
- Out of scope: tests
- Out of scope: spriteSheet
- Preserve: palette.ts unchanged


## Technical constraints
- Shared palette of at most 48 colours is the only colour source
- Pure, deterministic, no I/O
- New file: `game/frontend/src/lib/gridToRgba.ts`


## Definition of done
- File exists, exports gridToRgba and RgbaImage, and tsc --noEmit accepts it


## Clarifying questions
- None
