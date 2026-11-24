---
id: "01M84JZMA17S2DREWRDMCTMY6Q"
kind: unit
parent: 01M84JZMA0GEVGBFSFG5FK9ZBD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: FileStore.FrozenIDs temp-dir unit tests

Confirm TestFileStore_FrozenIDs covers ordered ids, missing snapshot and unsafe ids using t.TempDir and fakeCommitter.

## Acceptance criteria
- Given TestFileStore_FrozenIDs, When run, Then all subtests pass
- Given the subtests, When read, Then each REQ2 criterion maps to a subtest


## Scope
- In scope: store_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Filesystem only under t.TempDir


## Definition of done
- FrozenIDs tests pass


## Clarifying questions
- None
