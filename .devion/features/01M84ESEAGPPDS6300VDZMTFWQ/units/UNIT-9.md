---
id: "01M84ESEAHWZ2801W4KB037WH1"
kind: unit
parent: 01M84ESEAH8CS1YV6BA7V85X6S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Runner locking, timeout, retry, budget and approval gate unit tests

Test the runner with fakeAgent and fakeTrees recording calls.

## Acceptance criteria
- Lock contention returns ErrLocked and creates no worktree
- Timeout triggers a retry and ends FAILED with ErrTimeout recorded
- Retry limit yields exactly MaxRetries+1 attempts and FAILED status
- Budget stop returns ErrBudgetExceeded before another attempt starts
- Approval gating blocks Publish until the record is APPROVED
- Report file exists with attempts, cost and status asserted


## Scope
- In scope: worker/internal/runner/runner_test.go
- Out of scope: Product code
- Preserve: Act code


## Technical constraints
- Use ExecTimeout of a few milliseconds and a fakeAgent that waits on ctx.Done


## Definition of done
- Tests pass in seconds


## Clarifying questions
- None
