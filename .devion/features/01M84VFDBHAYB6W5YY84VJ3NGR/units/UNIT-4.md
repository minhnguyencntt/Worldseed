---
id: "01M84VFDBHCRHHGJYTEFB6DDS4"
kind: unit
parent: 01M84VFDBH6HEV0TBE00QXFGQP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: runUntrack exit code and script unit tests

Add tests/untrackScript.test.ts covering runUntrack with fake runner and log/err spies, and a check that the script source uses runUntrack.

## Acceptance criteria
- Success logs count and returns 0
- Failure logs error and returns 1
- Script source references runUntrack and no longer calls untrackNodeModules directly


## Scope
- In scope: game/frontend/tests/untrackScript.test.ts
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Read script file with node:fs readFileSync; no git execution


## Definition of done
- Tests pass


## Clarifying questions
- None
