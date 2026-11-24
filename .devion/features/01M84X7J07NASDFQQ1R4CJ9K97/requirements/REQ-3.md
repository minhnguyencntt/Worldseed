---
id: "01M84X7J08Z7MN5WRTS65VPQ4P"
kind: requirement
parent: 01M84X7J07NASDFQQ1R4CJ9K97
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene objects support keyboard focus and activation

Context: no keyboard access exists. Desired behavior: SceneObject has focus() and blur() applying the same highlight and label as hover, and handleKey(key) that activates when focused and isActivationKey. buildScene-level SceneFocus helper cycles focus across visible objects using nextFocusIndex. Expected result: users can Tab/arrow to an object and press Enter or Space to open its actions. Why: interactive objects must be keyboard accessible.

## Acceptance criteria
- Given a focused visible object, When Enter or Space is pressed, Then the interact event is emitted
- Given an unfocused object, When Enter is pressed, Then nothing is emitted
- Given three objects with the second hidden, When focus moves next twice from the first, Then focus lands on the third then wraps to the first
- Given focus moves away, When blur runs, Then highlight and label turn off


## Scope
- In scope: SceneObject focus/blur/handleKey
- In scope: focus cycling function in buildScene.ts
- Out of scope: DOM key listener binding
- Out of scope: Phaser input
- Preserve: buildScene return type and ordering


## Technical constraints
- Reuse isActivationKey and nextFocusIndex


## Dependencies
- REQ1
- REQ2


## Definition of done
- Focus and activation implemented


## Non-functional requirements
- Hidden objects are never focusable


## Clarifying questions
- None
