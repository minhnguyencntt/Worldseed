---
id: "01M84RDAZH7WWXZ2N1G8N3EYK5"
kind: unit
parent: 01M84RDAZH3GA0FRPBKV7WD8HE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Zustand game store, useGame and BootScene state reading unit tests

Test gameStore, useGame and BootScene with phaser mocked.

## Acceptance criteria
- Given store state, Then BootScene.readState returns the same reference.
- Given shutdown, Then unsubscribe is called.


## Scope
- In scope: tests/gameStore.test.ts
- In scope: tests/bootScene.test.ts
- In scope: existing tests/useGame.test.tsx
- Out of scope: real Phaser
- Preserve: existing useGame tests


## Technical constraints
- vi.mock('phaser') with a Scene base class stub holding an events emitter


## Dependencies
- ACT3


## Definition of done
- New tests and useGame.test.tsx pass


## Clarifying questions
- None
