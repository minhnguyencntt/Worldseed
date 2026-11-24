---
id: "01M84ESEAHSZE1PAQYWTT9QT2C"
kind: unit
parent: 01M84ESEAHN6P1E1SV110MR099
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the JSON execution store and startup recovery

Implement the store and recovery packages; no tests here.

## Acceptance criteria
- state.Store Save/Load/List work on <dir>/<id>.json
- recovery.Run resumes or marks unfinished executions and clears stale locks


## Scope
- In scope: state and recovery packages
- Out of scope: tests
- Preserve: lock package API


## Technical constraints
- Clock injected as func() time.Time


## Dependencies
- A1


## Definition of done
- go build ./... passes


## Clarifying questions
- None
