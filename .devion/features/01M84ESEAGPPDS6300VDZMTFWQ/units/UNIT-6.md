---
id: "01M84ESEAH4N852G84MG37YEDF"
kind: unit
parent: 01M84ESEAGQ9G23D8MDBBA29HQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Config loader, logger and lock unit tests

Write TDD-style unit tests from R1 using fstest.MapFS, a bytes.Buffer and t.TempDir only.

## Acceptance criteria
- Defaults and validation errors asserted
- Logger output decodes as JSON with msg and level
- Second Acquire returns ErrLocked and release re-enables it


## Scope
- In scope: worker/internal/config/config_test.go
- In scope: worker/internal/logging/logging_test.go
- In scope: worker/internal/lock/lock_test.go
- Out of scope: Product code changes
- Preserve: Act code


## Technical constraints
- No network or real clock


## Definition of done
- Tests pass in seconds


## Clarifying questions
- None
