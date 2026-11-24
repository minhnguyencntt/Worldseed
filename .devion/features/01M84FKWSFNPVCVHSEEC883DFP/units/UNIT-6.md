---
id: "01M84FKWSGXMEESY10T37N8ZDB"
kind: unit
parent: 01M84FKWSFVP25P49J374TWWMF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Runner approval gate unit tests

Write runner_gate_test.go reusing fakes to prove A3 against R3 criteria.

## Acceptance criteria
- Gate closed, so Publish is never called and status is AWAITING_APPROVAL
- Auto-publish success and publish failure each have a passing test


## Scope
- In scope: runner_gate_test.go
- Out of scope: product code
- Preserve: fakes


## Technical constraints
- fakePublisher has err field and calls counter


## Dependencies
- A3
- V1


## Definition of done
- go test ./internal/runner -run TestRunGate passes


## Clarifying questions
- None
