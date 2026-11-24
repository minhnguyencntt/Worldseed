---
id: "01M84JZMA13KJMXZ1FT851QE6J"
kind: unit
parent: 01M84JZMA0KJ8XX3SAENJ80SMG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Exporter format, frozen-only, empty round and error tests

Confirm TestExporter_OnlyFrozen, TestExporter_EmptyRound, TestExporter_SourceErrors and TestExport_JSONShape exist and assert the acceptance criteria using fakeSource and errSource; add any missing assertion.

## Acceptance criteria
- Given the exporter tests, When run, Then all pass
- Given the tests, When read, Then each REQ1 acceptance criterion maps to an assertion


## Scope
- In scope: exporter_test.go
- In scope: export_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Only fakes; no real storage


## Definition of done
- Exporter tests pass


## Clarifying questions
- None
