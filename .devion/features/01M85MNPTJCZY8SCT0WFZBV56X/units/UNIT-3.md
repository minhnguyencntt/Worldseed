---
id: "01M85MNPTKR7SF3S2S84FNG1HX"
kind: unit
parent: 01M85MNPTJT2K2HWXMSX758FT4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene fades out and starts the scene on transitionTo unit tests

Add a test file modelled on bootScenePlayAnimation.test.ts with Phaser mocked, asserting fadeOut and scene.start behavior.

## Acceptance criteria
- fadeOut called with the duration when transitionTo emitted
- scene.start called with sceneId after FADE_OUT_COMPLETE


## Scope
- In scope: frontend/tests/bootSceneTransitionTo.test.ts
- Out of scope: real Phaser or browser
- Preserve: existing tests


## Technical constraints
- Copy the vi.mock('phaser') and content mock from bootScenePlayAnimationShutdown.test.ts; add cameras.main.fadeOut and once as vi.fn, scene = { start: vi.fn() }, and Cameras: { Scene2D: { Events: { FADE_OUT_COMPLETE: 'camerafadeoutcomplete' } } }


## Definition of done
- Tests pass


## Clarifying questions
- None
