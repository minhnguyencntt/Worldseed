---
id: "01M84JZMA1ZFSQFHDBTWWFZ1MQ"
kind: unit
parent: 01M84JZMA0KJ8XX3SAENJ80SMG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm Exporter.Export frozen-only, empty and error behavior

Exporter.Export in exporter.go already filters by frozen ids, returns a non-nil empty slice and wraps source errors. Read it and change nothing unless it disagrees with the acceptance criteria.

## Acceptance criteria
- Given Export is read, When compared to the requirement, Then it filters frozen ids in order, never returns nil Contributions and wraps errors with %w
- Given the package, When built, Then go build passes


## Scope
- In scope: backend/internal/contribution/exporter.go
- Out of scope: Test files
- Preserve: Export signature


## Technical constraints
- Code path: `backend/internal/contribution/exporter.go`


## Definition of done
- Exporter confirmed to satisfy the requirement


## Clarifying questions
- None
