---
id: "01M8494398SWAPZWED8MZ7H2FQ"
kind: unit
parent: 01M8494398KV7ZZBJEGMAXW2NN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: ExecutionPanel Reject button unit tests

Add a new test file rendering ExecutionPanel directly with vi.fn callbacks, asserting Reject gating and that Approve and Retry still work.

## Acceptance criteria
- Reject shows only for AWAITING_APPROVAL with onReject and calls onReject with the id
- Reject is hidden without onReject and for other statuses
- Approve and Retry still call their callbacks with the id


## Scope
- In scope: game/frontend/tests/executionReject.test.tsx
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Vitest + Testing Library; no network


## Definition of done
- All tests in the new file pass


## Clarifying questions
- None
