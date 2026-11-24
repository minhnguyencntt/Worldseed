---
id: "01M84XMQSBC9F758DGDT9XWBR4"
kind: requirement
parent: 01M84XMQSBFWJ5P696ZHJ0SS69
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Phaser BootScene creates scene effects from content and cleans them up

Implement EffectRenderContext on Phaser (particles for dust, tinted rectangle for light, camera fade) and call buildEffects in BootScene.create, destroying handles on shutdown.

## Acceptance criteria
- Given BootScene.create, when scene content has effects, then buildEffects is called with the Phaser context and the scene content
- Given SHUTDOWN, when it fires, then every effect handle is destroyed
- Given the Phaser context playTransition(400), when called, then cameras.main.fadeIn(400) is invoked


## Scope
- In scope: game/frontend/src/phaser/effectContext.ts
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: scene navigation
- Preserve: sceneReady emit
- Preserve: store subscription cleanup


## Technical constraints
- Phaser 3.90 APIs: add.particles, add.rectangle, cameras.main.fadeIn


## Definition of done
- BootScene wired


## Non-functional requirements
- Handles destroyed to avoid leaks


## Clarifying questions
- None
