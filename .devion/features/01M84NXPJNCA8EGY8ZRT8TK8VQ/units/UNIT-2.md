---
id: "01M84NXPJNXND8JGEKAYMETGHM"
kind: unit
parent: 01M84NXPJNW52Z4PC4EX1P2GPC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Wire round loading/error state and HeaderOverlay into App

Track loading and error, pass HeaderOverlay to GameLayout header.

## Acceptance criteria
- Header receives round, loading and error.
- ContributionSheet still gets round id.


## Scope
- In scope: App.tsx
- Out of scope: Tests
- Preserve: Existing flow


## Technical constraints
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- ACT1


## Definition of done
- App renders HeaderOverlay in header slot


## Clarifying questions
- None
