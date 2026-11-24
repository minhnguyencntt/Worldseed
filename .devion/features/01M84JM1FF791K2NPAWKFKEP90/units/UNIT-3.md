---
id: "01M84JM1FG83MN23DAMNK0XQGR"
kind: unit
parent: 01M84JM1FFVPQJAV1NXA9WRW6R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Export JSON shape and docs unit tests

Write export_test.go asserting marshalled keys, RFC3339 time and doc comments on the types.

## Acceptance criteria
- Marshalled Export has version, world_id, round_id, contributions
- Each contribution has id, author, content, created_at


## Scope
- In scope: export_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Pure unit test, no I/O
- New file: `backend/internal/contribution/export_test.go`


## Definition of done
- Tests pass


## Clarifying questions
- None
