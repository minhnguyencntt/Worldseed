---
id: "01M85TDR9EFBW75T2QS53TN41G"
kind: unit
parent: 01M85TDR9EKM2R1898WB3307RV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author the 32x32 boy portrait source

Add portraitGrid and BOY_PORTRAIT_SOURCE to boy.ts plus BOY_SOURCES list.

## Acceptance criteria
- one 32x32 frame
- palette indices only


## Scope
- In scope: src/art/boy.ts
- Out of scope: UI
- Preserve: sheet source


## Technical constraints
- Shared palette ≤48 colours
- New file: `game/frontend/src/art/boy.ts`


## Definition of done
- BOY_SOURCES exported


## Clarifying questions
- None
