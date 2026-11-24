---
id: "01M85QHR4DR0JFWD9D37JH0F9Y"
kind: unit
parent: 01M85QHR4DAM42W8HY9RXH8ZFM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Switch config.ts to 480x270 and guard computeZoom against invalid dpr

Edit GAME_WIDTH/GAME_HEIGHT and make computeZoom safe for invalid dpr.

## Acceptance criteria
- GAME_WIDTH is 480 and GAME_HEIGHT is 270.
- computeZoom returns an integer >= 1 for NaN, 0 and negative dpr.


## Scope
- In scope: game/frontend/src/phaser/config.ts
- Out of scope: PhaserHost, scale mode, tests
- Preserve: buildGameConfig render and scale options
- Preserve: computeZoom signature (w,h,dpr)


## Technical constraints
- Phaser stays on 3.90.x.
- One native scene resolution of 480x270, whole-number scaling, nearest-neighbour.
- Code path: `game/frontend/src/phaser/config.ts`


## Dependencies
- REQ-RES


## Definition of done
- tsc --noEmit passes


## Clarifying questions
- None
