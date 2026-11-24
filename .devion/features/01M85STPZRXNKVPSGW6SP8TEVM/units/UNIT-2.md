---
id: "01M85STPZSE7BGE2TJJH53YEBD"
kind: unit
parent: 01M85STPZSV244986MJ9N7R0AK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author wall, wainscot, floor and window grids

Build four ArtSource entries using the draw helpers and ROOM_ART_SIZES.

## Acceptance criteria
- BACKGROUND_SOURCES has ids room/wall, room/wainscot, room/floor and room/window
- Each has one frame at its ROOM_ART_SIZES size


## Scope
- In scope: One new file
- Out of scope: Registering in ART_SOURCES
- Preserve: sources.ts


## Technical constraints
- Shared palette of at most 48 colours, referenced via rampIndex
- Native 480x270
- New file: `game/frontend/src/art/roomBackground.ts`


## Dependencies
- R2
- A1


## Definition of done
- File compiles


## Clarifying questions
- None
