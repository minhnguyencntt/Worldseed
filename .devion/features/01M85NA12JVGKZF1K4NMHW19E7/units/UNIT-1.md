---
id: "01M85NA12K8ZJM5M5A3WXM9AVB"
kind: unit
parent: 01M85NA12J7Y0KTQR65BQXJWDR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm create stores the transitionTo unsubscribe in unsubscribeTransition

The code already declares unsubscribeTransition and assigns it in create. Read it and leave it unchanged unless it deviates from the spec; no new behavior is planned.

## Acceptance criteria
- unsubscribeTransition is assigned the return value of reactToPhaser.on('transitionTo', ...)
- The handler fades out then starts the scene on FADE_OUT_COMPLETE


## Scope
- In scope: BootScene.create transitionTo subscription
- Out of scope: tests
- Preserve: fade and scene start logic


## Technical constraints
- Phaser 3.90
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Assignment present and correct


## Clarifying questions
- None
