---
id: "01M85K5FC9SVTDAZH9ZD981CD7"
kind: unit
parent: 01M85K5FC9MFGEDKGBP8CAZNCY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add applyFocusedObject to BootScene and call it from onStateChange

Add a private applyFocusedObject(id) method to BootScene that focuses the matching object and blurs other focused objects, and call it from onStateChange after the sync loop.

## Acceptance criteria
- onStateChange reads useGameStore.getState().focusedObjectId and passes it to applyFocusedObject
- Matching object gets focus(); other focused objects get blur()


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: gameStore changes
- Preserve: sync(state) loop


## Technical constraints
- Same highlight and label path as hover: SceneObject.focus()
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- BootScene compiles with tsc --noEmit
- Method wired in onStateChange


## Clarifying questions
- None
