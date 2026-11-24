---
id: "01M8583P0C16P6FCV08SKG5HHA"
kind: unit
parent: 01M8583P0BN54TJ4DK2D4FCJE7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Effect context tests use two arguments and typed mocks

Update bootSceneEffects.test.ts so both calls pass a typed resolveKey and the content mock includes sceneSpec.

## Acceptance criteria
- Given the two calls, When tsc runs, Then no TS2554
- Given the suite, When run, Then 3 tests pass


## Scope
- In scope: bootSceneEffects.test.ts
- Out of scope: product code
- Preserve: assertions


## Definition of done
- Suite passes and type-checks


## Clarifying questions
- None
