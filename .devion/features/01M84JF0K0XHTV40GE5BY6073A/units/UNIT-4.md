---
id: "01M84JF0K214J0YTJ8H6WV9DFZ"
kind: unit
parent: 01M84JF0K072BJSFZDDNE272TG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: FileStore.FrozenIDs unit tests

Test FrozenIDs with a temp dir.

## Acceptance criteria
- Given a snapshot.yaml with ids, When FrozenIDs is called, Then ids are returned with frozen=true
- Given a missing snapshot or an unsafe world id, Then not-frozen without error and a non-nil error respectively


## Scope
- In scope: frozen_test.go


## Definition of done
- Tests pass


## Clarifying questions
- None
