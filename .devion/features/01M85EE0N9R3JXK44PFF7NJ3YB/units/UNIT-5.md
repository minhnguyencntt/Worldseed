---
id: "01M85EE0NABQV60F5KS7MANN80"
kind: unit
parent: 01M85EE0N9VTQS9942EEY8GEJR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Send loading label unit tests

New test file using mocked submitContribution with a controllable deferred promise.

## Acceptance criteria
- Button name is 'Sending…' with aria-busy true while the request is pending.
- Button name is 'Send' again after the request resolves and after it rejects.


## Scope
- In scope: tests/contributionLoadingLabel.test.tsx
- Out of scope: Product code


## Technical constraints
- Mock ../src/api/client; no network


## Dependencies
- ACT-2


## Definition of done
- Loading label tests pass


## Clarifying questions
- None
