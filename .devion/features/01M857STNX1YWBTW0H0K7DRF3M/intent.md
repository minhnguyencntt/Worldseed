---
id: "01M857STNX1YWBTW0H0K7DRF3M"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.5.2 Update BootScene tests for sceneSpec mock and constructor arity

Context: game/frontend/tests/bootSceneEffects.test.ts, bootSceneBuild.test.ts and bootScene.test.ts import the real '../src/runtime/content', which parses the bedroom YAML through the content schema, so the suites do not load. BootScene.ts imports sceneSpec from that module and its constructor takes no arguments. Desired behavior: each suite mocks '../src/runtime/content' with a sceneSpec and passes. Expected result: the three suites pass. Why: the thin-wrapper BootScene must be provable with mocked dependencies.

## Acceptance criteria
- Given bootSceneEffects.test.ts, when it runs, then it mocks '../src/runtime/content' with a sceneSpec holding objects, layers and effects and its 3 BootScene tests pass
- Given bootSceneBuild.test.ts, when it runs, then buildScene is asserted to be called with the mocked sceneSpec and the suite passes
- Given bootScene.test.ts, when it runs, then it mocks the content module with a sceneSpec and passes with a zero-argument BootScene constructor


## Scope
- In scope: bootScene.test.ts
- In scope: bootSceneBuild.test.ts
- In scope: bootSceneEffects.test.ts
- Out of scope: Changing the content schema
- Out of scope: New game features
- Preserve: BootScene runtime behavior
- Preserve: Existing passing BootScene suites


## Technical constraints
- Vitest with vi.mock; no real Phaser or browser


## Definition of done
- The three suites pass with the content module mocked


## Clarifying questions
- None
