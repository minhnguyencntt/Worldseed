---
id: "01M858C7X991X84T1QMEQDCY1P"
kind: unit
parent: 01M858C7X8QXGRG2F0HHAHXKGD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Effect context tests use two arguments and typed mocks

Pass a typed resolveKey mock at both call sites.

## Acceptance criteria
- Both calls pass resolveKey
- 3 tests pass and tsc has no TS2554


## Scope
- In scope: bootSceneEffects.test.ts
- Out of scope: src
- Preserve: assertions


## Definition of done
- Tests pass


## Clarifying questions
- None
