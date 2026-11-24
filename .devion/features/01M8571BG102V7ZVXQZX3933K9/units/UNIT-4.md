---
id: "01M8571BG2N4KF5FF1V20TFHJ3"
kind: unit
parent: 01M8571BG1B79QXNM7TZDEB19T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene single sceneObjects field and unchanged sync unit tests

Add a source test counting the field, and rerun existing sync tests proving behavior is preserved.

## Acceptance criteria
- Given the source, when matched, then one private sceneObjects field exists
- Given mocked objects, when state changes and shutdown fires, then sync and destroy are called


## Scope
- In scope: Test files
- Out of scope: Product code
- Preserve: bootSceneSync.test.ts


## Technical constraints
- Phaser and store mocked as in existing bootSceneSync tests


## Definition of done
- Tests pass


## Clarifying questions
- None
