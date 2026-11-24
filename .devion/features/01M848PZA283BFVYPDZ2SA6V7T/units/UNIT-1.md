---
id: "01M848PZA313B7FKQP2BZ7JZGV"
kind: unit
parent: 01M848PZA2SZYZ8699115Z6KC6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add rejectExecution to the admin client

Implement rejectExecution(token, id) mirroring approveExecution.

## Acceptance criteria
- rejectExecution is exported and POSTs to /api/v1/admin/executions/{id}/reject
- It returns Promise<ExecutionInfo>


## Scope
- In scope: client.ts
- Out of scope: Tests
- Out of scope: backend
- Preserve: Other client exports


## Technical constraints
- Use adminRequest
- Code path: `game/frontend/src/api/client.ts`


## Definition of done
- Function added and tsc passes


## Clarifying questions
- None
