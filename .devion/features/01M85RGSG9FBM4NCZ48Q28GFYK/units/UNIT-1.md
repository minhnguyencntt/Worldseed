---
id: "01M85RGSG9TCRD2S3A38BH6ZYW"
kind: unit
parent: 01M85RGSG9N24YPHX5BARHSY5S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create encodePng and readPngSize in the frontend lib

Create game/frontend/src/lib/pngEncode.ts exporting encodePng and readPngSize using node:zlib deflateSync at fixed level 9.

## Acceptance criteria
- encodePng returns equal bytes on repeated calls
- readPngSize returns the encoded width and height


## Scope
- In scope: new pngEncode.ts
- Out of scope: tests
- Preserve: gridToRgba.ts


## Technical constraints
- No new dependency
- Phaser 3.90.x and stack unchanged
- New file: `game/frontend/src/lib/pngEncode.ts`


## Dependencies
- REQ-1


## Definition of done
- Functions exported and typecheck passes


## Clarifying questions
- None
