---
id: "01M85BP7N1HNKB5EKJA6GTBFFB"
kind: requirement
parent: 01M85BP7N1BFPBGF8TXMWX525X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Header explains round failure and offers Retry

Context: HeaderOverlay.tsx (L1-L44) shows 'Round unavailable: {error}' only. Desired behavior: accept an optional onRetry prop and render a Retry button in the error state with explanatory text. Expected result: users can retry a failed round load. Why: avoid a dead-end error.

## Acceptance criteria
- Given error and onRetry, when rendered, then alert text includes the cause and a Retry button is shown
- When Retry is clicked, then onRetry is called once
- Given no error, then no Retry button is rendered


## Scope
- In scope: HeaderOverlay error state
- Out of scope: Countdown
- Preserve: Loading and empty states
- Preserve: Sound and Settings buttons


## Technical constraints
- Reuse ui/button


## Definition of done
- Retry rendered in error state only


## Non-functional requirements
- Alert uses role=alert


## Clarifying questions
- None
