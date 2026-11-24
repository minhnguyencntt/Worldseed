---
id: "01M856R3XHQWWDH0YBA35K36X1"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.5 Phaser scene is a thin wrapper over the generic scene builder

Context: BootScene (game/frontend/src/phaser/BootScene.ts) preloads assets and builds effects, but it never calls buildScene, and no Phaser-backed RenderContext exists. Desired behavior: BootScene delegates object creation to the engine's buildScene using a Phaser RenderContext and the bundled bedroom scene content. Expected result: every object on screen comes from content, and BootScene names no object id or asset id. Why: future AI cycles must add or replace objects by editing content only.

## Acceptance criteria
- Given the bundled bedroom scene, when BootScene.create runs, then buildScene is called once with that scene and a Phaser-backed RenderContext
- Given BootScene.ts and the Phaser render context source, when scanned, then neither contains a bedroom object id or asset id literal
- Given a shared-store state change, when it fires, then every built SceneObject receives sync(state)
- Given BootScene shutdown, when it fires, then every SceneObject is destroyed and the store subscription is removed


## Scope
- In scope: Phaser RenderContext implementation
- In scope: BootScene wiring of buildScene, state sync and cleanup
- In scope: Forwarding object clicks to the typed phaserToReact bus
- Out of scope: New assets or new scene content
- Out of scope: Character animation
- Out of scope: React UI changes
- Out of scope: Backend changes
- Preserve: Existing preload, fallback texture and effects wiring in BootScene
- Preserve: Existing buildScene, SceneObject and layerDepth behavior
- Preserve: Typed event bus contract in events.ts


## Technical constraints
- Phaser 3.90 APIs only
- Engine modules under game/src/engine must not import Phaser
- Game state stays in the Zustand store, BootScene keeps no copy


## Definition of done
- All acceptance criteria are met
- BootScene contains no hardcoded object
- Existing BootScene tests still pass


## Non-functional requirements
- Pixel-art friendly rendering: no smoothing on sprites


## Clarifying questions
- None
