---
id: "01M85TDR9EXAXWFQ96P0WTH5P8"
kind: requirement
parent: 01M85TDR9D0794KHV7H7G8BVSN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Boy sheet grids hold 14 frames of 32x48 with outlines and ramp shading

Context: ArtSource frames are palette-index grids; draw.ts offers createGrid, fillRect, outlineRect, shadeRect, dither, rampIndex. Desired: a boy in a blue hoodie with indigo outline drawn per frame. Expected: one ArtSource with 14 frames of 32 wide, 48 high. Why: the visual target requires an animated boy.

## Acceptance criteria
- Given BOY_SOURCES, when the sheet source is read, then it has exactly 14 frames each 48 rows by 32 columns
- Given any frame, when its indices are checked, then every index is below PALETTE.length
- Given idle, walk and interact frames, when compared, then frames within an animation differ from each other


## Scope
- In scope: src/art/boy.ts sheet grids
- Out of scope: portrait
- Out of scope: manifest
- Preserve: draw.ts helpers unchanged


## Technical constraints
- Shared palette of at most 48 colours
- Deterministic pure drawing functions


## Definition of done
- boy sheet source exported


## Clarifying questions
- None
