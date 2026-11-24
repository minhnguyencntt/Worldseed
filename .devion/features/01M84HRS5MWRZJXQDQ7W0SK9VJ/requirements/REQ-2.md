---
id: "01M84HRS5MMMYXAG578FKA724B"
kind: requirement
parent: 01M84HRS5MWRZJXQDQ7W0SK9VJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The internal/execution package and handler are deleted

Context: backend/internal/execution holds execution.go, handler.go and their tests, importing gitrepo and safepath. Desired behavior: the package is deleted entirely. Expected result: no execution package remains. Why: execution runs belong to development automation.

## Acceptance criteria
- Given the repo, when backend/internal/execution is stat'ed, then it does not exist.
- Given gitrepo and safepath, when still imported by contribution and other packages, then they remain untouched.


## Scope
- In scope: backend/internal/execution/*.go including tests
- Out of scope: server wiring
- Preserve: backend/internal/gitrepo
- Preserve: backend/internal/safepath


## Definition of done
- backend/internal/execution is gone


## Clarifying questions
- None
