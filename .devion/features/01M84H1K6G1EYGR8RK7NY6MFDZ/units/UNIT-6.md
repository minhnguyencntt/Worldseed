---
id: "01M84H1K6HP04W824B84G83573"
kind: unit
parent: 01M84H1K6GJ12JG45Z4Z6DTPED
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Provider factory unit tests

Assert kind selection and errors.

## Acceptance criteria
- mock gives Mock
- claude gives Claude
- unknown kind errors naming it
- claude with nil Exec errors


## Scope
- In scope: provider_test.go
- Out of scope: product code


## Technical constraints
- Reuse fakeExec from claude_test.go
- New file: `backend/worker/internal/provider/provider_test.go`


## Dependencies
- A3


## Definition of done
- tests pass


## Clarifying questions
- None
