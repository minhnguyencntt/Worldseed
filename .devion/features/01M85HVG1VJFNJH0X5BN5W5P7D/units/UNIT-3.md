---
id: "01M85HVG1WR321E72407K1GQG9"
kind: unit
parent: 01M85HVG1VXFWDJ8XRNHPDQPXF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Subscribe App to menuClose to clear the selection

Add an effect next to the objectClick effect in App.tsx.

## Acceptance criteria
- menuClose sets selectedId to undefined.
- The effect returns the unsubscribe function.


## Scope
- In scope: App.tsx
- Out of scope: Tests
- Preserve: Existing effects


## Technical constraints
- Code path: `game/frontend/src/App.tsx`


## Definition of done
- Effect present


## Clarifying questions
- None
