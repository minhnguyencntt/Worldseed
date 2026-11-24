---
id: "01M85J8EHEVQPDZYQ8ZG4S2P9V"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-10.2 Push the keyboard-focused object into the scene

Context: BootScene already maps Tab and arrow keys to moveFocus and emits focusChange, and SceneObject.focus() already shows the hover highlight and label. The shared game store has no focus field, so React cannot push focus into the scene. Desired behavior: the store owns the focused object id, BootScene applies it to its SceneObjects, and shutdown removes focus. Expected result: a store focus change highlights the matching object with its label. Why: keyboard focus must look the same as hover.

## Acceptance criteria
- Given a scene with objects, when the store focus id changes to an object id, then that SceneObject is focused and the others are blurred
- Given a focused object, when the scene shuts down, then every SceneObject is blurred and the store focus id is null
- Given the store focus id is null, when the store changes, then no SceneObject stays focused


## Scope
- In scope: game store focus field and setter
- In scope: BootScene focus sync from the store
- In scope: BootScene shutdown focus removal
- In scope: unit tests for all three
- Out of scope: React App or ActionMenu changes
- Out of scope: new events
- Out of scope: backend or API changes
- Out of scope: new visual styles for highlight
- Preserve: existing focusChange and menuClose emissions
- Preserve: SceneObject.focus and blur behavior
- Preserve: existing BootScene sync and shutdown cleanup


## Technical constraints
- Phaser 3.90 and zustand; no new dependencies
- Phaser is mocked in unit tests
- Reuse SceneObject.focus and blur


## Definition of done
- All requirements have Act and Verify units done
- Unit tests green


## Clarifying questions
- None
