---
id: "01M85JJHFAQ0ZMXH0F08WGQ88W"
kind: requirement
parent: 01M85JJHF9JFETVS6HP0C5MN51
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · setFocusedObject sets and clears the focused object id

Context: no action writes focus. Desired behavior: setFocusedObject(id: string | null) sets focusedObjectId to id without touching state. Expected result: store reflects the id passed, including null. Why: the keyboard handler and scene need one write path.

## Acceptance criteria
- Given a fresh store, when setFocusedObject('bookshelf') is called, then focusedObjectId is 'bookshelf'
- Given focus is 'bookshelf', when setFocusedObject(null) is called, then focusedObjectId is null
- Given an initialized state, when setFocusedObject('door') is called, then state is the same object as before


## Scope
- In scope: setFocusedObject action
- Out of scope: validating the id against scene objects
- Out of scope: scene wiring
- Preserve: state, setState, init


## Technical constraints
- Action uses zustand set with a partial update


## Dependencies
- REQ-1 field


## Definition of done
- Action implemented and typed


## Clarifying questions
- None
