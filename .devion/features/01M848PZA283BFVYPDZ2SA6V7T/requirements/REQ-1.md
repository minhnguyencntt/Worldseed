---
id: "01M848PZA2SZYZ8699115Z6KC6"
kind: requirement
parent: 01M848PZA283BFVYPDZ2SA6V7T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · rejectExecution client call POSTs to the reject endpoint

Add rejectExecution(token, id) in client.ts that POSTs /api/v1/admin/executions/{id}/reject using adminRequest, mirroring approveExecution, so AdminApp has a matching client call for Reject.

## Acceptance criteria
- Given token and id, when rejectExecution is called, then fetch receives POST /api/v1/admin/executions/{id}/reject with Authorization 'Bearer {token}'
- Given a 401 response, when rejectExecution is called, then it rejects with ApiError status 401


## Scope
- In scope: client.ts rejectExecution
- Out of scope: Go backend route
- Preserve: approveExecution and retryExecution


## Technical constraints
- Reuse adminRequest; id is passed through encodeURIComponent


## Definition of done
- rejectExecution exported and typed to return ExecutionInfo


## Clarifying questions
- None
