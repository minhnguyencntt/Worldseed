---
id: "01M85QW2EBG35WXGW2KCFXEH46"
kind: unit
parent: 01M85QW2EBW6GYCE277YZ8F9FK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add buildSpriteSheet to the art module

Create the pure module that validates frames, converts each with gridToRgba and copies rows into one sheet buffer, returning sheet metadata.

## Acceptance criteria
- buildSpriteSheet returns width, height, frameWidth, frameHeight, frameCount and data.
- Empty or mismatched frames throw.


## Scope
- In scope: game/frontend/src/art/spriteSheet.ts
- Out of scope: tests
- Out of scope: PNG writing
- Preserve: pixelGrid.ts exports


## Technical constraints
- Reuse gridToRgba and the shared palette (max 48).
- Phaser stays on 3.90.x.
- New file: `game/frontend/src/art/spriteSheet.ts`


## Dependencies
- ACT1
- REQ2


## Definition of done
- Module compiles and exports SpriteSheet and buildSpriteSheet.


## Non-functional requirements
- Pure and deterministic.


## Clarifying questions
- None
