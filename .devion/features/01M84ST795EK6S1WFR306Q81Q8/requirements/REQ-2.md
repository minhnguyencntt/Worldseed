---
id: "01M84ST795SDH43CESX35QB2YQ"
kind: requirement
parent: 01M84ST795EK6S1WFR306Q81Q8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A pure guard helper reports tracked node_modules paths

Context: nothing prevents node_modules from being re-tracked. Desired behavior: a pure function trackedNodeModulesPaths(paths) returns every path having a node_modules segment, usable on git ls-files output. Expected result: a guard can fail when vendored files are tracked. Why: prevents regressions of this intent.

## Acceptance criteria
- Given paths including game/frontend/node_modules/phaser/scripts/tsgen/src/Parser.ts and game/frontend/src/App.tsx, when the helper runs, then only the first is returned
- Given a list with no node_modules segment, when the helper runs, then an empty array is returned


## Scope
- In scope: new helper module in game/frontend/tools
- Out of scope: Running git inside the helper
- Preserve: package.json scripts


## Technical constraints
- Pure function, no filesystem or git access


## Definition of done
- Helper exported and unit tested


## Clarifying questions
- None
