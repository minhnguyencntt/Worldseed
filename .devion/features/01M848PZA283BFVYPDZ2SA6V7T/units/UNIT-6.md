---
id: "01M848PZA39GB44CA6XJVM55EK"
kind: unit
parent: 01M848PZA2Z6EKGSW7PKNG9GSK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: AdminApp approve, retry, reject and 401 unit tests with mocked fetch

Extend adminExecution.test.tsx with a url-routing fetch stub for approve, retry and reject POSTs.

## Acceptance criteria
- Each action hits its endpoint and re-fetches executions
- 401 returns to token gate
- 500 shows alert


## Scope
- In scope: tests/adminExecution.test.tsx
- Out of scope: Real server
- Preserve: Existing tests


## Technical constraints
- Fixtures failedExecutionFixture and executionFixture in tests/fixtures/api.ts mirror execution.Execution in backend/internal/execution/execution.go


## Definition of done
- Tests pass


## Clarifying questions
- None
