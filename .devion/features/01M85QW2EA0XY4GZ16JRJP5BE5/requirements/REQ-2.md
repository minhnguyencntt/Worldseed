---
id: "01M85QW2EBW6GYCE277YZ8F9FK"
kind: requirement
parent: 01M85QW2EA0XY4GZ16JRJP5BE5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · buildSpriteSheet lays equal-size frames into one horizontal sheet with size and frame metadata

Context: sprites are animation frames, each a palette-indexed grid. Desired behaviour: buildSpriteSheet(frames) validates that frames is non-empty and all share width and height (else throws Error), converts each with gridToRgba and places them left to right. Returns { width: frameWidth*count, height: frameHeight, frameWidth, frameHeight, frameCount, data }. Expected result: sheet metadata matches what SG-1.3 will write into the manifest. Why: manifest needs real size, frame size and frame count.

## Acceptance criteria
- Given 4 frames of 32x48, when built, then width 128, height 48, frameWidth 32, frameHeight 48, frameCount 4.
- Given frame k, when read at x offset k*frameWidth, then its pixels equal gridToRgba of that frame.
- Given an empty list or frames of different sizes, when built, then it throws.
- Given a frame with an out-of-range index, when built, then it throws.


## Scope
- In scope: buildSpriteSheet
- Out of scope: PNG encoding
- Out of scope: manifest writing
- Preserve: gridToRgba behaviour


## Technical constraints
- Pure function, deterministic output.
- Palette of at most 48 colours defined once.


## Dependencies
- REQ1


## Definition of done
- buildSpriteSheet is exported from game/frontend/src/art/spriteSheet.ts.


## Clarifying questions
- None
