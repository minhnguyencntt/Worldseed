---
id: "01M84X7J09J3J35Z07YAZA66SM"
kind: unit
parent: 01M84X7J08Z7MN5WRTS65VPQ4P
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Keyboard focus and activation unit tests

Add tests to tests/sceneObject.test.ts and tests/buildScene.test.ts using fake render contexts.

## Acceptance criteria
- Enter/Space emit only when focused
- moveFocus skips hidden and wraps
- blur clears highlight


## Scope
- In scope: game/tests/sceneObject.test.ts
- In scope: game/tests/buildScene.test.ts
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Fake contexts only


## Definition of done
- Both test files pass


## Clarifying questions
- None
