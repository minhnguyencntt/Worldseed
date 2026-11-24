---
id: "01M84K6YA8H6EZWBKT5QVRJM10"
kind: unit
parent: 01M84K6YA8KP40D4H47ZQ3N0SG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Docs name devion workseed, match the export keys and avoid removed terms

Add a test that reads backend/README.md and backend/docs/handoff.md from the temp-free repo files and asserts content. No network or processes.

## Acceptance criteria
- Given the README, when read, then it contains 'devion workseed'
- Given the handoff doc, when read, then it contains every JSON key of Export and ExportContribution as encoded by json.Marshal
- Given both docs, when lowercased, then they contain none of 'worker', 'executionpanel', 'claude code', 'cursor'


## Scope
- In scope: backend/internal/contribution/handoff_docs_test.go
- Out of scope: Product code
- Preserve: export_source_test.go


## Technical constraints
- Unit test only; read files with os.ReadFile relative to the package directory (../../README.md and ../../docs/handoff.md)


## Definition of done
- The test passes


## Clarifying questions
- None
