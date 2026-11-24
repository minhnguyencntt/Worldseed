---
id: "01M8433BDQQZ4421VPBK2XRSA0"
kind: unit
parent: 01M8433BDPK5HHP66KS2Q726ZV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Runtime systems unit tests

Write Vitest tests for each runtime system from the requirement spec, using in-memory state only.

## Acceptance criteria
- Given the tests, when run, then every system has passing cases for success and no-op paths.
- Given each test, when it passes a frozen state, then immutability is asserted.


## Scope
- In scope: backend/game/tests/systems.test.ts
- Out of scope: YAML loading


## Technical constraints
- No filesystem or network


## Dependencies
- ACT-RT


## Definition of done
- Tests pass


## Clarifying questions
- None
