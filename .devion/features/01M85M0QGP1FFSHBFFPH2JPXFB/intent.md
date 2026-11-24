---
id: "01M85M0QGP1FFSHBFFPH2JPXFB"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-11 Drive character animations and scene transition from game actions

Context: BootScene already plays the character idle loop on create, plays interact then idle when a character sprite is clicked, and plays the authored fade once in create(). ReactToPhaserEvents already declares playAnimation and transitionTo, but nothing emits or handles them, so game actions such as object actions and dialogue choices never reach the Phaser scene. Desired behavior: performing a game action in the app screen makes the boy play the interact animation and then return to idle, and a scene change replays the scene transition, all through the Phaser scene. Expected result: unit tests confirm interact and transition are triggered from game actions. Why: the app screen should visibly react to gameplay.

## Acceptance criteria
- Given the BootScene is created, when a playAnimation event targets a character, then that character sprite plays the named animation and returns to idle
- Given the app is playing, when an object action is performed, then a playAnimation interact event is emitted for the boy
- Given the BootScene is created, when a transitionTo event is received, then the scene transition is played through the Phaser scene
- Given a game action that moves the scene, when it is performed, then a transitionTo event is emitted


## Scope
- In scope: BootScene subscription to playAnimation and transitionTo
- In scope: App emitting those events from game actions
- In scope: Unit tests for both directions
- Out of scope: New assets or new scenes
- Out of scope: Backend or API changes
- Out of scope: Visual redesign
- Preserve: Existing click-to-interact behavior on character sprites
- Preserve: Idle animation on create and the transition on create
- Preserve: Typed event bus contracts for existing events


## Technical constraints
- Phaser 3.90 with Phaser mocked in unit tests
- Use the existing reactToPhaser bus and event types in game/frontend/src/phaser/events.ts
- No duplicated game state ownership


## Definition of done
- Requirements implemented with unit tests passing
- Events are unsubscribed on scene shutdown


## Non-functional requirements
- No Phaser listener leaks after scene shutdown


## Clarifying questions
- None
