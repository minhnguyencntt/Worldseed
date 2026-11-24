---
id: "01M84H1K6HX8XVT76T8NFT0KSB"
kind: unit
parent: 01M84H1K6GJ12JG45Z4Z6DTPED
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the provider factory New

Create backend/worker/internal/provider/provider.go with New(kind string, e Exec) (Agent-compatible, error).

## Acceptance criteria
- New returns Mock for mock
- New returns Claude for claude and an error for unknown kinds


## Scope
- In scope: provider.go
- Out of scope: tests
- Preserve: config kind strings


## Technical constraints
- Return type is an Agent interface declared in the provider package with the same Run signature as runner.Agent
- New file: `backend/worker/internal/provider/provider.go`


## Dependencies
- R3
- A1
- A2


## Definition of done
- package compiles


## Clarifying questions
- None
