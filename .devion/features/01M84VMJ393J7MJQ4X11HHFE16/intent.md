---
id: "01M84VMJ393J7MJQ4X11HHFE16"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.2.5 · Untrack the conflicted vitest cache and dedupe conflict-stage listings

Context: game/frontend/src/lib/trackedNodeModules.ts holds trackedNodeModulesPaths, parseGitLsFiles, checkTrackedFiles and untrackNodeModules, and scripts/untrackNodeModules.ts runs the cleanup. Desired behavior: a conflicted node_modules/.vite/vitest/results.json is untracked with its conflict stages cleared, and a listing that repeats a path across stages 1-3 yields each path once. Why: stale conflict entries must not keep dependency or cache paths tracked or inflate the guard's report.

## Acceptance criteria
- Given a git listing containing stage 1, 2 and 3 entries for the same path, when parseGitLsFiles runs, then the path is returned exactly once.
- Given a conflicted node_modules/.vite/vitest/results.json, when untrackNodeModules runs with a fake git runner, then it issues a force cached removal for that path that clears the conflicted entry.
- Given a mocked listing with conflict stage entries, when checkTrackedFiles runs, then each offending path is reported once.


## Scope
- In scope: parseGitLsFiles dedupe and stage-prefix handling
- In scope: untrackNodeModules conflict-clearing removal
- In scope: unit tests with a mocked listing and fake git runner
- Out of scope: Resolving merge conflicts in other files
- Out of scope: Phaser source changes
- Preserve: Existing trackedNodeModulesPaths and assertNoTrackedNodeModules behavior
- Preserve: Files stay on disk (git rm --cached only)


## Technical constraints
- Unit tests only; git is faked through the GitRunner type
- No real git index changes in tests


## Definition of done
- Both requirements have passing unit tests
- Existing trackedNodeModules tests stay green


## Clarifying questions
- None
