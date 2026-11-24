---
id: "01M84KNPXB9BNQNCWVT0DPR5FF"
kind: unit
parent: 01M84KNPXBHVAH7JMHQB7WTYX0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add HeaderOverlay and compose it in App

Create HeaderOverlay and replace the loose RoundBadge/Countdown in App, moving the contribution sheet flag to the store and tracking the round error.

## Acceptance criteria
- HeaderOverlay exists with required content
- App uses it and the store modal flag


## Scope
- In scope: HeaderOverlay.tsx
- In scope: App.tsx
- Out of scope: tests
- Preserve: getCurrentRound
- Preserve: ContributionSheet roundId


## Technical constraints
- Reuse RoundBadge and Countdown
- New file: `game/frontend/src/components/HeaderOverlay.tsx`
- Code path: `game/frontend/src/App.tsx`


## Definition of done
- tsc passes


## Clarifying questions
- None
