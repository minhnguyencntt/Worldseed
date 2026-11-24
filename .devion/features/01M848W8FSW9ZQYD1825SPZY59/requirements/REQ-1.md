---
id: "01M848W8FS7DVR5PAF2BWWFQX5"
kind: requirement
parent: 01M848W8FSW9ZQYD1825SPZY59
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · rejectExecution client call POSTs to the admin reject endpoint

Context: approveExecution and retryExecution wrap adminRequest in client.ts (about L92-L105). Desired behavior: a sibling rejectExecution does the same for the reject path. Expected result: callers get the ExecutionInfo the server returns, or an ApiError on failure. Why: the admin UI needs a client call before it can offer Reject.

## Acceptance criteria
- Given token 'tok' and id 'exec-1', when rejectExecution is called, then fetch receives URL /api/v1/admin/executions/exec-1/reject with method POST and header Authorization 'Bearer tok'.
- Given a 200 response with an execution JSON body, when rejectExecution resolves, then it returns that execution.
- Given a 401 response, when rejectExecution is called, then it rejects with ApiError status 401.


## Scope
- In scope: game/frontend/src/api/client.ts
- Out of scope: backend changes
- Out of scope: UI changes
- Preserve: existing client exports


## Technical constraints
- Mirror approveExecution exactly except for the path suffix.


## Definition of done
- Function exported and covered by unit tests.


## Clarifying questions
- None
