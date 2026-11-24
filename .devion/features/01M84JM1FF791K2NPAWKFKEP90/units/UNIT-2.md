---
id: "01M84JM1FGNVVR07JV9XZHNG69"
kind: unit
parent: 01M84JM1FFGHQ19JMRG56HZ6QX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the ExportSource interface

Declare ExportSource with ListByRound matching FileStore, plus a compile-time assertion.

## Acceptance criteria
- ExportSource is exported and documented
- FileStore satisfies it at compile time


## Scope
- In scope: export_source.go
- Out of scope: Tests
- Preserve: store.go


## Technical constraints
- Imports only context
- New file: `backend/internal/contribution/export_source.go`


## Definition of done
- go build ./internal/contribution passes


## Clarifying questions
- None
