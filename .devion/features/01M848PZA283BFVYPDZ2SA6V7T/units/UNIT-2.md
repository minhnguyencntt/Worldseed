---
id: "01M848PZA3ST6GHR41Z73HB4G3"
kind: unit
parent: 01M848PZA2MDHE4Z5XC4HNWB84
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add Reject control to ExecutionPanel

Add onReject prop and Reject button in ExecutionPanel.

## Acceptance criteria
- Reject appears only for AWAITING_APPROVAL with onReject
- Click calls onReject with the execution id


## Scope
- In scope: ExecutionPanel.tsx
- Out of scope: Tests
- Preserve: Approve and Retry


## Technical constraints
- Optional prop
- Code path: `game/frontend/src/components/ExecutionPanel.tsx`


## Definition of done
- Button implemented


## Clarifying questions
- None
