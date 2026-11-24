---
id: "01M84TT5ZH8C5QBMPGKM9ANP4C"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.2.3 · Enforce the tracked-dependency check in the test script

Context: game/frontend/src/lib/trackedNodeModules.ts has trackedNodeModulesPaths, untrackNodeModules and assertNoTrackedNodeModules, but nothing runs them and package.json test is plain `vitest run`. Desired behavior: a null-separated git ls-files check (checkTrackedFiles, parseGitLsFiles), a guard CLI script, and a test script that runs the guard before vitest. Expected result: npm test fails if a dependency or test-cache path is tracked. Why: stops vendored Phaser files from being committed again.

## Acceptance criteria
- Given git ls-files -z output containing a node_modules or .vite/vitest path, When checkTrackedFiles runs, Then it reports that path.
- Given a tracked dependency path, When the guard CLI logic runs, Then it prints the paths and returns a non-zero exit code.
- Given package.json, When the test script is read, Then it runs the guard before vitest run.
- Given tsc --noEmit, When run, Then tests/trackedNodeModules.test.ts and the new guard tests produce no type errors.


## Scope
- In scope: game/frontend/src/lib/trackedNodeModules.ts
- In scope: game/frontend/scripts/assertNoTrackedNodeModules.ts
- In scope: game/frontend/package.json test script
- In scope: unit tests with a fake git runner
- Out of scope: Changing git history
- Out of scope: Phaser runtime code
- Out of scope: Backend
- Preserve: Existing trackedNodeModulesPaths, untrackNodeModules, assertNoTrackedNodeModules behavior and exports
- Preserve: untrack:node-modules script


## Technical constraints
- vite-node runs the guard script (already used by untrack:node-modules)
- No duplicate exports in the helper file
- Unit tests use a fake git runner, never real git


## Definition of done
- All three requirements have passing unit tests
- npm test script includes the guard


## Clarifying questions
- None
