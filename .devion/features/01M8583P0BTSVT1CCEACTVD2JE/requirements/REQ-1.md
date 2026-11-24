---
id: "01M8583P0BN54TJ4DK2D4FCJE7"
kind: requirement
parent: 01M8583P0BTSVT1CCEACTVD2JE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Effect context tests pass the required second argument or a typed mock

Context: tests/bootSceneEffects.test.ts lines 114 and 123 call createPhaserEffectContext(fakeScene) but the function requires resolveKey as well. Desired behavior: calls pass a typed resolveKey. Expected result: no TS2554 there. Why: type-clean tests.

## Acceptance criteria
- Given createPhaserEffectContext(fakeScene as never, resolveKey) in both tests, When tsc runs, Then no TS2554 is reported
- Given the bootSceneEffects suite, When run, Then its tests pass with sceneSpec present in the content mock


## Scope
- In scope: effectContext.ts exported ResolveKey type
- In scope: bootSceneEffects.test.ts
- Out of scope: effect behavior changes
- Preserve: dust, ambientLight and transition behavior


## Definition of done
- No TS2554 in bootSceneEffects.test.ts


## Clarifying questions
- None
