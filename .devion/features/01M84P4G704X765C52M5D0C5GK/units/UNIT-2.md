---
id: "01M84P4G70NCP5PCAWDMMEK2TQ"
kind: unit
parent: 01M84P4G70S5HK1HRVNM35B7VY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Wire round loading/error state and HeaderOverlay into App

Edit App.tsx: add loading and error state, replace the silent catch, and pass HeaderOverlay to GameLayout header.

## Acceptance criteria
- Header shows loading, round, or error
- No silent catch remains


## Scope
- In scope: App.tsx
- Out of scope: Tests
- Out of scope: HeaderOverlay
- Preserve: Intro gate
- Preserve: ContributionSheet roundId


## Technical constraints
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- ACT1


## Definition of done
- App passes round, loading, error to HeaderOverlay in header slot


## Clarifying questions
- None
