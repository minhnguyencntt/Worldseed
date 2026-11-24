---
id: "01M84PNYJXA8WY42R6E99MW9VY"
kind: unit
parent: 01M84PNYJX1M9S67KP1HM3FV0N
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: zod dependency declaration unit tests

Unit test reads game/package.json from disk and asserts zod is declared and resolvable.

## Acceptance criteria
- Test fails when zod is missing from dependencies
- Test passes after the Act


## Scope
- In scope: game/tests/manifestDependency.test.ts
- Out of scope: Other tests
- Preserve: Existing tests


## Definition of done
- Test passes


## Clarifying questions
- None
