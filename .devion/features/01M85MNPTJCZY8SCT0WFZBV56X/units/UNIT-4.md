---
id: "01M85MNPTKVSKF26H6GN2F3C7W"
kind: unit
parent: 01M85MNPTJN2Z2441YTP0WZR6S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: transitionTo unsubscribe on shutdown unit tests

Add a test file modelled on bootScenePlayAnimationShutdown.test.ts asserting no fade after shutdown.

## Acceptance criteria
- No fadeOut after the SHUTDOWN callback
- Pre-registered transitionTo subscriber still receives events


## Scope
- In scope: frontend/tests/bootSceneTransitionToShutdown.test.ts
- Out of scope: real Phaser
- Preserve: existing tests


## Technical constraints
- Same mocks as VER-1


## Definition of done
- Tests pass


## Clarifying questions
- None
