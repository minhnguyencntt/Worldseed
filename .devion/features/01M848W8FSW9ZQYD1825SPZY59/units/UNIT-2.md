---
id: "01M848W8FT1SZEXC2MJ5XPQP9R"
kind: unit
parent: 01M848W8FS7DVR5PAF2BWWFQX5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: rejectExecution unit tests with mocked fetch

Add tests in game/frontend/tests/executions.test.ts using a stubbed global fetch. The fixture is executionFixture from tests/fixtures/api.ts, which mirrors execution.Execution in backend/internal/execution/execution.go.

## Acceptance criteria
- Given token 'tok' and id 'exec-1', when rejectExecution runs, then fetch is called once with URL /api/v1/admin/executions/exec-1/reject, method POST and Bearer tok.
- Given a 200 response carrying executionFixture, when it resolves, then the result equals executionFixture.
- Given a 401 response, when it runs, then it rejects with ApiError status 401.


## Scope
- In scope: tests/executions.test.ts
- Out of scope: real network or server
- Preserve: existing tests in the file


## Technical constraints
- Mock fetch with vi.stubGlobal and restore it in afterEach.
- Code path: `game/frontend/tests/executions.test.ts`


## Dependencies
- act-1


## Definition of done
- New describe block passes.


## Clarifying questions
- None
