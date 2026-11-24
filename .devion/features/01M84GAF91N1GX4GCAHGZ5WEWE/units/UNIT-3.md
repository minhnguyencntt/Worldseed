---
id: "01M84GAF92JP3XECQANFKKSABK"
kind: unit
parent: 01M84GAF91VQQ0QA9WTEDYG9SV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm lock-first ordering and budget stop in Runner.run

Read the start of Runner.run and the budget condition; lock.Acquire happens before store.Save and trees.Create, and the budget branch wraps ErrBudgetExceeded. No change unless a defect is found.

## Acceptance criteria
- lock.Acquire is called before r.st.Save and r.trees.Create
- Budget branch requires MaxBudget > 0 and spent > MaxBudget and wraps ErrBudgetExceeded


## Scope
- In scope: backend/worker/internal/runner/runner.go review
- Out of scope: Behavior changes
- Preserve: Deferred lock release


## Technical constraints
- Code path: `backend/worker/internal/runner/runner.go`


## Definition of done
- Ordering and condition confirmed by reading


## Clarifying questions
- None
