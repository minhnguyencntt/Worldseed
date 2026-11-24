---
id: "01M85HVG1WKE1KQ20ZS7BSPXW7"
kind: unit
parent: 01M85HVG1VVCBZQ1ZP2GTYRNWY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add keyboard handler to BootScene.create and release it on shutdown

Add a private onKeyDown method and register it in create, unregister in the SHUTDOWN handler.

## Acceptance criteria
- Navigation keys call moveFocus and emit focusChange.
- Enter/Space call handleKey on the focused object.
- Escape emits menuClose.
- The listener is off()'d on shutdown.


## Scope
- In scope: BootScene.ts
- Out of scope: Tests
- Preserve: Pointer click emission


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- BootScene handles the five key groups


## Clarifying questions
- None
