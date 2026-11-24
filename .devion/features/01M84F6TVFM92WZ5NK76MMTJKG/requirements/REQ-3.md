---
id: "01M84F6TVF4EVQD8XE0PHEJTJ1"
kind: requirement
parent: 01M84F6TVFM92WZ5NK76MMTJKG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Worker holds an exclusive file lock so only one runs per World

Context: the worker must run one execution per World at a time. Desired behavior: lock.Acquire(path) creates the lock file exclusively and Release removes it. Expected result: a second Acquire returns ErrLocked. Why: prevents concurrent executions.

## Acceptance criteria
- Given no lock file, when Acquire runs, then it succeeds and the file contains the pid
- Given a held lock, when Acquire runs again, then it returns an error satisfying errors.Is(err, ErrLocked)
- Given Release was called, when Acquire runs again, then it succeeds


## Scope
- In scope: lock package
- Out of scope: stale-lock recovery


## Technical constraints
- os.OpenFile with O_CREATE|O_EXCL; no external dependencies


## Dependencies
- R1 module go.mod


## Definition of done
- lock package builds


## Non-functional requirements
- Release is idempotent


## Clarifying questions
- None
