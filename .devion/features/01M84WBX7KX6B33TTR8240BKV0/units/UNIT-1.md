---
id: "01M84WBX7KBGTKZGCXBR3VSZTN"
kind: unit
parent: 01M84WBX7KGVHZY4TTYKTH2VA1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add layer order, render context, SceneObject entity and buildScene

Implement the layer depth table, a structural RenderContext interface that Phaser adapts to, the SceneObject entity and buildScene that creates entities from getSceneView output. Add a thin Phaser WorldScene adapter.

## Acceptance criteria
- buildScene returns entities sorted by layer depth
- WorldScene.create builds from the Zustand store state


## Scope
- In scope: game/src/engine/layers.ts
- In scope: game/src/engine/renderContext.ts
- In scope: game/src/entities/SceneObject.ts
- In scope: game/src/scenes/buildScene.ts
- In scope: game/frontend/src/phaser/WorldScene.ts
- Out of scope: tests
- Preserve: engine/scene.ts exports


## Technical constraints
- import type only from phaser outside WorldScene
- New file: `game/src/engine/layers.ts`
- New file: `game/src/engine/renderContext.ts`
- New file: `game/src/entities/SceneObject.ts`
- New file: `game/src/scenes/buildScene.ts`
- New file: `game/frontend/src/phaser/WorldScene.ts`


## Definition of done
- Files compile under npm run typecheck


## Clarifying questions
- None
