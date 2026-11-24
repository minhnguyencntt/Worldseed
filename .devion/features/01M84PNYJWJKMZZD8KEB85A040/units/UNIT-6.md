---
id: "01M84PNYJXHPZG083ZBKHZNW08"
kind: unit
parent: 01M84PNYJXDQ11RDMN62D5AMCN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Manifest validator unit tests

Unit tests for validator results, error paths and duplicate ids.

## Acceptance criteria
- A valid manifest returns ok true and an invalid one returns ok false with the field path
- Duplicate ids are reported and non-object input does not throw


## Scope
- In scope: game/tests/manifestValidate.test.ts
- Out of scope: schema tests
- Preserve: Existing tests


## Definition of done
- Tests pass


## Clarifying questions
- None
