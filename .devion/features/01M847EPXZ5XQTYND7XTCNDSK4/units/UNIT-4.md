---
id: "01M847EPY040ETX1J5M40RBSX7"
kind: unit
parent: 01M847EPY0T932QF8DS54N3MM3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Admin round handler status mapping unit tests

Extend rounds_test.go using fakeRounds and newRoundRouter.

## Acceptance criteria
- GET /rounds/{id} success returns 200 with id
- GET with ErrNotFound returns 404
- POST open with wrapped ErrNotFound returns 404


## Scope
- In scope: backend/internal/admin/rounds_test.go
- Out of scope: Product code
- Preserve: TestRoundHandler_Statuses


## Technical constraints
- Fakes only


## Definition of done
- Tests pass


## Clarifying questions
- None
