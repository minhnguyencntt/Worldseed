---
id: "01M85N03676WK0DCWNNENK5K8W"
kind: unit
parent: 01M85N0366QKD7CG9Z9NJ6EZYQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene fades out and starts the scene on transitionTo unit tests

Write a new unit test file with a fake Phaser (modeled on game/frontend/tests/bootScenePlayAnimation.test.ts) whose cameras.main exposes fadeOut and once spies, whose scene exposes start, and which provides Cameras.Scene2D.Events.FADE_OUT_COMPLETE = 'camerafadeoutcomplete'. No browser or real Phaser is used.

## Acceptance criteria
- fadeOut is called once with TRANSITION_FADE_MS after transitionTo is emitted.
- scene.start is not called before the fade-out-complete callback runs and is called once with the sceneId afterwards.
- Nothing is called when transitionTo was not emitted.


## Scope
- In scope: New test file bootSceneTransition.test.ts
- Out of scope: Shutdown unsubscribe tests
- Preserve: Existing BootScene tests


## Technical constraints
- Vitest; Phaser fully mocked; content module mocked as in bootScenePlayAnimation.test.ts


## Definition of done
- Tests pass in seconds using only the named file


## Clarifying questions
- None
