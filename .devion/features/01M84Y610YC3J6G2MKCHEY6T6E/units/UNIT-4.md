---
id: "01M84Y610Z3ZNFVXSN6J1R22C0"
kind: unit
parent: 01M84Y610YJGG7YY50HM7J1AKZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene plays the authored transition on create

Extend game/frontend/tests/bootSceneEffects.test.ts with a mocked playSceneTransition.

## Acceptance criteria
- create() calls playSceneTransition once with ctx and the bundled scene.
- Shutdown still destroys effect handles.


## Scope
- In scope: bootSceneEffects.test.ts
- Out of scope: Real Phaser
- Preserve: Existing tests


## Technical constraints
- Phaser and engine modules are mocked with vi.mock


## Definition of done
- Tests pass


## Clarifying questions
- None
