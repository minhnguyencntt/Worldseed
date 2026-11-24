---
id: "01M85TDR9EMAXPHV60Q2H7XFDG"
kind: unit
parent: 01M85TDR9EXAXWFQ96P0WTH5P8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author the boy sheet frames in boy.ts

Create src/art/boy.ts with pure functions drawing the boy per pose using draw.ts, and export the sheet ArtSource.

## Acceptance criteria
- boy sheet source has 14 frames of 32x48
- frames use indices within the palette


## Scope
- In scope: new src/art/boy.ts
- Out of scope: portrait
- Out of scope: generator
- Preserve: draw.ts


## Technical constraints
- Shared palette ≤48 colours
- Deterministic pure functions
- New file: `game/frontend/src/art/boy.ts`


## Definition of done
- BOY_SHEET_SOURCE exported with 14 frames


## Clarifying questions
- None
