---
id: "01M85HVG1VVCBZQ1ZP2GTYRNWY"
kind: requirement
parent: 01M85HVG1VJFNJH0X5BN5W5P7D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene maps Tab, arrows, Enter, Space and Escape to focus, select and close events

Context: BootScene.create builds SceneObjects but registers no keyboard listener. Desired: a keydown listener where Tab/ArrowRight/ArrowDown call moveFocus(+1), Shift+Tab/ArrowLeft/ArrowUp call moveFocus(-1) and emit focusChange, Enter/Space call handleKey on the focused object (which emits objectClick), and Escape emits menuClose. The listener is removed on shutdown.

## Acceptance criteria
- Given two visible objects, when Tab is pressed, then the first gets focus and focusChange is emitted with its id.
- Given a focused object, when Enter or Space is pressed, then objectClick is emitted with its id.
- Given any state, when Escape is pressed, then menuClose is emitted.
- Given scene shutdown, then the keydown listener is removed.


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: SceneObject internals
- Out of scope: App
- Preserve: Existing create, sync and shutdown behavior


## Technical constraints
- Use this.input.keyboard?.on('keydown') from Phaser 3.90
- Call preventDefault on Tab


## Dependencies
- REQ1


## Definition of done
- All five keys behave as specified


## Non-functional requirements
- No listener leak


## Clarifying questions
- None
