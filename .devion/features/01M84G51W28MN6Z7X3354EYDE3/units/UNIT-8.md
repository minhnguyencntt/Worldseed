---
id: "01M84G51W36PH5GKBT136M8V4V"
kind: unit
parent: 01M84G51W2EJHJ0AEQGPQSQQNZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Report edge case unit tests

Use the existing fakeReporter from runner_report_test.go and an injected clock.

## Acceptance criteria
- Duration derives from the injected clock
- Reporter error returned on success but not masking run errors
- Nil reporter does not panic


## Scope
- In scope: runner_report_edge_test.go
- Out of scope: Product code
- Preserve: Existing report tests


## Technical constraints
- Same package runner; fakeReporter defined in runner_report_test.go


## Definition of done
- All four tests pass


## Clarifying questions
- None
