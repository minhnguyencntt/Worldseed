---
id: "01M84VFDBHMB66S2WEPXVAJ60A"
kind: unit
parent: 01M84VFDBH6HEV0TBE00QXFGQP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add runUntrack and use it in the cleanup script

Add runUntrack(run, log, err) to the helper file and make the script set process.exitCode from it.

## Acceptance criteria
- runUntrack returns 0 and logs the count on success
- runUntrack returns 1 and logs the error on failure


## Scope
- In scope: src/lib/trackedNodeModules.ts
- In scope: scripts/untrackNodeModules.ts
- Out of scope: Tests
- Preserve: npm script name


## Technical constraints
- Depends on untrackAndVerify
- Code path: `game/frontend/src/lib/trackedNodeModules.ts`
- Code path: `game/frontend/scripts/untrackNodeModules.ts`


## Definition of done
- Script calls runUntrack


## Clarifying questions
- None
