---
id: "01M84TT5ZHBN26HBZ1P4G9V2GK"
kind: requirement
parent: 01M84TT5ZH8C5QBMPGKM9ANP4C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · npm test runs the guard before vitest

Change scripts.test from `vitest run` to `vite-node scripts/assertNoTrackedNodeModules.ts && vitest run`.

## Acceptance criteria
- Given package.json, When scripts.test is read, Then it contains 'scripts/assertNoTrackedNodeModules.ts' before 'vitest run'.
- Given the guard exits non-zero, When chained with &&, Then vitest does not start.


## Scope
- In scope: game/frontend/package.json test script
- Out of scope: test:phaser-pin script
- Preserve: other scripts


## Technical constraints
- Guard passes only after dependency paths are untracked (npm run untrack:node-modules)


## Dependencies
- REQ2


## Definition of done
- Script updated


## Clarifying questions
- None
