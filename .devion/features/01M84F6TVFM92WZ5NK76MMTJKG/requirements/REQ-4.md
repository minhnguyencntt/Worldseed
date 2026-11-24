---
id: "01M84F6TVF93MMXGC3MNASZ8J5"
kind: requirement
parent: 01M84F6TVFM92WZ5NK76MMTJKG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Executions persist as atomically written JSON records with safe ids

Context: no persistence exists for worker executions. Desired behavior: store.Store saves one <id>.json per Execution via temp file and rename. Expected result: round-trip persistence and rejection of ids like ../x. Why: recovery after restart needs durable state.

## Acceptance criteria
- Given an Execution, when Save then Get run, then the returned record equals the saved one
- Given three saved executions, when List runs, then all three are returned sorted by ID
- Given id ../evil, when Save or Get runs, then ErrInvalidID is returned and no file is written outside the dir
- Given an unknown id, when Get runs, then ErrNotFound is returned


## Scope
- In scope: store package
- Out of scope: startup recovery logic


## Technical constraints
- JSON files only; ids must match ^[A-Za-z0-9][A-Za-z0-9._-]*$ and not contain ..


## Dependencies
- R1 module go.mod


## Definition of done
- store package builds


## Non-functional requirements
- Writes are atomic via rename


## Clarifying questions
- None
