---
id: "01M85JVDXCBWET0NQHXCYBVNB1"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-10.2.2 Scene applies the store's focused object as hover highlight and label

Context: gameStore already holds focusedObjectId and setFocusedObject (SG-10.2.1), and SceneObject.focus()/blur() already draw the same highlight and label as hover. BootScene does not read focusedObjectId yet. Desired behavior: the scene reads the store focus value on each store change, focuses the matching SceneObject, and clears focus when the value is null. Expected result: a unit test with Phaser mocked proves it. Why: so keyboard focus held in the store appears on the canvas.

## Acceptance criteria
- Given focusedObjectId is 'bookshelf' when the store changes then the SceneObject with spec.id 'bookshelf' has focus() called
- Given focusedObjectId becomes null then every focused SceneObject has blur() called
- A unit test with Phaser mocked covers both cases


## Scope
- In scope: BootScene store subscription applies focusedObjectId to SceneObjects
- In scope: Unit test with Phaser mocked
- Out of scope: Writing focusedObjectId from the keyboard handler
- Out of scope: Changing gameStore
- Out of scope: Changing SceneObject or the engine
- Preserve: Existing hover behavior
- Preserve: Existing keyboard handling and focusChange event
- Preserve: BootScene shutdown cleanup


## Technical constraints
- Reuse SceneObject.focus() and blur(); do not add new highlight code
- Phaser 3.90; Phaser is mocked in unit tests


## Definition of done
- Both requirements verified by passing unit tests


## Clarifying questions
- None
