---
id: "01M85R5RX6PEXZY7FCK7179M89"
kind: unit
parent: 01M85R5RX57W7MTZ85XZDMYS5Y
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: buildSpriteSheet unit tests

Write TDD-style unit tests from REQ-S importing buildSpriteSheet, gridToRgba and PALETTE; pure functions need no mocks.

## Acceptance criteria
- Tests assert 4 frames of 32x48 give 128x48, frameCount 4
- Tests assert frame placement and unchanged pixels
- Tests assert empty and mismatched input throw
- Tests assert every sheet pixel colour is in the palette and bytes repeat identically


## Scope
- In scope: game/frontend/tests/spriteSheet.test.ts
- Out of scope: product code changes
- Preserve: existing tests


## Technical constraints
- Unit tests only; no browser or server


## Definition of done
- Test file passes with the command given


## Clarifying questions
- None
