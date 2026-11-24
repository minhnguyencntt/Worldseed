---
id: "01M848W8FT9XQ9NZ9BGZ0WPQJM"
kind: unit
parent: 01M848W8FS7DVR5PAF2BWWFQX5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add rejectExecution to the admin client

Add rejectExecution(token, id) to game/frontend/src/api/client.ts after retryExecution (ends near L105), copying the approveExecution pattern with the /reject path.

## Acceptance criteria
- Given the file is saved, when tsc --noEmit runs, then rejectExecution is exported with signature (token: string, id: string) => Promise<ExecutionInfo>.
- Given a call, when it runs, then it delegates to adminRequest with method POST and the /reject path.


## Scope
- In scope: client.ts
- Out of scope: tests
- Out of scope: UI
- Out of scope: backend
- Preserve: other client functions


## Technical constraints
- Reuse adminRequest.
- Code path: `game/frontend/src/api/client.ts`


## Dependencies
- req-1


## Definition of done
- rejectExecution exported and type-checks.


## Clarifying questions
- None
