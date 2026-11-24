---
id: "01M85KP4J9NMDZZQ92VNPTYFRG"
kind: requirement
parent: 01M85KP4J8HPP81AKQWH4YTVSM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Tab and arrow keys write the focused object id to the store

Context: onKeyDown calls moveFocus then emits focusChange only. Desired behavior: after moveFocus, the scene calls useGameStore.getState().setFocusedObject(id) for Tab, Shift+Tab and arrow keys. Expected result: the store focusedObjectId matches the scene's focused object after every move. Why: store becomes the owner of focus.

## Acceptance criteria
- Given objects [bookshelf] and Tab pressed, when handled, then the store focusedObjectId is 'bookshelf'.
- Given Shift+Tab or ArrowLeft pressed, when handled, then setFocusedObject is called with the focused object id.
- Given the focusChange event, when a move happens, then it is still emitted with the same id.


## Scope
- In scope: onKeyDown store write
- Out of scope: Enter, Space, Escape handling
- Preserve: focusChange event payload


## Technical constraints
- Write via setFocusedObject only


## Definition of done
- Store write happens on every focus-moving key


## Clarifying questions
- None
