---
id: "01M84VMJ3ATDJQM9B9R3KHE46K"
kind: unit
parent: 01M84VMJ3AJSFYTAWV1CA5F7KZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: untrackNodeModules force-removes the conflicted results.json

Update and add tests for the cleanup call arguments.

## Acceptance criteria
- Runner receives the -f cached removal for results.json.
- Node_modules removal is first.


## Scope
- In scope: tests/trackedNodeModules.test.ts
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- vi.fn fake runner


## Definition of done
- Tests pass


## Clarifying questions
- None
