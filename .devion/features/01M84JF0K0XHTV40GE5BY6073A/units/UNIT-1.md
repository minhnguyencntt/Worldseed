---
id: "01M84JF0K08X6QRQYAWPC4ZPDP"
kind: unit
parent: 01M84JF0K04F8JTG8PXSPHAFG3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add Exporter, Export format and ErrNotFrozen

New file export.go implementing the Exporter over ExportSource.

## Acceptance criteria
- Export returns only frozen contributions in stable order
- Not-frozen round returns ErrNotFrozen


## Scope
- In scope: export.go
- Out of scope: tests
- Preserve: model.go


## Technical constraints
- New file: `backend/internal/contribution/export.go`


## Definition of done
- go build ./internal/contribution succeeds


## Clarifying questions
- None
