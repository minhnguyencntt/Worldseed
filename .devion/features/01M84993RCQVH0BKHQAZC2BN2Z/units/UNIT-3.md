---
id: "01M84993RDGFNNWSKV1TRGYHHC"
kind: unit
parent: 01M84993RD65SCSHFVRRFFV5HA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: AdminApp execution handlers call the client and reload unit tests

Add game/frontend/tests/adminActions.test.tsx modelled on tests/adminExecution.test.tsx. It stubs fetch by URL and Bearer token, counts the GET calls to the executions endpoint to prove the reload, and uses fixtures from tests/fixtures/api.ts.

## Acceptance criteria
- Approve, Reject and Retry each POST to the matching URL with the Bearer token
- Each action is followed by a second GET of the executions endpoint


## Scope
- In scope: game/frontend/tests/adminActions.test.tsx
- In scope: game/frontend/tests/fixtures/api.ts
- Out of scope: Real network or browser
- Preserve: Existing tests


## Technical constraints
- Fixtures mirror execution.Execution JSON in backend/internal/execution/execution.go; routes mirror backend/internal/server/server.go


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None
