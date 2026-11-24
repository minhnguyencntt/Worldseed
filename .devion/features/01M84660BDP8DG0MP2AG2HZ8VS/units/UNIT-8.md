---
id: "01M84660BFS5JAWT5Q3H7E8R01"
kind: unit
parent: 01M84660BE5RVDJJE111293XQ2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Lifecycle, snapshot freeze and Git head unit tests

Test Open/Close/Create, snapshot immutability, Head and ErrFrozen with fakes.

## Acceptance criteria
- Open sets 24h window and base release
- Close writes snapshot, records fake SHA, status CLOSED, and a second Close fails
- FileStore.Save into a frozen round returns ErrFrozen and creates no file
- CLI.Head returns trimmed SHA from a fake Runner


## Scope
- In scope: backend/internal/round/lifecycle_test.go
- In scope: backend/internal/contribution/store_test.go
- In scope: backend/internal/gitrepo/gitrepo_test.go
- Out of scope: real git


## Technical constraints
- Fake committer records calls; fake clock; t.TempDir


## Dependencies
- A2


## Definition of done
- Tests pass


## Clarifying questions
- None
