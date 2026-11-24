---
id: "01M84TJ7NVKB2B26NHXXG33MTR"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.2.3 Enforce the tracked-dependency check in the test script

Context: game/frontend/src/lib/trackedNodeModules.ts has assertNoTrackedNodeModules but nothing runs it. Desired behavior: npm test fails whenever git tracks any node_modules or vitest cache path. Why: stops vendored Phaser and cache files from being committed again.

## Acceptance criteria
- Given a tracked path containing node_modules or a .vite cache directory, when the guard runs, then it throws naming that path
- Given the frontend package.json, when npm test is read, then it runs the guard before vitest


## Scope
- In scope: guard helper and CLI script
- In scope: test script wiring in game/frontend/package.json
- Out of scope: untracking files again
- Out of scope: CI manifests
- Preserve: existing trackedNodeModulesPaths, untrackNodeModules and assertNoTrackedNodeModules behavior
- Preserve: test:phaser-pin script


## Technical constraints
- Use vite-node already used by untrack:node-modules
- No new dependencies


## Definition of done
- npm test runs the guard first and fails on tracked dependency or cache paths


## Clarifying questions
- None
