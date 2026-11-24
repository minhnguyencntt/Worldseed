---
id: "01M85MNPTJCZY8SCT0WFZBV56X"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-11.2 BootScene listens for transitionTo and fades to the requested scene

Context: events.ts already declares ReactToPhaserEvents.transitionTo { sceneId } and BootScene already listens for playAnimation, but nothing consumes transitionTo. Desired behavior: BootScene.create subscribes to transitionTo, runs a camera fade-out and then starts the requested scene, and releases the subscription in its SHUTDOWN handler. Expected result: React can drive scene changes through the typed bus. Why: SG-11 drives animations and transitions from game actions.

## Acceptance criteria
- Given BootScene.create ran, when transitionTo { sceneId } is emitted, then the main camera fades out
- Given the fade-out completes, when FADE_OUT_COMPLETE fires, then scene.start is called with the requested sceneId
- Given the SHUTDOWN callback ran, when transitionTo is emitted, then no fade or scene start occurs


## Scope
- In scope: BootScene transitionTo subscription
- In scope: fade then scene start
- In scope: unsubscribe on SHUTDOWN
- Out of scope: Emitting transitionTo from App
- Out of scope: new scenes or content
- Out of scope: backend changes
- Preserve: playAnimation handling
- Preserve: existing sceneReady and effect behavior
- Preserve: event bus API


## Technical constraints
- Phaser 3.90 APIs only
- Use the existing reactToPhaser bus from frontend/src/phaser/events.ts


## Definition of done
- Both requirements have Act and Verify units complete
- Unit tests pass with Phaser mocked


## Clarifying questions
- None
