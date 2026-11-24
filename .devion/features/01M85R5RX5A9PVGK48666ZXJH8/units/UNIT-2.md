---
id: "01M85R5RX6Z616WR8YYPABXZ59"
kind: unit
parent: 01M85R5RX57W7MTZ85XZDMYS5Y
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create buildSpriteSheet in the frontend lib

Create the pure function that lays equal-size RGBA frames side by side into one sheet and returns size and frame metadata.

## Acceptance criteria
- buildSpriteSheet(frames) returns width = frameWidth*frameCount and height = frameHeight
- Empty input or mismatched frame sizes throw


## Scope
- In scope: new file game/frontend/src/lib/spriteSheet.ts
- Out of scope: tests
- Out of scope: PNG encoding
- Out of scope: manifest
- Preserve: gridToRgba.ts unchanged


## Technical constraints
- Pure, deterministic, does not mutate input frames
- Shared palette colours pass through unchanged
- New file: `game/frontend/src/lib/spriteSheet.ts`


## Definition of done
- File exists, exports buildSpriteSheet and SpriteSheet, and tsc --noEmit accepts it


## Clarifying questions
- None
