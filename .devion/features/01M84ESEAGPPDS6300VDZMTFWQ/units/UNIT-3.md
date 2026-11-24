---
id: "01M84ESEAH5EQ5NDA102EZA0HF"
kind: unit
parent: 01M84ESEAH23C7FD1XQ8E9VC2H
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the Round poller and expired-Round closer

Implement round file reading, detection and closing matching backend contracts.

## Acceptance criteria
- Detect classifies Rounds by status
- CloseExpired writes snapshot, commits, records head and updates round.yaml


## Scope
- In scope: worker/internal/rounds
- Out of scope: tests
- Preserve: backend yaml field names


## Technical constraints
- yaml.v3


## Dependencies
- A1


## Definition of done
- go build ./... passes


## Clarifying questions
- None
