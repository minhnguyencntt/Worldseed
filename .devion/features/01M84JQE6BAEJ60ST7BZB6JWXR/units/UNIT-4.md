---
id: "01M84JQE6CN0PCDQX5XSEB02X3"
kind: unit
parent: 01M84JQE6B1Y9JFXWQA51VKXV2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: ExportSource includes FrozenIDs and FileStore satisfies it

Update the test fake to implement the extended interface and add an explicit assertion test.

## Acceptance criteria
- Fake implements ExportSource with FrozenIDs
- FileStore assigned to ExportSource compiles and works


## Scope
- In scope: export_source_test.go
- Out of scope: product code
- Preserve: TestExportFiles_NoRemovedImports


## Technical constraints
- Temp dir only


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
