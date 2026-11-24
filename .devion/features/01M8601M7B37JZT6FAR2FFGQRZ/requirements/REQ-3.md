---
id: "01M8601M7BRNMGXCC87NBSB6N8"
kind: requirement
parent: 01M8601M7B37JZT6FAR2FFGQRZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A scene change from a game action emits transitionTo so the scene fades

Context: goto_scene events set state.currentScene but nothing emits transitionTo; BootScene already fades out and starts the scene on that event. Desired: App emits transitionTo with the new id after an action changes currentScene.

## Acceptance criteria
- Given an action that changes currentScene, when it runs, then transitionTo is emitted with the new scene id
- Given an action that keeps currentScene, when it runs, then transitionTo is not emitted


## Scope
- In scope: App handleAction
- Out of scope: BootScene fade code
- Preserve: playAnimation emission


## Technical constraints
- Use useGameStore state for before/after comparison


## Dependencies
- INT


## Definition of done
- Emission wired


## Clarifying questions
- None
