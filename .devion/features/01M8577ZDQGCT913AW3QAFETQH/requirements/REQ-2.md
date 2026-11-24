---
id: "01M8577ZDRZP710VNXCDDB4HMB"
kind: requirement
parent: 01M8577ZDQGCT913AW3QAFETQH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene has a single sceneObjects field and keeps its behavior

Context: L22 and L23 of BootScene.ts both declare `private sceneObjects: SceneObject[] = [];`. Desired behavior: the second declaration (L23) is removed. Expected result: one field, no duplicate member error, sync behavior unchanged. Why: a duplicate class member is a compile error.

## Acceptance criteria
- Given BootScene.ts, when declarations matching `private sceneObjects:` are counted, then the count is 1.
- Given the removal, when the existing bootSceneSync tests run, then they pass unchanged.


## Scope
- In scope: Remove the L23 field declaration
- Out of scope: Renaming or retyping the field
- Preserve: effects, unsubscribe and failed fields
- Preserve: sync and objectClick behavior


## Definition of done
- Exactly one sceneObjects field remains


## Clarifying questions
- None
