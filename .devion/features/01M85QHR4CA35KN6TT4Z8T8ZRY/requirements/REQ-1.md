---
id: "01M85QHR4C85YT3VH075HQ5QBS"
kind: requirement
parent: 01M85QHR4CA35KN6TT4Z8T8ZRY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · One palette file defines at most 48 colours in warm and cool ramps and exports constants

Context: no palette exists in game/frontend/src. Desired behavior: game/frontend/src/lib/palette.ts defines 8 ramps of 6 hex colours (4 warm: wood, brass, parchment, lamp; 4 cool: indigo, plum, moon, hoodie), exported as PALETTE_RAMPS, a flat PALETTE array and WARM_RAMPS / COOL_RAMPS name lists. Expected result: any module imports the same colours. Why: art and UI must share one palette.

## Acceptance criteria
- Given PALETTE, when its length is read, then it is at most 48 and every entry matches /^#[0-9a-f]{6}$/.
- Given PALETTE, when deduplicated, then no colour repeats.
- Given WARM_RAMPS and COOL_RAMPS, when read, then each name exists in PALETTE_RAMPS and the two lists do not overlap.


## Scope
- In scope: palette.ts constants
- Out of scope: Using the palette in art code
- Preserve: Existing CSS variables


## Technical constraints
- One shared palette of at most 48 colours, defined once and used by art and UI.


## Definition of done
- palette.ts exists and exports the constants


## Clarifying questions
- None
