---
id: "01M85AR74TX6V5Q8FGJ1Q76ACE"
kind: unit
parent: 01M85AR74TJFZ28MYMPHPEB2GH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: validateWorld scene character reference unit tests

Add tests to game/tests/validator.test.ts calling validateWorld with in-memory worlds built from the validWorld and validScene fixtures in game/tests/fixtures/valid-world.ts. No filesystem, network or real dependencies.

## Acceptance criteria
- A scene with an unknown character id yields the exact path-tagged message
- A scene whose characters are all in the world list yields no errors
- A scene without characters yields no character error


## Scope
- In scope: game/tests/validator.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Use in-memory fixtures only


## Definition of done
- New tests pass


## Clarifying questions
- None
