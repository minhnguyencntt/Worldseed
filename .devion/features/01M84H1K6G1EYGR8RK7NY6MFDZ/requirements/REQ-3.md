---
id: "01M84H1K6GJ12JG45Z4Z6DTPED"
kind: requirement
parent: 01M84H1K6G1EYGR8RK7NY6MFDZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Factory selects the agent from the configured provider kind

Context: config.Worker.ProviderKind holds mock or claude. Desired behavior: provider.New(kind, exec) returns the Mock for mock, the Claude adapter for claude and an error for any other value. Expected result: the runner can be built from config. Why: selection must be driven by config.

## Acceptance criteria
- Given kind mock, When New is called, Then the result is a Mock
- Given kind claude and a fake Exec, When New is called, Then the result is a Claude
- Given kind gpt, When New is called, Then the error text contains gpt
- Given kind claude and a nil Exec, When New is called, Then it returns an error


## Scope
- In scope: New factory
- Out of scope: editing cmd wiring, which does not exist yet
- Preserve: config constants


## Technical constraints
- Kind strings match config: mock and claude


## Dependencies
- R1
- R2


## Definition of done
- Factory covers both kinds


## Clarifying questions
- None
