---
id: "01M84F6TVGQ1Q8WYTYBZJW26JZ"
kind: unit
parent: 01M84F6TVF4EVQD8XE0PHEJTJ1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the exclusive file lock

Implement the per-World file lock.

## Acceptance criteria
- Acquire is exclusive
- Release frees the lock and is idempotent


## Scope
- In scope: backend/worker/internal/lock/lock.go
- Out of scope: tests
- Out of scope: stale recovery


## Technical constraints
- O_CREATE|O_EXCL
- New file: `backend/worker/internal/lock/lock.go`


## Definition of done
- package builds


## Clarifying questions
- None
