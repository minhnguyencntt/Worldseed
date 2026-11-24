---
id: "01M856E2DQ3S5C0NY6VYF9DV6J"
kind: unit
parent: 01M856E2DPNCP7VTQY51B19BBN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: preload.test.ts planner and resolver unit tests

Create game/tests/preload.test.ts with in-memory manifest tests for the planner and resolver.

## Acceptance criteria
- Given duplicate refs, when planned, then load has the asset once
- Given unknown refs, when planned, then unknown lists them in order
- Given unknown id, when resolved, then fallback key returned


## Scope
- In scope: game/tests/preload.test.ts planner/resolver describes
- Out of scope: BootScene
- Preserve: Other test files


## Technical constraints
- Reuse validScene from game/tests/fixtures/valid-world; no fs


## Definition of done
- Tests pass


## Clarifying questions
- None
