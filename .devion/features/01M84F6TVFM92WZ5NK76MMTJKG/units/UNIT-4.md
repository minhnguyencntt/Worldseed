---
id: "01M84F6TVGRE72KZBY1RQQ2R7S"
kind: unit
parent: 01M84F6TVF93MMXGC3MNASZ8J5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the JSON execution store

Implement atomic JSON persistence of executions.

## Acceptance criteria
- Save is atomic
- Invalid ids are rejected


## Scope
- In scope: backend/worker/internal/store/store.go
- Out of scope: tests
- Out of scope: recovery


## Technical constraints
- encoding/json, temp file + os.Rename
- New file: `backend/worker/internal/store/store.go`


## Definition of done
- package builds


## Clarifying questions
- None
