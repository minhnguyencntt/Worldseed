---
id: "01M85B0RB83GWA4QW27HHRCDQ0"
kind: unit
parent: 01M85B0RB8XD219DZGSB0B1ZX0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene character spawn, fallback and shutdown unit tests

Extend game/frontend/tests/bootSceneCharacters.test.ts with Phaser mocked. The Scene fake exposes events.once as a vi.fn so the shutdown callback can be captured and invoked.

## Acceptance criteria
- No sprite for an empty character list
- Shutdown destroys sprites
- Click without interact animation only emits characterClick


## Scope
- In scope: game/frontend/tests/bootSceneCharacters.test.ts
- Out of scope: Product code
- Preserve: Existing mocks and tests


## Technical constraints
- Mutate the mocked scene.characters per test and restore it afterwards


## Definition of done
- Tests pass and fail if the BootScene code is removed


## Clarifying questions
- None
