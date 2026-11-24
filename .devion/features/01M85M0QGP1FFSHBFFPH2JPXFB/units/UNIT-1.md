---
id: "01M85M0QGQ7S5PJ8T21T5AT8SC"
kind: unit
parent: 01M85M0QGPSDDKDS5AV7X1D5C1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Subscribe BootScene to playAnimation and transitionTo

Add subscriptions in BootScene.create that look up the character sprite by id and play its animation then idle, and replay the transition through the effect context. Release them in the SHUTDOWN handler.

## Acceptance criteria
- playAnimation plays the named animation on the matching character and returns to idle
- transitionTo calls playSceneTransition with the scene and effect context
- Shutdown removes both subscriptions


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: Tests
- Out of scope: App changes
- Preserve: Existing click handler behavior


## Technical constraints
- Phaser 3.90 APIs only
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- BootScene handles both events and cleans up


## Clarifying questions
- None
