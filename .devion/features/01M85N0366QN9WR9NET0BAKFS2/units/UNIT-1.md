---
id: "01M85N0367ATS902JHMVERZAQF"
kind: unit
parent: 01M85N0366QKD7CG9Z9NJ6EZYQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Subscribe BootScene.create to transitionTo with fade-out and scene start

Add a private field holding the unsubscribe function and register the handler in create() next to the playAnimation subscription. The handler calls this.cameras.main.fadeOut(TRANSITION_FADE_MS) and registers a one-time listener for the camera fade-out-complete event that calls this.scene.start(sceneId).

## Acceptance criteria
- transitionTo emission calls cameras.main.fadeOut once with TRANSITION_FADE_MS.
- scene.start(sceneId) is called only after fade-out-complete fires.


## Scope
- In scope: BootScene.ts field, constant and subscription
- Out of scope: SHUTDOWN unsubscribe
- Preserve: Existing create() order and shutdown handler


## Technical constraints
- Phaser 3.90
- Use reactToPhaser.on which returns an unsubscribe function
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Subscription added in create()
- tsc --noEmit passes


## Clarifying questions
- None
