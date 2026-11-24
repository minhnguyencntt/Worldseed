---
id: "01M848W8FSW9ZQYD1825SPZY59"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.4.1 · Add rejectExecution to the API client

Context: game/frontend/src/api/client.ts exports approveExecution and retryExecution, which POST to /api/v1/admin/executions/{id}/approve and /retry through adminRequest. There is no rejectExecution. Desired behavior: add rejectExecution(token, id), which POSTs to /api/v1/admin/executions/{id}/reject with the Bearer token. Expected result: later UI work can call it. Why: SG-6.4 needs a Reject action in AdminApp.

## Acceptance criteria
- Given a token and an execution id, when rejectExecution is called, then fetch is sent POST to /api/v1/admin/executions/{id}/reject with an Authorization Bearer header.
- Given the server answers 401, when rejectExecution is called, then the promise rejects with an ApiError whose status is 401.


## Scope
- In scope: rejectExecution function in game/frontend/src/api/client.ts
- Out of scope: Backend reject route and handler
- Out of scope: ExecutionPanel Reject button
- Out of scope: AdminApp wiring
- Preserve: approveExecution, retryExecution and listExecutions behavior
- Preserve: adminRequest and readJSON


## Technical constraints
- Use adminRequest like approveExecution and retryExecution do.
- Return Promise<ExecutionInfo>.
- Encode the id with encodeURIComponent.


## Definition of done
- rejectExecution is exported from client.ts and the frontend type-checks.


## Clarifying questions
- None
