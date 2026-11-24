---
id: "01M84660BE0FGJEAZMS5BVVW69"
kind: unit
parent: 01M84660BE5RVDJJE111293XQ2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement lifecycle Create/Open/Close, snapshot and Git head

Add round.Service with Create, Open, Close, Get; snapshot.go writing snapshot.yaml; gitrepo.Head via rev-parse; contribution FileStore.ListByRound and ErrFrozen guard.

## Acceptance criteria
- Create assigns Number max+1 and ID ROUND-%07d and rejects when a non-terminal round exists with ErrActiveRound
- Close order: write snapshot, commit, Head, set freeze_commit and CLOSED, save, commit round.yaml
- Save in FileStore returns ErrFrozen when snapshot.yaml exists


## Scope
- In scope: backend/internal/round/lifecycle.go
- In scope: backend/internal/round/snapshot.go
- In scope: backend/internal/gitrepo/gitrepo.go
- In scope: backend/internal/contribution/store.go
- Out of scope: HTTP
- Preserve: Commit path validation


## Technical constraints
- Service fields: Store *FileStore, Git GitRevisioner{Committer; Head(ctx)(string,error)}, Contributions interface ListByRound, Now func() time.Time, DefaultDuration, DefaultBaseRelease
- New file: `backend/internal/round/lifecycle.go`
- New file: `backend/internal/round/snapshot.go`
- Code path: `backend/internal/gitrepo/gitrepo.go`
- Code path: `backend/internal/contribution/store.go`


## Dependencies
- R2
- A1


## Definition of done
- go build ./... succeeds


## Clarifying questions
- None
