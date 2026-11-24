---
id: "01M849SG8CTNQEMRWEYZ7TG38H"
kind: unit
parent: 01M849SG8B7W4FH2XENKVVH3F7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Approve, Retry and Reject 401 return to the token gate without stale action error

Add tests to the existing adminActions test file using the stubActionFetch helper and fixtures from tests/fixtures/api.ts, which mirror the backend handlers for /api/v1/admin/executions/{id}/{approve|retry|reject}.

## Acceptance criteria
- Retry and reject 401 each show the Admin token field with 'Invalid token'.
- A prior 500 error is not shown after a 401 and token re-entry.


## Scope
- In scope: tests/adminActions.test.tsx
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- fetch is stubbed; no server


## Definition of done
- Tests pass


## Clarifying questions
- None
