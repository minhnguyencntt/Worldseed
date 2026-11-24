---
id: "01M84X7J083VZR72A6B8QVMTNV"
kind: unit
parent: 01M84X7J08DMVCB4E6N6CAMSG3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: SceneObject hover, label and click unit tests

Extend tests/sceneObject.test.ts: update makeFakeContext so the fake handle includes the new methods and captures the hover and click callbacks.

## Acceptance criteria
- Label and bounds passed to createSprite
- Hover toggles highlight and label
- Click emits only when visible


## Scope
- In scope: game/tests/sceneObject.test.ts
- Out of scope: Product code
- Preserve: Existing four tests


## Technical constraints
- Fake context only


## Definition of done
- sceneObject.test.ts passes


## Clarifying questions
- None
