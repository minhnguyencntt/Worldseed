---
id: "01M84VFDBHQN7ANRV9N3AENB1K"
kind: unit
parent: 01M84VFDBH8B1SQYMYQMDMFYB7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: untrackAndVerify unit tests with a fake git runner

Add tests to tests/trackedNodeModules.test.ts proving untrackAndVerify with a fake GitRunner that returns scripted ls-files output.

## Acceptance criteria
- Returns {before:3, after:0} when second listing is empty
- Throws naming leftover path
- Counts triple-listed unmerged path once


## Scope
- In scope: game/frontend/tests/trackedNodeModules.test.ts
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Fake runner only, no real git


## Definition of done
- Tests pass


## Clarifying questions
- None
