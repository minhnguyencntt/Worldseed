---
id: "01M84ESEAH5YB5RFVPNXFENK0M"
kind: unit
parent: 01M84ESEAH8CS1YV6BA7V85X6S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the execution runner with retry, budget, timeout and approval gate

Implement orchestration in worker/internal/runner using the lock and state packages.

## Acceptance criteria
- Run enforces lock, timeout, retries, budget and approval gate
- Reports are written atomically


## Scope
- In scope: runner package
- Out of scope: tests
- Preserve: lock and state packages


## Technical constraints
- Errors ErrBudgetExceeded, ErrNotApproved, ErrTimeout


## Dependencies
- A1
- A2


## Definition of done
- go build ./... passes


## Clarifying questions
- None
