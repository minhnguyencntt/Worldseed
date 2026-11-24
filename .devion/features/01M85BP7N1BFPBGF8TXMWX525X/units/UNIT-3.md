---
id: "01M85BP7N2NAS1X6Z3121BWPPZ"
kind: unit
parent: 01M85BP7N1KYP1XAPXSZBNPXM2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add describeRoundError, empty mapping and retry to App

Implement loadRound, describeRoundError and wire onRetry to HeaderOverlay. Product code only.

## Acceptance criteria
- 404 sets no error and no round
- Other ApiError sets error to 'Round service returned <status>' plus detail when present
- TypeError sets 'Could not reach the server'
- Retry resets loading and error and reloads


## Scope
- In scope: App.tsx
- Out of scope: HeaderOverlay internals
- Preserve: Intro gate
- Preserve: Existing props to HeaderOverlay


## Technical constraints
- Import ApiError from ./api/client
- Code path: `game/frontend/src/App.tsx`


## Definition of done
- App compiles


## Clarifying questions
- None
