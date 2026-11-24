---
id: "01M84JM1FF2YEH3EM7383HF65V"
kind: unit
parent: 01M84JM1FFVPQJAV1NXA9WRW6R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add Export and ExportContribution JSON types

Create backend/internal/contribution/export.go declaring ExportVersion, Export and ExportContribution with json tags and doc comments.

## Acceptance criteria
- export.go compiles in package contribution
- Types carry snake_case json tags and doc comments


## Scope
- In scope: export.go
- Out of scope: Tests
- Preserve: model.go


## Technical constraints
- Import only time
- New file: `backend/internal/contribution/export.go`


## Definition of done
- go build ./internal/contribution passes


## Clarifying questions
- None
