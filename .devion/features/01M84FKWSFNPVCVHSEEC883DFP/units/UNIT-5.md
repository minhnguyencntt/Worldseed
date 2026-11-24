---
id: "01M84FKWSG4460ZDVTSWZQ6TKD"
kind: unit
parent: 01M84FKWSFKJZD41BPD82DNBN9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Runner retry and budget unit tests

Write runner_retry_test.go reusing fakes from runner_test.go to prove A2 against R2 criteria.

## Acceptance criteria
- Retry success, retry exhaustion and budget stop each tested
- No real agent or network


## Scope
- In scope: runner_retry_test.go
- Out of scope: product code
- Preserve: runner_test.go helpers


## Technical constraints
- fakeAgent.errs scripts per-attempt errors; cost field returned per call


## Dependencies
- A2
- V1


## Definition of done
- go test ./internal/runner -run 'TestRun(Retry|Budget)' passes


## Clarifying questions
- None
