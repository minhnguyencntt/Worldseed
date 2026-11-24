---
id: "01M85STPZSH3JBA3FEYSMHE0ZV"
kind: unit
parent: 01M85STPZRWT71HA4K8B2P0ARX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Draw helpers and room size registry unit tests

Write tests from the R1 acceptance criteria with no I/O.

## Acceptance criteria
- createGrid, fillRect, outlineRect, shadeRect, dither and rampIndex behave as specified
- ROOM_ART_SIZES lists 13 positive integer sizes and the shell heights sum to 270


## Scope
- In scope: game/frontend/tests/roomDraw.test.ts
- Out of scope: Concrete grids
- Preserve: Existing tests


## Technical constraints
- Unit tests only, nothing mocked is needed beyond pure imports
- Shared palette of at most 48 colours is read from src/lib/palette.ts, never copied


## Dependencies
- A1


## Definition of done
- roomDraw tests pass


## Clarifying questions
- None
