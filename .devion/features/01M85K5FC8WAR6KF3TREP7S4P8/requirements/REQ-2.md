---
id: "01M85K5FC9XME6A0H5TVF8XTJG"
kind: requirement
parent: 01M85K5FC8WAR6KF3TREP7S4P8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene clears focus on all objects when focusedObjectId is null

Context: after focus was applied, the store may reset focusedObjectId to null (for example menu close). Desired behavior: BootScene blurs every focused SceneObject when the value is null. Expected result: no object keeps highlight or label. Why: stale highlights must not remain.

## Acceptance criteria
- Given a focused object and focusedObjectId changes to null, When onStateChange runs, Then blur() is called on that object
- Given focusedObjectId is null and no object is focused, When onStateChange runs, Then no blur() call is made and nothing throws


## Scope
- In scope: Null branch of applyFocusedObject
- Out of scope: Keyboard-initiated focus
- Preserve: Existing keyboard focus behavior in onKeyDown


## Technical constraints
- Use SceneObject.isFocused to decide whether to blur


## Definition of done
- Null store focus clears scene focus


## Clarifying questions
- None
