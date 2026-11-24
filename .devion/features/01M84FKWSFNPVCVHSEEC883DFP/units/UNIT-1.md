---
id: "01M84FKWSF83J0C4FDDJW7D0KX"
kind: unit
parent: 01M84FKWSFS93QQC1M4G0P5A4N
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create the runner package with lock, worktree and timeout

Create backend/worker/internal/runner/runner.go defining Agent, Worktrees, Publisher, Config, Runner, New and Run that locks, saves RUNNING, creates the worktree, runs the agent once under the timeout and saves the final status.

## Acceptance criteria
- Run returns a lock.ErrLocked-wrapping error when the lock is held
- Run applies cfg.Timeout via context.WithTimeout


## Scope
- In scope: runner.go
- Out of scope: retry
- Out of scope: gate
- Preserve: lock and store packages


## Technical constraints
- Module path github.com/worldseed/storyforge/worker
- New file: `backend/worker/internal/runner/runner.go`


## Dependencies
- R1


## Definition of done
- go build ./internal/runner passes


## Clarifying questions
- None
