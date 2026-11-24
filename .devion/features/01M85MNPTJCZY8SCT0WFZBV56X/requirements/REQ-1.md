---
id: "01M85MNPTJT2K2HWXMSX758FT4"
kind: requirement
parent: 01M85MNPTJCZY8SCT0WFZBV56X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene fades to the requested scene on transitionTo

Context: BootScene.create subscribes to playAnimation only. Desired behavior: subscribe to transitionTo and run a fade transition to the requested scene. Expected result: emitting transitionTo { sceneId: 'library' } fades out then starts 'library'. Why: lets React change scenes.

## Acceptance criteria
- Given BootScene.create ran, when transitionTo { sceneId: 'library' } is emitted, then cameras.main.fadeOut is called once
- Given the fade-out completed, when FADE_OUT_COMPLETE fires, then scene.start is called with 'library'


## Scope
- In scope: transitionTo subscription
- In scope: fade-out then scene.start
- Out of scope: App emitting the event
- Preserve: playAnimation subscription


## Technical constraints
- Fade duration is the scene's transition effect durationMs, defaulting to 400


## Definition of done
- Subscription stored in a field for cleanup
- Scene start only after FADE_OUT_COMPLETE


## Clarifying questions
- None
