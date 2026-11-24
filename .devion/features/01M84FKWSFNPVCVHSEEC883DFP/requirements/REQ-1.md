---
id: "01M84FKWSFS93QQC1M4G0P5A4N"
kind: requirement
parent: 01M84FKWSFNPVCVHSEEC883DFP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Run takes the per-World lock, runs the agent in an isolated worktree under a timeout

Context: lock.Acquire returns an error wrapping lock.ErrLocked when the lock file exists. Desired behavior: Run acquires cfg.LockPath first, persists a RUNNING execution, creates a worktree under WorkRoot/<id>, runs the agent with context.WithTimeout(cfg.Timeout), then removes the worktree on completion or failure. Expected result: a held lock yields a locked error with no side effects. Why: one execution per World and isolation from production files.

## Acceptance criteria
- Given the lock file already exists, when Run is called, then the returned error satisfies errors.Is(err, lock.ErrLocked) and Worktrees.Create is never called
- Given a successful agent, when Run returns, then the lock file no longer exists and Worktrees.Remove was called with the worktree directory
- Given an agent that waits for ctx.Done and Timeout 20ms, when Run is called, then the error satisfies errors.Is(err, context.DeadlineExceeded) and the stored status is FAILED


## Scope
- In scope: runner.go with types, New and Run
- Out of scope: retry and budget
- Out of scope: approval gate
- Preserve: lock.Acquire semantics


## Technical constraints
- Worktree directory is filepath.Join(cfg.WorkRoot, id)


## Definition of done
- Run locks, isolates and times out as specified


## Clarifying questions
- None
