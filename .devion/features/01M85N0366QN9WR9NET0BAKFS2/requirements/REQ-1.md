---
id: "01M85N0366QKD7CG9Z9NJ6EZYQ"
kind: requirement
parent: 01M85N0366QN9WR9NET0BAKFS2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene fades out and starts the scene named in transitionTo

Context: BootScene.create (game/frontend/src/phaser/BootScene.ts) has no transitionTo listener. Desired behavior: a listener registered in create() calls cameras.main.fadeOut and, once on FADE_OUT_COMPLETE, calls scene.start(sceneId). Expected result: React-driven transitions play a fade before the new scene begins. Why: smooth scene changes for SG-11.

## Acceptance criteria
- Given create() ran, when transitionTo { sceneId: 'library' } is emitted, then cameras.main.fadeOut is called with a positive duration.
- Given the fade-out was requested, when FADE_OUT_COMPLETE fires, then scene.start is called with 'library' exactly once.
- Given no transitionTo was emitted, then fadeOut and scene.start are never called.


## Scope
- In scope: transitionTo handler in BootScene.create
- Out of scope: Shutdown unsubscribe
- Out of scope: App-side emission
- Preserve: playAnimation wiring
- Preserve: Keyboard and store subscriptions


## Technical constraints
- Phaser 3.90 camera fade API


## Definition of done
- Behavior matches the acceptance criteria


## Clarifying questions
- None
