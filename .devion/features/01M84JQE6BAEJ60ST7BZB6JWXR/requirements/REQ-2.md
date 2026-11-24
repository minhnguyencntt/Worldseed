---
id: "01M84JQE6B1Y9JFXWQA51VKXV2"
kind: requirement
parent: 01M84JQE6BAEJ60ST7BZB6JWXR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · ExportSource declares FrozenIDs and FileStore is asserted to implement it

Extend the ExportSource interface in export_source.go with FrozenIDs so the export reads only frozen ids, and keep the var _ ExportSource = (*FileStore)(nil) assertion so the build fails if FileStore lacks it.

## Acceptance criteria
- Given ExportSource, when inspected, then it declares ListByRound and FrozenIDs
- Given the package, when compiled, then the assertion that *FileStore implements ExportSource passes
- Given the fake source in tests, when it implements both methods, then it is usable as an ExportSource


## Scope
- In scope: export_source.go interface
- Out of scope: Exporter logic
- Preserve: export.go types
- Preserve: No worker/execution imports in export files


## Technical constraints
- export_source.go must not import worker or execution packages


## Dependencies
- REQ1


## Definition of done
- Interface extended; assertion retained


## Clarifying questions
- None
