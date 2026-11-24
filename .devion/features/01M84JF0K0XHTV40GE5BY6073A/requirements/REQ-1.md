---
id: "01M84JF0K04F8JTG8PXSPHAFG3"
kind: requirement
parent: 01M84JF0K0XHTV40GE5BY6073A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Frozen export has a documented stable JSON format with only frozen contributions

Add an Exporter in backend/internal/contribution that reads a round via an ExportSource interface (ListByRound, FrozenIDs) and returns an Export struct with stable JSON tags: version, world, round, contributions[{id, author, content, created_at}]. Package docs describe the format and lifecycle (only closed rounds with a snapshot are exportable).

## Acceptance criteria
- Given a source with 3 contributions of which 2 are frozen, When Export is called, Then output lists exactly the 2 frozen ones ordered by created_at then id
- Given a frozen set that is empty, When Export is called, Then contributions marshals to [] 
- Given a round not yet frozen, When Export is called, Then ErrNotFrozen is returned


## Scope
- In scope: export.go with Export types, Exporter, ErrNotFrozen, format doc comment
- Out of scope: Filesystem reading of snapshot
- Preserve: Contribution struct fields


## Technical constraints
- JSON field names fixed: version, world, round, contributions, id, author, content, created_at (RFC3339 UTC)


## Definition of done
- Format documented in package comment of export.go


## Clarifying questions
- None
