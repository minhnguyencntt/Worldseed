---
id: "01M85F81SHJB107F2MY136FEYF"
kind: unit
parent: 01M85F81SG7AXQZJ73AQGRSVE8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add HistoryStatus state and loading/error messages to ContributionSheet

Add type HistoryStatus and a single useState written only inside the history effect; render loading and error messages.

## Acceptance criteria
- Loading message shown while pending
- Error message shown in role=alert on rejection


## Scope
- In scope: ContributionSheet.tsx status state and messages
- Out of scope: Retry
- Out of scope: Tests
- Preserve: Existing effect merge logic


## Technical constraints
- One status state; effect is sole writer
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Component renders loading, ready and error states


## Clarifying questions
- None
