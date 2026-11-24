---
id: "01M843H7J6X5587ZBQK5QNP7T0"
kind: unit
parent: 01M843H7J62VDFSS78G523ZE0A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: loader.ts validateWorld reference unit tests

Context: validator.test.ts imports from content/world, now removed. Desired behavior: it imports loader.ts, composes LoadedWorld from fixtures and asserts errors. Expected result: validator tests pass against the surviving validator.

## Acceptance criteria
- Invalid fixture yields unknown scene: nowhere, unknown character: ghost, unknown flag: zzz, unknown object: nope
- Valid fixture yields []
- Unknown start scene and unknown dialogue next are reported
- Real the-boys-room content yields [] (existing content.test.ts)


## Scope
- In scope: backend/game/tests/validator.test.ts
- Out of scope: product code
- Preserve: fixtures and content.test.ts


## Technical constraints
- Fixtures remain in tests/fixtures; compose { ...invalidWorld, scenes: [invalidScene] }


## Dependencies
- ACT2


## Definition of done
- npx vitest run tests/validator.test.ts tests/content.test.ts passes


## Clarifying questions
- None
