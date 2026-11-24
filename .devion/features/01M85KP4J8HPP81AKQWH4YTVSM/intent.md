---
id: "01M85KP4J8HPP81AKQWH4YTVSM"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-10.2.4 Keyboard focus moves write to the store focus

Context: BootScene.onKeyDown (game/frontend/src/phaser/BootScene.ts) moves focus with moveFocus and only emits the focusChange event on phaserToReact. The store already has focusedObjectId and setFocusedObject, and applyFocusedObject already pushes store focus into the scene. Desired behavior: Tab, Shift+Tab and arrow keys write the newly focused id to the store via setFocusedObject. Expected result: the store is the single owner of focus state. Why: avoids duplicated focus ownership between Phaser and React.

## Acceptance criteria
- Given a scene with a focusable object, when Tab is pressed, then useGameStore.getState().focusedObjectId equals the id of the object now focused.
- Given focus moves with Shift+Tab or an arrow key, when the handler runs, then the store focusedObjectId equals the newly focused id.
- Given no object is focused after a move, when the handler runs, then the store focusedObjectId is null.
- Given a keyboard focus move, when the store is written, then applyFocusedObject leaves the scene focus unchanged and does not blur the focused object.


## Scope
- In scope: BootScene.onKeyDown writes store focus
- Out of scope: Backend changes
- Out of scope: Pointer hover handling
- Out of scope: New focus UI
- Preserve: focusChange and menuClose events still emitted
- Preserve: Enter, Space and Escape behavior
- Preserve: applyFocusedObject behavior
- Preserve: gameStore API


## Technical constraints
- Reuse useGameStore.setFocusedObject; do not add store fields
- Phaser 3.90 APIs only


## Definition of done
- Keyboard focus moves update the store focusedObjectId
- Existing keyboard and focus tests still pass


## Clarifying questions
- None
