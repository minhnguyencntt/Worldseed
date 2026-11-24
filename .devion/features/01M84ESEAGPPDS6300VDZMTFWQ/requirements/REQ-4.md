---
id: "01M84ESEAH8CS1YV6BA7V85X6S"
kind: requirement
parent: 01M84ESEAGPPDS6300VDZMTFWQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Executions run in an isolated worktree with timeout, retry, budget, approval gate and structured reports

Context: builds on lock and state packages. Desired behavior: runner.Runner.Run acquires the World lock, creates a worktree through a Worktrees interface, calls an Agent per attempt under a context timeout, retries failures up to MaxRetries, stops when cumulative cost reaches MaxBudgetUSD, then sets AWAITING_APPROVAL; Publish refuses until the record is APPROVED unless auto_publish. A report JSON is written to development/executions/<id>.report.json. Why: safe, bounded, supervised development.

## Acceptance criteria
- Given the lock is already held, when Run is called, then it returns lock.ErrLocked and no worktree is created
- Given an agent that blocks past ExecTimeout on the fake clock-driven context, when Run runs, then the attempt fails with a timeout error and is retried
- Given an agent failing every time, when Run runs with MaxRetries 2, then exactly 3 attempts are made and the record is FAILED
- Given attempts whose cost reaches MaxBudgetUSD, when Run runs, then ErrBudgetExceeded is returned and no further attempt starts
- Given a successful attempt, when Run ends, then status is AWAITING_APPROVAL and Publish returns ErrNotApproved until approved; the worktree is always removed
- Given any outcome, then a structured report with attempts, cost, status and error exists under development/executions


## Scope
- In scope: worker/internal/runner
- Out of scope: Real Git worktree CLI
- Out of scope: Publishing artifacts
- Preserve: state.Execution fields
- Preserve: lock API


## Technical constraints
- Agent interface: Run(ctx, workDir, prompt string) (costUSD float64, output string, err error); Worktrees interface: Add(ctx, path, branch, baseRef) error and Remove(ctx, path) error


## Dependencies
- R1
- R2


## Definition of done
- Runner behaves per criteria


## Non-functional requirements
- Worktree removal runs on a non-cancelled context


## Clarifying questions
- None
