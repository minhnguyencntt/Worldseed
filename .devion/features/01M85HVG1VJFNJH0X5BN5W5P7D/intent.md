---
id: "01M85HVG1VJFNJH0X5BN5W5P7D"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-10.1 Keyboard handling in the Phaser scene with typed events

Context: SceneObject already has focus(), blur() and handleKey(), and buildScene.ts exports moveFocus(), but BootScene never listens to the keyboard. Desired behavior: Tab and arrow keys move focus between visible interactive objects, Enter or Space selects the focused object and opens its action menu, and Escape closes the menu. All of it is emitted as typed events on the Phaser to React bus. Why: interactive objects must be keyboard-accessible.

## Acceptance criteria
- Given a scene with visible objects, when Tab or ArrowRight/ArrowDown is pressed, then focus moves forward and a typed focusChange event is emitted with the focused object id.
- Given a focused object, when Enter or Space is pressed, then objectClick is emitted with that object id and the ActionMenu opens.
- Given an open ActionMenu, when Escape is pressed, then a typed menuClose event is emitted and the menu closes.
- Each key has a mocked unit test, and Phaser is mocked.


## Scope
- In scope: PhaserToReactEvents additions
- In scope: BootScene keyboard listener and cleanup
- In scope: App subscription to menuClose
- Out of scope: Backend or Go API changes
- Out of scope: New visual styling
- Out of scope: Changes to the SceneObject or moveFocus logic
- Preserve: Existing objectClick and objectHover behavior
- Preserve: Pointer interaction
- Preserve: Single Phaser instance lifecycle


## Technical constraints
- Phaser 3.90 APIs only
- Events go through game/frontend/src/phaser/events.ts
- Reuse moveFocus and SceneObject.handleKey


## Definition of done
- All three requirements are implemented and verified by unit tests


## Non-functional requirements
- Listeners are removed on scene shutdown


## Clarifying questions
- None
