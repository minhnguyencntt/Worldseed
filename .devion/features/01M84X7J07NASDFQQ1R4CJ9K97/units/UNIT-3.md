---
id: "01M84X7J08FDDXQ7GTBFCWHJM8"
kind: unit
parent: 01M84X7J08Z7MN5WRTS65VPQ4P
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add focus, blur, handleKey and focus cycling

Add focus API to SceneObject and a moveFocus helper exported from buildScene.ts.

## Acceptance criteria
- SceneObject.handleKey emits on Enter/Space when focused
- moveFocus skips hidden objects and wraps


## Scope
- In scope: SceneObject.ts
- In scope: buildScene.ts
- Out of scope: Tests
- Preserve: buildScene sorted output


## Technical constraints
- No DOM access
- Code path: `game/src/entities/SceneObject.ts`
- Code path: `game/src/engine/buildScene.ts`


## Dependencies
- ACT2


## Definition of done
- tsc --noEmit passes


## Clarifying questions
- None
