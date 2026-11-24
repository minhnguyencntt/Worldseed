---
id: "01M8485RN2C8KK59WM8EHVPSQ3"
kind: unit
parent: 01M8485RN2NGXDXDV4Y8QMVM88
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add listExecutions to the admin client

Add listExecutions(token) after retryExecution in game/frontend/src/api/client.ts, using adminRequest and ExecutionInfo.

## Acceptance criteria
- listExecutions(token) resolves to ExecutionInfo[] from GET /api/v1/admin/executions
- listExecutions rejects with ApiError on non-2xx


## Scope
- In scope: client.ts
- Out of scope: Tests
- Out of scope: UI
- Preserve: Other exports


## Technical constraints
- Use adminRequest
- Code path: `game/frontend/src/api/client.ts`


## Definition of done
- Function exported and type-checks


## Clarifying questions
- None
