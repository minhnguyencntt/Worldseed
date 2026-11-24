---
id: "01M84ST796T3WBDQ0W9P2C1D93"
kind: unit
parent: 01M84ST795SDH43CESX35QB2YQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: trackedNodeModulesPaths unit tests

Tests the helper with a fixed in-memory path list.

## Acceptance criteria
- Given the phaser tsgen path and App.tsx, then only the tsgen path is returned
- Given no node_modules paths, then an empty array is returned


## Scope
- In scope: game/frontend/tests/trackedPaths.test.ts
- Out of scope: git
- Preserve: Other tests


## Technical constraints
- Pure in-memory inputs


## Definition of done
- Tests pass


## Clarifying questions
- None
