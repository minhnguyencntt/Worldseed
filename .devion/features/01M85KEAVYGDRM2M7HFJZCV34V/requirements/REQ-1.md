---
id: "01M85KEAVYC749XHV0V461PZ5E"
kind: requirement
parent: 01M85KEAVYGDRM2M7HFJZCV34V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Shutdown blurs focused scene objects and clears store focusedObjectId

Context: the SHUTDOWN handler in BootScene.create leaves objects focused and the store id set. Desired behavior: blur every focused SceneObject and call useGameStore.getState().setFocusedObject(null) during shutdown. Expected result: no focus remains in scene or store. Why: avoid stale focus after the scene is torn down.

## Acceptance criteria
- Given bookshelf is focused in scene and store, when SHUTDOWN runs, then blur is called on it and focusedObjectId is null.
- Given nothing is focused, when SHUTDOWN runs, then focusedObjectId remains null and blur is not called.


## Scope
- In scope: BootScene SHUTDOWN handler focus removal
- Out of scope: Store changes
- Preserve: Other shutdown cleanup


## Technical constraints
- Use the existing setFocusedObject action


## Definition of done
- Shutdown clears scene and store focus


## Clarifying questions
- None
