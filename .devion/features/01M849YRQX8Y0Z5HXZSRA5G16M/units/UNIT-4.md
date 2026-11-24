---
id: "01M849YRQYKZSYT2566CHXSDFJ"
kind: unit
parent: 01M849YRQX7EE9BD4HCXA67Z5S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: rejectExecution id encoding and Reject failure display unit tests

Add one test to executions.test.ts and one to adminActions.test.tsx.

## Acceptance criteria
- rejectExecution encodes reserved characters in the id
- Reject 500 shows the server message in an alert


## Scope
- In scope: game/frontend/tests/executions.test.ts
- In scope: game/frontend/tests/adminActions.test.tsx
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Fixtures follow ExecutionInfo in game/frontend/src/api/client.ts and the backend executions handler


## Definition of done
- Both tests pass


## Clarifying questions
- None
