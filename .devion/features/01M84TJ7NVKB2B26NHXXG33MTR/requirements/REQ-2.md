---
id: "01M84TJ7NVJETW3NRAFTET87R2"
kind: requirement
parent: 01M84TJ7NVKB2B26NHXXG33MTR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · npm test runs the tracked-dependency guard and fails when a path is tracked

Context: package.json test is only vitest run. Desired: test runs the guard script then vitest, and the script exits non-zero when tracked dependency or cache paths exist. Why: enforcement.

## Acceptance criteria
- Given a git runner returning a tracked node_modules path, when the guard main runs, then it throws and exit code is non-zero
- Given package.json, when scripts.test is read, then it invokes the guard before vitest run


## Scope
- In scope: scripts/assertNoTrackedNodeModules.ts
- In scope: package.json scripts
- Out of scope: CI
- Preserve: test:phaser-pin and untrack:node-modules scripts


## Technical constraints
- vite-node runs the script


## Definition of done
- npm test fails while a dependency path is tracked


## Clarifying questions
- None
