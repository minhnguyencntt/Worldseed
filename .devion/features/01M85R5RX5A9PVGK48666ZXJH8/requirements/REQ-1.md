---
id: "01M85R5RX56ZHZ9773JNNNAFY1"
kind: requirement
parent: 01M85R5RX5A9PVGK48666ZXJH8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · gridToRgba converts a palette-indexed grid to RGBA and rejects out-of-range indices

Context: no gridToRgba exists under game/. Desired behaviour: gridToRgba(grid, palette = PALETTE) takes rows of palette indices and returns {width, height, data} where data is a Uint8ClampedArray of length width*height*4 with alpha 255. Expected result: every pixel RGB equals a palette colour; any index that is not an integer in 0..palette.length-1, or a ragged row, throws. Why: art is authored as palette-indexed grids.

## Acceptance criteria
- Given a 3x2 grid of valid indices, when gridToRgba runs, then width is 3, height is 2 and data length is 24
- Given a valid grid, when each pixel is read back, then its RGB equals the hex colour of the palette entry at that index with alpha 255
- Given an index equal to palette.length, a negative index or a non-integer, when gridToRgba runs, then it throws an Error naming the index
- Given rows of unequal length or an empty grid, when gridToRgba runs, then it throws


## Scope
- In scope: gridToRgba function and RgbaImage type
- Out of scope: transparency
- Out of scope: PNG encoding
- Preserve: PALETTE export


## Technical constraints
- Pure function; reads colours only from the shared palette passed in (default PALETTE from game/frontend/src/lib/palette.ts)
- Palette of at most 48 colours defined once


## Definition of done
- gridToRgba exported from game/frontend/src/lib/gridToRgba.ts


## Clarifying questions
- None
