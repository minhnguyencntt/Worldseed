---
id: "01M857F2G2DWBWTQ1CAXH88T1R"
kind: requirement
parent: 01M857F2G1S6W3EW16HHWJP6G3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Content mocks in BootScene tests include sceneSpec

Context: bootSceneFallback and bootScenePreload mock content with only scene and manifest, while BootScene imports sceneSpec. Desired: the mocks include sceneSpec so create() works. Expected: both files pass. Why: matches the real module shape.

## Acceptance criteria
- Given the mocked content module, When BootScene imports sceneSpec, Then it is defined with an objects array
- Given the two test files, When run, Then they pass


## Scope
- In scope: bootSceneFallback.test.ts
- In scope: bootScenePreload.test.ts
- Out of scope: other tests
- Preserve: fallback and preload assertions


## Technical constraints
- Mock shape must match SceneSpec: id and objects


## Definition of done
- Mocks include sceneSpec
- Tests pass


## Clarifying questions
- None
