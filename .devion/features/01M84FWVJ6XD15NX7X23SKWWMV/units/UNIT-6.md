---
id: "01M84FWVJ7CX35CTCCHMQKM1ZJ"
kind: unit
parent: 01M84FWVJ740NRF79GJ89MJCE4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Runner report unit tests

Use a fake Reporter to prove reports for each outcome and none on lock contention.

## Acceptance criteria
- FAILED, AWAITING_APPROVAL, COMPLETED reports captured
- No report when locked


## Scope
- In scope: runner_report_test.go
- Out of scope: real files beyond temp
- Preserve: existing runner tests


## Technical constraints
- Reuse newRunner, fakeAgent, fakeTrees helpers from runner_test.go


## Definition of done
- Tests pass


## Clarifying questions
- None
