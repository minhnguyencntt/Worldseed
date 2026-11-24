---
id: "01M84VFDBH8B1SQYMYQMDMFYB7"
kind: requirement
parent: 01M84VFDBHAYB6W5YY84VJ3NGR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Cleanup re-checks the index and fails when node_modules paths stay tracked

Context: untrackNodeModules runs git rm -r --cached but never confirms the result, and unmerged (UU) paths such as node_modules/.vite/vitest/results.json appear up to three times in git ls-files. Desired behavior: a new untrackAndVerify(run) counts unique tracked dependency paths before, runs untrackNodeModules, re-lists, and throws when any remain. Why: to prove all 15,329 files are removed.

## Acceptance criteria
- Given a runner listing 3 node_modules paths, when untrackAndVerify runs and the second listing is empty, then it returns {before:3, after:0}
- Given the second listing still contains node_modules/phaser/package.json, when it runs, then it throws an error containing that path
- Given a path listed three times for merge stages, when counting, then it is counted once


## Scope
- In scope: untrackAndVerify in src/lib/trackedNodeModules.ts
- Out of scope: Changing untrackNodeModules itself
- Preserve: untrackNodeModules call sequence


## Technical constraints
- Reuse checkTrackedFiles and untrackNodeModules


## Definition of done
- untrackAndVerify exported and typed


## Clarifying questions
- None
