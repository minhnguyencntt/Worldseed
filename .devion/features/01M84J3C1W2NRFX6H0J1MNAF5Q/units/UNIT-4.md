---
id: "01M84J3C1XMCFJ7TFGF2061D23"
kind: unit
parent: 01M84J3C1WXF0M78N4FY6G8SYY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Remaining config keys load and cmd uses no removed key unit tests

Add tests proving REQ2 acceptance criteria using the example file, fstest and file reads of Go sources in a temp-free read-only way.

## Acceptance criteria
- Example config loads with expected values
- Minimal config gets defaults
- No Go source under cmd or internal/server mentions worker config fields


## Scope
- In scope: backend/internal/config/config_test.go
- In scope: backend/internal/server/removed_code_test.go
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- No network, no running server


## Definition of done
- New tests pass


## Clarifying questions
- None
