---
id: "01M85QHR4DAM42W8HY9RXH8ZFM"
kind: requirement
parent: 01M85QHR4CA35KN6TT4Z8T8ZRY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Render constants are 480x270 and computeZoom always returns a whole number of at least 1

Context: config.ts has 640x360 and computeZoom returns NaN when dpr is NaN (Math.max(1, NaN)). Desired behavior: GAME_WIDTH=480, GAME_HEIGHT=270, computeZoom treats non-finite or non-positive dpr as 1 and floors to an integer of at least 1. Expected result: whole-number zoom for any window size and DPR. Why: pixel-perfect rendering.

## Acceptance criteria
- Given config.ts, when GAME_WIDTH and GAME_HEIGHT are read, then they are 480 and 270 and buildGameConfig width/height equal them.
- Given (1280,720,1), (1920,1080,1), (1920,1080,2), (1366,768,1), (1280,720,1.5), when computeZoom runs, then results are 2, 4, 8, 2, 4.
- Given (479,269,1) or dpr 0, NaN or negative, when computeZoom runs, then the result is 1.


## Scope
- In scope: config.ts constants
- In scope: computeZoom dpr guard
- Out of scope: Changing scale mode
- Out of scope: PhaserHost behaviour
- Preserve: pixelArt, roundPixels, antialias false, FIT, zoom parameter
- Preserve: PhaserHost use of computeZoom


## Technical constraints
- Phaser stays on 3.90.x.
- One native scene resolution of 480x270, whole-number scaling, nearest-neighbour.


## Definition of done
- Constants changed and computeZoom guarded


## Clarifying questions
- None
