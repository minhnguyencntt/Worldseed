---
id: "01M85HGG8NE0HSV9V85ADZ76GV"
kind: unit
parent: 01M85HGG8M0YT3Y0A9H2PV7295
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add SceneObject.onHover and emit objectHover from BootScene

Add a hoverListener to SceneObject invoked from the existing handle.onHover callback for visible objects, and register it in BootScene.create to emit objectHover.

## Acceptance criteria
- SceneObject.onHover listener receives objectId and over for visible objects
- BootScene emits objectHover with id or null


## Scope
- In scope: game/src/entities/SceneObject.ts
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: Tests
- Preserve: Highlight and label behavior


## Technical constraints
- Code path: `game/src/entities/SceneObject.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ-1


## Definition of done
- Hover in and out emits objectHover


## Clarifying questions
- None
