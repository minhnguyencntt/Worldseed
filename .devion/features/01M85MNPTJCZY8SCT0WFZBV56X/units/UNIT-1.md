---
id: "01M85MNPTK9MD24VZM2PVPN53G"
kind: unit
parent: 01M85MNPTJT2K2HWXMSX758FT4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Subscribe BootScene to transitionTo with fade-out and scene start

In BootScene.ts add a private unsubscribeTransition field, subscribe in create after the playAnimation subscription, and add a handler that fades out then starts the scene.

## Acceptance criteria
- transitionTo emit calls cameras.main.fadeOut
- FADE_OUT_COMPLETE calls scene.start with the sceneId


## Scope
- In scope: BootScene.ts
- Out of scope: tests
- Out of scope: App
- Preserve: playAnimation


## Technical constraints
- Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Handler implemented in BootScene.ts
- Type-check passes


## Clarifying questions
- None
