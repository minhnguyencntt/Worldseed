---
id: "01M84FKWSFXN7WC3S8J47JVA07"
kind: unit
parent: 01M84FKWSFKJZD41BPD82DNBN9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the retry loop and budget stop to Run

Edit runner.go so step 5 loops attempts 1..MaxRetries+1, accumulates cost and stops on budget overrun.

## Acceptance criteria
- Agent is retried up to MaxRetries times
- Total cost above MaxBudget returns ErrBudgetExceeded


## Scope
- In scope: runner.go execute loop
- Out of scope: backoff
- Preserve: lock and timeout behavior


## Technical constraints
- Depends on Act: Create the runner package having been done
- New file: `backend/worker/internal/runner/runner.go`


## Dependencies
- R2


## Definition of done
- go build ./internal/runner passes


## Clarifying questions
- None
