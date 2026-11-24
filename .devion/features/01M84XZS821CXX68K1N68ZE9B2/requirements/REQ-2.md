---
id: "01M84XZS83AM5PMH68YPMGT0QD"
kind: requirement
parent: 01M84XZS821CXX68K1N68ZE9B2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene.create plays the authored transition on scene start

Context: BootScene.create builds effects via buildEffects(createPhaserEffectContext(this), scene) but never plays the transition. Desired behavior: create() builds the context once and also calls playSceneTransition with the same context and scene. Expected result: a fade plays when the scene starts. Why: the visible fade transition is part of the goal.

## Acceptance criteria
- Given BootScene.create runs with a scene that has a fade entry, when the context playTransition is observed, then it is called once with the content durationMs
- Given BootScene.create runs with a scene lacking a transition, then playTransition is not called


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: effectContext.ts changes
- Preserve: Subscription and SHUTDOWN cleanup
- Preserve: sceneReady emission


## Technical constraints
- Phaser 3.90


## Definition of done
- BootScene wired and unit tested


## Clarifying questions
- None
