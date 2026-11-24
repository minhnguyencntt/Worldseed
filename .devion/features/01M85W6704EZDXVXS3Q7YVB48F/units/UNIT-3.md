---
id: "01M85W6705HRACQMKH8RX39NFR"
kind: unit
parent: 01M85W6704S0SWJK2BNQFJ0764
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Item icon grids are 16x16, outlined, shaded and palette-only

Write game/frontend/tests/itemIcons.test.ts, modelled on tests/roomSources.test.ts, proving ids, sizes, outline, shading and ART_SOURCES wiring from the requirement.

## Acceptance criteria
- Test asserts six unique item/ ids.
- Test asserts each frame is 16x16 with the outline index and at least two other non-zero indices.
- Test asserts gridToRgba succeeds for every item frame and ART_SOURCES includes them.


## Scope
- In scope: game/frontend/tests/itemIcons.test.ts
- Out of scope: Product code changes
- Preserve: Existing tests


## Technical constraints
- Unit tests only, no I/O; shared palette only.


## Dependencies
- ACT1


## Definition of done
- itemIcons.test.ts passes.


## Clarifying questions
- None
