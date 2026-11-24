---
id: "01M8577ZDRC314TQFWVXXGNXYY"
kind: unit
parent: 01M8577ZDRZP710VNXCDDB4HMB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene single sceneObjects field and unchanged sync unit tests

Add a vitest unit test counting sceneObjects declarations in BootScene.ts, and re-run the existing sync tests to prove behavior is unchanged.

## Acceptance criteria
- Given the duplicate field is present, when the test runs, then it fails.
- Given ACT2 is applied, when the test runs, then it passes and bootSceneSync tests still pass.


## Scope
- In scope: New test file game/frontend/tests/bootSceneSingleField.test.ts
- Out of scope: Product code changes
- Preserve: tests/bootSceneSync.test.ts


## Technical constraints
- Reads the source file only; no app, server or browser started


## Definition of done
- Test added and passing after ACT2; sync tests green


## Clarifying questions
- None
