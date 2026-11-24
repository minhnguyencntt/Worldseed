---
id: "01M84VMJ3AJSFYTAWV1CA5F7KZ"
kind: requirement
parent: 01M84VMJ393J7MJQ4X11HHFE16
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Cleanup untracks the conflicted vitest results.json and clears its index entry

Context: untrackNodeModules runs 'git rm --cached --ignore-unmatch -q' on the results.json path, which git refuses for an entry with unmerged state unless forced. Desired behavior: use -f so conflict stages 1-3 are cleared and the path is untracked while kept on disk. Why: the cache file is tracked and conflicted and must leave the index.

## Acceptance criteria
- Given a fake runner, when untrackNodeModules runs, then a call 'rm --cached -f --ignore-unmatch -q -- node_modules/.vite/vitest/results.json' is made.
- Given the same run, then the node_modules directory removal call is still made first and no call lacks --cached.


## Scope
- In scope: untrackNodeModules in src/lib/trackedNodeModules.ts
- Out of scope: Running the cleanup against the real repo from a test
- Preserve: --cached so files remain on disk
- Preserve: scripts/untrackNodeModules.ts wiring


## Technical constraints
- Git is only reached through the injected GitRunner


## Definition of done
- Force cached removal of results.json is issued


## Clarifying questions
- None
