---
id: "01M85M0QGPSDDKDS5AV7X1D5C1"
kind: requirement
parent: 01M85M0QGP1FFSHBFFPH2JPXFB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene plays character animations and the transition on React events

Context: events.ts declares playAnimation {target,name} and transitionTo {sceneId} but BootScene never subscribes. Desired behavior: BootScene subscribes in create(), plays the requested character animation then returns to idle, replays the scene fade for transitionTo, and unsubscribes on SHUTDOWN. Expected result: Phaser reacts to React commands. Why: lets game actions animate the scene.

## Acceptance criteria
- Given a character with an interact animation, when playAnimation {target:'boy',name:'interact'} is emitted, then the boy sprite plays the interact animation key and replays idle on ANIMATION_COMPLETE
- Given a transitionTo event, when it is emitted, then the camera fadeIn is called with the authored transition duration
- Given the scene has shut down, when playAnimation or transitionTo is emitted, then nothing is played


## Scope
- In scope: BootScene.create subscriptions
- In scope: Per-character play method keyed by id
- In scope: Shutdown unsubscribe
- Out of scope: Walk animation movement
- Out of scope: Loading new scenes
- Preserve: createCharacter click behavior
- Preserve: playSceneTransition call in create


## Technical constraints
- Use reactToPhaser from ./events
- Reuse ensureAnim and resolveCharacterAnimation


## Definition of done
- BootScene handles both events and releases them on shutdown


## Clarifying questions
- None
