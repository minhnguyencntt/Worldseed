---
id: "01M85R5RX60NFYN87K61926G1R"
kind: unit
parent: 01M85R5RX56ZHZ9773JNNNAFY1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: gridToRgba unit tests

Write TDD-style unit tests from REQ-G importing gridToRgba and PALETTE directly; no mocks needed as the function is pure.

## Acceptance criteria
- Tests assert width, height and data length
- Tests assert every pixel colour is in the shared palette
- Tests assert out-of-range, negative, non-integer indices and ragged grids throw
- Tests assert identical bytes on repeated calls


## Scope
- In scope: game/frontend/tests/gridToRgba.test.ts
- Out of scope: product code changes
- Preserve: existing palette tests


## Technical constraints
- Unit tests only; no browser or server
- Phaser ~3.90.0 pin untouched


## Definition of done
- Test file passes with the command given


## Clarifying questions
- None
