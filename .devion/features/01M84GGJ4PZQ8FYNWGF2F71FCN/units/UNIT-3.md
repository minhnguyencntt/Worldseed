---
id: "01M84GGJ4QN12AA2MKSDGSCEW8"
kind: unit
parent: 01M84GGJ4PGCMYW6RM3BCHYYA5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement stale lock release and Startup

Create backend/worker/internal/recovery/locks.go with the LockFS abstraction, an os implementation, ReleaseStaleLock and Startup, which releases a stale lock then runs Recover. Uses Recoverer fields from recovery.go.

## Acceptance criteria
- A lock older than StaleAfter is removed
- Startup runs Recover only after the lock check succeeds


## Scope
- In scope: locks.go
- Out of scope: lock package changes
- Preserve: lock.Acquire


## Technical constraints
- Recoverer and Result come from recovery.go in the same package
- New file: `backend/worker/internal/recovery/locks.go`


## Dependencies
- recovery.go


## Definition of done
- Package builds


## Clarifying questions
- None
