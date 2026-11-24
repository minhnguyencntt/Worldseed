---
id: "01M84X7J08EW3W3D14PS5771KP"
kind: unit
parent: 01M84X7J08DMVCB4E6N6CAMSG3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Extend RenderHandle and SceneObject with hover, label and click

Extend RenderSpriteSpec and RenderHandle, and add hover state, last-synced state and an interact listener to SceneObject.

## Acceptance criteria
- RenderHandle exposes setHighlighted, setLabelVisible, onHover, onClick
- SceneObject.onInteract registers a listener fired on visible clicks


## Scope
- In scope: renderContext.ts
- In scope: SceneObject.ts
- Out of scope: Tests
- Out of scope: Phaser adapter
- Preserve: Constructor createSprite fields


## Technical constraints
- No Phaser import
- Code path: `game/src/engine/renderContext.ts`
- Code path: `game/src/entities/SceneObject.ts`


## Dependencies
- ACT1


## Definition of done
- tsc --noEmit passes for game/src


## Clarifying questions
- None
