---
id: "01M84Y610YJGG7YY50HM7J1AKZ"
kind: requirement
parent: 01M84Y610YC3J6G2MKCHEY6T6E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene.create plays the authored transition on scene start

Context: BootScene.create builds effects but never plays the fade. Desired behavior: create() calls playSceneTransition with the same Phaser effect context used for buildEffects. Expected result: the bedroom fades in over its authored duration. Why: no fade plays today.

## Acceptance criteria
- Given BootScene.create runs, then playSceneTransition is called once with the effect context and the bundled scene.
- Given the scene shuts down, then effect handles are still destroyed.


## Scope
- In scope: BootScene.create wiring
- Out of scope: New scenes
- Preserve: Subscription cleanup
- Preserve: sceneReady emit


## Technical constraints
- Reuse a single createPhaserEffectContext(this) instance


## Definition of done
- BootScene calls the helper


## Clarifying questions
- None
