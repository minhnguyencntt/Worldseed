---
id: "01M85STPZS8J9JECBQM7PCT072"
kind: unit
parent: 01M85STPZSV244986MJ9N7R0AK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Background grid size and palette unit tests

Write tests from the R2 criteria.

## Acceptance criteria
- Each background grid has its declared size
- Each renders with gridToRgba using only palette colours


## Scope
- In scope: game/frontend/tests/roomBackground.test.ts
- Out of scope: Furniture
- Preserve: Other tests


## Technical constraints
- Unit tests only, no filesystem
- Palette read from src/lib/palette.ts


## Dependencies
- A2


## Definition of done
- Tests pass


## Clarifying questions
- None
