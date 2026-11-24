---
id: "01M84GGJ4PZQ8FYNWGF2F71FCN"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.7 · Worker startup recovery for unfinished executions and stale locks

Context: backend/worker/internal has config, lock, logging, report, runner and store packages but no recovery. store.Store persists executions as JSON; runner.Run takes a lock file via lock.Acquire, which leaves the file behind if the process dies. Desired behavior: a new recovery package scans for unfinished executions (PENDING, RUNNING, RECOVERING) and resumes each, or marks it RECOVERING when resuming fails, and removes a stale lock file. Expected result: the worker can start after a crash without manual cleanup. Why: the product requires recovery after process restart and never assuming the worker ran continuously.

## Acceptance criteria
- Given PENDING, RUNNING and RECOVERING executions in the store, When Recover runs, Then each is passed to the Resumer exactly once
- Given COMPLETED, FAILED or AWAITING_APPROVAL executions, When Recover runs, Then they are neither resumed nor modified
- Given the Resumer returns an error for an execution, When Recover runs, Then that execution is saved as RECOVERING with the error text, UpdatedAt set from the injected clock, and the remaining executions are still processed
- Given a lock file older than StaleAfter by the injected clock, When startup recovery runs, Then the lock file is removed before executions are resumed
- Given a lock file younger than StaleAfter or no lock file, When startup recovery runs, Then no lock is removed and no error is returned


## Scope
- In scope: New package backend/worker/internal/recovery
- In scope: New RECOVERING status constant in backend/worker/internal/store/store.go
- Out of scope: Wiring into a worker main or cmd entry point (none exists)
- Out of scope: Changing runner.Run, lock.Acquire or the config file schema
- Out of scope: Real process-liveness detection
- Preserve: store.Store JSON format and atomic Save
- Preserve: lock.Acquire semantics
- Preserve: Existing runner and store tests


## Technical constraints
- Go 1.22 module github.com/worldseed/storyforge/worker
- No database or external dependencies
- All dependencies injected for unit tests: store, resumer, clock, lock filesystem


## Definition of done
- All acceptance criteria are met by product code
- go build ./... passes in backend/worker


## Non-functional requirements
- Recovery must not hold the lock file while resuming, since runner.Run acquires it


## Clarifying questions
- None
