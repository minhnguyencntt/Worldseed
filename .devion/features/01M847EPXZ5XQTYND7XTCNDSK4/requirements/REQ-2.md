---
id: "01M847EPY0T932QF8DS54N3MM3"
kind: requirement
parent: 01M847EPXZ5XQTYND7XTCNDSK4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Admin round handlers map service results and errors to exact statuses and JSON

Context: RoundHandler.Get, Open, Close map errors via statusFor. Desired behavior: each endpoint's success and sentinel-error statuses are asserted with fakes. Expected result: handler mapping regressions fail a test. Why: handlers must behave correctly once mounted.

## Acceptance criteria
- Given a fakeRounds returning a round, when GET /rounds/{id} is called, then 200 with the round JSON
- Given a fakeRounds returning ErrNotFound, when GET /rounds/{id} is called, then 404
- Given a fakeRounds returning ErrNotFound wrapped, when POST /rounds/{id}/open is called, then 404


## Scope
- In scope: backend/internal/admin/rounds.go
- Out of scope: Service logic
- Preserve: statusFor mapping


## Technical constraints
- Use existing fakes


## Definition of done
- Handler statuses confirmed


## Clarifying questions
- None
