---
id: "01M84VZY5B5DTTR7ZA4447SPD2"
kind: unit
parent: 01M84VZY5BT11EKN5PQR5DMW3C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Config and createGame pass zoom unit tests

Unit tests with Phaser mocked prove that zoom is put into the config and forwarded by createGame.

## Acceptance criteria
- Config zoom set and defaults to 1
- createGame forwards zoom


## Scope
- In scope: tests/phaserConfig.test.ts
- Out of scope: PhaserHost tests
- Preserve: Existing config tests


## Technical constraints
- No real Phaser canvas


## Definition of done
- Tests pass


## Clarifying questions
- None
