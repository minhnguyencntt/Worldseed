---
id: "01M849HABYWNK3NKJR01DKJZDY"
kind: unit
parent: 01M849HABXFGVGA43KVXAB8XQ5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: AdminApp execution handlers call the client and reload unit tests

Add tests/adminActions.test.tsx using the url-routing fetch stub pattern of tests/adminExecution.test.tsx.

## Acceptance criteria
- Approve/Reject/Retry POST the right URL with Bearer secret
- Executions endpoint is fetched again after each action


## Scope
- In scope: tests/adminActions.test.tsx
- Out of scope: Real server
- Preserve: Existing tests


## Technical constraints
- fetch mocked via vi.stubGlobal


## Definition of done
- Tests pass


## Clarifying questions
- None
