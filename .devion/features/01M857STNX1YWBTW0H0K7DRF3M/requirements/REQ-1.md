---
id: "01M857STNX8EF8B9P4TRGEPVER"
kind: requirement
parent: 01M857STNX1YWBTW0H0K7DRF3M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · bootSceneEffects suite mocks content with sceneSpec and its 3 tests pass

bootSceneEffects.test.ts imports scene, world and sceneSpec-dependent BootScene from the real content module. It must mock '../src/runtime/content' with world, scene and a sceneSpec carrying objects, layers and effects so the suite loads.

## Acceptance criteria
- Given the mocked content, when the suite runs, then 'builds the scene effects from the bundled bedroom scene' passes
- Given the mocked content, when create() runs, then playSceneTransition and SHUTDOWN destroy-handle tests pass


## Scope
- In scope: bootSceneEffects.test.ts mocks
- Out of scope: effectContext behavior changes
- Preserve: createPhaserEffectContext tests


## Technical constraints
- Mock factory must supply world, scene, sceneSpec and manifest used by BootScene


## Definition of done
- Suite passes


## Clarifying questions
- None
