---
id: "01M84SA501326G2HZWTA9JZEVY"
kind: unit
parent: 01M84SA5018K3J2BAEWYY1K5C2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Lockfile node_modules/phaser entry unit tests

Add tests to the lockfile test file that read the real lockfile and assert the node_modules/phaser entry.

## Acceptance criteria
- Fails while the entry is 4.2.1.
- Passes with 3.90.0, matching URL, integrity and eventemitter3 range.


## Scope
- In scope: game/frontend/tests/phaserLockfile.test.ts
- Out of scope: Product code
- Preserve: Root specifier tests


## Technical constraints
- No network access


## Definition of done
- Tests pass


## Clarifying questions
- None
