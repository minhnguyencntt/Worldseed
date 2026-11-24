---
id: "01M85XYJFJDA79VXPZ18KPMKWF"
kind: unit
parent: 01M85XYJFJRE797SK1M1GZHDYT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render loading, error, empty states in the pill and group icon controls

Change the ternary in HeaderOverlay so each state is inside the sf-pill and the icon buttons sit in a group. Done after ACT1 in the same file.

## Acceptance criteria
- Each state has a pill with data-state.
- Icon buttons are inside a role group labelled Header controls.


## Scope
- In scope: HeaderOverlay.tsx
- Out of scope: tests
- Preserve: message strings
- Preserve: aria-labels Toggle sound and Settings


## Technical constraints
- React, Tailwind stay.
- Code path: `game/frontend/src/components/HeaderOverlay.tsx`


## Dependencies
- REQ3
- ACT1


## Definition of done
- Markup done


## Clarifying questions
- None
