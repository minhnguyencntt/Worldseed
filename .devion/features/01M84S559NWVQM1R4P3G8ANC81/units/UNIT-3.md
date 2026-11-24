---
id: "01M84S559P3W44X7X5BGS56KDF"
kind: unit
parent: 01M84S559NN7A31GGFDDHQJGTJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Lockfile root phaser specifier unit tests

Tests read package.json and package-lock.json from disk only.

## Acceptance criteria
- Root lock phaser equals ~3.90.0
- Root lock phaser equals package.json phaser


## Scope
- In scope: new test file
- Out of scope: product code
- Preserve: tests/phaserDependency.test.ts


## Technical constraints
- Use the NodeURL alias pattern from tests/phaserDependency.test.ts


## Definition of done
- Tests pass


## Clarifying questions
- None
