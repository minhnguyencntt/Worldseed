---
id: "01M85JJHFAGX6K5QHTMMZ5EXX2"
kind: unit
parent: 01M85JJHFAQD7BB7AZ8EMY0PYG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: focusedObjectId default unit tests

Write unit tests against the real useGameStore asserting the default focus value.

## Acceptance criteria
- Fresh store focusedObjectId is null
- After init the value is still null


## Scope
- In scope: new test file for focus default
- Out of scope: product code
- Preserve: gameStore.test.ts


## Technical constraints
- No mocks of the store


## Dependencies
- ACT-1


## Definition of done
- Tests pass


## Clarifying questions
- None
