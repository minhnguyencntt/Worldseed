---
id: "01M8494398KV7ZZBJEGMAXW2NN"
kind: requirement
parent: 01M8494398AQYAF2DGRHSCQE3A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · ExecutionPanel shows a Reject button only for AWAITING_APPROVAL runs when onReject is given

Context: ExecutionPanelProps in ExecutionPanel.tsx has onApprove, onRetry and actionError only. Desired behavior: add optional onReject?: (id: string) => void and render a Reject button inside the execution-actions container when status is AWAITING_APPROVAL and onReject is defined. Expected result: clicking it calls onReject(id). Why: lets the admin reject a pending publication.

## Acceptance criteria
- Given AWAITING_APPROVAL with onReject, when rendered, then button Reject is present and clicking calls onReject with the execution id
- Given no onReject, when rendered with AWAITING_APPROVAL, then Reject is absent
- Given FAILED or RUNNING status, when rendered with onReject, then Reject is absent
- Given AWAITING_APPROVAL, when Approve is clicked, then onApprove is called with the id and onReject is not


## Scope
- In scope: ExecutionPanel.tsx props and markup
- Out of scope: AdminApp wiring
- Preserve: Approve and Retry behavior


## Technical constraints
- Reuse the existing canApprove/canRetry pattern


## Definition of done
- Button gating matches the criteria


## Non-functional requirements
- Button is a native button with type=button for accessibility


## Clarifying questions
- None
