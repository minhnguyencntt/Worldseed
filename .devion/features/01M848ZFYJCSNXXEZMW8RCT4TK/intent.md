---
id: "01M848ZFYJCSNXXEZMW8RCT4TK"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.4.2 · Add onReject prop and Reject button to ExecutionPanel

Context: game/frontend/src/components/ExecutionPanel.tsx already renders Approve (AWAITING_APPROVAL, onApprove) and Retry (FAILED, onRetry), and api/client.ts already has rejectExecution. Desired behavior: add an optional onReject prop and a Reject button visible only when status is AWAITING_APPROVAL and onReject is provided. Expected result: clicking Reject calls onReject with the execution id. Why: the admin must be able to reject a publication from the panel. AdminApp wiring is out of scope (SG-6.4 sibling).

## Acceptance criteria
- Given an execution with status AWAITING_APPROVAL and an onReject prop, when ExecutionPanel renders, then a button named Reject is shown
- Given the Reject button is clicked, when the click handler runs, then onReject is called once with the execution id
- Given a status other than AWAITING_APPROVAL (FAILED, RUNNING), when ExecutionPanel renders, then no Reject button is shown
- Given AWAITING_APPROVAL but no onReject prop, when ExecutionPanel renders, then no Reject button is shown and Approve still works


## Scope
- In scope: ExecutionPanel onReject prop and Reject button
- Out of scope: AdminApp wiring of rejectExecution
- Out of scope: backend changes
- Out of scope: API client changes
- Preserve: Approve and Retry behavior
- Preserve: actionError alert rendering
- Preserve: existing props


## Technical constraints
- React + TypeScript in game/frontend
- onReject is optional so existing callers compile unchanged


## Definition of done
- Reject button implemented per acceptance criteria
- Existing ExecutionPanel tests still pass


## Clarifying questions
- None
