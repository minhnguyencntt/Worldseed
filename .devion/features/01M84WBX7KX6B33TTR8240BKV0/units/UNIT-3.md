---
id: "01M84WBX7KY406SD03GW7ZBKFQ"
kind: unit
parent: 01M84WBX7KM5QJ5Z0V8SPC91P2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add hover, label, click, contextual actions and keyboard navigation

Implement interaction behavior in SceneObject, pure focus and action helpers in systems/interaction.ts, and emit objectHover/objectClick from WorldScene.

## Acceptance criteria
- Hover, pointerout and pointerdown on a SceneObject call onHover and onClick with the object id
- Keyboard focus cycling and Enter activation call the same handlers through the built scene


## Scope
- In scope: game/src/systems/interaction.ts
- In scope: game/src/entities/SceneObject.ts
- In scope: game/src/scenes/buildScene.ts
- In scope: game/frontend/src/phaser/WorldScene.ts
- Out of scope: tests
- Preserve: Existing SceneObject constructor arguments


## Technical constraints
- New file: `game/src/systems/interaction.ts`
- New file: `game/src/entities/SceneObject.ts`
- New file: `game/src/scenes/buildScene.ts`
- New file: `game/frontend/src/phaser/WorldScene.ts`


## Definition of done
- Typechecks


## Clarifying questions
- None
