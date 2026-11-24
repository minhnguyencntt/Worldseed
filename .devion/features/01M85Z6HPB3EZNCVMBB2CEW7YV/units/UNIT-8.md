---
id: "01M85Z6HPC85XPNZKM32A0KNB3"
kind: unit
parent: 01M85Z6HPBQRGS07SJDFEQ8S58
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: hotspot path removed and App selection uses the overlay unit tests

A source scan test with fs reading of the src tree and updated appObjectClick and appMenuClose tests.

## Acceptance criteria
- No forbidden names in source
- App selection renders overlay


## Scope
- In scope: frontend/tests/noHotspotPath.test.ts
- In scope: frontend/tests/appObjectClick.test.tsx
- In scope: frontend/tests/appMenuClose.test.tsx
- Out of scope: Real browser
- Preserve: Other tests


## Technical constraints
- fs reads only real source files in the repo; Phaser mocked


## Dependencies
- ACT4


## Definition of done
- Tests pass


## Clarifying questions
- None
