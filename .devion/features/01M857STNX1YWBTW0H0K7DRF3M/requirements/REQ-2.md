---
id: "01M857STNXKWFDC8D25YNF2C0Q"
kind: requirement
parent: 01M857STNX1YWBTW0H0K7DRF3M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · bootSceneBuild suite asserts buildScene receives the mocked sceneSpec

bootSceneBuild.test.ts imports sceneSpec from the real content module and reads it for the hardcoded-id check. It must mock the content module and import the mocked sceneSpec for the buildScene assertion.

## Acceptance criteria
- Given a mocked sceneSpec, when create() runs, then buildScene is called once with the fake render context and that sceneSpec
- Given the mocked sceneSpec object ids and assets, when BootScene.ts and renderContext.ts are scanned, then no quoted id appears


## Scope
- In scope: bootSceneBuild.test.ts mocks
- Out of scope: buildScene engine changes
- Preserve: Shutdown destroy test


## Technical constraints
- Mocked sceneSpec ids must differ from strings legitimately in source


## Definition of done
- Suite passes


## Clarifying questions
- None
