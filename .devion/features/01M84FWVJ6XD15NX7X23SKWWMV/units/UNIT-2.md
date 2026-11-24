---
id: "01M84FWVJ7NVAPRKG50AX0ZE3D"
kind: unit
parent: 01M84FWVJ69CE912Y959GVB0FZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the report writer package

Create the report package with Report struct and Writer.Write that validates the id, then writes JSON atomically.

## Acceptance criteria
- Write validates id via store.ValidateID
- Write produces <dir>/<id>.json atomically


## Scope
- In scope: report.go
- Out of scope: runner
- Preserve: store


## Technical constraints
- Reuse store.ValidateID
- New file: `backend/worker/internal/report/report.go`


## Dependencies
- act1


## Definition of done
- Package compiles


## Clarifying questions
- None
