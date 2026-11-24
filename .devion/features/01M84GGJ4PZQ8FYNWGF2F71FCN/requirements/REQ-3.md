---
id: "01M84GGJ4PGCMYW6RM3BCHYYA5"
kind: requirement
parent: 01M84GGJ4PZQ8FYNWGF2F71FCN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Startup releases a stale lock file before recovery

Context: lock.Acquire writes a PID file that a crashed process never removes, blocking runner.Run with ErrLocked. Desired behavior: Startup inspects the lock file modification time through an injected LockFS and removes it when now minus modtime exceeds StaleAfter. Expected result: Startup returns whether a lock was released together with the Recover result. Why: a crash must not block the worker forever.

## Acceptance criteria
- Given a lock modtime older than StaleAfter, When Startup runs, Then LockFS.Remove is called with LockPath and Result.LockReleased is true
- Given a lock modtime younger than StaleAfter, When Startup runs, Then Remove is not called and LockReleased is false
- Given the lock file does not exist, When Startup runs, Then no error is returned and Recover still runs
- Given Remove fails, When Startup runs, Then Startup returns an error wrapping it and does not resume executions


## Scope
- In scope: LockFS interface and OS implementation
- In scope: ReleaseStaleLock and Startup methods
- Out of scope: PID liveness checks
- Out of scope: Editing the lock package
- Preserve: lock.Lock format


## Technical constraints
- Clock injected via func() time.Time
- StaleAfter must exceed Timeout times attempts; documented in code comment


## Dependencies
- Recoverer type from the scan requirement (same package)


## Definition of done
- Startup implemented and compiles


## Clarifying questions
- None
