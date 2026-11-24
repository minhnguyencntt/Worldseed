---
id: "01M84TJ7NV5AVQ4PA44M89TCRH"
kind: unit
parent: 01M84TJ7NVJETW3NRAFTET87R2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: test script runs the tracked-dependency guard unit tests

Read the real package.json and script source and assert wiring.

## Acceptance criteria
- scripts.test starts with the guard before vitest run
- guard script imports checkTrackedFiles


## Scope
- In scope: game/frontend/tests/testScriptGuard.test.ts
- Out of scope: running git or npm
- Preserve: tests/phaserVersionGuard.test.ts


## Technical constraints
- Read files with node:fs from the frontend dir; no child processes


## Definition of done
- Tests pass


## Clarifying questions
- None
