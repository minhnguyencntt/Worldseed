---
id: "01M84JM1FF791K2NPAWKFKEP90"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.1 · Export source interface and stable JSON export type

Context: the devion workseed handoff needs frozen contributions in a stable format. backend/internal/contribution has Contribution, FileStore.ListByRound and no export types. Desired behavior: the package exposes an export source interface and a JSON export type carrying round id, contribution ids, authors, content and timestamps, with documentation, importing no removed code (worker, execution). Why: removal of dev automation must not break the handoff.

## Acceptance criteria
- Given the contribution package, when compiled, then an exported export source interface and an exported JSON export type exist
- Given an export value, when marshalled to JSON, then it contains round id, and per contribution id, author, content and created-at timestamp
- Given export.go files, when imports are inspected, then none reference worker or execution packages


## Scope
- In scope: New types and interface in backend/internal/contribution
- Out of scope: Exporter implementation
- Out of scope: FileStore.FrozenIDs
- Out of scope: HTTP routes or CLI
- Preserve: Existing Contribution, FileStore and Repository behavior


## Technical constraints
- Go package contribution, module github.com/worldseed/storyforge/backend
- Must not import removed code


## Definition of done
- Types, interface and docs exist and compile
- Unit tests pass


## Non-functional requirements
- JSON field names are stable snake_case


## Clarifying questions
- None
