---
id: "01M85KEAVYGDRM2M7HFJZCV34V"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-10.2.3 Remove store-driven focus and unsubscribe on scene shutdown

Context: BootScene.create registers a SHUTDOWN handler (game/frontend/src/phaser/BootScene.ts) that removes the keydown listener, unsubscribes from useGameStore, and destroys effects, scene objects and characters. It does not blur focused objects or reset gameStore.focusedObjectId. Desired behavior: on shutdown the focus is removed and the subscription is released. Expected result: after shutdown no scene object stays focused, the store focusedObjectId is null, and later store changes do not reach the scene. Why: a stale focus id would re-highlight objects when the scene restarts.

## Acceptance criteria
- Given a focused object, when the scene shuts down, then the object is blurred and focusedObjectId is null.
- Given the scene has shut down, when the store changes, then onStateChange is not invoked and no object is focused.
- A unit test asserts both behaviors.


## Scope
- In scope: BootScene SHUTDOWN handler
- In scope: Unit test for shutdown focus removal
- Out of scope: Keyboard handler logic
- Out of scope: Store schema changes
- Out of scope: Backend
- Preserve: Existing shutdown cleanup of keyboard listener, effects, objects and characters
- Preserve: applyFocusedObject behavior


## Technical constraints
- Phaser 3.90 APIs only
- Unit tests mock Phaser as in tests/bootSceneFocusClear.test.ts


## Definition of done
- Shutdown removes focus and unsubscribes
- Unit test passes


## Clarifying questions
- None
