---
id: "01M84FWVJ74JZX34RPET5517R0"
kind: unit
parent: 01M84FWVJ740NRF79GJ89MJCE4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Write a report from Runner.Run for every outcome

Add Reporter interface and SetReporter, wrap Run so a report is written after any run that acquired the lock.

## Acceptance criteria
- Report written on FAILED, AWAITING_APPROVAL and COMPLETED
- No report when lock.ErrLocked


## Scope
- In scope: runner.go
- Out of scope: worker config
- Preserve: New signature
- Preserve: return values


## Technical constraints
- Keep Runner.New unchanged
- Code path: `backend/worker/internal/runner/runner.go`


## Dependencies
- act2


## Definition of done
- Compiles and existing tests unaffected


## Clarifying questions
- None
