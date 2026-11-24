---
id: "01M8485RN2NGXDXDV4Y8QMVM88"
kind: requirement
parent: 01M8485RN179N4RYZ1YB7BYKKP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · listExecutions calls GET /api/v1/admin/executions with the admin token

Context: backend execution.Handler.List responds 200 with a JSON array of executions ([] when empty). Desired behavior: client.ts exports listExecutions(token) built on adminRequest. Expected result: callers receive ExecutionInfo[] or an ApiError on non-2xx. Why: admin console needs the list.

## Acceptance criteria
- Given token T, when listExecutions(T) is called, then fetch receives /api/v1/admin/executions with header Authorization: Bearer T and no POST method
- Given a 401 response, when listExecutions is called, then it rejects with an ApiError whose status is 401


## Scope
- In scope: listExecutions
- Out of scope: Backend
- Preserve: adminRequest signature


## Technical constraints
- No world query param: the list handler takes none


## Definition of done
- listExecutions exported


## Clarifying questions
- None
