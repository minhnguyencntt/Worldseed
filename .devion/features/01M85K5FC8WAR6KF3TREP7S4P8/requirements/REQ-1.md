---
id: "01M85K5FC9MFGEDKGBP8CAZNCY"
kind: requirement
parent: 01M85K5FC8WAR6KF3TREP7S4P8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene focuses the object matching the store focusedObjectId

Context: onStateChange only syncs objects. Desired behavior: read focusedObjectId from the game store and call focus() on the SceneObject whose spec.id matches, blurring non-matching focused objects. Expected result: the matching object shows highlight and label. Why: shared focus state must be visible in the scene.

## Acceptance criteria
- Given focusedObjectId equals an object's spec.id, When onStateChange runs, Then that object's focus() is called once
- Given another object is focused and focusedObjectId names a different object, When onStateChange runs, Then the other object's blur() is called
- Given focusedObjectId names no scene object, When onStateChange runs, Then no object receives focus() and nothing throws


## Scope
- In scope: BootScene.applyFocusedObject
- Out of scope: Null clearing branch
- Preserve: sync(state) behavior


## Technical constraints
- Do not call setFocusedObject from the scene to avoid store loops


## Definition of done
- Matching object focused on store change


## Clarifying questions
- None
