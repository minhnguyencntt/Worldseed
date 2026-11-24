---
id: "01M8571BG1B79QXNM7TZDEB19T"
kind: requirement
parent: 01M8571BG102V7ZVXQZX3933K9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene has a single sceneObjects field and keeps its behavior

Context: BootScene.ts lines 22 and 23 both declare `private sceneObjects: SceneObject[] = []`. Desired behavior: keep one field. Expected result: create(), onStateChange() and the SHUTDOWN handler still use this.sceneObjects unchanged. Why: a duplicate class member is a compile error.

## Acceptance criteria
- Given BootScene.ts, when searched for `private sceneObjects`, then exactly one match exists
- Given a created BootScene with a mocked buildScene, when state changes, then every SceneObject.sync receives the state
- Given SHUTDOWN is emitted, when handled, then every SceneObject.destroy is called


## Scope
- In scope: Field declarations of BootScene
- Out of scope: create/onStateChange logic changes
- Preserve: Existing bootSceneBuild and bootSceneSync tests


## Technical constraints
- Field type stays SceneObject[]


## Definition of done
- One field remains and behavior is unchanged


## Clarifying questions
- None
