---
id: "01M85JVDXDWHNRBZJEBP0J7DG1"
kind: requirement
parent: 01M85JVDXCBWET0NQHXCYBVNB1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene clears focus when the store focusedObjectId is null

Context: SceneObject.blur() removes highlight and label. Desired behavior: when focusedObjectId is null (or matches no object), every currently focused SceneObject is blurred, and this runs even before GameState is initialised. Expected result: no object stays highlighted. Why: clearing focus in the store must clear the canvas.

## Acceptance criteria
- Given a focused SceneObject and focusedObjectId set to null when the store notifies then its blur() is called
- Given focusedObjectId is null and no object is focused then neither focus() nor blur() is called


## Scope
- In scope: BootScene clearing logic and wiring into onStateChange
- Out of scope: SceneObject changes
- Preserve: Early return when GameState is null must not skip focus application


## Technical constraints
- Use SceneObject.isFocused to decide whether to blur


## Dependencies
- INT-1
- REQ-1


## Definition of done
- Null focus clears all highlighted objects


## Clarifying questions
- None
