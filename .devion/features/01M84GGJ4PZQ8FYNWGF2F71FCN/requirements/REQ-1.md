---
id: "01M84GGJ4PPSXVKAPAYCY6PWN7"
kind: requirement
parent: 01M84GGJ4PZQ8FYNWGF2F71FCN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Recover scans the store and resumes unfinished executions

Context: store.Store.List returns all executions sorted by ID. Desired behavior: Recoverer.Recover resumes every unfinished execution through an injected Resumer and skips finished or approval-pending ones. Expected result: a Result lists resumed IDs. Why: unfinished work continues after a restart.

## Acceptance criteria
- Given PENDING, RUNNING and RECOVERING executions, When Recover runs, Then Resumer.Resume is called once for each in ID order
- Given COMPLETED, FAILED and AWAITING_APPROVAL executions, When Recover runs, Then Resume is not called for them and the store is not written
- Given store.List returns an error, When Recover runs, Then Recover returns an error wrapping it and resumes nothing


## Scope
- In scope: Recoverer, Resumer and ExecutionStore types
- In scope: Recover method
- Out of scope: Lock handling
- Out of scope: Marking failed resumes
- Preserve: store package API


## Technical constraints
- ExecutionStore interface must be satisfied by *store.Store


## Definition of done
- Recover implemented and compiles


## Clarifying questions
- None
