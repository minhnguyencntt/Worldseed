---
id: "01M84TCKGGGX5NGXER6ZWHN4QS"
kind: unit
parent: 01M84TCKGGF03PX1YWM3HSV6J1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: untrackNodeModules cleanup unit tests with a fake git runner

Unit tests with vi.fn runner.

## Acceptance criteria
- Issues git rm -r --cached
- No disk deletion; results.json unstaged


## Scope
- In scope: tests/trackedNodeModules.test.ts
- Out of scope: Real git
- Preserve: Other tests


## Definition of done
- Tests pass


## Clarifying questions
- None
