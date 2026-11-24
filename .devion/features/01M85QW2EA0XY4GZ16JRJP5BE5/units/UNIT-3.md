---
id: "01M85QW2EBH8ARAB3HWD3AX8SF"
kind: unit
parent: 01M85QW2EBXVMD69T7ERA37QBB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: gridToRgba unit tests

Write tests from REQ1 acceptance criteria. No I/O or mocks needed beyond the pure function.

## Acceptance criteria
- Size, palette-only and throw behaviours are asserted.
- Determinism is asserted.


## Scope
- In scope: game/frontend/tests/pixelGrid.test.ts
- Out of scope: sheet tests
- Preserve: existing tests


## Technical constraints
- Unit tests only; shared palette max 48 colours.
- Test file imports PALETTE from ../src/lib/palette.


## Dependencies
- ACT1


## Definition of done
- All tests in pixelGrid.test.ts pass.


## Clarifying questions
- None
