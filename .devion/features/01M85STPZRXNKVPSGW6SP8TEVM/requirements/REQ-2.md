---
id: "01M85STPZSV244986MJ9N7R0AK"
kind: requirement
parent: 01M85STPZRXNKVPSGW6SP8TEVM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Wall, wainscot, floor and window grids exist at declared sizes

Context: the room shell is one flat SVG. Desired behavior: grids for striped wallpaper (480x150), wood wainscot with trim (480x40), plank floor (480x80) and a window (64x56) with frame, crescent moon and night sky, drawn with outlines and ramp shading from indigo, plum, moon, wood and brass ramps. Expected result: four ArtSource entries at declared sizes, using only palette indices. Why: these form the room backdrop.

## Acceptance criteria
- Given the wall source, when measured, then it is 480x150 and has alternating wallpaper stripes using two plum or indigo ramp indices
- Given the wainscot and floor sources, when measured, then they are 480x40 and 480x80 and use wood ramp indices
- Given the window source, when measured, then it is 64x56 and contains both moon-ramp and brass-ramp indices


## Scope
- In scope: src/art/roomBackground.ts exporting BACKGROUND_SOURCES
- Out of scope: Furniture
- Out of scope: Manifest or content references
- Preserve: ART_SOURCES


## Technical constraints
- Only PALETTE indices
- Native 480x270 resolution
- Deterministic, no random


## Dependencies
- R1


## Definition of done
- Four background ArtSources exist


## Clarifying questions
- None
