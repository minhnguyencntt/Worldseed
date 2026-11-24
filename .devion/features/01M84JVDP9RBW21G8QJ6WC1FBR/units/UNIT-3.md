---
id: "01M84JVDPAMZJH2EA3YMG1GX8Y"
kind: unit
parent: 01M84JVDP9Z0QEWRZG2QH3GBW7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Exporter frozen-only filtering unit tests

Tests with the in-memory fakeSource from export_source_test.go.

## Acceptance criteria
- Only frozen ids appear in snapshot order
- Fields map correctly


## Scope
- In scope: exporter_test.go
- Out of scope: real filesystem
- Preserve: existing tests


## Technical constraints
- Reuse fakeSource (fields contributions, frozen)


## Definition of done
- Tests pass


## Clarifying questions
- None
