---
id: "01M849YRQYH35661076FFCYC3Z"
kind: unit
parent: 01M849YRQX7CK61M97F1YXWD7R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Retry and Reject 401 return to the token gate unit tests

Add two tests to the existing 'AdminApp execution action errors' describe in adminActions.test.tsx using stubActionFetch.

## Acceptance criteria
- Given Retry returns 401, then the gate shows 'Invalid token'
- Given Reject returns 401, then the gate shows 'Invalid token'


## Scope
- In scope: game/frontend/tests/adminActions.test.tsx
- Out of scope: Product code
- Preserve: Existing tests in the file


## Technical constraints
- Fixtures: failedExecutionFixture and executionFixture already in the file, matching ExecutionInfo in game/frontend/src/api/client.ts and the backend admin executions handler


## Definition of done
- Both tests pass


## Clarifying questions
- None
