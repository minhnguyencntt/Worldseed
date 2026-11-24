---
id: "01M85KEAVY3V1ABNFQFAQWJTCB"
kind: unit
parent: 01M85KEAVYH6ASHXSSAQ54DNJE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Order unsubscribe before the focus reset in the SHUTDOWN handler

Ensure the handler sequence is blur, unsubscribe, null, setFocusedObject(null), then destroy, so store updates after unsubscribe never reach the scene.

## Acceptance criteria
- Unsubscribe runs before setFocusedObject(null).
- this.unsubscribe is null after shutdown.


## Scope
- In scope: Ordering in BootScene SHUTDOWN handler
- Out of scope: Tests
- Preserve: Destroy of effects, objects and characters


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT1


## Definition of done
- Order verified in source


## Clarifying questions
- None
