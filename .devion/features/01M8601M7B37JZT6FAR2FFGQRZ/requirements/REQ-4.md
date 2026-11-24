---
id: "01M8601M7B8533WQTHKH2DEX3M"
kind: requirement
parent: 01M8601M7B37JZT6FAR2FFGQRZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A transition to an empty or unknown scene id is ignored

Context: BootScene.ts L77-81 fades out and starts any sceneId. Desired: return early when sceneId is empty or this.scene.get(sceneId) is falsy, so no fade or start happens.

## Acceptance criteria
- Given sceneId '', when transitionTo is emitted, then no fadeOut and no scene.start
- Given an unregistered id, when emitted, then no fadeOut and no scene.start


## Scope
- In scope: BootScene transitionTo handler
- Out of scope: App emission
- Preserve: valid fade behaviour
- Preserve: unsubscribe on shutdown


## Technical constraints
- Phaser 3.90 ScenePlugin.get(key)


## Dependencies
- INT


## Definition of done
- Guard added


## Clarifying questions
- None
