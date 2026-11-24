---
id: "01M857F2G2ZY5PP9Q73T6NRSDC"
kind: requirement
parent: 01M857F2G1S6W3EW16HHWJP6G3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Effect context tests use the two-argument constructor

Context: createPhaserEffectContext(scene, resolveKey) requires two arguments but bootSceneEffects.test.ts passes one, and bootSceneFallback.test.ts indexes particles.mock.calls[0][2] on an untyped mock. Desired: typed correct calls. Expected: no TS2554 or TS2493. Why: type-safe tests.

## Acceptance criteria
- Given bootSceneEffects.test.ts, When createPhaserEffectContext is called, Then two arguments are passed
- Given the particles mock in bootSceneFallback.test.ts, When calls[0][2] is read, Then it type-checks and equals the fallback key


## Scope
- In scope: bootSceneEffects.test.ts
- In scope: bootSceneFallback.test.ts
- In scope: effectContext.ts type alias
- Out of scope: effect behavior
- Preserve: effect assertions


## Technical constraints
- Signature stays (scene, resolveKey)


## Definition of done
- No arity or tuple type errors
- Tests pass


## Clarifying questions
- None
