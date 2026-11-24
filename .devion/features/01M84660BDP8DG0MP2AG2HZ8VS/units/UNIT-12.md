---
id: "01M84660BFQKY8PVX18AC24YB6"
kind: unit
parent: 01M84660BE081E4HSVB040CJ4S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Execution store and handler unit tests

Test Retry/Approve legality, persistence and HTTP mapping.

## Acceptance criteria
- Retry FAILED->QUEUED, Approve AWAITING_APPROVAL->APPROVED, others ErrIllegalState
- Unsafe id returns ErrNotFound-class error
- Handler maps 200/404/409 and list is a JSON array


## Scope
- In scope: backend/internal/execution/execution_test.go
- In scope: backend/internal/execution/handler_test.go


## Technical constraints
- t.TempDir, fake committer, fake service


## Dependencies
- A6


## Definition of done
- Tests pass


## Clarifying questions
- None
