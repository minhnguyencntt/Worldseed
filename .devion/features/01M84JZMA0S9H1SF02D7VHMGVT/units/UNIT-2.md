---
id: "01M84JZMA19093ME4KBFBFMTK8"
kind: unit
parent: 01M84JZMA0GEVGBFSFG5FK9ZBD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm FileStore.FrozenIDs reads snapshot ids and rejects unsafe segments

FileStore.FrozenIDs in store.go reads snapshot.yaml. Read it and confirm it returns ordered ids, ErrNotFound when missing and an error for unsafe segments.

## Acceptance criteria
- Given FrozenIDs is read, When compared to the requirement, Then it returns ids in order, ErrNotFound for a missing file and non-ErrNotFound errors for unsafe ids
- Given the package, When built, Then go build passes


## Scope
- In scope: backend/internal/contribution/store.go
- Out of scope: Test files
- Preserve: FrozenIDs signature


## Technical constraints
- Code path: `backend/internal/contribution/store.go`


## Definition of done
- FrozenIDs confirmed to satisfy the requirement


## Clarifying questions
- None
