---
id: "01M84JQE6B73HVQEMFM8W47CR9"
kind: unit
parent: 01M84JQE6B6NQ81DJ5HS3B1MHS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement FileStore.FrozenIDs

Add FrozenIDs to FileStore in backend/internal/contribution/store.go next to ListByRound.

## Acceptance criteria
- FrozenIDs returns ids from snapshot.yaml in order
- Missing snapshot returns ErrNotFound
- Unsafe ids are rejected


## Scope
- In scope: store.go
- Out of scope: tests
- Preserve: Other FileStore methods


## Technical constraints
- Use safepath.Segment and yaml.v3
- Code path: `backend/internal/contribution/store.go`


## Dependencies
- REQ1


## Definition of done
- Method compiles and follows ListByRound id validation style


## Clarifying questions
- None
