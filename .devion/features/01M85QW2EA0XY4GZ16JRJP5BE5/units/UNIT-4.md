---
id: "01M85QW2EB8FT8Z3BD7CDA0CMT"
kind: unit
parent: 01M85QW2EBW6GYCE277YZ8F9FK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: buildSpriteSheet unit tests

Write tests from REQ2 acceptance criteria using small synthetic grids.

## Acceptance criteria
- Metadata, frame placement and palette-only colours are asserted.
- Throws on bad input and identical bytes on repeat runs are asserted.


## Scope
- In scope: game/frontend/tests/spriteSheet.test.ts
- Out of scope: PNG output
- Preserve: existing tests


## Technical constraints
- Unit tests only; shared palette max 48 colours.


## Dependencies
- ACT2


## Definition of done
- All tests in spriteSheet.test.ts pass.


## Clarifying questions
- None
