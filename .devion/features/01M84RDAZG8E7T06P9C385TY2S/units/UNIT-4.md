---
id: "01M84RDAZHRB33974DJ8MPJ4A6"
kind: unit
parent: 01M84RDAZGR8REASBKE89M9M5S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: PhaserHost single instance, cleanup, config and resize unit tests

Write tests from REQ1 acceptance criteria. Phaser is mocked and no browser is used.

## Acceptance criteria
- Given StrictMode, When PhaserHost mounts, Then one live game and one destroy of the first.
- Given resize, When the ResizeObserver mock fires, Then scale.refresh is called.


## Scope
- In scope: tests/phaserHost.test.tsx
- In scope: tests/phaserConfig.test.ts
- Out of scope: real WebGL
- Preserve: existing tests


## Technical constraints
- vi.mock('phaser') and vi.mock of createGame
- Stub global ResizeObserver


## Dependencies
- ACT1


## Definition of done
- Both test files pass


## Non-functional requirements
- Run in seconds


## Clarifying questions
- None
