---
id: "01M8485RN2EMV3JNFW283ZJ92X"
kind: unit
parent: 01M8485RN2NGXDXDV4Y8QMVM88
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: listExecutions unit tests with mocked fetch

Add game/frontend/tests/executions.test.ts testing listExecutions with a stubbed global fetch.

## Acceptance criteria
- Test asserts URL, Bearer header and parsed array
- Test asserts ApiError status 401 on a 401 response


## Scope
- In scope: tests/executions.test.ts
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Fixture executionFixture in game/frontend/tests/fixtures/api.ts mirrors execution.Execution JSON and the List handler in backend/internal/execution/handler.go; do not inline the payload


## Dependencies
- ACT1


## Definition of done
- Tests pass in seconds


## Clarifying questions
- None
