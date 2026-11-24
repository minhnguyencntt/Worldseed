---
id: "01M84JZMA0GEVGBFSFG5FK9ZBD"
kind: requirement
parent: 01M84JZMA0S9H1SF02D7VHMGVT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · FileStore.FrozenIDs reader is covered by temp-dir tests

Context: FileStore.FrozenIDs reads snapshot.yaml for a world and round and returns the ids in order, ErrNotFound when missing and an error for unsafe path segments. Desired behavior: unit tests cover these three cases. Expected result: tests pass. Why: the exporter relies on it.

## Acceptance criteria
- Given a snapshot.yaml listing a then b, When FrozenIDs runs, Then it returns [a b]
- Given no snapshot, When FrozenIDs runs, Then the error is ErrNotFound
- Given world ../x or round a/b, When FrozenIDs runs, Then a non-ErrNotFound error is returned


## Scope
- In scope: store.go FrozenIDs
- Out of scope: Exporter
- Preserve: Snapshot YAML format


## Technical constraints
- Filesystem only under t.TempDir; fakeCommitter for git


## Definition of done
- FrozenIDs tests pass


## Clarifying questions
- None
