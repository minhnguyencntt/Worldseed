---
id: "01M85K5FC9C88DY05HG6N39YD6"
kind: unit
parent: 01M85K5FC9XME6A0H5TVF8XTJG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm null focusedObjectId blurs every focused object in applyFocusedObject

Confirm applyFocusedObject treats null as no match so every focused SceneObject is blurred, and that it neither emits focusChange nor calls setFocusedObject.

## Acceptance criteria
- With id null every focused object receives blur()
- applyFocusedObject does not call phaserToReact.emit or setFocusedObject


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: Keyboard handler
- Preserve: onKeyDown focusChange emission


## Technical constraints
- Depends on applyFocusedObject from the REQ1 Act
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT1


## Definition of done
- Null branch clears focus; no event or store write in applyFocusedObject


## Clarifying questions
- None
