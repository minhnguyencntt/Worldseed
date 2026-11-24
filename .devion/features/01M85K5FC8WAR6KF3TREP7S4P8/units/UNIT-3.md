---
id: "01M85K5FC94PV06SFT3P1QHQW5"
kind: unit
parent: 01M85K5FC9MFGEDKGBP8CAZNCY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Store focus focuses the matching scene object unit tests

TDD unit tests proving that setting focusedObjectId focuses and labels the matching object through SceneObject.focus().

## Acceptance criteria
- Setting focusedObjectId to an object id calls focus() on it
- A different focused object is blurred
- Unknown id focuses nothing


## Scope
- In scope: game/frontend/tests/bootSceneFocusApply.test.ts
- Out of scope: Real Phaser
- Preserve: Existing bootSceneKeyboard.test.ts


## Technical constraints
- Mock phaser, ../src/runtime/content, @game/engine/buildScene, buildEffects, playSceneTransition, renderContext and effectContext exactly as in game/frontend/tests/bootSceneKeyboard.test.ts
- New file: `game/frontend/tests/bootSceneFocusApply.test.ts`


## Dependencies
- ACT1


## Definition of done
- Test file passes


## Clarifying questions
- None
