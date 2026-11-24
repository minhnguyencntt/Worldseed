---
id: "01M84JF0K1M4MR33A1AVV81WQV"
kind: unit
parent: 01M84JF0K072BJSFZDDNE272TG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement FileStore.FrozenIDs from snapshot.yaml

Add FrozenIDs to FileStore.

## Acceptance criteria
- Ids read from snapshot.yaml
- Missing snapshot reported as not frozen


## Scope
- In scope: frozen.go
- Out of scope: tests
- Preserve: store.go


## Technical constraints
- yaml.v3 already in go.mod
- New file: `backend/internal/contribution/frozen.go`


## Definition of done
- var _ ExportSource = (*FileStore)(nil) compiles


## Clarifying questions
- None
