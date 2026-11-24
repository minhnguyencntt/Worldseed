---
id: "01M84JZMA0S9H1SF02D7VHMGVT"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.4 · Mocked-storage unit tests for frozen export and FrozenIDs

Context: the contribution package already has Exporter (backend/internal/contribution/exporter.go), the Export JSON types (export.go) and FileStore.FrozenIDs (store.go). Desired behavior: unit tests with mocked storage cover the export JSON format, the empty round, frozen-only inclusion, and the frozen-ids reader, and they pass. Expected result: `go test` in the contribution package passes with those tests present. Why: the frozen-contribution handoff to devion workseed must stay stable.

## Acceptance criteria
- Given the contribution package, When go test runs, Then the export format, empty round, frozen-only and FrozenIDs tests exist and pass
- Given the tests, When they run, Then no real network, git or disk outside t.TempDir is used


## Scope
- In scope: Unit tests in backend/internal/contribution
- Out of scope: New export fields
- Out of scope: Changes to other packages
- Preserve: Existing Export JSON shape
- Preserve: Existing exporter and store behavior


## Technical constraints
- Go tests, mocked ExportSource and fake committer


## Definition of done
- Tests exist and pass in the contribution package


## Clarifying questions
- None
