---
id: "01M85V05ZP6WJT17BBH2VCJ2KZ"
kind: unit
parent: 01M85V05ZPXAJ81BENDNY2JRCN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author the boy sheet frames in boy.ts

Create game/frontend/src/art/boy.ts with a pure boyFrame function and BOY_SHEET_SOURCE using draw.ts helpers.

## Acceptance criteria
- boy.ts exports BOY_SHEET_SOURCE with 14 frames of 32x48
- All cells are palette indices


## Scope
- In scope: boy.ts sheet
- Out of scope: portrait
- Out of scope: registration
- Preserve: draw.ts


## Technical constraints
- Shared palette max 48 colours
- Deterministic pure functions
- New file: `game/frontend/src/art/boy.ts`


## Definition of done
- BOY_SHEET_SOURCE exported and builds without throwing


## Clarifying questions
- None
