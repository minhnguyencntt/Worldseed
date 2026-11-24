---
id: "01M85643ND87ST0YX9CVM1DW0J"
kind: unit
parent: 01M85643NDKCHD6HYMERABTV10
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: preload.test.ts planner and resolver unit tests

Create game/tests/preload.test.ts with an in-memory manifest and the valid-world fixture; no filesystem or Phaser involved.

## Acceptance criteria
- Dedup, unknown and fallback-key tests pass
- Tests use only in-memory data


## Scope
- In scope: game/tests/preload.test.ts planner describe block
- Out of scope: BootScene block
- Preserve: Existing test files


## Technical constraints
- Unit tests only


## Definition of done
- Command passes


## Clarifying questions
- None
