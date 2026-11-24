---
id: "01M84JVDP9FFEBG2HM2JYJ33M4"
kind: unit
parent: 01M84JVDP93P4F2VFZNBMCWSVY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Wrap source errors and guarantee a non-nil empty list in Exporter.Export

In Exporter.Export, return wrapped errors from the source and make sure Contributions is never nil.

## Acceptance criteria
- Source errors are wrapped with %w
- Empty frozen set yields a non-nil empty slice


## Scope
- In scope: Exporter.Export error paths
- Out of scope: tests
- Preserve: frozen filtering


## Technical constraints
- errors.Is must still match ErrNotFound
- New file: `backend/internal/contribution/exporter.go`


## Definition of done
- Error and empty paths implemented


## Clarifying questions
- None
