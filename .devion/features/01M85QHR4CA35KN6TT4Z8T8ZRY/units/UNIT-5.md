---
id: "01M85QHR4ESYJAXF7BVHB0FZSN"
kind: unit
parent: 01M85QHR4D2CSMFJHBZ0FJJTW3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Palette Tailwind colour export unit tests

Test the Tailwind export against the palette.

## Acceptance criteria
- Tests assert every palette colour appears once in paletteTailwindColors.
- Tests assert tailwind config exposes pal and keeps old tokens.


## Scope
- In scope: game/frontend/tests/paletteTailwind.test.ts
- Out of scope: Product code edits
- Preserve: tailwindConfig.test.ts


## Technical constraints
- Unit tests only.


## Dependencies
- ACT-TW


## Definition of done
- tests pass


## Clarifying questions
- None
