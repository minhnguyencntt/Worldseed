---
id: "01M84JM1FGQTZYMTJ36HG942MY"
kind: unit
parent: 01M84JM1FFGHQ19JMRG56HZ6QX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: ExportSource contract and import hygiene unit tests

Write export_source_test.go with a fake source and an import scan.

## Acceptance criteria
- Fake source works through ExportSource
- No export file imports worker or execution


## Scope
- In scope: export_source_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- No filesystem beyond reading source files
- New file: `backend/internal/contribution/export_source_test.go`


## Definition of done
- Tests pass


## Clarifying questions
- None
