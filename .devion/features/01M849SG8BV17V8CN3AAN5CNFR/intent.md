---
id: "01M849SG8BV17V8CN3AAN5CNFR"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.4.4 · A 401 from Approve, Retry or Reject returns to the token gate

Context: game/frontend/src/components/AdminApp.tsx already routes a 401 from runExecutionAction into handleError, which clears the token and sets gateError 'Invalid token'. Only the approve 401 path is tested, and handleError leaves earlier error and action-error state behind. Desired behavior: Approve, Retry and Reject each return to the token gate on 401, with no stale action error. Why: the admin must never see leftover errors or data after re-entering a token.

## Acceptance criteria
- Given an authenticated admin, when approve, retry or reject returns 401, then the Admin token field is shown with 'Invalid token'.
- Given an earlier action error is displayed, when a later 401 occurs and the token is re-entered, then the old action error is not shown.


## Scope
- In scope: AdminApp handleError 401 branch
- Out of scope: Backend changes
- Out of scope: New UI components
- Preserve: Existing load-path 401 behavior
- Preserve: Non-401 action errors shown through actionError


## Technical constraints
- UI-only change
- Token stays in memory only


## Definition of done
- All three actions verified by unit tests


## Clarifying questions
- None
