---
id: "01M84G51W24VCHQVP58P2TVDDV"
kind: unit
parent: 01M84G51W2PYGHRBJ9BCP424F9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm retry loop and budget condition in Runner

Read the loop in run and confirm the break conditions match the documented semantics; no product change is expected.

## Acceptance criteria
- Given runner.go, When read, Then the loop breaks when attempt > MaxRetries
- Given runner.go, When read, Then budget stops only when MaxBudget > 0 and spent > MaxBudget


## Scope
- In scope: runner.go retry loop
- Out of scope: Tests
- Preserve: ErrBudgetExceeded wrapping


## Technical constraints
- Code path: `backend/worker/internal/runner/runner.go`


## Definition of done
- Code confirmed; go build succeeds


## Clarifying questions
- None
