---
id: "01M84JZMA0KJ8XX3SAENJ80SMG"
kind: requirement
parent: 01M84JZMA0S9H1SF02D7VHMGVT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Exporter JSON format, frozen-only inclusion and empty round are covered by mocked-source tests

Context: Exporter.Export filters ListByRound results by FrozenIDs in snapshot order, returns a non-nil empty slice for an empty round and wraps source errors. Desired behavior: fake-source unit tests assert the JSON format, frozen-only inclusion, empty round and error propagation. Expected result: tests pass. Why: protects the handoff contract.

## Acceptance criteria
- Given contributions A,B,C and frozen ids C,A, When Export runs, Then only C then A are returned with Author, Content and CreatedAt mapped
- Given no frozen ids, When Export runs and is JSON-encoded, Then it contains "contributions":[]
- Given a failing source, When Export runs, Then errors.Is matches the source error
- Given an Export value, When marshaled, Then the JSON keys match the documented format


## Scope
- In scope: exporter.go behavior
- In scope: export.go JSON shape
- Out of scope: FileStore
- Preserve: Export JSON field names and ExportVersion


## Technical constraints
- Use the fakeSource and errSource doubles


## Definition of done
- Exporter tests pass


## Clarifying questions
- None
