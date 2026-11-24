---
id: "01M85NA12JVGKZF1K4NMHW19E7"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-11.2.2 Store and release the transitionTo unsubscribe in BootScene

Context: BootScene.create subscribes to the transitionTo event through reactToPhaser.on and already keeps the returned function in the private field unsubscribeTransition. The SHUTDOWN handler already calls and nulls it. Desired behavior: the stored unsubscribe is called and cleared on SHUTDOWN, so a restarted scene does not hold duplicate transitionTo handlers. Expected result: exactly one fade-out per transitionTo event after any number of scene restarts. Why: a duplicate handler would fade and start the scene several times.

## Acceptance criteria
- Given BootScene.create has run, when transitionTo is emitted, then exactly one fadeOut call is made
- Given the SHUTDOWN callback has run, when transitionTo is emitted, then no fadeOut and no scene.start happens
- Given the scene was shut down and created again, when transitionTo is emitted, then fadeOut is called exactly once


## Scope
- In scope: unsubscribeTransition field and SHUTDOWN handler in BootScene
- Out of scope: playAnimation and store subscription handling
- Out of scope: new events
- Preserve: fade-out then scene.start behavior of transitionTo
- Preserve: other subscribers on reactToPhaser


## Technical constraints
- Phaser 3.90 APIs only
- No real Phaser or browser in tests


## Definition of done
- Both requirements have Act and Verify units complete
- Unit tests pass


## Clarifying questions
- None
