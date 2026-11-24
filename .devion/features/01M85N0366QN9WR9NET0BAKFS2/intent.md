---
id: "01M85N0366QN9WR9NET0BAKFS2"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-11.2.1 Subscribe BootScene.create to the transitionTo event

Context: ReactToPhaserEvents already declares transitionTo { sceneId } in game/frontend/src/phaser/events.ts and BootScene.create already subscribes to playAnimation, but nothing listens for transitionTo. Desired behavior: create() subscribes to transitionTo; the handler fades the main camera out and, when the fade completes, starts the scene named in the event. Expected result: emitting transitionTo from React changes the active Phaser scene after a fade. Why: part of SG-11 so the React UI can drive scene changes. Shutdown cleanup is the separate sub-goal SG-11.2.2.

## Acceptance criteria
- Given BootScene.create has run, when reactToPhaser emits transitionTo with { sceneId: 'library' }, then cameras.main.fadeOut is called once.
- Given the fade-out has been requested, when the camera fires its fade-out-complete event, then scene.start is called once with 'library'.
- Given the fade-out has not completed, when transitionTo is handled, then scene.start has not been called yet.


## Scope
- In scope: Subscribe to transitionTo in BootScene.create
- In scope: Fade the main camera out and start the target scene on completion
- Out of scope: Unsubscribing on SHUTDOWN (SG-11.2.2)
- Out of scope: Emitting transitionTo from App
- Out of scope: Defining new scenes or changing the event payload type
- Preserve: Existing playAnimation subscription and shutdown handling
- Preserve: Typed event bus API in events.ts
- Preserve: sceneReady emission


## Technical constraints
- Phaser 3.90 APIs only (cameras.main.fadeOut, Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, scene.start)
- Use the existing reactToPhaser bus; no new dependencies


## Definition of done
- Handler subscribed in create() and behaves per the acceptance criteria
- Type-check passes


## Clarifying questions
- None
