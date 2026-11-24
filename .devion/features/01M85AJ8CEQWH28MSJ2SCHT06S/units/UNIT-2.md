---
id: "01M85AJ8CFQEV475V011T95RQS"
kind: unit
parent: 01M85AJ8CFHKW2AGTZGJBVZJV8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: validateWorld scene character reference unit tests

Add tests in game/tests/validator.test.ts using in-memory fixtures from tests/fixtures/valid-world.ts, with no filesystem or network.

## Acceptance criteria
- Unknown scene character id yields the exact path-tagged error
- Valid and absent scene characters yield no character error


## Scope
- In scope: game/tests/validator.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Fixtures come from game/tests/fixtures/valid-world.ts (WorldDef/SceneDef types in game/src/state/types.ts)


## Definition of done
- Tests pass


## Clarifying questions
- None
