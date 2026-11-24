---
id: "01M85STPZSVF9F81HWQY8P6W8T"
kind: requirement
parent: 01M85STPZRXNKVPSGW6SP8TEVM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Furniture and object grids exist at declared sizes

Context: furniture is placeholder SVG. Desired behavior: grids with outlines and ramp shading for desk (80x32), old computer (30x34), lamp (16x30), plant (20x32), poster (28x36), bookshelf with books and globe (48x96), bed with patterned blanket (104x40), door (40x80) and rug (80x24), plus a ROOM_SOURCES list combining the shell and furniture. Expected result: nine more ArtSources at declared sizes with palette indices only. Why: completes the set SG-2.2 and SG-2.3 consume.

## Acceptance criteria
- Given each furniture source, when measured, then it equals its ROOM_ART_SIZES size
- Given the bookshelf, then it has wood indices plus at least two non-wood ramp indices for books and a globe; given the bed, then it has at least two blanket pattern ramp indices
- Given ROOM_SOURCES, then it has 13 unique ids covering every key of ROOM_ART_SIZES


## Scope
- In scope: src/art/roomFurniture.ts
- In scope: src/art/roomSources.ts
- Out of scope: Inventory icons
- Out of scope: Boy
- Out of scope: Registering in ART_SOURCES or manifest
- Preserve: ART_SOURCES
- Preserve: existing SVGs


## Technical constraints
- Only PALETTE indices
- Deterministic
- Native 480x270


## Dependencies
- R1


## Definition of done
- ROOM_SOURCES lists 13 sources


## Clarifying questions
- None
