---
id: "01M85J8EHES1NR6R744G0FE74Y"
kind: requirement
parent: 01M85J8EHEVQPDZYQ8ZG4S2P9V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene shows store focus with the hover highlight and label

Context: BootScene subscribes to useGameStore and calls onStateChange; Tab and arrows call moveFocus and emit focusChange. Desired behavior: onStateChange focuses the SceneObject whose spec.id equals focusedObjectId and blurs the rest, and the keyboard handler stores the focused id. Expected result: a store focus change shows the same highlight and label as hover. Why: one source of truth for focus.

## Acceptance criteria
- Given objects bookshelf and bed, when focusedObjectId becomes 'bed', then bed.focus() is called and bookshelf.blur() is called if it was focused
- Given focusedObjectId is null, when the store changes, then a focused object is blurred
- Given Tab is pressed, when focus moves, then focusedObjectId in the store equals the focused object id and focusChange is still emitted


## Scope
- In scope: BootScene.onStateChange focus application
- In scope: BootScene.onKeyDown store write
- Out of scope: shutdown cleanup
- Preserve: focusChange emission
- Preserve: sync(state) for each object


## Technical constraints
- Reuse SceneObject.focus and blur; do not render highlight in BootScene


## Dependencies
- REQ-1


## Definition of done
- Store focus drives scene highlight
- Keyboard path writes the store


## Clarifying questions
- None
