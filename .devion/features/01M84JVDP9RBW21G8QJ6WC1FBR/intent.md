---
id: "01M84JVDP9RBW21G8QJ6WC1FBR"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.3 · Exporter builds frozen-only JSON export

Context: backend/internal/contribution already has the Export and ExportContribution types (export.go), the ExportSource interface with ListByRound and FrozenIDs (export_source.go), and FileStore.FrozenIDs (store.go). No exporter exists yet. Desired behavior: an Exporter builds an Export from the source, includes only contributions whose ids are frozen in the round snapshot, and returns an empty contributions list for an empty round. Why: the devion workseed handoff must receive only frozen contributions.

## Acceptance criteria
- Given a source with contributions A, B, C and frozen ids A and C, When Export is called, Then Contributions holds exactly A and C
- Given a round with no frozen ids, When Export is called, Then Contributions is a non-nil empty slice that marshals to []


## Scope
- In scope: backend/internal/contribution exporter
- Out of scope: HTTP endpoints
- Out of scope: CLI
- Out of scope: worker or execution code
- Preserve: Export JSON types
- Preserve: ExportSource interface
- Preserve: FileStore behavior


## Technical constraints
- Go package contribution only; depend only on ExportSource
- No import of worker or execution packages


## Definition of done
- Exporter implemented and unit tests pass


## Clarifying questions
- None
