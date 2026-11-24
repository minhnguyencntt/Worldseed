---
id: "01M84SNEWGZWSQZ8YE0S9PS0YS"
kind: unit
parent: 01M84SNEWGRWYXCN6PH7WQKWRN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: phaserPinProblems unit tests

Write unit tests for phaserPinProblems with in-memory objects shaped like package.json and package-lock.json (lockfileVersion 3).

## Acceptance criteria
- 3.90.x inputs return []
- 4.x in each field is reported


## Scope
- In scope: game/frontend/tests/phaserPinHelper.test.ts
- Out of scope: Disk access
- Preserve: Existing tests


## Technical constraints
- No filesystem or network


## Dependencies
- A1


## Definition of done
- Tests pass


## Clarifying questions
- None
