---
id: "01M85J8EHFY1MFSYQ49XMYSNPW"
kind: requirement
parent: 01M85J8EHEVQPDZYQ8ZG4S2P9V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Focus is removed when the scene shuts down

Context: the SHUTDOWN handler in BootScene.create unsubscribes the store, destroys effects, objects and sprites. Desired behavior: before destroying objects it blurs each one and sets focusedObjectId to null. Expected result: no stale focus survives a scene restart. Why: a remounted scene must not start with a phantom highlight.

## Acceptance criteria
- Given a focused object, when SHUTDOWN fires, then blur() is called on every SceneObject
- Given focusedObjectId is 'bed', when SHUTDOWN fires, then the store focusedObjectId is null
- Given SHUTDOWN has fired, when the store focus changes afterwards, then no SceneObject focus or blur call occurs


## Scope
- In scope: BootScene SHUTDOWN handler
- Out of scope: React unmount
- Preserve: existing destroy and unsubscribe cleanup


## Technical constraints
- Unsubscribe from the store before writing null so the scene is not re-entered


## Dependencies
- REQ-1


## Definition of done
- Shutdown removes scene and store focus


## Clarifying questions
- None
