---
id: "01M84FKWSFNPVCVHSEEC883DFP"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7.3 · Implement the execution runner in worker/internal

Context: backend/worker has config, lock (lock.Acquire/ErrLocked) and store (store.Store, Execution, Status) packages but no runner. Desired behavior: a runner package that locks, runs an agent in an isolated worktree under a context timeout, retries up to the configured limit, stops when budget is exceeded and blocks at the approval gate before publishing unless auto-publish is on. Expected result: Runner.Run drives one execution to COMPLETED, AWAITING_APPROVAL or FAILED. Why: the worker must never corrupt production and must run one execution per World.

## Acceptance criteria
- Given the lock file exists, when Run is called, then it returns an error satisfying errors.Is(err, lock.ErrLocked) and neither the worktree nor the agent is touched
- Given an agent that blocks, when the timeout elapses, then Run returns context.DeadlineExceeded and the execution is FAILED
- Given an agent failing twice then succeeding and MaxRetries 2, when Run is called, then the agent runs 3 times and the execution is not FAILED
- Given the accumulated cost exceeds MaxBudget, when an attempt finishes, then Run stops retrying and returns ErrBudgetExceeded
- Given AutoPublish is false and the agent succeeds, then the status is AWAITING_APPROVAL and Publish is not called; when true, Publish is called and status is COMPLETED


## Scope
- In scope: new package backend/worker/internal/runner
- Out of scope: real git worktree and Claude provider implementations
- Out of scope: admin approve endpoint
- Out of scope: startup recovery
- Preserve: lock, store and config package APIs


## Technical constraints
- Go 1.22, standard library only plus existing packages
- Agent, Worktrees and Publisher are interfaces so tests use fakes


## Definition of done
- All acceptance criteria are met by runner package code


## Non-functional requirements
- No shell interpolation of any prompt text


## Clarifying questions
- None
