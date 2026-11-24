---
id: "01M84JQE6CTJVS19YZ95N9BTCT"
kind: unit
parent: 01M84JQE6B1Y9JFXWQA51VKXV2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add FrozenIDs to the ExportSource interface

Extend the interface in export_source.go; the existing assertion then enforces FileStore implements it.

## Acceptance criteria
- ExportSource declares FrozenIDs
- Assertion on *FileStore retained


## Scope
- In scope: export_source.go
- Out of scope: tests
- Preserve: ListByRound signature


## Technical constraints
- No new imports other than context
- Code path: `backend/internal/contribution/export_source.go`


## Dependencies
- REQ2
- ACT1


## Definition of done
- Interface extended and package builds


## Clarifying questions
- None
