---
id: "01M848HGWDMPDNT8GYG2FGEBZ2"
kind: unit
parent: 01M848HGWDHV0NWH1Y13A7PDWF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: AdminApp ExecutionPanel unit tests with mocked fetch

Add tests/adminExecution.test.tsx reusing the url-routing fetch stub pattern of tests/adminStepper.test.tsx and fixtures from tests/fixtures/api.ts.

## Acceptance criteria
- Test with a full execution asserts count, logs, tests, release version and failure reason
- Test with no executions asserts Not available placeholders and count


## Scope
- In scope: game/frontend/tests/adminExecution.test.tsx
- In scope: game/frontend/tests/fixtures/api.ts
- Out of scope: Real network or browser
- Preserve: Existing tests


## Technical constraints
- fetch mocked via vi.stubGlobal; jsdom environment


## Definition of done
- New tests pass


## Clarifying questions
- None
