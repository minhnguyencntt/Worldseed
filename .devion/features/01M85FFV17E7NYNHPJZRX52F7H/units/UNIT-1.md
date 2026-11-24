---
id: "01M85FFV17ZNM8W4GMRGJQGAFE"
kind: unit
parent: 01M85FFV17K3T244ATYVPT4QAF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Do not report loading when no history request is made

In ContributionSheet, make historyStatus 'ready' whenever the history effect does not fire a request (roundId === '' or !open), and keep 'loading' only while listMine is in flight.

## Acceptance criteria
- With roundId '' the status is 'ready' on first render
- With roundId set the status is 'loading' until listMine settles


## Scope
- In scope: ContributionSheet.tsx historyStatus initial state and early-return branch
- Out of scope: Tests
- Out of scope: API client
- Preserve: Loading and error rendering at L153-L157
- Preserve: Cancelled-flag guards


## Technical constraints
- Do not add a second status state; keep a single writer
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Loading message absent when roundId is ''
- Product code compiles with tsc


## Clarifying questions
- None
