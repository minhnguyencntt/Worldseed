---
id: "01M84HRS5N5HX1DBJT7RXSEZMG"
kind: unit
parent: 01M84HRS5MMMYXAG578FKA724B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: internal/execution is gone unit tests

Add a unit test that stats backend/internal/execution.

## Acceptance criteria
- Given the backend tree, when ../execution is stat'ed, then it is not found.
- Given the test, when run, then it passes without touching the network.


## Scope
- In scope: backend/internal/server/removed_code_test.go
- Out of scope: server routes
- Preserve: existing tests


## Definition of done
- Test passes


## Clarifying questions
- None
