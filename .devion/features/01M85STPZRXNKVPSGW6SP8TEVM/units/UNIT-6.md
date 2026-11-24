---
id: "01M85STPZSVVDMSMCGKWV8P8W3"
kind: unit
parent: 01M85STPZSVF9F81HWQY8P6W8T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Furniture and full room source size and palette unit tests

Write tests from the R3 criteria and the intent criteria across ROOM_SOURCES.

## Acceptance criteria
- Every ROOM_SOURCES grid has its declared size
- Every grid renders with only palette colours and at least 3 distinct indices
- Registry covers all 13 declared ids


## Scope
- In scope: game/frontend/tests/roomSources.test.ts
- Out of scope: Manifest tests
- Preserve: Other tests


## Technical constraints
- Unit tests only, no filesystem
- Palette read from src/lib/palette.ts


## Dependencies
- A3


## Definition of done
- Tests pass


## Clarifying questions
- None
