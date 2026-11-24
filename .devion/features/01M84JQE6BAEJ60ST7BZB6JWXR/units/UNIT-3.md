---
id: "01M84JQE6CFZXC660DF5717EXT"
kind: unit
parent: 01M84JQE6B6NQ81DJ5HS3B1MHS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: FileStore.FrozenIDs unit tests

Test FrozenIDs against a t.TempDir() root with hand-written snapshot.yaml files.

## Acceptance criteria
- Returns ids in order
- Missing snapshot gives ErrNotFound
- Unsafe ids are rejected


## Scope
- In scope: store_test.go
- Out of scope: product code
- Preserve: Existing tests


## Technical constraints
- Temp dir only, no Git needed


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None
