---
id: "01M85WR55CV6S0YGCY261R16H8"
kind: unit
parent: 01M85WR55CV9APGA6Z00PCTYQS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Phaser effect context renders lighting effects with mocked scene

Unit tests with a fake Phaser scene.

## Acceptance criteria
- Each effect sets depth
- Vignette destroys all bands
- Dust uses resolveKey result


## Scope
- In scope: game/frontend/tests
- Out of scope: real Phaser


## Technical constraints
- Phaser mocked via vi.mock('phaser')
- Unit tests only


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
