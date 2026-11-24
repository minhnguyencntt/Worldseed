---
id: "01M84TT5ZHQ5HYQS101RYKC1NG"
kind: requirement
parent: 01M84TT5ZH8C5QBMPGKM9ANP4C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Guard CLI script prints tracked paths and exits non-zero

Add runGuard(run, log) returning an exit code in the helper module and a script scripts/assertNoTrackedNodeModules.ts that wires execFileSync git and process.exit. Why: npm test needs an executable gate.

## Acceptance criteria
- Given a runner listing a tracked node_modules path, When runGuard runs, Then it logs that path and returns 1.
- Given a runner listing only source paths, When runGuard runs, Then it returns 0 and logs nothing offending.
- Given the repo, When git ls-files lists the script, Then scripts/assertNoTrackedNodeModules.ts exists and is tracked.


## Scope
- In scope: helper module runGuard
- In scope: guard script file
- Out of scope: package.json
- Preserve: scripts/untrackNodeModules.ts


## Technical constraints
- Script uses execFileSync from node:child_process like untrackNodeModules.ts


## Dependencies
- REQ1


## Definition of done
- Script file exists and is committed


## Clarifying questions
- None
