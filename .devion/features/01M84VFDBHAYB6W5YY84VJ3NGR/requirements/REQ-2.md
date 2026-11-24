---
id: "01M84VFDBH6HEV0TBE00QXFGQP"
kind: requirement
parent: 01M84VFDBHAYB6W5YY84VJ3NGR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The CLI script reports the result and exits non-zero on failure

Context: scripts/untrackNodeModules.ts calls untrackNodeModules directly with no output and no verification. Desired behavior: a testable runUntrack(run, log, err) returns 0 and logs the count on success, or logs the error and returns 1; the script sets process.exitCode from it. Why: so the npm script gives a clear pass or fail.

## Acceptance criteria
- Given untrackAndVerify succeeds with before=3, when runUntrack runs, then log receives a message containing 3 and it returns 0
- Given untrackAndVerify throws, when runUntrack runs, then err receives the message and it returns 1
- Given the script, when run, then it sets process.exitCode from runUntrack


## Scope
- In scope: runUntrack in src/lib/trackedNodeModules.ts
- In scope: scripts/untrackNodeModules.ts
- Out of scope: package.json script names
- Preserve: npm script untrack:node-modules


## Technical constraints
- Script keeps execFileSync('git') as the real runner


## Definition of done
- Script uses runUntrack


## Clarifying questions
- None
