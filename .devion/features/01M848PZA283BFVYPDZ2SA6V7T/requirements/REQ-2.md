---
id: "01M848PZA2MDHE4Z5XC4HNWB84"
kind: requirement
parent: 01M848PZA283BFVYPDZ2SA6V7T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · ExecutionPanel shows a Reject control for executions awaiting approval

ExecutionPanel gains an optional onReject prop and renders a Reject button only when status is AWAITING_APPROVAL and onReject is provided.

## Acceptance criteria
- Given status AWAITING_APPROVAL and onReject, when Reject is clicked, then onReject is called with the execution id
- Given status FAILED or no onReject, when rendered, then no Reject button is present


## Scope
- In scope: ExecutionPanel onReject prop and button
- Out of scope: Styling changes
- Preserve: Approve and Retry rendering rules


## Technical constraints
- Keep props optional


## Definition of done
- Reject button gated by status and handler


## Non-functional requirements
- Button is keyboard accessible


## Clarifying questions
- None
