---
id: "01M85QHR4DKV5Q2J5NR8JZTP1Y"
kind: unit
parent: 01M85QHR4C85YT3VH075HQ5QBS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create the shared palette module

Create palette.ts with 8 ramps of 6 colours and the exported constants.

## Acceptance criteria
- palette.ts exports PALETTE_RAMPS, PALETTE, WARM_RAMPS, COOL_RAMPS with 48 unique hex values.
- No other file defines palette colours.


## Scope
- In scope: game/frontend/src/lib/palette.ts
- Out of scope: Tailwind wiring
- Out of scope: tests
- Preserve: Existing lib files


## Technical constraints
- One shared palette of at most 48 colours, defined once.
- New file: `game/frontend/src/lib/palette.ts`


## Dependencies
- REQ-PAL


## Definition of done
- palette.ts compiles under tsc --noEmit


## Clarifying questions
- None
