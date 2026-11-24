---
id: "01M85STPZSRGX7GFXFBBKBWHGS"
kind: unit
parent: 01M85STPZSVF9F81HWQY8P6W8T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author furniture grids and the ROOM_SOURCES list

Draw nine furniture pieces with helper outlines (indigo step 0 outline) and ramp shading, then combine with BACKGROUND_SOURCES.

## Acceptance criteria
- FURNITURE_SOURCES has nine entries at declared sizes
- ROOM_SOURCES has 13 entries


## Scope
- In scope: Two new files
- Out of scope: Changing ART_SOURCES
- Preserve: sources.ts


## Technical constraints
- Shared palette of at most 48 colours referenced via rampIndex
- Native 480x270
- New file: `game/frontend/src/art/roomFurniture.ts`
- New file: `game/frontend/src/art/roomSources.ts`


## Dependencies
- R3
- A2


## Definition of done
- Files compile


## Clarifying questions
- None
