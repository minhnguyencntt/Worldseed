---
id: "01M84S559P3YJG3JX9KE0STMM0"
kind: unit
parent: 01M84S559NWCSW0D395RW6VH4B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Lockfile node_modules/phaser entry unit tests

Tests read package-lock.json from disk only.

## Acceptance criteria
- version is 3.90.0 and resolved URL is the 3.90.0 tarball
- integrity equals the 3.90.0 sha512 and eventemitter3 range is satisfied by the locked version


## Scope
- In scope: new test file
- Out of scope: product code
- Preserve: tests/phaserDependency.test.ts


## Technical constraints
- Expected values come from npm registry metadata of phaser@3.90.0


## Definition of done
- Tests pass


## Clarifying questions
- None
