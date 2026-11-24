---
id: "01M84JF0K1DC68QPCZ6V752H5C"
kind: unit
parent: 01M84JF0K04F8JTG8PXSPHAFG3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Exporter format, empty round and frozen-only unit tests

Test Exporter with a fake source, no filesystem.

## Acceptance criteria
- Given 2 frozen contributions, When exported and marshalled, Then JSON matches the expected literal with version, world, round and entries
- Given empty, frozen-only and not-frozen inputs, Then three tests pass asserting [] , exactly 2 of 3 entries, and ErrNotFrozen


## Scope
- In scope: export_test.go
- Out of scope: real storage


## Definition of done
- Tests pass


## Clarifying questions
- None
