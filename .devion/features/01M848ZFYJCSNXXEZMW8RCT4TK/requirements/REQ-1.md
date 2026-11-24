---
id: "01M848ZFYJ9EC0MXARTWXXZ6SP"
kind: requirement
parent: 01M848ZFYJCSNXXEZMW8RCT4TK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · ExecutionPanel shows a Reject button only for AWAITING_APPROVAL runs when onReject is given

Context: ExecutionPanel computes canApprove and canRetry from execution.status and optional callbacks. Desired behavior: add canReject = status === 'AWAITING_APPROVAL' && onReject !== undefined and render a Reject button in the execution-actions div that calls onReject(id). Expected result: Reject appears next to Approve only while awaiting approval. Why: admin needs to decline publication.

## Acceptance criteria
- Given AWAITING_APPROVAL and onReject, when rendered, then a Reject button is present next to Approve
- Given the Reject click, when handled, then onReject is called with the execution id exactly once
- Given FAILED or RUNNING status or no onReject, when rendered, then Reject is absent


## Scope
- In scope: ExecutionPanel.tsx props and markup
- Out of scope: AdminApp wiring
- Preserve: Approve/Retry gating
- Preserve: execution-actions wrapper condition covers all three buttons


## Technical constraints
- Optional prop only


## Definition of done
- Component updated; type-check passes


## Non-functional requirements
- Button is a native button type=button for accessibility


## Clarifying questions
- None
