---
id: "01M85FWFYEGXD28P89JVJAFNHF"
kind: unit
parent: 01M85FWFYE2GXA5JQX2YN2SWK7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm the history error alert and Retry button render in ContributionSheet

The code already renders both elements when historyStatus is 'error'. Confirm and change nothing unless the branch differs from this description.

## Acceptance criteria
- The alert text equals HISTORY_ERROR 'Could not load your suggestions'
- Retry button is rendered only when historyStatus === 'error'


## Scope
- In scope: ContributionSheet error branch
- Out of scope: Tests
- Preserve: Existing markup


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Error branch confirmed to render alert and Retry


## Clarifying questions
- None
