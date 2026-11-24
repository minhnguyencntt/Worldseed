---
id: "01M84JVDP9HZC56HTP92AYZXS8"
kind: unit
parent: 01M84JVDP9Z0QEWRZG2QH3GBW7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add Exporter with frozen-only filtering

Create backend/internal/contribution/exporter.go defining Exporter wrapping an ExportSource and building an Export from frozen contributions.

## Acceptance criteria
- Exporter.Export returns only frozen contributions in snapshot order
- Fields map PlayerID to Author and Prompt to Content


## Scope
- In scope: exporter.go
- Out of scope: tests
- Preserve: export.go
- Preserve: export_source.go


## Technical constraints
- No worker/execution imports
- New file: `backend/internal/contribution/exporter.go`


## Definition of done
- exporter.go compiles with go build ./internal/contribution


## Clarifying questions
- None
