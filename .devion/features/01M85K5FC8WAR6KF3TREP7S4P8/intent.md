---
id: "01M85K5FC8WAR6KF3TREP7S4P8"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-10.2.2 Scene applies the store's focusedObjectId as hover highlight and label

Context: gameStore already exposes focusedObjectId and setFocusedObject (game/frontend/src/store/gameStore.ts). SceneObject already has focus() and blur() that show the same highlight and label as hover. BootScene.onStateChange (game/frontend/src/phaser/BootScene.ts) only calls sync(state) on each object and never reads focusedObjectId. Desired behavior: on every store change the scene focuses the object whose spec.id equals focusedObjectId and blurs all others, and clears focus on all objects when the value is null. Expected result: setting the store focus highlights and labels the matching object, and null clears them. Why: keyboard focus pushed into the store must be visible in the canvas.

## Acceptance criteria
- Given focusedObjectId is set to an existing visible object id, When the store changes, Then BootScene calls focus() on that SceneObject and blur() on every other focused object
- Given focusedObjectId is null, When the store changes, Then no SceneObject is focused and focused objects are blurred
- A unit test with Phaser mocked asserts both the highlight and label path (focus) and the clearing path (blur)


## Scope
- In scope: BootScene.onStateChange reading focusedObjectId
- In scope: Unit tests with Phaser mocked
- Out of scope: Writing focusedObjectId from the keyboard handler
- Out of scope: Changes to gameStore
- Out of scope: Changes to SceneObject rendering
- Preserve: Existing sync(state) calls
- Preserve: focusChange and menuClose emissions
- Preserve: SHUTDOWN cleanup


## Technical constraints
- Reuse SceneObject.focus() and blur(); do not add a second highlight path
- Phaser 3.90 mocked in tests via vi.mock('phaser')


## Definition of done
- Both requirements have passing unit tests
- No regression in existing bootScene*.test.ts suites


## Clarifying questions
- None
