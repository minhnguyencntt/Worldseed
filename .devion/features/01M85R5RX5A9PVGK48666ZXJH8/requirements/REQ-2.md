---
id: "01M85R5RX57W7MTZ85XZDMYS5Y"
kind: requirement
parent: 01M85R5RX5A9PVGK48666ZXJH8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · buildSpriteSheet lays equal-size frames into one horizontal sheet with size and frame metadata

Context: no buildSpriteSheet exists under game/. Desired behaviour: buildSpriteSheet(frames) takes RGBA frames {width,height,data} of identical size and returns {width, height, frameWidth, frameHeight, frameCount, data} with frames placed left to right. Expected result: width = frameWidth*frameCount, height = frameHeight, pixels copied unchanged so palette colours are preserved. Empty input or mismatched frame sizes throw. Why: sprite sheets feed the PNG script and manifest in SG-1.3.

## Acceptance criteria
- Given 4 frames of 32x48, when buildSpriteSheet runs, then width is 128, height is 48, frameWidth is 32, frameHeight is 48 and frameCount is 4
- Given frames with distinct pixels, when the sheet is read, then frame i occupies columns i*frameWidth to (i+1)*frameWidth-1 with unchanged pixel values
- Given frames of different sizes or an empty list, when buildSpriteSheet runs, then it throws
- Given sheets built from gridToRgba frames, when every sheet pixel is read, then its colour is in the shared palette


## Scope
- In scope: buildSpriteSheet function and SpriteSheet type
- Out of scope: multi-row layouts
- Out of scope: PNG encoding
- Out of scope: manifest writing
- Preserve: gridToRgba behaviour


## Technical constraints
- Pure function; input frames are not mutated
- Deterministic byte output


## Definition of done
- buildSpriteSheet exported from game/frontend/src/lib/spriteSheet.ts


## Clarifying questions
- None
