---
id: "01M849SG8BQA1M6SG6BWXT35VD"
kind: unit
parent: 01M849SG8B65WPTHY6NGBPMM3T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Reset round, execution and contributions in the 401 branch

Extend the handleError 401 branch to reset the loaded round, execution and contributions.

## Acceptance criteria
- After a 401 the round is undefined, the execution is undefined and contributions is [].
- The reloads counter and roundId are unchanged.


## Scope
- In scope: AdminApp.tsx handleError
- Out of scope: Tests
- Preserve: roundId from the public current-round lookup


## Technical constraints
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Dependencies
- ACT1


## Definition of done
- Code change applied


## Clarifying questions
- None
