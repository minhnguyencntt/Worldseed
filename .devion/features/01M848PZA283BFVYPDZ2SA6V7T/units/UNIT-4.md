---
id: "01M848PZA3H3TN6S6AYW4JP0KT"
kind: unit
parent: 01M848PZA2SZYZ8699115Z6KC6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: rejectExecution unit tests with mocked fetch

Unit tests with stubbed global fetch for rejectExecution.

## Acceptance criteria
- POST path and Bearer header asserted
- 401 yields ApiError


## Scope
- In scope: tests/executions.test.ts
- Out of scope: Real network
- Preserve: Existing tests


## Technical constraints
- Fixture executionFixture in game/frontend/tests/fixtures/api.ts mirrors execution.Execution in backend/internal/execution/execution.go


## Definition of done
- Tests pass


## Clarifying questions
- None
